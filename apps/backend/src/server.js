import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDb, query, usingMemoryDb } from "./db.js";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// ── RBAC ─────────────────────────────────────────────────────
const ROLE_PERMISSIONS = {
  "mudir_aam":  ["read", "write", "approve", "manage"],
  "ustadz":     ["read", "write"],
  "ustadzah":   ["read", "write"],
  "wali":       ["read"],
  "santri":     ["read"],
  "umum":       ["read"]
};

// ── Constants ─────────────────────────────────────────────────
const ATTENDANCE_STATUS   = new Set(["hadir","izin","sakit","alpa"]);
const BILLING_STATUS      = new Set(["unpaid","partial","paid"]);
const TAHFIDZ_TYPE        = new Set(["ziyadah","murojaah"]);
const TAHFIDZ_QUALITY     = new Set(["mumtaz","jayyid_jiddan","jayyid","maqbul","dhoif"]);
const PERMIT_TYPE         = new Set(["pulang","pesiar","sakit","keperluan"]);
const PERMIT_STATUS       = new Set(["pending","approved","rejected","returned"]);
const STAFF_ROLE          = new Set(["ustadz","ustadzah","admin","bendahara","kepala_sekolah","staff_umum"]);
const PPDB_STATUS         = new Set(["pending","verified","rejected"]);
const MONTH_FORMAT        = /^\d{4}-\d{2}$/;
const DATE_FORMAT         = /^\d{4}-\d{2}-\d{2}$/;

// ── Observability ─────────────────────────────────────────────
const observability = {
  startedAt: Date.now(),
  requestCount: 0,
  errorCount: 0,
  routeStats: new Map()
};

// ── Helpers ───────────────────────────────────────────────────
function asInt(value) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) ? parsed : NaN;
}
function asAmount(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : NaN;
}
function trimText(value) {
  return typeof value === "string" ? value.trim() : "";
}
function asyncHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
function nowIso() {
  return new Date().toISOString();
}
function normalizeGuardianPhone(value) {
  const raw = trimText(value).replace(/[^\d+]/g, "");
  const canonical = raw.startsWith("+62") ? `62${raw.slice(3)}` : raw;
  const normalized = canonical.startsWith("0") ? `62${canonical.slice(1)}` : canonical;
  return normalized;
}
function isValidGuardianPhone(value) {
  return /^628[1-9][0-9]{7,12}$/.test(value);
}
function resolveRole(req) {
  const authHeader  = trimText(req.headers.authorization);
  const roleHeader  = trimText(req.headers["x-role"]).toLowerCase();
  if (roleHeader) return roleHeader;
  if (!authHeader.toLowerCase().startsWith("bearer ")) return "ustadz";
  const token = authHeader.slice(7).trim().toLowerCase();
  return token.replace("dev-token-", "") || "ustadz";
}
function requirePermission(permission) {
  return (req, res, next) => {
    const role = resolveRole(req);
    const permissions = ROLE_PERMISSIONS[role] || [];
    if (!permissions.includes(permission)) {
      return res.status(403).json({ ok: false, message: "Akses ditolak untuk role ini", required_permission: permission, role });
    }
    req.auth = { role, permissions };
    next();
  };
}
function hijriFromDate(date) {
  const formatter = new Intl.DateTimeFormat("en-TN-u-ca-islamic", { day: "2-digit", month: "2-digit", year: "numeric" });
  const parts = formatter.formatToParts(date);
  const day   = parts.find((p) => p.type === "day")?.value   || "";
  const month = parts.find((p) => p.type === "month")?.value || "";
  const year  = parts.find((p) => p.type === "year")?.value  || "";
  return { year, month, day, iso_like: `${year}-${month}-${day}` };
}
async function checkStudentExists(studentId) {
  const rows = await query("SELECT * FROM students ORDER BY id DESC");
  return rows.rows.some((row) => Number(row.id) === Number(studentId));
}

// ── Observability middleware ───────────────────────────────────
app.use((req, res, next) => {
  const started = process.hrtime.bigint();
  observability.requestCount += 1;
  res.on("finish", () => {
    const elapsedMs = Number(process.hrtime.bigint() - started) / 1_000_000;
    const key = `${req.method} ${req.route?.path || req.path}`;
    const existing = observability.routeStats.get(key) || { count: 0, totalMs: 0, maxMs: 0, lastStatus: 0 };
    existing.count   += 1;
    existing.totalMs += elapsedMs;
    existing.maxMs    = Math.max(existing.maxMs, elapsedMs);
    existing.lastStatus = res.statusCode;
    observability.routeStats.set(key, existing);
    if (res.statusCode >= 500) observability.errorCount += 1;
  });
  next();
});

// ════════════════════════════════════════════════════════════
// SYSTEM ENDPOINTS
// ════════════════════════════════════════════════════════════

app.get("/api/health", asyncHandler(async (_req, res) => {
  await query("SELECT 1");
  return res.json({ ok: true, service: "backend", db: usingMemoryDb() ? "memory" : "postgres", timestamp: nowIso(), uptime_seconds: Math.floor(process.uptime()) });
}));

app.get("/api/ready", asyncHandler(async (_req, res) => {
  await query("SELECT 1");
  return res.json({ ok: true, ready: true, timestamp: nowIso() });
}));

app.get("/api/metrics", (_req, res) => {
  const routes = [];
  for (const [route, stats] of observability.routeStats.entries()) {
    routes.push({ route, count: stats.count, avg_ms: Number((stats.totalMs / stats.count).toFixed(2)), max_ms: Number(stats.maxMs.toFixed(2)), last_status: stats.lastStatus });
  }
  return res.json({ ok: true, service: "backend", started_at: new Date(observability.startedAt).toISOString(), uptime_seconds: Math.floor(process.uptime()), request_count: observability.requestCount, error_count: observability.errorCount, error_rate: observability.requestCount ? Number((observability.errorCount / observability.requestCount).toFixed(4)) : 0, routes });
});

app.post("/api/auth/login", (req, res) => {
  const { role = "ustadz", name = "Operator" } = req.body || {};
  const cleanRole = trimText(role).toLowerCase();
  if (!ROLE_PERMISSIONS[cleanRole]) {
    return res.status(400).json({ ok: false, message: "Role tidak dikenali" });
  }
  return res.json({ ok: true, token: `dev-token-${cleanRole}`, user: { name: trimText(name) || "Operator", role: cleanRole, permissions: ROLE_PERMISSIONS[cleanRole] } });
});

app.get("/api/system/roles", (_req, res) => {
  return res.json({ ok: true, roles: ROLE_PERMISSIONS });
});

app.get("/api/system/calendar/convert", (req, res) => {
  const dateParam = trimText(req.query.date) || nowIso().slice(0, 10);
  if (!DATE_FORMAT.test(dateParam)) return res.status(400).json({ ok: false, message: "format date harus YYYY-MM-DD" });
  const baseDate = new Date(`${dateParam}T00:00:00.000Z`);
  if (Number.isNaN(baseDate.getTime())) return res.status(400).json({ ok: false, message: "Tanggal tidak valid" });
  return res.json({ ok: true, gregorian: dateParam, hijri: hijriFromDate(baseDate) });
});

// ════════════════════════════════════════════════════════════
// PUBLIC READ ENDPOINTS (Website Integration)
// ════════════════════════════════════════════════════════════

app.get("/api/public/ppdb/results", asyncHandler(async (req, res) => {
  const cleanStatus = trimText(req.query.status).toLowerCase();
  if (cleanStatus && !PPDB_STATUS.has(cleanStatus)) {
    return res.status(400).json({ ok: false, message: "status PPDB tidak valid" });
  }
  const rows = await query("SELECT * FROM ppdb_registrations ORDER BY id DESC");
  const data = cleanStatus ? rows.rows.filter((row) => String(row.status).toLowerCase() === cleanStatus) : rows.rows;
  return res.json({ ok: true, data });
}));

app.get("/api/public/students", asyncHandler(async (req, res) => {
  const rows = await query("SELECT * FROM students ORDER BY id DESC");
  const cleanStatus = trimText(req.query.status).toLowerCase();
  const cleanGender = trimText(req.query.gender).toUpperCase();
  const allowedStatus = new Set(["aktif", "alumni", "keluar"]);
  const allowedGender = new Set(["L", "P"]);
  if (cleanStatus && !allowedStatus.has(cleanStatus)) return res.status(400).json({ ok: false, message: "status tidak valid" });
  if (cleanGender && !allowedGender.has(cleanGender)) return res.status(400).json({ ok: false, message: "gender tidak valid" });

  let data = rows.rows.filter((row) => {
    if (cleanStatus && String(row.status).toLowerCase() !== cleanStatus) return false;
    if (cleanGender && String(row.gender || "").toUpperCase() !== cleanGender) return false;
    return true;
  });
  let fallbackApplied = false;
  if (cleanGender && data.length === 0) {
    // Fallback awal integrasi: jika gender belum terisi di master, tetap kirim data aktif dulu.
    data = rows.rows.filter((row) => (cleanStatus ? String(row.status).toLowerCase() === cleanStatus : true));
    fallbackApplied = true;
  }
  return res.json({ ok: true, fallback_applied: fallbackApplied, data });
}));

app.get("/api/public/staff", asyncHandler(async (req, res) => {
  const rows = await query("SELECT * FROM staff ORDER BY id DESC");
  const cleanRole = trimText(req.query.role).toLowerCase();
  const cleanStatus = trimText(req.query.status).toLowerCase();
  const data = rows.rows.filter((row) => {
    if (cleanRole && String(row.role || "").toLowerCase() !== cleanRole) return false;
    if (cleanStatus && String(row.status || "").toLowerCase() !== cleanStatus) return false;
    return true;
  });
  return res.json({ ok: true, data });
}));

app.get("/api/public/guardians", asyncHandler(async (_req, res) => {
  const [studentsRes, ppdbRes] = await Promise.all([
    query("SELECT * FROM students ORDER BY id DESC"),
    query("SELECT * FROM ppdb_registrations ORDER BY id DESC")
  ]);

  const map = new Map();
  for (const row of studentsRes.rows) {
    const name = trimText(row.guardian_name);
    if (!name) continue;
    const key = name.toLowerCase();
    if (!map.has(key)) {
      map.set(key, {
        guardian_name: name,
        guardian_phone: null,
        source: "students",
        linked_students: 0
      });
    }
    map.get(key).linked_students += 1;
  }
  for (const row of ppdbRes.rows) {
    const name = trimText(row.guardian_name);
    if (!name) continue;
    const key = name.toLowerCase();
    const phone = trimText(row.guardian_phone) || null;
    if (!map.has(key)) {
      map.set(key, {
        guardian_name: name,
        guardian_phone: phone,
        source: "ppdb",
        linked_students: 0
      });
    } else if (!map.get(key).guardian_phone && phone) {
      map.get(key).guardian_phone = phone;
    }
  }

  return res.json({ ok: true, data: [...map.values()] });
}));

// ════════════════════════════════════════════════════════════
// DASHBOARD SUMMARY
// ════════════════════════════════════════════════════════════

app.get("/api/dashboard/summary", requirePermission("read"), asyncHandler(async (_req, res) => {
  const [studentsRes, attendanceRes, billingRes, tahfidzRes, permitsRes, staffRes, ppdbRes] = await Promise.all([
    query("SELECT * FROM students ORDER BY id DESC"),
    query("SELECT * FROM attendance ORDER BY id DESC"),
    query("SELECT * FROM billing ORDER BY id DESC"),
    query("SELECT * FROM tahfidz_records ORDER BY id DESC"),
    query("SELECT * FROM student_permits ORDER BY id DESC"),
    query("SELECT * FROM staff ORDER BY id DESC"),
    query("SELECT * FROM ppdb_registrations ORDER BY id DESC")
  ]);

  const students   = studentsRes.rows;
  const attendance = attendanceRes.rows;
  const billing    = billingRes.rows;
  const permits    = permitsRes.rows;
  const staff      = staffRes.rows;
  const ppdb       = ppdbRes.rows;

  const today = nowIso().slice(0, 10);
  const currentMonth = nowIso().slice(0, 7);

  const attendanceToday = attendance.filter((a) => String(a.attendance_date).slice(0, 10) === today);
  const billingThisMonth = billing.filter((b) => String(b.month) === currentMonth);
  const unpaidBilling = billing.filter((b) => b.status !== "paid");
  const pendingPermits = permits.filter((p) => p.status === "pending");

  return res.json({
    ok: true,
    summary: {
      students: { total: students.length, aktif: students.filter((s) => s.status === "aktif").length },
      attendance: { today: attendanceToday.length, hadir: attendanceToday.filter((a) => a.status === "hadir").length },
      billing: {
        this_month: billingThisMonth.length,
        unpaid_count: unpaidBilling.length,
        unpaid_total: unpaidBilling.reduce((s, b) => s + Number(b.amount || 0), 0),
        collected_total: billing.filter((b) => b.status === "paid").reduce((s, b) => s + Number(b.amount || 0), 0)
      },
      tahfidz: { total_records: tahfidzRes.rows.length },
      permits: { pending: pendingPermits.length },
      staff: { total: staff.length, aktif: staff.filter((s) => s.status === "aktif").length },
      ppdb: {
        total: ppdb.length,
        pending: ppdb.filter((p) => p.status === "pending").length,
        verified: ppdb.filter((p) => p.status === "verified").length
      }
    }
  });
}));

// ════════════════════════════════════════════════════════════
// WEBSITE-INTERNAL DATA INTEGRATION
// ════════════════════════════════════════════════════════════

app.get("/api/integration/website-sync", requirePermission("read"), asyncHandler(async (_req, res) => {
  const [studentsRes, attendanceRes, billingRes, staffRes, ppdbRes] = await Promise.all([
    query("SELECT * FROM students ORDER BY id DESC"),
    query("SELECT * FROM attendance ORDER BY id DESC"),
    query("SELECT * FROM billing ORDER BY id DESC"),
    query("SELECT * FROM staff ORDER BY id DESC"),
    query("SELECT * FROM ppdb_registrations ORDER BY id DESC")
  ]);

  const ppdb = ppdbRes.rows;
  return res.json({
    ok: true,
    source: "website_ppdb",
    synced_at: nowIso(),
    modules: {
      santri: { total: studentsRes.rows.length },
      akademik: { attendance_records: attendanceRes.rows.length },
      transaksi: {
        total_billing_rows: billingRes.rows.length,
        total_nominal: billingRes.rows.reduce((sum, row) => sum + Number(row.amount || 0), 0)
      },
      pengajar: { total_staff: staffRes.rows.length },
      ppdb: {
        total: ppdb.length,
        pending: ppdb.filter((p) => p.status === "pending").length,
        latest: ppdb[0] || null
      }
    }
  });
}));

// ════════════════════════════════════════════════════════════
// PPDB
// ════════════════════════════════════════════════════════════

app.post("/api/ppdb/register", asyncHandler(async (req, res) => {
  const {
    student_name,
    origin_school,
    guardian_name,
    guardian_phone,
    notes,
    source_page
  } = req.body || {};

  const cleanName = trimText(student_name);
  const cleanSchool = trimText(origin_school);
  const cleanGuardianName = trimText(guardian_name);
  const normalizedPhone = normalizeGuardianPhone(guardian_phone);

  if (!cleanName || !cleanSchool || !normalizedPhone) {
    return res.status(400).json({ ok: false, message: "student_name, origin_school, guardian_phone wajib diisi" });
  }
  if (!isValidGuardianPhone(normalizedPhone)) {
    return res.status(400).json({ ok: false, message: "Nomor wali tidak valid. Gunakan nomor WhatsApp Indonesia aktif." });
  }

  const result = await query(
    "INSERT INTO ppdb_registrations (student_name, origin_school, guardian_name, guardian_phone, notes, source_page) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [cleanName, cleanSchool, cleanGuardianName || null, normalizedPhone, trimText(notes) || null, trimText(source_page) || "/ppdb"]
  );

  return res.status(201).json({
    ok: true,
    message: "Pendaftaran awal berhasil dikirim",
    data: result.rows[0]
  });
}));

app.get("/api/ppdb/queue", requirePermission("read"), asyncHandler(async (req, res) => {
  const { status } = req.query;
  const cleanStatus = trimText(status).toLowerCase();
  if (cleanStatus && !PPDB_STATUS.has(cleanStatus)) {
    return res.status(400).json({ ok: false, message: "status PPDB tidak valid" });
  }
  const rows = await query("SELECT * FROM ppdb_registrations ORDER BY id DESC");
  const filtered = cleanStatus ? rows.rows.filter((row) => String(row.status).toLowerCase() === cleanStatus) : rows.rows;
  return res.json(filtered);
}));

app.patch("/api/ppdb/queue/:id/status", requirePermission("approve"), asyncHandler(async (req, res) => {
  const parsedId = asInt(req.params.id);
  const { status, verified_by } = req.body || {};
  const cleanStatus = trimText(status).toLowerCase();
  if (!PPDB_STATUS.has(cleanStatus)) {
    return res.status(400).json({ ok: false, message: "status PPDB tidak valid" });
  }

  const verifiedAt = cleanStatus === "verified" ? nowIso() : null;
  const updated = await query(
    "UPDATE ppdb_registrations SET status = $1, verified_by = $2, verified_at = $3 WHERE id = $4 RETURNING *",
    [cleanStatus, trimText(verified_by) || null, verifiedAt, parsedId]
  );
  if (!updated.rows.length) {
    return res.status(404).json({ ok: false, message: "Data PPDB tidak ditemukan" });
  }
  return res.json({ ok: true, data: updated.rows[0] });
}));

// ════════════════════════════════════════════════════════════
// STUDENTS
// ════════════════════════════════════════════════════════════

app.get("/api/students", requirePermission("read"), asyncHandler(async (_req, res) => {
  const rows = await query("SELECT * FROM students ORDER BY id DESC");
  return res.json(rows.rows);
}));

app.post("/api/students", requirePermission("write"), asyncHandler(async (req, res) => {
  const { nis, full_name, class_name, guardian_name } = req.body || {};
  const cleanNis = trimText(nis), cleanName = trimText(full_name), cleanClass = trimText(class_name);
  if (!cleanNis || !cleanName || !cleanClass) {
    return res.status(400).json({ ok: false, message: "nis, full_name, class_name wajib diisi" });
  }
  try {
    const result = await query(
      "INSERT INTO students (nis, full_name, class_name, guardian_name) VALUES ($1,$2,$3,$4) RETURNING *",
      [cleanNis, cleanName, cleanClass, trimText(guardian_name) || null]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
}));

app.patch("/api/students/:id/status", requirePermission("write"), asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};
  const validStatus = new Set(["aktif","alumni","keluar"]);
  if (!validStatus.has(status)) return res.status(400).json({ ok: false, message: "status tidak valid" });
  const result = await query("UPDATE students SET status = $1 WHERE id = $2 RETURNING *", [status, asInt(id)]);
  if (!result.rows.length) return res.status(404).json({ ok: false, message: "Santri tidak ditemukan" });
  return res.json(result.rows[0]);
}));

// ════════════════════════════════════════════════════════════
// ATTENDANCE
// ════════════════════════════════════════════════════════════

app.get("/api/attendance", requirePermission("read"), asyncHandler(async (req, res) => {
  const { student_id, status, date } = req.query;
  const rows = await query("SELECT * FROM attendance ORDER BY id DESC");
  const cleanStatus = trimText(status).toLowerCase();
  const parsedStudentId = student_id ? asInt(student_id) : null;
  const cleanDate = trimText(date);
  if (cleanStatus && !ATTENDANCE_STATUS.has(cleanStatus)) return res.status(400).json({ ok: false, message: "status presensi tidak valid" });
  if (cleanDate && !DATE_FORMAT.test(cleanDate)) return res.status(400).json({ ok: false, message: "format date harus YYYY-MM-DD" });
  const filtered = rows.rows.filter((row) => {
    if (parsedStudentId && Number(row.student_id) !== parsedStudentId) return false;
    if (cleanStatus && String(row.status).toLowerCase() !== cleanStatus) return false;
    if (cleanDate && String(row.attendance_date).slice(0, 10) !== cleanDate) return false;
    return true;
  });
  return res.json(filtered);
}));

app.post("/api/attendance", requirePermission("write"), asyncHandler(async (req, res) => {
  const { student_id, attendance_date, status, note } = req.body || {};
  const parsedStudentId = asInt(student_id);
  const cleanStatus = trimText(status).toLowerCase();
  const cleanDate = trimText(attendance_date);
  if (!parsedStudentId || !cleanDate || !cleanStatus) return res.status(400).json({ ok: false, message: "student_id, attendance_date, status wajib diisi" });
  if (!ATTENDANCE_STATUS.has(cleanStatus)) return res.status(400).json({ ok: false, message: "status presensi tidak valid" });
  if (!DATE_FORMAT.test(cleanDate)) return res.status(400).json({ ok: false, message: "format attendance_date harus YYYY-MM-DD" });
  if (!(await checkStudentExists(parsedStudentId))) return res.status(404).json({ ok: false, message: "Santri tidak ditemukan" });
  const result = await query(
    "INSERT INTO attendance (student_id, attendance_date, status, note) VALUES ($1,$2,$3,$4) RETURNING *",
    [parsedStudentId, cleanDate, cleanStatus, trimText(note) || null]
  );
  return res.status(201).json(result.rows[0]);
}));

// ════════════════════════════════════════════════════════════
// BILLING
// ════════════════════════════════════════════════════════════

app.get("/api/billing", requirePermission("read"), asyncHandler(async (req, res) => {
  const { student_id, month, status } = req.query;
  const rows = await query("SELECT * FROM billing ORDER BY id DESC");
  const parsedStudentId = student_id ? asInt(student_id) : null;
  const cleanMonth = trimText(month), cleanStatus = trimText(status).toLowerCase();
  if (cleanStatus && !BILLING_STATUS.has(cleanStatus)) return res.status(400).json({ ok: false, message: "status billing tidak valid" });
  if (cleanMonth && !MONTH_FORMAT.test(cleanMonth)) return res.status(400).json({ ok: false, message: "format month harus YYYY-MM" });
  const filtered = rows.rows.filter((row) => {
    if (parsedStudentId && Number(row.student_id) !== parsedStudentId) return false;
    if (cleanMonth && String(row.month) !== cleanMonth) return false;
    if (cleanStatus && String(row.status).toLowerCase() !== cleanStatus) return false;
    return true;
  });
  return res.json(filtered);
}));

app.post("/api/billing", requirePermission("write"), asyncHandler(async (req, res) => {
  const { student_id, month, amount } = req.body || {};
  const parsedStudentId = asInt(student_id), cleanMonth = trimText(month), parsedAmount = asAmount(amount);
  if (!parsedStudentId || !cleanMonth || !Number.isFinite(parsedAmount)) return res.status(400).json({ ok: false, message: "student_id, month, amount wajib diisi" });
  if (!MONTH_FORMAT.test(cleanMonth)) return res.status(400).json({ ok: false, message: "format month harus YYYY-MM" });
  if (parsedAmount <= 0) return res.status(400).json({ ok: false, message: "amount harus lebih dari 0" });
  if (!(await checkStudentExists(parsedStudentId))) return res.status(404).json({ ok: false, message: "Santri tidak ditemukan" });
  try {
    const result = await query(
      "INSERT INTO billing (student_id, month, amount) VALUES ($1,$2,$3) RETURNING *",
      [parsedStudentId, cleanMonth, parsedAmount]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
}));

app.patch("/api/billing/:id", requirePermission("write"), asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { paid_amount, status } = req.body || {};
  const parsedId = asInt(id);
  if (!parsedId) return res.status(400).json({ ok: false, message: "id tidak valid" });

  // Cek billing exists
  const existing = await query("SELECT * FROM billing WHERE id = $1", [parsedId]);
  if (!existing.rows.length) return res.status(404).json({ ok: false, message: "Billing tidak ditemukan" });
  const row = existing.rows[0];

  const newPaidAmount = paid_amount !== undefined ? asAmount(paid_amount) : Number(row.paid_amount);
  const totalAmount = Number(row.amount);

  let newStatus = status || row.status;
  if (paid_amount !== undefined) {
    if (newPaidAmount <= 0) newStatus = "unpaid";
    else if (newPaidAmount >= totalAmount) newStatus = "paid";
    else newStatus = "partial";
  }

  if (!BILLING_STATUS.has(newStatus)) return res.status(400).json({ ok: false, message: "status billing tidak valid" });
  const paidAt = newStatus === "paid" ? nowIso() : (row.paid_at || null);

  const result = await query(
    "UPDATE billing SET paid_amount = $1, status = $2, paid_at = $3 WHERE id = $4 RETURNING *",
    [newPaidAmount, newStatus, paidAt, parsedId]
  );
  return res.json(result.rows[0]);
}));

app.get("/api/billing/summary", requirePermission("read"), asyncHandler(async (_req, res) => {
  const rows = await query("SELECT * FROM billing ORDER BY id DESC");
  const all = rows.rows;
  const currentMonth = nowIso().slice(0, 7);

  const summary = {
    total_tagihan:  all.length,
    total_nominal:  all.reduce((s, b) => s + Number(b.amount || 0), 0),
    total_terkumpul: all.filter((b) => b.status === "paid").reduce((s, b) => s + Number(b.amount || 0), 0),
    total_belum_lunas: all.filter((b) => b.status !== "paid").reduce((s, b) => s + Number(b.amount || 0), 0),
    bulan_ini: {
      tagihan: all.filter((b) => b.month === currentMonth).length,
      lunas:   all.filter((b) => b.month === currentMonth && b.status === "paid").length,
      belum:   all.filter((b) => b.month === currentMonth && b.status !== "paid").length
    },
    by_status: {
      unpaid:  all.filter((b) => b.status === "unpaid").length,
      partial: all.filter((b) => b.status === "partial").length,
      paid:    all.filter((b) => b.status === "paid").length
    }
  };
  return res.json({ ok: true, summary });
}));

// ════════════════════════════════════════════════════════════
// TAHFIDZ
// ════════════════════════════════════════════════════════════

app.get("/api/tahfidz", requirePermission("read"), asyncHandler(async (req, res) => {
  const { student_id, type, date_from, date_to } = req.query;
  const rows = await query("SELECT * FROM tahfidz_records ORDER BY id DESC");
  const parsedStudentId = student_id ? asInt(student_id) : null;
  const cleanType = trimText(type).toLowerCase();

  const filtered = rows.rows.filter((row) => {
    if (parsedStudentId && Number(row.student_id) !== parsedStudentId) return false;
    if (cleanType && row.type !== cleanType) return false;
    if (date_from && String(row.record_date).slice(0, 10) < date_from) return false;
    if (date_to && String(row.record_date).slice(0, 10) > date_to) return false;
    return true;
  });
  return res.json(filtered);
}));

app.post("/api/tahfidz", requirePermission("write"), asyncHandler(async (req, res) => {
  const { student_id, record_date, type, surah_from, ayat_from, surah_to, ayat_to, juz, quality, note } = req.body || {};
  const parsedStudentId = asInt(student_id);
  const cleanType = trimText(type).toLowerCase();
  const cleanDate = trimText(record_date) || nowIso().slice(0, 10);

  if (!parsedStudentId) return res.status(400).json({ ok: false, message: "student_id wajib diisi" });
  if (!TAHFIDZ_TYPE.has(cleanType)) return res.status(400).json({ ok: false, message: "type harus ziyadah atau murojaah" });
  if (!trimText(surah_from) || !trimText(surah_to)) return res.status(400).json({ ok: false, message: "surah_from dan surah_to wajib diisi" });
  if (!asInt(ayat_from) || !asInt(ayat_to)) return res.status(400).json({ ok: false, message: "ayat_from dan ayat_to wajib diisi" });
  if (!(await checkStudentExists(parsedStudentId))) return res.status(404).json({ ok: false, message: "Santri tidak ditemukan" });

  const cleanQuality = trimText(quality) || "jayyid";
  if (!TAHFIDZ_QUALITY.has(cleanQuality)) return res.status(400).json({ ok: false, message: "quality tidak valid" });

  const result = await query(
    "INSERT INTO tahfidz_records (student_id, record_date, type, surah_from, ayat_from, surah_to, ayat_to, juz, quality, note) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
    [parsedStudentId, cleanDate, cleanType, trimText(surah_from), asInt(ayat_from), trimText(surah_to), asInt(ayat_to), juz ? asInt(juz) : null, cleanQuality, trimText(note) || null]
  );
  return res.status(201).json(result.rows[0]);
}));

app.get("/api/tahfidz/summary/:student_id", requirePermission("read"), asyncHandler(async (req, res) => {
  const parsedStudentId = asInt(req.params.student_id);
  if (!parsedStudentId) return res.status(400).json({ ok: false, message: "student_id tidak valid" });
  if (!(await checkStudentExists(parsedStudentId))) return res.status(404).json({ ok: false, message: "Santri tidak ditemukan" });

  const rows = await query("SELECT * FROM tahfidz_records ORDER BY id DESC");
  const records = rows.rows.filter((r) => Number(r.student_id) === parsedStudentId);

  return res.json({
    ok: true,
    student_id: parsedStudentId,
    summary: {
      total_ziyadah: records.filter((r) => r.type === "ziyadah").length,
      total_murojaah: records.filter((r) => r.type === "murojaah").length,
      latest_record: records[0] || null,
      quality_breakdown: Object.fromEntries(
        [...TAHFIDZ_QUALITY].map((q) => [q, records.filter((r) => r.quality === q).length])
      )
    }
  });
}));

// ════════════════════════════════════════════════════════════
// DORMITORY
// ════════════════════════════════════════════════════════════

app.get("/api/dormitory/rooms", requirePermission("read"), asyncHandler(async (req, res) => {
  const rows = await query("SELECT * FROM dormitory_rooms ORDER BY id DESC");
  const { gender, building } = req.query;
  const filtered = rows.rows.filter((row) => {
    if (gender && row.gender !== gender) return false;
    if (building && !String(row.building).toLowerCase().includes(building.toLowerCase())) return false;
    return true;
  });
  return res.json(filtered);
}));

app.post("/api/dormitory/rooms", requirePermission("write"), asyncHandler(async (req, res) => {
  const { room_code, building, floor, capacity, gender } = req.body || {};
  const cleanCode = trimText(room_code), cleanBuilding = trimText(building);
  const cleanGender = trimText(gender).toUpperCase();

  if (!cleanCode || !cleanBuilding) return res.status(400).json({ ok: false, message: "room_code dan building wajib diisi" });
  if (!["L","P"].includes(cleanGender)) return res.status(400).json({ ok: false, message: "gender harus L atau P" });

  try {
    const result = await query(
      "INSERT INTO dormitory_rooms (room_code, building, floor, capacity, gender) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [cleanCode, cleanBuilding, asInt(floor) || 1, asInt(capacity) || 10, cleanGender]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
}));

app.get("/api/dormitory/assignments", requirePermission("read"), asyncHandler(async (req, res) => {
  const rows = await query("SELECT * FROM dormitory_assignments ORDER BY id DESC");
  const { student_id, room_id } = req.query;
  const filtered = rows.rows.filter((row) => {
    if (student_id && Number(row.student_id) !== asInt(student_id)) return false;
    if (room_id && Number(row.room_id) !== asInt(room_id)) return false;
    return true;
  });
  return res.json(filtered);
}));

app.post("/api/dormitory/assignments", requirePermission("write"), asyncHandler(async (req, res) => {
  const { student_id, room_id, assigned_at, note } = req.body || {};
  const parsedStudentId = asInt(student_id), parsedRoomId = asInt(room_id);
  const cleanDate = trimText(assigned_at) || nowIso().slice(0, 10);

  if (!parsedStudentId || !parsedRoomId) return res.status(400).json({ ok: false, message: "student_id dan room_id wajib diisi" });
  if (!(await checkStudentExists(parsedStudentId))) return res.status(404).json({ ok: false, message: "Santri tidak ditemukan" });

  const result = await query(
    "INSERT INTO dormitory_assignments (student_id, room_id, assigned_at, note) VALUES ($1,$2,$3,$4) RETURNING *",
    [parsedStudentId, parsedRoomId, cleanDate, trimText(note) || null]
  );
  return res.status(201).json(result.rows[0]);
}));

// ════════════════════════════════════════════════════════════
// PERMITS (Izin Santri)
// ════════════════════════════════════════════════════════════

app.get("/api/permits", requirePermission("read"), asyncHandler(async (req, res) => {
  const rows = await query("SELECT * FROM student_permits ORDER BY id DESC");
  const { student_id, status, permit_type } = req.query;
  const filtered = rows.rows.filter((row) => {
    if (student_id && Number(row.student_id) !== asInt(student_id)) return false;
    if (status && row.status !== status) return false;
    if (permit_type && row.permit_type !== permit_type) return false;
    return true;
  });
  return res.json(filtered);
}));

app.post("/api/permits", requirePermission("write"), asyncHandler(async (req, res) => {
  const { student_id, permit_type, reason, start_date, end_date } = req.body || {};
  const parsedStudentId = asInt(student_id);
  const cleanType = trimText(permit_type);
  const cleanReason = trimText(reason);

  if (!parsedStudentId || !cleanType || !cleanReason || !trimText(start_date) || !trimText(end_date)) {
    return res.status(400).json({ ok: false, message: "student_id, permit_type, reason, start_date, end_date wajib diisi" });
  }
  if (!PERMIT_TYPE.has(cleanType)) return res.status(400).json({ ok: false, message: "permit_type tidak valid" });
  if (!(await checkStudentExists(parsedStudentId))) return res.status(404).json({ ok: false, message: "Santri tidak ditemukan" });

  const result = await query(
    "INSERT INTO student_permits (student_id, permit_type, reason, start_date, end_date) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [parsedStudentId, cleanType, cleanReason, trimText(start_date), trimText(end_date)]
  );
  return res.status(201).json(result.rows[0]);
}));

app.patch("/api/permits/:id/status", requirePermission("approve"), asyncHandler(async (req, res) => {
  const parsedId = asInt(req.params.id);
  const { status, approved_by } = req.body || {};
  if (!PERMIT_STATUS.has(status)) return res.status(400).json({ ok: false, message: "status tidak valid" });

  const approvedAt = ["approved","rejected"].includes(status) ? nowIso() : null;
  const result = await query(
    "UPDATE student_permits SET status = $1, approved_by = $2, approved_at = $3 WHERE id = $4 RETURNING *",
    [status, trimText(approved_by) || null, approvedAt, parsedId]
  );
  if (!result.rows.length) return res.status(404).json({ ok: false, message: "Izin tidak ditemukan" });
  return res.json(result.rows[0]);
}));

// ════════════════════════════════════════════════════════════
// HR / STAFF
// ════════════════════════════════════════════════════════════

app.get("/api/staff", requirePermission("read"), asyncHandler(async (req, res) => {
  const rows = await query("SELECT * FROM staff ORDER BY id DESC");
  const { role, status } = req.query;
  const filtered = rows.rows.filter((row) => {
    if (role && row.role !== role) return false;
    if (status && row.status !== status) return false;
    return true;
  });
  return res.json(filtered);
}));

app.post("/api/staff", requirePermission("write"), asyncHandler(async (req, res) => {
  const { nip, full_name, role, subject, phone, address, join_date } = req.body || {};
  const cleanName = trimText(full_name), cleanRole = trimText(role);

  if (!cleanName || !cleanRole) return res.status(400).json({ ok: false, message: "full_name dan role wajib diisi" });
  if (!STAFF_ROLE.has(cleanRole)) return res.status(400).json({ ok: false, message: `role tidak valid. Pilihan: ${[...STAFF_ROLE].join(", ")}` });

  const result = await query(
    "INSERT INTO staff (nip, full_name, role, subject, phone, address, join_date) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
    [trimText(nip) || null, cleanName, cleanRole, trimText(subject) || null, trimText(phone) || null, trimText(address) || null, trimText(join_date) || null]
  );
  return res.status(201).json(result.rows[0]);
}));

app.patch("/api/staff/:id/salary", requirePermission("manage"), asyncHandler(async (req, res) => {
  const parsedId = asInt(req.params.id);
  const { salary } = req.body || {};
  const parsedSalary = asAmount(salary);
  if (!parsedSalary || parsedSalary < 0) return res.status(400).json({ ok: false, message: "salary tidak valid" });

  const result = await query("UPDATE staff SET salary = $1 WHERE id = $2 RETURNING *", [parsedSalary, parsedId]);
  if (!result.rows.length) return res.status(404).json({ ok: false, message: "Staff tidak ditemukan" });
  return res.json(result.rows[0]);
}));

// ════════════════════════════════════════════════════════════
// ERROR HANDLER
// ════════════════════════════════════════════════════════════

app.use((error, _req, res, _next) => {
  console.error("Unhandled API error:", error.message);
  observability.errorCount += 1;
  return res.status(500).json({ ok: false, message: "Terjadi error di server" });
});

// ── Start ─────────────────────────────────────────────────────
const port = Number(process.env.PORT || 4000);

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend running on http://localhost:${port} (db: ${usingMemoryDb() ? "memory" : "postgres"})`);
      console.log("Modules: students, attendance, billing, tahfidz, dormitory, permits, staff, ppdb, dashboard, integration");
    });
  })
  .catch((error) => {
    console.error("Init failed:", error.message);
    process.exit(1);
  });

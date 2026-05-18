"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchApi } from "../../lib/api-client";
import { ROLE_LABEL, canAccessPath } from "../../lib/rbac";

// ── helpers ──────────────────────────────────────────────────────────────────
function fmt(v) { return new Intl.NumberFormat("id-ID").format(Number(v || 0)); }
function ts(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" });
}

// ── static data ──────────────────────────────────────────────────────────────
const ROLE_ORDER = [
  "superadmin",
  "mudir_aam",
  "pengasuh",
  "admin_keuangan",
  "admin_kesantrian",
  "kepala_sekolah",
  "bendahara",
  "ustadz",
  "ustadzah",
  "staff_umum",
  "wali",
  "umum"
];

const ROLE_ICON = {
  superadmin: "🛡️",
  mudir_aam: "🕌",
  pengasuh: "📈",
  admin_keuangan: "💳",
  admin_kesantrian: "🛏️",
  kepala_sekolah: "🎓",
  bendahara: "💰",
  ustadz: "📖",
  ustadzah: "📚",
  staff_umum: "👤",
  wali: "👨‍👩‍👧",
  umum: "🌐"
};

const ROLE_COLOR = {
  superadmin: "#1a1a2e",
  mudir_aam: "#0f3d25",
  pengasuh: "#244c7a",
  admin_keuangan: "#245f82",
  admin_kesantrian: "#7a5b2f",
  kepala_sekolah: "#4c4383",
  bendahara: "#1f6b43",
  ustadz: "#2a8a57",
  ustadzah: "#8f3e58",
  staff_umum: "#5b4a31",
  wali: "#7a3f55",
  umum: "#2e5b67"
};

const ROLES = ROLE_ORDER.map((value) => ({
  value,
  label: ROLE_LABEL[value] || value,
  icon: ROLE_ICON[value] || "👤",
  color: ROLE_COLOR[value] || "#2e5b67"
}));

const ROLE_MAP = Object.fromEntries(ROLES.map((r) => [r.value, r]));

const MODULE_PERMISSION_TARGETS = [
  { module: "Dashboard", path: "/dashboard" },
  { module: "Administrasi Santri", path: "/administrasi-santri" },
  { module: "Tahfidz", path: "/tahfidz" },
  { module: "Keuangan", path: "/keuangan" },
  { module: "Asrama", path: "/asrama" },
  { module: "Perizinan", path: "/izin" },
  { module: "SDM / HR", path: "/hr" },
  { module: "PPDB", path: "/ppdb" },
  { module: "Website/CMS", path: "/website/pengumuman" },
  { module: "Portal Wali", path: "/wali" },
  { module: "Super Admin", path: "/superadmin" }
];

const PERMISSIONS = MODULE_PERMISSION_TARGETS.map((item) => ({
  module: item.module,
  roles: ROLES.filter((role) => canAccessPath(role.value, item.path)).map((role) => role.value)
}));

const DUMMY_USERS = [
  { id: 1, username: "superadmin",  name: "Administrator Sistem", role: "superadmin",    status: "aktif", last_login: "2025-05-17T08:00:00Z", created_at: "2024-01-01T00:00:00Z" },
  { id: 2, username: "mudir_aam",   name: "KH. Ahmad Fauzan",    role: "mudir_aam",     status: "aktif", last_login: "2025-05-17T07:30:00Z", created_at: "2024-01-05T00:00:00Z" },
  { id: 3, username: "pengasuh.01", name: "Abuya Pengasuh",      role: "pengasuh",      status: "aktif", last_login: "2025-05-17T06:55:00Z", created_at: "2024-01-08T00:00:00Z" },
  { id: 4, username: "adm_keu_01",  name: "Admin Keuangan 1",    role: "admin_keuangan",status: "aktif", last_login: "2025-05-17T08:22:00Z", created_at: "2024-02-02T00:00:00Z" },
  { id: 5, username: "adm_kes_01",  name: "Admin Kesantrian 1",  role: "admin_kesantrian", status: "aktif", last_login: "2025-05-17T07:58:00Z", created_at: "2024-02-03T00:00:00Z" },
  { id: 6, username: "kepsek",      name: "Drs. Mahmud Syarif",  role: "kepala_sekolah",status: "aktif", last_login: "2025-05-15T14:00:00Z", created_at: "2024-01-20T00:00:00Z" },
  { id: 7, username: "bendahara1",  name: "Siti Fatimah, SE",    role: "bendahara",     status: "aktif", last_login: "2025-05-17T09:00:00Z", created_at: "2024-02-10T00:00:00Z" },
  { id: 8, username: "ust_hasan",   name: "Ust. Hasan Bisri",    role: "ustadz",        status: "aktif", last_login: "2025-05-16T20:00:00Z", created_at: "2024-02-01T00:00:00Z" },
  { id: 9, username: "ust_aisyah",  name: "Ustadzah Aisyah",     role: "ustadzah",      status: "aktif", last_login: "2025-05-16T19:50:00Z", created_at: "2024-02-05T00:00:00Z" },
  { id: 10, username: "staff01",    name: "Rizki Maulana",       role: "staff_umum",    status: "aktif", last_login: "2025-05-17T08:45:00Z", created_at: "2024-03-01T00:00:00Z" },
  { id: 11, username: "wali_001",   name: "Ahmad Suryadi",       role: "wali",          status: "aktif", last_login: "2025-05-10T11:00:00Z", created_at: "2024-04-15T00:00:00Z" },
  { id: 12, username: "umum.01",    name: "Pengguna Umum",       role: "umum",          status: "aktif", last_login: "2025-05-17T05:35:00Z", created_at: "2024-04-18T00:00:00Z" },
  { id: 13, username: "ust_ali",    name: "Ust. Ali Imron",      role: "ustadz",        status: "cuti",  last_login: "2025-04-28T10:00:00Z", created_at: "2024-02-15T00:00:00Z" },
];

const DUMMY_AUDIT = [
  { id: 1, user: "superadmin",  action: "UPDATE_USER",    target: "user:ust_ali → status: cuti",      ip: "192.168.1.10", ts: "2025-05-17T08:02:00Z" },
  { id: 2, user: "bendahara1",  action: "UPDATE_BILLING", target: "billing:123 → paid_amount: 350000", ip: "192.168.1.15", ts: "2025-05-17T09:01:00Z" },
  { id: 3, user: "mudir_aam",   action: "APPROVE_PERMIT", target: "permit:45 → approved",              ip: "192.168.1.11", ts: "2025-05-17T07:35:00Z" },
  { id: 4, user: "ust_hasan",   action: "CREATE_TAHFIDZ", target: "tahfidz:new ziyadah santri:12",     ip: "192.168.1.20", ts: "2025-05-16T20:05:00Z" },
  { id: 5, user: "superadmin",  action: "CREATE_USER",    target: "user:wali_002 → role: wali",        ip: "192.168.1.10", ts: "2025-05-16T16:00:00Z" },
  { id: 6, user: "staff01",     action: "CREATE_ROOM",    target: "dormitory:B-205 → kapasitas: 12",   ip: "192.168.1.30", ts: "2025-05-16T14:22:00Z" },
  { id: 7, user: "kepsek",      action: "UPDATE_STAFF",   target: "staff:7 → subject: Ushul Fiqih",    ip: "192.168.1.12", ts: "2025-05-15T14:10:00Z" },
  { id: 8, user: "superadmin",  action: "DELETE_USER",    target: "user:old_user → removed",           ip: "192.168.1.10", ts: "2025-05-14T11:00:00Z" },
];

const SYSTEM_SERVICES = [
  { name: "Backend API (Node.js)",  port: 4000, status: "online",  uptime: "7d 14h 22m", version: "v1.4.2" },
  { name: "Frontend (Next.js 15)", port: 3000, status: "online",  uptime: "7d 14h 22m", version: "v2.0.0" },
  { name: "PostgreSQL Database",   port: 5432, status: "online",  uptime: "30d 02h 15m",version: "16.2" },
  { name: "Redis Cache",           port: 6379, status: "offline", uptime: "—",          version: "7.2" },
  { name: "Go API Service",        port: 5000, status: "offline", uptime: "—",          version: "v0.1.0 (beta)" },
  { name: "CI/CD (GitHub Actions)",port: null, status: "online",  uptime: "Aktif",      version: "latest" },
];

const TABS = [
  { id: "overview",   label: "📊 Overview" },
  { id: "users",      label: "👥 Manajemen User" },
  { id: "permissions",label: "🔒 Hak Akses" },
  { id: "system",     label: "🖥️ Status Sistem" },
  { id: "audit",      label: "📋 Audit Log" },
  { id: "settings",   label: "⚙️ Konfigurasi" },
];

const ACTION_COLOR = {
  UPDATE_USER: { bg: "rgba(36,95,130,0.12)", fg: "#245f82" },
  CREATE_USER: { bg: "rgba(24,117,72,0.12)", fg: "#187548" },
  DELETE_USER: { bg: "rgba(178,58,47,0.12)", fg: "#b23a2f" },
  UPDATE_BILLING: { bg: "rgba(122,91,47,0.12)", fg: "#7a5b2f" },
  APPROVE_PERMIT: { bg: "rgba(24,117,72,0.12)", fg: "#187548" },
  CREATE_TAHFIDZ: { bg: "rgba(31,107,67,0.12)", fg: "#1f6b43" },
  CREATE_ROOM: { bg: "rgba(76,67,131,0.12)", fg: "#4c4383" },
  UPDATE_STAFF: { bg: "rgba(122,91,47,0.12)", fg: "#7a5b2f" },
};

// ── component ─────────────────────────────────────────────────────────────────
export default function SuperAdminPage() {
  const [activeTab, setActiveTab]   = useState("overview");
  const [users, setUsers]           = useState(DUMMY_USERS);
  const [apiOk, setApiOk]           = useState(false);
  const [loading, setLoading]       = useState(false);
  const [message, setMessage]       = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [editUser, setEditUser]     = useState(null);   // user being edited
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser]       = useState({ username: "", name: "", role: "staff_umum", password: "" });
  const [configForm, setConfigForm] = useState({
    site_name: "Pesantren Asy-Syifaa",
    spp_amount: "350000",
    tahun_ajaran: "2025/2026",
    max_izin_hari: "7",
    backup_schedule: "daily",
    maintenance_mode: false,
    allow_ppdb: true,
    debug_mode: false,
    panel_grad_from: "#f2f7f4",
    panel_grad_to: "#eaf1ed",
    panel_bg_image: "",
  });

  function msg(type, text, ms = 4000) {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), ms);
  }
  function cf(k, v) { setConfigForm((p) => ({ ...p, [k]: v })); }

  async function checkApi() {
    setLoading(true);
    try {
      const res = await fetchApi("/api/health");
      setApiOk(res.ok);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { checkApi(); }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const from = localStorage.getItem("asf_panel_grad_from");
    const to = localStorage.getItem("asf_panel_grad_to");
    const img = localStorage.getItem("asf_panel_bg_image");
    setConfigForm((prev) => ({
      ...prev,
      panel_grad_from: from || prev.panel_grad_from,
      panel_grad_to: to || prev.panel_grad_to,
      panel_bg_image: img || prev.panel_bg_image,
    }));
  }, []);

  function handleUpdateUser(id, patch) {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, ...patch } : u));
    setEditUser(null);
    msg("success", "Data user berhasil diperbarui.");
  }

  function handleAddUser(e) {
    e.preventDefault();
    if (!newUser.username || !newUser.name || !newUser.password) return;
    const newId = Math.max(...users.map((u) => u.id)) + 1;
    setUsers((prev) => [...prev, { id: newId, ...newUser, status: "aktif", last_login: null, created_at: new Date().toISOString() }]);
    setNewUser({ username: "", name: "", role: "staff_umum", password: "" });
    setShowAddUser(false);
    msg("success", `User "${newUser.username}" berhasil dibuat.`);
  }

  function handleToggleStatus(id) {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === "aktif" ? "nonaktif" : "aktif" } : u));
    msg("success", "Status user diperbarui.");
  }

  function handleDeleteUser(id) {
    const u = users.find((x) => x.id === id);
    if (u?.role === "superadmin") { msg("error", "Tidak dapat menghapus akun superadmin."); return; }
    setUsers((prev) => prev.filter((x) => x.id !== id));
    msg("success", "User berhasil dihapus.");
  }

  function handleSaveConfig(e) {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("asf_panel_grad_from", configForm.panel_grad_from || "#f2f7f4");
      localStorage.setItem("asf_panel_grad_to", configForm.panel_grad_to || "#eaf1ed");
      localStorage.setItem("asf_panel_bg_image", configForm.panel_bg_image || "");
      const root = document.documentElement;
      root.style.setProperty("--erp-panel-grad-from", configForm.panel_grad_from || "#f2f7f4");
      root.style.setProperty("--erp-panel-grad-to", configForm.panel_grad_to || "#eaf1ed");
      root.style.setProperty("--erp-panel-bg-image", configForm.panel_bg_image ? `url("${configForm.panel_bg_image}")` : "none");
    }
    msg("success", "Konfigurasi sistem berhasil disimpan.");
  }

  function handlePanelImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      msg("error", "File harus berupa gambar.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      cf("panel_bg_image", result);
    };
    reader.readAsDataURL(file);
  }

  const filteredUsers = useMemo(() => users.filter((u) => {
    const matchRole   = !filterRole   || u.role === filterRole;
    const matchStatus = !filterStatus || u.status === filterStatus;
    const matchSearch = !searchUser   || u.name.toLowerCase().includes(searchUser.toLowerCase()) || u.username.toLowerCase().includes(searchUser.toLowerCase());
    return matchRole && matchStatus && matchSearch;
  }), [users, filterRole, filterStatus, searchUser]);

  const byRole    = Object.fromEntries(ROLES.map((r) => [r.value, users.filter((u) => u.role === r.value).length]));
  const aktif     = users.filter((u) => u.status === "aktif").length;
  const nonaktif  = users.filter((u) => u.status !== "aktif").length;
  const onlineServices = SYSTEM_SERVICES.filter((s) => s.status === "online").length;

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(140deg, #0d0d1a 0%, #1a1a2e 50%, #2a2a4a 100%)",
        color: "#fff", padding: "1.8rem 1.5rem", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 75% 25%, rgba(99,77,255,0.15), transparent 55%)", pointerEvents: "none" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <p style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "999px", padding: "0.25rem 0.65rem", fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.55rem", color: "#c8c5ff" }}>
              🛡️ System Administration
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3.5vw, 2rem)", margin: "0 0 0.3rem" }}>
              Super Admin Panel
            </h1>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: "0.9rem" }}>
              Manajemen user, hak akses, konfigurasi sistem, dan audit log ERP Asy-Syifaa.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", background: apiOk ? "rgba(50,220,100,0.2)" : "rgba(220,50,50,0.2)", border: `1px solid ${apiOk ? "rgba(50,220,100,0.4)" : "rgba(220,50,50,0.4)"}`, borderRadius: "999px", padding: "0.25rem 0.65rem", fontSize: "0.75rem", fontWeight: 700, color: apiOk ? "#a7f3c4" : "#ffb3b3" }}>
              ● {apiOk ? "Sistem Online" : "API Offline"}
            </span>
            <button type="button" onClick={checkApi} disabled={loading} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", borderRadius: "0.6rem", padding: "0.3rem 0.7rem", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}>
              {loading ? "⟳..." : "⟳ Cek Status"}
            </button>
          </div>
        </div>
      </section>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.7rem", padding: "0.85rem 1.25rem 0" }}>
        {[
          { icon: "👥", label: "Total User",       value: users.length,     color: "#1a1a2e" },
          { icon: "✅", label: "User Aktif",        value: aktif,            color: "#1f6b43" },
          { icon: "🚫", label: "Nonaktif / Cuti",  value: nonaktif,         color: nonaktif > 0 ? "#a15d06" : "#187548" },
          { icon: "🖥️", label: "Service Online",   value: `${onlineServices}/${SYSTEM_SERVICES.length}`, color: onlineServices < SYSTEM_SERVICES.length ? "#a15d06" : "#1f6b43" },
          { icon: "📋", label: "Audit Log",        value: DUMMY_AUDIT.length, color: "#245f82" },
          { icon: "🔐", label: "Role Terdaftar",   value: ROLES.length,     color: "#4c4383" },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "0.85rem 1rem", boxShadow: "var(--card-shadow)" }}>
            <p style={{ margin: "0 0 0.25rem", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{kpi.icon} {kpi.label}</p>
            <p style={{ margin: 0, fontSize: "1.6rem", fontWeight: 800, color: kpi.color, lineHeight: 1 }}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Toast */}
      {message.text && (
        <div style={{ margin: "0.75rem 1.25rem 0", padding: "0.6rem 0.85rem", borderRadius: "0.65rem", fontWeight: 600, fontSize: "0.85rem",
          background: message.type === "error" ? "var(--danger-bg)" : "var(--success-bg)",
          color: message.type === "error" ? "var(--danger-fg)" : "var(--success-fg)",
          border: `1px solid ${message.type === "error" ? "rgba(178,58,47,0.2)" : "rgba(24,117,72,0.2)"}`,
        }}>
          {message.type === "error" ? "❌" : "✅"} {message.text}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.25rem", padding: "0.85rem 1.25rem 0", borderBottom: "1px solid var(--line)", overflowX: "auto" }}>
        {TABS.map((t) => (
          <button key={t.id} type="button" onClick={() => setActiveTab(t.id)} style={{
            padding: "0.5rem 1rem", borderRadius: "0.65rem 0.65rem 0 0", border: "none", whiteSpace: "nowrap",
            fontSize: "0.85rem", fontWeight: 700, cursor: "pointer",
            background: activeTab === t.id ? "var(--surface)" : "transparent",
            color: activeTab === t.id ? "#4c4383" : "var(--text-muted)",
            borderBottom: activeTab === t.id ? "2px solid #4c4383" : "2px solid transparent",
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── TAB: OVERVIEW ── */}
      {activeTab === "overview" && (
        <div style={{ padding: "1rem 1.25rem 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.85rem" }}>

            {/* Distribusi user per role */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
              <h3 style={{ margin: "0 0 0.85rem", fontSize: "0.96rem", fontWeight: 800 }}>👥 Distribusi User per Role</h3>
              {ROLES.map((r) => {
                const count = byRole[r.value] || 0;
                const pct   = users.length > 0 ? Math.round((count / users.length) * 100) : 0;
                return (
                  <div key={r.value} style={{ marginBottom: "0.65rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.83rem", marginBottom: "0.2rem" }}>
                      <span style={{ fontWeight: 600 }}>{r.icon} {r.label}</span>
                      <span style={{ color: "var(--text-muted)" }}>{count} user ({pct}%)</span>
                    </div>
                    <div style={{ height: "5px", borderRadius: "999px", background: "var(--surface-muted)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: r.color, borderRadius: "999px", transition: "width 500ms ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Status sistem ringkas */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
              <h3 style={{ margin: "0 0 0.85rem", fontSize: "0.96rem", fontWeight: 800 }}>🖥️ Status Layanan</h3>
              {SYSTEM_SERVICES.map((svc) => (
                <div key={svc.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.4rem 0", borderBottom: "1px solid var(--line)" }}>
                  <div>
                    <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 600 }}>{svc.name}</p>
                    <p style={{ margin: 0, fontSize: "0.72rem", color: "var(--text-muted)" }}>Port {svc.port || "—"} · {svc.version}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ display: "inline-flex", padding: "0.1rem 0.4rem", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 700,
                      background: svc.status === "online" ? "var(--success-bg)" : "var(--danger-bg)",
                      color: svc.status === "online" ? "var(--success-fg)" : "var(--danger-fg)",
                    }}>● {svc.status}</span>
                    <p style={{ margin: "0.1rem 0 0", fontSize: "0.68rem", color: "var(--text-muted)" }}>{svc.uptime}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Audit log terbaru */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
              <h3 style={{ margin: "0 0 0.85rem", fontSize: "0.96rem", fontWeight: 800 }}>📋 Aktivitas Terbaru</h3>
              {DUMMY_AUDIT.slice(0, 5).map((log) => {
                const ac = ACTION_COLOR[log.action] || { bg: "var(--surface-muted)", fg: "var(--text-muted)" };
                return (
                  <div key={log.id} style={{ display: "flex", gap: "0.65rem", padding: "0.45rem 0", borderBottom: "1px solid var(--line)", alignItems: "flex-start" }}>
                    <span style={{ display: "inline-flex", padding: "0.15rem 0.4rem", borderRadius: "0.35rem", fontSize: "0.66rem", fontWeight: 800, background: ac.bg, color: ac.fg, flexShrink: 0, marginTop: "0.1rem" }}>
                      {log.action.replace("_", " ")}
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: "0.8rem", fontWeight: 600 }}>{log.user}</p>
                      <p style={{ margin: 0, fontSize: "0.74rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{log.target}</p>
                      <p style={{ margin: 0, fontSize: "0.68rem", color: "var(--text-muted)" }}>{ts(log.ts)}</p>
                    </div>
                  </div>
                );
              })}
              <button type="button" onClick={() => setActiveTab("audit")} style={{ marginTop: "0.6rem", fontSize: "0.78rem", fontWeight: 700, color: "#4c4383", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                Lihat semua audit log →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: MANAJEMEN USER ── */}
      {activeTab === "users" && (
        <div style={{ padding: "1rem 1.25rem 2rem" }}>
          {/* Filter + Add */}
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.85rem", alignItems: "flex-end" }}>
            <div style={{ display: "grid", gap: "0.25rem", flex: "1 1 160px" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Cari User</label>
              <input value={searchUser} onChange={(e) => setSearchUser(e.target.value)} placeholder="Nama atau username..." style={{ padding: "0.45rem 0.7rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.88rem" }} />
            </div>
            <div style={{ display: "grid", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Role</label>
              <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} style={{ padding: "0.45rem 0.7rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.88rem" }}>
                <option value="">Semua Role</option>
                {ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>
            <div style={{ display: "grid", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Status</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ padding: "0.45rem 0.7rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.88rem" }}>
                <option value="">Semua Status</option>
                <option value="aktif">Aktif</option>
                <option value="cuti">Cuti</option>
                <option value="nonaktif">Nonaktif</option>
              </select>
            </div>
            <button type="button" onClick={() => setShowAddUser((s) => !s)} style={{ alignSelf: "flex-end", padding: "0.48rem 0.9rem", borderRadius: "0.65rem", border: "none", background: "#4c4383", color: "#fff", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
              + Tambah User
            </button>
          </div>

          {/* Add user form (inline) */}
          {showAddUser && (
            <form onSubmit={handleAddUser} style={{ background: "rgba(76,67,131,0.07)", border: "1px solid rgba(76,67,131,0.25)", borderRadius: "var(--radius-md)", padding: "1rem", marginBottom: "0.85rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.65rem" }}>
              <div style={{ display: "grid", gap: "0.2rem" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Username *</label>
                <input value={newUser.username} onChange={(e) => setNewUser((p) => ({ ...p, username: e.target.value }))} required placeholder="username_unik" style={{ padding: "0.48rem 0.65rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.88rem" }} />
              </div>
              <div style={{ display: "grid", gap: "0.2rem" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Nama Lengkap *</label>
                <input value={newUser.name} onChange={(e) => setNewUser((p) => ({ ...p, name: e.target.value }))} required placeholder="Nama lengkap" style={{ padding: "0.48rem 0.65rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.88rem" }} />
              </div>
              <div style={{ display: "grid", gap: "0.2rem" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Role</label>
                <select value={newUser.role} onChange={(e) => setNewUser((p) => ({ ...p, role: e.target.value }))} style={{ padding: "0.48rem 0.65rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.88rem" }}>
                  {ROLES.map((r) => <option key={r.value} value={r.value}>{r.icon} {r.label}</option>)}
                </select>
              </div>
              <div style={{ display: "grid", gap: "0.2rem" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Password *</label>
                <input type="password" value={newUser.password} onChange={(e) => setNewUser((p) => ({ ...p, password: e.target.value }))} required placeholder="min. 8 karakter" style={{ padding: "0.48rem 0.65rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.88rem" }} />
              </div>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end" }}>
                <button type="submit" style={{ flex: 1, padding: "0.48rem", borderRadius: "0.6rem", border: "none", background: "#4c4383", color: "#fff", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>✓ Buat</button>
                <button type="button" onClick={() => setShowAddUser(false)} style={{ flex: 1, padding: "0.48rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text-muted)", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>Batal</button>
              </div>
            </form>
          )}

          {/* User table */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", boxShadow: "var(--card-shadow)", overflow: "hidden" }}>
            <div style={{ padding: "0.85rem 1rem", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: "0.92rem", fontWeight: 800 }}>👥 Daftar User ({filteredUsers.length})</h3>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.87rem" }}>
                <thead>
                  <tr style={{ background: "var(--surface-muted)" }}>
                    {["ID","Username","Nama Lengkap","Role","Status","Login Terakhir","Dibuat","Aksi"].map((h) => (
                      <th key={h} style={{ padding: "0.6rem 0.85rem", textAlign: "left", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => {
                    const rc = ROLE_MAP[user.role];
                    const isEditing = editUser?.id === user.id;
                    return (
                      <tr key={user.id} style={{ borderTop: "1px solid var(--line)", background: isEditing ? "rgba(76,67,131,0.04)" : "transparent" }}>
                        <td style={{ padding: "0.55rem 0.85rem", color: "var(--text-muted)", fontSize: "0.78rem" }}>#{user.id}</td>
                        <td style={{ padding: "0.55rem 0.85rem", fontWeight: 800, fontFamily: "monospace", fontSize: "0.85rem" }}>{user.username}</td>
                        <td style={{ padding: "0.55rem 0.85rem", fontWeight: 600 }}>
                          {isEditing ? (
                            <input defaultValue={user.name} onBlur={(e) => handleUpdateUser(user.id, { name: e.target.value })} autoFocus style={{ padding: "0.3rem 0.5rem", borderRadius: "0.5rem", border: "1px solid #4c4383", background: "var(--surface)", color: "var(--text)", fontSize: "0.87rem", width: "100%" }} />
                          ) : user.name}
                        </td>
                        <td style={{ padding: "0.55rem 0.85rem" }}>
                          {isEditing ? (
                            <select defaultValue={user.role} onChange={(e) => handleUpdateUser(user.id, { role: e.target.value })} style={{ padding: "0.3rem 0.5rem", borderRadius: "0.5rem", border: "1px solid #4c4383", background: "var(--surface)", color: "var(--text)", fontSize: "0.85rem" }}>
                              {ROLES.map((r) => <option key={r.value} value={r.value}>{r.icon} {r.label}</option>)}
                            </select>
                          ) : (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.1rem 0.45rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700, background: rc ? `${rc.color}18` : "var(--surface-muted)", color: rc?.color || "var(--text-muted)", border: `1px solid ${rc ? rc.color + "33" : "var(--line)"}` }}>
                              {rc?.icon} {rc?.label || user.role}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: "0.55rem 0.85rem" }}>
                          <span style={{ display: "inline-flex", padding: "0.1rem 0.4rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700,
                            background: user.status === "aktif" ? "var(--success-bg)" : user.status === "cuti" ? "var(--warn-bg)" : "var(--danger-bg)",
                            color: user.status === "aktif" ? "var(--success-fg)" : user.status === "cuti" ? "var(--warn-fg)" : "var(--danger-fg)",
                          }}>{user.status}</span>
                        </td>
                        <td style={{ padding: "0.55rem 0.85rem", color: "var(--text-muted)", fontSize: "0.78rem" }}>{ts(user.last_login)}</td>
                        <td style={{ padding: "0.55rem 0.85rem", color: "var(--text-muted)", fontSize: "0.78rem" }}>{ts(user.created_at)}</td>
                        <td style={{ padding: "0.55rem 0.85rem" }}>
                          <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
                            <button type="button" onClick={() => setEditUser(isEditing ? null : user)} style={{ padding: "0.25rem 0.55rem", borderRadius: "0.45rem", border: "1px solid rgba(76,67,131,0.3)", background: isEditing ? "#4c4383" : "rgba(76,67,131,0.08)", color: isEditing ? "#fff" : "#4c4383", fontWeight: 700, fontSize: "0.72rem", cursor: "pointer" }}>
                              {isEditing ? "✓ Simpan" : "✏️ Edit"}
                            </button>
                            <button type="button" onClick={() => handleToggleStatus(user.id)} disabled={user.role === "superadmin" && user.id === 1} style={{ padding: "0.25rem 0.55rem", borderRadius: "0.45rem", border: "1px solid var(--line)", background: "var(--surface-muted)", color: "var(--text-muted)", fontWeight: 700, fontSize: "0.72rem", cursor: "pointer", opacity: user.role === "superadmin" && user.id === 1 ? 0.4 : 1 }}>
                              {user.status === "aktif" ? "⏸ Nonaktif" : "▶ Aktifkan"}
                            </button>
                            <button type="button" onClick={() => handleDeleteUser(user.id)} disabled={user.role === "superadmin"} style={{ padding: "0.25rem 0.55rem", borderRadius: "0.45rem", border: "1px solid rgba(178,58,47,0.3)", background: "rgba(178,58,47,0.06)", color: "var(--danger-fg)", fontWeight: 700, fontSize: "0.72rem", cursor: "pointer", opacity: user.role === "superadmin" ? 0.3 : 1 }}>
                              🗑
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: HAK AKSES ── */}
      {activeTab === "permissions" && (
        <div style={{ padding: "1rem 1.25rem 2rem" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", boxShadow: "var(--card-shadow)", overflow: "hidden" }}>
            <div style={{ padding: "0.85rem 1rem", borderBottom: "1px solid var(--line)" }}>
              <h3 style={{ margin: 0, fontSize: "0.92rem", fontWeight: 800 }}>🔒 Matriks Hak Akses per Modul</h3>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                ✅ = memiliki akses · — = tidak memiliki akses
              </p>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                <thead>
                  <tr style={{ background: "var(--surface-muted)" }}>
                    <th style={{ padding: "0.65rem 0.85rem", textAlign: "left", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", minWidth: "140px" }}>Modul</th>
                    {ROLES.map((r) => (
                      <th key={r.value} style={{ padding: "0.65rem 0.6rem", textAlign: "center", fontSize: "0.7rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.03em", minWidth: "90px" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.15rem" }}>
                          <span style={{ fontSize: "1rem" }}>{r.icon}</span>
                          <span style={{ whiteSpace: "nowrap" }}>{r.label}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PERMISSIONS.map((perm, i) => (
                    <tr key={perm.module} style={{ borderTop: "1px solid var(--line)", background: i % 2 === 0 ? "transparent" : "var(--surface-muted)" }}>
                      <td style={{ padding: "0.6rem 0.85rem", fontWeight: 700 }}>{perm.module}</td>
                      {ROLES.map((r) => {
                        const has = perm.roles.includes(r.value);
                        return (
                          <td key={r.value} style={{ padding: "0.6rem", textAlign: "center" }}>
                            {has ? (
                              <span style={{ display: "inline-flex", width: "1.5rem", height: "1.5rem", borderRadius: "50%", background: "var(--success-bg)", color: "var(--success-fg)", placeItems: "center", fontSize: "0.75rem", fontWeight: 900 }}>✓</span>
                            ) : (
                              <span style={{ color: "var(--line)", fontSize: "0.9rem" }}>—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Role descriptions */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "0.65rem", marginTop: "0.85rem" }}>
            {ROLES.map((r) => (
              <div key={r.value} style={{ background: "var(--surface)", border: `1px solid ${r.color}30`, borderRadius: "var(--radius-md)", padding: "0.85rem 1rem", boxShadow: "var(--card-shadow)", borderLeft: `3px solid ${r.color}` }}>
                <p style={{ margin: "0 0 0.2rem", fontWeight: 800, fontSize: "0.9rem" }}>{r.icon} {r.label}</p>
                <p style={{ margin: "0 0 0.35rem", fontSize: "0.72rem", fontFamily: "monospace", color: "var(--text-muted)" }}>{r.value}</p>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  Akses ke {PERMISSIONS.filter((p) => p.roles.includes(r.value)).length} dari {PERMISSIONS.length} modul
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB: STATUS SISTEM ── */}
      {activeTab === "system" && (
        <div style={{ padding: "1rem 1.25rem 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "0.85rem" }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
              <h3 style={{ margin: "0 0 0.85rem", fontSize: "0.96rem", fontWeight: 800 }}>🖥️ Status Layanan Sistem</h3>
              {SYSTEM_SERVICES.map((svc) => (
                <div key={svc.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.55rem 0", borderBottom: "1px solid var(--line)" }}>
                  <div>
                    <p style={{ margin: 0, fontSize: "0.86rem", fontWeight: 600 }}>{svc.name}</p>
                    <p style={{ margin: 0, fontSize: "0.73rem", color: "var(--text-muted)" }}>
                      {svc.port ? `Port ${svc.port}` : "Cloud"} · {svc.version} · Uptime: {svc.uptime}
                    </p>
                  </div>
                  <span style={{ display: "inline-flex", padding: "0.2rem 0.55rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 800, flexShrink: 0,
                    background: svc.status === "online" ? "var(--success-bg)" : "var(--danger-bg)",
                    color: svc.status === "online" ? "var(--success-fg)" : "var(--danger-fg)",
                    border: `1px solid ${svc.status === "online" ? "rgba(24,117,72,0.2)" : "rgba(178,58,47,0.2)"}`,
                  }}>● {svc.status === "online" ? "Online" : "Offline"}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
              <h3 style={{ margin: "0 0 0.85rem", fontSize: "0.96rem", fontWeight: 800 }}>🏗️ Informasi Stack Teknis</h3>
              {[
                { label: "Framework Frontend",   val: "Next.js 15 (App Router)" },
                { label: "Runtime Backend",      val: "Node.js + Express.js" },
                { label: "Database",             val: "PostgreSQL 16 (Docker)" },
                { label: "Cache Layer",          val: "Redis 7.2 (belum aktif)" },
                { label: "Go Microservice",      val: "Strangler Fig v0.1 (beta)" },
                { label: "Container",            val: "Docker Compose (multi-stage)" },
                { label: "CI/CD",                val: "GitHub Actions (auto-deploy)" },
                { label: "Auth",                 val: "JWT Token + Session Storage" },
                { label: "RBAC",                 val: `Role-Based Access Control (${ROLES.length} role)` },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid var(--line)", fontSize: "0.86rem", gap: "0.5rem" }}>
                  <span style={{ color: "var(--text-muted)", flexShrink: 0 }}>{row.label}</span>
                  <span style={{ fontWeight: 700, textAlign: "right" }}>{row.val}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(76,67,131,0.07)", border: "1px solid rgba(76,67,131,0.25)", borderRadius: "var(--radius-md)", padding: "1.1rem" }}>
              <h3 style={{ margin: "0 0 0.85rem", fontSize: "0.96rem", fontWeight: 800, color: "#4c4383" }}>⚡ Tindakan Sistem</h3>
              {[
                { label: "Restart Backend API",  desc: "Restart Node.js service",           danger: false },
                { label: "Clear Redis Cache",    desc: "Hapus semua data cache",             danger: false },
                { label: "Export Database",      desc: "Backup PostgreSQL ke file .sql",     danger: false },
                { label: "Jalankan Migrations",  desc: "Apply pending DB migrations",        danger: false },
                { label: "Reset Session Semua",  desc: "Paksa logout semua user aktif",      danger: true  },
                { label: "Maintenance Mode ON",  desc: "Nonaktifkan akses publik sementara", danger: true  },
              ].map((action) => (
                <div key={action.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0", borderBottom: "1px solid rgba(76,67,131,0.15)" }}>
                  <div>
                    <p style={{ margin: 0, fontSize: "0.86rem", fontWeight: 600, color: action.danger ? "var(--danger-fg)" : "var(--text)" }}>{action.label}</p>
                    <p style={{ margin: 0, fontSize: "0.72rem", color: "var(--text-muted)" }}>{action.desc}</p>
                  </div>
                  <button type="button" onClick={() => msg(action.danger ? "error" : "success", `${action.label} — simulasi saja (backend belum terhubung).`)} style={{
                    padding: "0.3rem 0.7rem", borderRadius: "0.5rem", fontWeight: 700, fontSize: "0.78rem", cursor: "pointer", flexShrink: 0,
                    border: `1px solid ${action.danger ? "rgba(178,58,47,0.3)" : "rgba(76,67,131,0.3)"}`,
                    background: action.danger ? "rgba(178,58,47,0.08)" : "rgba(76,67,131,0.08)",
                    color: action.danger ? "var(--danger-fg)" : "#4c4383",
                  }}>Jalankan</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: AUDIT LOG ── */}
      {activeTab === "audit" && (
        <div style={{ padding: "1rem 1.25rem 2rem" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", boxShadow: "var(--card-shadow)", overflow: "hidden" }}>
            <div style={{ padding: "0.85rem 1rem", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: "0.92rem", fontWeight: 800 }}>📋 Audit Log — Aktivitas Sistem ({DUMMY_AUDIT.length})</h3>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
                Data 7 hari terakhir
              </span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.87rem" }}>
                <thead>
                  <tr style={{ background: "var(--surface-muted)" }}>
                    {["#","User","Action","Target / Detail","IP Address","Waktu"].map((h) => (
                      <th key={h} style={{ padding: "0.6rem 0.85rem", textAlign: "left", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DUMMY_AUDIT.map((log) => {
                    const ac = ACTION_COLOR[log.action] || { bg: "var(--surface-muted)", fg: "var(--text-muted)" };
                    return (
                      <tr key={log.id} style={{ borderTop: "1px solid var(--line)" }}>
                        <td style={{ padding: "0.55rem 0.85rem", color: "var(--text-muted)", fontSize: "0.78rem" }}>#{log.id}</td>
                        <td style={{ padding: "0.55rem 0.85rem", fontWeight: 800, fontFamily: "monospace", fontSize: "0.83rem" }}>{log.user}</td>
                        <td style={{ padding: "0.55rem 0.85rem" }}>
                          <span style={{ display: "inline-flex", padding: "0.15rem 0.45rem", borderRadius: "0.35rem", fontSize: "0.7rem", fontWeight: 800, background: ac.bg, color: ac.fg }}>
                            {log.action}
                          </span>
                        </td>
                        <td style={{ padding: "0.55rem 0.85rem", color: "var(--text-muted)", fontSize: "0.82rem", maxWidth: "260px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{log.target}</td>
                        <td style={{ padding: "0.55rem 0.85rem", fontFamily: "monospace", fontSize: "0.78rem", color: "var(--text-muted)" }}>{log.ip}</td>
                        <td style={{ padding: "0.55rem 0.85rem", color: "var(--text-muted)", fontSize: "0.78rem", whiteSpace: "nowrap" }}>{ts(log.ts)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: KONFIGURASI ── */}
      {activeTab === "settings" && (
        <div style={{ padding: "1rem 1.25rem 2rem", maxWidth: "720px" }}>
          <form onSubmit={handleSaveConfig}>
            <div style={{ display: "grid", gap: "0.85rem" }}>

              {/* Identitas sistem */}
              <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
                <h3 style={{ margin: "0 0 0.85rem", fontSize: "0.96rem", fontWeight: 800 }}>🏫 Identitas Sistem</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {[
                    { key: "site_name",    label: "Nama Pesantren",   type: "text",   placeholder: "Pesantren Asy-Syifaa" },
                    { key: "tahun_ajaran", label: "Tahun Ajaran",     type: "text",   placeholder: "2025/2026" },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key} style={{ display: "grid", gap: "0.25rem" }}>
                      <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>{label}</label>
                      <input type={type} value={configForm[key]} onChange={(e) => cf(key, e.target.value)} placeholder={placeholder} style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Parameter operasional */}
              <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
                <h3 style={{ margin: "0 0 0.85rem", fontSize: "0.96rem", fontWeight: 800 }}>⚙️ Parameter Operasional</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div style={{ display: "grid", gap: "0.25rem" }}>
                    <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Nominal SPP Default (Rp)</label>
                    <input type="number" value={configForm.spp_amount} onChange={(e) => cf("spp_amount", e.target.value)} min="0" step="5000" style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
                  </div>
                  <div style={{ display: "grid", gap: "0.25rem" }}>
                    <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Batas Maks Izin (hari)</label>
                    <input type="number" value={configForm.max_izin_hari} onChange={(e) => cf("max_izin_hari", e.target.value)} min="1" max="30" style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
                  </div>
                  <div style={{ display: "grid", gap: "0.25rem" }}>
                    <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Jadwal Backup Database</label>
                    <select value={configForm.backup_schedule} onChange={(e) => cf("backup_schedule", e.target.value)} style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }}>
                      <option value="hourly">Setiap Jam</option>
                      <option value="daily">Harian (02:00 WIB)</option>
                      <option value="weekly">Mingguan</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Toggle features */}
              <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
                <h3 style={{ margin: "0 0 0.85rem", fontSize: "0.96rem", fontWeight: 800 }}>🎛️ Feature Flags</h3>
                {[
                  { key: "allow_ppdb",       label: "Buka Pendaftaran PPDB",    desc: "Aktifkan form pendaftaran santri baru",        danger: false },
                  { key: "maintenance_mode", label: "Mode Maintenance",          desc: "Tampilkan halaman maintenance ke semua user",  danger: true  },
                  { key: "debug_mode",       label: "Debug Mode",               desc: "Aktifkan log verbose di backend & frontend",   danger: true  },
                ].map(({ key, label, desc, danger }) => (
                  <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.55rem 0", borderBottom: "1px solid var(--line)" }}>
                    <div>
                      <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 600, color: danger && configForm[key] ? "var(--danger-fg)" : "var(--text)" }}>{label}</p>
                      <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>{desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => cf(key, !configForm[key])}
                      style={{
                        width: "3rem", height: "1.6rem", borderRadius: "999px", border: "none", cursor: "pointer", flexShrink: 0,
                        background: configForm[key] ? (danger ? "var(--danger)" : "var(--success)") : "var(--line)",
                        position: "relative", transition: "background 200ms",
                      }}
                    >
                      <span style={{
                        position: "absolute", top: "0.2rem", width: "1.2rem", height: "1.2rem", borderRadius: "50%", background: "#fff",
                        left: configForm[key] ? "1.6rem" : "0.2rem", transition: "left 200ms",
                      }} />
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
                <h3 style={{ margin: "0 0 0.85rem", fontSize: "0.96rem", fontWeight: 800 }}>🎨 Latar Panel Modul</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div style={{ display: "grid", gap: "0.25rem" }}>
                    <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Warna Gradient Awal</label>
                    <input type="color" value={configForm.panel_grad_from} onChange={(e) => cf("panel_grad_from", e.target.value)} />
                  </div>
                  <div style={{ display: "grid", gap: "0.25rem" }}>
                    <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Warna Gradient Akhir</label>
                    <input type="color" value={configForm.panel_grad_to} onChange={(e) => cf("panel_grad_to", e.target.value)} />
                  </div>
                </div>
                <div style={{ marginTop: "0.75rem", display: "grid", gap: "0.35rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Gambar Overlay (opsional)</label>
                  <input type="file" accept="image/*" onChange={handlePanelImageUpload} />
                  <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                    <button type="button" onClick={() => cf("panel_bg_image", "")} style={{ border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", borderRadius: "0.55rem", padding: "0.35rem 0.65rem", fontWeight: 700, cursor: "pointer" }}>
                      Hapus Gambar
                    </button>
                  </div>
                </div>
                <div style={{
                  marginTop: "0.8rem",
                  borderRadius: "0.65rem",
                  border: "1px solid var(--line)",
                  minHeight: "110px",
                  backgroundImage: `${configForm.panel_bg_image ? `url("${configForm.panel_bg_image}")` : "none"}, linear-gradient(160deg, ${configForm.panel_grad_from}, ${configForm.panel_grad_to})`,
                  backgroundSize: "cover, cover",
                  backgroundPosition: "center, center",
                  backgroundBlendMode: "multiply, normal",
                }} />
              </div>

              <button type="submit" style={{ padding: "0.7rem 1.5rem", borderRadius: "0.65rem", border: "none", background: "#4c4383", color: "#fff", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", width: "100%" }}>
                💾 Simpan Konfigurasi
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

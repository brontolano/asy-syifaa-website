"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { fetchApi, withQuery } from "../../lib/api-client";

const DEFAULT_MONTH = new Date().toISOString().slice(0, 7);
const QUALITY_LABEL = { mumtaz: "Mumtaz", jayyid_jiddan: "Jayyid Jiddan", jayyid: "Jayyid", maqbul: "Maqbul", dhoif: "Dhoif" };
const QUALITY_COLOR = { mumtaz: "#1f6b43", jayyid_jiddan: "#245f82", jayyid: "#7a5b2f", maqbul: "#a15d06", dhoif: "#b23a2f" };

export default function WaliPage() {
  const [students, setStudents]     = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [billing, setBilling]       = useState([]);
  const [tahfidz, setTahfidz]       = useState([]);
  const [permits, setPermits]       = useState([]);
  const [loading, setLoading]       = useState(false);
  const [apiOk, setApiOk]           = useState(false);
  const [lastSync, setLastSync]     = useState(null);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [billingMonth, setBillingMonth]       = useState(DEFAULT_MONTH);
  const [activeTab, setActiveTab]   = useState("ringkasan");

  async function loadAll() {
    setLoading(true);
    try {
      const [health, sRes, aRes, bRes, tRes, pRes] = await Promise.all([
        fetchApi("/api/health"),
        fetchApi("/api/students"),
        fetchApi(withQuery("/api/attendance", { student_id: selectedStudent })),
        fetchApi(withQuery("/api/billing",    { month: billingMonth, student_id: selectedStudent })),
        fetchApi(withQuery("/api/tahfidz",    { student_id: selectedStudent })),
        fetchApi(withQuery("/api/permits",    { student_id: selectedStudent })),
      ]);
      setApiOk(health.ok);
      if (Array.isArray(sRes.data)) setStudents(sRes.data);
      if (Array.isArray(aRes.data)) setAttendance(aRes.data);
      if (Array.isArray(bRes.data)) setBilling(bRes.data);
      if (Array.isArray(tRes.data)) setTahfidz(tRes.data);
      if (Array.isArray(pRes.data)) setPermits(pRes.data);
      setLastSync(new Date().toLocaleTimeString("id-ID"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadAll(); }, []);

  const student = useMemo(() => students.find(s => String(s.id) === selectedStudent), [students, selectedStudent]);

  const stats = useMemo(() => {
    const hadir  = attendance.filter(a => a.status === "hadir").length;
    const izin   = attendance.filter(a => a.status === "izin").length;
    const alpha  = attendance.filter(a => a.status === "alpha").length;
    const total  = attendance.length;
    const hadrPct = total ? Math.round((hadir / total) * 100) : 0;
    const paid   = billing.filter(b => b.status === "paid").reduce((s,b) => s + Number(b.amount||0), 0);
    const unpaid = billing.filter(b => b.status !== "paid").length;
    const ziyadah  = tahfidz.filter(t => t.type === "ziyadah").length;
    const murojaah = tahfidz.filter(t => t.type === "murojaah").length;
    const lastTahfidz = tahfidz.length > 0 ? tahfidz[0] : null;
    const pendingIzin = permits.filter(p => p.status === "pending").length;
    return { hadir, izin, alpha, total, hadrPct, paid, unpaid, ziyadah, murojaah, lastTahfidz, pendingIzin };
  }, [attendance, billing, tahfidz, permits]);

  const TABS = [
    { id: "ringkasan",  label: "📊 Ringkasan" },
    { id: "absensi",    label: "📅 Absensi" },
    { id: "tahfidz",    label: "📖 Tahfidz" },
    { id: "keuangan",   label: "💰 Keuangan" },
    { id: "perizinan",  label: "📝 Perizinan" },
  ];

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(140deg, #0f3d25 0%, #1f6b43 55%, #2a8a57 100%)",
        color: "#fff", padding: "1.8rem 1.5rem",
      }}>
        <p style={{
          display: "inline-flex", gap: "0.4rem", alignItems: "center",
          background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "999px", padding: "0.25rem 0.65rem",
          fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.65rem", color: "#d6f5e3",
        }}>👨‍👩‍👧 Portal Wali Santri</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3.5vw, 2rem)", margin: "0 0 0.3rem" }}>
          Pantau Perkembangan Santri
        </h1>
        <p style={{ margin: "0 0 1rem", color: "rgba(255,255,255,0.82)", fontSize: "0.9rem" }}>
          Akses data absensi, tahfidz, keuangan, dan perizinan santri Anda secara real-time.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{
            display: "inline-flex", gap: "0.35rem", alignItems: "center",
            background: apiOk ? "rgba(50,220,100,0.2)" : "rgba(220,50,50,0.2)",
            border: `1px solid ${apiOk ? "rgba(50,220,100,0.4)" : "rgba(220,50,50,0.4)"}`,
            borderRadius: "999px", padding: "0.25rem 0.65rem",
            fontSize: "0.75rem", fontWeight: 700, color: apiOk ? "#a7f3c4" : "#ffb3b3",
          }}>● {apiOk ? "Terhubung" : "Offline"}</span>
          {lastSync && <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.6)" }}>Sync: {lastSync}</span>}
          <button type="button" onClick={loadAll} disabled={loading} style={{
            background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff", borderRadius: "0.6rem", padding: "0.3rem 0.7rem",
            fontSize: "0.78rem", fontWeight: 700, cursor: "pointer",
          }}>{loading ? "⟳..." : "⟳ Refresh"}</button>
        </div>
      </section>

      {/* Santri Selector */}
      <div style={{ padding: "0.85rem 1.25rem 0", display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
        <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)", flexShrink: 0 }}>Pilih Santri:</label>
        <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} style={{ flex: "1 1 220px", minWidth: "180px" }}>
          <option value="">— Semua Santri —</option>
          {students.map(s => <option key={s.id} value={s.id}>{s.full_name} ({s.class_name})</option>)}
        </select>
        <button type="button" onClick={loadAll} disabled={loading} className="asf-button asf-button-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.82rem" }}>
          Tampilkan
        </button>
        {student && (
          <div style={{
            display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.85rem",
            background: "var(--accent-soft)", borderRadius: "999px", border: "1px solid rgba(31,107,67,0.2)",
          }}>
            <span style={{ fontSize: "1.1rem" }}>👤</span>
            <span style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--accent-ink)" }}>
              {student.full_name} · Kelas {student.class_name}
            </span>
            <span style={{
              padding: "0.1rem 0.4rem", borderRadius: "999px", fontSize: "0.68rem", fontWeight: 800,
              background: student.status === "aktif" ? "var(--success-bg)" : "var(--warn-bg)",
              color: student.status === "aktif" ? "var(--success-fg)" : "var(--warn-fg)",
            }}>{student.status}</span>
          </div>
        )}
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: "0", borderBottom: "1px solid var(--line)", background: "var(--surface)", position: "sticky", top: "3.2rem", zIndex: 10, marginTop: "0.75rem", overflowX: "auto" }}>
        {TABS.map(t => (
          <button key={t.id} type="button" onClick={() => setActiveTab(t.id)} style={{
            flexShrink: 0, padding: "0.7rem 1rem", fontSize: "0.82rem", fontWeight: 700,
            border: "none", borderBottom: activeTab === t.id ? "2px solid var(--accent)" : "2px solid transparent",
            background: "transparent", color: activeTab === t.id ? "var(--accent-ink)" : "var(--text-muted)",
            cursor: "pointer", whiteSpace: "nowrap",
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── RINGKASAN ── */}
      {activeTab === "ringkasan" && (
        <div style={{ padding: "0.85rem 1.25rem 2rem" }}>
          {/* KPI cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.7rem", marginBottom: "1rem" }}>
            {[
              { icon: "✅", label: "Kehadiran", value: `${stats.hadrPct}%`, sub: `${stats.hadir}/${stats.total} hari`, color: stats.hadrPct >= 80 ? "#1f6b43" : "#a15d06" },
              { icon: "📖", label: "Ziyadah",   value: stats.ziyadah,       sub: "sesi hafalan baru",     color: "#245f82" },
              { icon: "🔁", label: "Murojaah",  value: stats.murojaah,      sub: "sesi ulangan hafalan",  color: "#4c4383" },
              { icon: "💳", label: "Tunggakan", value: stats.unpaid,         sub: "tagihan belum lunas",   color: stats.unpaid > 0 ? "#b23a2f" : "#1f6b43" },
              { icon: "📝", label: "Izin Aktif", value: stats.pendingIzin,   sub: "menunggu persetujuan", color: stats.pendingIzin > 0 ? "#a15d06" : "#1f6b43" },
            ].map(kpi => (
              <div key={kpi.label} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "0.9rem", boxShadow: "var(--card-shadow)" }}>
                <p style={{ margin: "0 0 0.25rem", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{kpi.icon} {kpi.label}</p>
                <p style={{ margin: "0 0 0.1rem", fontSize: "1.55rem", fontWeight: 800, color: kpi.color, lineHeight: 1 }}>{kpi.value}</p>
                <p style={{ margin: 0, fontSize: "0.72rem", color: "var(--text-muted)" }}>{kpi.sub}</p>
              </div>
            ))}
          </div>

          {/* Attendance bar */}
          {stats.total > 0 && (
            <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1rem", boxShadow: "var(--card-shadow)", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 800 }}>📊 Tingkat Kehadiran</span>
                <span style={{ fontWeight: 800, color: stats.hadrPct >= 80 ? "var(--success-fg)" : "var(--warn-fg)" }}>{stats.hadrPct}%</span>
              </div>
              <div style={{ height: "8px", borderRadius: "999px", background: "var(--surface-muted)", overflow: "hidden", marginBottom: "0.5rem" }}>
                <div style={{ height: "100%", borderRadius: "999px", width: `${stats.hadrPct}%`, background: stats.hadrPct >= 80 ? "var(--success)" : "var(--warn)", transition: "width 600ms ease" }} />
              </div>
              <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                <span>✅ Hadir: {stats.hadir}</span>
                <span>📝 Izin: {stats.izin}</span>
                <span>❌ Alpha: {stats.alpha}</span>
              </div>
            </div>
          )}

          {/* Last tahfidz record */}
          {stats.lastTahfidz && (
            <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1rem", boxShadow: "var(--card-shadow)" }}>
              <p style={{ margin: "0 0 0.5rem", fontSize: "0.85rem", fontWeight: 800 }}>📖 Catatan Tahfidz Terakhir</p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {[
                  ["Jenis",    stats.lastTahfidz.type === "ziyadah" ? "Ziyadah (Hafalan Baru)" : "Murojaah (Ulangan)"],
                  ["Surah",   `${stats.lastTahfidz.surah_from || "—"} – ${stats.lastTahfidz.surah_to || "—"}`],
                  ["Juz",     stats.lastTahfidz.juz || "—"],
                  ["Kualitas", QUALITY_LABEL[stats.lastTahfidz.quality] || stats.lastTahfidz.quality || "—"],
                  ["Tanggal", String(stats.lastTahfidz.date || "").slice(0, 10)],
                ].map(([k, v]) => (
                  <div key={k} style={{ background: "var(--surface-muted)", borderRadius: "0.5rem", padding: "0.4rem 0.7rem", minWidth: "100px" }}>
                    <p style={{ margin: "0 0 0.1rem", fontSize: "0.68rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>{k}</p>
                    <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 700, color: k === "Kualitas" ? (QUALITY_COLOR[stats.lastTahfidz.quality] || "var(--text)") : "var(--text)" }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── ABSENSI ── */}
      {activeTab === "absensi" && (
        <div style={{ padding: "0.85rem 1.25rem 2rem" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1rem", boxShadow: "var(--card-shadow)" }}>
            <h3 style={{ margin: "0 0 0.75rem", fontSize: "0.95rem", fontWeight: 800 }}>📅 Riwayat Absensi ({attendance.length})</h3>
            {attendance.length === 0 ? (
              <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "1.5rem" }}>Belum ada data absensi.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                  <thead>
                    <tr style={{ background: "var(--surface-muted)" }}>
                      {["Tanggal", "Status", "Keterangan"].map(h => (
                        <th key={h} style={{ padding: "0.6rem 0.75rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.slice().sort((a, b) => b.attendance_date > a.attendance_date ? 1 : -1).map(a => (
                      <tr key={a.id} style={{ borderTop: "1px solid var(--line)" }}>
                        <td style={{ padding: "0.55rem 0.75rem", fontWeight: 600 }}>{String(a.attendance_date).slice(0, 10)}</td>
                        <td style={{ padding: "0.55rem 0.75rem" }}>
                          <span style={{
                            display: "inline-flex", padding: "0.15rem 0.5rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 800,
                            background: a.status === "hadir" ? "var(--success-bg)" : a.status === "izin" ? "var(--warn-bg)" : "var(--danger-bg)",
                            color: a.status === "hadir" ? "var(--success-fg)" : a.status === "izin" ? "var(--warn-fg)" : "var(--danger-fg)",
                          }}>{a.status}</span>
                        </td>
                        <td style={{ padding: "0.55rem 0.75rem", color: "var(--text-muted)", fontSize: "0.83rem" }}>{a.note || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAHFIDZ ── */}
      {activeTab === "tahfidz" && (
        <div style={{ padding: "0.85rem 1.25rem 2rem" }}>
          {/* Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.7rem", marginBottom: "1rem" }}>
            {[
              { label: "Total Sesi", value: tahfidz.length, color: "#1f6b43" },
              { label: "Ziyadah",    value: stats.ziyadah,  color: "#245f82" },
              { label: "Murojaah",   value: stats.murojaah, color: "#4c4383" },
            ].map(s => (
              <div key={s.label} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "0.9rem", boxShadow: "var(--card-shadow)" }}>
                <p style={{ margin: "0 0 0.2rem", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>{s.label}</p>
                <p style={{ margin: 0, fontSize: "1.6rem", fontWeight: 800, color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1rem", boxShadow: "var(--card-shadow)" }}>
            <h3 style={{ margin: "0 0 0.75rem", fontSize: "0.95rem", fontWeight: 800 }}>📖 Riwayat Tahfidz ({tahfidz.length})</h3>
            {tahfidz.length === 0 ? (
              <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "1.5rem" }}>Belum ada catatan tahfidz.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.87rem" }}>
                  <thead>
                    <tr style={{ background: "var(--surface-muted)" }}>
                      {["Tanggal", "Jenis", "Surah", "Juz", "Kualitas", "Catatan"].map(h => (
                        <th key={h} style={{ padding: "0.6rem 0.75rem", textAlign: "left", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tahfidz.map(t => {
                      const qColor = QUALITY_COLOR[t.quality] || "var(--text)";
                      return (
                        <tr key={t.id} style={{ borderTop: "1px solid var(--line)" }}>
                          <td style={{ padding: "0.5rem 0.75rem", fontWeight: 600, fontSize: "0.82rem" }}>{String(t.date||"").slice(0,10)}</td>
                          <td style={{ padding: "0.5rem 0.75rem" }}>
                            <span style={{ display: "inline-flex", padding: "0.1rem 0.4rem", borderRadius: "999px", fontSize: "0.68rem", fontWeight: 800, background: t.type === "ziyadah" ? "var(--accent-soft)" : "var(--surface-muted)", color: t.type === "ziyadah" ? "var(--accent-ink)" : "var(--text-muted)" }}>
                              {t.type}
                            </span>
                          </td>
                          <td style={{ padding: "0.5rem 0.75rem", fontSize: "0.82rem" }}>{t.surah_from || "—"}{t.surah_to && t.surah_to !== t.surah_from ? ` – ${t.surah_to}` : ""}</td>
                          <td style={{ padding: "0.5rem 0.75rem", fontSize: "0.82rem" }}>{t.juz || "—"}</td>
                          <td style={{ padding: "0.5rem 0.75rem" }}>
                            <span style={{ fontSize: "0.78rem", fontWeight: 800, color: qColor }}>{QUALITY_LABEL[t.quality] || t.quality || "—"}</span>
                          </td>
                          <td style={{ padding: "0.5rem 0.75rem", color: "var(--text-muted)", fontSize: "0.8rem", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.note || "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── KEUANGAN ── */}
      {activeTab === "keuangan" && (
        <div style={{ padding: "0.85rem 1.25rem 2rem" }}>
          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.85rem", flexWrap: "wrap" }}>
            <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Filter Bulan:</label>
            <input type="month" value={billingMonth} onChange={e => setBillingMonth(e.target.value)}
              style={{ padding: "0.4rem 0.65rem", borderRadius: "0.55rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", font: "inherit" }} />
            <button type="button" onClick={loadAll} disabled={loading} className="asf-button asf-button-secondary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.82rem" }}>Tampilkan</button>
          </div>
          {/* Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.7rem", marginBottom: "1rem" }}>
            {[
              { label: "Total Tagihan", value: `Rp ${new Intl.NumberFormat("id-ID").format(billing.reduce((s,b) => s+Number(b.amount||0), 0))}`, color: "#1f6b43" },
              { label: "Sudah Dibayar", value: `Rp ${new Intl.NumberFormat("id-ID").format(billing.filter(b=>b.status==="paid").reduce((s,b)=>s+Number(b.amount||0),0))}`, color: "#187548" },
              { label: "Belum Lunas",   value: billing.filter(b=>b.status!=="paid").length, color: billing.filter(b=>b.status!=="paid").length > 0 ? "#b23a2f" : "#187548" },
            ].map(s => (
              <div key={s.label} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "0.9rem", boxShadow: "var(--card-shadow)" }}>
                <p style={{ margin: "0 0 0.2rem", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>{s.label}</p>
                <p style={{ margin: 0, fontSize: s.label === "Belum Lunas" ? "1.6rem" : "1rem", fontWeight: 800, color: s.color, lineHeight: 1.2 }}>{s.value}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1rem", boxShadow: "var(--card-shadow)" }}>
            <h3 style={{ margin: "0 0 0.75rem", fontSize: "0.95rem", fontWeight: 800 }}>💰 Riwayat Tagihan ({billing.length})</h3>
            {billing.length === 0 ? (
              <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "1.5rem" }}>Tidak ada tagihan untuk bulan ini.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.87rem" }}>
                  <thead>
                    <tr style={{ background: "var(--surface-muted)" }}>
                      {["Bulan", "Nominal", "Dibayar", "Status", "Tgl Bayar"].map(h => (
                        <th key={h} style={{ padding: "0.6rem 0.75rem", textAlign: "left", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {billing.map(b => (
                      <tr key={b.id} style={{ borderTop: "1px solid var(--line)" }}>
                        <td style={{ padding: "0.5rem 0.75rem", fontWeight: 600 }}>{b.billing_month || "—"}</td>
                        <td style={{ padding: "0.5rem 0.75rem" }}>Rp {new Intl.NumberFormat("id-ID").format(b.amount || 0)}</td>
                        <td style={{ padding: "0.5rem 0.75rem" }}>Rp {new Intl.NumberFormat("id-ID").format(b.paid_amount || 0)}</td>
                        <td style={{ padding: "0.5rem 0.75rem" }}>
                          <span style={{
                            display: "inline-flex", padding: "0.12rem 0.45rem", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 800,
                            background: b.status === "paid" ? "var(--success-bg)" : b.status === "partial" ? "var(--warn-bg)" : "var(--danger-bg)",
                            color: b.status === "paid" ? "var(--success-fg)" : b.status === "partial" ? "var(--warn-fg)" : "var(--danger-fg)",
                          }}>{b.status}</span>
                        </td>
                        <td style={{ padding: "0.5rem 0.75rem", color: "var(--text-muted)", fontSize: "0.82rem" }}>{b.paid_at ? String(b.paid_at).slice(0,10) : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── PERIZINAN ── */}
      {activeTab === "perizinan" && (
        <div style={{ padding: "0.85rem 1.25rem 2rem" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1rem", boxShadow: "var(--card-shadow)" }}>
            <h3 style={{ margin: "0 0 0.75rem", fontSize: "0.95rem", fontWeight: 800 }}>📝 Riwayat Izin ({permits.length})</h3>
            {permits.length === 0 ? (
              <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "1.5rem" }}>Tidak ada riwayat izin.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {permits.map(p => (
                  <div key={p.id} style={{
                    padding: "0.85rem 1rem", borderRadius: "0.75rem",
                    border: "1px solid var(--line)",
                    borderLeft: `3px solid ${p.status === "approved" ? "var(--success)" : p.status === "rejected" ? "var(--danger)" : "var(--warn)"}`,
                    background: "var(--surface)",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.3rem" }}>
                      <strong style={{ fontSize: "0.9rem" }}>{p.permit_type?.replace("_", " ")}</strong>
                      <span style={{
                        display: "inline-flex", padding: "0.12rem 0.45rem", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 800,
                        background: p.status === "approved" ? "var(--success-bg)" : p.status === "rejected" ? "var(--danger-bg)" : "var(--warn-bg)",
                        color: p.status === "approved" ? "var(--success-fg)" : p.status === "rejected" ? "var(--danger-fg)" : "var(--warn-fg)",
                      }}>{p.status}</span>
                    </div>
                    <p style={{ margin: "0 0 0.2rem", fontSize: "0.83rem", color: "var(--text)" }}>{p.reason}</p>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {String(p.start_date||"").slice(0,10)} → {String(p.end_date||"").slice(0,10)}
                      {p.approved_by ? ` · Disetujui oleh: ${p.approved_by}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

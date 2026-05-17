"use client";

import { useEffect, useState } from "react";
import { fetchApi, withQuery } from "../../lib/api-client";

const TODAY    = new Date().toISOString().slice(0, 10);
const TOMORROW = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

const PERMIT_TYPES = {
  pulang:    { label: "Pulang ke Rumah",   icon: "🏠" },
  pesiar:    { label: "Pesiar / Jalan",    icon: "🌴" },
  sakit:     { label: "Rawat Inap / Sakit",icon: "🏥" },
  keperluan: { label: "Keperluan Khusus",  icon: "📋" },
};

const STATUS_CFG = {
  pending:  { label: "Menunggu",   bg: "var(--warn-bg)",    fg: "var(--warn-fg)",    border: "rgba(161,93,6,0.25)" },
  approved: { label: "Disetujui", bg: "var(--success-bg)", fg: "var(--success-fg)", border: "rgba(24,117,72,0.25)" },
  rejected: { label: "Ditolak",   bg: "var(--danger-bg)",  fg: "var(--danger-fg)",  border: "rgba(178,58,47,0.25)" },
  returned: { label: "Kembali",   bg: "var(--success-bg)", fg: "var(--success-fg)", border: "rgba(24,117,72,0.25)" },
};

function SBadge({ status }) {
  const c = STATUS_CFG[status] || STATUS_CFG.pending;
  return <span style={{ display: "inline-flex", padding: "0.12rem 0.48rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700, background: c.bg, color: c.fg, border: `1px solid ${c.border}` }}>{c.label}</span>;
}

const TABS = [
  { id: "daftar",  label: "📋 Daftar Izin" },
  { id: "ajukan",  label: "📝 Ajukan Izin" },
];

export default function IzinPage() {
  const [activeTab, setActiveTab]       = useState("daftar");
  const [permits, setPermits]           = useState([]);
  const [students, setStudents]         = useState([]);
  const [loading, setLoading]           = useState(false);
  const [apiOk, setApiOk]               = useState(false);
  const [message, setMessage]           = useState({ type: "", text: "" });
  const [submitting, setSubmitting]     = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType]     = useState("");
  const [filterStudent, setFilterStudent] = useState("");
  const [form, setForm]                 = useState({ student_id: "", permit_type: "pulang", reason: "", start_date: TODAY, end_date: TOMORROW });

  function f(k, v) { setForm((p) => ({ ...p, [k]: v })); }
  function msg(type, text, ms = 4000) {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), ms);
  }
  function studentName(id) {
    const s = students.find((st) => Number(st.id) === Number(id));
    return s ? `${s.full_name} (${s.class_name})` : `ID ${id}`;
  }

  async function loadData() {
    setLoading(true);
    try {
      const [healthRes, studentsRes, permitsRes] = await Promise.all([
        fetchApi("/api/health"),
        fetchApi("/api/students"),
        fetchApi(withQuery("/api/permits", { status: filterStatus, permit_type: filterType, student_id: filterStudent })),
      ]);
      setApiOk(healthRes.ok);
      if (Array.isArray(studentsRes.data)) setStudents(studentsRes.data);
      if (Array.isArray(permitsRes.data)) setPermits(permitsRes.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetchApi("/api/permits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, student_id: Number(form.student_id) }),
    });
    if (!res.ok) msg("error", res.data?.message || "Gagal ajukan izin");
    else { msg("success", "Izin berhasil diajukan."); setForm({ student_id: "", permit_type: "pulang", reason: "", start_date: TODAY, end_date: TOMORROW }); await loadData(); setActiveTab("daftar"); }
    setSubmitting(false);
  }

  async function handleApprove(id, status) {
    setSubmitting(true);
    const res = await fetchApi(`/api/permits/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-role": "mudir_aam" },
      body: JSON.stringify({ status, approved_by: "Mudir Aam" }),
    });
    if (!res.ok) msg("error", res.data?.message || "Gagal update status izin");
    else { msg("success", `Izin berhasil ${status === "approved" ? "disetujui" : "ditolak"}.`); await loadData(); }
    setSubmitting(false);
  }

  const pending  = permits.filter((p) => p.status === "pending").length;
  const approved = permits.filter((p) => p.status === "approved").length;
  const rejected = permits.filter((p) => p.status === "rejected").length;
  const returned = permits.filter((p) => p.status === "returned").length;

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(140deg, #22153a 0%, #4c4383 55%, #6358a8 100%)",
        color: "#fff", padding: "1.8rem 1.5rem", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.07), transparent 55%)", pointerEvents: "none" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <p style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.25rem 0.65rem", fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.55rem", color: "#e0d9ff" }}>
              📝 Modul Perizinan
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3.5vw, 2rem)", margin: "0 0 0.3rem" }}>
              Manajemen Izin Santri
            </h1>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.82)", fontSize: "0.9rem" }}>
              Ajukan, setujui, atau tolak permohonan izin santri — pulang, pesiar, sakit, keperluan.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", background: apiOk ? "rgba(50,220,100,0.2)" : "rgba(220,50,50,0.2)", border: `1px solid ${apiOk ? "rgba(50,220,100,0.4)" : "rgba(220,50,50,0.4)"}`, borderRadius: "999px", padding: "0.25rem 0.65rem", fontSize: "0.75rem", fontWeight: 700, color: apiOk ? "#a7f3c4" : "#ffb3b3" }}>
              ● {apiOk ? "API Normal" : "API Offline"}
            </span>
            <button type="button" onClick={loadData} disabled={loading} style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: "0.6rem", padding: "0.3rem 0.7rem", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}>
              {loading ? "⟳..." : "⟳ Refresh"}
            </button>
          </div>
        </div>
      </section>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: "0.7rem", padding: "0.85rem 1.25rem 0" }}>
        {[
          { icon: "⏳", label: "Menunggu Approval", value: loading ? "…" : pending,  color: pending > 0 ? "#a15d06" : "#187548" },
          { icon: "✅", label: "Disetujui",          value: loading ? "…" : approved, color: "#1f6b43" },
          { icon: "❌", label: "Ditolak",            value: loading ? "…" : rejected, color: "#b23a2f" },
          { icon: "🏠", label: "Sudah Kembali",      value: loading ? "…" : returned, color: "#245f82" },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "0.85rem 1rem", boxShadow: "var(--card-shadow)" }}>
            <p style={{ margin: "0 0 0.25rem", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{kpi.icon} {kpi.label}</p>
            <p style={{ margin: 0, fontSize: "1.7rem", fontWeight: 800, color: kpi.color, lineHeight: 1 }}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Pending alert */}
      {pending > 0 && (
        <div style={{ margin: "0.75rem 1.25rem 0", padding: "0.65rem 0.9rem", borderRadius: "0.65rem", background: "var(--warn-bg)", color: "var(--warn-fg)", border: "1px solid rgba(161,93,6,0.25)", fontWeight: 600, fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          ⚠️ <span>{pending} izin menunggu persetujuan Mudir Aam — harap segera ditindaklanjuti.</span>
        </div>
      )}

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
      <div style={{ display: "flex", gap: "0.25rem", padding: "0.85rem 1.25rem 0", borderBottom: "1px solid var(--line)" }}>
        {TABS.map((t) => (
          <button key={t.id} type="button" onClick={() => setActiveTab(t.id)} style={{
            padding: "0.5rem 1rem", borderRadius: "0.65rem 0.65rem 0 0", border: "none",
            fontSize: "0.85rem", fontWeight: 700, cursor: "pointer",
            background: activeTab === t.id ? "var(--surface)" : "transparent",
            color: activeTab === t.id ? "var(--accent)" : "var(--text-muted)",
            borderBottom: activeTab === t.id ? "2px solid var(--accent)" : "2px solid transparent",
          }}>
            {t.label}
            {t.id === "daftar" && pending > 0 && (
              <span style={{ marginLeft: "0.4rem", display: "inline-flex", width: "1.3rem", height: "1.3rem", borderRadius: "50%", background: "var(--warn)", color: "#fff", fontSize: "0.68rem", fontWeight: 900, placeItems: "center", verticalAlign: "middle" }}>{pending}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── TAB: DAFTAR IZIN ── */}
      {activeTab === "daftar" && (
        <div style={{ padding: "1rem 1.25rem 2rem" }}>
          {/* Filter row */}
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.85rem", alignItems: "flex-end" }}>
            <div style={{ display: "grid", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Status</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ padding: "0.45rem 0.7rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.88rem" }}>
                <option value="">Semua Status</option>
                {Object.entries(STATUS_CFG).map(([val, { label }]) => <option key={val} value={val}>{label}</option>)}
              </select>
            </div>
            <div style={{ display: "grid", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Jenis Izin</label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ padding: "0.45rem 0.7rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.88rem" }}>
                <option value="">Semua Jenis</option>
                {Object.entries(PERMIT_TYPES).map(([val, { label }]) => <option key={val} value={val}>{label}</option>)}
              </select>
            </div>
            <div style={{ display: "grid", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Santri</label>
              <select value={filterStudent} onChange={(e) => setFilterStudent(e.target.value)} style={{ padding: "0.45rem 0.7rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.88rem" }}>
                <option value="">Semua Santri</option>
                {students.map((s) => <option key={s.id} value={s.id}>{s.full_name}</option>)}
              </select>
            </div>
            <button type="button" onClick={loadData} disabled={loading} className="asf-button asf-button-primary" style={{ alignSelf: "flex-end" }}>🔍 Terapkan</button>
            <button type="button" onClick={() => setActiveTab("ajukan")} className="asf-button asf-button-secondary" style={{ marginLeft: "auto", alignSelf: "flex-end" }}>+ Ajukan Izin</button>
          </div>

          {/* Table */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", boxShadow: "var(--card-shadow)", overflow: "hidden" }}>
            <div style={{ padding: "0.85rem 1rem", borderBottom: "1px solid var(--line)" }}>
              <h3 style={{ margin: 0, fontSize: "0.92rem", fontWeight: 800 }}>📋 Daftar Permohonan Izin ({permits.length})</h3>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.87rem" }}>
                <thead>
                  <tr style={{ background: "var(--surface-muted)" }}>
                    {["Santri","Jenis","Alasan","Mulai","Kembali","Status","Approval","Aksi"].map((h) => (
                      <th key={h} style={{ padding: "0.6rem 0.85rem", textAlign: "left", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {permits.length === 0 ? (
                    <tr><td colSpan={8} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>Tidak ada data izin untuk filter ini.</td></tr>
                  ) : permits.map((row) => {
                    const pt = PERMIT_TYPES[row.permit_type];
                    return (
                      <tr key={row.id} style={{ borderTop: "1px solid var(--line)", background: row.status === "pending" ? "rgba(161,93,6,0.04)" : "transparent" }}>
                        <td style={{ padding: "0.55rem 0.85rem", fontWeight: 600 }}>{studentName(row.student_id)}</td>
                        <td style={{ padding: "0.55rem 0.85rem", whiteSpace: "nowrap" }}>
                          <span style={{ fontSize: "0.9rem" }}>{pt?.icon}</span> {pt?.label || row.permit_type}
                        </td>
                        <td style={{ padding: "0.55rem 0.85rem", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--text-muted)", fontSize: "0.82rem" }}>{row.reason}</td>
                        <td style={{ padding: "0.55rem 0.85rem", color: "var(--text-muted)", fontSize: "0.82rem", whiteSpace: "nowrap" }}>{String(row.start_date).slice(0, 10)}</td>
                        <td style={{ padding: "0.55rem 0.85rem", color: "var(--text-muted)", fontSize: "0.82rem", whiteSpace: "nowrap" }}>{String(row.end_date).slice(0, 10)}</td>
                        <td style={{ padding: "0.55rem 0.85rem" }}><SBadge status={row.status} /></td>
                        <td style={{ padding: "0.55rem 0.85rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>{row.approved_by || "—"}</td>
                        <td style={{ padding: "0.55rem 0.85rem" }}>
                          {row.status === "pending" ? (
                            <div style={{ display: "flex", gap: "0.35rem" }}>
                              <button type="button" onClick={() => handleApprove(row.id, "approved")} disabled={submitting} style={{ padding: "0.3rem 0.65rem", borderRadius: "0.55rem", border: "none", background: "var(--success-bg)", color: "var(--success-fg)", fontWeight: 800, fontSize: "0.78rem", cursor: "pointer" }}>✓ Setuju</button>
                              <button type="button" onClick={() => handleApprove(row.id, "rejected")} disabled={submitting} style={{ padding: "0.3rem 0.65rem", borderRadius: "0.55rem", border: "none", background: "var(--danger-bg)", color: "var(--danger-fg)", fontWeight: 800, fontSize: "0.78rem", cursor: "pointer" }}>✗ Tolak</button>
                            </div>
                          ) : (
                            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>—</span>
                          )}
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

      {/* ── TAB: AJUKAN IZIN ── */}
      {activeTab === "ajukan" && (
        <div style={{ padding: "1rem 1.25rem 2rem", maxWidth: "580px" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.25rem", boxShadow: "var(--card-shadow)" }}>
            <h3 style={{ margin: "0 0 1rem", fontSize: "1rem", fontWeight: 800 }}>📝 Form Pengajuan Izin</h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "grid", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Santri *</label>
                <select value={form.student_id} onChange={(e) => f("student_id", e.target.value)} required style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }}>
                  <option value="">Pilih santri...</option>
                  {students.map((s) => <option key={s.id} value={s.id}>{s.full_name} ({s.class_name})</option>)}
                </select>
              </div>

              <div style={{ display: "grid", gap: "0.3rem" }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Jenis Izin</label>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {Object.entries(PERMIT_TYPES).map(([val, { label, icon }]) => (
                    <button key={val} type="button" onClick={() => f("permit_type", val)} style={{
                      padding: "0.35rem 0.75rem", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer",
                      background: form.permit_type === val ? "var(--accent)" : "var(--surface-muted)",
                      color: form.permit_type === val ? "#fff" : "var(--text)",
                      border: `1px solid ${form.permit_type === val ? "var(--accent)" : "var(--line)"}`,
                    }}>{icon} {label}</button>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Alasan / Keperluan *</label>
                <textarea value={form.reason} onChange={(e) => f("reason", e.target.value)} required rows={2} placeholder="Jelaskan keperluan izin secara singkat..." style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem", resize: "vertical", fontFamily: "inherit" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div style={{ display: "grid", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Tanggal Mulai *</label>
                  <input type="date" value={form.start_date} onChange={(e) => f("start_date", e.target.value)} required style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
                </div>
                <div style={{ display: "grid", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Tanggal Kembali *</label>
                  <input type="date" value={form.end_date} onChange={(e) => f("end_date", e.target.value)} required style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
                </div>
              </div>

              <div style={{ padding: "0.65rem 0.85rem", borderRadius: "0.65rem", background: "rgba(76,67,131,0.08)", border: "1px solid rgba(76,67,131,0.2)", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                ℹ️ Izin yang diajukan akan berstatus <strong>Menunggu</strong> hingga disetujui oleh Mudir Aam.
              </div>

              <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.25rem" }}>
                <button type="button" onClick={() => setActiveTab("daftar")} className="asf-button asf-button-secondary">← Kembali</button>
                <button type="submit" disabled={!apiOk || !form.student_id || submitting} className="asf-button asf-button-primary" style={{ flex: 1, justifyContent: "center" }}>
                  {submitting ? "⟳ Mengajukan..." : "✓ Ajukan Izin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

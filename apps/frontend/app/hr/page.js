"use client";

import { useEffect, useState } from "react";
import { fetchApi, withQuery } from "../../lib/api-client";

function fmt(v) { return new Intl.NumberFormat("id-ID").format(Number(v || 0)); }

const ROLE_CFG = {
  ustadz:        { label: "Ustadz",          icon: "📖", color: "#1f6b43" },
  ustadzah:      { label: "Ustadzah",         icon: "📚", color: "#8f3e58" },
  admin:         { label: "Admin",            icon: "💼", color: "#245f82" },
  bendahara:     { label: "Bendahara",        icon: "💰", color: "#7a5b2f" },
  kepala_sekolah:{ label: "Kepala Sekolah",   icon: "🎓", color: "#4c4383" },
  staff_umum:    { label: "Staff Umum",       icon: "👤", color: "#2e5b67" },
};

const STATUS_CFG = {
  aktif:    { label: "Aktif",    bg: "var(--success-bg)", fg: "var(--success-fg)", border: "rgba(24,117,72,0.25)" },
  cuti:     { label: "Cuti",     bg: "var(--warn-bg)",    fg: "var(--warn-fg)",    border: "rgba(161,93,6,0.25)" },
  nonaktif: { label: "Nonaktif", bg: "var(--danger-bg)",  fg: "var(--danger-fg)",  border: "rgba(178,58,47,0.25)" },
};

const TABS = [
  { id: "data",     label: "👥 Data Staff" },
  { id: "tambah",   label: "➕ Tambah Staff" },
  { id: "payroll",  label: "💰 Payroll" },
];

export default function HRPage() {
  const [activeTab, setActiveTab]     = useState("data");
  const [staff, setStaff]             = useState([]);
  const [loading, setLoading]         = useState(false);
  const [apiOk, setApiOk]             = useState(false);
  const [message, setMessage]         = useState({ type: "", text: "" });
  const [submitting, setSubmitting]   = useState(false);
  const [filterRole, setFilterRole]   = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [editSalaryId, setEditSalaryId] = useState(null);
  const [editSalaryVal, setEditSalaryVal] = useState("");
  const [form, setForm]               = useState({ nip: "", full_name: "", role: "ustadz", subject: "", phone: "", address: "", join_date: "" });

  function f(k, v) { setForm((p) => ({ ...p, [k]: v })); }
  function msg(type, text, ms = 4000) {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), ms);
  }

  async function loadData() {
    setLoading(true);
    try {
      const [healthRes, staffRes] = await Promise.all([
        fetchApi("/api/health"),
        fetchApi(withQuery("/api/staff", { role: filterRole, status: filterStatus })),
      ]);
      setApiOk(healthRes.ok);
      if (Array.isArray(staffRes.data)) setStaff(staffRes.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetchApi("/api/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) msg("error", res.data?.message || "Gagal tambah staff");
    else { msg("success", "Data staff berhasil disimpan."); setForm({ nip: "", full_name: "", role: "ustadz", subject: "", phone: "", address: "", join_date: "" }); await loadData(); setActiveTab("data"); }
    setSubmitting(false);
  }

  async function handleUpdateSalary(id) {
    setSubmitting(true);
    const res = await fetchApi(`/api/staff/${id}/salary`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-role": "mudir_aam" },
      body: JSON.stringify({ salary: Number(editSalaryVal) }),
    });
    if (!res.ok) msg("error", res.data?.message || "Gagal update gaji");
    else { msg("success", "Gaji berhasil diperbarui."); setEditSalaryId(null); await loadData(); }
    setSubmitting(false);
  }

  const activeStaff    = staff.filter((s) => s.status === "aktif");
  const totalGaji      = activeStaff.reduce((s, st) => s + Number(st.salary || 0), 0);
  const byRole         = Object.fromEntries(Object.keys(ROLE_CFG).map((r) => [r, staff.filter((s) => s.role === r).length]));
  const pengajar       = (byRole.ustadz || 0) + (byRole.ustadzah || 0);

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(140deg, #172e3a 0%, #2e5b67 55%, #3d7a88 100%)",
        color: "#fff", padding: "1.8rem 1.5rem", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.07), transparent 55%)", pointerEvents: "none" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <p style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.25rem 0.65rem", fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.55rem", color: "#cff0f8" }}>
              👥 Modul SDM & HR
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3.5vw, 2rem)", margin: "0 0 0.3rem" }}>
              Manajemen SDM & Kepegawaian
            </h1>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.82)", fontSize: "0.9rem" }}>
              Data asatidz, staf administrasi, jabatan, dan pengelolaan payroll pesantren.
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
          { icon: "👥", label: "Total Staff",        value: loading ? "…" : staff.length,      color: "#2e5b67" },
          { icon: "✅", label: "Staff Aktif",         value: loading ? "…" : activeStaff.length, color: "#1f6b43" },
          { icon: "📖", label: "Tenaga Pengajar",     value: loading ? "…" : pengajar,           color: "#4c4383" },
          { icon: "💰", label: "Total Payroll/Bulan", value: loading ? "…" : `Rp ${fmt(totalGaji)}`, color: "#7a5b2f" },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "0.85rem 1rem", boxShadow: "var(--card-shadow)" }}>
            <p style={{ margin: "0 0 0.25rem", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{kpi.icon} {kpi.label}</p>
            <p style={{ margin: 0, fontSize: kpi.value.toString().length > 8 ? "1rem" : "1.6rem", fontWeight: 800, color: kpi.color, lineHeight: 1 }}>{kpi.value}</p>
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
      <div style={{ display: "flex", gap: "0.25rem", padding: "0.85rem 1.25rem 0", borderBottom: "1px solid var(--line)" }}>
        {TABS.map((t) => (
          <button key={t.id} type="button" onClick={() => setActiveTab(t.id)} style={{
            padding: "0.5rem 1rem", borderRadius: "0.65rem 0.65rem 0 0", border: "none",
            fontSize: "0.85rem", fontWeight: 700, cursor: "pointer",
            background: activeTab === t.id ? "var(--surface)" : "transparent",
            color: activeTab === t.id ? "var(--accent)" : "var(--text-muted)",
            borderBottom: activeTab === t.id ? "2px solid var(--accent)" : "2px solid transparent",
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── TAB: DATA STAFF ── */}
      {activeTab === "data" && (
        <div style={{ padding: "1rem 1.25rem 2rem" }}>
          {/* Filter row */}
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.85rem", alignItems: "flex-end" }}>
            <div style={{ display: "grid", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Jabatan</label>
              <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} style={{ padding: "0.45rem 0.7rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.88rem" }}>
                <option value="">Semua Jabatan</option>
                {Object.entries(ROLE_CFG).map(([val, { label }]) => <option key={val} value={val}>{label}</option>)}
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
            <button type="button" onClick={loadData} disabled={loading} className="asf-button asf-button-primary" style={{ alignSelf: "flex-end" }}>🔍 Terapkan</button>
            <button type="button" onClick={() => setActiveTab("tambah")} className="asf-button asf-button-secondary" style={{ marginLeft: "auto", alignSelf: "flex-end" }}>+ Tambah Staff</button>
          </div>

          {/* Staff Table */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", boxShadow: "var(--card-shadow)", overflow: "hidden" }}>
            <div style={{ padding: "0.85rem 1rem", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: "0.92rem", fontWeight: 800 }}>👥 Data Staff & Asatidz ({staff.length})</h3>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.87rem" }}>
                <thead>
                  <tr style={{ background: "var(--surface-muted)" }}>
                    {["Nama","NIP","Jabatan","Bidang/Mapel","No. HP","Bergabung","Status","Gaji (Rp)","Aksi"].map((h) => (
                      <th key={h} style={{ padding: "0.6rem 0.85rem", textAlign: "left", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {staff.length === 0 ? (
                    <tr><td colSpan={9} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>Belum ada data staff.</td></tr>
                  ) : staff.map((row) => {
                    const rc = ROLE_CFG[row.role];
                    const sc = STATUS_CFG[row.status] || STATUS_CFG.nonaktif;
                    return (
                      <tr key={row.id} style={{ borderTop: "1px solid var(--line)" }}>
                        <td style={{ padding: "0.55rem 0.85rem", fontWeight: 700 }}>{row.full_name}</td>
                        <td style={{ padding: "0.55rem 0.85rem", color: "var(--text-muted)", fontSize: "0.82rem" }}>{row.nip || "—"}</td>
                        <td style={{ padding: "0.55rem 0.85rem" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.1rem 0.45rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700, background: rc ? `${rc.color}15` : "var(--surface-muted)", color: rc?.color || "var(--text-muted)", border: `1px solid ${rc ? rc.color + "33" : "var(--line)"}` }}>
                            {rc?.icon} {rc?.label || row.role}
                          </span>
                        </td>
                        <td style={{ padding: "0.55rem 0.85rem", color: "var(--text-muted)", fontSize: "0.82rem" }}>{row.subject || "—"}</td>
                        <td style={{ padding: "0.55rem 0.85rem", color: "var(--text-muted)", fontSize: "0.82rem" }}>{row.phone || "—"}</td>
                        <td style={{ padding: "0.55rem 0.85rem", color: "var(--text-muted)", fontSize: "0.82rem" }}>{row.join_date ? String(row.join_date).slice(0, 10) : "—"}</td>
                        <td style={{ padding: "0.55rem 0.85rem" }}>
                          <span style={{ display: "inline-flex", padding: "0.1rem 0.4rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700, background: sc.bg, color: sc.fg, border: `1px solid ${sc.border}` }}>{sc.label}</span>
                        </td>
                        <td style={{ padding: "0.55rem 0.85rem" }}>
                          {editSalaryId === row.id ? (
                            <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
                              <input type="number" min="0" step="50000" value={editSalaryVal} onChange={(e) => setEditSalaryVal(e.target.value)} style={{ width: "100px", padding: "0.3rem 0.5rem", borderRadius: "0.5rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.82rem" }} />
                              <button type="button" onClick={() => handleUpdateSalary(row.id)} disabled={submitting} style={{ padding: "0.25rem 0.5rem", borderRadius: "0.5rem", border: "none", background: "var(--success-bg)", color: "var(--success-fg)", fontWeight: 800, cursor: "pointer", fontSize: "0.78rem" }}>✓</button>
                              <button type="button" onClick={() => setEditSalaryId(null)} style={{ padding: "0.25rem 0.5rem", borderRadius: "0.5rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text-muted)", fontWeight: 800, cursor: "pointer", fontSize: "0.78rem" }}>✗</button>
                            </div>
                          ) : (
                            <span style={{ fontWeight: 600 }}>Rp {fmt(row.salary)}</span>
                          )}
                        </td>
                        <td style={{ padding: "0.55rem 0.85rem" }}>
                          {editSalaryId !== row.id && (
                            <button type="button" onClick={() => { setEditSalaryId(row.id); setEditSalaryVal(String(row.salary || "")); }} style={{ padding: "0.3rem 0.65rem", borderRadius: "0.55rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontWeight: 700, fontSize: "0.78rem", cursor: "pointer" }}>
                              ✏️ Gaji
                            </button>
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

      {/* ── TAB: TAMBAH STAFF ── */}
      {activeTab === "tambah" && (
        <div style={{ padding: "1rem 1.25rem 2rem", maxWidth: "600px" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.25rem", boxShadow: "var(--card-shadow)" }}>
            <h3 style={{ margin: "0 0 1rem", fontSize: "1rem", fontWeight: 800 }}>➕ Form Tambah Staff / Asatidz</h3>
            <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div style={{ display: "grid", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Nama Lengkap *</label>
                <input value={form.full_name} onChange={(e) => f("full_name", e.target.value)} required placeholder="Nama asatidz / staff" style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
              </div>
              <div style={{ display: "grid", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>NIP (opsional)</label>
                <input value={form.nip} onChange={(e) => f("nip", e.target.value)} placeholder="Nomor Induk Pegawai" style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
              </div>
              <div style={{ display: "grid", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Jabatan / Role</label>
                <select value={form.role} onChange={(e) => f("role", e.target.value)} style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }}>
                  {Object.entries(ROLE_CFG).map(([val, { label, icon }]) => <option key={val} value={val}>{icon} {label}</option>)}
                </select>
              </div>
              <div style={{ display: "grid", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Bidang / Mata Pelajaran</label>
                <input value={form.subject} onChange={(e) => f("subject", e.target.value)} placeholder="mis. Fiqih, Nahwu Shorof" style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
              </div>
              <div style={{ display: "grid", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>No. HP</label>
                <input value={form.phone} onChange={(e) => f("phone", e.target.value)} placeholder="08..." style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
              </div>
              <div style={{ display: "grid", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Tanggal Bergabung</label>
                <input type="date" value={form.join_date} onChange={(e) => f("join_date", e.target.value)} style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
              </div>
              <div style={{ gridColumn: "1 / -1", display: "grid", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Alamat</label>
                <input value={form.address} onChange={(e) => f("address", e.target.value)} placeholder="Alamat lengkap" style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
              </div>
              <div style={{ gridColumn: "1 / -1", display: "flex", gap: "0.6rem" }}>
                <button type="button" onClick={() => setActiveTab("data")} className="asf-button asf-button-secondary">← Batal</button>
                <button type="submit" disabled={!apiOk || submitting} className="asf-button asf-button-primary" style={{ flex: 1, justifyContent: "center" }}>
                  {submitting ? "⟳ Menyimpan..." : "✓ Simpan Data Staff"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── TAB: PAYROLL ── */}
      {activeTab === "payroll" && (
        <div style={{ padding: "1rem 1.25rem 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.85rem" }}>
            {/* Distribusi gaji per jabatan */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
              <h3 style={{ margin: "0 0 0.85rem", fontSize: "0.96rem", fontWeight: 800 }}>💰 Total Payroll per Jabatan</h3>
              {Object.entries(ROLE_CFG).map(([roleKey, rc]) => {
                const roleStaff = staff.filter((s) => s.role === roleKey && s.status === "aktif");
                const roleGaji  = roleStaff.reduce((s, st) => s + Number(st.salary || 0), 0);
                return (
                  <div key={roleKey} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.45rem 0", borderBottom: "1px solid var(--line)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.87rem" }}>
                      <span>{rc.icon}</span>
                      <span style={{ fontWeight: 600 }}>{rc.label}</span>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>({roleStaff.length} orang)</span>
                    </div>
                    <span style={{ fontWeight: 800, fontSize: "0.88rem", color: rc.color }}>Rp {fmt(roleGaji)}</span>
                  </div>
                );
              })}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0 0", marginTop: "0.2rem" }}>
                <span style={{ fontWeight: 800 }}>Total Keseluruhan</span>
                <span style={{ fontWeight: 900, fontSize: "1rem", color: "var(--accent)" }}>Rp {fmt(totalGaji)}</span>
              </div>
            </div>

            {/* Distribusi count per jabatan */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
              <h3 style={{ margin: "0 0 0.85rem", fontSize: "0.96rem", fontWeight: 800 }}>📊 Distribusi SDM per Jabatan</h3>
              {Object.entries(ROLE_CFG).map(([roleKey, rc]) => {
                const count = byRole[roleKey] || 0;
                const pct   = staff.length > 0 ? Math.round((count / staff.length) * 100) : 0;
                return (
                  <div key={roleKey} style={{ marginBottom: "0.65rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "0.2rem" }}>
                      <span style={{ fontWeight: 600 }}>{rc.icon} {rc.label}</span>
                      <span style={{ color: "var(--text-muted)" }}>{count} orang ({pct}%)</span>
                    </div>
                    <div style={{ height: "5px", borderRadius: "999px", background: "var(--surface-muted)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: rc.color, borderRadius: "999px", transition: "width 500ms ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Payroll summary */}
            <div style={{ background: "var(--accent-soft)", border: "1px solid rgba(31,107,67,0.2)", borderRadius: "var(--radius-md)", padding: "1.1rem" }}>
              <h3 style={{ margin: "0 0 0.85rem", fontSize: "0.96rem", fontWeight: 800, color: "var(--accent-ink)" }}>📋 Ringkasan Kepegawaian</h3>
              {[
                { label: "Total Staff Terdaftar",    val: staff.length },
                { label: "Staff Aktif",              val: activeStaff.length },
                { label: "Staff Cuti",               val: staff.filter((s) => s.status === "cuti").length },
                { label: "Staff Nonaktif",           val: staff.filter((s) => s.status === "nonaktif").length },
                { label: "Tenaga Pengajar",          val: pengajar },
                { label: "Rata-rata Gaji (Aktif)",   val: activeStaff.length > 0 ? `Rp ${fmt(Math.round(totalGaji / activeStaff.length))}` : "—" },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid rgba(31,107,67,0.12)", fontSize: "0.87rem" }}>
                  <span style={{ color: "var(--accent-ink)" }}>{row.label}</span>
                  <strong style={{ color: "var(--accent-ink)" }}>{row.val}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchApi, withQuery } from "../../lib/api-client";

const DEFAULT_MONTH = new Date().toISOString().slice(0, 7);

function fmt(v) { return new Intl.NumberFormat("id-ID").format(Number(v || 0)); }

const STATUS_CFG = {
  paid:    { label: "Lunas",      bg: "var(--success-bg)", fg: "var(--success-fg)", border: "rgba(24,117,72,0.25)" },
  partial: { label: "Cicilan",    bg: "var(--warn-bg)",    fg: "var(--warn-fg)",    border: "rgba(161,93,6,0.25)" },
  unpaid:  { label: "Belum Bayar",bg: "var(--danger-bg)",  fg: "var(--danger-fg)",  border: "rgba(178,58,47,0.25)" },
};

function SBadge({ status }) {
  const c = STATUS_CFG[status] || STATUS_CFG.unpaid;
  return <span style={{ display: "inline-flex", padding: "0.12rem 0.48rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700, background: c.bg, color: c.fg, border: `1px solid ${c.border}` }}>{c.label}</span>;
}

const TABS = [
  { id: "tagihan", label: "💳 Daftar Tagihan" },
  { id: "tambah",  label: "➕ Tambah Tagihan" },
  { id: "laporan", label: "📊 Laporan Keuangan" },
];

export default function KeuanganPage() {
  const [activeTab, setActiveTab]       = useState("tagihan");
  const [billing, setBilling]           = useState([]);
  const [students, setStudents]         = useState([]);
  const [summary, setSummary]           = useState(null);
  const [loading, setLoading]           = useState(false);
  const [apiOk, setApiOk]               = useState(false);
  const [message, setMessage]           = useState({ type: "", text: "" });
  const [selectedMonth, setSelectedMonth] = useState(DEFAULT_MONTH);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterStudent, setFilterStudent] = useState("");
  const [editingId, setEditingId]       = useState(null);
  const [editPaidAmount, setEditPaidAmount] = useState("");
  const [submitting, setSubmitting]     = useState(false);
  const [nb, setNb]                     = useState({ student_id: "", month: DEFAULT_MONTH, amount: "" });

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
      const [healthRes, studentsRes, billingRes, summaryRes] = await Promise.all([
        fetchApi("/api/health"),
        fetchApi("/api/students"),
        fetchApi(withQuery("/api/billing", { month: selectedMonth, status: filterStatus, student_id: filterStudent })),
        fetchApi("/api/billing/summary"),
      ]);
      setApiOk(healthRes.ok);
      if (Array.isArray(studentsRes.data)) setStudents(studentsRes.data);
      if (Array.isArray(billingRes.data)) setBilling(billingRes.data);
      if (summaryRes.ok && summaryRes.data?.summary) setSummary(summaryRes.data.summary);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  async function handleUpdateStatus(id) {
    setSubmitting(true);
    const res = await fetchApi(`/api/billing/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paid_amount: Number(editPaidAmount) }),
    });
    if (!res.ok) msg("error", res.data?.message || "Gagal update status");
    else { msg("success", "Status pembayaran berhasil diperbarui."); setEditingId(null); await loadData(); }
    setSubmitting(false);
  }

  async function handleAddBilling(e) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetchApi("/api/billing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_id: Number(nb.student_id), month: nb.month, amount: Number(nb.amount) }),
    });
    if (!res.ok) msg("error", res.data?.message || "Gagal tambah tagihan");
    else { msg("success", "Tagihan berhasil ditambahkan."); setNb({ student_id: "", month: DEFAULT_MONTH, amount: "" }); await loadData(); setActiveTab("tagihan"); }
    setSubmitting(false);
  }

  const stats = useMemo(() => {
    const total     = billing.reduce((s, b) => s + Number(b.amount || 0), 0);
    const terkumpul = billing.filter((b) => b.status === "paid").reduce((s, b) => s + Number(b.amount || 0), 0);
    const belum     = billing.filter((b) => b.status === "unpaid").reduce((s, b) => s + Number(b.amount || 0), 0);
    const cicilanAmt= billing.filter((b) => b.status === "partial").reduce((s, b) => s + Number(b.amount || 0), 0);
    const rate = total > 0 ? Math.round((terkumpul / total) * 100) : 0;
    return {
      total, terkumpul, belum, cicilanAmt, rate,
      paid: billing.filter((b) => b.status === "paid").length,
      unpaid: billing.filter((b) => b.status === "unpaid").length,
      partial: billing.filter((b) => b.status === "partial").length,
    };
  }, [billing]);

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(140deg, #0d3347 0%, #245f82 55%, #2e7aab 100%)",
        color: "#fff", padding: "1.8rem 1.5rem", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.07), transparent 55%)", pointerEvents: "none" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <p style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.25rem 0.65rem", fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.55rem", color: "#cfe8ff" }}>
              💰 Modul Keuangan
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3.5vw, 2rem)", margin: "0 0 0.3rem" }}>
              Dashboard Bendahara
            </h1>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.82)", fontSize: "0.9rem" }}>
              Kelola tagihan syahriah, update pembayaran, dan pantau cashflow pesantren.
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

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: "0.7rem", padding: "0.85rem 1.25rem 0" }}>
        {[
          { icon: "📋", label: "Total Tagihan",     value: loading ? "…" : billing.length,   sub: `Rp ${fmt(stats.total)}`,      color: "#245f82" },
          { icon: "✅", label: "Lunas",             value: loading ? "…" : stats.paid,        sub: `Rp ${fmt(stats.terkumpul)}`,  color: "#1f6b43" },
          { icon: "⏳", label: "Cicilan",           value: loading ? "…" : stats.partial,     sub: `Rp ${fmt(stats.cicilanAmt)}`, color: "#a15d06" },
          { icon: "❌", label: "Belum Bayar",       value: loading ? "…" : stats.unpaid,      sub: `Rp ${fmt(stats.belum)}`,      color: stats.unpaid > 5 ? "#b23a2f" : "#187548" },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "0.85rem 1rem", boxShadow: "var(--card-shadow)" }}>
            <p style={{ margin: "0 0 0.25rem", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{kpi.icon} {kpi.label}</p>
            <p style={{ margin: "0 0 0.1rem", fontSize: "1.7rem", fontWeight: 800, color: kpi.color, lineHeight: 1 }}>{kpi.value}</p>
            <p style={{ margin: 0, fontSize: "0.72rem", color: "var(--text-muted)" }}>{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Collection rate bar */}
      <div style={{ padding: "0.75rem 1.25rem 0" }}>
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "0.9rem 1rem", boxShadow: "var(--card-shadow)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 800 }}>📊 Tingkat Koleksi Bulan {selectedMonth}</span>
            <span style={{ fontSize: "0.88rem", fontWeight: 800, color: stats.rate >= 80 ? "var(--success-fg)" : "var(--warn-fg)" }}>{stats.rate}%</span>
          </div>
          <div style={{ height: "8px", borderRadius: "999px", background: "var(--surface-muted)", overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: "999px", width: `${stats.rate}%`, background: stats.rate >= 80 ? "var(--success)" : stats.rate >= 50 ? "var(--warn)" : "var(--danger)", transition: "width 600ms ease" }} />
          </div>
          <p style={{ margin: "0.35rem 0 0", fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Terkumpul: Rp {fmt(stats.terkumpul)} dari Rp {fmt(stats.total)}
          </p>
        </div>
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

      {/* ── TAB: DAFTAR TAGIHAN ── */}
      {activeTab === "tagihan" && (
        <div style={{ padding: "1rem 1.25rem 2rem" }}>
          {/* Filter row */}
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.85rem", alignItems: "flex-end" }}>
            {[
              { label: "Bulan", type: "month", val: selectedMonth, set: setSelectedMonth },
            ].map(({ label, type, val, set }) => (
              <div key={label} style={{ display: "grid", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>{label}</label>
                <input type={type} value={val} onChange={(e) => set(e.target.value)} style={{ padding: "0.45rem 0.7rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.88rem" }} />
              </div>
            ))}
            <div style={{ display: "grid", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Status</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ padding: "0.45rem 0.7rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.88rem" }}>
                <option value="">Semua Status</option>
                <option value="unpaid">Belum Bayar</option>
                <option value="partial">Cicilan</option>
                <option value="paid">Lunas</option>
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
          </div>

          {/* Table */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", boxShadow: "var(--card-shadow)", overflow: "hidden" }}>
            <div style={{ padding: "0.85rem 1rem", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: "0.92rem", fontWeight: 800 }}>💳 Tagihan SPP ({billing.length} data)</h3>
              <button type="button" onClick={() => setActiveTab("tambah")} className="asf-button asf-button-primary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>+ Tambah</button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.87rem" }}>
                <thead>
                  <tr style={{ background: "var(--surface-muted)" }}>
                    {["Bulan","Santri","Nominal","Terbayar","Sisa","Status","Aksi"].map((h) => (
                      <th key={h} style={{ padding: "0.6rem 0.85rem", textAlign: "left", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {billing.length === 0 ? (
                    <tr><td colSpan={7} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.88rem" }}>Tidak ada data tagihan untuk filter ini.</td></tr>
                  ) : billing.map((row) => {
                    const sisa = Number(row.amount || 0) - Number(row.paid_amount || 0);
                    return (
                      <tr key={row.id} style={{ borderTop: "1px solid var(--line)" }}>
                        <td style={{ padding: "0.55rem 0.85rem", fontWeight: 600 }}>{row.month}</td>
                        <td style={{ padding: "0.55rem 0.85rem" }}>{studentName(row.student_id)}</td>
                        <td style={{ padding: "0.55rem 0.85rem", fontWeight: 700 }}>Rp {fmt(row.amount)}</td>
                        <td style={{ padding: "0.55rem 0.85rem", color: "var(--success-fg)", fontWeight: 700 }}>Rp {fmt(row.paid_amount)}</td>
                        <td style={{ padding: "0.55rem 0.85rem", color: sisa > 0 ? "var(--danger-fg)" : "var(--text-muted)", fontWeight: sisa > 0 ? 700 : 400 }}>
                          {sisa > 0 ? `Rp ${fmt(sisa)}` : "—"}
                        </td>
                        <td style={{ padding: "0.55rem 0.85rem" }}><SBadge status={row.status} /></td>
                        <td style={{ padding: "0.55rem 0.85rem" }}>
                          {editingId === row.id ? (
                            <div style={{ display: "flex", gap: "0.35rem", alignItems: "center", flexWrap: "wrap" }}>
                              <input type="number" min="0" step="1000" value={editPaidAmount} onChange={(e) => setEditPaidAmount(e.target.value)} placeholder="Nominal bayar" style={{ width: "110px", padding: "0.3rem 0.5rem", borderRadius: "0.5rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.82rem" }} />
                              <button type="button" onClick={() => handleUpdateStatus(row.id)} disabled={submitting} className="asf-button asf-button-primary" style={{ padding: "0.3rem 0.6rem", fontSize: "0.78rem" }}>✓ Simpan</button>
                              <button type="button" onClick={() => setEditingId(null)} className="asf-button asf-button-secondary" style={{ padding: "0.3rem 0.6rem", fontSize: "0.78rem" }}>Batal</button>
                            </div>
                          ) : (
                            <button type="button" onClick={() => { setEditingId(row.id); setEditPaidAmount(String(row.paid_amount || "")); }} disabled={row.status === "paid"} className="asf-button asf-button-secondary" style={{ padding: "0.3rem 0.65rem", fontSize: "0.78rem", opacity: row.status === "paid" ? 0.5 : 1 }}>
                              {row.status === "paid" ? "✓ Lunas" : "💵 Update"}
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

      {/* ── TAB: TAMBAH TAGIHAN ── */}
      {activeTab === "tambah" && (
        <div style={{ padding: "1rem 1.25rem 2rem", maxWidth: "540px" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.25rem", boxShadow: "var(--card-shadow)" }}>
            <h3 style={{ margin: "0 0 1rem", fontSize: "1rem", fontWeight: 800 }}>➕ Tambah Tagihan Syahriah</h3>
            <form onSubmit={handleAddBilling} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "grid", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Santri *</label>
                <select value={nb.student_id} onChange={(e) => setNb((p) => ({ ...p, student_id: e.target.value }))} required style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }}>
                  <option value="">Pilih santri...</option>
                  {students.map((s) => <option key={s.id} value={s.id}>{s.full_name} ({s.class_name})</option>)}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div style={{ display: "grid", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Bulan *</label>
                  <input type="month" value={nb.month} onChange={(e) => setNb((p) => ({ ...p, month: e.target.value }))} required style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
                </div>
                <div style={{ display: "grid", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Nominal (Rp) *</label>
                  <input type="number" min="10000" step="5000" value={nb.amount} onChange={(e) => setNb((p) => ({ ...p, amount: e.target.value }))} placeholder="mis. 350000" required style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
                </div>
              </div>
              <div style={{ padding: "0.75rem", borderRadius: "0.65rem", background: "var(--accent-soft)", border: "1px solid rgba(31,107,67,0.2)", fontSize: "0.82rem", color: "var(--accent-ink)" }}>
                ℹ️ Tagihan baru akan berstatus <strong>Belum Bayar</strong>. Update pembayaran melalui tab Daftar Tagihan.
              </div>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                <button type="button" onClick={() => setActiveTab("tagihan")} className="asf-button asf-button-secondary">← Kembali</button>
                <button type="submit" disabled={!apiOk || submitting} className="asf-button asf-button-primary" style={{ flex: 1, justifyContent: "center" }}>
                  {submitting ? "⟳ Menyimpan..." : "✓ Simpan Tagihan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── TAB: LAPORAN ── */}
      {activeTab === "laporan" && (
        <div style={{ padding: "1rem 1.25rem 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.85rem" }}>
            {/* Monthly breakdown */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
              <h3 style={{ margin: "0 0 0.85rem", fontSize: "0.96rem", fontWeight: 800 }}>📅 Rekap Bulan {selectedMonth}</h3>
              {[
                { label: "Total Tagihan",   value: `Rp ${fmt(stats.total)}`,      color: "var(--text)" },
                { label: "Terkumpul",       value: `Rp ${fmt(stats.terkumpul)}`,  color: "var(--success-fg)" },
                { label: "Cicilan",         value: `Rp ${fmt(stats.cicilanAmt)}`, color: "var(--warn-fg)" },
                { label: "Belum Dibayar",   value: `Rp ${fmt(stats.belum)}`,      color: "var(--danger-fg)" },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.45rem 0", borderBottom: "1px solid var(--line)", fontSize: "0.88rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>{row.label}</span>
                  <span style={{ fontWeight: 800, color: row.color }}>{row.value}</span>
                </div>
              ))}
              <div style={{ marginTop: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.3rem" }}>
                  <span>Tingkat Koleksi</span>
                  <span style={{ fontWeight: 700 }}>{stats.rate}%</span>
                </div>
                <div style={{ height: "6px", borderRadius: "999px", background: "var(--surface-muted)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${stats.rate}%`, background: stats.rate >= 80 ? "var(--success)" : stats.rate >= 50 ? "var(--warn)" : "var(--danger)", borderRadius: "999px", transition: "width 500ms ease" }} />
                </div>
              </div>
            </div>

            {/* Count breakdown */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
              <h3 style={{ margin: "0 0 0.85rem", fontSize: "0.96rem", fontWeight: 800 }}>👥 Breakdown Status Pembayaran</h3>
              {[
                { label: "Lunas",      val: stats.paid,    pct: billing.length > 0 ? Math.round((stats.paid/billing.length)*100) : 0,    color: "#1f6b43" },
                { label: "Cicilan",    val: stats.partial, pct: billing.length > 0 ? Math.round((stats.partial/billing.length)*100) : 0, color: "#a15d06" },
                { label: "Belum Bayar",val: stats.unpaid,  pct: billing.length > 0 ? Math.round((stats.unpaid/billing.length)*100) : 0,  color: "#b23a2f" },
              ].map((row) => (
                <div key={row.label} style={{ marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "0.2rem" }}>
                    <span style={{ fontWeight: 600 }}>{row.label}</span>
                    <span style={{ color: "var(--text-muted)" }}>{row.val} santri ({row.pct}%)</span>
                  </div>
                  <div style={{ height: "6px", borderRadius: "999px", background: "var(--surface-muted)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${row.pct}%`, background: row.color, borderRadius: "999px", transition: "width 500ms ease" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* API Summary */}
            {summary && (
              <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
                <h3 style={{ margin: "0 0 0.85rem", fontSize: "0.96rem", fontWeight: 800 }}>🔗 Laporan dari API</h3>
                {Object.entries(summary).map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid var(--line)", fontSize: "0.86rem" }}>
                    <span style={{ color: "var(--text-muted)", textTransform: "capitalize" }}>{k.replace(/_/g, " ")}</span>
                    <span style={{ fontWeight: 700 }}>{typeof v === "number" && v > 999 ? `Rp ${fmt(v)}` : v}</span>
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

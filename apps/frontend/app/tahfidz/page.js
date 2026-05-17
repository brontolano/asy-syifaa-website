"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchApi, withQuery } from "../../lib/api-client";

const TODAY = new Date().toISOString().slice(0, 10);

const SURAH_LIST = [
  "Al-Fatihah","Al-Baqarah","Ali Imran","An-Nisa","Al-Maidah","Al-An'am","Al-A'raf","Al-Anfal","At-Taubah","Yunus",
  "Hud","Yusuf","Ar-Ra'd","Ibrahim","Al-Hijr","An-Nahl","Al-Isra","Al-Kahf","Maryam","Taha",
  "Al-Anbiya","Al-Hajj","Al-Mu'minun","An-Nur","Al-Furqan","Asy-Syu'ara","An-Naml","Al-Qasas","Al-Ankabut","Ar-Rum",
  "Luqman","As-Sajdah","Al-Ahzab","Saba","Fatir","Yasin","As-Saffat","Sad","Az-Zumar","Ghafir",
  "Fussilat","Asy-Syura","Az-Zukhruf","Ad-Dukhan","Al-Jasiyah","Al-Ahqaf","Muhammad","Al-Fath","Al-Hujurat","Qaf",
  "Az-Zariyat","At-Tur","An-Najm","Al-Qamar","Ar-Rahman","Al-Waqiah","Al-Hadid","Al-Mujadilah","Al-Hasyr","Al-Mumtahanah",
  "As-Saf","Al-Jumuah","Al-Munafiqun","At-Taghabun","At-Talaq","At-Tahrim","Al-Mulk","Al-Qalam","Al-Haqqah","Al-Ma'arij",
  "Nuh","Al-Jin","Al-Muzzammil","Al-Muddassir","Al-Qiyamah","Al-Insan","Al-Mursalat","An-Naba","An-Naziat","Abasa",
  "At-Takwir","Al-Infitar","Al-Mutaffifin","Al-Insyiqaq","Al-Buruj","At-Tariq","Al-A'la","Al-Ghasyiyah","Al-Fajr","Al-Balad",
  "Asy-Syams","Al-Lail","Ad-Duha","Asy-Syarh","At-Tin","Al-Alaq","Al-Qadr","Al-Bayyinah","Az-Zalzalah","Al-Adiyat",
  "Al-Qari'ah","At-Takasur","Al-Asr","Al-Humazah","Al-Fil","Quraisy","Al-Ma'un","Al-Kausar","Al-Kafirun","An-Nasr",
  "Al-Masad","Al-Ikhlas","Al-Falaq","An-Nas",
];

const QUALITY = {
  mumtaz:       { label: "Mumtaz",       sub: "Sempurna",    bg: "var(--success-bg)", fg: "var(--success-fg)", border: "rgba(24,117,72,0.25)" },
  jayyid_jiddan:{ label: "Jayyid Jiddan",sub: "Sangat Baik", bg: "var(--success-bg)", fg: "var(--success-fg)", border: "rgba(24,117,72,0.25)" },
  jayyid:       { label: "Jayyid",        sub: "Baik",        bg: "var(--warn-bg)",    fg: "var(--warn-fg)",    border: "rgba(161,93,6,0.25)" },
  maqbul:       { label: "Maqbul",        sub: "Cukup",       bg: "var(--warn-bg)",    fg: "var(--warn-fg)",    border: "rgba(161,93,6,0.25)" },
  dhoif:        { label: "Dhoif",         sub: "Kurang",      bg: "var(--danger-bg)",  fg: "var(--danger-fg)",  border: "rgba(178,58,47,0.25)" },
};

const TABS = [
  { id: "rekap",   label: "📊 Rekap & Riwayat" },
  { id: "catat",   label: "✏️ Catat Setoran" },
];

function QBadge({ quality }) {
  const q = QUALITY[quality] || { label: quality, bg: "var(--surface-muted)", fg: "var(--text-muted)", border: "var(--line)" };
  return (
    <span style={{ display: "inline-flex", padding: "0.12rem 0.45rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700, background: q.bg, color: q.fg, border: `1px solid ${q.border}` }}>
      {q.label}
    </span>
  );
}

export default function TahfidzPage() {
  const [activeTab, setActiveTab]         = useState("rekap");
  const [records, setRecords]             = useState([]);
  const [students, setStudents]           = useState([]);
  const [loading, setLoading]             = useState(false);
  const [apiOk, setApiOk]                 = useState(false);
  const [message, setMessage]             = useState({ type: "", text: "" });
  const [filterStudentId, setFilterStudentId] = useState("");
  const [filterType, setFilterType]       = useState("");
  const [submitting, setSubmitting]       = useState(false);
  const [form, setForm]                   = useState({
    student_id: "", record_date: TODAY, type: "ziyadah",
    surah_from: "Al-Fatihah", ayat_from: "1",
    surah_to: "Al-Fatihah", ayat_to: "7",
    juz: "1", quality: "jayyid", note: "",
  });

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
      const [healthRes, studentsRes, recordsRes] = await Promise.all([
        fetchApi("/api/health"),
        fetchApi("/api/students"),
        fetchApi(withQuery("/api/tahfidz", { student_id: filterStudentId, type: filterType })),
      ]);
      setApiOk(healthRes.ok);
      if (Array.isArray(studentsRes.data)) setStudents(studentsRes.data);
      if (Array.isArray(recordsRes.data)) setRecords(recordsRes.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      student_id: Number(form.student_id),
      record_date: form.record_date,
      type: form.type,
      surah_from: form.surah_from, ayat_from: Number(form.ayat_from),
      surah_to: form.surah_to,   ayat_to: Number(form.ayat_to),
      juz: form.juz ? Number(form.juz) : null,
      quality: form.quality, note: form.note,
    };
    const res = await fetchApi("/api/tahfidz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) { msg("error", res.data?.message || "Gagal simpan setoran"); }
    else { msg("success", "Setoran tahfidz berhasil dicatat."); f("note", ""); await loadData(); setActiveTab("rekap"); }
    setSubmitting(false);
  }

  const summaryMap = useMemo(() => {
    const map = {};
    for (const r of records) {
      const sid = r.student_id;
      if (!map[sid]) map[sid] = { ziyadah: 0, murojaah: 0, last: null };
      map[sid][r.type]++;
      if (!map[sid].last || r.record_date > map[sid].last) map[sid].last = r.record_date;
    }
    return map;
  }, [records]);

  const totalZiyadah  = records.filter((r) => r.type === "ziyadah").length;
  const totalMurojaah = records.filter((r) => r.type === "murojaah").length;
  const activeStudents = Object.keys(summaryMap).length;
  const todayRecords   = records.filter((r) => String(r.record_date).slice(0, 10) === TODAY).length;

  const displayedStudents = students.filter((s) => !filterStudentId || Number(s.id) === Number(filterStudentId));

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(140deg, #3b2a0f 0%, #7a5b2f 55%, #9a7540 100%)",
        color: "#fff", padding: "1.8rem 1.5rem", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.07), transparent 55%)", pointerEvents: "none" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <p style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.25rem 0.65rem", fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.55rem", color: "#fdf2d4" }}>
              📖 Modul Tahfidz
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3.5vw, 2rem)", margin: "0 0 0.3rem" }}>
              Tahfidz Tracker
            </h1>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.82)", fontSize: "0.9rem" }}>
              Catat ziyadah & murojaah. Pantau progres hafalan 30 juz setiap santri.
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
          { icon: "📖", label: "Total Setoran Hari Ini", value: loading ? "…" : todayRecords,    color: "#7a5b2f" },
          { icon: "⬆️", label: "Ziyadah (Total)",        value: loading ? "…" : totalZiyadah,    color: "#1f6b43" },
          { icon: "🔄", label: "Murojaah (Total)",       value: loading ? "…" : totalMurojaah,   color: "#245f82" },
          { icon: "🧑‍🎓", label: "Santri Tercatat",       value: loading ? "…" : activeStudents,  color: "#4c4383" },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "0.85rem 1rem", boxShadow: "var(--card-shadow)" }}>
            <p style={{ margin: "0 0 0.25rem", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{kpi.icon} {kpi.label}</p>
            <p style={{ margin: 0, fontSize: "1.7rem", fontWeight: 800, color: kpi.color, lineHeight: 1 }}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Toast message */}
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

      {/* ── TAB: REKAP ── */}
      {activeTab === "rekap" && (
        <div style={{ padding: "1rem 1.25rem 2rem" }}>
          {/* Filter row */}
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.85rem", alignItems: "flex-end" }}>
            <div style={{ display: "grid", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Filter Santri</label>
              <select value={filterStudentId} onChange={(e) => setFilterStudentId(e.target.value)} style={{ padding: "0.45rem 0.7rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.88rem" }}>
                <option value="">Semua Santri</option>
                {students.map((s) => <option key={s.id} value={s.id}>{s.full_name}</option>)}
              </select>
            </div>
            <div style={{ display: "grid", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Jenis Setoran</label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ padding: "0.45rem 0.7rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.88rem" }}>
                <option value="">Semua Jenis</option>
                <option value="ziyadah">Ziyadah</option>
                <option value="murojaah">Murojaah</option>
              </select>
            </div>
            <button type="button" onClick={loadData} disabled={loading} className="asf-button asf-button-primary" style={{ alignSelf: "flex-end" }}>
              🔍 Terapkan Filter
            </button>
          </div>

          {/* Student summary cards */}
          {displayedStudents.filter((s) => summaryMap[s.id]).length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.6rem", marginBottom: "1rem" }}>
              {displayedStudents.filter((s) => summaryMap[s.id]).map((s) => {
                const st = summaryMap[s.id];
                const total = st.ziyadah + st.murojaah;
                return (
                  <div key={s.id} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "0.85rem 1rem", boxShadow: "var(--card-shadow)" }}>
                    <p style={{ margin: "0 0 0.2rem", fontWeight: 800, fontSize: "0.9rem" }}>{s.full_name}</p>
                    <p style={{ margin: "0 0 0.5rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>{s.class_name} · {total} setoran</p>
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                      <span style={{ padding: "0.1rem 0.45rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700, background: "var(--success-bg)", color: "var(--success-fg)", border: "1px solid rgba(24,117,72,0.2)" }}>↑ {st.ziyadah}</span>
                      <span style={{ padding: "0.1rem 0.45rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700, background: "var(--warn-bg)", color: "var(--warn-fg)", border: "1px solid rgba(161,93,6,0.2)" }}>↺ {st.murojaah}</span>
                      {st.last && <span style={{ padding: "0.1rem 0.45rem", borderRadius: "999px", fontSize: "0.72rem", color: "var(--text-muted)" }}>📅 {String(st.last).slice(0, 10)}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Riwayat table */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", boxShadow: "var(--card-shadow)", overflow: "hidden" }}>
            <div style={{ padding: "0.85rem 1rem", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: "0.92rem", fontWeight: 800 }}>📋 Riwayat Setoran ({records.length})</h3>
              <button type="button" onClick={() => setActiveTab("catat")} className="asf-button asf-button-primary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>
                + Catat Baru
              </button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.87rem" }}>
                <thead>
                  <tr style={{ background: "var(--surface-muted)" }}>
                    {["Tanggal","Santri","Jenis","Dari","Sampai","Juz","Kualitas","Catatan"].map((h) => (
                      <th key={h} style={{ padding: "0.6rem 0.85rem", textAlign: "left", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {records.length === 0 ? (
                    <tr><td colSpan={8} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.88rem" }}>Belum ada data setoran untuk filter ini.</td></tr>
                  ) : records.map((row) => (
                    <tr key={row.id} style={{ borderTop: "1px solid var(--line)" }}>
                      <td style={{ padding: "0.55rem 0.85rem", whiteSpace: "nowrap", color: "var(--text-muted)", fontSize: "0.82rem" }}>{String(row.record_date).slice(0, 10)}</td>
                      <td style={{ padding: "0.55rem 0.85rem", fontWeight: 600 }}>{studentName(row.student_id)}</td>
                      <td style={{ padding: "0.55rem 0.85rem" }}>
                        <span style={{ display: "inline-flex", padding: "0.1rem 0.4rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700,
                          background: row.type === "ziyadah" ? "var(--success-bg)" : "var(--warn-bg)",
                          color: row.type === "ziyadah" ? "var(--success-fg)" : "var(--warn-fg)",
                          border: `1px solid ${row.type === "ziyadah" ? "rgba(24,117,72,0.2)" : "rgba(161,93,6,0.2)"}`,
                        }}>{row.type === "ziyadah" ? "Ziyadah" : "Murojaah"}</span>
                      </td>
                      <td style={{ padding: "0.55rem 0.85rem", fontSize: "0.82rem" }}>{row.surah_from} : {row.ayat_from}</td>
                      <td style={{ padding: "0.55rem 0.85rem", fontSize: "0.82rem" }}>{row.surah_to} : {row.ayat_to}</td>
                      <td style={{ padding: "0.55rem 0.85rem", fontSize: "0.82rem" }}>{row.juz ? `Juz ${row.juz}` : "—"}</td>
                      <td style={{ padding: "0.55rem 0.85rem" }}><QBadge quality={row.quality} /></td>
                      <td style={{ padding: "0.55rem 0.85rem", color: "var(--text-muted)", fontSize: "0.82rem" }}>{row.note || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: CATAT SETORAN ── */}
      {activeTab === "catat" && (
        <div style={{ padding: "1rem 1.25rem 2rem", maxWidth: "680px" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.25rem", boxShadow: "var(--card-shadow)" }}>
            <h3 style={{ margin: "0 0 1rem", fontSize: "1rem", fontWeight: 800 }}>✏️ Form Catat Setoran</h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {/* Santri + Tanggal */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div style={{ display: "grid", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Santri *</label>
                  <select value={form.student_id} onChange={(e) => f("student_id", e.target.value)} required style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }}>
                    <option value="">Pilih santri...</option>
                    {students.map((s) => <option key={s.id} value={s.id}>{s.full_name} ({s.class_name})</option>)}
                  </select>
                </div>
                <div style={{ display: "grid", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Tanggal Setoran *</label>
                  <input type="date" value={form.record_date} onChange={(e) => f("record_date", e.target.value)} required style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
                </div>
              </div>

              {/* Jenis + Juz */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div style={{ display: "grid", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Jenis Setoran</label>
                  <select value={form.type} onChange={(e) => f("type", e.target.value)} style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }}>
                    <option value="ziyadah">⬆️ Ziyadah (Hafalan Baru)</option>
                    <option value="murojaah">🔄 Murojaah (Mengulang)</option>
                  </select>
                </div>
                <div style={{ display: "grid", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Juz</label>
                  <select value={form.juz} onChange={(e) => f("juz", e.target.value)} style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }}>
                    <option value="">— pilih juz —</option>
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((j) => <option key={j} value={j}>Juz {j}</option>)}
                  </select>
                </div>
              </div>

              {/* Surah range */}
              <fieldset style={{ border: "1px solid var(--line)", borderRadius: "0.65rem", padding: "0.75rem" }}>
                <legend style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", padding: "0 0.4rem" }}>Rentang Hafalan</legend>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0.6rem", alignItems: "end" }}>
                  <div style={{ display: "grid", gap: "0.2rem" }}>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Dari Surah</label>
                    <select value={form.surah_from} onChange={(e) => f("surah_from", e.target.value)} style={{ padding: "0.5rem 0.65rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.85rem" }}>
                      {SURAH_LIST.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <input type="number" min="1" placeholder="Ayat mulai" value={form.ayat_from} onChange={(e) => f("ayat_from", e.target.value)} required style={{ padding: "0.45rem 0.65rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.85rem" }} />
                  </div>
                  <span style={{ color: "var(--text-muted)", fontWeight: 700, paddingBottom: "0.5rem" }}>→</span>
                  <div style={{ display: "grid", gap: "0.2rem" }}>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>Sampai Surah</label>
                    <select value={form.surah_to} onChange={(e) => f("surah_to", e.target.value)} style={{ padding: "0.5rem 0.65rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.85rem" }}>
                      {SURAH_LIST.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <input type="number" min="1" placeholder="Ayat akhir" value={form.ayat_to} onChange={(e) => f("ayat_to", e.target.value)} required style={{ padding: "0.45rem 0.65rem", borderRadius: "0.6rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.85rem" }} />
                  </div>
                </div>
              </fieldset>

              {/* Kualitas */}
              <div style={{ display: "grid", gap: "0.3rem" }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Kualitas Setoran</label>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {Object.entries(QUALITY).map(([val, q]) => (
                    <button key={val} type="button" onClick={() => f("quality", val)} style={{
                      padding: "0.35rem 0.75rem", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer",
                      background: form.quality === val ? q.bg : "var(--surface-muted)",
                      color: form.quality === val ? q.fg : "var(--text-muted)",
                      border: `1px solid ${form.quality === val ? q.border : "var(--line)"}`,
                    }}>
                      {q.label} <span style={{ fontSize: "0.68rem", opacity: 0.7 }}>({q.sub})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Catatan */}
              <div style={{ display: "grid", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Catatan Ustadz (opsional)</label>
                <textarea value={form.note} onChange={(e) => f("note", e.target.value)} rows={2} placeholder="Catatan khusus dari ustadz..." style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem", resize: "vertical", fontFamily: "inherit" }} />
              </div>

              <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.25rem" }}>
                <button type="button" onClick={() => setActiveTab("rekap")} className="asf-button asf-button-secondary">← Batal</button>
                <button type="submit" disabled={!form.student_id || submitting} className="asf-button asf-button-primary" style={{ flex: 1, justifyContent: "center" }}>
                  {submitting ? "⟳ Menyimpan..." : "✓ Simpan Setoran"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

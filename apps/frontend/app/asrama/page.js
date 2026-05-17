"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "../../lib/api-client";

const TODAY = new Date().toISOString().slice(0, 10);

const TABS = [
  { id: "kamar",       label: "🛏️ Data Kamar" },
  { id: "penempatan",  label: "👤 Penempatan Santri" },
  { id: "tambah_kamar", label: "➕ Tambah Kamar" },
];

export default function AsramaPage() {
  const [activeTab, setActiveTab]     = useState("kamar");
  const [rooms, setRooms]             = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents]       = useState([]);
  const [loading, setLoading]         = useState(false);
  const [apiOk, setApiOk]             = useState(false);
  const [message, setMessage]         = useState({ type: "", text: "" });
  const [submitting, setSubmitting]   = useState(false);
  const [filterGender, setFilterGender] = useState("");
  const [roomForm, setRoomForm]       = useState({ room_code: "", building: "", floor: "1", capacity: "10", gender: "L" });
  const [assignForm, setAssignForm]   = useState({ student_id: "", room_id: "", assigned_at: TODAY, note: "" });

  function rf(k, v) { setRoomForm((p) => ({ ...p, [k]: v })); }
  function af(k, v) { setAssignForm((p) => ({ ...p, [k]: v })); }
  function msg(type, text, ms = 4000) {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), ms);
  }
  function studentName(id) {
    const s = students.find((st) => Number(st.id) === Number(id));
    return s ? `${s.full_name} (${s.class_name})` : `ID ${id}`;
  }
  function roomLabel(id) {
    const r = rooms.find((rm) => Number(rm.id) === Number(id));
    return r ? `${r.room_code} — ${r.building}` : `Kamar ${id}`;
  }

  async function loadData() {
    setLoading(true);
    try {
      const [healthRes, studentsRes, roomsRes, assignRes] = await Promise.all([
        fetchApi("/api/health"),
        fetchApi("/api/students"),
        fetchApi("/api/dormitory/rooms"),
        fetchApi("/api/dormitory/assignments"),
      ]);
      setApiOk(healthRes.ok);
      if (Array.isArray(studentsRes.data)) setStudents(studentsRes.data);
      if (Array.isArray(roomsRes.data)) setRooms(roomsRes.data);
      if (Array.isArray(assignRes.data)) setAssignments(assignRes.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  async function handleAddRoom(e) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetchApi("/api/dormitory/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...roomForm, floor: Number(roomForm.floor), capacity: Number(roomForm.capacity) }),
    });
    if (!res.ok) msg("error", res.data?.message || "Gagal tambah kamar");
    else { msg("success", "Kamar berhasil ditambahkan."); setRoomForm({ room_code: "", building: "", floor: "1", capacity: "10", gender: "L" }); await loadData(); setActiveTab("kamar"); }
    setSubmitting(false);
  }

  async function handleAssign(e) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetchApi("/api/dormitory/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...assignForm, student_id: Number(assignForm.student_id), room_id: Number(assignForm.room_id) }),
    });
    if (!res.ok) msg("error", res.data?.message || "Gagal assign kamar");
    else { msg("success", "Santri berhasil ditempatkan."); setAssignForm({ student_id: "", room_id: "", assigned_at: TODAY, note: "" }); await loadData(); setActiveTab("penempatan"); }
    setSubmitting(false);
  }

  // Occupancy map: room_id → count of active assignments
  const occupancyMap = assignments.reduce((map, a) => {
    if (!a.vacated_at) map[a.room_id] = (map[a.room_id] || 0) + 1;
    return map;
  }, {});

  const filteredRooms  = filterGender ? rooms.filter((r) => r.gender === filterGender) : rooms;
  const totalOccupied  = assignments.filter((a) => !a.vacated_at).length;
  const totalCapacity  = rooms.reduce((s, r) => s + Number(r.capacity || 0), 0);
  const fullRooms      = rooms.filter((r) => (occupancyMap[r.id] || 0) >= r.capacity).length;
  const occupancyRate  = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;

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
              🛏️ Modul Asrama
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3.5vw, 2rem)", margin: "0 0 0.3rem" }}>
              Manajemen Asrama & Kamar
            </h1>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.82)", fontSize: "0.9rem" }}>
              Kelola data kamar, penempatan santri, dan kapasitas hunian real-time.
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
          { icon: "🛏️", label: "Total Kamar",     value: loading ? "…" : rooms.length,        color: "#7a5b2f" },
          { icon: "🧑", label: "Kamar Putra",      value: loading ? "…" : rooms.filter((r) => r.gender === "L").length, color: "#245f82" },
          { icon: "👩", label: "Kamar Putri",      value: loading ? "…" : rooms.filter((r) => r.gender === "P").length, color: "#8f3e58" },
          { icon: "👥", label: "Total Penghuni",   value: loading ? "…" : totalOccupied,        color: "#1f6b43" },
          { icon: "📊", label: "Tingkat Hunian",   value: loading ? "…" : `${occupancyRate}%`,  color: occupancyRate > 90 ? "#b23a2f" : "#1f6b43" },
          { icon: "🚫", label: "Kamar Penuh",      value: loading ? "…" : fullRooms,            color: fullRooms > 0 ? "#a15d06" : "#187548" },
        ].map((kpi) => (
          <div key={kpi.label} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "0.85rem 1rem", boxShadow: "var(--card-shadow)" }}>
            <p style={{ margin: "0 0 0.25rem", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{kpi.icon} {kpi.label}</p>
            <p style={{ margin: 0, fontSize: "1.55rem", fontWeight: 800, color: kpi.color, lineHeight: 1 }}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Occupancy bar */}
      <div style={{ padding: "0.75rem 1.25rem 0" }}>
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "0.9rem 1rem", boxShadow: "var(--card-shadow)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.45rem" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 800 }}>🏠 Kapasitas Hunian Keseluruhan</span>
            <span style={{ fontSize: "0.88rem", fontWeight: 800, color: occupancyRate > 90 ? "var(--danger-fg)" : occupancyRate > 70 ? "var(--warn-fg)" : "var(--success-fg)" }}>{occupancyRate}%</span>
          </div>
          <div style={{ height: "8px", borderRadius: "999px", background: "var(--surface-muted)", overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: "999px", width: `${occupancyRate}%`, background: occupancyRate > 90 ? "var(--danger)" : occupancyRate > 70 ? "var(--warn)" : "var(--success)", transition: "width 600ms ease" }} />
          </div>
          <p style={{ margin: "0.35rem 0 0", fontSize: "0.75rem", color: "var(--text-muted)" }}>
            {totalOccupied} penghuni dari {totalCapacity} kapasitas total
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

      {/* ── TAB: DATA KAMAR ── */}
      {activeTab === "kamar" && (
        <div style={{ padding: "1rem 1.25rem 2rem" }}>
          {/* Gender filter + Add button */}
          <div style={{ display: "flex", gap: "0.6rem", marginBottom: "0.85rem", alignItems: "center", flexWrap: "wrap" }}>
            {["", "L", "P"].map((g) => (
              <button key={g} type="button" onClick={() => setFilterGender(g)} style={{
                padding: "0.4rem 0.85rem", borderRadius: "999px", border: "1px solid var(--line)",
                fontWeight: 700, fontSize: "0.82rem", cursor: "pointer",
                background: filterGender === g ? "var(--accent)" : "var(--surface)",
                color: filterGender === g ? "#fff" : "var(--text)",
              }}>
                {g === "" ? "Semua" : g === "L" ? "🧑 Putra" : "👩 Putri"}
              </button>
            ))}
            <button type="button" onClick={() => setActiveTab("tambah_kamar")} className="asf-button asf-button-primary" style={{ marginLeft: "auto" }}>
              + Tambah Kamar
            </button>
          </div>

          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", boxShadow: "var(--card-shadow)", overflow: "hidden" }}>
            <div style={{ padding: "0.85rem 1rem", borderBottom: "1px solid var(--line)" }}>
              <h3 style={{ margin: 0, fontSize: "0.92rem", fontWeight: 800 }}>🛏️ Daftar Kamar ({filteredRooms.length})</h3>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.87rem" }}>
                <thead>
                  <tr style={{ background: "var(--surface-muted)" }}>
                    {["Kode","Gedung / Asrama","Lantai","Kapasitas","Penghuni","Sisa","Gender","Status"].map((h) => (
                      <th key={h} style={{ padding: "0.6rem 0.85rem", textAlign: "left", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRooms.length === 0 ? (
                    <tr><td colSpan={8} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>Belum ada data kamar.</td></tr>
                  ) : filteredRooms.map((room) => {
                    const occ  = occupancyMap[room.id] || 0;
                    const sisa = Number(room.capacity) - occ;
                    const isFull = sisa <= 0;
                    return (
                      <tr key={room.id} style={{ borderTop: "1px solid var(--line)" }}>
                        <td style={{ padding: "0.55rem 0.85rem", fontWeight: 800, color: "var(--accent)" }}>{room.room_code}</td>
                        <td style={{ padding: "0.55rem 0.85rem" }}>{room.building}</td>
                        <td style={{ padding: "0.55rem 0.85rem", color: "var(--text-muted)" }}>Lt.{room.floor}</td>
                        <td style={{ padding: "0.55rem 0.85rem", fontWeight: 700, textAlign: "center" }}>{room.capacity}</td>
                        <td style={{ padding: "0.55rem 0.85rem", fontWeight: 700, textAlign: "center", color: occ > 0 ? "var(--accent)" : "var(--text-muted)" }}>{occ}</td>
                        <td style={{ padding: "0.55rem 0.85rem", fontWeight: 700, textAlign: "center", color: isFull ? "var(--danger-fg)" : "var(--success-fg)" }}>{sisa}</td>
                        <td style={{ padding: "0.55rem 0.85rem" }}>
                          <span style={{ display: "inline-flex", padding: "0.1rem 0.4rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700, background: room.gender === "L" ? "rgba(36,95,130,0.12)" : "rgba(143,62,88,0.12)", color: room.gender === "L" ? "#245f82" : "#8f3e58" }}>
                            {room.gender === "L" ? "🧑 Putra" : "👩 Putri"}
                          </span>
                        </td>
                        <td style={{ padding: "0.55rem 0.85rem" }}>
                          <span style={{ display: "inline-flex", padding: "0.1rem 0.4rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700,
                            background: isFull ? "var(--danger-bg)" : sisa <= 2 ? "var(--warn-bg)" : "var(--success-bg)",
                            color: isFull ? "var(--danger-fg)" : sisa <= 2 ? "var(--warn-fg)" : "var(--success-fg)",
                          }}>
                            {isFull ? "Penuh" : sisa <= 2 ? "Hampir Penuh" : "Tersedia"}
                          </span>
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

      {/* ── TAB: PENEMPATAN ── */}
      {activeTab === "penempatan" && (
        <div style={{ padding: "1rem 1.25rem 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.85rem" }}>
            {/* Form tempatkan */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.25rem", boxShadow: "var(--card-shadow)" }}>
              <h3 style={{ margin: "0 0 1rem", fontSize: "0.96rem", fontWeight: 800 }}>👤 Tempatkan Santri ke Kamar</h3>
              <form onSubmit={handleAssign} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem", alignItems: "end" }}>
                <div style={{ display: "grid", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Santri *</label>
                  <select value={assignForm.student_id} onChange={(e) => af("student_id", e.target.value)} required style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }}>
                    <option value="">Pilih santri...</option>
                    {students.map((s) => <option key={s.id} value={s.id}>{s.full_name} ({s.class_name})</option>)}
                  </select>
                </div>
                <div style={{ display: "grid", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Kamar *</label>
                  <select value={assignForm.room_id} onChange={(e) => af("room_id", e.target.value)} required style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }}>
                    <option value="">Pilih kamar...</option>
                    {rooms.map((r) => <option key={r.id} value={r.id}>{r.room_code} — {r.building} Lt.{r.floor} [{r.gender}] ({occupancyMap[r.id] || 0}/{r.capacity})</option>)}
                  </select>
                </div>
                <div style={{ display: "grid", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Tanggal Masuk</label>
                  <input type="date" value={assignForm.assigned_at} onChange={(e) => af("assigned_at", e.target.value)} style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
                </div>
                <div style={{ display: "grid", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Catatan</label>
                  <input value={assignForm.note} onChange={(e) => af("note", e.target.value)} placeholder="opsional" style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
                </div>
                <button type="submit" disabled={!apiOk || submitting} className="asf-button asf-button-primary">
                  {submitting ? "⟳ Menyimpan..." : "✓ Tempatkan"}
                </button>
              </form>
            </div>

            {/* Riwayat penempatan */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", boxShadow: "var(--card-shadow)", overflow: "hidden" }}>
              <div style={{ padding: "0.85rem 1rem", borderBottom: "1px solid var(--line)" }}>
                <h3 style={{ margin: 0, fontSize: "0.92rem", fontWeight: 800 }}>📋 Riwayat Penempatan ({assignments.length})</h3>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.87rem" }}>
                  <thead>
                    <tr style={{ background: "var(--surface-muted)" }}>
                      {["Santri","Kamar","Gedung","Tgl Masuk","Tgl Keluar","Status"].map((h) => (
                        <th key={h} style={{ padding: "0.6rem 0.85rem", textAlign: "left", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {assignments.length === 0 ? (
                      <tr><td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>Belum ada data penempatan.</td></tr>
                    ) : assignments.map((a) => {
                      const room = rooms.find((r) => Number(r.id) === Number(a.room_id));
                      return (
                        <tr key={a.id} style={{ borderTop: "1px solid var(--line)" }}>
                          <td style={{ padding: "0.55rem 0.85rem", fontWeight: 600 }}>{studentName(a.student_id)}</td>
                          <td style={{ padding: "0.55rem 0.85rem", fontWeight: 800, color: "var(--accent)" }}>{room?.room_code || `ID ${a.room_id}`}</td>
                          <td style={{ padding: "0.55rem 0.85rem", color: "var(--text-muted)", fontSize: "0.82rem" }}>{room?.building || "—"}</td>
                          <td style={{ padding: "0.55rem 0.85rem", color: "var(--text-muted)", fontSize: "0.82rem" }}>{String(a.assigned_at).slice(0, 10)}</td>
                          <td style={{ padding: "0.55rem 0.85rem", color: "var(--text-muted)", fontSize: "0.82rem" }}>{a.vacated_at ? String(a.vacated_at).slice(0, 10) : "—"}</td>
                          <td style={{ padding: "0.55rem 0.85rem" }}>
                            <span style={{ display: "inline-flex", padding: "0.1rem 0.4rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700,
                              background: !a.vacated_at ? "var(--success-bg)" : "var(--surface-muted)",
                              color: !a.vacated_at ? "var(--success-fg)" : "var(--text-muted)",
                            }}>
                              {!a.vacated_at ? "✓ Aktif" : "Pindah"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: TAMBAH KAMAR ── */}
      {activeTab === "tambah_kamar" && (
        <div style={{ padding: "1rem 1.25rem 2rem", maxWidth: "540px" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.25rem", boxShadow: "var(--card-shadow)" }}>
            <h3 style={{ margin: "0 0 1rem", fontSize: "1rem", fontWeight: 800 }}>➕ Tambah Kamar Baru</h3>
            <form onSubmit={handleAddRoom} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div style={{ display: "grid", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Kode Kamar *</label>
                  <input value={roomForm.room_code} onChange={(e) => rf("room_code", e.target.value)} placeholder="mis. A-101" required style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
                </div>
                <div style={{ display: "grid", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Gender</label>
                  <select value={roomForm.gender} onChange={(e) => rf("gender", e.target.value)} style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }}>
                    <option value="L">🧑 Putra (L)</option>
                    <option value="P">👩 Putri (P)</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Gedung / Asrama *</label>
                <input value={roomForm.building} onChange={(e) => rf("building", e.target.value)} placeholder="mis. Gedung Imam Syafi'i" required style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div style={{ display: "grid", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Lantai</label>
                  <input type="number" min="1" value={roomForm.floor} onChange={(e) => rf("floor", e.target.value)} style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
                </div>
                <div style={{ display: "grid", gap: "0.25rem" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)" }}>Kapasitas</label>
                  <input type="number" min="1" value={roomForm.capacity} onChange={(e) => rf("capacity", e.target.value)} style={{ padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", fontSize: "0.9rem" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.25rem" }}>
                <button type="button" onClick={() => setActiveTab("kamar")} className="asf-button asf-button-secondary">← Batal</button>
                <button type="submit" disabled={!apiOk || submitting} className="asf-button asf-button-primary" style={{ flex: 1, justifyContent: "center" }}>
                  {submitting ? "⟳ Menyimpan..." : "✓ Tambah Kamar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";

const EVENTS = [
  { id: 1, title: "Ujian Akhir Semester Genap", date: "2025-06-02", endDate: "2025-06-14", type: "Akademik", status: "Mendatang", desc: "Ujian akhir semester untuk seluruh santri kelas 7-12.", wajib: true },
  { id: 2, title: "Libur Idul Adha 1446H", date: "2025-06-07", endDate: "2025-06-09", type: "Libur", status: "Mendatang", desc: "Santri diperbolehkan pulang mulai 6 Juni sore dan kembali 10 Juni pagi.", wajib: false },
  { id: 3, title: "Penyembelihan Hewan Qurban", date: "2025-06-08", endDate: "2025-06-08", type: "Ibadah", status: "Mendatang", desc: "Kegiatan penyembelihan dan pembagian daging qurban bagi santri yang hadir.", wajib: false },
  { id: 4, title: "Haflah Akhirussanah 2025", date: "2025-06-21", endDate: "2025-06-21", type: "Kegiatan", status: "Mendatang", desc: "Acara wisuda santri kelas 9 dan 12 sekaligus pertunjukan seni akhir tahun.", wajib: true },
  { id: 5, title: "Libur Kenaikan Kelas", date: "2025-06-22", endDate: "2025-07-13", type: "Libur", status: "Mendatang", desc: "Libur panjang akhir tahun ajaran 2024/2025.", wajib: false },
  { id: 6, title: "Penerimaan Santri Baru 2025/2026", date: "2025-07-14", endDate: "2025-07-19", type: "PPDB", status: "Mendatang", desc: "Masa orientasi dan penerimaan resmi santri baru angkatan 2025/2026.", wajib: true },
  { id: 7, title: "Tahun Ajaran Baru 2025/2026 Dimulai", date: "2025-07-21", endDate: "2025-07-21", type: "Akademik", status: "Mendatang", desc: "Pembukaan resmi tahun ajaran baru dan awal kegiatan belajar mengajar.", wajib: true },
  { id: 8, title: "Kegiatan Pondok Ramadhan 1446H", date: "2025-03-01", endDate: "2025-03-29", type: "Ibadah", status: "Selesai", desc: "Kegiatan intensif Ramadhan: qiyamul lail, tadarus, dan kajian kitab.", wajib: true },
  { id: 9, title: "Haflah Wisuda Angkatan 12", date: "2025-02-20", endDate: "2025-02-20", type: "Kegiatan", status: "Selesai", desc: "Wisuda 87 santri angkatan ke-12 dengan penampilan seni & qiro'ah.", wajib: false },
  { id: 10, title: "Porsadin Tingkat Kabupaten", date: "2024-11-15", endDate: "2024-11-17", type: "Lomba", status: "Selesai", desc: "Partisipasi di Pekan Olahraga dan Seni Antar Diniyah tingkat kabupaten.", wajib: false },
];

const TYPE_COLOR = {
  Akademik: "#1f6b43", Libur: "#245f82", Ibadah: "#4c4383",
  Kegiatan: "#7a5b2f", PPDB: "#2e5b67", Lomba: "#8f3e58",
};

const TYPES = ["Semua", "Akademik", "Libur", "Ibadah", "Kegiatan", "PPDB", "Lomba"];

export default function KegiatanPage() {
  const [filter, setFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("Semua");

  const filtered = EVENTS.filter((e) => {
    const matchType = filter === "Semua" || e.type === filter;
    const matchStatus = statusFilter === "Semua" || e.status === statusFilter;
    return matchType && matchStatus;
  });

  return (
    <div>
      {/* Filters */}
      <div style={{ padding: "1rem 1.25rem 0", display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {TYPES.map((t) => (
            <button key={t} type="button" onClick={() => setFilter(t)} style={{
              padding: "0.35rem 0.7rem", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 700,
              border: "1px solid", cursor: "pointer",
              background: filter === t ? "var(--accent)" : "var(--surface)",
              color: filter === t ? "#fff" : "var(--text)",
              borderColor: filter === t ? "var(--accent)" : "var(--line)",
            }}>{t}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {["Semua", "Mendatang", "Selesai"].map((s) => (
            <button key={s} type="button" onClick={() => setStatusFilter(s)} style={{
              padding: "0.35rem 0.7rem", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 700,
              border: "1px solid", cursor: "pointer",
              background: statusFilter === s ? "var(--surface-muted)" : "var(--surface)",
              color: statusFilter === s ? "var(--text)" : "var(--text-muted)",
              borderColor: statusFilter === s ? "var(--text-muted)" : "var(--line)",
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Events list */}
      <section style={{ padding: "0.75rem 1.25rem 2rem", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
        {filtered.length === 0 ? (
          <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "2rem" }}>Tidak ada kegiatan ditemukan.</p>
        ) : filtered.map((ev) => {
          const color = TYPE_COLOR[ev.type] || "#1f6b43";
          const isMultiDay = ev.date !== ev.endDate;
          return (
            <div key={ev.id} style={{
              background: "var(--surface)", border: "1px solid var(--line)",
              borderRadius: "var(--radius-md)", padding: "1rem 1.2rem",
              boxShadow: "var(--card-shadow)",
              display: "flex", gap: "1rem", alignItems: "flex-start",
              borderLeft: ev.status === "Mendatang" ? `3px solid ${color}` : "3px solid var(--line)",
              opacity: ev.status === "Selesai" ? 0.8 : 1,
            }}>
              {/* Date block */}
              <div style={{
                flexShrink: 0, width: "3rem", textAlign: "center",
                background: ev.status === "Mendatang" ? `${color}18` : "var(--surface-muted)",
                borderRadius: "0.6rem", padding: "0.4rem",
              }}>
                <div style={{ fontSize: "0.65rem", fontWeight: 800, color: color, textTransform: "uppercase" }}>
                  {new Date(ev.date).toLocaleDateString("id-ID", { month: "short" })}
                </div>
                <div style={{ fontSize: "1.3rem", fontWeight: 800, lineHeight: 1.1, color: "var(--text)" }}>
                  {new Date(ev.date).getDate()}
                </div>
              </div>
              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.3rem", flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{
                    display: "inline-flex", padding: "0.12rem 0.45rem", borderRadius: "999px",
                    fontSize: "0.68rem", fontWeight: 700,
                    background: `${color}18`, color: color, border: `1px solid ${color}38`,
                  }}>{ev.type}</span>
                  {ev.wajib && (
                    <span style={{
                      display: "inline-flex", padding: "0.12rem 0.45rem", borderRadius: "999px",
                      fontSize: "0.68rem", fontWeight: 700,
                      background: "var(--warn-bg)", color: "var(--warn-fg)", border: "1px solid var(--warn)",
                    }}>⚠ Wajib Hadir</span>
                  )}
                  {ev.status === "Selesai" && (
                    <span style={{
                      display: "inline-flex", padding: "0.12rem 0.45rem", borderRadius: "999px",
                      fontSize: "0.68rem", fontWeight: 700,
                      background: "var(--surface-muted)", color: "var(--text-muted)", border: "1px solid var(--line)",
                    }}>Selesai</span>
                  )}
                </div>
                <h3 style={{ margin: "0 0 0.2rem", fontSize: "0.93rem", fontWeight: 800 }}>{ev.title}</h3>
                <p style={{ margin: "0 0 0.3rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  {isMultiDay ? `${ev.date} – ${ev.endDate}` : ev.date}
                </p>
                <p style={{ margin: 0, fontSize: "0.84rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{ev.desc}</p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

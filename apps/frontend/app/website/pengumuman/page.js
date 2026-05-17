"use client";
import { useState } from "react";

const ALL_ANNOUNCEMENTS = [
  { id: 1, title: "Pembukaan PPDB Tahun Ajaran 2025/2026", date: "2025-05-01", category: "PPDB", status: "Aktif", author: "Admin PPDB", content: "Pondok Pesantren Asy-Syifaa membuka pendaftaran santri baru untuk tahun ajaran 2025/2026. Kuota terbatas untuk 120 santri putra dan 80 santri putri. Pendaftaran dibuka mulai 1 Mei hingga 30 Juni 2025." },
  { id: 2, title: "Jadwal Ujian Akhir Semester Genap 2024/2025", date: "2025-04-28", category: "Akademik", status: "Aktif", author: "Ka. Akademik", content: "Ujian Akhir Semester Genap akan dilaksanakan pada 2-14 Juni 2025. Santri diwajibkan hadir 15 menit sebelum ujian dimulai. Izin sakit hanya diberikan dengan surat keterangan dokter." },
  { id: 3, title: "Pembayaran SPP Bulan Mei 2025", date: "2025-04-25", category: "Keuangan", status: "Aktif", author: "Bendahara", content: "Harap segera melakukan pembayaran SPP bulan Mei 2025 paling lambat tanggal 10 Mei 2025. Keterlambatan akan dikenakan administrasi sesuai kebijakan pesantren." },
  { id: 4, title: "Kegiatan Pondok Ramadhan 1446H", date: "2025-03-15", category: "Kegiatan", status: "Selesai", author: "Panitia Ramadhan", content: "Kegiatan Pondok Ramadhan 1446H telah berlangsung sukses dengan berbagai program: tadarus, i'tikaf, buka bersama wali santri, dan zakat fitrah bersama. Terima kasih atas partisipasi semua pihak." },
  { id: 5, title: "Wisuda Santri Angkatan ke-12", date: "2025-02-20", category: "Kegiatan", status: "Selesai", author: "Panitia Wisuda", content: "Haflah Akhirussanah & Wisuda Santri Angkatan ke-12 telah berlangsung khidmat. Selamat kepada 87 wisudawan/wisudawati. Semoga ilmu yang didapat bermanfaat dunia akhirat." },
  { id: 6, title: "Libur Semester Ganjil 2024", date: "2024-12-20", category: "Akademik", status: "Selesai", author: "Admin", content: "Libur semester ganjil berlangsung 21 Desember 2024 – 5 Januari 2025. Santri diperbolehkan pulang setelah proses pengambilan rapor. Masuk kembali 6 Januari 2025." },
];

const CATEGORIES = ["Semua", "PPDB", "Akademik", "Keuangan", "Kegiatan"];

export default function PengumumanPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [selected, setSelected] = useState(null);

  const filtered = ALL_ANNOUNCEMENTS.filter((a) => {
    const matchCat = category === "Semua" || a.category === category;
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.content.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* Search & Filter */}
      <div style={{ padding: "1rem 1.25rem 0", display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="search" placeholder="Cari pengumuman..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          style={{ flex: "1 1 200px", minWidth: "180px", padding: "0.55rem 0.8rem", borderRadius: "0.65rem", border: "1px solid var(--line)", background: "var(--surface)", color: "var(--text)", font: "inherit", fontSize: "0.9rem" }}
        />
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <button key={cat} type="button" onClick={() => setCategory(cat)} style={{
              padding: "0.4rem 0.8rem", borderRadius: "999px", fontSize: "0.82rem", fontWeight: 700,
              border: "1px solid", cursor: "pointer",
              background: category === cat ? "var(--accent)" : "var(--surface)",
              color: category === cat ? "#fff" : "var(--text)",
              borderColor: category === cat ? "var(--accent)" : "var(--line)",
            }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Announcement list */}
      <section style={{ padding: "0.75rem 1.25rem 2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filtered.length === 0 ? (
          <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "2rem" }}>Tidak ada pengumuman ditemukan.</p>
        ) : filtered.map((ann) => (
          <div key={ann.id} style={{
            background: "var(--surface)", border: "1px solid var(--line)",
            borderRadius: "var(--radius-md)", padding: "1rem 1.2rem",
            boxShadow: "var(--card-shadow)", cursor: "pointer",
            borderLeft: ann.status === "Aktif" ? "3px solid var(--accent)" : "3px solid var(--line)",
          }} onClick={() => setSelected(selected?.id === ann.id ? null : ann)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.75rem", flexWrap: "wrap" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.3rem", flexWrap: "wrap" }}>
                  <span style={{
                    display: "inline-flex", padding: "0.12rem 0.45rem", borderRadius: "999px",
                    fontSize: "0.7rem", fontWeight: 700,
                    background: "var(--accent-soft)", color: "var(--accent-ink)",
                    border: "1px solid rgba(31,107,67,0.2)",
                  }}>{ann.category}</span>
                  <span style={{
                    display: "inline-flex", padding: "0.12rem 0.45rem", borderRadius: "999px",
                    fontSize: "0.7rem", fontWeight: 700,
                    background: ann.status === "Aktif" ? "var(--success-bg)" : "var(--surface-muted)",
                    color: ann.status === "Aktif" ? "var(--success-fg)" : "var(--text-muted)",
                    border: "1px solid var(--line)",
                  }}>{ann.status}</span>
                </div>
                <h3 style={{ margin: "0 0 0.2rem", fontSize: "0.95rem", fontWeight: 800 }}>{ann.title}</h3>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  {ann.date} · Oleh: {ann.author}
                </p>
              </div>
              <span style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>
                {selected?.id === ann.id ? "▲ Tutup" : "▼ Baca"}
              </span>
            </div>
            {selected?.id === ann.id && (
              <div style={{
                marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--line)",
                fontSize: "0.9rem", lineHeight: 1.7, color: "var(--text)",
              }}>
                {ann.content}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

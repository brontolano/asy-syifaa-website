"use client";
import { useState } from "react";

const ALBUMS = [
  {
    id: 1, title: "Haflah Akhirussanah 2025", date: "2025-02-20", category: "Kegiatan",
    cover: "🎓", count: 45, desc: "Wisuda santri angkatan ke-12 dengan penampilan seni dan pembacaan Al-Qur'an.",
  },
  {
    id: 2, title: "Pondok Ramadhan 1446H", date: "2025-03-20", category: "Ibadah",
    cover: "🌙", count: 72, desc: "Kegiatan intensif Ramadhan: tadarus malam, sahur bersama, dan buka puasa berjama'ah.",
  },
  {
    id: 3, title: "Porsadin Tingkat Kabupaten 2024", date: "2024-11-15", category: "Prestasi",
    cover: "🏆", count: 38, desc: "Delegasi santri Asy-Syifaa meraih juara di berbagai cabang lomba Porsadin.",
  },
  {
    id: 4, title: "Kegiatan Pramuka & Kemah", date: "2024-10-20", category: "Ekstrakurikuler",
    cover: "⛺", count: 56, desc: "Perkemahan pramuka penggalang di Bumi Perkemahan Cibubur.",
  },
  {
    id: 5, title: "Kunjungan Wali Santri 2024", date: "2024-09-08", category: "Kegiatan",
    cover: "👨‍👩‍👧", count: 30, desc: "Silaturahmi dan pertemuan rutin wali santri dengan pimpinan pesantren.",
  },
  {
    id: 6, title: "MTQ Tingkat Kabupaten 2024", date: "2024-08-18", category: "Prestasi",
    cover: "📖", count: 24, desc: "Santri Asy-Syifaa meraih Juara I cabang tilawah dan tahfidz.",
  },
  {
    id: 7, title: "Orientation Day Santri Baru 2024", date: "2024-07-15", category: "Kegiatan",
    cover: "🌟", count: 64, desc: "Masa orientasi santri baru angkatan 2024/2025.",
  },
  {
    id: 8, title: "Kegiatan Seni & Budaya", date: "2024-06-10", category: "Seni",
    cover: "🎨", count: 42, desc: "Pertunjukan seni rebana, kaligrafi, dan qiro'ah dalam rangka milad pesantren.",
  },
];

const CATEGORIES = ["Semua", "Kegiatan", "Ibadah", "Prestasi", "Ekstrakurikuler", "Seni"];

const COLOR_MAP = {
  Kegiatan: "#1f6b43", Ibadah: "#245f82", Prestasi: "#7a5b2f",
  Ekstrakurikuler: "#4c4383", Seni: "#8f3e58",
};

export default function GaleriPage() {
  const [category, setCategory] = useState("Semua");

  const filtered = category === "Semua" ? ALBUMS : ALBUMS.filter((a) => a.category === category);

  return (
    <div>
      {/* Filter */}
      <div style={{ padding: "1rem 1.25rem 0", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
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

      {/* Album Grid */}
      <section style={{ padding: "0.75rem 1.25rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "0.85rem" }}>
          {filtered.map((album) => {
            const color = COLOR_MAP[album.category] || "#1f6b43";
            return (
              <div key={album.id} style={{
                background: "var(--surface)", border: "1px solid var(--line)",
                borderRadius: "var(--radius-md)", overflow: "hidden",
                boxShadow: "var(--card-shadow)",
                transition: "transform 180ms ease",
                cursor: "pointer",
              }}>
                {/* Cover placeholder */}
                <div style={{
                  height: "140px", display: "flex", alignItems: "center", justifyContent: "center",
                  background: `linear-gradient(135deg, ${color}22, ${color}44)`,
                  fontSize: "3.5rem",
                }}>
                  {album.cover}
                </div>
                <div style={{ padding: "0.9rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.35rem" }}>
                    <span style={{
                      display: "inline-flex", padding: "0.12rem 0.45rem", borderRadius: "999px",
                      fontSize: "0.7rem", fontWeight: 700,
                      background: `${color}18`, color: color,
                      border: `1px solid ${color}38`,
                    }}>{album.category}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", flexShrink: 0 }}>{album.count} foto</span>
                  </div>
                  <h3 style={{ margin: "0 0 0.25rem", fontSize: "0.92rem", fontWeight: 800, lineHeight: 1.3 }}>{album.title}</h3>
                  <p style={{ margin: "0 0 0.4rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>{album.date}</p>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{album.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

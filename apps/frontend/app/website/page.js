"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchApi } from "../../lib/api-client";

const SUB_MODULES = [
  {
    href: "/website/profil",
    icon: "🏛️",
    label: "Profil Pesantren",
    desc: "Visi, misi, sejarah, struktur organisasi, dan program unggulan pesantren.",
    color: "#1f6b43",
  },
  {
    href: "/website/pengumuman",
    icon: "📢",
    label: "Pengumuman",
    desc: "Informasi resmi, pengumuman PPDB, berita kegiatan, dan pemberitahuan penting.",
    color: "#245f82",
  },
  {
    href: "/website/galeri",
    icon: "🖼️",
    label: "Galeri Foto & Video",
    desc: "Dokumentasi kegiatan pesantren, foto santri, dan momen memorable.",
    color: "#7a5b2f",
  },
  {
    href: "/website/kegiatan",
    icon: "📅",
    label: "Kalender Kegiatan",
    desc: "Agenda pesantren, jadwal ujian, kegiatan ekstrakurikuler, dan event tahunan.",
    color: "#4c4383",
  },
];

const RECENT_ANNOUNCEMENTS = [
  { id: 1, title: "Pembukaan PPDB Tahun Ajaran 2025/2026", date: "2025-05-01", category: "PPDB", status: "Aktif" },
  { id: 2, title: "Jadwal Ujian Akhir Semester Genap", date: "2025-04-28", category: "Akademik", status: "Aktif" },
  { id: 3, title: "Kegiatan Pondok Ramadhan 1446H", date: "2025-03-15", category: "Kegiatan", status: "Selesai" },
  { id: 4, title: "Wisuda Santri Angkatan ke-12", date: "2025-02-20", category: "Kegiatan", status: "Selesai" },
];

const UPCOMING_EVENTS = [
  { title: "Ujian Akhir Semester", date: "2025-06-02", type: "Akademik" },
  { title: "Libur Idul Adha", date: "2025-06-07", type: "Libur" },
  { title: "Haflah Akhirussanah", date: "2025-06-21", type: "Kegiatan" },
  { title: "Penerimaan Santri Baru", date: "2025-07-14", type: "PPDB" },
];

export default function WebsitePage() {
  const [stats, setStats] = useState({ students: 0, staff: 0 });

  useEffect(() => {
    async function load() {
      try {
        const [students, staff] = await Promise.all([
          fetchApi("/api/students"),
          fetchApi("/api/staff"),
        ]);
        setStats({
          students: Array.isArray(students.data) ? students.data.length : 0,
          staff: Array.isArray(staff.data) ? staff.data.length : 0,
        });
      } catch {}
    }
    load();
  }, []);

  return (
    <div>
      {/* Live stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.8rem", padding: "1rem 1.25rem 0" }}>
        {[
          { label: "Total Santri", value: stats.students, icon: "🧑‍🎓", color: "#1f6b43" },
          { label: "Total Staff", value: stats.staff, icon: "👥", color: "#245f82" },
          { label: "Sub-Modul Website", value: SUB_MODULES.length, icon: "📄", color: "#7a5b2f" },
          { label: "Pengumuman Aktif", value: RECENT_ANNOUNCEMENTS.filter(a => a.status === "Aktif").length, icon: "📢", color: "#4c4383" },
        ].map((s) => (
          <div key={s.label} style={{
            background: "var(--surface)", border: "1px solid var(--line)",
            borderRadius: "var(--radius-md)", padding: "0.9rem 1rem",
            boxShadow: "var(--card-shadow)",
          }}>
            <p style={{ margin: "0 0 0.3rem", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {s.icon} {s.label}
            </p>
            <p style={{ margin: 0, fontSize: "1.8rem", fontWeight: 800, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Sub-module cards */}
      <section style={{ padding: "1rem 1.25rem 0" }}>
        <h2 style={{ fontSize: "0.78rem", fontWeight: 800, margin: "0 0 0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Kelola Konten
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "0.85rem" }}>
          {SUB_MODULES.map((mod) => (
            <Link key={mod.href} href={mod.href} style={{
              display: "flex", flexDirection: "column", gap: "0.6rem",
              background: "var(--surface)", border: "1px solid var(--line)",
              borderRadius: "var(--radius-md)", padding: "1.1rem",
              textDecoration: "none", color: "var(--text)",
              boxShadow: "var(--card-shadow)",
              transition: "transform 180ms ease, border-color 180ms ease",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{
                  width: "2.6rem", height: "2.6rem", borderRadius: "0.7rem",
                  background: `${mod.color}18`, border: `1px solid ${mod.color}38`,
                  display: "grid", placeItems: "center", fontSize: "1.2rem", flexShrink: 0,
                }}>{mod.icon}</span>
                <strong style={{ fontSize: "0.95rem" }}>{mod.label}</strong>
              </div>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{mod.desc}</p>
              <span style={{ fontSize: "0.78rem", color: mod.color, fontWeight: 700 }}>Buka →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent announcements & upcoming events */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "0.85rem", padding: "1rem 1.25rem" }}>
        {/* Announcements */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
            <h3 style={{ margin: 0, fontSize: "0.96rem", fontWeight: 800 }}>📢 Pengumuman Terbaru</h3>
            <Link href="/website/pengumuman" style={{ fontSize: "0.8rem", color: "var(--link)", textDecoration: "none", fontWeight: 700 }}>Lihat semua →</Link>
          </div>
          {RECENT_ANNOUNCEMENTS.map((ann) => (
            <div key={ann.id} style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem",
              padding: "0.6rem 0", borderBottom: "1px solid var(--line)",
            }}>
              <div>
                <p style={{ margin: "0 0 0.15rem", fontSize: "0.88rem", fontWeight: 600 }}>{ann.title}</p>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{ann.date} · {ann.category}</span>
              </div>
              <span style={{
                display: "inline-flex", alignItems: "center", padding: "0.15rem 0.45rem",
                borderRadius: "999px", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0,
                background: ann.status === "Aktif" ? "var(--success-bg)" : "var(--surface-muted)",
                color: ann.status === "Aktif" ? "var(--success-fg)" : "var(--text-muted)",
                border: `1px solid ${ann.status === "Aktif" ? "rgba(24,117,72,0.25)" : "var(--line)"}`,
              }}>{ann.status}</span>
            </div>
          ))}
        </div>

        {/* Upcoming events */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
            <h3 style={{ margin: 0, fontSize: "0.96rem", fontWeight: 800 }}>📅 Agenda Mendatang</h3>
            <Link href="/website/kegiatan" style={{ fontSize: "0.8rem", color: "var(--link)", textDecoration: "none", fontWeight: 700 }}>Lihat semua →</Link>
          </div>
          {UPCOMING_EVENTS.map((ev) => (
            <div key={ev.title} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem",
              padding: "0.6rem 0", borderBottom: "1px solid var(--line)",
            }}>
              <div>
                <p style={{ margin: "0 0 0.1rem", fontSize: "0.88rem", fontWeight: 600 }}>{ev.title}</p>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{ev.date}</span>
              </div>
              <span style={{
                display: "inline-flex", alignItems: "center", padding: "0.15rem 0.45rem",
                borderRadius: "999px", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0,
                background: "var(--accent-soft)", color: "var(--accent-ink)",
                border: "1px solid rgba(31,107,67,0.2)",
              }}>{ev.type}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Integration banner */}
      <section style={{ padding: "0 1.25rem 2rem" }}>
        <div style={{
          background: "var(--accent-soft)", border: "1px solid rgba(31,107,67,0.2)",
          borderRadius: "var(--radius-md)", padding: "1rem 1.2rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "0.75rem",
        }}>
          <div>
            <p style={{ margin: "0 0 0.1rem", fontWeight: 800, color: "var(--accent-ink)", fontSize: "0.95rem" }}>
              🔗 Integrasi dengan Modul ERP Lain
            </p>
            <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--accent-ink)", opacity: 0.8 }}>
              Data santri, keuangan, dan tahfidz tersinkronisasi otomatis ke website publik.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <Link href="/ppdb" className="asf-button asf-button-primary" style={{ fontSize: "0.82rem", padding: "0.4rem 0.8rem" }}>PPDB</Link>
            <Link href="/dashboard" className="asf-button asf-button-secondary" style={{ fontSize: "0.82rem", padding: "0.4rem 0.8rem" }}>ERP Dashboard</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

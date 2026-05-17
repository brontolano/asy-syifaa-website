"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HEADER_TABS = [
  { href: "/website", label: "Beranda" },
  { href: "/website/profil", label: "Profil" },
  { href: "/website/pengumuman", label: "Pengumuman" },
  { href: "/website/galeri", label: "Galeri" },
  { href: "/website/kegiatan", label: "Kegiatan" },
];

function resolveTitle(pathname) {
  if (pathname === "/website/profil") return "Profil Pesantren";
  if (pathname === "/website/pengumuman") return "Pengumuman & Berita";
  if (pathname === "/website/galeri") return "Galeri Foto & Video";
  if (pathname === "/website/kegiatan") return "Kalender Kegiatan";
  return "Manajemen Konten Website";
}

function resolveSubtitle(pathname) {
  if (pathname === "/website/profil") return "Visi, misi, sejarah, struktur, dan profil lembaga.";
  if (pathname === "/website/pengumuman") return "Informasi resmi, agenda, dan kabar terbaru pesantren.";
  if (pathname === "/website/galeri") return "Dokumentasi visual kegiatan, prestasi, dan momen santri.";
  if (pathname === "/website/kegiatan") return "Agenda kegiatan akademik, ibadah, dan event pesantren.";
  return "Kelola semua konten website publik pesantren dari satu modul.";
}

export default function WebsiteModuleHeader() {
  const pathname = usePathname();
  const title = resolveTitle(pathname);
  const subtitle = resolveSubtitle(pathname);

  return (
    <section
      style={{
        background: "linear-gradient(140deg, #0f3d25 0%, #1f6b43 60%, #2a8a57 100%)",
        color: "#fff",
        padding: "1.35rem 1.25rem 1.1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 80% 30%, rgba(255,255,255,0.08), transparent 55%)",
          pointerEvents: "none",
        }}
      />
      <p
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "999px",
          padding: "0.24rem 0.62rem",
          fontSize: "0.76rem",
          fontWeight: 700,
          marginBottom: "0.65rem",
          color: "#d6f5e3",
        }}
      >
        📰 Modul Website
      </p>
      <h1
        style={{
          position: "relative",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.2rem, 2.8vw, 1.8rem)",
          margin: "0 0 0.35rem",
          fontWeight: 700,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          position: "relative",
          margin: "0 0 0.85rem",
          color: "rgba(255,255,255,0.84)",
          fontSize: "0.9rem",
          maxWidth: "70ch",
        }}
      >
        {subtitle}
      </p>
      <nav
        aria-label="Menu modul website"
        style={{ position: "relative", display: "flex", gap: "0.45rem", flexWrap: "wrap" }}
      >
        {HEADER_TABS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
                borderRadius: "999px",
                padding: "0.28rem 0.64rem",
                fontSize: "0.78rem",
                fontWeight: 700,
                border: "1px solid rgba(255,255,255,0.35)",
                color: isActive ? "#143d2a" : "#effff6",
                background: isActive ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.08)",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </section>
  );
}

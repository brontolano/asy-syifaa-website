"use client";

import Link from "next/link";

const MODULES = [
  { href: "/ppdb",      icon: "📋", label: "PPDB / SPMB",    desc: "Pendaftaran santri baru",        color: "#1f6b43" },
  { href: "/tahfidz",   icon: "📖", label: "Tahfidz",         desc: "Ziyadah & murojaah tracker",    color: "#245f82" },
  { href: "/keuangan",  icon: "💰", label: "Keuangan",        desc: "Billing & cashflow pesantren",  color: "#7a5b2f" },
  { href: "/asrama",    icon: "🛏️", label: "Asrama",          desc: "Manajemen kamar & penempatan",  color: "#4c4383" },
  { href: "/izin",      icon: "📝", label: "Perizinan",       desc: "Izin santri berbasis approval",  color: "#8f3e58" },
  { href: "/hr",        icon: "👥", label: "SDM / HR",        desc: "Kepegawaian & penggajian",       color: "#2e5b67" },
  { href: "/wali",      icon: "👨‍👩‍👧", label: "Portal Wali",   desc: "Akses data santri bagi wali",   color: "#1f577a" },
  { href: "/dashboard", icon: "📊", label: "ERP Dashboard",   desc: "Command center lintas modul",   color: "#185637" },
];

const FEATURES = [
  { icon: "🎓", title: "Akademik Terintegrasi",   desc: "Kelola kurikulum, absensi, nilai, dan tahfidz dalam satu platform." },
  { icon: "🏠", title: "Asrama Terdigitalisasi",  desc: "Penempatan santri, kapasitas kamar, dan riwayat hunian real-time." },
  { icon: "💳", title: "Keuangan Transparan",     desc: "Tagihan, pembayaran, laporan cashflow, dan notifikasi otomatis." },
  { icon: "📱", title: "Portal Wali Santri",      desc: "Orang tua dapat memantau perkembangan anak kapan saja, di mana saja." },
  { icon: "🔐", title: "RBAC Multi-Role",         desc: "Mudir Aam, Ustadz, Bendahara, Staff, dan Wali — hak akses terpisah." },
  { icon: "📈", title: "Analytics & Laporan",     desc: "KPI lintas modul, tren keuangan, dan progres hafalan dalam satu dashboard." },
];

export default function HomePage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(140deg, #0f3d25 0%, #1f6b43 60%, #2a8a57 100%)",
        color: "#fff",
        padding: "clamp(2.5rem, 6vw, 4.5rem) clamp(1rem, 4vw, 2.5rem)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08), transparent 55%)",
        }} />
        <p style={{
          display: "inline-flex", alignItems: "center", gap: "0.4rem",
          background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "999px", padding: "0.28rem 0.72rem", fontSize: "0.82rem",
          fontWeight: 700, marginBottom: "1rem", color: "#d6f5e3",
        }}>
          🕌 Pesantren Asy-Syifaa
        </p>
        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 700, lineHeight: 1.2, margin: "0 0 1rem",
          maxWidth: "780px", marginInline: "auto",
        }}>
          Sistem ERP Pesantren<br />All-in-One Terintegrasi
        </h1>
        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "rgba(255,255,255,0.82)",
          maxWidth: "600px", marginInline: "auto", marginBottom: "2rem", lineHeight: 1.65,
        }}>
          Kelola akademik, tahfidz, asrama, keuangan, dan SDM pesantren dalam satu platform
          modern — efisien, transparan, dan berbasis data.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/ppdb" style={{
            background: "#fff", color: "#0f3d25", padding: "0.7rem 1.5rem",
            borderRadius: "0.7rem", fontWeight: 800, textDecoration: "none",
            fontSize: "1rem", boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
          }}>
            📋 Daftar Sekarang (PPDB)
          </Link>
          <Link href="/dashboard" style={{
            background: "rgba(255,255,255,0.18)", color: "#fff",
            border: "1px solid rgba(255,255,255,0.35)", padding: "0.7rem 1.5rem",
            borderRadius: "0.7rem", fontWeight: 700, textDecoration: "none", fontSize: "1rem",
          }}>
            📊 Masuk ERP
          </Link>
        </div>

        {/* Quick stats */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap",
          marginTop: "2.5rem", borderTop: "1px solid rgba(255,255,255,0.18)", paddingTop: "1.8rem",
        }}>
          {[
            { val: "8", label: "Modul ERP" },
            { val: "Multi-Peran", label: "Hak Akses" },
            { val: "Real-time", label: "Data & Laporan" },
            { val: "v2.0", label: "Versi Sistem" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 800 }}>{s.val}</div>
              <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", marginTop: "0.2rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MODULE GRID ── */}
      <section style={{ padding: "2.5rem clamp(1rem, 3vw, 2rem)" }}>
        <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
          <p style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: "var(--accent-soft)", color: "var(--accent-ink)",
            borderRadius: "999px", padding: "0.28rem 0.72rem", fontSize: "0.82rem", fontWeight: 700,
            marginBottom: "0.6rem",
          }}>Modul Tersedia</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2rem)", margin: "0" }}>
            Semua Kebutuhan Pesantren dalam Satu Sistem
          </h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
          maxWidth: "1100px",
          marginInline: "auto",
        }}>
          {MODULES.map((mod) => (
            <Link key={mod.href} href={mod.href} className="asf-module-tile" style={{
              display: "flex", flexDirection: "column", gap: "0.5rem",
              background: "var(--surface)", border: "1px solid var(--line)",
              borderRadius: "var(--radius-md)", padding: "1.2rem 1rem",
              textDecoration: "none", color: "var(--text)",
              boxShadow: "var(--card-shadow)",
              transition: "transform 180ms ease, border-color 180ms ease",
            }}>
              <span style={{
                width: "2.8rem", height: "2.8rem", borderRadius: "0.75rem",
                background: `${mod.color}22`, border: `1px solid ${mod.color}44`,
                display: "grid", placeItems: "center", fontSize: "1.3rem",
              }}>{mod.icon}</span>
              <strong style={{ fontSize: "0.96rem" }}>{mod.label}</strong>
              <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.4 }}>{mod.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{
        background: "var(--surface-muted)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)",
        padding: "2.5rem clamp(1rem, 3vw, 2rem)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", margin: 0 }}>
            Kenapa Asy-Syifaa ERP?
          </h2>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem", maxWidth: "1100px", marginInline: "auto",
        }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{
              background: "var(--surface)", border: "1px solid var(--line)",
              borderRadius: "var(--radius-md)", padding: "1.2rem",
              display: "flex", flexDirection: "column", gap: "0.5rem",
            }}>
              <span style={{ fontSize: "1.6rem" }}>{f.icon}</span>
              <strong style={{ fontSize: "0.96rem" }}>{f.title}</strong>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.55 }}>{f.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── WEBSITE PUBLIK LINKS ── */}
      <section style={{ padding: "2.5rem clamp(1rem, 3vw, 2rem)" }}>
        <div style={{ maxWidth: "1100px", marginInline: "auto" }}>
          <div style={{
            background: "var(--surface)", border: "1px solid var(--line)",
            borderRadius: "var(--radius-lg)", padding: "1.5rem 1.8rem",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "1rem",
          }}>
            <div>
              <h3 style={{ margin: "0 0 0.3rem", fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
                🌐 Konten Website Publik
              </h3>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.88rem" }}>
                Kelola profil pesantren, pengumuman, galeri, dan kegiatan untuk publik.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              {[
                { href: "/website", label: "📰 Beranda Website" },
                { href: "/website/profil", label: "🏛️ Profil" },
                { href: "/website/pengumuman", label: "📢 Pengumuman" },
                { href: "/website/galeri", label: "🖼️ Galeri" },
                { href: "/website/kegiatan", label: "📅 Kegiatan" },
              ].map((l) => (
                <Link key={l.href} href={l.href} style={{
                  padding: "0.45rem 0.85rem", borderRadius: "0.62rem",
                  border: "1px solid var(--line)", background: "var(--surface-muted)",
                  color: "var(--text)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600,
                }}>{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid var(--line)", padding: "1.2rem clamp(1rem, 3vw, 2rem)",
        textAlign: "center", color: "var(--text-muted)", fontSize: "0.82rem",
      }}>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} Pesantren Asy-Syifaa — ERP System v2.0 &nbsp;·&nbsp;
          <Link href="/login" style={{ color: "var(--link)", textDecoration: "none", fontWeight: 600 }}>Masuk Sistem</Link>
          &nbsp;·&nbsp;
          <Link href="/staff" style={{ color: "var(--link)", textDecoration: "none", fontWeight: 600 }}>Staff Dashboard</Link>
        </p>
      </footer>
    </div>
  );
}

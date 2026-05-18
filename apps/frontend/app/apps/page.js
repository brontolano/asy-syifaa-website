"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { canAccessPath, normalizeRole } from "../../lib/rbac";
import { readRole } from "../../lib/session";

const APP_ICONS = [
  { module: "akademik", title: "Akademik", icon: "school", href: "/dashboard", implemented: false },
  { module: "ppdb", title: "PPDB", icon: "how_to_reg", href: "/ppdb" },
  { module: "website", title: "Portal Publik", icon: "public", href: "/website" },
  { module: "wali", title: "Wali Santri", icon: "family_restroom", href: "/wali" },
  { module: "santri", title: "Kesantrian", icon: "groups", href: "/administrasi-santri" },
  { module: "asrama", title: "Asrama", icon: "apartment", href: "/asrama" },
  { module: "hr", title: "SDM", icon: "badge", href: "/hr" },
  { module: "keuangan", title: "Keuangan", icon: "payments", href: "/keuangan" },
  { module: "perpustakaan", title: "Perpustakaan", icon: "auto_stories", href: "/perpustakaan", implemented: false },
  { module: "inventaris", title: "Inventaris", icon: "inventory_2", href: "/inventaris", implemented: false },
  { module: "kesehatan", title: "Kesehatan", icon: "medical_services", href: "/kesehatan", implemented: false },
  { module: "unit-usaha", title: "Unit Usaha", icon: "shopping_basket", href: "/unit-usaha", implemented: false },
  { module: "kepegawaian", title: "Kepegawaian", icon: "assignment_ind", href: "/hr", implemented: false },
  { module: "alumni", title: "Alumni", icon: "history_edu", href: "/administrasi-santri", implemented: false },
  { module: "kurikulum", title: "Kurikulum", icon: "menu_book", href: "/kurikulum", implemented: false },
  { module: "jadwal-absensi", title: "Jadwal & Absensi", icon: "calendar_month", href: "/jadwal-absensi", implemented: false },
  { module: "rapor", title: "Penilaian / Rapor", icon: "grade", href: "/rapor", implemented: false },
  { module: "superadmin", title: "Super Admin", icon: "admin_panel_settings", href: "/superadmin" },
  { module: "tahfidz", title: "Tahfidz", icon: "menu_book", href: "/tahfidz" },
  { module: "izin", title: "Perizinan", icon: "approval", href: "/izin" },
  { module: "poin-disiplin", title: "Poin Disiplin", icon: "verified", href: "/izin", implemented: false },
  { module: "sarpras", title: "Sarana Prasarana", icon: "home_work", href: "/sarpras", implemented: false },
  { module: "pengaturan", title: "Pengaturan", icon: "settings_applications", href: "/pengaturan" },
  { module: "dashboard", title: "Dashboard", icon: "monitoring", href: "/dashboard" }
];

export default function AppsPage() {
  const [role, setRole] = useState("umum");
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  useEffect(() => {
    setRole(normalizeRole(readRole()));
  }, []);

  const visibleApps = useMemo(() => {
    return APP_ICONS.filter((item) => item.title.toLowerCase().includes(keyword.trim().toLowerCase()));
  }, [role, keyword]);

  function goToModule(moduleKey, isActive) {
    if (!isActive) return;
    const mod = moduleKey || "dashboard";
    const selected = APP_ICONS.find((item) => item.module === mod);
    const target = selected?.href || "/dashboard";
    try {
      sessionStorage.setItem("asf_active_module", mod);
    } catch (_error) {
      // noop
    }
    router.push(target);
  }

  return (
    <main style={{ minHeight: "calc(100vh - 88px)", background: "var(--bg)", padding: "1.3rem" }}>
      <section style={{ maxWidth: "1360px", margin: "0 auto" }}>
        <div style={{ marginBottom: "1.1rem", textAlign: "center" }}>
          <h1 style={{ margin: "0 0 0.35rem", fontSize: "clamp(1.4rem,2.6vw,2.2rem)", fontFamily: "var(--font-display)", color: "var(--accent-ink)" }}>
            Command Center Asy-Syifaa
          </h1>
          <p style={{ margin: 0, color: "var(--text-muted)" }}>
            Akses modul ERP berbasis role dari satu launcher.
          </p>
        </div>

        <div style={{ maxWidth: "680px", margin: "0 auto 1.3rem", position: "relative" }}>
          <span className="material-symbols-rounded" style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: "var(--accent)" }}>
            search
          </span>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Cari modul (mis. Keuangan, Tahfidz, PPDB)..."
            style={{
              width: "100%",
              border: "1px solid var(--line)",
              background: "var(--surface)",
              borderRadius: "1rem",
              padding: "0.8rem 0.9rem 0.8rem 2.6rem",
              fontSize: "0.92rem"
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "1rem",
            marginBottom: "1.2rem"
          }}
        >
          {visibleApps.map((item, index) => (
            (() => {
              const implemented = item.implemented !== false;
              const allowedByRole = canAccessPath(role, item.href);
              const isActive = implemented && allowedByRole;
              return (
            <button
              key={item.title}
              type="button"
              onClick={() => goToModule(item.module, isActive)}
              title={item.title}
              aria-label={item.title}
              disabled={!isActive}
              style={{
                border: "1px solid var(--line)",
                borderRadius: "1rem",
                background: "var(--surface)",
                padding: "0.95rem 0.6rem",
                cursor: isActive ? "pointer" : "not-allowed",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.6rem",
                transition: "all 150ms ease",
                ["--launch-order"]: index,
                filter: isActive ? "none" : "grayscale(1)",
                opacity: isActive ? 1 : 0.55
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: "3.1rem",
                  height: "3.1rem",
                  borderRadius: "999px",
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(27,107,81,0.08)",
                  color: "var(--accent)",
                  border: "1px solid rgba(27,107,81,0.15)"
                }}
              >
                <span className="material-symbols-rounded">{item.icon}</span>
              </div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: "0.9rem", color: "var(--text)", textAlign: "center" }}>{item.title}</p>
              {!isActive ? (
                <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 700 }}>Belum Aktif</span>
              ) : null}
            </button>
              );
            })()
          ))}
        </div>

        <section
          style={{
            borderRadius: "1.2rem",
            background: "linear-gradient(140deg, rgb(15, 61, 37) 0%, rgb(31, 107, 67) 55%, rgb(42, 138, 87) 100%)",
            color: "#fff",
            padding: "1.1rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.8rem",
            flexWrap: "wrap"
          }}
        >
          <div>
            <h3 style={{ margin: "0 0 0.25rem", fontSize: "1.05rem" }}>Butuh Bantuan Teknis?</h3>
            <p style={{ margin: 0, opacity: 0.9, fontSize: "0.84rem" }}>Lihat dokumentasi atau hubungi support operasional ERP.</p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button type="button" className="asf-button asf-button-secondary">Lihat Dokumentasi</button>
            <button type="button" className="asf-button asf-button-secondary">Support Teknis</button>
          </div>
        </section>
      </section>
    </main>
  );
}

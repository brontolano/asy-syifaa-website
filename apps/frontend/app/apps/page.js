"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  THEME_MODE_KEY,
  THEME_MOTION_KEY,
  normalizeThemeMode,
  normalizeThemeMotion,
  normalizeThemePalette
} from "../../lib/theme-config";

const ROLE_ACCESS = {
  superadmin: "all",
  mudir_aam: "all",
  ustadz: new Set(["/tahfidz", "/izin", "/ppdb", "/website/pengumuman", "/dashboard"]),
  bendahara: new Set(["/keuangan", "/dashboard", "/wali"]),
  kepala_sekolah: new Set(["/administrasi-santri", "/tahfidz", "/izin", "/hr", "/dashboard", "/website/pengumuman"]),
  staff_umum: new Set(["/administrasi-santri", "/asrama", "/izin", "/ppdb", "/website/pengumuman"]),
  wali: new Set(["/wali"]),
  umum: new Set(["/ppdb", "/website/pengumuman"])
};

const ROLE_LABEL = {
  superadmin: "Super Admin",
  mudir_aam: "Mudir Aam",
  ustadz: "Ustadz",
  bendahara: "Bendahara",
  kepala_sekolah: "Kepala Sekolah",
  staff_umum: "Staff Umum",
  wali: "Wali Santri",
  umum: "Pengguna Umum"
};

const ROLE_CONTEXT = {
  superadmin: "Mode kontrol penuh: tata kelola user, audit, dan konfigurasi sistem.",
  mudir_aam: "Mode pimpinan operasional: pantau semua alur santri, akademik, dan keuangan.",
  ustadz: "Mode pengajar: fokus pada tahfidz, presensi, dan komunikasi akademik.",
  bendahara: "Mode keuangan: kelola billing, pembayaran, dan ringkasan keuangan.",
  kepala_sekolah: "Mode akademik: awasi progres belajar, SDM, dan dashboard mutu.",
  staff_umum: "Mode operasional: jalankan layanan harian asrama, izin, dan administrasi.",
  wali: "Mode wali: pantau data anak, progres, dan informasi resmi pesantren.",
  umum: "Mode publik: akses pendaftaran dan pengumuman resmi pesantren."
};

const moduleGroups = [
  {
    key: "penerimaan",
    label: "Penerimaan & Publikasi",
    note: "Alur dari website publik ke PPDB dan hasil seleksi.",
    modules: [
      { title: "PSB/PPDB/SPMB Online", active: true, icon: "how_to_reg", href: "/ppdb" },
      { title: "Komunikasi & Pengumuman", active: true, icon: "campaign", href: "/website/pengumuman" },
      { title: "Portal Wali Santri", active: true, icon: "family_restroom", href: "/wali" }
    ]
  },
  {
    key: "master",
    label: "Master Data & Tata Kelola",
    note: "Data inti santri, akses user, dan kontrol operasional.",
    modules: [
      { title: "Administrasi Santri / Master Data", active: true, icon: "groups", href: "/administrasi-santri" },
      { title: "Manajemen Pengguna & RBAC", active: true, icon: "admin_panel_settings", href: "/superadmin" },
      { title: "Audit Trail & Keamanan", active: false, icon: "security", href: null },
      { title: "Compliance Engine PMA/EMIS", active: false, icon: "gavel", href: null }
    ]
  },
  {
    key: "akademik",
    label: "Akademik & Pembinaan",
    note: "Belajar, tahfidz, kedisiplinan, dan administrasi kegiatan santri.",
    modules: [
      { title: "Akademik (SIAKAD)", active: false, icon: "school", href: null },
      { title: "Rapor Elektronik & Sertifikat", active: false, icon: "workspace_premium", href: null },
      { title: "Tahfidz Tracker", active: true, icon: "menu_book", href: "/tahfidz" },
      { title: "Sanad Chain Management", active: false, icon: "account_tree", href: null },
      { title: "Perizinan Santri", active: true, icon: "approval", href: "/izin" },
      { title: "Presensi & Kehadiran", active: true, icon: "fact_check", href: "/izin" },
      { title: "Asrama & Kedisiplinan", active: true, icon: "hotel", href: "/asrama" },
      { title: "Dual Calendar Hijriah-Masehi", active: true, icon: "calendar_month", href: "/dashboard" }
    ]
  },
  {
    key: "keuangan",
    label: "Keuangan & Unit Pendukung",
    note: "Pengelolaan billing, kas, unit usaha, dan aset lembaga.",
    modules: [
      { title: "Keuangan & Akuntansi", active: true, icon: "account_balance_wallet", href: "/keuangan" },
      { title: "Billing Syahriah/SPP/Infaq", active: true, icon: "receipt_long", href: "/keuangan" },
      { title: "Pembayaran Cashless (VA/QRIS)", active: false, icon: "qr_code_2", href: null },
      { title: "Wakaf Management", active: false, icon: "volunteer_activism", href: null },
      { title: "Asset & Inventory", active: false, icon: "inventory_2", href: null },
      { title: "Unit Usaha / Koperasi", active: false, icon: "storefront", href: null }
    ]
  },
  {
    key: "sdm-analytics",
    label: "SDM & Monitoring Pimpinan",
    note: "Pengajar/staff, payroll, dashboard KPI, dan observability sistem.",
    modules: [
      { title: "SDM & Payroll", active: true, icon: "badge", href: "/hr" },
      { title: "Dashboard Analytics Pimpinan", active: true, icon: "monitoring", href: "/dashboard" },
      { title: "Observability & Monitoring", active: true, icon: "timeline", href: "/dashboard" }
    ]
  }
];

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (_error) {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (_error) {
    // noop
  }
}

function applyTheme(mode, palette) {
  const root = document.documentElement;
  root.dataset.theme = normalizeThemeMode(mode);
  root.dataset.palette = normalizeThemePalette(palette);
}

function applyMotion(motion) {
  const root = document.documentElement;
  const safeMotion = normalizeThemeMotion(motion);
  if (safeMotion === "auto") {
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.dataset.motion = reduced ? "reduce" : "safe";
    return;
  }
  root.dataset.motion = safeMotion;
}

function getCurrentRole() {
  const keys = [localStorage, sessionStorage];
  for (const storage of keys) {
    try {
      const raw = storage.getItem("asf_session");
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      const role = String(parsed?.user?.role || "").trim().toLowerCase();
      if (role) return role;
    } catch (_error) {
      // noop
    }
  }
  return "mudir_aam";
}

function canAccess(role, href) {
  if (!href) return false;
  const rule = ROLE_ACCESS[role] || ROLE_ACCESS.mudir_aam;
  if (rule === "all") return true;
  return rule.has(href);
}

export default function AppsPage() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mode, setMode] = useState("light");
  const [motion, setMotion] = useState("auto");
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("mudir_aam");

  useEffect(() => {
    const nextMode = normalizeThemeMode(readStorage(THEME_MODE_KEY));
    const nextPalette = "emerald";
    const nextMotion = normalizeThemeMotion(readStorage(THEME_MOTION_KEY));

    setMode(nextMode);
    setMotion(nextMotion);
    setRole(getCurrentRole());
    applyTheme(nextMode, nextPalette);
    applyMotion(nextMotion);
  }, []);

  function updateMode(nextMode) {
    const value = normalizeThemeMode(nextMode);
    setMode(value);
    writeStorage(THEME_MODE_KEY, value);
    applyTheme(value, "emerald");
  }

  function updateMotion(nextMotion) {
    const value = normalizeThemeMotion(nextMotion);
    setMotion(value);
    writeStorage(THEME_MOTION_KEY, value);
    applyMotion(value);
  }

  const groupedModules = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return moduleGroups
      .map((group) => {
        const accessible = group.modules.filter((item) => {
          if (!item.active || !item.href) return false;
          return canAccess(role, item.href);
        });
        const modules = keyword
          ? accessible.filter((item) => item.title.toLowerCase().includes(keyword))
          : accessible;
        return { ...group, modules };
      })
      .filter((group) => group.modules.length > 0);
  }, [query, role]);

  const stats = useMemo(() => {
    const allModules = moduleGroups.flatMap((group) => group.modules).filter((module) => module.active && module.href);
    const allowedModules = allModules.filter((module) => canAccess(role, module.href));
    return { total: allowedModules.length, active: allowedModules.length, inactive: 0 };
  }, [role]);

  useEffect(() => {
    function onKeyDown(event) {
      const isCmdK = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      if (!isCmdK) return;
      event.preventDefault();
      const el = document.getElementById("asf-app-search");
      if (el) el.focus();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="asf-container asf-apps-only-wrap">
      <button
        type="button"
        className="asf-gear-button"
        aria-label="Pengaturan UI"
        onClick={() => setSettingsOpen((prev) => !prev)}
      >
        <span className="material-symbols-rounded" aria-hidden="true">tune</span>
      </button>

      {settingsOpen ? (
        <aside className="asf-gear-panel" aria-label="Panel Pengaturan UI">
          <div className="asf-gear-head">
            <p className="asf-gear-title">Pengaturan UI</p>
            <button type="button" className="asf-gear-close" onClick={() => setSettingsOpen(false)} aria-label="Tutup pengaturan">Tutup</button>
          </div>

          <p className="asf-gear-label">Tema</p>
          <div className="asf-gear-group">
            <button type="button" className="asf-chip" aria-pressed={mode === "light"} onClick={() => updateMode("light")}>Terang</button>
            <button type="button" className="asf-chip" aria-pressed={mode === "dark"} onClick={() => updateMode("dark")}>Gelap</button>
          </div>

          <p className="asf-gear-label">Animasi</p>
          <div className="asf-gear-group">
            <button type="button" className="asf-chip" aria-pressed={motion === "auto"} onClick={() => updateMotion("auto")}>Auto</button>
            <button type="button" className="asf-chip" aria-pressed={motion === "safe"} onClick={() => updateMotion("safe")}>Animasi</button>
            <button type="button" className="asf-chip" aria-pressed={motion === "reduce"} onClick={() => updateMotion("reduce")}>Minimal</button>
          </div>
        </aside>
      ) : null}

      <section className="asf-launcher-head reveal">
        <div className="asf-card" style={{ marginBottom: "0.6rem" }}>
          <h2 style={{ margin: "0 0 0.25rem" }}>Beranda ERP - {ROLE_LABEL[role] || role}</h2>
          <p className="asf-muted" style={{ marginBottom: "0.45rem" }}>{ROLE_CONTEXT[role] || "Mode default ERP."}</p>
          <div className="asf-actions">
            <Link href="/pengaturan" className="asf-button asf-button-secondary">Pengaturan Tema</Link>
            <Link href="/profil-user" className="asf-button asf-button-secondary">Profil User</Link>
          </div>
        </div>
        <div className="asf-search-wrap">
          <input
            id="asf-app-search"
            type="search"
            className="asf-search-input"
            placeholder="Cari modul ERP..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Cari modul ERP"
          />
          <span className="asf-search-kbd">Ctrl/Cmd + K</span>
        </div>
        <div className="asf-launcher-stats">
          <span className="asf-launcher-stat-pill">Role: {ROLE_LABEL[role] || role}</span>
          <span className="asf-launcher-stat-pill">Total Modul: {stats.total}</span>
          <span className="asf-launcher-stat-pill asf-launcher-stat-pill--active">Aktif: {stats.active}</span>
        </div>
      </section>

      <section className="asf-group-list">
        {groupedModules.map((group, groupIndex) => (
          <article key={group.key} className={`asf-group-card reveal ${groupIndex > 0 ? `reveal-delay-${Math.min(groupIndex, 3)}` : ""}`}>
            <header className="asf-group-head">
              <div>
                <h2>{group.label}</h2>
                <p>{group.note}</p>
              </div>
              <span className="asf-group-count">{group.modules.length} modul</span>
            </header>
            <div className="asf-icon-grid asf-apps-only-grid">
              {group.modules.map((item, index) => {
                const className = `asf-app-icon-tile ${item.active ? "asf-icon-active" : "asf-icon-inactive"} ${index > 0 ? `reveal-delay-${Math.min(index, 3)}` : ""}`;
                const tileContent = (
                  <>
                    <div className="asf-app-icon" aria-hidden="true">
                      <span className="material-symbols-rounded">{item.icon}</span>
                    </div>
                    <p className="asf-app-label">{item.title}</p>
                  </>
                );

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={className}
                    title={`${item.title} - Buka modul`}
                    aria-label={item.title}
                  >
                    {tileContent}
                  </Link>
                );
              })}
            </div>
          </article>
        ))}
      </section>
      {groupedModules.length === 0 ? (
        <p className="asf-empty-state">Modul tidak ditemukan.</p>
      ) : null}
    </main>
  );
}


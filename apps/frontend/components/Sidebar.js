"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MODULE_HOME_PATH, canAccessPath, resolveActiveModule } from "../lib/rbac";
import { readRole } from "../lib/session";

export const NAV_MENU = [
  {
    group: "Beranda ERP",
    icon: "🏠",
    items: [
      { href: "/apps", label: "Launcher ERP", icon: "🏠", desc: "Beranda modul berbasis role", module: "apps" },
      { href: "/", label: "Website Publik", icon: "🌐", desc: "Halaman informasi publik", module: "website" },
      { href: "/dashboard", label: "Dashboard ERP", icon: "📊", desc: "Ringkasan operasional", module: "dashboard" }
    ]
  },
  {
    group: "Administrasi",
    icon: "🗂️",
    items: [
      { href: "/administrasi-santri", label: "Master Data Santri", icon: "👥", desc: "Kelola data santri", module: "santri" },
      { href: "/ppdb", label: "PPDB / SPMB", icon: "📋", desc: "Pendaftaran santri baru", module: "ppdb" },
      { href: "/asrama", label: "Asrama", icon: "🛏️", desc: "Manajemen kamar", module: "asrama" },
      { href: "/izin", label: "Perizinan", icon: "📝", desc: "Izin santri", module: "izin" }
    ]
  },
  {
    group: "Akademik & SDM",
    icon: "📚",
    items: [
      { href: "/tahfidz", label: "Tahfidz", icon: "📖", desc: "Tracking ziyadah & murojaah", module: "tahfidz" },
      { href: "/hr", label: "SDM / HR", icon: "👥", desc: "Kepegawaian & payroll", module: "hr" },
      { href: "/staff", label: "Staff Dashboard", icon: "⚙️", desc: "Operasional harian", module: "staff" }
    ]
  },
  {
    group: "Keuangan & Portal",
    icon: "💠",
    items: [
      { href: "/keuangan", label: "Keuangan", icon: "💰", desc: "Billing & cashflow", module: "keuangan" },
      { href: "/wali", label: "Portal Wali", icon: "👨‍👩‍👧", desc: "Akses orang tua", module: "wali" },
      { href: "/website", label: "Website CMS", icon: "📰", desc: "Manajemen konten website", module: "website" }
    ]
  },
  {
    group: "System",
    icon: "🛡️",
    items: [
      { href: "/superadmin", label: "Super Admin", icon: "🛡️", desc: "User, konfigurasi, audit log", module: "superadmin" },
      { href: "/pengaturan", label: "Pengaturan", icon: "🎨", desc: "Tema dan preferensi", module: "settings" },
      { href: "/profil-user", label: "Profil User", icon: "🙍", desc: "Detail profil & logout", module: "profile" },
      { href: "/login", label: "Login / Signup", icon: "🔐", desc: "Masuk sistem", module: "auth" }
    ]
  }
];

const MODULE_DETAIL_LABEL = {
  ppdb: "PPDB / SPMB",
  santri: "Master Data Santri",
  tahfidz: "Tahfidz",
  keuangan: "Keuangan",
  asrama: "Asrama",
  izin: "Perizinan",
  hr: "SDM / HR",
  dashboard: "Dashboard ERP",
  staff: "Staff Ops",
  wali: "Portal Wali",
  superadmin: "Super Admin",
  website: "Website CMS",
  apps: "Launcher ERP"
};

const MODULE_SYMBOL_ICON = {
  ppdb: "how_to_reg",
  santri: "groups",
  website: "public",
  tahfidz: "menu_book",
  keuangan: "account_balance_wallet",
  asrama: "hotel",
  izin: "approval",
  hr: "badge",
  dashboard: "monitoring",
  staff: "badge",
  wali: "family_restroom",
  superadmin: "admin_panel_settings"
};

const SIDEBAR_ACTIVE_MODULE_KEY = "asf_active_module";

const MODULE_ORDER = [
  "superadmin",
  "dashboard",
  "santri",
  "ppdb",
  "asrama",
  "izin",
  "tahfidz",
  "keuangan",
  "hr",
  "staff",
  "wali",
  "website"
];

export default function Sidebar({ collapsed, onToggle }) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState("umum");
  const [expandedModule, setExpandedModule] = useState("");

  useEffect(() => {
    setRole(readRole());
  }, [pathname]);

  const activeModule = resolveActiveModule(pathname);
  const accessibleModules = useMemo(() => {
    return MODULE_ORDER.filter((mod) => canAccessPath(role, MODULE_HOME_PATH[mod] || "/"));
  }, [role]);

  useEffect(() => {
    const routeModule = activeModule && activeModule !== "apps" ? activeModule : "";
    try {
      const stored = sessionStorage.getItem(SIDEBAR_ACTIVE_MODULE_KEY) || "";
      const preferStored = pathname === "/dashboard";
      if (preferStored && stored && accessibleModules.includes(stored)) {
        setExpandedModule(stored);
        return;
      }
      if (routeModule && accessibleModules.includes(routeModule)) {
        setExpandedModule(routeModule);
        return;
      }
      if (stored && accessibleModules.includes(stored)) {
        setExpandedModule(stored);
        return;
      }
    } catch (_error) {
      // noop
    }
    setExpandedModule("");
  }, [activeModule, accessibleModules, pathname]);

  function selectModule(moduleKey) {
    const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
    setExpandedModule(moduleKey);
    const targetPath = MODULE_HOME_PATH[moduleKey] || "/dashboard";
    try {
      sessionStorage.setItem(SIDEBAR_ACTIVE_MODULE_KEY, moduleKey);
    } catch (_error) {
      // noop
    }
    if (!isMobileViewport && collapsed && typeof onToggle === "function") {
      onToggle();
    }
    if (pathname !== targetPath) {
      router.push(targetPath);
    }
    if (typeof onToggle === "function" && isMobileViewport) {
      onToggle();
    }
  }

  return (
    <>
      {!collapsed && (
        <div className="asf-sidebar-overlay" onClick={onToggle} aria-hidden="true" />
      )}

      <aside className={`asf-sidebar ${collapsed ? "asf-sidebar--collapsed" : ""}`}>
        <div className="asf-sidebar-brand">
          {!collapsed && <span className="asf-sidebar-group-label" style={{ padding: 0, margin: 0 }}>MENU</span>}
          <button
            type="button"
            className="asf-sidebar-toggle"
            onClick={onToggle}
            aria-label={collapsed ? "Buka sidebar" : "Tutup sidebar"}
          >
            {collapsed ? "▶" : "◀"}
          </button>
        </div>

        <nav className="asf-sidebar-nav" aria-label="Navigasi modul ERP">
          <div className="asf-sidebar-group">
            {!collapsed && <span className="asf-sidebar-group-label">Modul ERP</span>}
            {accessibleModules.map((mod) => {
              const isSelected = expandedModule === mod;
              return (
                <div key={`module-wrap-${mod}`}>
                  <button
                    type="button"
                    onClick={() => selectModule(mod)}
                    className={`asf-sidebar-link asf-sidebar-link--module ${isSelected ? "asf-sidebar-link--active" : ""}`}
                    title={MODULE_DETAIL_LABEL[mod] || mod}
                    style={{ width: "calc(100% - 0.8rem)", textAlign: "left", border: "none", background: "transparent", cursor: "pointer" }}
                  >
                    <span className="asf-sidebar-link-icon">
                      <span className="material-symbols-rounded">{MODULE_SYMBOL_ICON[mod] || "apps"}</span>
                    </span>
                    {!collapsed && (
                      <span className="asf-sidebar-link-label asf-sidebar-link-label--header">{MODULE_DETAIL_LABEL[mod] || mod}</span>
                    )}
                    {isSelected && !collapsed && <span className="asf-sidebar-active-dot" aria-hidden="true" />}
                  </button>
                </div>
              );
            })}
          </div>

        </nav>

        {!collapsed && (
          <div className="asf-sidebar-footer">
            <span className="asf-muted" style={{ fontSize: "0.72rem" }}>Asy-Syifaa ERP v2.1</span>
          </div>
        )}
      </aside>
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const NAV_MENU = [
  {
    group: "Beranda ERP",
    icon: "🏠",
    items: [
      { href: "/apps", label: "Beranda ERP", icon: "🏠", desc: "Launcher modul ERP pesantren" },
      { href: "/", label: "Website Publik", icon: "🌐", desc: "Halaman utama pesantren" },
      { href: "/website", label: "Website", icon: "📰", desc: "Konten website publik" },
      { href: "/ppdb", label: "PPDB / SPMB", icon: "📋", desc: "Pendaftaran santri baru" },
    ]
  },
  {
    group: "Akademik",
    icon: "📚",
    items: [
      { href: "/staff", label: "Staff Dashboard", icon: "⚙️", desc: "Operasional harian" },
      { href: "/tahfidz", label: "Tahfidz", icon: "📖", desc: "Tracking ziyadah & murojaah" },
    ]
  },
  {
    group: "Keuangan",
    icon: "💰",
    items: [
      { href: "/keuangan", label: "Keuangan", icon: "💰", desc: "Billing & cashflow" },
    ]
  },
  {
    group: "Keasramaan",
    icon: "🏠",
    items: [
      { href: "/asrama", label: "Asrama", icon: "🛏️", desc: "Manajemen kamar" },
      { href: "/izin", label: "Perizinan", icon: "📝", desc: "Izin santri" },
    ]
  },
  {
    group: "SDM & Admin",
    icon: "👥",
    items: [
      { href: "/hr", label: "SDM / HR", icon: "👥", desc: "Kepegawaian & gaji" },
      { href: "/dashboard", label: "ERP Dashboard", icon: "📊", desc: "Command center" },
    ]
  },
  {
    group: "Portal",
    icon: "🔗",
    items: [
      { href: "/wali", label: "Portal Wali", icon: "👨‍👩‍👧", desc: "Akses orang tua" },
      { href: "/login", label: "Login", icon: "🔐", desc: "Masuk sistem" },
    ]
  },
  {
    group: "System",
    icon: "🛡️",
    items: [
      { href: "/superadmin", label: "Super Admin", icon: "🛡️", desc: "User, konfigurasi, audit log" },
      { href: "/pengaturan", label: "Pengaturan", icon: "🎨", desc: "Tema dan preferensi tampilan" },
    ]
  }
];

export default function Sidebar({ collapsed, onToggle }) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay mobile */}
      {!collapsed && (
        <div className="asf-sidebar-overlay" onClick={onToggle} aria-hidden="true" />
      )}

      <aside className={`asf-sidebar ${collapsed ? "asf-sidebar--collapsed" : ""}`}>
        {/* Brand */}
        <div className="asf-sidebar-brand">
          {!collapsed && (
            <Link href="/apps" className="asf-sidebar-brand-link">
              <span className="asf-brand-mark" style={{ width: "2rem", height: "2rem", fontSize: "0.75rem" }}>ERP</span>
              <span className="asf-sidebar-brand-text">Asy-Syifaa</span>
            </Link>
          )}
          <button
            type="button"
            className="asf-sidebar-toggle"
            onClick={onToggle}
            aria-label={collapsed ? "Buka sidebar" : "Tutup sidebar"}
          >
            {collapsed ? "▶" : "◀"}
          </button>
        </div>

        {/* Navigation groups */}
        <nav className="asf-sidebar-nav" aria-label="Navigasi modul ERP">
          {NAV_MENU.map((group) => (
            <div key={group.group} className="asf-sidebar-group">
              {!collapsed && (
                <span className="asf-sidebar-group-label">{group.group}</span>
              )}
              {group.items.map((item) => {
                const isActive = item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`asf-sidebar-link ${isActive ? "asf-sidebar-link--active" : ""}`}
                    title={collapsed ? `${item.label} — ${item.desc}` : item.desc}
                  >
                    <span className="asf-sidebar-link-icon">{item.icon}</span>
                    {!collapsed && (
                      <span className="asf-sidebar-link-label">{item.label}</span>
                    )}
                    {isActive && !collapsed && (
                      <span className="asf-sidebar-active-dot" aria-hidden="true" />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="asf-sidebar-footer">
            <span className="asf-muted" style={{ fontSize: "0.72rem" }}>Asy-Syifaa ERP v2.0</span>
          </div>
        )}
      </aside>
    </>
  );
}

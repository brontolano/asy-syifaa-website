"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar, { NAV_MENU } from "./Sidebar";

// Derive page title from NAV_MENU based on current path
function getPageTitle(pathname) {
  for (const group of NAV_MENU) {
    for (const item of group.items) {
      if (item.href === "/") {
        if (pathname === "/") return item.label;
      } else if (pathname === item.href || pathname.startsWith(item.href + "/")) {
        return item.label;
      }
    }
  }
  return "Asy-Syifaa ERP";
}

// Derive breadcrumb group from NAV_MENU
function getGroupName(pathname) {
  for (const group of NAV_MENU) {
    for (const item of group.items) {
      if (item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(item.href + "/")) {
        return group.group;
      }
    }
  }
  return null;
}

// Read session from either storage
function getSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem("asf_session") || localStorage.getItem("asf_session");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export default function ErpShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname === "/login";
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const handler = (e) => {
      setIsMobile(e.matches);
      if (e.matches) setCollapsed(true);
    };
    handler(mql);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Read session once on mount
  useEffect(() => { setSession(getSession()); }, []);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (isMobile) setCollapsed(true);
  }, [pathname, isMobile]);

  function toggleSidebar() { setCollapsed((c) => !c); }
  function handleLogout() {
    try {
      localStorage.removeItem("asf_session");
      sessionStorage.removeItem("asf_session");
    } catch (_error) {
      // noop
    }
    router.replace("/login");
    router.refresh();
  }

  const pageTitle = getPageTitle(pathname);
  const groupName = getGroupName(pathname);
  const userName = session?.user?.name ?? "Tamu";
  const userRole = session?.user?.role ?? "";

  const ROLE_LABEL = {
    superadmin: "Super Admin", mudir_aam: "Mudir Aam",
    ustadz: "Ustadz", ustadzah: "Ustadzah",
    bendahara: "Bendahara", kepala_sekolah: "Kepala Sekolah",
    staff_umum: "Staff Umum", wali: "Wali Santri", umum: "Pengguna Umum",
  };

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="asf-erp-shell">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />

      <div className="asf-erp-main">
        <header className="asf-erp-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", minWidth: 0 }}>
            {isMobile && (
              <button
                type="button"
                onClick={toggleSidebar}
                aria-label="Buka menu"
                style={{
                  width: "2rem", height: "2rem", borderRadius: "0.5rem",
                  border: "1px solid var(--line)", background: "var(--surface)",
                  color: "var(--text)", fontSize: "1rem", cursor: "pointer",
                  display: "grid", placeItems: "center", flexShrink: 0,
                }}
              >☰</button>
            )}
            <div style={{ minWidth: 0 }}>
              {groupName && (
                <p style={{ margin: 0, fontSize: "0.68rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {groupName}
                </p>
              )}
              <span className="asf-erp-topbar-title">{pageTitle}</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
            {userRole && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.35rem",
                padding: "0.25rem 0.65rem", borderRadius: "999px",
                background: "var(--accent-soft)", color: "var(--accent-ink)",
                fontSize: "0.75rem", fontWeight: 700, border: "1px solid rgba(31,107,67,0.2)",
              }}>
                🔐 {ROLE_LABEL[userRole] ?? userRole}
              </span>
            )}
            <div style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              padding: "0.25rem 0.6rem", borderRadius: "999px",
              background: "var(--surface-muted)", border: "1px solid var(--line)",
              fontSize: "0.8rem", fontWeight: 600, color: "var(--text)",
            }}>
              <span style={{ width: "1.4rem", height: "1.4rem", borderRadius: "50%", background: "var(--accent)", color: "#fff", display: "grid", placeItems: "center", fontSize: "0.65rem", fontWeight: 800 }}>
                {userName.charAt(0).toUpperCase()}
              </span>
              <span style={{ maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userName}</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="asf-button asf-button-secondary"
              style={{ padding: "0.35rem 0.8rem", borderRadius: "999px" }}
            >
              Logout
            </button>
          </div>
        </header>

        <main className="asf-erp-content">
          {children}
        </main>
      </div>
    </div>
  );
}

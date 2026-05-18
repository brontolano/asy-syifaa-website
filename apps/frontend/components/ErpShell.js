"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import { canAccessPath, getRoleHomeRoute, normalizeRole } from "../lib/rbac";
import { clearSession, readSession } from "../lib/session";

function normalizePathname(pathname) {
  const value = String(pathname || "").trim();
  if (!value) return "/";
  if (value.length > 1 && value.endsWith("/")) return value.slice(0, -1);
  return value;
}

export default function ErpShell({ children }) {
  const pathname = usePathname();
  const normalizedPathname = normalizePathname(pathname);
  const router = useRouter();
  const isAuthPage = normalizedPathname === "/login";
  const isAppsLauncher = normalizedPathname === "/apps";
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [session, setSession] = useState(null);
  const [sessionReady, setSessionReady] = useState(false);

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

  useEffect(() => {
    setSession(readSession());
    setSessionReady(true);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    const panelFrom = localStorage.getItem("asf_panel_grad_from") || "#f2f7f4";
    const panelTo = localStorage.getItem("asf_panel_grad_to") || "#eaf1ed";
    const panelImage = localStorage.getItem("asf_panel_bg_image") || "";
    root.style.setProperty("--erp-panel-grad-from", panelFrom);
    root.style.setProperty("--erp-panel-grad-to", panelTo);
    root.style.setProperty("--erp-panel-bg-image", panelImage ? `url("${panelImage}")` : "none");
  }, [pathname]);

  useEffect(() => {
    if (isAuthPage || !sessionReady) return;
    const role = normalizeRole(session?.user?.role);
    const allowed = canAccessPath(role, normalizedPathname);
    if (!allowed) {
      router.replace(getRoleHomeRoute(role));
      router.refresh();
    }
  }, [isAuthPage, normalizedPathname, router, session, sessionReady]);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (isMobile) setCollapsed(true);
  }, [normalizedPathname, isMobile]);

  function toggleSidebar() { setCollapsed((c) => !c); }
  function handleLogout() {
    clearSession();
    router.replace("/login");
    router.refresh();
  }

  const userName = session?.user?.name ?? "Tamu";
  const userRole = normalizeRole(session?.user?.role);
  const hasSession = Boolean(session?.token);
  const topUtilityItems = [
    { href: "/profil-user", label: "Profil", icon: "person", desc: "Detail profil user" },
    ...(hasSession ? [{ href: "/pengaturan", label: "Pengaturan", icon: "settings", desc: "Tema dan preferensi" }] : [{ href: "/login", label: "Login", icon: "login", desc: "Masuk sistem" }])
  ].filter((item) => canAccessPath(userRole, item.href));

  const topbar = (
    <header className="asf-erp-topbar">
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", minWidth: 0 }}>
        <Link href="/apps" className="asf-erp-topbar-brand">
          <img src="/assets/img/logo.png" alt="Logo Asy-Syifaa Wal Mahmuudiyyah" className="asf-erp-topbar-logo" />
          <span className="asf-erp-topbar-brand-text">Asy-Syifaa Framework</span>
        </Link>
        {isMobile && !isAppsLauncher && (
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
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
        {topUtilityItems.map((item) => (
          <Link
            key={`top-util-${item.href}`}
            href={item.href}
            title={item.desc}
            style={{
              display: "inline-grid",
              placeItems: "center",
              width: "2rem",
              height: "2rem",
              borderRadius: "0.6rem",
              textDecoration: "none",
              color: "var(--text)",
              border: "1px solid var(--line)",
              background: "var(--surface)"
            }}
          >
            <span className="material-symbols-rounded" aria-hidden="true" style={{ fontSize: "1rem" }}>{item.icon}</span>
          </Link>
        ))}
        {hasSession ? (
          <button
            type="button"
            onClick={handleLogout}
            style={{
              padding: "0.3rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(186,26,26,0.22)",
              background: "rgba(186,26,26,0.06)",
              color: "#9f1d1d",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        ) : null}
      </div>
    </header>
  );

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (isAppsLauncher) {
    return (
      <div className="asf-erp-main" style={{ minHeight: "100vh" }}>
        {topbar}
        <main className="asf-erp-content">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="asf-erp-shell">
      {topbar}

      <div className="asf-erp-body">
        <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />

        <div className="asf-erp-main">
          <main className="asf-erp-content">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

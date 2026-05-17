"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchApi } from "../../lib/api-client";

const MODULE_LINKS = [
  { href: "/staff",    icon: "⚙️",  label: "Staff Ops",       color: "#1f6b43" },
  { href: "/keuangan", icon: "💰",  label: "Keuangan",        color: "#245f82" },
  { href: "/tahfidz",  icon: "📖",  label: "Tahfidz",         color: "#7a5b2f" },
  { href: "/asrama",   icon: "🛏️", label: "Asrama",           color: "#4c4383" },
  { href: "/izin",     icon: "📝",  label: "Perizinan",       color: "#8f3e58" },
  { href: "/hr",       icon: "👥",  label: "SDM / HR",        color: "#2e5b67" },
  { href: "/ppdb",     icon: "📋",  label: "PPDB",            color: "#1f577a" },
  { href: "/website",  icon: "📰",  label: "Website",         color: "#185637" },
  { href: "/wali",     icon: "👨‍👩‍👧", label: "Portal Wali",  color: "#5b4a31" },
];

const ALERTS = [
  { level: "warn",    icon: "⚠️", text: "3 izin santri menunggu persetujuan Mudir Aam" },
  { level: "info",    icon: "ℹ️", text: "Pembayaran SPP bulan Mei belum 100% terkumpul" },
  { level: "success", icon: "✅", text: "Backup database otomatis berhasil pukul 02:00 WIB" },
];

const RECENT_ACTIVITY = [
  { time: "08:32", module: "Absensi",  desc: "Staff mencatat presensi 120 santri — hadir: 117, izin: 3" },
  { time: "08:15", module: "Keuangan", desc: "Pembayaran SPP diterima dari 8 santri — Rp 6.400.000" },
  { time: "07:50", module: "Izin",     desc: "Pengajuan izin pulang atas nama Ahmad Fauzi (Kls 9A)" },
  { time: "07:30", module: "Tahfidz",  desc: "5 catatan ziyadah baru masuk dari Ust. Hasan Bisri" },
  { time: "06:45", module: "HR",       desc: "Payroll bulan Mei telah digenerate — 28 staff" },
];

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiOk, setApiOk] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(null);

  async function loadSummary() {
    setLoading(true);
    try {
      const [health, dashRes, staffRes, permitsRes, billingRes] = await Promise.all([
        fetchApi("/api/health"),
        fetchApi("/api/dashboard/summary").catch(() => ({ ok: false, data: {} })),
        fetchApi("/api/staff"),
        fetchApi("/api/permits"),
        fetchApi("/api/billing"),
      ]);
      setApiOk(health.ok);

      const staff = Array.isArray(staffRes.data) ? staffRes.data : [];
      const permits = Array.isArray(permitsRes.data) ? permitsRes.data : [];
      const billing = Array.isArray(billingRes.data) ? billingRes.data : [];
      const dash = dashRes.data || {};

      setSummary({
        students: dash.total_students ?? 0,
        staff: staff.length,
        staffAktif: staff.filter(s => s.status === "aktif").length,
        pendingPermits: permits.filter(p => p.status === "pending").length,
        totalBilling: billing.reduce((s, b) => s + Number(b.amount || 0), 0),
        paidBilling: billing.filter(b => b.status === "paid").reduce((s, b) => s + Number(b.amount || 0), 0),
        unpaidBilling: billing.filter(b => b.status !== "paid").length,
        totalRooms: dash.total_rooms ?? 0,
        activeStudents: dash.active_students ?? dash.total_students ?? 0,
      });
      setLastRefresh(new Date().toLocaleTimeString("id-ID"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadSummary(); }, []);

  const collectionRate = summary && summary.totalBilling > 0
    ? Math.round((summary.paidBilling / summary.totalBilling) * 100)
    : 0;

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(140deg, #0f3d25 0%, #1f6b43 55%, #2a8a57 100%)",
        color: "#fff", padding: "1.8rem 1.5rem", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 85% 20%, rgba(255,255,255,0.07), transparent 55%)", pointerEvents: "none" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "999px", padding: "0.25rem 0.65rem", fontSize: "0.78rem", fontWeight: 700,
              marginBottom: "0.6rem", color: "#d6f5e3",
            }}>📊 ERP Command Center</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3.5vw, 2rem)", margin: "0 0 0.4rem" }}>
              Dashboard Manajemen
            </h1>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.8)", fontSize: "0.92rem" }}>
              Monitoring real-time seluruh modul ERP Pesantren Asy-Syifaa.
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{
              display: "inline-flex", gap: "0.35rem", alignItems: "center",
              background: apiOk ? "rgba(50,220,100,0.2)" : "rgba(220,50,50,0.2)",
              border: `1px solid ${apiOk ? "rgba(50,220,100,0.4)" : "rgba(220,50,50,0.4)"}`,
              borderRadius: "999px", padding: "0.25rem 0.65rem", fontSize: "0.78rem", fontWeight: 700,
              color: apiOk ? "#a7f3c4" : "#ffb3b3",
            }}>● {apiOk ? "Semua Sistem Normal" : "API Offline"}</span>
            <button type="button" onClick={loadSummary} disabled={loading} style={{
              background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff", borderRadius: "0.6rem", padding: "0.35rem 0.75rem",
              fontSize: "0.82rem", fontWeight: 700, cursor: "pointer",
            }}>{loading ? "⟳ Memuat..." : "⟳ Refresh"}</button>
          </div>
        </div>
        {lastRefresh && (
          <p style={{ margin: "0.6rem 0 0", fontSize: "0.72rem", color: "rgba(255,255,255,0.55)" }}>
            Terakhir diperbarui: {lastRefresh} WIB
          </p>
        )}
      </section>

      {/* Alerts */}
      {ALERTS.length > 0 && (
        <div style={{ padding: "0.75rem 1.25rem 0", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {ALERTS.map((alert, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "0.6rem",
              padding: "0.5rem 0.85rem", borderRadius: "0.65rem", fontSize: "0.84rem",
              background: alert.level === "warn" ? "var(--warn-bg)" : alert.level === "success" ? "var(--success-bg)" : "var(--accent-soft)",
              color: alert.level === "warn" ? "var(--warn-fg)" : alert.level === "success" ? "var(--success-fg)" : "var(--accent-ink)",
              border: `1px solid ${alert.level === "warn" ? "rgba(161,93,6,0.2)" : alert.level === "success" ? "rgba(24,117,72,0.2)" : "rgba(31,107,67,0.2)"}`,
            }}>
              <span style={{ fontSize: "1rem" }}>{alert.icon}</span>
              <span style={{ fontWeight: 600 }}>{alert.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* KPI Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "0.75rem", padding: "0.75rem 1.25rem 0" }}>
        {[
          { label: "Total Santri", value: loading ? "..." : summary?.students ?? "–", icon: "🧑‍🎓", color: "#1f6b43", sub: `${summary?.activeStudents ?? "–"} aktif` },
          { label: "Total Staff", value: loading ? "..." : summary?.staff ?? "–", icon: "👥", color: "#245f82", sub: `${summary?.staffAktif ?? "–"} aktif` },
          { label: "Izin Menunggu", value: loading ? "..." : summary?.pendingPermits ?? "–", icon: "📝", color: summary?.pendingPermits > 0 ? "#a15d06" : "#187548", sub: "perlu approval" },
          { label: "Tagihan Belum Lunas", value: loading ? "..." : summary?.unpaidBilling ?? "–", icon: "💳", color: summary?.unpaidBilling > 5 ? "#b23a2f" : "#187548", sub: `${collectionRate}% terkumpul` },
          { label: "Total Tagihan Bulan Ini", value: loading ? "..." : `Rp ${new Intl.NumberFormat("id-ID").format(summary?.paidBilling ?? 0)}`, icon: "💰", color: "#7a5b2f", sub: "sudah dibayar" },
          { label: "Kamar Asrama", value: loading ? "..." : summary?.totalRooms ?? "–", icon: "🛏️", color: "#4c4383", sub: "terdaftar" },
        ].map((kpi) => (
          <div key={kpi.label} style={{
            background: "var(--surface)", border: "1px solid var(--line)",
            borderRadius: "var(--radius-md)", padding: "0.85rem 1rem",
            boxShadow: "var(--card-shadow)",
          }}>
            <p style={{ margin: "0 0 0.3rem", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {kpi.icon} {kpi.label}
            </p>
            <p style={{ margin: "0 0 0.15rem", fontSize: "1.55rem", fontWeight: 800, color: kpi.color, lineHeight: 1 }}>{kpi.value}</p>
            <p style={{ margin: 0, fontSize: "0.72rem", color: "var(--text-muted)" }}>{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Collection Rate Bar */}
      {summary && (
        <div style={{ padding: "0.75rem 1.25rem 0" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "0.9rem 1rem", boxShadow: "var(--card-shadow)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--text)" }}>📊 Tingkat Koleksi SPP Bulan Ini</span>
              <span style={{ fontSize: "0.88rem", fontWeight: 800, color: collectionRate >= 80 ? "var(--success-fg)" : "var(--warn-fg)" }}>{collectionRate}%</span>
            </div>
            <div style={{ height: "8px", borderRadius: "999px", background: "var(--surface-muted)", overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: "999px",
                width: `${collectionRate}%`,
                background: collectionRate >= 80 ? "var(--success)" : collectionRate >= 50 ? "var(--warn)" : "var(--danger)",
                transition: "width 600ms ease",
              }} />
            </div>
            <p style={{ margin: "0.4rem 0 0", fontSize: "0.75rem", color: "var(--text-muted)" }}>
              Terkumpul: Rp {new Intl.NumberFormat("id-ID").format(summary.paidBilling)} dari Rp {new Intl.NumberFormat("id-ID").format(summary.totalBilling)}
            </p>
          </div>
        </div>
      )}

      {/* Module Quick Access */}
      <section style={{ padding: "0.75rem 1.25rem 0" }}>
        <h2 style={{ margin: "0 0 0.6rem", fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Akses Cepat Modul
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "0.6rem" }}>
          {MODULE_LINKS.map((mod) => (
            <Link key={mod.href} href={mod.href} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
              padding: "0.75rem 0.5rem",
              background: "var(--surface)", border: "1px solid var(--line)",
              borderRadius: "var(--radius-md)", textDecoration: "none", color: "var(--text)",
              boxShadow: "var(--card-shadow)", textAlign: "center",
              transition: "transform 160ms ease, border-color 160ms ease",
            }}>
              <span style={{
                width: "2.4rem", height: "2.4rem", borderRadius: "0.65rem",
                background: `${mod.color}18`, border: `1px solid ${mod.color}38`,
                display: "grid", placeItems: "center", fontSize: "1.1rem",
              }}>{mod.icon}</span>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, lineHeight: 1.2 }}>{mod.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Activity + System Status */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "0.75rem", padding: "0.75rem 1.25rem 2rem" }}>
        {/* Activity */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1rem", boxShadow: "var(--card-shadow)" }}>
          <h3 style={{ margin: "0 0 0.75rem", fontSize: "0.92rem", fontWeight: 800 }}>🕐 Aktivitas Terkini</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {RECENT_ACTIVITY.map((act, i) => (
              <div key={i} style={{
                display: "flex", gap: "0.75rem", padding: "0.55rem 0",
                borderBottom: i < RECENT_ACTIVITY.length - 1 ? "1px solid var(--line)" : "none",
              }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, flexShrink: 0, paddingTop: "0.1rem" }}>{act.time}</span>
                <div>
                  <span style={{
                    display: "inline-flex", padding: "0.08rem 0.38rem", borderRadius: "999px",
                    fontSize: "0.66rem", fontWeight: 800, marginBottom: "0.2rem",
                    background: "var(--accent-soft)", color: "var(--accent-ink)",
                  }}>{act.module}</span>
                  <p style={{ margin: 0, fontSize: "0.82rem", lineHeight: 1.45, color: "var(--text)" }}>{act.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1rem", boxShadow: "var(--card-shadow)" }}>
          <h3 style={{ margin: "0 0 0.75rem", fontSize: "0.92rem", fontWeight: 800 }}>🖥️ Status Sistem</h3>
          {[
            { label: "Backend API (Node.js)", ok: apiOk, detail: "Port 4000" },
            { label: "Database (PostgreSQL)", ok: apiOk, detail: "pg pool aktif" },
            { label: "Frontend (Next.js 15)", ok: true, detail: "Port 3000" },
            { label: "Go API Service", ok: false, detail: "Port 5000 — Stangler Fig" },
            { label: "Redis Cache", ok: false, detail: "Belum dikonfigurasi" },
            { label: "CI/CD Pipeline", ok: true, detail: "GitHub Actions aktif" },
          ].map((svc) => (
            <div key={svc.label} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "0.45rem 0", borderBottom: "1px solid var(--line)",
            }}>
              <div>
                <p style={{ margin: 0, fontSize: "0.84rem", fontWeight: 600 }}>{svc.label}</p>
                <p style={{ margin: 0, fontSize: "0.72rem", color: "var(--text-muted)" }}>{svc.detail}</p>
              </div>
              <span style={{
                display: "inline-flex", padding: "0.12rem 0.48rem", borderRadius: "999px",
                fontSize: "0.7rem", fontWeight: 700, flexShrink: 0,
                background: svc.ok ? "var(--success-bg)" : "var(--warn-bg)",
                color: svc.ok ? "var(--success-fg)" : "var(--warn-fg)",
                border: `1px solid ${svc.ok ? "rgba(24,117,72,0.2)" : "rgba(161,93,6,0.2)"}`,
              }}>{svc.ok ? "✓ Normal" : "○ Offline"}</span>
            </div>
          ))}

          <div style={{ marginTop: "0.75rem", padding: "0.75rem", borderRadius: "0.65rem", background: "var(--surface-muted)", border: "1px solid var(--line)" }}>
            <p style={{ margin: "0 0 0.2rem", fontSize: "0.78rem", fontWeight: 800 }}>🏗️ Infrastruktur</p>
            <p style={{ margin: 0, fontSize: "0.76rem", color: "var(--text-muted)" }}>
              Docker Compose · Multi-stage build · Non-root container · Healthcheck enabled
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

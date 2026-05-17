"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchApi } from "../../lib/api-client";

const MODULES = [
  {
    href: "/administrasi-santri", icon: "🧾", label: "Administrasi Santri",
    desc: "Master data santri: tambah, filter, dan update status aktif/alumni/keluar.",
    color: "#346848", badge: null,
  },
  {
    href: "/tahfidz",  icon: "📖", label: "Tahfidz Tracker",
    desc: "Catat ziyadah & murojaah santri. Tracking progress hafalan 30 juz.",
    color: "#1f6b43", badge: null,
  },
  {
    href: "/keuangan", icon: "💰", label: "Keuangan & SPP",
    desc: "Kelola tagihan, catat pembayaran, laporan cashflow bulanan.",
    color: "#245f82", badge: null,
  },
  {
    href: "/asrama",   icon: "🛏️", label: "Asrama & Kamar",
    desc: "Penempatan santri, data kamar, kapasitas hunian real-time.",
    color: "#7a5b2f", badge: null,
  },
  {
    href: "/izin",     icon: "📝", label: "Perizinan Santri",
    desc: "Proses pengajuan izin, approval/reject, riwayat keluar-masuk.",
    color: "#4c4383", badge: "pending",
  },
  {
    href: "/hr",       icon: "👥", label: "SDM & Kepegawaian",
    desc: "Data asatidz & staff, jabatan, gaji, status kepegawaian.",
    color: "#8f3e58", badge: null,
  },
  {
    href: "/ppdb",     icon: "📋", label: "PPDB / Pendaftaran",
    desc: "Monitor pendaftar baru, status seleksi, intake santri.",
    color: "#2e5b67", badge: null,
  },
  {
    href: "/website",  icon: "📰", label: "Konten Website",
    desc: "Kelola profil, pengumuman, galeri, dan kalender kegiatan publik.",
    color: "#185637", badge: null,
  },
  {
    href: "/dashboard", icon: "📊", label: "ERP Dashboard",
    desc: "Command center: KPI lintas modul, sistem monitoring, laporan.",
    color: "#1f577a", badge: null,
  },
  {
    href: "/wali",     icon: "👨‍👩‍👧", label: "Portal Wali",
    desc: "Akses data santri untuk wali — absensi, tahfidz, keuangan.",
    color: "#5b4a31", badge: null,
  },
];

const QUICK_ACTIONS = [
  { href: "/administrasi-santri", label: "+ Tambah Santri",  icon: "🧾" },
  { href: "/tahfidz",  label: "+ Catat Tahfidz",  icon: "📖" },
  { href: "/izin",     label: "+ Ajukan Izin",     icon: "📝" },
  { href: "/keuangan", label: "+ Input Tagihan",   icon: "💰" },
  { href: "/hr",       label: "+ Tambah Staff",    icon: "👥" },
  { href: "/asrama",   label: "+ Tambah Kamar",    icon: "🛏️" },
  { href: "/ppdb",     label: "+ Daftar Santri",   icon: "📋" },
];

export default function StaffPage() {
  const [summary, setSummary] = useState({ students: 0, staff: 0, pendingPermits: 0, unpaidBilling: 0 });
  const [loading, setLoading]  = useState(false);
  const [apiOk, setApiOk]      = useState(false);
  const [lastSync, setLastSync] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const [health, studRes, staffRes, permitRes, billingRes] = await Promise.all([
        fetchApi("/api/health"),
        fetchApi("/api/students"),
        fetchApi("/api/staff"),
        fetchApi("/api/permits"),
        fetchApi("/api/billing"),
      ]);
      setApiOk(health.ok);
      const permits = Array.isArray(permitRes.data) ? permitRes.data : [];
      const billing = Array.isArray(billingRes.data) ? billingRes.data : [];
      setSummary({
        students: Array.isArray(studRes.data) ? studRes.data.length : 0,
        staff:    Array.isArray(staffRes.data) ? staffRes.data.filter(s => s.status === "aktif").length : 0,
        pendingPermits: permits.filter(p => p.status === "pending").length,
        unpaidBilling:  billing.filter(b => b.status !== "paid").length,
      });
      setLastSync(new Date().toLocaleTimeString("id-ID"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(140deg, #0f3d25 0%, #1f6b43 55%, #2a8a57 100%)",
        color: "#fff", padding: "1.8rem 1.5rem", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.07), transparent 55%)", pointerEvents: "none" }} />
        <p style={{
          display: "inline-flex", gap: "0.4rem", alignItems: "center",
          background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "999px", padding: "0.25rem 0.65rem",
          fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.65rem", color: "#d6f5e3",
        }}>⚙️ Staff Dashboard</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3.5vw, 2rem)", margin: "0 0 0.3rem" }}>
          Pusat Operasional Pesantren
        </h1>
        <p style={{ margin: "0 0 1.1rem", color: "rgba(255,255,255,0.82)", fontSize: "0.9rem", maxWidth: "500px" }}>
          Navigasi cepat ke semua modul ERP. Monitoring status operasional harian pesantren.
        </p>
        <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{
            display: "inline-flex", gap: "0.35rem", alignItems: "center",
            background: apiOk ? "rgba(50,220,100,0.2)" : "rgba(220,50,50,0.2)",
            border: `1px solid ${apiOk ? "rgba(50,220,100,0.4)" : "rgba(220,50,50,0.4)"}`,
            borderRadius: "999px", padding: "0.25rem 0.65rem",
            fontSize: "0.75rem", fontWeight: 700, color: apiOk ? "#a7f3c4" : "#ffb3b3",
          }}>● {apiOk ? "API Normal" : "API Offline"}</span>
          {lastSync && <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.6)" }}>Sync: {lastSync}</span>}
          <button type="button" onClick={load} disabled={loading} style={{
            background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff", borderRadius: "0.6rem", padding: "0.3rem 0.7rem",
            fontSize: "0.78rem", fontWeight: 700, cursor: "pointer",
          }}>{loading ? "⟳..." : "⟳ Refresh"}</button>
        </div>
      </section>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0.7rem", padding: "0.85rem 1.25rem 0" }}>
        {[
          { icon: "🧑‍🎓", label: "Total Santri",     value: loading ? "…" : summary.students,       color: "#1f6b43" },
          { icon: "👥",   label: "Staff Aktif",      value: loading ? "…" : summary.staff,          color: "#245f82" },
          { icon: "📝",   label: "Izin Menunggu",    value: loading ? "…" : summary.pendingPermits, color: summary.pendingPermits > 0 ? "#a15d06" : "#187548" },
          { icon: "💳",   label: "Tagihan Belum Lunas", value: loading ? "…" : summary.unpaidBilling, color: summary.unpaidBilling > 5 ? "#b23a2f" : "#187548" },
        ].map(kpi => (
          <div key={kpi.label} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "0.85rem 1rem", boxShadow: "var(--card-shadow)" }}>
            <p style={{ margin: "0 0 0.25rem", fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{kpi.icon} {kpi.label}</p>
            <p style={{ margin: 0, fontSize: "1.7rem", fontWeight: 800, color: kpi.color, lineHeight: 1 }}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <section style={{ padding: "0.85rem 1.25rem 0" }}>
        <h2 style={{ margin: "0 0 0.55rem", fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Aksi Cepat
        </h2>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {QUICK_ACTIONS.map(a => (
            <Link key={a.href} href={a.href} style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              padding: "0.45rem 0.85rem", borderRadius: "0.65rem",
              border: "1px solid var(--line)", background: "var(--surface)",
              color: "var(--text)", textDecoration: "none", fontSize: "0.83rem", fontWeight: 700,
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              transition: "transform 160ms ease, border-color 160ms ease",
            }}>
              {a.icon} {a.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Alerts */}
      {(summary.pendingPermits > 0 || summary.unpaidBilling > 3) && (
        <div style={{ padding: "0.85rem 1.25rem 0", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {summary.pendingPermits > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.55rem 0.85rem", borderRadius: "0.65rem", background: "var(--warn-bg)", color: "var(--warn-fg)", border: "1px solid rgba(161,93,6,0.2)", fontSize: "0.85rem", fontWeight: 600 }}>
              ⚠️ <span>{summary.pendingPermits} izin santri menunggu persetujuan Mudir Aam</span>
              <Link href="/izin" style={{ marginLeft: "auto", color: "var(--warn-fg)", textDecoration: "underline", fontWeight: 800, fontSize: "0.78rem" }}>Proses →</Link>
            </div>
          )}
          {summary.unpaidBilling > 3 && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.55rem 0.85rem", borderRadius: "0.65rem", background: "var(--danger-bg)", color: "var(--danger-fg)", border: "1px solid rgba(178,58,47,0.2)", fontSize: "0.85rem", fontWeight: 600 }}>
              💳 <span>{summary.unpaidBilling} tagihan SPP belum dilunasi bulan ini</span>
              <Link href="/keuangan" style={{ marginLeft: "auto", color: "var(--danger-fg)", textDecoration: "underline", fontWeight: 800, fontSize: "0.78rem" }}>Lihat →</Link>
            </div>
          )}
        </div>
      )}

      {/* Module grid */}
      <section style={{ padding: "0.85rem 1.25rem 2rem" }}>
        <h2 style={{ margin: "0 0 0.65rem", fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Semua Modul ERP
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "0.8rem" }}>
          {MODULES.map(mod => {
            const badgeCount = mod.badge === "pending" ? summary.pendingPermits : 0;
            return (
              <Link key={mod.href} href={mod.href} style={{
                display: "flex", flexDirection: "column", gap: "0.55rem",
                background: "var(--surface)", border: "1px solid var(--line)",
                borderRadius: "var(--radius-md)", padding: "1.1rem",
                textDecoration: "none", color: "var(--text)",
                boxShadow: "var(--card-shadow)",
                transition: "transform 180ms ease, border-color 180ms ease",
                position: "relative",
              }}>
                {badgeCount > 0 && (
                  <span style={{
                    position: "absolute", top: "0.6rem", right: "0.6rem",
                    background: "var(--warn)", color: "#fff",
                    borderRadius: "999px", padding: "0.1rem 0.45rem",
                    fontSize: "0.68rem", fontWeight: 900,
                  }}>{badgeCount}</span>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{
                    width: "2.6rem", height: "2.6rem", borderRadius: "0.7rem",
                    background: `${mod.color}18`, border: `1px solid ${mod.color}38`,
                    display: "grid", placeItems: "center", fontSize: "1.15rem", flexShrink: 0,
                  }}>{mod.icon}</span>
                  <strong style={{ fontSize: "0.93rem", lineHeight: 1.3 }}>{mod.label}</strong>
                </div>
                <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{mod.desc}</p>
                <span style={{ fontSize: "0.76rem", color: mod.color, fontWeight: 700, marginTop: "auto" }}>Buka modul →</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

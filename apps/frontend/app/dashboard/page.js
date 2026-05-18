"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SummaryCard from "../../components/dashboard/SummaryCard";
import ChartWidget from "../../components/dashboard/ChartWidget";
import WidgetErrorBoundary from "../../components/dashboard/WidgetErrorBoundary";
import { fetchApi } from "../../lib/api-client";
import { ROLE_LABEL, canAccessPath, normalizeRole } from "../../lib/rbac";
import { readRole } from "../../lib/session";

const MODULE_LINKS = [
  { href: "/staff", icon: "⚙️", label: "Staff Ops", color: "#1f6b43" },
  { href: "/keuangan", icon: "💰", label: "Keuangan", color: "#245f82" },
  { href: "/tahfidz", icon: "📖", label: "Tahfidz", color: "#7a5b2f" },
  { href: "/asrama", icon: "🛏️", label: "Asrama", color: "#4c4383" },
  { href: "/izin", icon: "📝", label: "Perizinan", color: "#8f3e58" },
  { href: "/hr", icon: "👥", label: "SDM / HR", color: "#2e5b67" },
  { href: "/ppdb", icon: "📋", label: "PPDB", color: "#1f577a" },
  { href: "/website", icon: "📰", label: "Website", color: "#185637" },
  { href: "/wali", icon: "👨‍👩‍👧", label: "Portal Wali", color: "#5b4a31" }
];

function formatCurrency(value) {
  return `Rp ${new Intl.NumberFormat("id-ID").format(Number(value || 0))}`;
}

function isRoleIn(role, list) {
  return list.includes(String(role || "").toLowerCase());
}

export default function DashboardPage() {
  const [role, setRole] = useState("umum");
  const [apiOk, setApiOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [payload, setPayload] = useState(null);
  const [lastRefresh, setLastRefresh] = useState("");
  const [pullDistance, setPullDistance] = useState(0);
  const [touchStartY, setTouchStartY] = useState(null);

  async function loadDashboard() {
    setLoading(true);
    setError("");
    const currentRole = normalizeRole(readRole());
    setRole(currentRole);
    try {
      const [healthRes, dashboardRes] = await Promise.all([
        fetchApi("/api/health"),
        fetchApi("/api/dashboard/command-center", {
          headers: {
            "x-role": currentRole
          }
        })
      ]);
      setApiOk(healthRes.ok);

      if (!dashboardRes.ok || !dashboardRes.data?.ok) {
        setPayload(null);
        setError("Gagal memuat dashboard berbasis role.");
        return;
      }
      setPayload(dashboardRes.data);
      setLastRefresh(new Date().toLocaleTimeString("id-ID"));
    } catch {
      setError("Gagal memuat dashboard berbasis role.");
      setPayload(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  function handleTouchStart(event) {
    if (window.scrollY > 0) return;
    setTouchStartY(event.touches?.[0]?.clientY ?? null);
  }
  function handleTouchMove(event) {
    if (touchStartY == null) return;
    const current = event.touches?.[0]?.clientY ?? touchStartY;
    const diff = current - touchStartY;
    if (diff > 0) setPullDistance(Math.min(90, diff));
  }
  function handleTouchEnd() {
    if (pullDistance > 70) loadDashboard();
    setPullDistance(0);
    setTouchStartY(null);
  }

  const panels = payload?.role_panels || {};
  const quickModuleLinks = useMemo(
    () => MODULE_LINKS.filter((item) => canAccessPath(role, item.href)),
    [role]
  );

  const isSuperAdmin = isRoleIn(role, ["superadmin"]);
  const isExecutive = isRoleIn(role, ["pengasuh", "mudir_aam", "kepala_sekolah"]);
  const isFinanceAdmin = isRoleIn(role, ["admin_keuangan", "bendahara"]);
  const isKesantrianAdmin = isRoleIn(role, ["admin_kesantrian", "staff_umum"]);

  const superAdmin = panels.super_admin || { uptime_seconds: 0, total_user_aktif: 0, audit_logs: [], helpdesk: null };
  const executive = panels.executive || {
    active_vs_alumni: { active: 0, alumni: 0 },
    cashflow_monthly: [],
    tahfidz_progress: { total_ziyadah_weekly: 0, average_ziyadah_per_active_student: 0 },
    sdm_attendance: { hadir: 0, izin: 0, sakit: 0, alpa: 0, total_staff: 0 }
  };
  const finance = panels.finance_ops || { due_alerts: [], paid_vs_arrears: { paid: 0, arrears: 0 }, transactions_today: [], quick_actions: [] };
  const kesantrian = panels.kesantrian_ops || { dormitory_occupancy: { capacity_total: 0, occupied_total: 0, available_total: 0, occupancy_rate: 0 }, live_permits: { total_live: 0, items: [] }, top_violations: { items: [] }, ppdb_waiting_list: [] };

  const financeDonut = [
    { label: "Lunas", value: Number(finance.paid_vs_arrears?.paid || 0) },
    { label: "Menunggak", value: Number(finance.paid_vs_arrears?.arrears || 0) }
  ];
  const violationBars = (kesantrian.top_violations?.items || []).map((item) => ({
    label: item.violation_type,
    value: item.total
  }));

  return (
    <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} style={{ paddingBottom: "1rem" }}>
      <section
        style={{
          background: "linear-gradient(140deg, #0f3d25 0%, #1f6b43 55%, #2a8a57 100%)",
          color: "#fff",
          padding: "1.2rem 1rem",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 85% 20%, rgba(255,255,255,0.07), transparent 55%)", pointerEvents: "none" }} />
        <div style={{ transform: pullDistance ? `translateY(${Math.min(20, pullDistance / 5)}px)` : "translateY(0)", transition: "transform 120ms ease" }}>
          <p style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "999px", padding: "0.25rem 0.65rem", fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.6rem", color: "#d6f5e3" }}>
            📊 Dashboard Role-Based ERP
          </p>
          <h1 style={{ margin: "0 0 0.35rem", fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>
            {ROLE_LABEL[role] || role}
          </h1>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.86)", fontSize: "0.86rem" }}>
            Dashboard menyesuaikan role login, hanya menampilkan widget sesuai hak akses.
          </p>
          <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.45rem", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", background: apiOk ? "rgba(50,220,100,0.2)" : "rgba(220,50,50,0.2)", border: `1px solid ${apiOk ? "rgba(50,220,100,0.4)" : "rgba(220,50,50,0.4)"}`, borderRadius: "999px", padding: "0.23rem 0.58rem", fontSize: "0.74rem", fontWeight: 700, color: apiOk ? "#a7f3c4" : "#ffb3b3" }}>
              ● {apiOk ? "Sistem Normal" : "API Bermasalah"}
            </span>
            <button type="button" onClick={loadDashboard} disabled={loading} className="asf-button asf-button-secondary" style={{ padding: "0.22rem 0.64rem", borderRadius: "999px", fontSize: "0.76rem" }}>
              {loading ? "⟳ Sinkron..." : "⟳ Sinkronkan Data"}
            </button>
          </div>
          {lastRefresh ? (
            <p style={{ margin: "0.55rem 0 0", fontSize: "0.7rem", color: "rgba(255,255,255,0.65)" }}>
              Update terakhir: {lastRefresh} WIB
            </p>
          ) : null}
        </div>
      </section>

      {error ? (
        <section style={{ padding: "0.75rem 1rem 0" }}>
          <p className="asf-error-box">{error}</p>
        </section>
      ) : null}

      <section style={{ padding: "0.75rem 1rem 0" }}>
        <h2 style={{ margin: "0 0 0.55rem", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Quick Action Modul
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))", gap: "0.5rem" }}>
          {quickModuleLinks.map((item) => (
            <Link key={item.href} href={item.href} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem", padding: "0.68rem 0.45rem", borderRadius: "0.78rem", border: "1px solid var(--line)", background: "var(--surface)", textDecoration: "none", color: "var(--text)" }}>
              <span style={{ width: "2.1rem", height: "2.1rem", borderRadius: "0.58rem", background: `${item.color}20`, border: `1px solid ${item.color}3a`, display: "grid", placeItems: "center" }}>
                {item.icon}
              </span>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, textAlign: "center", lineHeight: 1.2 }}>{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ padding: "0.75rem 1rem 0", display: "grid", gap: "0.7rem" }}>
        {isSuperAdmin ? (
          <WidgetErrorBoundary title="Super Admin Command Center">
            <div style={{ display: "grid", gap: "0.7rem" }}>
              <div style={{ display: "grid", gap: "0.6rem", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
                <SummaryCard title="Uptime Sistem" value={`${superAdmin.uptime_seconds}s`} icon="🖥️" subtitle="Kesehatan infrastruktur" tone="info" />
                <SummaryCard title="Total User Aktif" value={superAdmin.total_user_aktif} icon="👥" subtitle="Pengguna aktif saat ini" tone="success" />
              </div>
              <article className="asf-card" style={{ padding: "0.95rem" }}>
                <h3 style={{ margin: 0, fontSize: "0.92rem" }}>Audit Log Terakhir</h3>
                <p style={{ margin: "0.28rem 0 0.5rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  5 aktivitas login/modifikasi terakhir
                </p>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem" }}>
                    <thead>
                      <tr>
                        <th align="left" style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>Waktu</th>
                        <th align="left" style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>Actor</th>
                        <th align="left" style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>Event</th>
                        <th align="left" style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>Route</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(superAdmin.audit_logs || []).map((row) => (
                        <tr key={row.id}>
                          <td style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>{String(row.at || "").slice(11, 19)}</td>
                          <td style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>{row.actor}</td>
                          <td style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>{row.event}</td>
                          <td style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>{row.route || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
              <article className="asf-card" style={{ padding: "0.95rem", background: "var(--surface-muted)" }}>
                <p style={{ margin: 0, fontSize: "0.82rem", fontWeight: 700 }}>IT Support Desk</p>
                <p style={{ margin: "0.22rem 0 0", fontSize: "0.86rem" }}>
                  Kontak bantuan teknis operasional: <strong>{superAdmin.helpdesk?.phone || "+6283851114491"}</strong>
                </p>
              </article>
            </div>
          </WidgetErrorBoundary>
        ) : null}

        {isExecutive ? (
          <WidgetErrorBoundary title="Executive KPI">
            <div style={{ display: "grid", gap: "0.7rem" }}>
              <div style={{ display: "grid", gap: "0.6rem", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
                <SummaryCard title="Santri Aktif" value={executive.active_vs_alumni?.active || 0} icon="🧑‍🎓" tone="success" />
                <SummaryCard title="Alumni" value={executive.active_vs_alumni?.alumni || 0} icon="🎓" />
                <SummaryCard title="Rata-rata Ziyadah" value={executive.tahfidz_progress?.average_ziyadah_per_active_student || 0} icon="📖" subtitle="Minggu ini / santri aktif" tone="info" />
                <SummaryCard title="Kehadiran SDM" value={`${executive.sdm_attendance?.hadir || 0}/${executive.sdm_attendance?.total_staff || 0}`} icon="👥" subtitle="Hadir / Total SDM" />
              </div>
              <ChartWidget
                title="Cashflow Pesantren Bulan Ini"
                subtitle="Pemasukan vs Pengeluaran"
                type="bar"
                data={(executive.cashflow_monthly || []).map((item) => ({ label: item.label, value: item.value }))}
                xKey="label"
                yKey="value"
              />
            </div>
          </WidgetErrorBoundary>
        ) : null}

        {isFinanceAdmin ? (
          <WidgetErrorBoundary title="Operasional Keuangan">
            <div style={{ display: "grid", gap: "0.7rem" }}>
              <article className="asf-card" style={{ padding: "0.95rem" }}>
                <h3 style={{ margin: 0, fontSize: "0.92rem" }}>Alert Tagihan Jatuh Tempo Minggu Ini</h3>
                <div style={{ marginTop: "0.45rem", display: "grid", gap: "0.4rem" }}>
                  {(finance.due_alerts || []).slice(0, 6).map((item) => (
                    <div key={item.id} style={{ border: "1px solid var(--line)", borderRadius: "0.62rem", padding: "0.45rem 0.55rem", background: "var(--surface-muted)" }}>
                      <p style={{ margin: 0, fontSize: "0.8rem", fontWeight: 700 }}>Santri #{item.student_id} · {item.status}</p>
                      <p style={{ margin: "0.15rem 0 0", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        Tagihan: {formatCurrency(item.amount)} · Jatuh tempo: {item.due_date}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <div style={{ display: "grid", gap: "0.7rem", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
                <ChartWidget
                  title="Lunas vs Menunggak"
                  subtitle="Persentase bulan berjalan"
                  type="donut"
                  data={financeDonut}
                  xKey="label"
                  dataKey="value"
                />

                <article className="asf-card" style={{ padding: "0.95rem" }}>
                  <h3 style={{ margin: 0, fontSize: "0.92rem" }}>Quick Action</h3>
                  <div style={{ marginTop: "0.55rem", display: "grid", gap: "0.45rem" }}>
                    {(finance.quick_actions || []).map((action) => (
                      <Link key={action.href} href={action.href} className="asf-button asf-button-secondary" style={{ justifyContent: "center" }}>
                        {action.label}
                      </Link>
                    ))}
                  </div>
                </article>
              </div>

              <article className="asf-card" style={{ padding: "0.95rem" }}>
                <h3 style={{ margin: 0, fontSize: "0.92rem" }}>Transaksi Hari Ini</h3>
                <div style={{ overflowX: "auto", marginTop: "0.5rem" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem" }}>
                    <thead>
                      <tr>
                        <th align="left" style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>Jam</th>
                        <th align="left" style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>Santri</th>
                        <th align="left" style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>Status</th>
                        <th align="left" style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>Nominal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(finance.transactions_today || []).map((row) => (
                        <tr key={row.id}>
                          <td style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>{String(row.paid_at || "").slice(11, 16)}</td>
                          <td style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>#{row.student_id}</td>
                          <td style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>{row.status}</td>
                          <td style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>{formatCurrency(row.paid_amount || row.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            </div>
          </WidgetErrorBoundary>
        ) : null}

        {isKesantrianAdmin ? (
          <WidgetErrorBoundary title="Operasional Kesantrian">
            <div style={{ display: "grid", gap: "0.7rem" }}>
              <article className="asf-card" style={{ padding: "0.95rem" }}>
                <h3 style={{ margin: 0, fontSize: "0.92rem" }}>Kapasitas vs Keterisian Asrama</h3>
                <p style={{ margin: "0.25rem 0 0.5rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  Terisi {kesantrian.dormitory_occupancy?.occupied_total || 0} dari {kesantrian.dormitory_occupancy?.capacity_total || 0} kapasitas
                </p>
                <div style={{ height: "10px", borderRadius: "999px", background: "var(--surface-muted)", overflow: "hidden" }}>
                  <div style={{ width: `${Math.max(0, Math.min(100, kesantrian.dormitory_occupancy?.occupancy_rate || 0))}%`, height: "100%", background: "var(--accent)", transition: "width 280ms ease" }} />
                </div>
              </article>

              <article className="asf-card" style={{ padding: "0.95rem" }}>
                <h3 style={{ margin: 0, fontSize: "0.92rem" }}>Live Tracker Perizinan</h3>
                <p style={{ margin: "0.25rem 0 0.5rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  Santri izin/keluar yang belum kembali: {kesantrian.live_permits?.total_live || 0}
                </p>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem" }}>
                    <thead>
                      <tr>
                        <th align="left" style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>Santri</th>
                        <th align="left" style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>Jenis</th>
                        <th align="left" style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>Status</th>
                        <th align="left" style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>Periode</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(kesantrian.live_permits?.items || []).slice(0, 7).map((row) => (
                        <tr key={row.id}>
                          <td style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>#{row.student_id}</td>
                          <td style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>{row.permit_type}</td>
                          <td style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>{row.status}</td>
                          <td style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>
                            {String(row.start_date).slice(0, 10)} - {String(row.end_date).slice(0, 10)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <ChartWidget
                title="Top 5 Pelanggaran Bulan Ini"
                subtitle="Evaluasi takzir dan ketertiban santri"
                type="bar"
                data={violationBars}
                xKey="label"
                yKey="value"
              />

              <article className="asf-card" style={{ padding: "0.95rem" }}>
                <h3 style={{ margin: 0, fontSize: "0.92rem" }}>Calon Santri Menunggu Verifikasi/Penempatan</h3>
                <div style={{ overflowX: "auto", marginTop: "0.5rem" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem" }}>
                    <thead>
                      <tr>
                        <th align="left" style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>Nama</th>
                        <th align="left" style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>Wali</th>
                        <th align="left" style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>Status</th>
                        <th align="left" style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>Masuk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(kesantrian.ppdb_waiting_list || []).map((row) => (
                        <tr key={row.id}>
                          <td style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>{row.student_name}</td>
                          <td style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>{row.guardian_name || "-"}</td>
                          <td style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>{row.status}</td>
                          <td style={{ padding: "0.35rem 0.25rem", borderBottom: "1px solid var(--line)" }}>{String(row.created_at || "").slice(0, 10)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            </div>
          </WidgetErrorBoundary>
        ) : null}

        {!isSuperAdmin && !isExecutive && !isFinanceAdmin && !isKesantrianAdmin ? (
          <article className="asf-card">
            <p style={{ margin: 0, color: "var(--text-muted)" }}>
              Tidak ada layout dashboard khusus untuk role ini.
            </p>
          </article>
        ) : null}
      </section>
    </div>
  );
}

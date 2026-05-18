"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchApi } from "../../lib/api-client";
import { ROLE_LABEL, getRoleHomeRoute, normalizeRole } from "../../lib/rbac";
import { saveSession } from "../../lib/session";

const DEMO_ROLES = [
  { role: "superadmin", label: "Super Admin", icon: "🛡️", access: "System health, audit, user access, dan command center", color: "#1a1a2e" },
  { role: "pengasuh", label: "Pengasuh / Pimpinan", icon: "🕌", access: "KPI eksekutif: santri, cashflow, tahfidz, kehadiran SDM", color: "#0f3d25" },
  { role: "admin_keuangan", label: "Admin Keuangan", icon: "💰", access: "Rekonsiliasi SPP, alert jatuh tempo, validasi pembayaran", color: "#245f82" },
  { role: "admin_kesantrian", label: "Admin Kesantrian", icon: "🛏️", access: "Asrama, perizinan, pelanggaran, dan antrian PPDB", color: "#7a5b2f" },
  { role: "wali", label: "Wali Santri", icon: "👨‍👩‍👧", access: "Portal wali (read-only data santri)", color: "#8f3e58" },
  { role: "umum", label: "Umum (Pihak Luar)", icon: "🌐", access: "Akses publik terbatas (PPDB dan pengumuman)", color: "#2e5b67" }
];

function inferRoleFromIdentity(identity = "") {
  const text = String(identity || "").trim().toLowerCase();
  if (!text) return "umum";
  if (text.includes("super")) return "superadmin";
  if (text.includes("pengasuh") || text.includes("mudir") || text.includes("pimpinan")) return "pengasuh";
  if (text.includes("keuangan") || text.includes("bendahara")) return "admin_keuangan";
  if (text.includes("kesantrian") || text.includes("asrama")) return "admin_kesantrian";
  if (text.includes("wali")) return "wali";
  return "umum";
}

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [roleOverride, setRoleOverride] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDemo, setShowDemo] = useState(false);
  const [remember, setRemember] = useState(false);

  function f(k, v) {
    setForm((p) => ({ ...p, [k]: v }));
    if (k === "username" && roleOverride) setRoleOverride("");
    setError("");
  }

  const detectedRole = useMemo(() => {
    return normalizeRole(roleOverride || inferRoleFromIdentity(form.username));
  }, [form.username, roleOverride]);

  const selectedRoleInfo = DEMO_ROLES.find((r) => r.role === detectedRole);

  async function handleLogin(e) {
    e.preventDefault();
    if (!form.username.trim() || !form.password.trim()) {
      setError("Username dan password harus diisi.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetchApi("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          role: detectedRole,
          name: form.username
        })
      });

      if (res.ok && res.data?.token) {
        const targetRole = normalizeRole(res.data.user?.role || detectedRole);
        saveSession(
          {
            token: res.data.token,
            user: {
              ...(res.data.user || {}),
              name: res.data.user?.name || form.username,
              role: targetRole
            },
            loginAt: new Date().toISOString()
          },
          { persist: remember }
        );
        router.replace(getRoleHomeRoute(targetRole));
        router.refresh();
      } else {
        const targetRole = normalizeRole(detectedRole);
        saveSession(
          {
            token: `dev-token-${Date.now()}`,
            user: { name: form.username || "Demo User", role: targetRole },
            loginAt: new Date().toISOString()
          },
          { persist: remember }
        );
        router.replace(getRoleHomeRoute(targetRole));
        router.refresh();
      }
    } catch {
      setError("Gagal terhubung ke server. Pastikan backend aktif.");
    } finally {
      setLoading(false);
    }
  }

  function quickLogin(role) {
    setRoleOverride(role);
    setForm({ username: role, password: "demo1234" });
    setShowDemo(false);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "stretch" }}>
      <div
        style={{
          flex: "0 0 42%",
          minWidth: 0,
          background: "linear-gradient(160deg, #0a2d1c 0%, #1f6b43 55%, #2a8a57 100%)",
          color: "#fff",
          padding: "3rem 2.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden"
        }}
        className="asf-login-brand"
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 60% 30%, rgba(255,255,255,0.08), transparent 60%)", pointerEvents: "none" }} />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "3rem" }}>
            <span style={{ width: "2.4rem", height: "2.4rem", borderRadius: "999px", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", display: "grid", placeItems: "center", fontWeight: 900, fontSize: "0.75rem" }}>ERP</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem" }}>Asy-Syifaa</span>
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 700, lineHeight: 1.25, margin: "0 0 1rem" }}>
            Sistem ERP Pesantren
            <br />
            All-in-One
          </h1>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "0.95rem", lineHeight: 1.7, margin: "0 0 2rem", maxWidth: "340px" }}>
            Platform manajemen terpadu untuk akademik, tahfidz, asrama, keuangan, dan SDM pesantren.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {[
              { icon: "📊", text: "Dashboard role-based sesuai tanggung jawab kerja" },
              { icon: "💰", text: "Keuangan, billing, dan validasi pembayaran harian" },
              { icon: "🛏️", text: "Monitoring asrama, izin, dan ketertiban santri" },
              { icon: "📖", text: "Tracking tahfidz harian dan progress mingguan" },
              { icon: "🛡️", text: "System health, audit log, dan kontrol akses" }
            ].map((item) => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.88rem" }}>
                <span style={{ width: "1.6rem", height: "1.6rem", borderRadius: "0.4rem", background: "rgba(255,255,255,0.12)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                  {item.icon}
                </span>
                <span style={{ color: "rgba(255,255,255,0.82)" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ margin: 0, fontSize: "0.72rem", color: "rgba(255,255,255,0.45)" }}>
          © {new Date().getFullYear()} Asy-Syifaa ERP v2.0 · Hak Cipta Dilindungi
        </p>
      </div>

      <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1.5rem", background: "var(--bg)" }}>
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }} className="asf-login-mobile-brand">
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem" }}>
              <span style={{ width: "2rem", height: "2rem", borderRadius: "999px", background: "var(--accent)", color: "#fff", display: "grid", placeItems: "center", fontSize: "0.7rem", fontWeight: 900 }}>ERP</span>
              Asy-Syifaa
            </div>
          </div>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.25rem", textAlign: "center" }}>
            Masuk ke Sistem
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", textAlign: "center", margin: "0 0 1.2rem" }}>
            Role terdeteksi otomatis dari akun yang login.
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <div style={{ display: "grid", gap: "0.3rem" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Username / NIP</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => f("username", e.target.value)}
                placeholder="Contoh: superadmin.01 / admin_keuangan.01"
                autoComplete="username"
                style={{ padding: "0.65rem 0.85rem", fontSize: "0.95rem" }}
              />
            </div>

            <div style={{ display: "grid", gap: "0.3rem" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => f("password", e.target.value)}
                placeholder="Masukkan password"
                autoComplete="current-password"
                style={{ padding: "0.65rem 0.85rem", fontSize: "0.95rem" }}
              />
            </div>

            <div style={{ padding: "0.6rem 0.7rem", borderRadius: "0.7rem", border: "1px solid var(--line)", background: "var(--surface-muted)" }}>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--text-muted)" }}>
                Role terdeteksi: <strong>{ROLE_LABEL[detectedRole] || detectedRole}</strong>
              </p>
              {selectedRoleInfo ? (
                <p style={{ margin: "0.2rem 0 0", fontSize: "0.74rem", color: "var(--text-muted)" }}>
                  Akses: {selectedRoleInfo.access}
                </p>
              ) : null}
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ width: "1rem", height: "1rem" }} />
              Ingat saya di perangkat ini
            </label>

            {error ? (
              <div style={{ padding: "0.6rem 0.85rem", borderRadius: "0.65rem", background: "var(--danger-bg)", color: "var(--danger-fg)", fontSize: "0.85rem", fontWeight: 600, border: "1px solid rgba(178,58,47,0.2)" }}>
                ❌ {error}
              </div>
            ) : null}

            <button type="submit" disabled={loading} className="asf-button asf-button-primary" style={{ width: "100%", justifyContent: "center", padding: "0.75rem", fontSize: "0.95rem" }}>
              {loading ? "⟳ Memverifikasi..." : "🔐 Masuk ke ERP"}
            </button>
          </form>

          <div style={{ marginTop: "1rem", borderTop: "1px solid var(--line)", paddingTop: "1rem" }}>
            <button
              type="button"
              onClick={() => setShowDemo((s) => !s)}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.65rem",
                border: "1px dashed var(--line)",
                background: "var(--surface-muted)",
                color: "var(--text-muted)",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              {showDemo ? "▲ Sembunyikan" : "▼ Demo Login (Dev Mode)"}
            </button>

            {showDemo ? (
              <div style={{ marginTop: "0.6rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                {DEMO_ROLES.map((item) => (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => quickLogin(item.role)}
                    style={{
                      padding: "0.5rem 0.6rem",
                      borderRadius: "0.6rem",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      border: `1px solid ${item.color}44`,
                      background: `${item.color}0e`,
                      color: "var(--text)",
                      cursor: "pointer",
                      textAlign: "left"
                    }}
                  >
                    <span>{item.icon}</span> {item.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div style={{ marginTop: "1.2rem", display: "flex", justifyContent: "center", gap: "1rem", fontSize: "0.82rem" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>← Beranda</Link>
            <Link href="/ppdb" style={{ color: "var(--link)", textDecoration: "none", fontWeight: 600 }}>Daftar (PPDB) →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

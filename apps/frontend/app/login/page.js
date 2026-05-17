"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchApi } from "../../lib/api-client";

const DEMO_ROLES = [
  { role: "superadmin",    label: "Super Admin",     icon: "🛡️", access: "Akses sistem penuh: user management, konfigurasi, audit log", color: "#1a1a2e" },
  { role: "mudir_aam",     label: "Mudir Aam",       icon: "🕌", access: "Akses penuh semua modul + approval izin",                    color: "#0f3d25" },
  { role: "ustadz",        label: "Ustadz",          icon: "📖", access: "Tahfidz, Akademik, Absensi",                                 color: "#1f6b43" },
  { role: "bendahara",     label: "Bendahara",       icon: "💰", access: "Keuangan, Laporan, SPP",                                     color: "#245f82" },
  { role: "kepala_sekolah",label: "Kepala Sekolah",  icon: "🎓", access: "Akademik, SDM, Dashboard",                                   color: "#4c4383" },
  { role: "staff_umum",    label: "Staff Umum",      icon: "👤", access: "Operasional harian, Asrama, Izin",                           color: "#7a5b2f" },
  { role: "wali",          label: "Wali Santri",     icon: "👨‍👩‍👧", access: "Portal Wali — read-only data santri",                      color: "#8f3e58" },
  { role: "umum",          label: "Umum (Pihak Luar)", icon: "🌐", access: "Akses terbatas: info PPDB dan pelacakan dasar",             color: "#2e5b67" },
];

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm]         = useState({ username: "", password: "", role: "mudir_aam" });
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [showDemo, setShowDemo] = useState(false);
  const [remember, setRemember] = useState(false);

  function f(k, v) { setForm(p => ({ ...p, [k]: v })); setError(""); }

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
        body: JSON.stringify({ username: form.username, password: form.password }),
      });
      if (res.ok && res.data?.token) {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem("asf_session", JSON.stringify({
          token: res.data.token,
          user: res.data.user || { name: form.username, role: form.role },
          loginAt: new Date().toISOString(),
        }));
        const targetRole = res.data.user?.role || form.role;
        if (targetRole === "superadmin") router.push("/superadmin");
        else if (targetRole === "wali") router.push("/wali");
        else if (targetRole === "umum") router.push("/apps");
        else router.push("/dashboard");
      } else {
        // Dev mode: accept any credentials, route by selected role
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem("asf_session", JSON.stringify({
          token: "dev-token-" + Date.now(),
          user: { name: form.username || "Demo User", role: form.role },
          loginAt: new Date().toISOString(),
        }));
        if (form.role === "superadmin") router.push("/superadmin");
        else if (form.role === "wali") router.push("/wali");
        else if (form.role === "umum") router.push("/apps");
        else router.push("/dashboard");
      }
    } catch {
      setError("Gagal terhubung ke server. Pastikan backend aktif.");
    } finally {
      setLoading(false);
    }
  }

  function quickLogin(role) {
    setForm({ username: role, password: "demo1234", role });
    setShowDemo(false);
  }

  const selectedRoleInfo = DEMO_ROLES.find(r => r.role === form.role);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "stretch" }}>
      {/* Left panel — branding */}
      <div style={{
        flex: "0 0 42%", minWidth: 0,
        background: "linear-gradient(160deg, #0a2d1c 0%, #1f6b43 55%, #2a8a57 100%)",
        color: "#fff", padding: "3rem 2.5rem",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        position: "relative", overflow: "hidden",
      }} className="asf-login-brand">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 60% 30%, rgba(255,255,255,0.08), transparent 60%)", pointerEvents: "none" }} />

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "3rem" }}>
            <span style={{
              width: "2.4rem", height: "2.4rem", borderRadius: "999px",
              background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)",
              display: "grid", placeItems: "center", fontWeight: 900, fontSize: "0.75rem",
            }}>ERP</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem" }}>Asy-Syifaa</span>
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 700, lineHeight: 1.25, margin: "0 0 1rem" }}>
            Sistem ERP Pesantren<br />All-in-One
          </h1>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "0.95rem", lineHeight: 1.7, margin: "0 0 2rem", maxWidth: "340px" }}>
            Platform manajemen terpadu untuk akademik, tahfidz, asrama, keuangan, dan SDM pesantren.
          </p>

          {/* Feature list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {[
              { icon: "📖", text: "Tracking tahfidz ziyadah & murojaah" },
              { icon: "💰", text: "Manajemen billing & cashflow" },
              { icon: "🛏️", text: "Asrama & penempatan santri" },
              { icon: "📊", text: "Dashboard KPI lintas modul" },
              { icon: "🔐", text: "RBAC multi-role yang aman" },
            ].map(f => (
              <div key={f.text} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.88rem" }}>
                <span style={{
                  width: "1.6rem", height: "1.6rem", borderRadius: "0.4rem",
                  background: "rgba(255,255,255,0.12)", display: "grid", placeItems: "center", flexShrink: 0,
                }}>{f.icon}</span>
                <span style={{ color: "rgba(255,255,255,0.82)" }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ margin: 0, fontSize: "0.72rem", color: "rgba(255,255,255,0.45)" }}>
          © {new Date().getFullYear()} Asy-Syifaa ERP v2.0 · Hak Cipta Dilindungi
        </p>
      </div>

      {/* Right panel — login form */}
      <div style={{
        flex: 1, minWidth: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "2rem 1.5rem", background: "var(--bg)",
      }}>
        <div style={{ width: "100%", maxWidth: "400px" }}>
          {/* Mobile brand */}
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }} className="asf-login-mobile-brand">
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem" }}>
              <span style={{ width: "2rem", height: "2rem", borderRadius: "999px", background: "var(--accent)", color: "#fff", display: "grid", placeItems: "center", fontSize: "0.7rem", fontWeight: 900 }}>ERP</span>
              Asy-Syifaa
            </div>
          </div>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.25rem", textAlign: "center" }}>
            Masuk ke Sistem
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", textAlign: "center", margin: "0 0 1.5rem" }}>
            Login menggunakan akun yang diberikan administrator.
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {/* Username */}
            <div style={{ display: "grid", gap: "0.3rem" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Username / NIP</label>
              <input
                type="text" value={form.username} onChange={e => f("username", e.target.value)}
                placeholder="Masukkan username" autoComplete="username"
                style={{ padding: "0.65rem 0.85rem", fontSize: "0.95rem" }}
              />
            </div>

            {/* Password */}
            <div style={{ display: "grid", gap: "0.3rem" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Password</label>
              <input
                type="password" value={form.password} onChange={e => f("password", e.target.value)}
                placeholder="Masukkan password" autoComplete="current-password"
                style={{ padding: "0.65rem 0.85rem", fontSize: "0.95rem" }}
              />
            </div>

            {/* Role selector */}
            <div style={{ display: "grid", gap: "0.3rem" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Login Sebagai</label>
              <select value={form.role} onChange={e => f("role", e.target.value)} style={{ padding: "0.65rem 0.85rem", fontSize: "0.92rem" }}>
                {DEMO_ROLES.map(r => <option key={r.role} value={r.role}>{r.icon} {r.label}</option>)}
              </select>
              {selectedRoleInfo && (
                <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Akses: {selectedRoleInfo.access}
                </p>
              )}
            </div>

            {/* Remember me */}
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ width: "1rem", height: "1rem" }} />
              Ingat saya di perangkat ini
            </label>

            {/* Error */}
            {error && (
              <div style={{ padding: "0.6rem 0.85rem", borderRadius: "0.65rem", background: "var(--danger-bg)", color: "var(--danger-fg)", fontSize: "0.85rem", fontWeight: 600, border: "1px solid rgba(178,58,47,0.2)" }}>
                ❌ {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading} className="asf-button asf-button-primary" style={{ width: "100%", justifyContent: "center", padding: "0.75rem", fontSize: "0.95rem" }}>
              {loading ? "⟳ Memverifikasi..." : "🔐 Masuk ke ERP"}
            </button>
          </form>

          {/* Demo credentials */}
          <div style={{ marginTop: "1rem", borderTop: "1px solid var(--line)", paddingTop: "1rem" }}>
            <button type="button" onClick={() => setShowDemo(s => !s)} style={{
              width: "100%", padding: "0.5rem", borderRadius: "0.65rem",
              border: "1px dashed var(--line)", background: "var(--surface-muted)",
              color: "var(--text-muted)", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer",
            }}>
              {showDemo ? "▲ Sembunyikan" : "▼ Demo Login (Dev Mode)"}
            </button>

            {showDemo && (
              <div style={{ marginTop: "0.6rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                {DEMO_ROLES.map(r => (
                  <button key={r.role} type="button" onClick={() => quickLogin(r.role)} style={{
                    padding: "0.5rem 0.6rem", borderRadius: "0.6rem", fontSize: "0.78rem", fontWeight: 700,
                    border: `1px solid ${r.color}44`, background: `${r.color}0e`,
                    color: "var(--text)", cursor: "pointer", textAlign: "left",
                  }}>
                    <span>{r.icon}</span> {r.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <div style={{ marginTop: "1.2rem", display: "flex", justifyContent: "center", gap: "1rem", fontSize: "0.82rem" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>← Beranda</Link>
            <Link href="/ppdb" style={{ color: "var(--link)", textDecoration: "none", fontWeight: 600 }}>Daftar (PPDB) →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

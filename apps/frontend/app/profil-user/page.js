"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ROLE_OPTIONS = [
  { value: "superadmin", label: "Super Admin" },
  { value: "mudir_aam", label: "Mudir Aam" },
  { value: "ustadz", label: "Ustadz" },
  { value: "ustadzah", label: "Ustadzah" },
  { value: "bendahara", label: "Bendahara" },
  { value: "kepala_sekolah", label: "Kepala Sekolah" },
  { value: "staff_umum", label: "Staff Umum" },
  { value: "wali", label: "Wali Santri" },
  { value: "umum", label: "Umum (Pihak Luar)" }
];

function readSessionWithSource() {
  if (typeof window === "undefined") return { session: null, source: null };
  try {
    const sessionRaw = sessionStorage.getItem("asf_session");
    if (sessionRaw) return { session: JSON.parse(sessionRaw), source: "sessionStorage" };
  } catch (_error) {
    // noop
  }
  try {
    const localRaw = localStorage.getItem("asf_session");
    if (localRaw) return { session: JSON.parse(localRaw), source: "localStorage" };
  } catch (_error) {
    // noop
  }
  return { session: null, source: null };
}

export default function ProfilUserPage() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [storageSource, setStorageSource] = useState(null);
  const [form, setForm] = useState({ name: "", role: "mudir_aam" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const data = readSessionWithSource();
    setSession(data.session);
    setStorageSource(data.source);
    setForm({
      name: data.session?.user?.name || "",
      role: data.session?.user?.role || "mudir_aam"
    });
  }, []);

  function saveProfile(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    const cleanName = form.name.trim();
    if (!cleanName) {
      setError("Nama pengguna wajib diisi.");
      return;
    }
    if (!session) {
      setError("Sesi tidak ditemukan. Silakan login ulang.");
      return;
    }

    const nextSession = {
      ...session,
      user: {
        ...session.user,
        name: cleanName,
        role: form.role
      },
      updatedAt: new Date().toISOString()
    };

    try {
      const targetStorage = storageSource === "sessionStorage" ? sessionStorage : localStorage;
      targetStorage.setItem("asf_session", JSON.stringify(nextSession));
      setSession(nextSession);
      setMessage("Profil berhasil diperbarui.");
    } catch (_error) {
      setError("Gagal menyimpan profil di browser.");
    }
  }

  function logout() {
    try {
      localStorage.removeItem("asf_session");
      sessionStorage.removeItem("asf_session");
    } catch (_error) {
      // noop
    }
    router.replace("/login");
    router.refresh();
  }

  return (
    <main className="asf-container" style={{ paddingBottom: "2rem" }}>
      <section className="asf-card" style={{ marginTop: "1rem" }}>
        <h1>Profil User</h1>
        <p className="asf-muted">Kelola nama, status role aktif, dan keluar dari sesi login.</p>

        {session ? (
          <>
            <form onSubmit={saveProfile} className="asf-form" style={{ marginTop: "0.75rem", maxWidth: "540px" }}>
              <label className="asf-form-label" htmlFor="profile-name">Nama</label>
              <input
                id="profile-name"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Nama pengguna"
              />

              <label className="asf-form-label" htmlFor="profile-role">Status Role Aktif</label>
              <select
                id="profile-role"
                value={form.role}
                onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
              >
                {ROLE_OPTIONS.map((role) => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>

              {message ? <p className="asf-status asf-status-success">{message}</p> : null}
              {error ? <p className="asf-status asf-status-error">{error}</p> : null}

              <div className="asf-actions">
                <button type="submit" className="asf-button asf-button-primary">Simpan Perubahan</button>
                <button type="button" onClick={logout} className="asf-button asf-button-secondary">Logout</button>
              </div>
            </form>

            <div className="asf-grid asf-grid-2" style={{ marginTop: "0.8rem" }}>
              <article className="asf-card">
                <h3>Penyimpanan Sesi</h3>
                <p>{storageSource || "-"}</p>
              </article>
              <article className="asf-card">
                <h3>Token</h3>
                <p style={{ overflowWrap: "anywhere" }}>{session.token || "-"}</p>
              </article>
            </div>
          </>
        ) : (
          <p className="asf-status asf-status-error">Belum ada sesi login. Silakan login dulu.</p>
        )}

        <div className="asf-actions" style={{ marginTop: "0.8rem" }}>
          <Link href="/login" className="asf-button asf-button-primary">Login</Link>
          <Link href="/dashboard" className="asf-button asf-button-secondary">Dashboard Internal</Link>
          <Link href="/" className="asf-button asf-button-secondary">Website</Link>
        </div>
      </section>
    </main>
  );
}

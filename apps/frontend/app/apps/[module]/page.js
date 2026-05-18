"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { MODULE_HOME_PATH, MODULE_LABEL, ROLE_LABEL, canAccessPath, normalizeRole } from "../../../lib/rbac";
import { readRole } from "../../../lib/session";

const MODULE_DETAILS = {
  ppdb: {
    title: "Alur Penerimaan Santri Baru",
    summary: "Kelola pendaftaran awal, antrean verifikasi, dan hasil seleksi calon santri.",
    links: [
      { href: "/ppdb", label: "Buka Modul PPDB" }
    ]
  },
  santri: {
    title: "Master Data Santri",
    summary: "Kelola data santri aktif, alumni, dan direktori pengajar terintegrasi ERP.",
    links: [
      { href: "/administrasi-santri", label: "Dashboard Santri" },
      { href: "/hr", label: "Direktori Pengajar" }
    ]
  },
  website: {
    title: "Konten Website Publik",
    summary: "Kelola profil, pengumuman, galeri, dan kegiatan website utama pesantren.",
    links: [
      { href: "/website", label: "Beranda Website" },
      { href: "/website/profil", label: "Profil" },
      { href: "/website/pengumuman", label: "Pengumuman" },
      { href: "/website/galeri", label: "Galeri" },
      { href: "/website/kegiatan", label: "Kegiatan" }
    ]
  },
  tahfidz: {
    title: "Tahfidz Tracker",
    summary: "Pantau catatan ziyadah dan murojaah harian santri.",
    links: [{ href: "/tahfidz", label: "Buka Tahfidz" }]
  },
  keuangan: {
    title: "Keuangan Pesantren",
    summary: "Kelola billing, pembayaran, dan ringkasan kas lembaga.",
    links: [{ href: "/keuangan", label: "Buka Keuangan" }]
  },
  asrama: {
    title: "Manajemen Asrama",
    summary: "Pantau kamar, kapasitas, dan penempatan santri.",
    links: [{ href: "/asrama", label: "Buka Asrama" }]
  },
  izin: {
    title: "Perizinan Santri",
    summary: "Review dan approval izin harian santri.",
    links: [{ href: "/izin", label: "Buka Perizinan" }]
  },
  hr: {
    title: "SDM & Payroll",
    summary: "Kelola data pengajar/staff dan payroll.",
    links: [{ href: "/hr", label: "Buka SDM / HR" }]
  },
  dashboard: {
    title: "Dashboard ERP",
    summary: "Pantau KPI lintas modul secara real-time.",
    links: [{ href: "/dashboard", label: "Buka Dashboard ERP" }]
  },
  staff: {
    title: "Staff Operations",
    summary: "Operasional harian staff di lingkungan pesantren.",
    links: [{ href: "/staff", label: "Buka Staff Ops" }]
  },
  wali: {
    title: "Portal Wali Santri",
    summary: "Akses informasi santri untuk wali secara terkontrol.",
    links: [{ href: "/wali", label: "Buka Portal Wali" }]
  },
  superadmin: {
    title: "Kontrol Super Admin",
    summary: "Manajemen user, role, dan audit sistem.",
    links: [{ href: "/superadmin", label: "Buka Super Admin" }]
  }
};

export default function ModuleDetailPage() {
  const params = useParams();
  const moduleKey = String(params?.module || "").toLowerCase();
  const [role, setRole] = useState("umum");

  useEffect(() => {
    setRole(normalizeRole(readRole()));
  }, []);

  const moduleInfo = MODULE_DETAILS[moduleKey];
  const modulePath = MODULE_HOME_PATH[moduleKey];
  const allowed = modulePath ? canAccessPath(role, modulePath) : false;

  const visibleLinks = useMemo(() => {
    if (!moduleInfo) return [];
    return moduleInfo.links.filter((item) => canAccessPath(role, item.href));
  }, [moduleInfo, role]);

  if (!moduleInfo) {
    return (
      <section className="asf-container" style={{ paddingTop: "1rem" }}>
        <div className="asf-card">
          <h1 style={{ marginTop: 0 }}>Modul tidak ditemukan</h1>
          <p className="asf-muted">Modul yang dipilih tidak tersedia pada launcher ERP.</p>
          <Link href="/apps" className="asf-button asf-button-secondary">Kembali ke Launcher</Link>
        </div>
      </section>
    );
  }

  if (!allowed) {
    return (
      <section className="asf-container" style={{ paddingTop: "1rem" }}>
        <div className="asf-card">
          <h1 style={{ marginTop: 0 }}>Akses modul dibatasi</h1>
          <p className="asf-muted">
            Role Anda saat ini: <strong>{ROLE_LABEL[role] || role}</strong>. Modul ini tidak tersedia untuk role tersebut.
          </p>
          <Link href="/apps" className="asf-button asf-button-secondary">Kembali ke Launcher</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="asf-container" style={{ paddingTop: "1rem" }}>
      <div className="asf-card" style={{ marginBottom: "0.8rem" }}>
        <p className="asf-muted" style={{ marginBottom: "0.35rem" }}>
          Detail Modul · {MODULE_LABEL[moduleKey] || moduleKey}
        </p>
        <h1 style={{ margin: 0 }}>{moduleInfo.title}</h1>
        <p className="asf-muted" style={{ marginTop: "0.55rem" }}>{moduleInfo.summary}</p>
        <div className="asf-actions">
          <Link href={modulePath} className="asf-button asf-button-primary">Masuk ke Modul</Link>
          <Link href="/apps" className="asf-button asf-button-secondary">Kembali ke Launcher</Link>
        </div>
      </div>

      <div className="asf-card">
        <h2 style={{ marginTop: 0 }}>Menu Modul</h2>
        <div style={{ display: "grid", gap: "0.55rem" }}>
          {visibleLinks.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              style={{
                padding: "0.6rem 0.75rem",
                border: "1px solid var(--line)",
                borderRadius: "0.7rem",
                background: "var(--surface-muted)",
                color: "var(--text)",
                textDecoration: "none",
                fontWeight: 600
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

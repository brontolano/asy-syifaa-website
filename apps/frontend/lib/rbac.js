export const ROLE_LABEL = {
  superadmin: "Super Admin",
  mudir_aam: "Mudir Aam",
  pengasuh: "Pengasuh / Pimpinan",
  ustadz: "Ustadz",
  ustadzah: "Ustadzah",
  bendahara: "Bendahara",
  admin_keuangan: "Admin Keuangan",
  kepala_sekolah: "Kepala Sekolah",
  staff_umum: "Staff Umum",
  admin_kesantrian: "Admin Kesantrian & Asrama",
  wali: "Wali Santri",
  umum: "Pengguna Umum"
};

export const ROLE_CONTEXT = {
  superadmin: "Mode kontrol penuh: tata kelola user, audit, dan konfigurasi sistem.",
  mudir_aam: "Mode pimpinan operasional: pantau semua alur santri, akademik, dan keuangan.",
  pengasuh: "Mode eksekutif: analitik terpusat untuk keputusan strategis harian.",
  ustadz: "Mode pengajar: fokus pada tahfidz, presensi, dan komunikasi akademik.",
  ustadzah: "Mode pengajar: fokus pada tahfidz, presensi, dan komunikasi akademik.",
  bendahara: "Mode keuangan: kelola billing, pembayaran, dan ringkasan keuangan.",
  admin_keuangan: "Mode keuangan operasional: rekonsiliasi pembayaran dan penagihan.",
  kepala_sekolah: "Mode akademik: awasi progres belajar, SDM, dan dashboard mutu.",
  staff_umum: "Mode operasional: jalankan layanan harian asrama, izin, dan administrasi.",
  admin_kesantrian: "Mode kesantrian: monitor asrama, izin santri, pelanggaran, dan PPDB.",
  wali: "Mode wali: pantau data anak, progres, dan informasi resmi pesantren.",
  umum: "Mode publik: akses pendaftaran dan pengumuman resmi pesantren."
};

export const MODULE_HOME_PATH = {
  ppdb: "/ppdb",
  santri: "/administrasi-santri",
  website: "/website",
  tahfidz: "/tahfidz",
  keuangan: "/keuangan",
  asrama: "/asrama",
  izin: "/izin",
  hr: "/hr",
  dashboard: "/dashboard",
  staff: "/staff",
  wali: "/wali",
  superadmin: "/superadmin"
};

export const MODULE_LABEL = {
  ppdb: "PPDB / SPMB",
  santri: "Master Data Santri",
  website: "Website CMS",
  tahfidz: "Tahfidz",
  keuangan: "Keuangan",
  asrama: "Asrama",
  izin: "Perizinan",
  hr: "SDM / HR",
  dashboard: "Dashboard ERP",
  staff: "Staff Operations",
  wali: "Portal Wali",
  superadmin: "Super Admin"
};

const ROLE_ACCESS = {
  superadmin: "all",
  mudir_aam: "all",
  pengasuh: new Set(["/dashboard", "/tahfidz", "/keuangan", "/hr", "/administrasi-santri", "/website", "/website/pengumuman", "/website/kegiatan", "/website/galeri"]),
  ustadz: new Set(["/tahfidz", "/izin", "/ppdb", "/website/pengumuman", "/dashboard"]),
  ustadzah: new Set(["/tahfidz", "/izin", "/ppdb", "/website/pengumuman", "/dashboard"]),
  bendahara: new Set(["/keuangan", "/dashboard", "/wali"]),
  admin_keuangan: new Set(["/keuangan", "/dashboard", "/wali"]),
  kepala_sekolah: new Set(["/administrasi-santri", "/tahfidz", "/izin", "/hr", "/dashboard", "/website", "/website/pengumuman", "/website/kegiatan", "/website/galeri"]),
  staff_umum: new Set(["/administrasi-santri", "/asrama", "/izin", "/ppdb", "/website", "/website/pengumuman", "/website/kegiatan", "/website/galeri"]),
  admin_kesantrian: new Set(["/administrasi-santri", "/asrama", "/izin", "/ppdb", "/dashboard", "/website", "/website/pengumuman", "/website/kegiatan", "/website/galeri"]),
  wali: new Set(["/wali"]),
  umum: new Set(["/ppdb", "/website/pengumuman"])
};

const ROLE_ALIAS = {
  "super_admin": "superadmin",
  "super-admin": "superadmin",
  "admin": "staff_umum",
  "admin finance": "admin_keuangan",
  "admin_finance": "admin_keuangan",
  "admin-kesantrian": "admin_kesantrian",
  "admin kesantrian": "admin_kesantrian",
  "mudir": "mudir_aam",
  "kepsek": "kepala_sekolah"
};

const ALWAYS_ALLOWED = new Set([
  "/",
  "/apps",
  "/login",
  "/profil-user",
  "/pengaturan",
  "/index.html",
  "/alur-pendaftaran.html",
  "/daftar-sekarang.html",
  "/hasil-seleksi.html"
]);

const MODULE_MATCHERS = [
  { prefix: "/website", module: "website" },
  { prefix: "/ppdb", module: "ppdb" },
  { prefix: "/administrasi-santri", module: "santri" },
  { prefix: "/direktori-banin.html", module: "santri" },
  { prefix: "/direktori-banat.html", module: "santri" },
  { prefix: "/direktori-alumni.html", module: "santri" },
  { prefix: "/direktori-pengajar.html", module: "santri" },
  { prefix: "/tahfidz", module: "tahfidz" },
  { prefix: "/keuangan", module: "keuangan" },
  { prefix: "/asrama", module: "asrama" },
  { prefix: "/izin", module: "izin" },
  { prefix: "/hr", module: "hr" },
  { prefix: "/dashboard", module: "dashboard" },
  { prefix: "/staff", module: "staff" },
  { prefix: "/wali", module: "wali" },
  { prefix: "/superadmin", module: "superadmin" }
];

export function normalizeRole(value) {
  const role = String(value || "").trim().toLowerCase();
  if (!role) return "umum";
  const mapped = ROLE_ALIAS[role] || role;
  return Object.prototype.hasOwnProperty.call(ROLE_ACCESS, mapped) ? mapped : "umum";
}

export function normalizePath(value) {
  const text = String(value || "").trim();
  if (!text) return "/";
  const noHash = text.split("#")[0];
  const noQuery = noHash.split("?")[0];
  if (!noQuery) return "/";
  return noQuery;
}

export function canAccessPath(role, href) {
  const currentRole = normalizeRole(role);
  const path = normalizePath(href);

  if (path.startsWith("/apps/")) {
    const moduleKey = path.split("/")[2];
    const modulePath = MODULE_HOME_PATH[moduleKey];
    if (!modulePath) return false;
    return canAccessPath(currentRole, modulePath);
  }

  if (ALWAYS_ALLOWED.has(path)) return true;
  const rule = ROLE_ACCESS[currentRole] || ROLE_ACCESS.umum;
  if (rule === "all") return true;
  return rule.has(path);
}

export function resolveActiveModule(pathname) {
  const path = normalizePath(pathname);
  if (path.startsWith("/apps/")) {
    const moduleKey = path.split("/")[2];
    return MODULE_HOME_PATH[moduleKey] ? moduleKey : null;
  }
  for (const item of MODULE_MATCHERS) {
    if (path === item.prefix || path.startsWith(`${item.prefix}/`)) {
      return item.module;
    }
  }
  if (path === "/apps") return "apps";
  return null;
}

export function getRoleHomeRoute(_role) {
  return "/apps";
}

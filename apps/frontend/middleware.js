import { NextResponse } from "next/server";

const HOST_ROUTE_MAP = {
  website: "/",
  apps: "/apps",
  dashboard: "/dashboard",
  staff: "/staff",
  login: "/login",
  ppdb: "/ppdb",
  profil: "/profil-user",
  profile: "/profil-user"
};

function isAssetPath(pathname) {
  return pathname.startsWith("/_next") || pathname.startsWith("/api") || /\.[a-zA-Z0-9]+$/.test(pathname);
}

function normalizeHost(rawHost) {
  return String(rawHost || "").toLowerCase().split(":")[0];
}

function getSubdomain(host) {
  if (!host) return null;
  if (host.endsWith(".localhost")) return host.slice(0, -".localhost".length) || null;
  const parts = host.split(".");
  return parts.length > 2 ? parts[0] : null;
}

function rewriteTo(request, pathname) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.rewrite(url);
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

const LEGACY_HTML_REDIRECTS = {
  "/profile-profile.html": "/profil.html",
  "/profile-visi-dan-misi.html": "/profil-visi-misi.html",
  "/profile-struktur-organisasi.html": "/profil-struktur.html",
  "/profile-kurikulum.html": "/profil-kurikulum.html",
  "/profile-guru.html": "/profil-guru.html",
  "/profile-fasilitas-pesantren.html": "/profil-fasilitas.html",
  "/profile-ekstrakulikuler.html": "/profil-ekskul.html",
  "/profile-profile-pondok-pesantren-profile-abuya.html": "/profil-abuya.html",
  "/profile-profile-pondok-pesantren-profile-pondok-pesantren.html": "/profil-pondok.html",
  "/direktori-direktori-banin.html": "/direktori-banin.html",
  "/direktori-direktori-banat.html": "/direktori-banat.html",
  "/direktori-direktori-pengajar.html": "/direktori-pengajar.html",
  "/direktori-direktori-alumni.html": "/direktori-alumni.html",
  "/kegiatan-kegiatan-harian.html": "/kegiatan-harian.html",
  "/kegiatan-kegiatan-mingguan.html": "/kegiatan-mingguan.html",
  "/informasi-pengumuman.html": "/info-pengumuman.html",
  "/informasi-e-raport.html": "/info-raport.html",
  "/informasi-prestasi.html": "/info-prestasi.html",
  "/galeri-galeri-foto-page-1.html": "/galeri.html",
  "/galeri-galeri-foto-page-2.html": "/galeri-2.html",
  "/pendaftaran-alur-pendaftaran.html": "/alur-pendaftaran.html",
  "/pendaftaran-daftar-sekarang.html": "/daftar-sekarang.html",
  "/pendaftaran-hasil-seleksi.html": "/hasil-seleksi.html"
};

function normalizeLegacyHtmlPath(pathname) {
  let decoded = pathname;
  try {
    decoded = decodeURI(pathname);
  } catch (_error) {
    decoded = pathname;
  }

  const lower = decoded.toLowerCase();
  if (Object.prototype.hasOwnProperty.call(LEGACY_HTML_REDIRECTS, lower)) {
    return LEGACY_HTML_REDIRECTS[lower];
  }
  if (lower === "/home.html" || lower === "/home/home.html") return "/index.html";
  if (lower === "/apps.html") return "/apps";
  if (lower === "/staff.html") return "/staff";
  if (lower === "/login.html") return "/login";
  if (lower === "/ppdb.html") return "/ppdb";
  if (lower === "/wali.html") return "/wali";
  if (lower === "/dashboard.html") return "/dashboard";
  if (lower === "/profil-user.html" || lower === "/profile-user.html") return "/profil-user";
  if (!lower.endsWith(".html")) return null;

  let clean = decoded.replace(/^\/+/, "");
  if (!clean) return "/index.html";

  if (clean.toLowerCase() === "index.html") return "/index.html";

  if (/\/index\.html$/i.test(clean)) {
    clean = clean.replace(/\/index\.html$/i, "");
  } else {
    clean = clean.replace(/\.html$/i, "");
  }

  const slug = slugify(clean.replace(/\//g, "-")) || "index";
  return `/${slug}.html`;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const host = normalizeHost(request.headers.get("x-forwarded-host") || request.headers.get("host"));
  const normalizedPathname = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  // Allow legacy static asset references under /website/* without rewriting CMS routes.
  if (normalizedPathname.startsWith("/website/assets/")) {
    return rewriteTo(request, normalizedPathname.slice("/website".length));
  }
  if (normalizedPathname.startsWith("/website/img/")) {
    return rewriteTo(request, normalizedPathname.slice("/website".length));
  }

  const slugTarget = normalizeLegacyHtmlPath(pathname);
  if (slugTarget && slugTarget !== pathname) {
    const target = request.nextUrl.clone();
    target.pathname = slugTarget;
    return NextResponse.redirect(target, 308);
  }

  if (isAssetPath(pathname)) return NextResponse.next();

  const subdomain = getSubdomain(host);
  if (subdomain && Object.prototype.hasOwnProperty.call(HOST_ROUTE_MAP, subdomain)) {
    const base = HOST_ROUTE_MAP[subdomain];
    const targetPath = base === "/" ? pathname : (pathname === "/" ? base : `${base}${pathname}`);
    return rewriteTo(request, targetPath);
  }

  if (pathname === "/" && (host === "localhost" || host === "127.0.0.1" || host === "[::1]")) {
    return rewriteTo(request, "/index.html");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"]
};

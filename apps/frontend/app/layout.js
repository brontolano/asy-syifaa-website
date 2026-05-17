import { THEME_MODE_KEY, THEME_MOTION_KEY, THEME_PALETTE_KEY, THEME_PALETTES } from "../lib/theme-config";
import ErpShell from "../components/ErpShell";
import "./globals.css";

const allowedPalettesJson = JSON.stringify(THEME_PALETTES);

const themeHydrationScript = `
  (function () {
    try {
      var modeKey = "${THEME_MODE_KEY}";
      var paletteKey = "${THEME_PALETTE_KEY}";
      var motionKey = "${THEME_MOTION_KEY}";
      var mode = localStorage.getItem(modeKey);
      var palette = localStorage.getItem(paletteKey);
      var motion = localStorage.getItem(motionKey);
      var allowed = ${allowedPalettesJson};
      var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var resolvedMotion = reducedMotion ? "reduce" : "safe";
      if (motion === "safe" || motion === "reduce") {
        resolvedMotion = motion;
      }
      document.documentElement.dataset.theme = mode === "light" || mode === "dark" ? mode : prefersDark ? "dark" : "light";
      document.documentElement.dataset.palette = allowed.indexOf(palette) >= 0 ? palette : "emerald";
      document.documentElement.dataset.motion = resolvedMotion;
    } catch (_error) {}
  })();
`;

export const metadata = {
  title: "Asy-Syifaa ERP",
  description: "ERP Pesantren — Sistem Terintegrasi Akademik, Keuangan, Tahfidz, Asrama"
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" data-theme="light" data-palette="emerald" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Merriweather:wght@700;800&family=Noto+Sans:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,500,1,0"
        />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeHydrationScript }} />
        <ErpShell>{children}</ErpShell>
      </body>
    </html>
  );
}

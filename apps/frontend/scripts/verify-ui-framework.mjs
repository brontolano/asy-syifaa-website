import fs from "node:fs";
import path from "node:path";

const cssPath = path.join(process.cwd(), "app", "globals.css");
const coordinationPath = path.join(process.cwd(), "UI_COORDINATION.md");

function assertContains(source, required, title) {
  const missing = required.filter((entry) => !source.includes(entry));
  if (missing.length > 0) {
    throw new Error(`${title} belum lengkap: ${missing.join(", ")}`);
  }
}

if (!fs.existsSync(cssPath)) {
  throw new Error(`File CSS tidak ditemukan: ${cssPath}`);
}

if (!fs.existsSync(coordinationPath)) {
  throw new Error(`Dokumen koordinasi tidak ditemukan: ${coordinationPath}`);
}

const css = fs.readFileSync(cssPath, "utf8");
const coordination = fs.readFileSync(coordinationPath, "utf8");

assertContains(
  css,
  [
    'html[data-theme="dark"]',
    'html[data-palette="emerald"]',
    'html[data-palette="ocean"]',
    'html[data-palette="sand"]',
    'html[data-palette="rose"]',
    'html[data-palette="violet"]',
    'html[data-palette="slate"]',
    ".asf-button",
    ".asf-button-primary",
    ".asf-button-secondary",
    ".asf-button-icon",
    ".asf-link-inline",
    ".asf-quick-link",
    ".asf-status-badge",
    ".asf-icon",
    ".asf-card",
    'html[data-motion="safe"] .reveal',
    'html[data-theme-transition="on"] .asf-button'
  ],
  "Kontrak token CSS"
);

assertContains(
  coordination,
  ["Kontrak Design System", "Kontrak Perilaku Tema", "Checklist Review Lintas Tim"],
  "Kontrak dokumen koordinasi"
);

console.log("UI framework verification passed.");

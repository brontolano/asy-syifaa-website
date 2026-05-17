export const THEME_MODE_KEY = "asy_syifaa_theme_mode";
export const THEME_PALETTE_KEY = "asy_syifaa_theme_palette";
export const THEME_MOTION_KEY = "asy_syifaa_theme_motion";

export const THEME_MODES = ["light", "dark"];
export const THEME_PALETTES = ["emerald", "ocean", "sand", "rose", "violet", "slate"];
export const THEME_MOTION_OPTIONS = ["auto", "safe", "reduce"];

export const THEME_PALETTE_META = {
  emerald: { label: "Hijau", color: "#1f6b43" },
  ocean: { label: "Laut", color: "#1f577a" },
  sand: { label: "Pasir", color: "#7a5b2f" },
  rose: { label: "Mawar", color: "#8f3e58" },
  violet: { label: "Violet", color: "#4c4383" },
  slate: { label: "Batu", color: "#2e5b67" }
};

export function normalizeThemeMode(value) {
  return value === "dark" ? "dark" : "light";
}

export function normalizeThemePalette(value) {
  return THEME_PALETTES.includes(value) ? value : "emerald";
}

export function normalizeThemeMotion(value) {
  return THEME_MOTION_OPTIONS.includes(value) ? value : "auto";
}

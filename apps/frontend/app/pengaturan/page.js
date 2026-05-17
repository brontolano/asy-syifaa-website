"use client";

import { useEffect, useState } from "react";
import {
  THEME_MODE_KEY,
  THEME_PALETTE_KEY,
  THEME_PALETTES,
  THEME_PALETTE_META,
  normalizeThemeMode,
  normalizeThemePalette
} from "../../lib/theme-config";

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (_error) {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (_error) {
    // noop
  }
}

export default function PengaturanPage() {
  const [mode, setMode] = useState("light");
  const [palette, setPalette] = useState("emerald");

  useEffect(() => {
    const nextMode = normalizeThemeMode(readStorage(THEME_MODE_KEY));
    const nextPalette = normalizeThemePalette(readStorage(THEME_PALETTE_KEY));
    setMode(nextMode);
    setPalette(nextPalette);
    document.documentElement.dataset.theme = nextMode;
    document.documentElement.dataset.palette = nextPalette;
  }, []);

  function updateMode(nextMode) {
    const value = normalizeThemeMode(nextMode);
    setMode(value);
    writeStorage(THEME_MODE_KEY, value);
    document.documentElement.dataset.theme = value;
  }

  function updatePalette(nextPalette) {
    const value = normalizeThemePalette(nextPalette);
    setPalette(value);
    writeStorage(THEME_PALETTE_KEY, value);
    document.documentElement.dataset.palette = value;
  }

  return (
    <main className="asf-container asf-module-body">
      <section className="asf-card">
        <h1>Pengaturan</h1>
        <p className="asf-muted">Atur tampilan ERP sesuai preferensi pengguna.</p>
      </section>

      <section className="asf-card">
        <h2 style={{ marginBottom: "0.55rem" }}>Tema</h2>
        <div className="asf-actions" style={{ marginBottom: "0.85rem" }}>
          <button type="button" className="asf-button asf-button-secondary" aria-pressed={mode === "light"} onClick={() => updateMode("light")}>
            Terang
          </button>
          <button type="button" className="asf-button asf-button-secondary" aria-pressed={mode === "dark"} onClick={() => updateMode("dark")}>
            Gelap
          </button>
        </div>

        <h3 style={{ marginBottom: "0.55rem" }}>Warna</h3>
        <div className="asf-actions">
          {THEME_PALETTES.map((item) => (
            <button
              key={item}
              type="button"
              className="asf-button asf-button-secondary"
              aria-pressed={palette === item}
              onClick={() => updatePalette(item)}
              style={{
                borderColor: palette === item ? THEME_PALETTE_META[item].color : undefined,
                color: palette === item ? THEME_PALETTE_META[item].color : undefined
              }}
            >
              {THEME_PALETTE_META[item].label}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}


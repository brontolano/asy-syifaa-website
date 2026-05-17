# UI Coordination Notes (MVP)

Dokumen ini jadi titik sinkron tim FE, UI/UX, PM, dan Backend untuk MVP Asy-Syifaa ERP.

## 1. Kontrak Design System
- Framework CSS: `app/globals.css`
- Tema wajib: `light` dan `dark`
- Palet wajib: `emerald`, `ocean`, `sand`, `rose`, `violet`, `slate`
- Token warna primer default mengacu visi produk:
  - `--accent: #2d5016`
  - `--accent-strong: #1f4d3d`
- Komponen inti yang harus dipakai lintas halaman:
  - Tombol: `.asf-button`, `.asf-button-primary`, `.asf-button-secondary`
  - Tombol ikon: `.asf-button-icon`
  - Chip/palet: `.asf-chip`
  - Kartu: `.asf-card`
  - Link inline: `.asf-link-inline`
  - Quick link: `.asf-quick-link`, `.asf-quick-links`
  - Status badge: `.asf-status-badge` (+ varian success/warn/error)
  - Ikon: `.asf-icon`

## 2. Kontrak Perilaku Tema
- Source of truth ada di `localStorage`:
  - `asy_syifaa_theme_mode`
  - `asy_syifaa_theme_palette`
  - `asy_syifaa_theme_motion`
- `ThemeControls` akan:
  - validasi nilai mode/palet sebelum dipakai
  - validasi mode animasi (`auto`, `safe`, `reduce`)
  - sinkron antar-tab via event `storage`
  - ikuti preferensi sistem untuk reduced motion saat mode `auto`
  - fallback aman saat `localStorage` terblokir

## 3. Kontrak Integrasi Backend
- Endpoint MVP tidak berubah:
  - `GET/POST /api/students`
  - `GET/POST /api/attendance`
  - `GET/POST /api/billing`
- Perubahan di run ini hanya UI/UX dan tidak mengubah schema payload.

## 4. Checklist Review Lintas Tim
- UI/UX: cek konsistensi warna, radius, dan tipografi pada halaman publik + staff.
- FE: cek mode tema/palet tetap tersimpan setelah reload.
- FE: cek mode animasi tetap sinkron antar-tab dan menghormati reduced-motion.
- Backend: verifikasi pesan sukses/error tetap tampil saat API valid/invalid.
- PM/QA: validasi alur Three-Click Rule tetap terpenuhi untuk akses utama.

## 5. Ownership Implementasi UI
- `app/globals.css`: token desain, komponen dasar, dan aturan motion (pemilik FE/UI).
- `components/ThemeControls.js`: logic mode/palet + persistensi browser (pemilik FE).
- `lib/theme-config.js`: source of truth key localStorage + daftar palet (pemilik FE).
- `app/page.js` dan `app/staff/page.js`: implementasi komponen UI sesuai kontrak modul (pemilik FE + PM review).

## 6. Verifikasi Framework CSS
- Jalankan verifikasi kontrak CSS + dokumen:
  - `cd apps/frontend`
  - `npm run verify:ui`
- Output sukses wajib: `UI framework verification passed.`

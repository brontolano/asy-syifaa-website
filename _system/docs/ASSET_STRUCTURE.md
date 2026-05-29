# Struktur Aset Publik (Rapih & Standar)

Tanggal: 18 Mei 2026

## Canonical Public Paths
- `/assets/css/main.css` -> stylesheet utama website publik
- `/assets/js/main.js` -> script utama website publik
- `/assets/media/images/*` -> image static brand/profil/hero
- `/assets/media/gallery/*` -> media galeri publik

## Kompatibilitas
Path lama tetap dipertahankan agar URL lama tidak rusak:
- `/assets/style.css`
- `/assets/script.js`
- `/assets/img/*`
- `/img/*`

Semua halaman HTML publik sudah diarahkan memakai path canonical (`/assets/css/main.css` dan `/assets/js/main.js`).

## Kebijakan Migrasi Legacy
- Folder/path legacy dipertahankan sebagai **referensi** dan fallback kompatibilitas.
- Implementasi aktif wajib mengikuti canonical path di atas.
- Sebelum penghapusan aset legacy:
  1. jalankan crawl link lokal HTML,
  2. pastikan `missing_count = 0`,
  3. pastikan semua reference penting sudah ada di canonical structure.

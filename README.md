# Asy-Syifaa ERP Pesantren

Platform ERP pesantren modular untuk operasional akademik, keuangan, kesantrian, asrama, SDM, dan integrasi portal publik.

## Status Implementasi Saat Ini (Mei 2026)
- Monorepo aktif berada di folder `apps/`.
- Frontend aktif menggunakan Next.js App Router di `apps/frontend` (port `3000`).
- Backend API aktif menggunakan Express di `apps/backend` (port `4000`).
- Tersedia fallback database in-memory jika `DATABASE_URL` tidak tersedia.
- Alur logout sudah diperketat:
  - `apps/frontend/components/ErpShell.js`
  - `apps/frontend/app/profil-user/page.js`
  - Redirect logout memakai `router.replace("/login"); router.refresh();`.

## Struktur Proyek
- `apps/frontend`: website publik + ERP UI (login, apps launcher, dashboard per role, profil user, modul inti).
- `apps/backend`: API master data dan operasional (students, PPDB, attendance, billing, tahfidz, dormitory, permits, staff).
- `apps/go-api`: placeholder fondasi service Go.
- `_arsip_project_lama_20260516-005918`: arsip aplikasi lama (tetap disimpan untuk referensi/migrasi data).

## Menjalankan Secara Lokal

### 1) Backend
```bash
cd apps/backend
cp .env.example .env
npm install
npm run dev
```

Default:
- API: `http://localhost:4000`
- Health: `http://localhost:4000/api/health`

### 2) Frontend
```bash
cd apps/frontend
cp .env.local.example .env.local
npm install
npm run dev
```

Default:
- App: `http://localhost:3000`
- Login: `http://localhost:3000/login`
- Apps launcher: `http://localhost:3000/apps`

## Endpoint Penting
- `POST /api/auth/login`
- `GET /api/system/roles`
- `GET /api/public/ppdb/results`
- `GET /api/public/students`
- `GET /api/public/staff`
- `GET /api/public/guardians`
- `GET /api/students`
- `GET /api/staff`
- `GET /api/metrics`

## Catatan Integrasi
- Frontend membaca API base URL dari `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:4000`).
- CORS backend diatur lewat `CORS_ORIGIN` (default `*`, disarankan spesifik di production).
- Repo ini masih membawa artefak data website (gambar/HTML) untuk menjaga kompatibilitas konten lama saat proses migrasi.

## Dokumen Produk
- `_doc_erp/_RISET_Pesantren.md`
- `_doc_erp/ERP_PESANTREN_PRD.md`
- `_doc_erp/ERP_Pesantren_(Asy-Syifaa_Fram..._PRD.md`
- `_doc_erp/_Product_Vision_Asy-Syifaa_ERP_Pesantren_All-in-One_Solution_Ecosystem.md`

## Report Perubahan Terbaru (18 Mei 2026)

### 1) Launcher ERP (`/apps`)
- Launcher di-redesign menjadi tampilan grid icon sederhana (gaya iPad apps).
- Semua modul kini ditampilkan di launcher.
- Modul yang belum aktif ditandai **greyscale** + label `Belum Aktif`.
- Modul aktif tetap mengikuti kontrol akses role (RBAC) dan bisa diklik.
- Animasi morph launcher sudah dihapus (klik modul langsung pindah halaman).

### 2) Topbar ERP
- Brand topbar diperbarui menjadi: **Asy-Syifaa Framework**.
- Utility topbar disederhanakan menjadi:
  - icon Profil
  - icon Pengaturan
  - tombol Logout
- Badge role dan badge nama user di area kanan topbar telah dihapus untuk tampilan lebih ringkas.

### 3) Perbaikan Alur RBAC & Routing Website CMS
- Akses `Website CMS` tidak lagi selalu terbuka untuk semua role.
- Route CMS website tetap di panel internal:
  - `/website`
  - `/website/pengumuman`
  - `/website/kegiatan`
  - `/website/galeri`
- Middleware diperketat agar tidak melempar route CMS ke halaman HTML publik lama.

### 4) Storage Media Foto/Video + URL Publik
- Ditambahkan endpoint upload media di backend:
  - `POST /api/media/upload`
- Ditambahkan static serving file media:
  - `GET /media/<folder>/<file>`
- URL file hasil upload langsung dikembalikan oleh API, siap dipakai untuk CMS/PPDB.
- Konfigurasi env baru:
  - `MEDIA_STORAGE_DIR` (default: `apps/backend/storage/media`)
  - `MEDIA_PUBLIC_BASE_URL` (opsional override base URL)
  - `MEDIA_MAX_SIZE_MB` (default: `80`)

### 5) Validasi Teknis
- Build frontend terbaru: **lulus** (`npm run build`).
- Uji upload media: **lulus** (response URL `200`, file bisa diakses via `/media/...`).

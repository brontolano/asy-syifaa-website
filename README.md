# ERP Asy-Syifaa Wal Mahmuudiyyah

Repository implementasi bertahap ERP Pesantren berdasarkan PRD `PRD_ERP_PESANTREN_ASY_SYIFAA.md`.

## Progress Saat Ini
- Module 0: Landing Page ERP (minimalis, grid menu modul, login popup icon)
- Module 1: Dashboard role-based (khusus superadmin)
- Module 15: Perpustakaan Digital publik + Reader in-app + Bookmark
- Module lain (sesuai PRD 0-20): sudah tampil sebagai placeholder menu `/#` di beranda

## Struktur
- `backend/server.js`: API dan static server Express
- `frontend/index.html`: Module 0 Landing Page
- `frontend/dashboard.html`: Module 1 Dashboard
- `frontend/dashboard.js`: logika role-based dashboard
- `frontend/library-public.html`: Modul Perpustakaan Digital (halaman publik)
- `frontend/library.js`: logika upload dan list PDF
- `frontend/reader.html`: halaman reader PDF full page
- `frontend/controllers/reader-detail.controller.js`: controller reader detail
- `frontend/theme.js`: toggle dark/light mode
- `frontend/styles.css`: styling UI

## Menjalankan Lokal
```bash
npm install
npm run dev
```

Buka:
- `http://localhost:3000/` (Module 0)
- `http://localhost:3000/dashboard` (Module 1)
- `http://localhost:3000/perpustakaan` (Module 15)
- `http://localhost:3000/perpustakaan/reader?id=<bookId>` (Reader)

## Rencana Domain/Subdomain
- `asy-syifaa.com` -> website public utama (di luar app ini)
- `erp.asy-syifaa.com` -> ERP Landing
- `perpustakaan.asy-syifaa.com` -> Perpustakaan Digital
- `[nama_modul].asy-syifaa.com` -> modul per subdomain (bertahap)

## Endpoint
- `GET /api/health`
- `GET /api/dashboard/summary?role=ustadz|mudiraam|abuya`
- `GET /api/library`
- `POST /api/library/upload` (`multipart/form-data`, field file: `pdf`)
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/session`

## Aturan Role Saat Ini
- `superadmin` dapat mengakses Dashboard dan upload PDF perpustakaan.
- Akun default superadmin:
  - Username: `superadmin`
  - Password: `bismillah`
- User publik hanya bisa mengakses modul/halaman publik:
  - Landing (`/`)
  - Perpustakaan (`/perpustakaan`) untuk lihat/baca PDF (tanpa upload).

## Modul Perpustakaan (Tahap Lanjut)
- Viewer menggunakan **Mozilla PDF.js** (`pdfjs-dist`) dari asset lokal `/vendor/pdfjs` (bukan CDN).
- Metadata buku saat upload:
  - `title`, `author`, `category`, `language`, `tags`
- Fitur pencarian & filter koleksi:
  - query teks (`q`)
  - filter kategori (`category`)
  - filter bahasa (`language`)
- Deteksi duplikat upload:
  - menolak file dengan kombinasi nama file + ukuran yang sama
- Endpoint tambahan selaras PRD:
  - `GET /api/perpustakaan/books`
  - `GET /api/perpustakaan/search`
  - `GET /api/perpustakaan/books/{id}/content`
- `GET /api/perpustakaan/bookmarks`
- `POST /api/perpustakaan/bookmarks`

Catatan:
- Endpoint edit metadata `PUT /api/library/:id` sudah dihapus sesuai perubahan scope saat ini.
- Route admin CMS perpustakaan khusus dashboard juga sudah dihapus, perpustakaan aktif di route publik.

## Penyimpanan PDF Perpustakaan
- Upload dilakukan dari halaman `http://localhost:3000/perpustakaan`
- File PDF fisik disimpan di `backend/storage/library-pdfs`
- Metadata koleksi disimpan di `backend/data/library.json`
## Deploy VPS + Docker (ERP Full)

Struktur deploy untuk ERP penuh sudah disiapkan di folder `deploy/`:
- `deploy/docker-compose.vps.yml` -> app ERP + PostgreSQL + MinIO + Traefik labels
- `deploy/.env.vps.example` -> template environment VPS

### Langkah deploy di VPS
1. Copy `deploy/.env.vps.example` menjadi `deploy/.env.vps` lalu isi credential kuat.
2. Pastikan network Traefik eksternal tersedia sesuai `TRAEFIK_NETWORK`.
3. Jalankan dari folder `deploy`:
   - `docker compose -f docker-compose.vps.yml --env-file .env.vps up -d --build`

### Tes Docker lokal (tanpa Traefik)
Untuk tes lokal di OS ini gunakan:
- `docker compose up -d --build`
- Akses `http://localhost:3000/`


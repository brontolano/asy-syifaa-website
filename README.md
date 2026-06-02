# Asy-Syifaa Platform (Website asy-syifaa.com)

Source code website resmi Pondok Pesantren Asy-Syifaa — situs PHP native dinamis
(front-controller + clean URL via `router.php`). Repo ini berisi **source code saja**;
media/aset besar disimpan terpisah (lihat bagian Backup Media).

- **Live:** https://asy-syifaa.com
- **Repo:** https://github.com/brontolano/asy-syifaa-
- **Stack:** PHP 8.2, HTML/CSS/JS, Bootstrap, Nginx + PHP-FPM, `.htaccess` for Apache compatibility

---

## Struktur

```
asy-syifaa-platform/
├── index.php, profil-*.php, galeri*.php, ...   # Halaman PHP (41 file)
├── partials.*.php                              # Header/footer/bootstrap partial
├── bootstrap.php, router.php                   # Front controller
├── .htaccess, nginx.conf                       # Rewrite/routing configs
├── assets/                                     # css, js, data (media di-gitignore)
│   ├── css/  js/  data/
│   ├── media/        (gitignored — gambar)
│   └── img/          (gitignored — gambar)
├── login/index.html                            # Halaman login SSO aktif
├── api/  src/  erp/                            # Helper API & legacy
├── _system/                                    # Arsip docs + backend-legacy
├── storage/                                    # Runtime (logs/cache/sessions gitignored)
└── .github/workflows/ci.yml                    # CI: php -l lint (TIDAK deploy)
```

---

## Laporan Pembersihan (30 Mei 2026)

Folder dirapikan agar **lokal = cermin GitHub** (source-only). Sebelum penghapusan,
**seluruh media di-backup penuh** ke folder induk `_ERP/` — nol kehilangan data.

### Yang dihapus

| Item | Ukuran | Alasan |
|---|---|---|
| `assets/js/blog-pages.b64` | 11,5 KB | Artefak base64 deploy, tidak direferensikan |
| `storage/sessions/sess_*` (6) | 0 B | File sesi PHP kosong/basi (ter-commit tak sengaja) |
| `img/` | 278 MB | Media — gitignored, dipindah ke backup |
| `Galeri/` | 271 MB | Media — gitignored, dipindah ke backup |
| `assets/media/` | ~295 MB | Media — gitignored, dipindah ke backup |
| `assets/img/`, `css/img/` | ~5,5 MB | Media — gitignored, dipindah ke backup |
| `Abuya/`, `images/` | 3,4 MB | Media — gitignored, dipindah ke backup |

**Hasil:** ukuran folder turun dari **856 MB → 2,8 MB**. File source ter-track tetap 74 file
(`login/index.html` dipertahankan sesuai permintaan).

### Backup media (folder induk `_ERP/`)

| Arsip | Isi | Ukuran |
|---|---|---|
| `assets_restore.zip` | `assets/` (media+img+css+js+data) | 296 MB |
| `legacy-media-backup.zip` | `img/`, `Galeri/`, `Abuya/`, `images/` | 545 MB |

> `css/img/hero-background.jpg` terverifikasi byte-identik dengan
> `assets/media/images/hero-background.jpg` (sudah ada di `assets_restore.zip`).

---

## Deploy

Live saat ini diasumsikan berjalan di **VPS Nginx + PHP-FPM**, bukan Hostinger shared.
Source aktif website dipasang di **`/opt/asy-syifaa/website/src`** sesuai workflow reinstall.

1. Deploy utama memakai GitHub Actions: [`.github/workflows/reinstall-website.yml`](C:/Users/maula/Downloads/ABDM/_Agent%20Manager/ERP-Pesantren/.github/workflows/reinstall-website.yml).
2. Workflow menyalin isi `asy-syifaa-website/` ke `/opt/asy-syifaa/website/src`, lalu memasang `nginx.conf` menjadi site config aktif.
3. Clean URL publik harus masuk ke `router.php`; jangan ubah fallback Nginx ke `index.php` karena itu membuat semua route non-file tampil seperti beranda.
4. Path gambar galeri tetap distandarkan ke `/assets/media/gallery/...` (`assets/js/gallery-pages.js`).

CI [`asy-syifaa-website/.github/workflows/ci.yml`](C:/Users/maula/Downloads/ABDM/_Agent%20Manager/ERP-Pesantren/asy-syifaa-website/.github/workflows/ci.yml) hanya menjalankan `php -l` di runner GitHub. Deploy live website ditangani oleh workflow di root repo.

---

## Catatan

- Media besar **sengaja** di-gitignore agar repo kecil & andal (lihat `.gitignore`).
- Untuk memulihkan media ke lokal: ekstrak kedua zip di folder induk ke dalam folder ini.
- File `.htaccess` tetap dipertahankan untuk kompatibilitas Apache/LiteSpeed, tetapi source of truth live routing untuk website ini adalah `nginx.conf` + `router.php`.

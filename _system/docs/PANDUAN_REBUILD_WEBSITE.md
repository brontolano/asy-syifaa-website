# PANDUAN MEMBUAT ULANG WEBSITE
# Pondok Pesantren Islam Internasional Terpadu
# Asy-Syifaa Wal Mahmuudiyyah

> Dokumen ini adalah panduan lengkap (style guide, struktur, & konten) untuk membangun ulang website Pondok Pesantren Asy-Syifaa Wal Mahmuudiyyah dari nol. Cocok dipakai sebagai brief untuk developer atau AI Code Generator (Claude, ChatGPT, Cursor, dll).

---

## DAFTAR ISI

1. [Identitas & Branding](#1-identitas--branding)
2. [Style Guideline](#2-style-guideline)
   - 2.1 Color Palette
   - 2.2 Typography
   - 2.3 Spacing & Radius
   - 2.4 Library Eksternal (CDN)
3. [Komponen UI Standar](#3-komponen-ui-standar)
4. [Struktur Folder & File](#4-struktur-folder--file)
5. [Struktur Navigasi (Navbar)](#5-struktur-navigasi-navbar)
6. [Halaman & Konten](#6-halaman--konten)
   - 6.1 Home (Beranda)
   - 6.2 Profile (Visi Misi, Kurikulum, dll)
   - 6.3 Direktori
   - 6.4 Pendaftaran
   - 6.5 Kegiatan
   - 6.6 Informasi
   - 6.7 Galeri
   - 6.8 E-Raport
7. [Backend & Database](#7-backend--database)
8. [JavaScript & Interaktivitas](#8-javascript--interaktivitas)
9. [Responsive Design / Breakpoint](#9-responsive-design--breakpoint)
10. [Footer Standar](#10-footer-standar)
11. [SEO & Meta Tags](#11-seo--meta-tags)
12. [Checklist Pembangunan](#12-checklist-pembangunan)

---

## 1. IDENTITAS & BRANDING

| Item | Nilai |
|---|---|
| **Nama Lengkap** | Pondok Pesantren Islam Internasional Terpadu Asy-Syifaa Wal Mahmuudiyyah |
| **Nama Singkat** | Asy-Syifaa Wal Mahmuudiyyah |
| **Pimpinan / Mudir 'Am** | Prof. Dr. (H.C.) Abuya K.H. Muhammad Muhyiddin Abdul Qodir Al-Manafi, MA |
| **Rois 'Am** | Mu'allim Muhammad Tsabit |
| **Tagline** | "Pesantren unggul & terpercaya dalam membangun generasi Muslim yang berakhlakul karimah, cerdas, dan siap menjadi pemimpin masa depan." |
| **Alamat** | Haurngombong, Kec. Pamulihan, Kabupaten Sumedang, Jawa Barat 45365 |
| **WhatsApp Administrasi** | 0853-2217-0007 (https://wa.me/6285322170007) |
| **WhatsApp Muadalah** | 0817-7647-6495 (https://wa.me/6281776476495) |
| **Facebook** | https://www.facebook.com/AsySyifaaTV |
| **Instagram** | https://www.instagram.com/asysyifaapusat/ |
| **YouTube** | https://www.youtube.com/@AsySyifaaTVOfficial |
| **TikTok** | https://www.tiktok.com/@asysyifaapusat |
| **Logo** | `assets/img/logo.png` |
| **Favicon** | `AsySyifaa.ico` |

---

## 2. STYLE GUIDELINE

### 2.1 Color Palette

Definisikan di `:root` pada CSS:

```css
:root {
  --primary-green: #206c4e;     /* Hijau utama (interaktif, judul, CTA) */
  --dark-green:    #1a3e2c;     /* Hijau gelap (navbar, footer, background) */
  --accent-gold:   #FFD700;     /* Emas (aksen, border, highlight) */
  --light-gray:    #f5f5f5;     /* Background section */
  --text-dark:     #343A40;     /* Teks utama */
  --text-light:    #ffffff;     /* Teks di atas background gelap */
  --radius:        15px;        /* Border-radius standar */

  /* Versi RGB untuk rgba() opacity */
  --primary-green-rgb: 32, 108, 78;
  --dark-green-rgb:    26, 62, 44;
  --accent-gold-rgb:   255, 215, 0;
}
```

**Background body utama:** `#fcfcfc` (off-white).

**Status Badge (untuk tabel direktori):**
| Status | Background | Text Color |
|---|---|---|
| `.status-aktif` | `#d4edda` | `#155724` |
| `.status-waqof` | `#f8d7da` | `#721c24` |
| `.status-alumni` | `#ffeeba` | `#856404` |
| `.status-Pengabdian` | `#cce5ff` | `#004085` |

### 2.2 Typography

**Font dari Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
```

| Penggunaan | Font | Weight | Catatan |
|---|---|---|---|
| **Heading (h1–h6)** | `Playfair Display`, serif | 700 / 800 | Warna `--dark-green` |
| **Body & Paragraf** | `Poppins`, sans-serif | 400 / 500 / 600 | `font-size: 0.95rem`, `line-height: 1.6` |
| **Quote / Display** | `Playfair Display`, serif italic | 700 | `clamp(1.6rem, 4.5vw, 2.4rem)` |
| **Section Title (h2)** | `Playfair Display` | 700 | `clamp(1.8rem, 4vw, 2.4rem)`, warna `--primary-green` |
| **Sub-heading (pill)** | `Playfair Display` | 800 | `clamp(1.5rem, 4vw, 2.3rem)`, uppercase, gradient bg |

**Aturan:**
- `<body>` default: `font-family: 'Poppins', sans-serif;` `font-size: 0.95rem;` `padding-top: 75px;` (kompensasi navbar fixed).
- `h1–h6` selalu `font-family: 'Playfair Display', serif; font-weight: 700; color: var(--dark-green);`.
- `.section-header h2` punya underline emas:
  ```css
  .section-header h2::after {
    content: '';
    position: absolute;
    bottom: 0; left: 50%;
    transform: translateX(-50%);
    width: 80px; height: 4px;
    background-color: var(--accent-gold);
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(var(--accent-gold-rgb), 0.4);
  }
  ```

### 2.3 Spacing & Radius

| Token | Nilai |
|---|---|
| Border radius standar | `15px` (`var(--radius)`) |
| Border radius card kecil | `10px` (mobile) |
| Border radius pill / button | `50px` |
| Section padding (desktop) | `py-5` Bootstrap (`3rem 0`) atau `80px 0` untuk hero/video |
| Container | Bootstrap `.container` |

### 2.4 Library Eksternal (CDN)

Wajib disertakan di `<head>` setiap halaman:

```html
<!-- Bootstrap 5.3.3 -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Bootstrap Icons -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">

<!-- Font Awesome 6.5 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

<!-- Google Fonts: Playfair Display + Poppins -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">

<!-- AOS (Animate On Scroll) -->
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

<!-- Custom CSS -->
<link rel="stylesheet" href="assets/style.css">
```

Dan sebelum `</body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script src="assets/script.js"></script>
```

---

## 3. KOMPONEN UI STANDAR

### 3.1 Navbar (Fixed Top)

- Background: `linear-gradient(135deg, var(--primary-green), var(--dark-green))`
- Border-bottom: `3px solid var(--accent-gold)`
- Padding vertikal: `8px 0`
- Brand: logo `70x70` + nama pondok `fs-4`
- Nav-link warna `rgba(255,255,255,0.9)`, hover → `var(--accent-gold)` + `translateY(-2px)`

**Dropdown Modern:**
- Background: `rgba(var(--dark-green-rgb), 0.7)` + `backdrop-filter: blur(10px)`
- Border: `1px solid rgba(var(--accent-gold-rgb), 0.2)`
- Border-radius: `12px`
- Hover dropdown-item: `background-color: rgba(var(--primary-green-rgb), 0.8)` + `translateX(5px)`

### 3.2 Hero Section

```css
.hero-section {
  position: relative;
  height: calc(100vh - 105px);
  min-height: 500px;
  color: white;
  display: flex; align-items: center; justify-content: center;
  text-align: center;
}
.hero-bg {
  position: absolute; inset: 0;
  background-size: cover;
  background-position: center;
}
.hero-overlay { background: rgba(0,0,0,0.65); position: absolute; inset: 0; }
```

- `.hero-title`: `clamp(1.5rem, 3vw, 2.5rem)` warna putih
- `.hero-brand`: warna emas, font Playfair, ukuran besar
- Tombol CTA: `.btn-outline-light rounded-pill`

### 3.3 Section Header (Pill Sub-heading)

```html
<div class="section-header text-center">
  <h2>Judul Section</h2>
  <span class="sub-heading">SUBJUDUL</span>
</div>
```

`.sub-heading` punya gradient bg `linear-gradient(135deg, var(--dark-green), var(--primary-green))`, border `3px solid var(--accent-gold)`, border-radius `50px`, padding `0.8rem 2.5rem`, hover `translateY(-7px) scale(1.03)`.

### 3.4 Card Statistik (Counter)

```html
<div class="stat-box">
  <div class="stat-number-wrapper">+<span class="stat-number" data-target="600">0</span></div>
  <div class="stat-label">Santri Banin</div>
</div>
```

- Background white, border-radius `15px`, padding `30px`
- Box-shadow: `0 8px 25px rgba(0,0,0,0.09)`
- Hover: `translateY(-10px)` shadow lebih besar
- Counter dianimasi pakai IntersectionObserver (lihat `script.js`)

### 3.5 Card Ekstrakurikuler

```html
<div class="ekskul-card">
  <div class="ekskul-img">
    <img src="..." alt="Nama Ekskul" loading="lazy">
    <div class="ekskul-overlay"></div>
    <div class="ekskul-badge"><i class="fa-solid fa-icon"></i></div>
  </div>
  <div class="ekskul-content">
    <span class="ekskul-tag">Nama Ekskul</span>
  </div>
</div>
```

- Lebar fixed `200px` (desktop) / `160px` (mobile)
- Border-radius `15px`, overflow hidden
- Hover: zoom image, highlight tag

### 3.6 Card Guru

```html
<div class="guru-card">
  <div class="guru-img-container">
    <img src="..." alt="Nama" loading="lazy">
    <div class="guru-overlay"></div>
  </div>
  <div class="guru-content">
    <div class="guru-jabatan">JABATAN</div>
    <h4 class="guru-nama">Nama Lengkap</h4>
    <div class="guru-line"></div>
  </div>
</div>
```

- Lebar `180–280px`, foto `220–350px` tinggi
- Jabatan: uppercase, letter-spacing `1.5px`, warna `--primary-green`
- Nama: Playfair Display 1.1–1.3rem, warna `--dark-green`
- Line aksen emas `40x3px`, hover memanjang ke `80px`

### 3.7 Gallery Item (Instagram Grid)

```html
<a href="..." class="gallery-item">
  <img src="..." alt="...">
  <div class="gallery-item-info">
    <h3>Judul</h3>
    <p>Deskripsi singkat</p>
  </div>
</a>
```

- Grid 3 kolom desktop, 2 kolom mobile
- Aspect-ratio 1:1
- Hover: zoom + tampil overlay info gradient

### 3.8 Tombol Standar

| Class | Penggunaan |
|---|---|
| `.btn-outline-light rounded-pill px-5 py-2` | CTA hero |
| `.btn-outline-success rounded-pill px-4` | "Lihat Semua" |
| `.btn-premium-cta` | CTA gradient hijau |
| `.load-more-btn` | "Muat Lebih Banyak" galeri |

### 3.9 Quote Section

```html
<section id="quote-modern" class="py-5">
  <div class="container">
    <div class="quote-wrapper text-center">
      <span class="quote-icon">"</span>
      <blockquote class="quote-text-modern">
        Barangsiapa yang Alloh kehendaki kebaikan baginya, niscaya Alloh akan memahamkan dia dalam urusan agamanya.
      </blockquote>
      <footer class="quote-author">— Hadits Riwayat Bukhari & Muslim —</footer>
    </div>
  </div>
</section>
```

### 3.10 Timeline Royal (Kegiatan Harian Desktop)

- Garis vertikal di tengah
- Item zig-zag kiri-kanan
- Per item: `tr-card` (waktu, judul, deskripsi) + `tr-dot` + `tr-opposite-time`

### 3.11 Timeline Dynamic (Alur Pendaftaran)

- Garis vertikal `.timeline-line`
- `.timeline-item.left` / `.timeline-item.right` zig-zag
- `.timeline-marker` lingkaran berisi nomor (1–6); marker khusus → `.gold-marker`
- Card: `.glass-panel` dengan `backdrop-filter: blur` + border halus

### 3.12 Tombol Back-to-Top

```html
<a href="#top" id="backToTop" title="Kembali ke atas">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
    <path d="M10,0L9.4,0.6L0.8,9.1l1.2,1.2l7.1-7.1V20h1.7V3.3l7.1,7.1l1.2-1.2l-8.5-8.5L10,0z"></path>
  </svg>
</a>
```

Fixed bottom 40px right 40px, circular, background `--primary-green`, muncul setelah scroll 300px.

### 3.13 Search Overlay

- Fixed full screen
- Background `rgba(var(--dark-green-rgb), 0.95)` + blur 12px
- Input besar dengan border `3px solid var(--accent-gold)`
- Form submit GET ke `Pencarian.html?s={query}`

---

## 4. STRUKTUR FOLDER & FILE

```
Website_Pondok_Pesantren_Asy-Syifaa_Wal_Mahmuudiyyah/
├── index.html                       # Halaman utama (Beranda)
├── Alur Pendaftaran.html           # Syarat & alur pendaftaran
├── Daftar Sekarang.html            # Form pendaftaran online
├── Hasil Seleksi.html              # Pengumuman hasil seleksi
├── E-Raport.html                   # Cek raport via NIS
├── Pencarian.html                  # Halaman hasil search
├── AsySyifaa.ico                   # Favicon
├── proses_daftar.php               # Endpoint terima form pendaftaran
├── cek_raport_api.php              # API GET ?nis=... → JSON nilai
├── koneksi.php                     # Konfigurasi koneksi MySQL
│
├── assets/
│   ├── style.css                   # CSS utama (semua komponen)
│   ├── script.js                   # JS: AOS, slider, search, counter, dll
│   ├── db_pesantren.sql            # Skema database
│   └── img/
│       ├── logo.png
│       ├── slider1.jpg ... slider5.jpg
│       └── Foto Terkini/
│
├── Profile/
│   ├── Profile.html                # Pemilihan profil (Abuya / Pondok)
│   ├── Visi Dan Misi.html
│   ├── Kurikulum.html
│   ├── Fasilitas Pesantren.html
│   ├── Ekstrakulikuler.html
│   ├── Struktur Organisasi.html
│   ├── Guru.html
│   └── Profile Pondok Pesantren/
│       ├── Profile Abuya.html
│       └── Profile Pondok Pesantren.html
│
├── Direktori/
│   ├── Direktori Banin.html        # Tabel santri putra
│   ├── Direktori Banat.html        # Tabel santri putri
│   ├── Direktori Pengajar.html
│   ├── Direktori Alumni.html
│   ├── Data Base Banin Master 2025 - WEB.xlsx
│   ├── Data Base Banat Master 2025 - WEB.xlsx
│   └── Data Base Dewan Pengajar - WEB.xlsx
│
├── Kegiatan/
│   ├── Kegiatan Harian.html        # Timeline royal harian
│   └── Kegiatan Mingguan.html      # Mingguan / Bulanan / Tahunan
│
├── Informasi/
│   ├── Pengumuman.html
│   └── Prestasi.html
│
└── Galeri/
    ├── Galeri Foto Page 1.html
    ├── Galeri Foto Page 2.html
    ├── 17 Agustus 2025.html
    ├── Maulid Akbar 1447 H.html
    ├── Wisuda VI.html
    ├── PSB 2026.html
    ├── ...30+ event lain
    └── img/                        # Folder per-event
```

---

## 5. STRUKTUR NAVIGASI (NAVBAR)

Navbar muncul di SEMUA halaman dengan struktur sama. Dropdown muncul saat hover (desktop) / klik (mobile).

```
1. Beranda                          → index.html
2. Profile (dropdown)
   ├─ Profile                       → Profile/Profile.html
   ├─ Visi & Misi                   → Profile/Visi Dan Misi.html
   ├─ Kurikulum                     → Profile/Kurikulum.html
   ├─ Fasilitas Pesantren           → Profile/Fasilitas Pesantren.html
   ├─ Ekstrakurikuler               → Profile/Ekstrakulikuler.html
   ├─ Struktur Organisasi           → Profile/Struktur Organisasi.html
   └─ Guru                          → Profile/Guru.html
3. Direktori (dropdown)
   ├─ Direktori Santri Banin        → Direktori/Direktori Banin.html
   ├─ Direktori Santri Banat        → Direktori/Direktori Banat.html
   ├─ Direktori Pengajar            → Direktori/Direktori Pengajar.html
   └─ Direktori Alumni              → Direktori/Direktori Alumni.html
4. Pendaftaran (dropdown)
   ├─ Alur & Syarat Pendaftaran     → Alur Pendaftaran.html
   ├─ Daftar Sekarang               → Daftar Sekarang.html
   └─ Hasil Seleksi                 → Hasil Seleksi.html
5. Kegiatan (dropdown)
   ├─ Harian                        → Kegiatan/Kegiatan Harian.html
   └─ Mingguan, Bulanan, Tahunan    → Kegiatan/Kegiatan Mingguan.html
6. Informasi (dropdown)
   ├─ Pengumuman                    → Informasi/Pengumuman.html
   ├─ Prestasi                      → Informasi/Prestasi.html
   └─ E-Raport                      → E-Raport.html
7. Galeri                           → Galeri/Galeri Foto Page 1.html
8. 🔍 Search (icon)                 → toggle overlay search
```

**Icon FontAwesome per menu (untuk tampilan):**
- Beranda → `fa-house`
- Profile → `fa-school`
- Direktori → `fa-address-book`
- Pendaftaran → `fa-user-plus`
- Kegiatan → `fa-calendar-alt`
- Informasi → `fa-info`
- Galeri → `fa-images`
- Search → `fa-search`

---

## 6. HALAMAN & KONTEN

### 6.1 index.html (Beranda)

**Section berurutan dari atas ke bawah:**

1. **Hero Section**
   - Background image: `assets/img/slider1.jpg` (overlay dark)
   - Intro: "Selamat Datang di Website Resmi" (uppercase, kecil)
   - Title: "Pondok Pesantren Islam Internasional Terpadu Terpadu"
   - Brand (gold): "Asy-Syifaa Wal Mahmuudiyyah"
   - CTA: tombol "Selengkapnya" → `Profile/Profile.html`

2. **Quote Section**
   - Hadits: *"Barangsiapa yang Alloh kehendaki kebaikan baginya, niscaya Alloh akan memahamkan dia dalam urusan agamanya."*
   - Sumber: "— Hadits Riwayat Bukhari & Muslim —"

3. **Statistik (counter animasi)**
   - +600 Santri Banin
   - +400 Santri Banat
   - +100 Alumni
   - +80 Pendidik

4. **Video Profile (Cinematic)**
   - YouTube embed: `https://www.youtube.com/embed/zyiKW6JHdP8`
   - Aspect ratio desktop: 21:9 (`--bs-aspect-ratio: 42.55%`)
   - Mobile: 16:9
   - Overlay: `<h2>Profile Pondok</h2>` + paragraf deskripsi
   - Border atas-bawah: 4px solid gold

5. **Ekstrakurikuler (slider horizontal)**
   - Heading: "Ekstrakurikuler"
   - Sub: "Wadah pengembangan bakat dan kreativitas santri dengan fasilitas modern dan pembimbing ahli."
   - Daftar ekskul (placeholder image `placehold.co/400x600/206c4e/white`):
     1. Bahtsul Masail — `fa-book-open`
     2. Khitobah — `fa-microphone-lines`
     3. Pencak Silat — `fa-user-ninja`
     4. Bahasa Arab — `fa-language`
     5. Hadroh & Terbangnan — `fa-music`
     6. Ilmu Alat — `fa-scroll`
   - Tombol "Lihat Semua" → `Profile/Ekstrakulikuler.html`
   - Navigasi prev/next button (desktop)

6. **Guru & Staf (slider horizontal)**
   - Heading: "Guru & Staf"
   - Sub: "Mengenal wajah-wajah pendidik yang berdedikasi membimbing santri dengan keilmuan dan akhlak mulia."
   - Daftar guru (40+ kartu — lihat detail di Section 6.2.7).

7. **Foto Terkini (Instagram Grid)**
   - Heading: "Foto Terkini"
   - 8 gallery item link ke halaman event:
     - PSB 2026
     - Wisuda VI
     - Malam Nishfu Sya'ban
     - Rajaban Akbar 1447 H
     - Sholat Ghoib Habib Umar Al-Jaelani
     - Dars Fajr Al Haddar
     - JUARA MQK SUMEDANG 2025
     - Dauroh Ilmiyyah Lora Ismail

8. **Footer** (lihat Section 10)

### 6.2 Profile

#### 6.2.1 Profile.html
Halaman pemilihan: 2 card besar — "Profile Abuya" dan "Profile Pondok Pesantren". Klik → masuk ke folder `Profile/Profile Pondok Pesantren/`.

#### 6.2.2 Visi Dan Misi.html

**Visi:**
> Menjadi Pesantren Islam Internasional Terpadu Asy-Syifaa Wal Mahmuudiyyah Unggul dan terpercaya dalam membangun generasi muslim yang berakhlaqul karimah, cerdas, kreatif, shaleh sebagai pemimpin umat, bangsa dan dunia dimasa depan.

**Misi:**

Membangun kualitas Pondok Pesantren Islam Internasional Terpadu Terpadu ASY-SYIFAA WAL MAHMUUDIYYAH dengan:

- Mewujudkan nilai Islam melalui penyelenggaraan pendidikan
- Melakukan pemberdayaan SDM secara berjenjang dan berkesinambungan
- Melakukan bimbingan secara komprehensif dengan berorientasi kepada terbentuknya akhlaqul karimah
- Melakukan pembelajaran yang aktif, kreatif, efektif, menyenangkan
- Melakukan penggalian dan pengembangan bakat secara berkala dan terprogram
- Mewujudkan **5 (lima) pilar keunggulan Asy-Syifaa**, meliputi:
  - Unggul dalam *Mafaahim* / Wawasan
  - Unggul dalam *Tahfiidz* / Hapalan
  - Unggul dalam *Amaliyyah* / Realisasi
  - Unggul dalam *Da'wah*
  - Unggul dalam *Lugoh* / Bahasa

**Layout:** 1 card lebar `max-width: 900px`, dalam class `.visi-card.curriculum-card`. Heading `h3.card-title` untuk "A. Visi" dan "B. Misi", body teks `.visi-text`.

#### 6.2.3 Kurikulum.html

**A. Tingkatan Kelas (4 kartu, grid 2x2 desktop)**

| Kelas | Materi |
|---|---|
| **Kelas Tamhidi (Persiapan)** | Tahsin & Tahfidz Al-Qur'an Dasar; Pengantar Bahasa Arab (Nahwu & Shorof); Aqidah & Akhlak Fundamental; Fiqh Ibadah Praktis |
| **Kelas Wustho** | Bahasa Arab Lanjutan & Percakapan; Ulumul Qur'an & Tafsir Tematik; Ulumul Hadits & Hadits Pilihan; Fiqh Muamalah & Munakahat; Sejarah Islam & Tarikh Tasyri' |
| **Kelas Ulya** | Tafsir Ahkam & Ulumul Qur'an Lanjutan; Ushul Fiqh & Qawaid Fiqhiyyah; Akhlak Tasawuf & Tazkiyatun Nafs; Metodologi Penelitian & Penulisan Ilmiah; Studi Isu Kontemporer Keumatan |
| **Kelas Pengabdian** | Praktek Pengajaran & Dakwah; Kuliah Kerja Nyata (KKN) Pesantren; Proyek Penelitian Komunitas; Pembinaan Karakter & Kepemimpinan; Persiapan Pasca-Pesantren |

**B. Daftar Kitab per Kelas (per `.curriculum-card`)**

Kelas 1 — Kelas 6 menampilkan kitab-kitab klasik Arab. Contoh **Kelas 1**:
- الأجرومية / متن بناء والأساس / أمثلة التصريفية / سفينة النجا / الأربعين النووية / مختار الأحاديث / فتح الجواد المنان / العقيدة العوام / المحاورة الجزء 1 / الأخلاق للبنين / خلاصة نور اليقين الجزء 1 / هداية المستفيد / الإملاء / الملك~المعارج

Kelas 2: المتممة الأجرومية الجزء 1 / الكيلاني / فتح القريب / تيجان الدراري / dst.

Kelas 3: العنوان الظرف / فوائد الإعلال / جواهر الكلامية / العربية للناشئين / dst.

Kelas 4 ke atas: ابن عقيل / شذا العرف / فتح المعين / dst.

> **Catatan:** Daftar kitab lengkap per-kelas ada di file asli `Profile/Kurikulum.html` baris 200–450. Saat rebuild, copy seluruh `<li>` Arab agar tidak typo.

#### 6.2.4 Fasilitas Pesantren.html
*(Saat ini halaman placeholder "Hasil Pencarian Tidak Ditemukan". Saat rebuild, isi dengan list fasilitas: Asrama Putra/Putri, Masjid, Ruang Kelas, Perpustakaan, Lab Komputer, Aula, Kantin, Lapangan, Klinik, dll.)*

#### 6.2.5 Ekstrakulikuler.html
*(Saat ini placeholder. Saat rebuild, isi dengan grid kartu dari 7 ekskul: Bahtsul Masail, Khutobah/Ceramah, Pencak Silat, Bahasa Arab, Komputer, Hadroh & Terbangnan, Ilmu Alat — dengan deskripsi & foto masing-masing.)*

#### 6.2.6 Struktur Organisasi.html
Bagan organisasi pondok. Sumber data tambahan: `Direktori/KEPENGURUSAN PONDOK.docx`.

#### 6.2.7 Guru.html (Daftar Pengajar)

Daftar guru lengkap (banin + banat). Berikut data lengkap dari Home slider:

**Pimpinan:**
1. Prof. Dr. (H.C.) Abuya K.H. Muhammad Muhyiddin Abdul Qodir Al-Manafi, MA — *Mudir 'Am*
2. Mu'allim Muhammad Tsabit — *Rois 'Am*

**Pengajar Banin:**
Mu'allim Muhammad Idris Syafei • Syarif Muhammad Al Hasani • Maulana Jafar Shodiq • Taufiq Sholeh • Muhammad Hasanuddin • Muhammad Iqbal • Muhammad Abu Yazid • Firman Hambali • Deden Maoludin • Acep Yana Nurdiana • Komarudin • Firman Jayusman • Ade Setiawan • Mochammad Wassy Abdul Basith • Sansan Suherlan • Muhammad Umar Al Kaff • Gun Gun Gunawan • Jajang Nurjaman • Abdul Rojak • Taufik • Adnan Muzaki • Cahya • Dadang Jalaludin • Moch Mukti Fauzi • Muhamad Salahudien Hambali • Ucu Jaja Jamaludin • Wail Akhyar Jamaludin • Ardi Erliansah • Azali Deva Muhamad • Toni Abdullah • Mochammad Fachrudin • Parhan Suhanda • Ahmad Wahya • Deden Tajudin • Dimas Lutfi Husen M. Dimyati • Mahmud

**Pengajar Banat:**
Muallimah Ika Siti Khodijah • Resti Damayanti • Fathimah Rosyidah • Mu'allimah Aisyah Tholibah • Mu'allimah Iis Midah

> Sumber lengkap: `Direktori/Data Base Dewan Pengajar - WEB.xlsx`

### 6.3 Direktori

Halaman tabel modern (sticky header, hover row, status badge berwarna).

| File | Sumber Data |
|---|---|
| Direktori Banin.html | `Data Base Banin Master 2025 - WEB.xlsx` |
| Direktori Banat.html | `Data Base Banat Master 2025 - WEB.xlsx` |
| Direktori Pengajar.html | `Data Base Dewan Pengajar - WEB.xlsx` |
| Direktori Alumni.html | (data alumni) |

**Kolom standar tabel:** No, NIS, Nama, TTL, Asal, Kelas, Status (`.status-aktif` / `.status-waqof` / `.status-alumni` / `.status-Pengabdian`).

**Style tabel:**
- `max-height: 75vh; overflow-y: auto;`
- Border-radius `18px`
- `thead` background `--primary-green`, `position: sticky; top: 0;`
- `tbody tr:hover` background `#e8f5e9`
- Cell padding `1rem 1.5rem`

### 6.4 Pendaftaran

#### 6.4.1 Alur Pendaftaran.html

**Tujuan Pendidikan** (panel atas):
- Menumbuhkan, membanggakan, membentuk dan mengarahkan santri menjadi hamba Allah yang sholeh secara individual dan sosial.
- Memberikan kemampuan dasar kepada santri berupa pengetahuan, keterampilan dan sikap terpuji sesuai usia perkembangan sebagai bekal hidup kehidupannya.

**Syarat Pendaftaran (3 card):**

| Icon | Syarat |
|---|---|
| `fa-graduation-cap` | **Ijazah** — Sudah memiliki ijazah minimal jenjang pendidikan Sekolah Dasar |
| `fa-quran` | **Baca Tulis Arab** — Mampu membaca dan menulis Arab (Al-Qur'an) |
| `fa-star-and-crescent` | **Hafalan Al-Qur'an** — Hafal Al-Qur'an minimal ½ Juz 'Amma (Surat Adh-Dhuha sampai Surat An-Naas) |

**Alur Pendaftaran (timeline 6 langkah, zig-zag):**

1. **Pendaftaran Online** — `fa-laptop-code` — Mengisi formulir di link: `https://bit.ly/PSB2026_PPIIT_Asy_Syifaa_Wal_Mahmuudiyyah`
2. **Tes/Ujian Masuk** — `fa-user-edit` — Mengikuti tes/ujian pada waktu yang ditentukan
3. **Pengumuman Kelulusan** — `fa-envelope-open-text` — Surat pemberitahuan lulus (gagal bisa ulang gelombang berikutnya)
4. **Administrasi Pendaftaran** (gold-marker) — `fa-coins` — **Rp. 7.750.000** dengan rincian (accordion):
   - SPP Bulan pertama Rp. 750.000 (makan & laundry)
   - Seragam Santri
   - Lemari pakaian gantung
   - Lemari pakaian lipat
   - Lemari kitab
   - Bangku belajar
   - Perlengkapan tidur (kasur, bantal, selimut)
   - Jariyah pembangunan
5. **Daftar Ulang** — `fa-file-contract` — Bawa berkas:
   - Fotokopi STTB/Ijazah terakhir (2 lembar)
   - Fotokopi KK terbaru (2 lembar)
   - Fotokopi Akta Kelahiran (2 lembar)
   - Fotokopi KTP Orangtua/Wali (2 lembar)
   - Pas foto latar biru: 2x3 (3 lembar) & 3x4 (3 lembar)
   - **Putra:** peci + gamis/koko putih
   - **Putri:** kerudung + gamis hitam
   - Surat Kelakuan Baik (Desa/Sekolah asal)
   - Surat Pernyataan bermaterai 10.000
   - Surat keterangan bebas TBC
6. **Penyerahan Berkas** — `fa-folder-open`
   - 🟢 **Stopmap Hijau:** Santri Putra
   - 🔴 **Stopmap Merah:** Santri Putri

**Catatan Penting:**
1. Calon Santri wajib sehat jasmani & akal, bebas rokok / obat terlarang / tato / LGBT / sifat buruk.
2. Bebas dari penyakit gila & ayan (kesurupan).
3. Saat masuk pondok wajib diantar orangtua/wali.

#### 6.4.2 Daftar Sekarang.html

Form HTML yang submit ke `proses_daftar.php`. Field sesuai tabel `pendaftaran_santri`:
- Data Santri: nama_lengkap, NISN, NIK, tempat & tanggal lahir, jenis_kelamin, gol_darah, anak_ke, jml_saudara, hobi, cita_cita, pendidikan_terakhir
- Data Ayah: nama, status, NIK, pekerjaan, penghasilan, no WA, alamat
- Data Ibu: nama, status, NIK, pekerjaan, no WA, alamat
- Data Keluarga: pembiaya, no_kk, kepala_keluarga

#### 6.4.3 Hasil Seleksi.html

Tabel hasil seleksi (NIS, Nama, Status Lulus/Tidak), bisa di-search.

### 6.5 Kegiatan

#### 6.5.1 Kegiatan Harian.html (Timeline Royal)

| Waktu | Kegiatan | Deskripsi |
|---|---|---|
| 03:00 – 04:00 | **Bangun & Qiyamul Lail** | Mandi, Tahajud, Munajat, Menghafal, Muthola'ah |
| 04:00 – 06:00 | **Sholat Shubuh & Wirid** | Berjamaah, Mengaji Quran / Baca Rotib (Wirdul Latif, Yasin) |
| 06:00 – 07:00 | **KBM (Mengaji) 1** | Kajian Kitab Kuning / Tahfidz |
| 07:00 – 08:00 | **Persiapan & Sarapan** | Mandi Pagi, Sarapan Pagi, Persiapan Sekolah |
| 08:00 – 09:30 | **KBM (Mengaji) 2** | Kegiatan Belajar Mengajar Sesi Kedua |
| 09:30 – 10:00 | **Sholat Dhuha & Istirahat** | Jeda istirahat dan sholat sunnah |
| 10:00 – 12:00 | **KBM (Mengaji) 3 & 4** | Melanjutkan KBM |
| 12:00 – 12:30 | **Sholat Dzuhur Berjamaah** | Dilanjutkan dengan Wirid |
| 12:30 – 14:45 | **Makan Siang & Istirahat** | Ishoma (Istirahat, Sholat, Makan) |
| 15:00 – 17:00 | **Sholat Ashar & KBM 5** | Sholat Ashar Berjamaah, Wirid, Mengaji Sore |
| 18:00 – 20:00 | **Maghrib, Rotib & Isya** | Sholat Maghrib, Yasin/Waqiah/Mulk, Rotib Al-Haddad, Sholat Isya |
| 21:00 – 22:00 | **Muthola'ah / Muroja'ah** | Mengulang pelajaran dan belajar mandiri |

**Layout:**
- **Desktop:** `.timeline-royal` (zig-zag, garis vertikal tengah)
- **Mobile:** "Ultra Compact Agenda" — sticky header per-segmen (Pagi/Siang/Sore/Malam)

#### 6.5.2 Kegiatan Mingguan.html (Mingguan / Bulanan / Tahunan)

3 kartu (`.kegiatan-card`) layout `col-lg-4`:

**Mingguan:**
- Membaca Maulid (setiap malam Jum'at)
- Puasa Senin & Kamis
- Mafahim setiap Kamis siang bersama Abuya KH. M. Muhyiddin Abdul Qodir Al-Manafi, MA
- Rouhah setiap Minggu sore
- Pengajian Rutinan malam Kamis

**Bulanan + Ekstrakulikuler:**
- Pengajian Rutin Bulanan (minggu pertama)
- Ekskul: Bahtsul Masail / Khutobah / Pencak Silat / Bahasa Arab / Komputer / Hadroh & Terbangnan / Ilmu Alat

**Tahunan:**
- Ziarah Wali Songo & menghadiri Haul Imamain RA.
- Ziarah Pamijahan & Tadabbur Pantai Cipatuja
- Ziarah Wali Jakarta & Banten
- Haflah Akhir Sanah
- Maulid Akbar
- Rajaban Akbar
- Sillaturahmi Akbar

### 6.6 Informasi

#### 6.6.1 Pengumuman.html
Daftar pengumuman pondok (post list dengan tanggal, judul, ringkasan).

#### 6.6.2 Prestasi.html
Daftar prestasi santri. Contoh referensi dari galeri:
- JUARA MQK SUMEDANG 2025
- JUARA MQKI
- JUARA MQKN JABAR
- MQKN JUARA 1

### 6.7 Galeri

#### 6.7.1 Galeri Foto Page 1 & 2.html
Grid galeri dengan filter kategori + load-more pagination (default 6 item, +6 per klik).

#### 6.7.2 Halaman event spesifik (30+ file)
Setiap event punya halaman sendiri dengan grid foto. Contoh:
- 17 Agustus 2025
- Acara Puncak Tasyrik
- Dars Fajr Al Haddar / Sayyid Alwi
- Dauroh Ilmiyyah (Al Munsib Al Athos / Lora Ismail / Qiro'ah / Syeikh Sholeh)
- JUARA MQKI / MQKN JABAR / MQKN JUARA 1 / MQK SUMEDANG 2025
- Kedatangan Santri baru / Perkenalan Santri baru 2025
- Lomba Agustusan
- Malam Nishfu Sya'ban
- Maulid Akbar 1447 H / Maulid Pusaka 1447 H / Prepare Maulid Akbar 1447 H
- PSB 2026
- Pawai Obor Tahun Baru Islam 1447 H
- Rajaban Akbar 1447 H
- Selamat Kuliah
- Sholat Ghoib Habib Umar Al-Jaelani
- Tabligh Akbar Habib Muhammad Al-Habsy
- TASYRIK CHAMPIONSHIP
- Upacara Hari Santri
- Wisuda VI

### 6.8 E-Raport.html

**Form Cek Raport Online:**

```html
<form id="formRaport">
  <input type="text" name="nis" placeholder="Masukkan NIS Santri" required>
  <button type="submit">Cek Raport</button>
</form>
<div id="hasilRaport"></div>
```

**Logic JavaScript:**
1. User input NIS
2. `fetch('cek_raport_api.php?nis=' + nis)`
3. Render JSON response (nama, kelas, nilai_rata_rata, detail nilai per mapel)
4. Tampilkan loading state & error handling

---

## 7. BACKEND & DATABASE

### 7.1 koneksi.php

```php
<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "db_pesantren";
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) die("Koneksi gagal: " . $conn->connect_error);
$conn->set_charset("utf8mb4");
?>
```

### 7.2 proses_daftar.php

Terima POST dari `Daftar Sekarang.html`, sanitize input, INSERT ke tabel `pendaftaran_santri`, redirect ke halaman sukses.

### 7.3 cek_raport_api.php

```php
<?php
header('Content-Type: application/json');
include 'koneksi.php';

$nis = $_GET['nis'] ?? '';
$stmt = $conn->prepare("SELECT * FROM nilai_santri WHERE nis = ?");
$stmt->bind_param("s", $nis);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();

if ($result) {
  echo json_encode(["status" => "ok", "data" => $result]);
} else {
  echo json_encode(["status" => "error", "msg" => "NIS tidak ditemukan"]);
}
?>
```

### 7.4 Skema Database (db_pesantren.sql)

**Tabel `pendaftaran_santri`:**

| Field | Tipe |
|---|---|
| id | INT PK AUTO_INCREMENT |
| nama_lengkap | VARCHAR(100) |
| nisn | VARCHAR(20) |
| nik_santri | VARCHAR(20) |
| tempat_lahir | VARCHAR(50) |
| tgl_lahir | DATE |
| jenis_kelamin | ENUM('L','P') |
| gol_darah | VARCHAR(5) |
| anak_ke | INT |
| jml_saudara | INT |
| hobi | VARCHAR(100) |
| cita_cita | VARCHAR(100) |
| pendidikan_terakhir | VARCHAR(50) |
| nama_ayah, status_ayah, nik_ayah, pekerjaan_ayah, penghasilan_ayah, no_wa_ayah, alamat_ayah | VARCHAR |
| nama_ibu, status_ibu, nik_ibu, pekerjaan_ibu, no_wa_ibu, alamat_ibu | VARCHAR |
| pembiaya, no_kk, kepala_keluarga | VARCHAR |
| waktu_daftar | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |

Engine: **InnoDB**, charset: **utf8mb4**.

**Tabel `nilai_santri`** (untuk E-Raport):

| Field | Tipe |
|---|---|
| nis | VARCHAR(20) PK |
| nama | VARCHAR(100) |
| kelas | VARCHAR(20) |
| nilai_rata_rata | DECIMAL(5,2) |
| (kolom mapel) | DECIMAL(5,2) |

---

## 8. JAVASCRIPT & INTERAKTIVITAS

File `assets/script.js` punya 9 fitur utama. Implementasi berikut adalah blueprint:

### 8.1 Inisialisasi AOS
```javascript
AOS.init({ duration: 800, once: true, offset: 50 });
```

### 8.2 Back to Top
```javascript
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
});
```

### 8.3 Search Overlay Toggle
```javascript
document.getElementById('toggleSearch').addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('searchOverlay').classList.add('active');
});
document.getElementById('closeSearch').addEventListener('click', () => {
  document.getElementById('searchOverlay').classList.remove('active');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('searchOverlay').classList.remove('active');
});
```

### 8.4 Counter Animasi (IntersectionObserver)
```javascript
document.querySelectorAll('.stat-number').forEach(stat => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +stat.dataset.target;
        const duration = 2000;
        const stepTime = 16;
        const steps = duration / stepTime;
        const inc = target / steps;
        let current = 0;
        const counter = setInterval(() => {
          current += inc;
          if (current >= target) {
            stat.textContent = target.toLocaleString();
            clearInterval(counter);
          } else {
            stat.textContent = Math.floor(current).toLocaleString();
          }
        }, stepTime);
        observer.unobserve(stat);
      }
    });
  }, { threshold: 0.6 });
  observer.observe(stat);
});
```

### 8.5 Slider Ekstrakurikuler
```javascript
const track = document.getElementById('ekskulTrack');
document.querySelector('.next-btn').onclick = () => track.scrollBy({ left: 325, behavior: 'smooth' });
document.querySelector('.prev-btn').onclick = () => track.scrollBy({ left: -325, behavior: 'smooth' });
```

### 8.6 Slider Guru (sama, scrollAmount 310px)

### 8.7 Video Modal
Listener `show.bs.modal` ambil `data-video-url`, set ke `iframe.src`. `hidden.bs.modal` clear src.

### 8.8 Load More Galeri
Default visible 6 item, klik tombol → tampil 6 lagi, sembunyikan tombol saat semua tampil.

### 8.9 Site Search Index
Array berisi 20+ entri (title, url, keywords). Filter pakai query param `s`, render highlight `<mark>`.

```javascript
const searchData = [
  { title: "Beranda", url: "index.html", keywords: "home beranda utama" },
  { title: "Visi & Misi", url: "Profile/Visi Dan Misi.html", keywords: "visi misi tujuan" },
  // ... 20+ entries
];
```

---

## 9. RESPONSIVE DESIGN / BREAKPOINT

| Breakpoint | Deskripsi |
|---|---|
| `> 992px` | Desktop full — video cinematic 21:9 |
| `768px – 992px` | Tablet — grid 2 kolom |
| `< 768px` | Mobile — body padding-top 70-80px, navbar collapse, card mini |
| `< 576px` | Mobile kecil — hero 350px min-height, gallery 2 kolom |

**Mobile patches penting (`@media (max-width: 767.98px)`):**
- `body { padding-top: 70px; overflow-x: hidden; }`
- `.section-header h2 { font-size: 1.5rem !important; text-align: center !important; }`
- `.ekskul-card { flex: 0 0 160px !important; height: 220px !important; }`
- `.guru-card { flex: 0 0 160px !important; }` & `.guru-img-container { height: 190px !important; }`
- `.gallery-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px !important; }`
- `.hero-section { height: 100vh; min-height: 500px; display: flex; flex-direction: column; justify-content: center; align-items: center; }`
- `.hero-bg { background-position: 75% center !important; filter: brightness(0.7); }`

---

## 10. FOOTER STANDAR

Tampil di SEMUA halaman, layout 4 kolom (`row gy-5`):

### Kolom 1 (col-lg-4): Branding
- Logo `assets/img/logo.png` `80x80`
- Judul: "Asy-Syifaa Wal Mahmuudiyyah"
- Deskripsi: "Pesantren unggul & terpercaya dalam membangun generasi Muslim yang berakhlakul karimah, cerdas, dan siap menjadi pemimpin masa depan."
- 4 social icon: Facebook, Instagram, YouTube, TikTok (lihat link di Section 1)

### Kolom 2 (col-lg-2): Tautan Penting
- Visi & Misi → `Profile/Visi Dan Misi.html`
- Alur & Syarat Pendaftaran → `Alur Pendaftaran.html`
- Direktori Santri Banin → `Direktori/Direktori Banin.html`
- Direktori Santri Banat → `Direktori/Direktori Banat.html`
- Kegiatan Santri → `Kegiatan/Kegiatan Harian.html`
- Kurikulum Santri → `Profile/Kurikulum.html`

### Kolom 3 (col-lg-3): Hubungi Kami
- 📍 Alamat: Haurngombong, Kec. Pamulihan, Kabupaten Sumedang, Jawa Barat 45365
- 📱 WA Administrasi: 0853-2217-0007
- 📱 WA Muadalah: 0817-7647-6495

### Kolom 4 (col-lg-3): Lokasi (Google Maps Embed)

```html
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.94427321582!2d107.82905607481875!3d-6.897268967496455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68daea5822cbff%3A0xdfe3d87acad09232!2sAsy-Syifaa%20Pusat!5e0!3m2!1sid!2sid!4v1750775764062!5m2!1sid!2sid" loading="lazy"></iframe>
```

Filter map: `grayscale(0.8) contrast(1.1)`, hover hilangkan grayscale.

### Footer Bottom
```html
<div class="footer-bottom text-center small py-4" style="border-top: 1px solid rgba(255,255,255,0.1);">
  <p class="m-0 text-white-50">© 2026 Pondok Pesantren Islam Internasional Terpadu Asy-Syifaa Wal Mahmuudiyyah. All Rights Reserved.</p>
</div>
```

---

## 11. SEO & META TAGS

Tempel di `<head>` index.html (sesuaikan per halaman lain):

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ponpes Asy-Syifaa Wal Mahmuudiyyah - Website</title>

<meta name="description" content="Website resmi Ponpes Asy-Syifaa Wal Mahmuudiyyah Sumedang asuhan Abuya K.H. M. Muhyiddin. Pesantren modern berstandar internasional, mencetak santri berakhlak dan berprestasi. Info PSB 2026 klik di sini.">
<meta name="keywords" content="Pondok Pesantren Sumedang, Asy-Syifaa Wal Mahmuudiyyah, Abuya Muhyiddin, Pesantren Internasional, PSB 2026, Santri Modern, Sekolah Islam Terpadu, Ponpes Jawa Barat">
<meta name="author" content="Tim IT Asy-Syifaa Wal Mahmuudiyyah">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#206c4e">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://asy-syifaa.com/">
<meta property="og:title" content="Ponpes Asy-Syifaa Wal Mahmuudiyyah Sumedang">
<meta property="og:description" content="Pondok Pesantren Islam Internasional Terpadu. Membangun Generasi Qur'ani dan Berwawasan Global.">
<meta property="og:image" content="assets/img/slider1.jpg">
<meta property="og:image:alt" content="Gedung Utama Asy-Syifaa Wal Mahmuudiyyah">
<meta property="og:site_name" content="Asy-Syifaa Wal Mahmuudiyyah">
<meta property="og:locale" content="id_ID">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Ponpes Asy-Syifaa Wal Mahmuudiyyah - Sumedang">
<meta name="twitter:description" content="Pondok Pesantren Islam Internasional Terpadu asuhan Abuya K.H. M. Muhyiddin.">
<meta name="twitter:image" content="assets/img/slider1.jpg">

<link rel="icon" href="assets/img/logo.png" type="image/png" sizes="32x32">
```

---

## 12. CHECKLIST PEMBANGUNAN

Gunakan checklist berikut sebagai urutan pengerjaan:

### Tahap 1: Setup Dasar
- [ ] Buat struktur folder sesuai Section 4
- [ ] Download/siapkan logo + favicon + slider1-5.jpg
- [ ] Buat `assets/style.css` dengan `:root` variables (Section 2.1)
- [ ] Setup font Google Fonts (Playfair + Poppins)
- [ ] Tambahkan semua CDN library di `<head>` template

### Tahap 2: Komponen Reusable
- [ ] Buat partial / template navbar (Section 5)
- [ ] Buat partial / template footer (Section 10)
- [ ] Buat back-to-top button + search overlay
- [ ] Setup `assets/script.js` dengan AOS init + handler dasar

### Tahap 3: Halaman Utama
- [ ] **index.html** — semua 7 section (Hero, Quote, Stats, Video, Ekskul, Guru, Foto Terkini)
- [ ] **Profile/Visi Dan Misi.html** (konten siap di Section 6.2.2)
- [ ] **Profile/Kurikulum.html** (4 kelas + daftar kitab)
- [ ] **Profile/Guru.html** (40+ guru dari Section 6.2.7)
- [ ] **Profile/Profile.html, Fasilitas Pesantren.html, Ekstrakulikuler.html, Struktur Organisasi.html**

### Tahap 4: Direktori
- [ ] Konversi `.xlsx` master ke JSON/HTML tabel
- [ ] **Direktori/Direktori Banin.html** (tabel modern + status badge)
- [ ] **Direktori/Direktori Banat.html**
- [ ] **Direktori/Direktori Pengajar.html**
- [ ] **Direktori/Direktori Alumni.html**

### Tahap 5: Pendaftaran
- [ ] **Alur Pendaftaran.html** — timeline 6 langkah (Section 6.4.1)
- [ ] **Daftar Sekarang.html** — form lengkap submit ke `proses_daftar.php`
- [ ] **Hasil Seleksi.html**
- [ ] Buat **`koneksi.php`** + **`proses_daftar.php`**
- [ ] Buat database `db_pesantren` dari `db_pesantren.sql`

### Tahap 6: Kegiatan & E-Raport
- [ ] **Kegiatan/Kegiatan Harian.html** (timeline royal — Section 6.5.1)
- [ ] **Kegiatan/Kegiatan Mingguan.html** (3 kartu — Section 6.5.2)
- [ ] **E-Raport.html** + **`cek_raport_api.php`**
- [ ] **Pencarian.html** (render hasil dari query `s`)

### Tahap 7: Galeri & Informasi
- [ ] **Galeri Foto Page 1.html & Page 2.html** dengan filter + load-more
- [ ] 30+ halaman event spesifik (template sama, tinggal ganti foto)
- [ ] **Informasi/Pengumuman.html**
- [ ] **Informasi/Prestasi.html**

### Tahap 8: Polish & QA
- [ ] Test responsive di mobile (320px, 375px, 768px, 1024px, 1440px)
- [ ] Test semua dropdown navbar (hover desktop, click mobile)
- [ ] Test counter animasi statistik
- [ ] Test slider ekskul + guru (button & swipe)
- [ ] Test search overlay (Esc, submit)
- [ ] Test form pendaftaran (validasi, insert DB)
- [ ] Test E-Raport (NIS valid + invalid)
- [ ] Optimasi image (compress, lazy loading sudah di `<img loading="lazy">`)
- [ ] Validasi SEO meta tags
- [ ] Cek semua link footer & dropdown tidak 404

---

## CATATAN AKHIR

- **Konsistensi navbar & footer:** copy-paste persis di semua halaman, ubah hanya `href` relatif (gunakan `../` dari folder Profile/Direktori/dst).
- **Placeholder image saat dev:** pakai `https://placehold.co/600x750/206c4e/FFF?text=...` sambil menunggu foto asli.
- **Bahasa:** seluruh website pakai **Bahasa Indonesia** dengan istilah Arab dipertahankan (Mu'allim, Tahfidz, Mafahim, dll). Set `<html lang="id">`.
- **Aksesibilitas:** semua `<img>` wajib `alt` text, semua icon dekoratif tidak perlu `alt`.
- **Kompatibilitas:** target browser modern (Chrome/Edge/Firefox/Safari versi 2 tahun terakhir).

> Dokumen ini ditulis berdasarkan kode sumber asli per `2026-05-08`. Saat ada perubahan konten (guru baru, pengumuman PSB, dll) cukup edit bagian yang relevan tanpa menyentuh struktur.

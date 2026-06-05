<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
 <title>Profile Pondok Pesantren - Asy-Syifaa Wal Mahmuudiyyah</title>

  <!-- Bootstrap & Icons -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
  <link rel="preload" as="image" href="/assets/media/profile-pondok/simpang-1200x675.webp" fetchpriority="high" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />

  <!-- Custom CSS -->
  <link rel="stylesheet" href="/assets/css/main.css?v=20260519" />
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source Sans 3:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/footer.css?v=20260517">
<link rel="icon" href="/assets/media/images/logo.png" type="image/png" sizes="32x32">

 <style>
 /* =========================================
   STYLE KHUSUS HALAMAN Profile (BOOK STYLE)
   ========================================= */

/* Container Utama Bab */
.chapter-wrapper {
    padding: 60px 0 100px 0;
    position: relative;
}

.pondok-hero-summary {
    margin: 6.3rem auto 1.4rem;
    border-radius: 1.1rem;
    padding: 1.2rem 1rem;
    color: #ffffff;
    background: linear-gradient(140deg, rgb(15, 61, 37) 0%, rgb(31, 107, 67) 55%, rgb(42, 138, 87) 100%);
    position: relative;
    overflow: hidden;
}

.pondok-hero-summary::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 85% 20%, rgba(255, 255, 255, 0.08), transparent 55%);
    pointer-events: none;
}

.pondok-hero-summary .hero-inner {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(220px, 340px);
    gap: 1rem;
    align-items: center;
}

.hero-copy {
    min-width: 0;
}

.hero-media {
    width: 100%;
    border-radius: 1rem;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.22);
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.08);
}

.hero-media img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.pondok-hero-summary h1 {
    font-family: 'Merriweather', serif;
    font-size: clamp(1.6rem, 3.8vw, 2.4rem);
    margin: 0 0 0.45rem;
    color: #ffffff;
}

.pondok-hero-summary p {
    margin: 0;
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.95rem;
}

.pondok-quick-facts {
    margin-top: 0.75rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
}

.pondok-quick-facts span {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.22rem 0.58rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    color: rgb(167, 243, 196);
    background: rgba(50, 220, 100, 0.2);
    border: 1px solid rgba(50, 220, 100, 0.4);
}

/* Navigasi Sederhana Antar Bab (Opsional jika nanti Bab 2 masuk) */
.chapter-nav {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 3rem;
    flex-wrap: wrap;
}

.chapter-pill {
    padding: 10px 25px;
    border-radius: 50px;
    background: white;
    border: 1px solid #eee;
    color: var(--text-dark);
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.chapter-pill.active, .chapter-pill:hover {
    background: var(--primary-green);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(32, 108, 78, 0.3);
    border-color: var(--primary-green);
}

/* Header Bab */
.chapter-header-box {
    text-align: center;
    margin-bottom: 3.5rem;
    position: relative;
}

.chapter-number {
    display: inline-block;
    background: var(--accent-gold);
    color: var(--dark-green);
    font-weight: 800;
    padding: 5px 15px;
    border-radius: 4px;
    font-size: 0.85rem;
    letter-spacing: 2px;
    margin-bottom: 15px;
    text-transform: uppercase;
    box-shadow: 0 4px 10px rgba(255, 215, 0, 0.3);
}

.chapter-title-main {
    font-family: 'Merriweather', serif;
    font-size: clamp(2rem, 5vw, 3rem);
    color: var(--dark-green);
    margin-bottom: 0.5rem;
}

/* Card Konten Kertas */
.paper-card {
    background: white;
    border-radius: var(--radius);
    padding: clamp(2rem, 5vw, 4rem); /* Padding responsif yang lega */
    box-shadow: 0 15px 40px rgba(0,0,0,0.08); /* Shadow lembut */
    margin-bottom: 3rem;
    position: relative;
    border-top: 5px solid var(--primary-green); /* Aksen garis hijau di atas */
}

/* Tipografi Konten */
.paper-content h3 {
    font-family: 'Merriweather', serif;
    font-size: 1.8rem;
    color: var(--primary-green);
    margin-top: 2rem;
    margin-bottom: 1.2rem;
    border-bottom: 1px dashed #ddd;
    padding-bottom: 10px;
    display: inline-block;
}

.paper-content h4 {
    font-family: 'Merriweather', serif;
    font-size: 1.3rem;
    color: var(--dark-green);
    margin-top: 1.5rem;
    font-weight: 600;
}

.paper-content p {
    font-family: 'Source Sans 3', sans-serif;
    color: #4a4a4a; /* Abu-abu tua agar nyaman dibaca */
    font-size: 1.05rem;
    line-height: 1.9; /* Line height lega */
    margin-bottom: 1.5rem;
    text-align: justify; /* Rata kanan kiri agar rapi seperti buku */
}

/* Dropcap (Huruf Awal Besar) */
.dropcap::first-letter {
    float: left;
    font-family: 'Merriweather', serif;
    font-size: 4rem;
    line-height: 0.8;
    color: var(--primary-green);
    padding-right: 15px;
    padding-top: 5px;
    font-weight: 700;
}

/* Highlight Box (Untuk Makna & Quote) */
.highlight-box {
    background: #fcfcfc;
    border-left: 4px solid var(--accent-gold);
    padding: 2rem;
    margin: 2rem 0;
    border-radius: 0 10px 10px 0;
    position: relative;
}

.highlight-box::before {
    content: '\f10d'; /* Ikon kutipan FontAwesome */
    font-family: 'Font Awesome 6 Free';
    font-weight: 900;
    position: absolute;
    top: -15px;
    left: 20px;
    font-size: 2rem;
    color: var(--accent-gold);
    background: white;
    padding: 0 10px;
}

/* List Styling */
.custom-list-number {
    list-style: none;
    padding: 0;
    counter-reset: my-counter;
}

.custom-list-number li {
    position: relative;
    padding-left: 3rem;
    margin-bottom: 1.5rem;
    font-size: 1.05rem;
    color: #4a4a4a;
}

.custom-list-number li::before {
    counter-increment: my-counter;
    content: counter(my-counter);
    position: absolute;
    left: 0;
    top: 0;
    width: 35px;
    height: 35px;
    background: var(--primary-green);
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 35px;
    font-weight: 600;
    font-size: 0.9rem;
    box-shadow: 0 4px 8px rgba(32, 108, 78, 0.3);
}

/* Asas Box (Kalimat Tauhid) */
.asas-box {
    text-align: center;
    padding: 2.5rem;
    background: linear-gradient(135deg, var(--dark-green) 0%, var(--primary-green) 100%);
    border-radius: 15px;
    color: white;
    margin: 2rem 0;
    box-shadow: 0 10px 25px rgba(26, 62, 44, 0.25);
    position: relative;
    overflow: hidden;
}

.asas-box h4 {
    color: var(--accent-gold) !important;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1.1rem;
}

.kalimat-tauhid {
    font-family: 'Merriweather', serif;
    font-size: 1.8rem;
    font-style: italic;
    font-weight: 700;
}

/* Grid Mazhab */
.mazhab-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-top: 15px;
}
.mazhab-item {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    border: 1px solid #eee;
    font-weight: 600;
    color: var(--dark-green);
    transition: 0.3s;
}
.mazhab-item:hover {
    background: var(--primary-green);
    color: white;
    transform: translateY(-3px);
}
/* =========================================
   GAYA FOTO LANDSCAPE (UKURAN STANDAR)
   ========================================= */

.chapter-visual {
    position: relative;
    width: 100%;
    max-width: 700px; /* UBAH: Dibatasi lebarnya agar tidak terlalu besar */
    height: 350px;    /* UBAH: Tinggi tetap yang pas (standar landscape) */
    margin: 30px auto; /* Posisi rata tengah (Center) */
    
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0,0,0,0.08); /* Shadow lebih tipis */
    background-color: #f8f9fa;
    border: 2px dashed #ddd;
    transition: all 0.3s ease;
}

/* Sisa CSS di bawah ini tetap sama */
.chapter-visual.loaded { border: none; }

.chapter-visual img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
    display: block;
    transition: transform 0.7s ease;
}

.chapter-visual:hover img { transform: scale(1.05); }

.photo-caption {
    position: absolute;
    bottom: 15px;
    right: 15px;
    background: rgba(255, 255, 255, 0.95);
    padding: 6px 15px; /* Padding sedikit diperkecil */
    border-radius: 50px;
    font-size: 0.8rem; /* Font caption sedikit diperkecil */
    font-weight: 500;
    color: var(--dark-green);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.4s ease;
}

.chapter-visual:hover .photo-caption {
    opacity: 1;
    transform: translateY(0);
}

.placeholder-info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #adb5bd;
    pointer-events: none;
    width: 100%;
}

.placeholder-info i {
    font-size: 2.5rem; /* Ikon diperkecil sedikit */
    margin-bottom: 10px;
    color: var(--accent-gold);
}

.placeholder-info span {
    font-family: 'Source Sans 3', sans-serif;
    font-size: 0.85rem;
    display: block;
}

/* =========================================
   STYLE TAMBAHAN BAB II (GRID FOTO)
   ========================================= */

/* Grid 4 Foto Kecil (2 baris x 2 kolom) */
.gallery-grid-4 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin: 3rem 0; /* Jarak atas bawah yang lega */
}

.gallery-item-small {
    position: relative;
    width: 100%;
    aspect-ratio: 4/3; /* Rasio agak kotak (4:3) agar rapi di grid */
    background: #f8f9fa;
    border-radius: 12px;
    overflow: hidden;
    border: 2px dashed #ddd;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    transition: transform 0.3s ease;
}

.gallery-item-small:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    border-color: var(--primary-green);
}

.gallery-item-small img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Modifikasi untuk Foto Medium (Ukuran Sedang) */
.chapter-visual.medium-size {
    max-width: 500px; /* Lebih kecil dari standar (700px) */
    height: 300px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

/* Kotak Biografi (Untuk Profile Habib Umar) */
.biography-section {
    background: #fcfcfc;
    border-left: 4px solid var(--primary-green);
    padding: 2rem;
    margin: 2rem 0;
    border-radius: 0 10px 10px 0;
}

.biography-title {
    font-family: 'Merriweather', serif;
    color: var(--dark-green);
    font-size: 1.4rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
}

/* =========================================
   GRID 2 FOTO SEDANG (SIDE BY SIDE)
   ========================================= */
.gallery-grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsif: Turun ke bawah jika layar HP */
    gap: 20px;
    margin: 2.5rem 0;
}

/* Penyesuaian agar foto pas di dalam grid 2 kolom */
.gallery-grid-2 .chapter-visual {
    max-width: 100%; /* Memenuhi kolom grid */
    height: 250px;   /* Tinggi sedikit dikurangi agar proporsional */
    margin: 0;       /* Hapus margin auto agar tidak ke tengah sendiri */
}

/* =========================================
   STYLE TAMBAHAN BAB III (TABEL & ARAB)
   ========================================= */

/* Konsep Grid (Untuk Terpadu & Internasional) */
.concept-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
    margin-bottom: 2rem;
}

.concept-card {
    background: #fff;
    border: 1px solid #eee;
    padding: 25px;
    border-radius: 12px;
    border-top: 4px solid var(--primary-green);
    box-shadow: 0 5px 15px rgba(0,0,0,0.03);
}

.concept-card h4 {
    font-size: 1.2rem;
    color: var(--dark-green);
    margin-bottom: 15px;
    border-bottom: 1px dashed #ddd;
    padding-bottom: 10px;
}

/* Grid 9 Karakter Muslim */
.character-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 15px;
    margin: 2rem 0;
}

.character-item {
    background: #f8f9fa;
    padding: 15px 20px;
    border-radius: 10px;
    border-left: 5px solid var(--accent-gold);
    display: flex;
    flex-direction: column;
    transition: transform 0.2s;
}

.character-item:hover {
    transform: translateY(-3px);
    background: white;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
}

.arabic-text {
    font-family: 'Amiri', 'Traditional Arabic', serif; /* Pastikan font serif untuk Arab */
    font-size: 1.4rem;
    color: var(--primary-green);
    text-align: right;
    margin-bottom: 5px;
    font-weight: 700;
}

.latin-text {
    font-weight: 600;
    color: var(--dark-green);
    font-size: 1rem;
}

.translate-text {
    font-size: 0.85rem;
    color: #6c757d;
    font-style: italic;
}

/* Tabel Modern */
.program-table-wrapper {
    overflow-x: auto; /* Agar bisa discroll di HP */
    margin-bottom: 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.program-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    min-width: 600px; /* Lebar minimum agar tidak gepeng di HP */
}

.program-table thead {
    background: var(--primary-green);
    color: white;
}

.program-table th, .program-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

.program-table th {
    font-family: 'Merriweather', serif;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.program-table tr:hover {
    background-color: #f1f8f5;
}

.program-table td.arabic-col {
    font-family: 'Amiri', serif;
    font-size: 1.2rem;
    text-align: right;
    color: var(--dark-green);
}

/* Kotak Statistik Santri */
.stats-box {
    background: linear-gradient(135deg, var(--dark-green) 0%, var(--primary-green) 100%);
    color: white;
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    margin: 2rem 0;
    position: relative;
    overflow: hidden;
}

.stats-number {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--accent-gold);
    margin-bottom: 0;
}

/* =========================================
   REVISI BAB IV: DAFTAR GURU (LIST STYLE)
   ========================================= */

/* Container Utama Split (Tetap sama) */
.split-layout {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    align-items: flex-start;
    margin-top: 2rem;
}

.left-visual {
    flex: 1;
    min-width: 300px;
    position: sticky;
    top: 100px;
}

.portrait-frame {
    width: 100%;
    aspect-ratio: 3/4;
    background: #f8f9fa;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid #ddd;
    box-shadow: -10px 10px 30px rgba(0,0,0,0.1);
    position: relative;
}

.portrait-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* === Override layout update (Mei 2026) === */
.pondok-hero-summary .hero-inner {
    grid-template-columns: minmax(0, 1fr);
}

.gallery-grid-2x2 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    margin: 1.5rem 0 2rem;
}

.gallery-grid-2x2 .gallery-item-small {
    aspect-ratio: 16 / 10;
}

.chapter-visual.full-width {
    max-width: 100%;
    width: 100%;
    height: 440px;
    margin: 1.2rem 0 2rem;
}

.split-layout {
    align-items: stretch;
}

.left-visual {
    flex: 0 0 42%;
    max-width: 42%;
    min-width: 320px;
    position: sticky;
    top: 104px;
}

.right-content {
    flex: 1 1 58%;
    min-width: 320px;
}

.portrait-frame {
    width: 100%;
    min-height: 780px;
    height: calc(100% - 8px);
    aspect-ratio: auto;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid #ddd;
    box-shadow: -10px 10px 30px rgba(0,0,0,0.1);
    position: relative;
    background: linear-gradient(160deg, #0a2d1c 0%, #1f6b43 55%, #2a8a57 100%);
}

.portrait-frame::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 85% 20%, rgba(255, 255, 255, 0.09), transparent 55%);
    pointer-events: none;
}

.portrait-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    position: relative;
    z-index: 1;
}

.portrait-frame .photo-caption {
    z-index: 2;
}

.vip-avatar i {
    display: none;
}

.vip-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

@media (max-width: 991.98px) {
    .gallery-grid-2x2 {
        grid-template-columns: 1fr;
    }

    .chapter-visual.full-width {
        height: 320px;
    }

    .left-visual,
    .right-content {
        flex: 1 1 100%;
        max-width: 100%;
        min-width: 0;
        position: static;
    }

    .portrait-frame {
        min-height: 480px;
    }
}

/* Bagian Kanan: Daftar Guru */
.right-content {
    flex: 1.5;
    min-width: 300px;
}

.silsilah-intro {
    font-family: 'Source Sans 3', sans-serif;
    color: #555;
    margin-bottom: 25px;
    font-style: italic;
    background: #f0f7f4;
    padding: 15px;
    border-left: 4px solid var(--primary-green);
    border-radius: 0 8px 8px 0;
}

/* Grid Daftar Guru (2 Kolom) */
.guru-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Responsif 2 kolom */
    gap: 15px;
}

.guru-item {
    background: #fff;
    border: 1px solid #eee;
    padding: 12px 15px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;
    box-shadow: 0 2px 5px rgba(0,0,0,0.03);
}

.guru-item:hover {
    transform: translateX(5px);
    border-color: var(--accent-gold);
    background: #fffdf5; /* Sedikit kuning emas saat hover */
}

.guru-number {
    background: var(--primary-green);
    color: white;
    font-size: 0.8rem;
    font-weight: bold;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: 12px;
    flex-shrink: 0;
}

.guru-info {
    display: flex;
    flex-direction: column;
}

.guru-name {
    font-weight: 600;
    color: var(--dark-green);
    font-size: 0.95rem;
    line-height: 1.3;
}

.guru-loc {
    font-size: 0.75rem;
    color: #888;
    margin-top: 2px;
}

.guru-loc i {
    color: var(--accent-gold);
    margin-right: 3px;
}

/* =========================================
   STYLE BAB V (DAFTAR TAMU VIP)
   ========================================= */

/* Intro Box dengan Icon Besar */
.intro-benefit-box {
    background: #f4fcf8;
    border-radius: 15px;
    padding: 30px;
    position: relative;
    margin-bottom: 40px;
    border: 1px dashed var(--primary-green);
    text-align: center;
}

.intro-benefit-box i {
    font-size: 3rem;
    color: var(--primary-green);
    margin-bottom: 15px;
    display: block;
}

/* Grid Kartu Ulama */
.vip-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); /* Responsif */
    gap: 20px;
}

.vip-card {
    background: white;
    border: 1px solid #eee;
    border-left: 5px solid var(--accent-gold); /* Aksen Emas di kiri */
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.03);
    transition: all 0.3s ease;
    display: flex;
    align-items: flex-start;
    gap: 15px;
}

.vip-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    border-left-color: var(--primary-green); /* Berubah hijau saat hover */
}

/* Highlight Khusus (Untuk Habib Umar) */
.vip-card.premium {
    background: linear-gradient(135deg, #fff 0%, #fffdf0 100%);
    border: 1px solid var(--accent-gold);
    border-left: 5px solid var(--primary-green);
    grid-column: 1 / -1; /* Melebar penuh di baris pertama */
}

/* Avatar / Placeholder Foto Ulama */
.vip-avatar {
    width: 60px;
    height: 60px;
    background-color: #f1f3f5;
    border-radius: 50%;
    flex-shrink: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    box-shadow: 0 3px 6px rgba(0,0,0,0.1);
}

.vip-avatar i {
    font-size: 1.5rem;
    color: #adb5bd;
}

.vip-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Teks dalam Kartu */
.vip-content h5 {
    font-family: 'Merriweather', serif;
    font-size: 1.1rem;
    margin-bottom: 5px;
    color: var(--dark-green);
    line-height: 1.4;
}

.vip-role {
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 8px;
    display: block;
    font-weight: 500;
}

.vip-desc {
    font-size: 0.8rem;
    color: #888;
    line-height: 1.5;
    border-top: 1px dashed #eee;
    padding-top: 8px;
}

/* Footer Note Bab 5 */
.closing-note {
    margin-top: 2rem;
    text-align: center;
    font-style: italic;
    color: #6c757d;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 50px;
}


/* =================================================================
   RESPONSIVE MOBILE (DITARUH PALING BAWAH STYLE.CSS)
   ================================================================= */

@media screen and (max-width: 991px) {
    /* --- 1. PENYESUAIAN GLOBAL (TABLET/LAPTOP KECIL) --- */
    
    /* Agar layout split (Bab 4) turun ke bawah */
    .split-layout {
        flex-direction: column; /* Foto di atas, Teks di bawah */
        gap: 30px;
    }

    .left-visual {
        position: static; /* Hilangkan efek sticky di mobile */
        width: 100%;
        max-width: 400px; /* Batasi lebar foto agar tidak raksasa */
        margin: 0 auto; /* Tengah */
    }

    .right-content {
        width: 100%;
    }
}

@media screen and (max-width: 768px) {
    /* --- 2. PENYESUAIAN KHUSUS HP (MOBILE) --- */

    /* Container & Spacing */
    .chapter-wrapper {
        padding: 30px 0 60px 0; /* Kurangi padding atas bawah */
    }

    .paper-card {
        padding: 1.5rem; /* Padding kertas lebih tipis di HP */
        margin-bottom: 2rem;
    }

    /* Typography (Font) */
    .chapter-title-main {
        font-size: 1.8rem; /* Judul Bab lebih kecil */
        line-height: 1.2;
    }

    .paper-content p, 
    .paper-content li {
        font-size: 0.95rem; /* Ukuran teks paragraf sedikit dikecilkan agar muat */
        text-align: left; /* Rata kiri (justify kadang berantakan di HP) */
    }

    .dropcap::first-letter {
        font-size: 3rem; /* Dropcap tidak terlalu besar */
        padding-right: 8px;
    }

    /* Bab 1: Highlight Box */
    .highlight-box, 
    .biography-section, 
    .intro-benefit-box {
        padding: 1.5rem;
        font-size: 0.9rem;
    }
    
    .highlight-box::before {
        top: -10px;
        font-size: 1.5rem;
    }

    /* Bab 2: Gallery Grid */
    .gallery-grid-4 {
        grid-template-columns: repeat(2, 1fr); /* Tetap 2 kolom di HP (seperti galeri Instagram) */
        gap: 10px;
    }

    .gallery-grid-2 {
        grid-template-columns: 1fr; /* Foto Sedang jadi 1 kolom (atas bawah) */
    }

    .chapter-visual, 
    .chapter-visual.medium-size {
        height: 200px; /* Kurangi tinggi placeholder gambar */
        margin: 20px auto;
    }

    /* Bab 3: Tabel & Grid */
    .program-table th, 
    .program-table td {
        padding: 8px 10px; /* Padatkan sel tabel */
        font-size: 0.85rem;
    }
    
    .arabic-col {
        font-size: 1rem !important;
    }

    .concept-grid, 
    .character-grid {
        grid-template-columns: 1fr; /* Card jadi 1 kolom ke bawah */
        gap: 15px;
    }
    
    .stats-box .stats-number {
        font-size: 2rem;
    }

    /* Bab 4: Daftar Guru */
    .guru-grid {
        grid-template-columns: 1fr; /* Daftar guru jadi 1 list ke bawah */
    }

    .silsilah-title {
        font-size: 1.2rem;
        text-align: center;
    }

    /* Bab 5: VIP Card */
    .vip-grid {
        grid-template-columns: 1fr; /* Card Ulama jadi 1 kolom */
    }

    .vip-card {
        flex-direction: column; /* Foto di atas, teks di bawah */
        text-align: center;
        align-items: center;
    }

    .vip-desc {
        text-align: center;
    }
    
    .intro-benefit-box i {
        font-size: 2rem;
    }

    /* Navigasi Bab (Pill) */
    .chapter-nav {
        gap: 8px;
    }
    
    .chapter-pill {
        padding: 8px 15px;
        font-size: 0.8rem;
        flex: 1 1 auto; /* Agar tombol memenuhi lebar layar */
        text-align: center;
    }
}

@media screen and (max-width: 480px) {
    /* --- 3. PENYESUAIAN UNTUK HP LAYAR KECIL (SMALL MOBILE) --- */
    
    .chapter-title-main {
        font-size: 1.5rem;
    }

    .gallery-grid-4 {
        grid-template-columns: 1fr; /* Foto kecil jadi 1 kolom saja di HP kecil */
    }

    .paper-card {
        padding: 1.2rem; /* Lebih tipis lagi */
    }
}


/* =======================================================
   PERBAIKAN RESPONSIVE MOBILE (ASAS & DAFTAR ULAMA KECIL)
   Paste kode ini di BARIS PALING BAWAH file style.css
   ======================================================= */

@media (max-width: 767.98px) {

  /* =======================================================
   PERBAIKAN FINAL: ASAS PESANTREN (Tengah Sempurna)
   Paste/Ganti kode ini di paling bawah style.css
   ======================================================= */

@media (max-width: 767.98px) {

    .asas-box {
        /* Menggunakan Flexbox untuk Centering Mutlak */
        display: flex !important;
        flex-direction: column !important;  /* Susun elemen ke bawah */
        justify-content: center !important; /* Tengah secara VERTIKAL (Atas-Bawah) */
        align-items: center !important;     /* Tengah secara HORIZONTAL (Kiri-Kanan) */
        text-align: center !important;      /* Pastikan teks itu sendiri rata tengah */
        
        min-height: 250px !important;       /* Beri tinggi minimal agar terlihat kotak */
        padding: 20px !important;           /* Padding aman */
        width: 100% !important;
        box-sizing: border-box !important;
    }

    .asas-box h4 {
        margin-top: 0 !important;
        margin-bottom: 15px !important;     /* Jarak ke tulisan Arab */
        font-size: 0.9rem !important;       /* Ukuran judul pas */
        width: 100% !important;
    }

    .kalimat-tauhid {
        margin: 0 !important;               /* Reset margin */
        font-size: 1.1rem !important;       /* Ukuran font disesuaikan agar tidak terpotong */
        line-height: 1.6 !important;        /* Jarak antar baris lega */
        width: 100% !important;             /* Lebar penuh */
        word-wrap: break-word !important;   /* Patahkan kata jika kepanjangan (safety) */
    }
}

    /* --- 2. PERBAIKAN DAFTAR ULAMA SUPER KECIL (BAB 5) --- */
    
    /* Ubah Grid jadi sangat rapat */
    .vip-grid {
        gap: 10px !important; /* Jarak antar kartu sangat dekat */
        margin-top: 15px !important;
    }

    /* Ubah Kartu Ulama jadi List Menyamping (Kiri Foto, Kanan Teks) */
    .vip-card {
        flex-direction: row !important; /* JANGAN kolom, tapi baris (samping-sampingan) */
        align-items: flex-start !important; /* Rata atas */
        text-align: left !important; /* Teks rata kiri */
        padding: 10px 12px !important; /* Padding sangat tipis */
        gap: 12px !important; /* Jarak foto ke teks dekat */
        min-height: auto !important;
        border-radius: 8px !important;
    }

    /* Perkecil Foto/Avatar Ulama */
    .vip-avatar {
        width: 40px !important; /* Ukuran foto sangat kecil (seperti ikon WA) */
        height: 40px !important;
        min-width: 40px !important; /* Supaya tidak gepeng */
        border-width: 1px !important;
    }
    
    .vip-avatar i {
        font-size: 1rem !important; /* Ikon orang lebih kecil */
    }

    /* Perkecil Semua Teks di dalam Kartu */
    .vip-content h5 {
        font-size: 0.85rem !important; /* Nama Ulama kecil */
        font-weight: 700 !important;
        margin-bottom: 2px !important;
        line-height: 1.2 !important;
    }

    .vip-role {
        font-size: 0.7rem !important; /* Jabatan/Asal sangat kecil */
        margin-bottom: 4px !important;
        color: #777 !important;
    }

    .vip-desc {
        font-size: 0.7rem !important; /* Deskripsi sangat kecil */
        line-height: 1.3 !important;
        padding-top: 4px !important;
        border-top: 1px solid #f0f0f0 !important;
        text-align: left !important; /* Paksa rata kiri */
        color: #555 !important;
    }
    
    /* Khusus Kartu Premium (Habib Umar) agar garisnya tidak tebal */
    .vip-card.premium {
        border-left-width: 3px !important; 
    }
    
    /* Perkecil Box Intro Bab 5 */
    .intro-benefit-box {
        padding: 15px !important;
    }
    .intro-benefit-box i {
        font-size: 2rem !important;
        margin-bottom: 10px !important;
    }
    .intro-benefit-box h3 {
        font-size: 1.1rem !important;
    }
    .intro-benefit-box p {
        font-size: 0.8rem !important;
    }
}

/* =======================================================
   POLISH HALAMAN PROFIL PONDOK 2026
   ======================================================= */

body#top {
    background:
        radial-gradient(circle at 8% 8%, rgba(196, 154, 64, 0.12), transparent 26rem),
        radial-gradient(circle at 92% 16%, rgba(31, 107, 67, 0.11), transparent 28rem),
        linear-gradient(180deg, #f7f3e9 0%, #fffaf1 36%, #f5f9f2 100%);
    color: #1d3025;
}

body#top::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    opacity: 0.22;
    background-image:
        linear-gradient(rgba(20, 71, 45, 0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(20, 71, 45, 0.06) 1px, transparent 1px);
    background-size: 38px 38px;
}

.pondok-hero-summary {
    max-width: 1180px;
    min-height: 355px;
    margin-top: 4.8rem;
    margin-bottom: 1.15rem;
    padding: clamp(2rem, 5vw, 4.2rem);
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 2.2rem;
    background:
        linear-gradient(120deg, rgba(9, 45, 29, 0.96) 0%, rgba(20, 91, 55, 0.94) 56%, rgba(44, 137, 87, 0.9) 100%),
        url("/assets/media/profile-pondok/simpang-1200x675.webp") center/cover;
    box-shadow: 0 30px 80px rgba(12, 57, 35, 0.26);
    isolation: isolate;
}

.pondok-hero-summary::before {
    background:
        radial-gradient(circle at 22% 18%, rgba(255, 255, 255, 0.15), transparent 24rem),
        linear-gradient(90deg, rgba(4, 25, 15, 0.72), rgba(4, 25, 15, 0.18));
}

.pondok-hero-summary::after {
    content: "";
    position: absolute;
    top: 2rem;
    right: -2.2rem;
    bottom: -1.6rem;
    width: min(430px, 42%);
    border-radius: 2rem;
    background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(8, 34, 21, 0.3)),
        url("/assets/media/profile-pondok/simpang-1200x675.webp") center/cover;
    box-shadow: -18px 22px 50px rgba(3, 20, 12, 0.28);
    transform: rotate(-2.5deg);
    opacity: 0.82;
    z-index: 0;
}

.pondok-hero-summary .hero-inner {
    max-width: 720px;
}

.pondok-hero-summary h1,
.chapter-title-main,
.paper-content h3,
.paper-content h4 {
    font-family: "Playfair Display", Georgia, serif;
}

.pondok-hero-summary h1 {
    font-size: clamp(2.45rem, 6vw, 5.1rem);
    line-height: 0.98;
    letter-spacing: -0.045em;
    text-wrap: balance;
}

.pondok-hero-summary p {
    max-width: 640px;
    font-size: clamp(1rem, 1.5vw, 1.18rem);
    line-height: 1.75;
}

.pondok-quick-facts {
    gap: 0.7rem;
    margin-top: 1.45rem;
}

.pondok-quick-facts span {
    padding: 0.55rem 0.82rem;
    color: #ecffe9;
    background: rgba(255, 255, 255, 0.11);
    border-color: rgba(255, 255, 255, 0.22);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
}

.pondok-chapter-nav {
    position: sticky;
    top: 82px;
    z-index: 30;
    width: min(1120px, calc(100% - 2rem));
    margin: 0 auto 2.6rem;
    padding: 0.65rem;
    border: 1px solid rgba(27, 91, 59, 0.12);
    border-radius: 999px;
    background: rgba(255, 252, 243, 0.82);
    box-shadow: 0 18px 50px rgba(22, 76, 49, 0.12);
    backdrop-filter: blur(18px);
}

.pondok-chapter-nav .chapter-pill {
    border: 0;
    background: transparent;
    box-shadow: none;
    color: #355b47;
}

.pondok-chapter-nav .chapter-pill.active,
.pondok-chapter-nav .chapter-pill:hover {
    background: #164f32;
    color: #fff8df;
    box-shadow: 0 10px 22px rgba(22, 79, 50, 0.22);
}

.chapter-spacer {
    height: 34px !important;
}

.chapter-header-box {
    width: min(1040px, calc(100% - 2rem));
    margin: 0 auto 2rem;
    transition: transform 0.25s ease, opacity 0.25s ease;
}

.chapter-header-box.is-active {
    transform: translateY(-3px);
}

.chapter-header-box.is-active .chapter-number {
    box-shadow: 0 18px 36px rgba(22, 79, 50, 0.28);
}

.chapter-header-box.is-active .chapter-title-main {
    color: #11432b;
}

.chapter-number {
    border-radius: 999px;
    background: linear-gradient(135deg, #f1d890, #c79a37);
    box-shadow: 0 14px 32px rgba(162, 111, 20, 0.22);
}

.chapter-title-main {
    max-width: 850px;
    margin-inline: auto;
    font-size: clamp(2.2rem, 4.8vw, 4.05rem);
    line-height: 1.02;
    letter-spacing: -0.035em;
    text-wrap: balance;
}

.paper-card {
    width: min(1120px, calc(100% - 2rem));
    margin-inline: auto;
    margin-bottom: 3.5rem;
    border: 1px solid rgba(28, 92, 61, 0.11);
    border-top: 0;
    border-radius: 2rem;
    background:
        linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(255, 253, 247, 0.94)),
        radial-gradient(circle at 92% 5%, rgba(196, 154, 64, 0.12), transparent 18rem);
    box-shadow: 0 24px 70px rgba(31, 82, 57, 0.12);
    overflow: hidden;}

.paper-card::before {
    position: absolute;
    right: 1.5rem;
    top: -1.9rem;
    z-index: 0;
    color: rgba(19, 84, 53, 0.055);
    font-family: "Playfair Display", Georgia, serif;
    font-size: clamp(8rem, 18vw, 18rem);
    font-weight: 800;
    line-height: 1;
    pointer-events: none;
}

#bab-1-content::before { content: "I"; }
#bab-2-content::before { content: "II"; }
#bab-3-content::before { content: "III"; }
#bab-4-content::before { content: "IV"; }
#bab-5-content::before { content: "V"; }

.paper-content {
    position: relative;
    z-index: 1;
}

.paper-content h3 {
    margin-top: 2.3rem;
    border: 0;
    padding: 0;
    color: #155536;
    font-size: clamp(1.7rem, 3vw, 2.35rem);
    line-height: 1.12;
}

.paper-content h3::after {
    content: "";
    display: block;
    width: 76px;
    height: 4px;
    margin-top: 0.65rem;
    border-radius: 99px;
    background: linear-gradient(90deg, #c79a37, rgba(199, 154, 55, 0));
}

.paper-content h4 {
    color: #183f2b;
    font-size: clamp(1.2rem, 2vw, 1.55rem);
}

.paper-content p,
.paper-content li {
    color: #3d4b43;
}

.paper-content p {
    font-size: 1.08rem;
    line-height: 1.86;
}

.dropcap::first-letter {
    color: #135435;
    text-shadow: 0 8px 18px rgba(19, 84, 53, 0.12);
}

.highlight-box,
.biography-section,
.intro-benefit-box,
.concept-card,
.character-item,
.guru-item,
.vip-card,
.mazhab-item {
    border-color: rgba(24, 88, 57, 0.1);
    box-shadow: 0 12px 32px rgba(28, 79, 53, 0.08);
}

.highlight-box {
    background:
        linear-gradient(135deg, rgba(255, 251, 240, 0.98), rgba(242, 249, 244, 0.94));
    border-left-width: 6px;
}

.asas-box,
.stats-box {
    background:
        radial-gradient(circle at 82% 10%, rgba(255, 255, 255, 0.16), transparent 20rem),
        linear-gradient(135deg, #082d1d 0%, #155536 56%, #27885a 100%);
    border: 1px solid rgba(255, 255, 255, 0.12);
}

.kalimat-tauhid {
    font-family: "Playfair Display", Georgia, serif;
    letter-spacing: -0.015em;
}

.chapter-visual {
    max-width: 900px;
    height: auto;
    aspect-ratio: 16 / 9;
    padding: 0.55rem;
    border: 1px solid rgba(24, 88, 57, 0.12);
    border-radius: 1.65rem;
    background: rgba(255, 255, 255, 0.76);
    box-shadow: 0 22px 56px rgba(31, 82, 57, 0.16);
}

.chapter-visual img {
    border-radius: 1.2rem;
}

.gallery-item-small {
    padding: 0.45rem;
    border: 1px solid rgba(24, 88, 57, 0.12);
    border-radius: 1.15rem;
    background: rgba(255, 255, 255, 0.8);
}

.gallery-item-small img {
    border-radius: 0.82rem;
}

.gallery-grid-2 {
    gap: 1.3rem;
}

.gallery-grid-2 .chapter-visual {
    height: auto;
    aspect-ratio: 3 / 2;
}

.custom-list-number li::before,
.guru-number {
    background: linear-gradient(135deg, #164f32, #2c8a57);
}

.mazhab-grid,
.concept-grid,
.character-grid,
.guru-grid,
.vip-grid {
    gap: 1rem;
}

.mazhab-item,
.concept-card,
.character-item,
.guru-item,
.vip-card {
    background: rgba(255, 255, 255, 0.78);
    backdrop-filter: none;
}

.concept-card {
    border-top-color: #c79a37;
}

.character-item {
    border-left-color: #c79a37;
}

.program-table-wrapper {
    border: 1px solid rgba(24, 88, 57, 0.12);
    box-shadow: 0 18px 44px rgba(31, 82, 57, 0.1);
}

.program-table thead {
    background: linear-gradient(135deg, #113d28, #207146);
}

.program-table th,
.program-table td {
    border-bottom-color: rgba(24, 88, 57, 0.1);
}

.left-visual {
    top: 118px;
}

.portrait-frame {
    border: 0;
    border-radius: 2rem;
    box-shadow: -18px 22px 58px rgba(20, 66, 43, 0.18);
}

.vip-card.premium {
    border-color: rgba(199, 154, 55, 0.48);
    background:
        linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 249, 225, 0.9));
}

.closing-note {
    border: 1px solid rgba(24, 88, 57, 0.1);
    background: rgba(255, 255, 255, 0.72);
    box-shadow: 0 12px 30px rgba(31, 82, 57, 0.08);
}

@media screen and (max-width: 991px) {
    .pondok-hero-summary::after {
        opacity: 0.28;
        width: 55%;
    }

    .pondok-chapter-nav {
        top: 72px;
        border-radius: 1.25rem;
    }
}

@media screen and (max-width: 768px) {
    .pondok-hero-summary .hero-inner {
        grid-template-columns: 1fr;
    }

    .hero-media {
        max-width: 420px;
        margin: 0.6rem auto 0;
    }

    .pondok-hero-summary {
        min-height: auto;
        margin-top: 4.8rem;
        border-radius: 1.45rem;
    }

    .pondok-hero-summary::after {
        display: none;
    }

    .pondok-chapter-nav {
        position: static;
        justify-content: flex-start;
        overflow-x: auto;
        flex-wrap: nowrap;
        width: calc(100% - 1.2rem);
        border-radius: 1rem;
    }

    .pondok-chapter-nav .chapter-pill {
        flex: 0 0 auto;
    }

    .paper-card {
        width: calc(100% - 1rem);
        border-radius: 1.25rem;
    }

    .paper-card::before {
        font-size: 7rem;
        right: 0.5rem;
        top: -0.9rem;
    }

    .paper-content p {
        font-size: 0.98rem;
        line-height: 1.78;
    }
}


 </style>

</head>

 
<body id="top">

<?php include __DIR__ . '/partials.header.php'; ?>

<section class="container">
  <div class="pondok-hero-summary">
    <div class="hero-inner">
      <div class="hero-copy">
        <h1>Profil Pondok Pesantren</h1>
        <p>Ringkasan sejarah, perkembangan, sanad keilmuan, dan nilai-nilai kepesantrenan Asy-Syifaa Wal Mahmuudiyyah.</p>
        <div class="pondok-quick-facts">
          <span><i class="fa-solid fa-calendar-days"></i> Deklarasi 24 Agustus 2000</span>
          <span><i class="fa-solid fa-location-dot"></i> Simpang, Haurngombong, Sumedang</span>
          <span><i class="fa-solid fa-book-open"></i> Ahlussunnah Wal Jama'ah</span>
        </div>
      </div>
    </div>
  </div>
</section>

<nav class="chapter-nav pondok-chapter-nav" aria-label="Navigasi bab profil pondok">
  <a class="chapter-pill active" href="#bab-1-content">Bab I</a>
  <a class="chapter-pill" href="#bab-2-content">Bab II</a>
  <a class="chapter-pill" href="#bab-3-content">Bab III</a>
  <a class="chapter-pill" href="#bab-4-content">Bab IV</a>
  <a class="chapter-pill" href="#bab-5-content">Bab V</a>
</nav>

<div class="chapter-spacer" style="height: 10px;"></div> <div class="chapter-header-box">
    <span class="chapter-number">BAB I</span>
    <h1 class="chapter-title-main">PENDAHULUAN</h1>
    <img loading="lazy" decoding="async" src="/assets/media/images/divider-gold.webp" alt="" style="height: 3px; width: 80px; margin-top:10px; background:var(--accent-gold);">
</div>


<article class="paper-card" id="bab-1-content">
    
    <div class="paper-content">
        <h3 class="mt-0">1. Latar Belakang</h3>
        <p class="dropcap">
            Agama Islam adalah rahmat bagi seluruh alam. Hanya dengan Islam, manusia bakal hidup selamat, bahagia dan mulia di dunia dan akhirat. RosuluLLOOH SAW bersama para Sahabat dan orang-orang yang beriman sesudahnya telah membuktikan bahwa hidup dengan cara Islam telah mampu mewujudkan pola kehidupan yang aman, damai dan sejahtera bagi ummat Islam pada khususnya dan umat manusia pada umumnya.
        </p>

        <div class="chapter-visual">
            <img src="/assets/media/profile-pondok/simpang-1200x675.webp" alt="Foto Bangunan Pesantren Asy-Syifaa" loading="eager" fetchpriority="high" decoding="async" onerror="return asfImgFallback(this)">
            <div class="photo-caption">
                <i class="bi bi-camera-fill me-2"></i>Gedung Pusat Asy-Syifaa
            </div>
        </div>
        <p>
            Ketika itu, umat Islam benar-benar telah menjadi poros kehidupan yang menakjubkan. Kesemuanya itu bisa terjadi karena RosuluLLOOH SAW bersama para Sahabat dan orang-orang yang beriman sesudahnya mampu menerapkan pola kehidupan yang diatur oleh syari’at Islam.
        </p>
        <p>
            Bagaimana dengan umat Islam sekarang? Secara jujur tampaknya Era globalisasi yang menguat telah membawa dampak yang tidak hanya menggembirakan karena memberi sejumlah harapan, melainkan juga dampak negatif yang justru memprihatinkan. Pola ucap dan tingkah laku umat Islam saat ini banyak yang belum menampakkan keberhasilan internalisasi nilai-nilai Islam.
        </p>
        
        <div class="highlight-box">
            <p class="mb-0">
                <strong>Pendirian Pesantren:</strong><br>
                Berdasarkan pada hal di atas, pada tanggal <strong>24 Jumadil Awwal 1421 H</strong> bertepatan dengan tanggal <strong>24 Agustus 2000 M</strong>, secara formal dideklarasikan dihadapan publik oleh Abuya pada momentum Peringatan Maulid Nabi Muhammad SAW di Alun-alun Sumedang didirikannya Pondok Pesantren, Majlis Ta'lim dan Da’wah yang diberi nama <strong>Asy-Syifaa Wal Mahmuudiyyah</strong>.
            </p>
        </div>

        <p>
            Pesantren ini berdiri di atas faham <strong>Ahlussunnah Wal Jama’ah</strong> dan menganut salah satu dari empat mazhab:
        </p>
        
        <div class="mazhab-grid">
            <div class="mazhab-item">Mazhab Syafi’i</div>
            <div class="mazhab-item">Mazhab Hanafi</div>
            <div class="mazhab-item">Mazhab Maliki</div>
            <div class="mazhab-item">Mazhab Hambali</div>
        </div>

        <h3>2. Makna Asy-Syifaa Wal Mahmuudiyyah</h3>
        <p>
            Menurut Abuya, penamaan <strong>Asy-Syifaa Wal Mahmuudiyyah</strong> tujuannya supaya tempat tersebut menjadi tempat pengobatan kegelisahan ummat di tengah hiruk pikuknya kehidupan masa kini.
        </p>
        <ul>
            <li><strong>Asy-Syifaa (Obat Penyembuh):</strong> Diharapkan menjadi "Rumah Sakit Bathin" bagi ummat yang memiliki penyakit ruhani, sehingga ummat bisa sampai pada ridho Allah SWT.</li>
            <li><strong>Wal Mahmuudiyyah (Dan Terpuji):</strong> Diambil atau disandarkan pada karuhun atau leluhur Abuya yakni Waliyulloh Mahmuud (Syekh Abdul Manaf) di Cipatik Cigondewah Bandung, sebagai bentuk <em>tabarruk</em> (mengambil berkah).</li>
        </ul>

        <h3>3. Tujuan, Asas dan Sifat</h3>
        
        <h4>a. Tujuan</h4>
        <ul class="custom-list-number">
            <li>
                <strong>Menghidupkan Kembali Ilmu Agama</strong><br>
                Menghidupkan kembali ilmu-ilmu Agama (Ihya 'Ulumiddiin) dan Sunnah-sunnah Rasulullah SAW menuju terciptanya lebih banyak insan yang menjadi Ulama Rabbani dan hamba yang taqwa kepada Allah serta berakhlak mulia.
            </li>
            <li>
                <strong>Mencetak Lulusan Berkualitas Internasional</strong><br>
                Bagi para santri, diharapkan lulusannya sejajar dengan lulusan pesantren kelas dunia seperti di Tarim (Yaman), Mesir, Makkah, dan Madinah.
            </li>
        </ul>

        <h4>b. Asas</h4>
        <div class="asas-box">
            <h4>Asas Pesantren</h4>
            <div class="kalimat-tauhid">
                Laa ilaaha illALLAAH MuhammadurrosuuluLLOOH
            </div>
        </div>

        <h4>c. Sifat</h4>
        <p>
            Jama’ah / santri (ikhwannya) bersifat terbuka bagi setiap muslim, bersifat sukarela, tidak membedakan suku dan ras. Pesantren ini <strong>bukan organisasi sosial politik</strong>.
        </p>

    </div>
</article>

<div class="chapter-spacer" style="height: 50px;"></div> <div class="chapter-header-box">
    <span class="chapter-number">BAB II</span>
    <h1 class="chapter-title-main">Perkembangan Pembangunan Fisik</h1>
    <img loading="lazy" decoding="async" src="/assets/media/images/divider-gold.webp" alt="" style="height: 3px; width: 80px; margin-top:10px; background:var(--accent-gold);">
</div>

<article class="paper-card" id="bab-2-content">
    <div class="paper-content">
        
        <h3 class="mt-0">1. Pendirian Pondok Pesantren</h3>
        <p class="dropcap">
            Pondok Pesantren, Majlis Ta'lim dan Da’wah Asy-Syifaa Wal Mahmuudiyyah awalnya didirikan oleh Ayahanda Abuya yakni <strong>Al-’Alim, Al-’Allamah K. H. Ahmad Toha Mustawi Al-’Arif Billah</strong> bin Al-’Alim, Al-’Allamah K. H. Muhammad Hasan Manafi Al-’Arif Billah. Pesantren ini mulai berdiri di Jl. Raya Soreang – Cipatik Km 8,6 Kampung Badaraksa Desa Jelegong Kecamatan Kutawaringin Kabupaten Bandung.
        </p>
        <p>
            Pondok Pesantren kemudian tumbuh dan berkembang dengan pesat dan berdiri cabangnya di:
        </p>
        <ul class="custom-list-number">
            <li>Lingkungan Pangaduan Heubeul RT 02 RW 11 Kelurahan Situ Kecamatan Sumedang Utara Kabupaten Sumedang.</li>
            <li>Jl. Lanjung No. 6 Tanjungsari (Samping Timur Puskesmas Kecamatan Tanjungsari) Kabupaten Sumedang.</li>
            <li>Kampung Rancakihiyang Desa Bojongloa Kecamatan Rancaekek Kabupaten Bandung.</li>
        </ul>

        <h3>2. Pengembangan Pondok Pesantren</h3>
        <p>
            Sehubungan dengan tuntutan kebutuhan, Abuya memandang bahwa Pondok Pesantren perlu dikembangkan menjadi lebih besar yang sekaligus menjadi pusat kegiatan. Setelah melalui proses pengkajian yang cukup panjang dan mendasar oleh Abuya termasuk melalui <strong>Shalat Istikhoroh yang sampai 3 tahun</strong>, maka dipilihlah lokasi di <strong>Kampung Simpang Desa Haurngombong</strong> Kecamatan Pamulihan Kabupaten Sumedang.
        </p>
        <p>
            Tanah seluas 2 hektar ini merupakan wakaf dari Bapak H. Munadi, ST. (Bapak H. Suwandi, ST.) dan Ibu Hj. Wiwi binti H. Oyod Samsudin.
        </p>
        
        <div class="highlight-box">
            <p class="mb-0">
                <strong>Kondisi Awal:</strong><br>
                Berdasarkan kajian kasat mata saat survei lapangan (21 Shafar 1431 H / 6 Februari 2010 M), lokasi ini sungguh cukup berat. Kondisi tanah tidak rata, berbukit kecil, dan berada di pinggir tebing.
            </p>
        </div>

        <p>
            Ada proses yang “unik” ketika Abuya mengajak salah seorang Pengurus dan pemilik lahan melihat-lihat (mendo’akan) calon lokasi pesantren yang dilaksanakan pada <strong>malam hari kira-kira jam 02.00 WIB sampai dengan Subuh</strong> dengan penerangan lampu sederhana. Blusukan (apruk-aprukan) di tengah lahan sawah dan lahan kering yang cukup renjul (tidak rata).
        </p>
        <p>
            Langkah berikutnya adalah sosialisasi rencana pembangunan, perataan tanah dengan alat berat (doser), hingga pembangunan Saung Pertemuan sederhana dari bambu sebagai tempat awal pengajian dan koordinasi.
        </p>

       
        <h3>3. Peletakan Batu Pertama</h3>
         <div class="gallery-grid-2x2">
            <div class="gallery-item-small">
                <img src="/assets/media/profile-pondok/peletakan-batu-pertama-1.webp" alt="Foto Sejarah " loading="lazy" decoding="async" onerror="return asfImgFallback(this)">
            </div>
            <div class="gallery-item-small">
                <img src="/assets/media/profile-pondok/peletakan-batu-pertama-2.webp" alt="Foto Sejarah 2" loading="lazy" decoding="async" onerror="return asfImgFallback(this)">
            </div>
            <div class="gallery-item-small">
                <img src="/assets/media/profile-pondok/peletakan-batu-pertama-3.webp" alt="Foto Sejarah 3" loading="lazy" decoding="async" onerror="return asfImgFallback(this)">
            </div>
            <div class="gallery-item-small">
                <img src="/assets/media/profile-pondok/peletakan-batu-pertama-4.webp" alt="Foto Sejarah 4" loading="lazy" decoding="async" onerror="return asfImgFallback(this)">
            </div>
        </div>
        <p>
            Mengawali pembangunan fisik pondok pesantren, dilaksanakan peletakan batu pertama oleh Ulama Besar kelas internasional, yaitu <strong>Yang Mulia Al Alim Al ‘Allaamah Adda’I IlALLAH Al Habib Umar Bin Muhammad Bin Salim Bin Hafidz</strong> (Rektor Pusat Studi Islam Darul Musthofa Tarim Yaman) pada hari Selasa, 28 Muharram 1432 H (3 Januari 2011 M).
        </p>
        <p>
            Dalam acara tersebut, beliau berharap pesantren ini menjadi <em>”Pabrik Ulama dan Wali Allah”</em>. Ada bisyaroh yang menggembirakan saat itu, yaitu munculnya awan bertuliskan lafadz Allah yang disaksikan oleh para hadirin dan sempat dimuat media cetak lokal.
        </p>

  <div class="biography-section">
            <div class="biography-title">
                <i class="fas fa-user-circle"></i> Sekilas Profile Al-Habib Umar
            </div>
            <p>
                Sosok Al-Habib Umar Bin Muhammad Bin Salim Bin Hafidz merupakan anugerah besar bagi muslimin saat ini. Beliau lahir di Tarim, "Kota Seribu Wali", pada Senin, 4 Muharram 1388 H (27 Mei 1963 M).
            </p>
            <p>
                Nasab beliau bersambung langsung kepada Rasulullah SAW melalui jalur Sayyidina Husein r.a. Beliau mendirikan <strong>Pondok Pesantren Darul Mustafa</strong> di Tarim pada tahun 1993 M dengan tujuan mengajarkan ilmu secara talaqqi, menyucikan diri, dan berdakwah. Murid beliau tersebar di seluruh dunia, termasuk Indonesia.
            </p>
        </div>

      
        <h3>4. Bangunan Khas Daerah / Negara</h3>
          <div class="gallery-grid-2">
            
            <div class="chapter-visual">
                <img src="/assets/media/profile-pondok/simpang-1-1500x600.webp" alt="Foto Bangunan 1" loading="lazy" decoding="async" onerror="return asfImgFallback(this)">
                <div class="photo-caption">Sudut Pandang 1</div>
            </div>

            <div class="chapter-visual">
                <img src="/assets/media/profile-pondok/simpang-2-1500x600.webp" alt="Foto Bangunan 2" loading="lazy" decoding="async" onerror="return asfImgFallback(this)">
                <div class="photo-caption">Sudut Pandang 2</div>
            </div>

        </div>
        <p>
            Pencanangan pembangunan fisik dimulai dengan bahan bambu pada 16 Oktober 2011. Abuya berencana membuat bangunan pondokan santri dengan desain khas bangunan daerah atau khas negara masing-masing. Tujuannya agar santri merasa betah, sekaligus meningkatkan rasa persatuan bangsa dan internasional.
        </p>
        <p>
            Salah satu yang unik adalah bangunan berbentuk <strong>Rumah Gadang (Minang)</strong>. Konsep ini dipilih karena Abuya mencintai Padang dan bertabaruk kepada Syekh Yasin Al-Fadaani (Musnid Dunia).
        </p>
        <p>
            Bangunan-bangunan ini berada di dataran tinggi, sehingga terlihat jelas dan unik dari kejauhan. Beberapa fasilitas yang telah dibangun meliputi Masjid, Gedung Multi Fungsi Raudhah (gaya Makkah-Madinah), gazebo (saung), asrama, hingga helipad.
        </p>

        <h3>5. Sumber Dana Pembangunan</h3>
        <p>
            Pondok Pesantren hampir sepenuhnya dibangun dengan dana dari Abuya, Jama’ah, dan simpatisan. Hal ini dipandang penting agar semua merasa memiliki dan mendapatkan pahala jariyah, serta menjaga keberkahan ilmu karena terhindar dari dana syubhat.
        </p>
        <p>
            Dana dihimpun melalui infaq langsung, gelar sorban saat pengajian, Kotak Tabungan Masa Depan, dan transfer bank. Pihak pesantren <strong>tidak menerbitkan proposal pembangunan</strong>, namun menerima dukungan ikhlas berupa materi, tenaga, maupun doa.
        </p>
        <p>
            <em>Catatan: Satu-satunya bangunan pemerintah adalah RUSUNAWA (2013) dari Kementrian Perumahan Rakyat RI yang diterima dalam kondisi sudah jadi.</em>
        </p>

    </div>
</article>

<div class="chapter-spacer" style="height: 50px;"></div>

<div class="chapter-header-box">
    <span class="chapter-number">BAB III</span>
    <h1 class="chapter-title-main">Perkembangan Kepesantrenan</h1>
    <img loading="lazy" decoding="async" src="/assets/media/images/divider-gold.webp" alt="" style="height: 3px; width: 80px; margin-top:10px; background:var(--accent-gold);">
</div>

<article class="paper-card" id="bab-3-content">
    <div class="paper-content">

        <h3 class="mt-0">1. Pesantren Kelas Dunia</h3>
        <p class="dropcap">
            Dengan peletakan batu pertama yang monumental oleh Yang Mulia Al Habib Umar Bin Hafidz, Abuya berharap pesantren ini menjadi sarana untuk mencetak santri-santri dari seluruh penjuru dunia yang menjadi <strong>Ulama Rabbani</strong>.
        </p>
        <p>
            Lulusannya diharapkan berkualitas internasional, sejajar dengan lulusan pesantren kelas dunia seperti di Tarim (Yaman), Mesir, Makkah, dan Madinah. Tujuannya adalah mendorong terwujudnya tatanan kehidupan global yang <em>"Baldatun Thayyibatun Wa Rabbun Ghafuur"</em>.
        </p>
        
        <div class="concept-grid">
            <div class="concept-card">
                <h4><i class="fas fa-layer-group me-2"></i>Sistem Terpadu</h4>
                <ul class="custom-list-number" style="font-size: 0.9rem;">
                    <li><strong>Integratif:</strong> Kesatuan peran orang tua, pesantren, dan masyarakat.</li>
                    <li><strong>Materi:</strong> Paduan ilmu agama (Ulumuddin) dan ilmu umum (Science) untuk memperkokoh aqidah.</li>
                    <li><strong>Holistik:</strong> Pengembangan Spiritual (Ruhiyyah), Intelektual (Akal), dan Keterampilan.</li>
                    <li><strong>Metodologi:</strong> Transfer pengetahuan sekaligus transfer nilai (Uswah).</li>
                </ul>
            </div>
            
            <div class="concept-card">
                <h4><i class="fas fa-globe-asia me-2"></i>Makna Internasional</h4>
                <ul class="custom-list-number" style="font-size: 0.9rem;">
                    <li><strong>Pendidik:</strong> Lulusan pesantren bertaraf internasional (Yaman, Mesir, Makkah).</li>
                    <li><strong>Santri:</strong> Diharapkan datang dari seluruh penjuru dunia.</li>
                    <li><strong>Bahasa:</strong> Pengantar Bahasa Indonesia, Arab, dan Inggris.</li>
                    <li><strong>Kualitas:</strong> Standar kompetensi lulusan sejajar dengan kiblat pendidikan Islam dunia.</li>
                </ul>
            </div>
        </div>

        <p>
            Dalam upaya membangun pesantren bertaraf Internasional, Abuya telah mengirim tiga Mu’alim putra beliau ke Hadramaut Yaman pada 8 September 2017 M, yaitu: Mu’alim Muhammad Idris As-Syafi’i, Mu’alim Syarif Muhammad Al-Hasani, dan Mu’alim Muhammad Tsabit.
        </p>

        <h3>2. Aspek Legalitas Pesantren</h3>
        <div class="highlight-box" style="border-left-color: var(--primary-green);">
            <p class="mb-2"><strong>Badan Hukum Yayasan:</strong></p>
            <ul style="list-style-type: circle; margin-bottom: 1rem;">
                <li>SK Kemenkumham RI No: AHU-46.AH.01.04. Tahun 2014.</li>
                <li>Pembaruan SK Kemenkumham No: AHU-AH.01.06-0002651 (2020).</li>
            </ul>
            <p class="mb-2"><strong>Izin Operasional Pesantren:</strong></p>
            <ul style="list-style-type: circle; margin-bottom: 0;">
                <li>Piagam Kemenag Kab. Sumedang No: 5321113001.</li>
                <li>SK Dirjen Pendis No: 5791.</li>
            </ul>
        </div>

        <h3>3. Tujuan & Karakter Santri</h3>
        <p>
            Tujuannya adalah membentuk anak didik menjadi hamba Allah yang shaleh secara individual dan sosial, serta memberikan bekal pengetahuan dan keterampilan sesuai zamannya.
        </p>
        
        <h4 class="text-center mb-4">9 Karakter Pribadi Muslim</h4>
        
        <div class="character-grid">
            <div class="character-item">
                <div class="arabic-text">سليم العقيدة</div>
                <div class="latin-text">1. Salimul Aqidah</div>
                <div class="translate-text">Aqidah yang bersih</div>
            </div>
            <div class="character-item">
                <div class="arabic-text">صحيح العبادة</div>
                <div class="latin-text">2. Shahihul Ibadah</div>
                <div class="translate-text">Ibadah yang benar</div>
            </div>
            <div class="character-item">
                <div class="arabic-text">متين الخلق</div>
                <div class="latin-text">3. Matinul Khuluq</div>
                <div class="translate-text">Akhlaq yang kokoh</div>
            </div>
            <div class="character-item">
                <div class="arabic-text">قوي الجسم</div>
                <div class="latin-text">4. Qawiyyul Jism</div>
                <div class="translate-text">Jasmani yang kuat</div>
            </div>
            <div class="character-item">
                <div class="arabic-text">مثقف الفكر</div>
                <div class="latin-text">5. Mutsaqqoful Fikri</div>
                <div class="translate-text">Intelek dalam berfikir</div>
            </div>
            <div class="character-item">
                <div class="arabic-text">مجاهدة النفس</div>
                <div class="latin-text">6. Mujahadatun Nafsi</div>
                <div class="translate-text">Berjuang melawan hawa nafsu</div>
            </div>
            <div class="character-item">
                <div class="arabic-text">حريص على الوقت</div>
                <div class="latin-text">7. Harishun 'alal Waqti</div>
                <div class="translate-text">Pandai menjaga waktu</div>
            </div>
            <div class="character-item">
                <div class="arabic-text">قدير على الكسب</div>
                <div class="latin-text">8. Qodirun 'alal Kasbi</div>
                <div class="translate-text">Memiliki kemandirian</div>
            </div>
            <div class="character-item">
                <div class="arabic-text">نافع لغيره</div>
                <div class="latin-text">9. Naafi’un li Ghoirih</div>
                <div class="translate-text">Bermanfaat bagi orang lain</div>
            </div>
        </div>

        <h3>4. Program Unggulan</h3>
        
        <div class="chapter-visual full-width">
            <img src="/assets/media/images/hero-background.webp" alt="Foto Kegiatan Belajar Santri" loading="lazy" decoding="async" onerror="return asfImgFallback(this)">
            <div class="placeholder-info">
                <i class="bi bi-book-half"></i>
                <span>Foto Kegiatan Belajar / Halaqah</span>
            </div>
            <div class="photo-caption">Kegiatan Halaqah Santri</div>
        </div>
        <h4>A. Unggul dalam Mafahiim (Wawasan)</h4>
        <div class="program-table-wrapper">
            <table class="program-table">
                <thead>
                    <tr>
                        <th width="50px">No</th>
                        <th>Mata Pelajaran</th>
                        <th class="text-end">Fann / Arab</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>1</td><td>Ilmu Tauhid / Ideologi</td><td class="arabic-col">فن التوحيد</td></tr>
                    <tr><td>2</td><td>Ilmu Fiqih</td><td class="arabic-col">فن الفقه</td></tr>
                    <tr><td>3</td><td>Ilmu Tasawwuf, Adab & Akhlaq</td><td class="arabic-col">فن التصوف والأداب والأخلاق</td></tr>
                    <tr><td>4</td><td>Ilmu Ushul Fiqih</td><td class="arabic-col">فن اصول الفقه</td></tr>
                    <tr><td>5</td><td>Ilmu Tajwid</td><td class="arabic-col">فن التجويد</td></tr>
                </tbody>
            </table>
        </div>

        <h4>B. Unggul dalam Tahfidz (Hafalan)</h4>
        <div class="program-table-wrapper">
            <table class="program-table">
                <thead>
                    <tr>
                        <th width="50px">No</th>
                        <th>Kitab / Surat</th>
                        <th class="text-end">Nama Kitab (Arab)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>1</td><td>Tanwirul Qulub</td><td class="arabic-col">تنوير القلوب</td></tr>
                    <tr><td>2</td><td>Jurumiyyah & Alfiyyah</td><td class="arabic-col">جرومية بالالفية</td></tr>
                    <tr><td>3</td><td>Bab Tashrif</td><td class="arabic-col">باب التصريف</td></tr>
                    <tr><td>4</td><td>Riyaadus Sholihin</td><td class="arabic-col">رياض الصالحين</td></tr>
                    <tr><td>5</td><td>Safinah an-Naja</td><td class="arabic-col">سفينة النجا</td></tr>
                    <tr><td>6</td><td>Juz ‘Amma & Surat Pilihan*</td><td class="arabic-col">جزء عم وسور مختارة</td></tr>
                </tbody>
            </table>
        </div>
        <p class="small text-muted">*Surat Pilihan: Al-Baqoroh, Ali-Imran, An-Nisa, Al-Maidah, Al-An'am, Al-Kahfi, Yaasin, Al-Waqi'ah, As-Sajdah, Ad-Dukhon, Al-Mulk, Juz 29.</p>

        <h4>C. Unggul dalam Amaliyyah (Realisasi)</h4>
        <ul class="custom-list-number three-column-list">
            <li>Sholat Berjama’ah Tiap Waktu</li>
            <li>Sholat Sunnah Rawatib</li>
            <li>Wirid Ba’da Sholat</li>
            <li>Sholat Dhuha</li>
            <li>Qiyamul Lail (Tahajud)</li>
            <li>Sholat Witir</li>
            <li>Ratib Imam Al-Haddad</li>
            <li>Ratib Imam Al-Atthos</li>
            <li>Do’a Sehari-hari</li>
            <li>Wirid Ijazah</li>
            <li>Praktek Wudlu & Sholat</li>
            <li>Praktek Pengurusan Jenazah</li>
        </ul>

        <h3>5. Perkembangan Santri</h3>
        <p>
            Pesantren memulai penerimaan santri baru pada tahun ajaran 1434 H / 2013 M dengan jumlah awal <strong>35 santri</strong>.
        </p>
        <p>
            Alhamdulillah, pada tahun ajaran 1441 H / 2020 M, terjadi peningkatan yang sangat signifikan:
        </p>

        <div class="stats-box">
            <div class="row">
                <div class="col-md-4 mb-3 mb-md-0">
                    <div class="stats-number">980</div>
                    <div class="small">Santri Unggulan</div>
                </div>
                <div class="col-md-4 mb-3 mb-md-0">
                    <div class="stats-number">400</div>
                    <div class="small">Santri Khidmah</div>
                </div>
                <div class="col-md-4">
                    <div class="stats-number">51</div>
                    <div class="small">Pengajar (Mu'alim/ah)</div>
                </div>
            </div>
        </div>

        <p class="text-muted small">
            <em>Catatan: Saat ini pesantren fokus penuh pada pendidikan kepesantrenan (mencetak Ulama Rabbani) dan belum menyelenggarakan pendidikan umum formal di pagi/siang hari.</em>
        </p>

    </div>
</article>

<div class="chapter-spacer" style="height: 50px;"></div>

<div class="chapter-header-box">
    <span class="chapter-number">BAB IV</span>
    <h1 class="chapter-title-main">Silsilah Sanad Keilmuan</h1>
    <img loading="lazy" decoding="async" src="/assets/media/images/divider-gold.webp" alt="" style="height: 3px; width: 80px; margin-top:10px; background:var(--accent-gold);">
</div>

<article class="paper-card" id="bab-4-content">
    <div class="paper-content">
        
        <div class="split-layout">
            
            <div class="left-visual">
                <div class="portrait-frame">
                    <img src="/assets/media/profile-pondok/abuya-1.webp" alt="Abuya K.H. Muhammad Muhyiddin" loading="lazy" decoding="async" onerror="return asfImgFallback(this)">
                    <div class="photo-caption" style="bottom: 10px; right: 10px;">
                        Abuya K.H. Muhammad Muhyiddin
                    </div>
                </div>
            </div>

            <div class="right-content">
                
                <h3 class="mt-0 mb-3" style="font-size: 1.6rem;">Guru-Guru Beliau</h3>
                
                <div class="silsilah-intro">
                    <p class="mb-0">
                        Berikut adalah para Masyaikh dan Ulama Besar tempat <strong>Abuya K. H. Muhammad Muhyiddin Abdul Qodir Al-Manafi, MA</strong> menimba ilmu dan mengambil sanad keilmuan secara langsung (talaqqi):
                    </p>
                </div>

                <div class="guru-grid">
                    
                    <div class="guru-item">
                        <div class="guru-number">1</div>
                        <div class="guru-info">
                            <span class="guru-name">K. H. Ahmad Thoha Mustawi ra.</span>
                        </div>
                    </div>

                    <div class="guru-item">
                        <div class="guru-number">2</div>
                        <div class="guru-info">
                            <span class="guru-name">K. H. Aceng Bojong ra.</span>
                        </div>
                    </div>

                    <div class="guru-item">
                        <div class="guru-number">3</div>
                        <div class="guru-info">
                            <span class="guru-name">K. H. Muhammad Yahya ra.</span>
                        </div>
                    </div>

                    <div class="guru-item">
                        <div class="guru-number">4</div>
                        <div class="guru-info">
                            <span class="guru-name">K. H. Agus Qistolani ra.</span>
                        </div>
                    </div>

                    <div class="guru-item">
                        <div class="guru-number">5</div>
                        <div class="guru-info">
                            <span class="guru-name">K. H. Khoer Affandi ra.</span>
                        </div>
                    </div>

                    <div class="guru-item">
                        <div class="guru-number">6</div>
                        <div class="guru-info">
                            <span class="guru-name">K. H. Aang Syatibi ra.</span>
                        </div>
                    </div>

                    <div class="guru-item">
                        <div class="guru-number">7</div>
                        <div class="guru-info">
                            <span class="guru-name">Habib Abdullaah Bin Abdul Qodir Bilfaqih ra.</span>
                            <span class="guru-loc"><i class="bi bi-geo-alt-fill"></i> Malang</span>
                        </div>
                    </div>

                    <div class="guru-item">
                        <div class="guru-number">8</div>
                        <div class="guru-info">
                            <span class="guru-name">As Sayyid Muhammad Alwi al Maliki ra.</span>
                            <span class="guru-loc"><i class="bi bi-geo-alt-fill"></i> Mekah</span>
                        </div>
                    </div>

                    <div class="guru-item">
                        <div class="guru-number">9</div>
                        <div class="guru-info">
                            <span class="guru-name">Syekh Miskin al Misri ra.</span>
                        </div>
                    </div>

                    <div class="guru-item">
                        <div class="guru-number">10</div>
                        <div class="guru-info">
                            <span class="guru-name">Al Habib Ali Bafaqih</span>
                        </div>
                    </div>

                    <div class="guru-item">
                        <div class="guru-number">11</div>
                        <div class="guru-info">
                            <span class="guru-name">Al Habib Ahmad Al Kaff Al Jufri ra.</span>
                            <span class="guru-loc"><i class="bi bi-geo-alt-fill"></i> Madinah</span>
                        </div>
                    </div>

                    <div class="guru-item">
                        <div class="guru-number">12</div>
                        <div class="guru-info">
                            <span class="guru-name">Syekh Ismail Bin Muhammad Al Yamani Al Makki ra.</span>
                            <span class="guru-loc"><i class="bi bi-geo-alt-fill"></i> Yaman</span>
                        </div>
                    </div>

                    <div class="guru-item">
                        <div class="guru-number">13</div>
                        <div class="guru-info">
                            <span class="guru-name">Syekh Yasin Al Fadani ra.</span>
                            <span class="guru-loc"><i class="bi bi-geo-alt-fill"></i> Mekah</span>
                        </div>
                    </div>

                    <div class="guru-item">
                        <div class="guru-number">14</div>
                        <div class="guru-info">
                            <span class="guru-name">Syekh Muhammad Amin Hariri Asy Syafi’i Al Makki ra.</span>
                        </div>
                    </div>

                    <div class="guru-item">
                        <div class="guru-number">15</div>
                        <div class="guru-info">
                            <span class="guru-name">Syekh Abdurrahman Bin Abdil Hayyi Al Kattani ra.</span>
                        </div>
                    </div>

                    <div class="guru-item">
                        <div class="guru-number">16</div>
                        <div class="guru-info">
                            <span class="guru-name">Syekh Madani Al Madani ra.</span>
                        </div>
                    </div>

                    <div class="guru-item">
                        <div class="guru-number">17</div>
                        <div class="guru-info">
                            <span class="guru-name">Al Habib Muhammad Bin Alwi Al Idrus ra.</span>
                        </div>
                    </div>

                    <div class="guru-item">
                        <div class="guru-number">18</div>
                        <div class="guru-info">
                            <span class="guru-name">Al Habib Salim Bin Abdullaah Asy Syatiri ra.</span>
                        </div>
                    </div>

                    <div class="guru-item">
                        <div class="guru-number">19</div>
                        <div class="guru-info">
                            <span class="guru-name">Al Habib Zein Bin Ibrohim Bin Smith Al Madani Al Yamani ra.</span>
                        </div>
                    </div>

                    <div class="guru-item">
                        <div class="guru-number">20</div>
                        <div class="guru-info">
                            <span class="guru-name">Al Habib Umar Bin Salim Bin Hafidz ra.</span>
                            <span class="guru-loc"><i class="bi bi-geo-alt-fill"></i> Tarim, Yaman</span>
                        </div>
                    </div>

                </div> </div> </div> </div>
</article>

<div class="chapter-spacer" style="height: 50px;"></div>

<div class="chapter-header-box">
    <span class="chapter-number">BAB V</span>
    <h1 class="chapter-title-main">Keunggulan & Keberkahan Mondok</h1>
    <img loading="lazy" decoding="async" src="/assets/media/images/divider-gold.webp" alt="" style="height: 3px; width: 80px; margin-top:10px; background:var(--accent-gold);">
</div>

<article class="paper-card" id="bab-5-content">
    <div class="paper-content">
        
        <div class="intro-benefit-box">
            <i class="fas fa-praying-hands"></i>
            <h3 style="margin-top:0;">Plusnya Mondok Di Asy-Syifaa</h3>
            <p style="margin-bottom:0;">
                Santri tidak hanya menerima ilmu dari Abuya dan para Mu’alimin, tetapi juga sering menerima materi pelajaran dan <strong>do’a dari Ulama-ulama Besar Dunia</strong>. Pesantren ini menjadi magnet bagi para Ulama Internasional untuk berkunjung, menyampaikan tausiah, dan mendoakan para santri.
            </p>
        </div>

        <h4 class="text-center mb-4">Daftar Ulama & Habaib Internasional yang Berkunjung</h4>

        <div class="vip-grid">
            
            <div class="vip-card premium">
                <div class="vip-avatar">
                    <img src="/assets/media/profile-pondok/habib-umar-bin-hafidz-1.webp" alt="Habib Umar" loading="lazy" decoding="async" onerror="return asfImgFallback(this)">
                    <i class="fas fa-user-tie"></i> </div>
                <div class="vip-content">
                    <h5>Yang Mulia Al Habib Umar Bin Muhammad Bin Salim Bin Hafidz</h5>
                    <span class="vip-role"><i class="fas fa-globe-africa"></i> Rektor Darul Musthofa, Tarim - Yaman</span>
                    <div class="vip-desc">
                        <strong>Dua Kali Berkunjung:</strong><br>
                        1. Peletakan Batu Pertama (28 Muharram 1432 H / 3 Jan 2011 M).<br>
                        2. Nara Sumber Multaqo Ulama Internasional Ke-12 & Peresmian "Sementara" Pembangunan (10 Okt 2018 M).
                    </div>
                </div>
            </div>

            <div class="vip-card">
                <div class="vip-avatar">
                    <img src="/assets/media/images/foto-mudir.webp" alt="Habib Salim" loading="lazy" decoding="async" onerror="return asfImgFallback(this, true)">
                    <i class="fas fa-user"></i>
                </div>
                <div class="vip-content">
                    <h5>Habib Saalim Bin ’Abdullah Bin ’Umar Asy-Syathiri ra.</h5>
                    <span class="vip-role">Sultoonul ’Ilmi - Pengasuh Rubath Tarim</span>
                    <div class="vip-desc">
                        Meresmikan Majlis Pengajian Rutin & Do’a (24 Shafar 1432 H).
                    </div>
                </div>
            </div>

            <div class="vip-card">
                <div class="vip-avatar">
                    <img src="/assets/media/images/foto-mudir.webp" alt="Habib Zein" loading="lazy" decoding="async" onerror="return asfImgFallback(this, true)">
                    <i class="fas fa-user"></i>
                </div>
                <div class="vip-content">
                    <h5>Habib Zein Ibrahim Bin Sumaith Hafidzohulloh</h5>
                    <span class="vip-role">Madinah Al-Munawwaroh</span>
                    <div class="vip-desc">
                        Menyampaikan ijazah beberapa surat Al-Qur’an & keutamaannya (29 Jumadi Awwal 1432 H).
                    </div>
                </div>
            </div>

            <div class="vip-card">
                <div class="vip-avatar">
                    <img src="/assets/media/profile-pondok/foto-mudir.webp" alt="Habib Muhammad Bin Abdulloh Aljunaed" loading="lazy" decoding="async" onerror="return asfImgFallback(this, true)">
                    <i class="fas fa-user"></i>
                </div>
                <div class="vip-content">
                    <h5>Habib Muhammad Bin Abdulloh Aljunaed</h5>
                    <span class="vip-role">Yaman</span>
                    <div class="vip-desc">Koordinator Majlis Muwasholah Bainal Ulama Asia Tenggara.</div>
                </div>
            </div>

            <div class="vip-card">
                <div class="vip-avatar">
                    <img src="/assets/media/profile-pondok/foto-mudir.webp" alt="Habib Umar Bin Zein Bin Semith" loading="lazy" decoding="async" onerror="return asfImgFallback(this, true)">
                    <i class="fas fa-user"></i>
                </div>
                <div class="vip-content">
                    <h5>Habib Umar Bin Zein Bin Semith</h5>
                    <span class="vip-role">Putra Habib Zein Bin Ibrohim</span>
                    <div class="vip-desc">Al’aalim Al’allaamah.</div>
                </div>
            </div>

            <div class="vip-card">
                <div class="vip-avatar">
                    <img src="/assets/media/images/foto-mudir.webp" alt="Syekh Umar Bin Husain Al-Khatib" loading="lazy" decoding="async" onerror="return asfImgFallback(this, true)">
                    <i class="fas fa-user"></i>
                </div>
                <div class="vip-content">
                    <h5>Syekh Umar Bin Husain Al-Khatib</h5>
                    <span class="vip-role">Mufti Tarim - Yaman</span>
                    <div class="vip-desc">Dari Ma’had Darul Musthofa.</div>
                </div>
            </div>

            <div class="vip-card">
                <div class="vip-avatar">
                    <img src="/assets/media/images/foto-mudir.webp" alt="Syekh Dr. Saif Bin Ali Bin Mohammad Al-Ashri" loading="lazy" decoding="async" onerror="return asfImgFallback(this, true)">
                    <i class="fas fa-user"></i>
                </div>
                <div class="vip-content">
                    <h5>Syekh Dr. Saif Bin Ali Bin Mohammad Al-Ashri</h5>
                    <span class="vip-role">Qatar / UEA</span>
                    <div class="vip-desc">Guru Besar Univ. Zaid & Mufti Resmi Pusat Fatwa UEA.</div>
                </div>
            </div>

            <div class="vip-card">
                <div class="vip-avatar">
                    <img src="/assets/media/profile-pondok/foto-mudir.webp" alt="Syekh Mush'ab" loading="lazy" decoding="async" onerror="return asfImgFallback(this, true)">
                    <i class="fas fa-user"></i>
                </div>
                <div class="vip-content">
                    <h5>Syekh Mush'ab</h5>
                    <span class="vip-role">Manchester, Inggris</span>
                    <div class="vip-desc">Al'aalim Al'allaamah Addaa'i ilaLLah.</div>
                </div>
            </div>

            <div class="vip-card">
                <div class="vip-avatar">
                    <img src="/assets/media/profile-pondok/foto-mudir.webp" alt="Habib Murtadlo Bin Tohir" loading="lazy" decoding="async" onerror="return asfImgFallback(this, true)">
                    <i class="fas fa-user"></i>
                </div>
                <div class="vip-content">
                    <h5>Habib Murtadlo Bin Tohir</h5>
                    <span class="vip-role">Hadromaut, Yaman</span>
                    <div class="vip-desc">Cucu Pengarang Kitab Sulam Taufiq.</div>
                </div>
            </div>

            <div class="vip-card">
                <div class="vip-avatar">
                    <img src="/assets/media/profile-pondok/foto-mudir.webp" alt="DR. Syeikh Abdul Fattah Bin Shaleh Quddais" loading="lazy" decoding="async" onerror="return asfImgFallback(this, true)">
                    <i class="fas fa-user"></i>
                </div>
                <div class="vip-content">
                    <h5>DR. Syeikh Abdul Fattah Bin Shaleh Quddais</h5>
                    <span class="vip-role">Yaman</span>
                    <div class="vip-desc">Pengarang banyak kitab Fiqh, Tauhid, Adab, & Akhlak.</div>
                </div>
            </div>

            <div class="vip-card">
                <div class="vip-avatar">
                    <img src="/assets/media/profile-pondok/foto-mudir.webp" alt="Syeikh Muhammad Yasir Al-Qudlbani Asy-Syami" loading="lazy" decoding="async" onerror="return asfImgFallback(this, true)">
                    <i class="fas fa-user"></i>
                </div>
                <div class="vip-content">
                    <h5>Syeikh Muhammad Yasir Al-Qudlbani Asy-Syami</h5>
                    <span class="vip-role">Yaman</span>
                    <div class="vip-desc">Ulama Besar.</div>
                </div>
            </div>

        </div> <div class="closing-note">
            <i class="fas fa-infinity me-2"></i>
            Dan tentunya masih banyak lagi Ulama dari Makkah, Madinah, Jedah, Amerika, Australia, Libia, Mesir, Thailand, Kamboja, Malaysia, Singapura yang tidak disebutkan satu persatu.
        </div>

    </div>
</article>





























<?php include __DIR__ . '/partials.footer.php'; ?>

<a href="#top" id="backToTop" title="Kembali ke atas">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
    <path d="M10,0L9.4,0.6L0.8,9.1l1.2,1.2l7.1-7.1V20h1.7V3.3l7.1,7.1l1.2-1.2l-8.5-8.5L10,0z"></path>
  </svg>
</a>

<div id="searchOverlay">
  <span id="closeSearch" class="close-search" title="Tutup">×</span>
  <div class="search-box">
    <form class="d-flex gap-2" action="/pencarian.html" method="GET">
      <input type="text" name="s" class="form-control" autocomplete="off" placeholder="Cari di seluruh situs..." required />
      <button type="submit"><i class="bi bi-search"></i> CARI</button>
    </form>
  </div>
</div>


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>
<script src="/assets/js/main.js" defer></script>
<script>
function asfImgFallback(img, showSiblingIcon) {
  if (!img) return false;
  const current = img.getAttribute("src") || "";
  const tried = img.getAttribute("data-fallback-tried") || "";

  if (!tried && current.endsWith(".webp")) {
    img.setAttribute("data-fallback-tried", "png");
    img.src = current.replace(/\.webp$/i, ".png");
    return true;
  }

  if (tried === "png" && current.endsWith(".png")) {
    img.setAttribute("data-fallback-tried", "jpg");
    img.src = current.replace(/\.png$/i, ".jpg");
    return true;
  }

  img.style.display = "none";
  if (showSiblingIcon && img.nextElementSibling) {
    img.nextElementSibling.style.display = "block";
  }
  return false;
}

(() => {
  const nav = document.querySelector(".pondok-chapter-nav");
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll('a.chapter-pill[href^="#"]'));
  if (!links.length) return;

  const sectionMap = links
    .map((link) => {
      const section = document.querySelector(link.getAttribute("href"));
      if (!section) return null;

      let header = section.previousElementSibling;
      while (header && !header.classList.contains("chapter-header-box")) {
        header = header.previousElementSibling;
      }

      return { link, section, header };
    })
    .filter(Boolean);

  if (!sectionMap.length) return;

  let activeId = "";

  const setActive = (id) => {
    if (!id || id === activeId) return;
    activeId = id;

    sectionMap.forEach(({ link, section, header }) => {
      const isActive = section.id === id;
      link.classList.toggle("active", isActive);
      if (header) header.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
        link.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const getOffsetTop = () => {
    const navbar = document.querySelector(".asf-public-navbar");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const navHeight = nav.offsetHeight || 0;
    return navbarHeight + navHeight + 24;
  };

  const updateActiveByScroll = () => {
    const offset = getOffsetTop();
    const probe = window.scrollY + offset;
    let current = sectionMap[0].section.id;

    sectionMap.forEach(({ section }) => {
      if (section.offsetTop <= probe) current = section.id;
    });

    setActive(current);
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      const offset = getOffsetTop();
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setActive(target.id);
      history.replaceState(null, "", "#" + target.id);
    });
  });

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      updateActiveByScroll();
      ticking = false;
    });
  };

  updateActiveByScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateActiveByScroll);
})();
</script>

</body>
</html>


















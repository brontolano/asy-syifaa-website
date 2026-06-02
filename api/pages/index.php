<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Ponpes Asy-Syifaa Wal Mahmuudiyyah - Website</title>
<meta name="description" content="Website resmi Ponpes Asy-Syifaa Wal Mahmuudiyyah Sumedang asuhan Abuya K.H. M. Muhyiddin. Pesantren modern berstandar internasional, mencetak santri berakhlak dan berprestasi. Info PSB 2026 klik di sini.">
  
  <meta name="keywords" content="Pondok Pesantren Sumedang, Asy-Syifaa Wal Mahmuudiyyah, Abuya Muhyiddin, Pesantren Internasional, PSB 2026, Santri Modern, Sekolah Islam Terpadu, Ponpes Jawa Barat">
  
  <meta name="author" content="Tim IT Asy-Syifaa Wal Mahmuudiyyah">
  <meta name="robots" content="index, follow"> <meta name="theme-color" content="#206c4e"> <meta property="og:type" content="website">
  <meta property="og:url" content="https://asy-syifaa.com/"> 
  <meta property="og:title" content="Ponpes Asy-Syifaa Wal Mahmuudiyyah Sumedang">
  <meta property="og:description" content="Pondok Pesantren Islam Internasional Terpadu Terpadu. Membangun Generasi Qur'ani dan Berwawasan Global.">
  <meta property="og:image" content="assets/img/slider1.jpg"> <meta property="og:image:alt" content="Gedung Utama Asy-Syifaa Wal Mahmuudiyyah">
  <meta property="og:site_name" content="Asy-Syifaa Wal Mahmuudiyyah">
  <meta property="og:locale" content="id_ID">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Ponpes Asy-Syifaa Wal Mahmuudiyyah - Sumedang">
  <meta name="twitter:description" content="Pondok Pesantren Islam Internasional Terpadu Terpadu asuhan Abuya K.H. M. Muhyiddin.">
  <meta name="twitter:image" content="assets/img/slider1.jpg">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet" />
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source Sans 3:wght@400;500;600&display=swap" rel="stylesheet">

<link rel="icon" href="/assets/media/images/logo.png" type="image/png" sizes="32x32">

  
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/main.css?v=20260519">
    <style>
        /* ======================================== */
/* GURU SLIDER MODERN (CLEAN STYLE)         */
/* ======================================== */




/* Tombol Navigasi Slider */
.nav-btn-guru {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #ddd;
    background: white;
    color: var(--dark-green);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 1.1rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.nav-btn-guru:hover {
    background: var(--primary-green);
    color: white;
    border-color: var(--primary-green);
    transform: scale(1.1);
    box-shadow: 0 10px 20px rgba(var(--primary-green-rgb), 0.2);
}

/* Area Slider (Window) */
.guru-slider-window {
    overflow: hidden;
    padding: 20px 10px 40px 10px; /* Padding bawah untuk bayangan */
    margin: -20px -10px 0 -10px; /* Kompensasi margin negatif */
}

/* Track Slider (Tempat Kartu Berjejer) */
.guru-track {
    display: flex;
    gap: 30px; /* Jarak antar kartu */
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 20px;
    scrollbar-width: none; /* Sembunyikan scrollbar Firefox */
}
.guru-track::-webkit-scrollbar {
    display: none; /* Sembunyikan scrollbar Chrome */
}

/* Kartu Guru */
.guru-card {
    flex: 0 0 280px; /* Lebar TETAP kartu (sesuaikan jika ingin lebih lebar) */
    background: #fff;
    border-radius: 20px; /* Sudut membulat modern */
    overflow: hidden;
    scroll-snap-align: start;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05); /* Bayangan sangat halus */
    transition: all 0.4s ease;
    border: 1px solid rgba(0,0,0,0.03);
    position: relative;
}

/* Efek Hover Kartu */
.guru-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(32, 108, 78, 0.15); /* Bayangan hijau halus */
}

/* Container Foto */
.guru-img-container {
    width: 100%;
    height: 350px; /* Tinggi foto */
    position: relative;
    overflow: hidden;
    background-color: #f8f9fa;
}

.guru-img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Agar foto tidak gepeng */
    transition: transform 0.6s ease;
}

/* Efek Zoom Foto saat Hover */
.guru-card:hover .guru-img-container img {
    transform: scale(1.08);
}

/* Overlay halus di bawah foto (opsional, untuk estetika) */
.guru-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, rgba(0,0,0,0.05), transparent);
    opacity: 0.6;
}

/* Konten Teks */
.guru-content {
    padding: 25px 20px;
    text-align: center;
    background: white;
    position: relative;
    z-index: 2;
}

/* Jabatan (Teks Kecil di Atas Nama) */
.guru-jabatan {
    font-family: 'Source Sans 3', sans-serif;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--primary-green);
    font-weight: 600;
    margin-bottom: 8px;
    display: block;
}

/* Nama Guru */
.guru-nama {
    font-family: 'Merriweather', serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--dark-green);
    margin: 0;
    line-height: 1.3;
}

/* Garis Aksen Kecil */
.guru-line {
    width: 40px;
    height: 3px;
    background-color: var(--accent-gold);
    margin: 15px auto 0 auto;
    border-radius: 10px;
    transition: width 0.3s ease;
}

/* Garis memanjang saat hover */
.guru-card:hover .guru-line {
    width: 80px;
}

/* Responsif untuk Mobile */
@media (max-width: 768px) {
    .guru-card {
        flex: 0 0 250px; /* Kartu lebih kecil di HP */
    }
    .guru-img-container {
        height: 300px;
    }
}



/* ============================================================ */
/* MOBILE RESPONSIVE PATCH (FINAL VERSION)                      */
/* ============================================================ */

@media (max-width: 767.98px) {

    /* --- 1. MEMBUAT JUDUL SECTION RATA TENGAH (EKSKUL & GURU) --- */
    /* Kita paksa override class 'text-start' dari Bootstrap */
    .section-header.text-start {
        text-align: center !important;
        width: 100%;
    }

    .section-header h2 {
        text-align: center !important;
        font-size: 1.8rem; /* Ukuran font disesuaikan */
        display: block; /* Pastikan block agar bisa di-center */
        width: 100%;
    }
    
    /* Garis bawah judul juga di-tengahkan */
    .section-header h2::after {
        left: 50% !important;
        transform: translateX(-50%) !important;
    }

    .section-header p {
        text-align: center !important;
        margin-left: auto !important;
        margin-right: auto !important;
        font-size: 0.9rem;
    }

    /* Mengatur container flex di atas judul agar turun ke bawah & tengah */
    #ekstrakurikuler .d-flex,
    #guru-staf .d-flex {
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        text-align: center !important;
    }

    /* --- 3. HERO SECTION & NAVBAR --- */
    body { padding-top: 80px; overflow-x: hidden; }
    
    .navbar-brand img { width: 50px; height: 50px; }
    .navbar-brand span { font-size: 1.1rem !important; }

    .hero-section {
        height: 85vh;
        min-height: 400px;
        padding-top: 60px;
    }
    .hero-title { font-size: 1.5rem; }
    .hero-brand { font-size: 2rem; line-height: 1.1; margin-bottom: 1.5rem !important; }
    .btn-outline-light { padding: 8px 25px !important; font-size: 0.9rem; }

    /* --- 4. Sembunyikan Tombol Navigasi Panah (Swipe saja) --- */
    .nav-buttons, 
    .d-flex.gap-2 button,
    .link-lihat-semua { 
        display: none !important; /* Sembunyikan tombol next/prev & link lihat semua di header */
    }

    /* Tampilkan tombol "Lihat Semua" versi tombol besar di bawah (sudah ada di HTML) */
    #ekstrakurikuler .d-md-none {
        display: block !important;
        margin-top: 20px;
    }

   /* Card Styles Ekskul */
.ekskul-card {
    flex: 0 0 240px; /* Lebar diperkecil dari 300px ke 240px */
    height: 340px;   /* Tinggi diperkecil dari 400px ke 340px */
    border-radius: 15px;
    position: relative;
    overflow: hidden;
    scroll-snap-align: start;
    box-shadow: 0 8px 15px rgba(0,0,0,0.1);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    cursor: pointer;
}

/* Badge Icon di Pojok Kiri Atas */
.ekskul-badge {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 35px; /* Diperkecil dari 45px */
    height: 35px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    color: var(--primary-green);
    font-size: 1rem; /* Font icon diperkecil */
    box-shadow: 0 5px 15px rgba(0,0,0,0.15);
}

/* Tag Nama Ekskul */
.ekskul-tag {
    background: white;
    color: var(--dark-green);
    padding: 8px 20px; /* Padding tag diperkecil */
    border-radius: 50px;
    font-family: 'Merriweather', serif;
    font-weight: 700;
    font-size: 0.95rem; /* Font diperkecil */
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    display: inline-block;
    transition: all 0.3s ease;
    border: 2px solid transparent;
}
/* Kartu Guru */
.guru-card {
    flex: 0 0 240px; /* Lebar diperkecil dari 280px */
    background: #fff;
    border-radius: 15px;
    overflow: hidden;
    scroll-snap-align: start;
    box-shadow: 0 8px 20px rgba(0,0,0,0.05);
    transition: all 0.4s ease;
    border: 1px solid rgba(0,0,0,0.03);
    position: relative;
}
/* Container Foto Guru */
.guru-img-container {
    width: 100%;
    height: 280px; /* Tinggi foto dikurangi dari 350px */
    position: relative;
    overflow: hidden;
    background-color: #f8f9fa;
}
  
/* Nama Guru */
.guru-nama {
    font-family: 'Merriweather', serif;
    font-size: 1.1rem; /* Diperkecil dari 1.3rem */
    font-weight: 700;
    color: var(--dark-green);
    margin: 0;
    line-height: 1.3;
}




.gallery-grid, .instagram-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 10px !important;
    }
}

/* ======================================== */
/* VIDEO Profile FULL CINEMATIC              */
/* ======================================== */

#video-Profile-full {
    border-top: 4px solid var(--accent-gold); /* Aksen emas pemisah */
    border-bottom: 4px solid var(--accent-gold);
    position: relative;
}

.video-cinematic-wrapper {
    width: 100%;
    margin: 0;
    padding: 0;
}

/* Default Mobile (16:9 standard) */
.ratio-cinematic {
    --bs-aspect-ratio: 56.25%; /* 16:9 */
}

/* Overlay Teks di atas Video */
.video-overlay-text {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%); /* Gradasi hitam di bawah */
    pointer-events: none; /* Agar klik tembus ke tombol play video */
    z-index: 5;
}

.video-overlay-text h2 {
    font-family: 'Merriweather', serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    color: var(--accent-gold);
    margin-bottom: 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
}

.video-overlay-text p {
    font-family: 'Source Sans 3', sans-serif;
    color: white;
    font-size: clamp(1rem, 2vw, 1.2rem);
    letter-spacing: 1px;
    margin-bottom: 0;
    opacity: 0.9;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
}


    /* --- 2. VIDEO Profile (Judul "Profile Pondok" Dikecilkan) --- */
    #video-Profile-full .video-overlay-text h2 {
        font-size: 0.7rem !important; /* Dikecilkan drastis untuk HP */
        margin-bottom: 5px;
    }
    
    #video-Profile-full .video-overlay-text p {
        font-size: 0.3rem !important;
    }
    
    #video-Profile-full .container {
        padding-bottom: 0.7rem !important;
    }




/* Responsif Desktop: Buat lebih "Wide" (Cinematic) */
@media (min-width: 992px) {
    .ratio-cinematic {
        --bs-aspect-ratio: 42.55%; /* Sekitar 21:9 (Cinematic/Ultrawide) */
        /* Ini membuat video di desktop full lebar tapi tingginya tidak memakan satu layar penuh, 
           jadi terlihat lebih estetik seperti banner film */
        max-height: 80vh; /* Batasi tinggi maksimal */
    }
}

/* Responsif Mobile Khusus */
@media (max-width: 768px) {
    .video-overlay-text .container {
        padding-bottom: 2rem !important; /* Kurangi padding bawah di HP */
    }
    
    /* Hilangkan border tebal di HP jika dirasa terlalu berat, opsional */
    #video-Profile-full {
        border-width: 2px;
    }
}


/* ============================================================ */
/* MOBILE RESPONSIVE PATCH (VERSI MINI / SANGAT KECIL)          */
/* ============================================================ */

@media (max-width: 767.98px) {

    /* --- 1. GLOBAL ADJUSTMENTS --- */
    body { padding-top: 70px; overflow-x: hidden; }
    
    /* Judul Section Rata Tengah & Lebih Kecil */
    .section-header.text-start { text-align: center !important; width: 100%; }
    .section-header h2 {
        text-align: center !important;
        font-size: 1.5rem !important; /* Judul diperkecil */
        display: block; width: 100%;
    }
    .section-header h2::after { left: 50% !important; transform: translateX(-50%) !important; }
    .section-header p { text-align: center !important; font-size: 0.85rem; padding: 0 15px; }

    /* Flex Container Center */
    #ekstrakurikuler .d-flex, #guru-staf .d-flex {
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        text-align: center !important;
    }

    /* Sembunyikan Navigasi Desktop */
    .nav-buttons, .d-flex.gap-2 button, .link-lihat-semua { display: none !important; }
    #ekstrakurikuler .d-md-none { display: block !important; margin-top: 15px; }

    /* --- 2. VIDEO PROFILE (FULL WIDTH TAPI PENDEK/GEPENG) --- */
    #video-Profile-full {
        border-top: 2px solid var(--accent-gold);
        border-bottom: 2px solid var(--accent-gold);
    }
    
    /* Memaksa rasio video menjadi sangat lebar (Cinematic Strip) agar tidak memakan layar */
    #video-Profile-full .ratio {
        --bs-aspect-ratio: 45% !important; /* Standar HP 170-200px tingginya */
    }

    /* Teks Overlay Video Diperkecil Drastis */
    #video-Profile-full .video-overlay-text h2 {
        font-size: 1.2rem !important;
        margin-bottom: 2px;
    }
    #video-Profile-full .video-overlay-text p {
        font-size: 0.75rem !important;
        line-height: 1.2;
    }
    #video-Profile-full .container {
        padding-bottom: 1rem !important;
    }

    /* --- 3. KARTU EKSTRAKURIKULER (SUPER MINI) --- */
    /* Ukuran kartu dikecilkan drastis agar muat hampir 2 kartu di layar HP */
    .ekskul-card {
        flex: 0 0 160px !important; /* Lebar diperkecil dari 240px ke 160px */
        height: 220px !important;   /* Tinggi diperkecil dari 340px ke 220px */
        border-radius: 10px;
    }

    /* Badge Icon (Pojok Kiri Atas) */
    .ekskul-badge {
        width: 30px !important;
        height: 30px !important;
        font-size: 0.8rem !important;
        top: 10px !important;
        left: 10px !important;
    }

    /* Tag Nama Ekskul (Di Bawah) */
    .ekskul-tag {
        font-size: 0.75rem !important; /* Font sangat kecil */
        padding: 4px 12px !important;
        width: 90%; /* Agar tidak melebar keluar */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .ekskul-content {
        bottom: 15px !important;
        padding: 0 5px !important;
    }

    /* --- 4. KARTU GURU (SUPER MINI) --- */
    .guru-card {
        flex: 0 0 160px !important; /* Lebar diperkecil drastis */
        border-radius: 10px;
    }

    /* Kontainer Foto Guru */
    .guru-img-container {
        height: 190px !important; /* Tinggi foto dikurangi drastis */
    }

    /* Konten Teks Guru */
    .guru-content {
        padding: 10px !important;
    }

    .guru-jabatan {
        font-size: 0.65rem !important; /* Font jabatan sangat kecil */
        margin-bottom: 2px !important;
    }

    .guru-nama {
        font-size: 0.85rem !important; /* Font nama diperkecil */
        line-height: 1.2;
    }
    
    .guru-line {
        margin-top: 8px !important;
        width: 20px !important;
    }

    /* --- 5. NAVBAR & HERO ADJUSTMENTS --- */
    .navbar-brand img { width: 40px; height: 40px; }
    
    .hero-section {
        min-height: 350px; /* Hero section lebih pendek */
        height: 60vh;
    }
    .hero-title { font-size: 1.3rem !important; }
    .hero-brand { font-size: 1.6rem !important; margin-bottom: 1rem !important; }
    
    /* Grid Galeri */
    .gallery-grid, .instagram-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 8px !important;
    }
}

/* ============================================================ */
/* PATCH FINAL: PERKECIL UKURAN UTAMA (DESKTOP/DEFAULT)         */
/* ============================================================ */

/* --- 1. KARTU EKSTRAKURIKULER (Sangat Kecil) --- */
.ekskul-card {
    /* Lebar dikurangi drastis dari 300px ke 200px */
    flex: 0 0 200px !important; 
    /* Tinggi dikurangi drastis dari 400px ke 280px */
    height: 280px !important;   
}

/* Perkecil label nama ekskul */
.ekskul-tag {
    font-size: 0.8rem !important;
    padding: 6px 15px !important;
}

/* Perkecil ikon badge di pojok */
.ekskul-badge {
    width: 35px !important;
    height: 35px !important;
    font-size: 0.9rem !important;
    top: 10px !important;
    left: 10px !important;
}

/* --- 2. KARTU GURU & STAF (Sangat Kecil) --- */
.guru-card {
    /* Lebar dikurangi drastis dari 280px ke 180px */
    flex: 0 0 180px !important; 
}

/* Perkecil area foto guru */
.guru-img-container {
    /* Tinggi foto dikurangi drastis dari 350px ke 220px */
    height: 220px !important; 
}

/* Perkecil teks konten guru */
.guru-content {
    padding: 12px 10px !important;
}

.guru-nama {
    font-size: 0.95rem !important; /* Nama jadi kecil */
    margin-bottom: 2px !important;
}

.guru-jabatan {
    font-size: 0.7rem !important; /* Jabatan sangat kecil */
    margin-bottom: 5px !important;
}

.guru-line {
    margin-top: 8px !important;
}

/* ============================================================ */
/* PERBAIKAN FINAL: UKURAN VIDEOTEXT RESPONSIF OTOMATIS         */
/* ============================================================ */

/* 1. TAMPILAN NORMAL (LAPTOP/PC) - Ukuran Sedang/Jelas */
#video-Profile-full .ratio {
    /* Rasio Video Cinematic (Memanjang) */
    --bs-aspect-ratio: 40% !important; 
    border-radius: 10px !important; 
}

#video-Profile-full .video-overlay-text h2 {
    /* Ukuran font sedang (tidak raksasa, tidak kekecilan) */
    font-size: 3.5rem !important; 
    font-weight: 700;
    margin-bottom: 15px !important;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
}

#video-Profile-full .video-overlay-text p {
    font-size: 1.1rem !important;
    letter-spacing: 1px;
}

/* 2. TAMPILAN HP (MOBILE) - Otomatis Mengecil */
@media (max-width: 767.98px) {
    #video-Profile-full .ratio {
        /* Di HP video agak lebih tinggi sedikit biar tidak terlalu gepeng */
        --bs-aspect-ratio: 56.25% !important; 
    }

    #video-Profile-full .video-overlay-text h2 {
        /* Font mengecil drastis agar muat di layar HP */
        font-size: 1.2rem !important; 
        margin-bottom: 5px !important;
    }

    #video-Profile-full .video-overlay-text p {
        font-size: 0.7rem !important;
        line-height: 1.2;
    }
    
    #video-Profile-full .container {
        padding-bottom: 1.5rem !important;
    }
}


/* ============================================================ */
/* PERBAIKAN FINAL V2: HERO CENTER MUTLAK (VERTICAL & HORIZONTAL) */
/* ============================================================ */

@media (max-width: 767.98px) {

    /* 1. CONTAINER HERO: PUSATKAN SEGALA HAL */
    .hero-section {
        /* Menggunakan Flexbox untuk centering sempurna */
        display: flex !important;
        flex-direction: column !important; /* Susun atas-bawah */
        justify-content: center !important; /* Rata Tengah Secara VERTIKAL (Atas-Bawah) */
        align-items: center !important;     /* Rata Tengah Secara HORIZONTAL (Kiri-Kanan) */
        text-align: center !important;      /* Pastikan teks rata tengah */
        
        /* Tinggi layar penuh HP agar 'tengah'nya akurat */
        height: 100vh !important;           
        min-height: 500px !important;
        
        /* Hapus padding yang mengganggu posisi tengah */
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        margin-top: 0 !important;
    }

/* 2. BACKGROUND: FOKUS KE TENGAH (PINTU) */
    .hero-bg {
        /* Ubah angka 40% ini sesuai keinginan Abah. 
           50% = Tengah pas.
           30% - 40% = Lebih ke Kiri.
           60% - 70% = Lebih ke Kanan.
        */
        background-position: 75% center !important; 
        
        background-size: cover !important;
        filter: brightness(0.7); 
    }
    
    /* 3. TEKS SELAMAT DATANG (Kecil) */
    .hero-intro {
        font-size: 0.85rem !important;
        letter-spacing: 1px !important;
        margin-bottom: 10px !important;
        margin-top: 40px !important; /* Kompensasi sedikit agar tidak ketutup navbar */
    }

    /* 4. TEKS TENGAH (Deskripsi) */
    .hero-title {
        font-size: 1.2rem !important;
        line-height: 1.4 !important;
        margin-bottom: 10px !important;
        padding: 0 20px !important; /* Jarak aman kiri-kanan */
        width: 100% !important;
    }

    /* 5. NAMA PONDOK (Judul Utama) */
    .hero-brand {
        font-size: 1.8rem !important;
        font-weight: 800 !important;
        margin-bottom: 30px !important;
        line-height: 1.2 !important;
    }

    /* 6. TOMBOL */
    .hero-section .btn {
        padding: 12px 35px !important;
        font-size: 0.95rem !important;
        border-radius: 50px !important;
    }
    
    /* Pastikan Container di dalamnya tidak membatasi lebar */
    .hero-section .container {
        width: 100% !important;
        padding: 0 15px !important;
    }
}



    </style>
<script src="/assets/js/main.js"></script>

</head>
 
<body id="top">

<?php include __DIR__ . '/partials.header.php'; ?>

<main>
    
<section class="hero-section d-flex align-items-center text-center">
    <div class="hero-bg" style="background-image: url('assets/img/slider1.jpg');"></div>
    
    <div class="hero-overlay"></div>

    <div class="container position-relative z-2" data-aos="fade-in">
        <p class="hero-intro text-white text-uppercase tracking-wider mb-2">Selamat Datang di Website Resmi</p>
        
        <h1 class="hero-title text-white mb-2">Pondok Pesantren Islam Internasional Terpadu Terpadu</h1>
        
        <h1 class="hero-brand text-gold mb-4">Asy-Syifaa Wal Mahmuudiyyah</h1>
        
        <a href="/mahad" class="btn btn-outline-light rounded-pill px-5 py-2 mt-3">
            Selengkapnya
        </a>
    </div>
</section>

<section id="quote-modern" class="py-5">
    <div class="container">
        <div class="quote-wrapper text-center">
            <span class="quote-icon">"</span>
            <blockquote class="quote-text-modern">
                Barangsiapa yang Alloh kehendaki kebaikan baginya, niscaya Alloh akan memahamkan dia dalam urusan agamanya.
            </blockquote>
            <footer class="quote-author">
                - Hadits Riwayat Bukhari & Muslim -
            </footer>
        </div>
    </div>
</section>





<section id="stats" class="stats-section py-5">
  <div class="container">
    <div class="row text-center">
      <div class="col-lg-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="0"><div class="stat-box"><div class="stat-number-wrapper">+<span class="stat-number" data-target="600">0</span></div><div class="stat-label">Santri Banin</div></div></div>
      <div class="col-lg-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="100"><div class="stat-box"><div class="stat-number-wrapper">+<span class="stat-number" data-target="400">0</span></div><div class="stat-label">Santri Banat</div></div></div>
      <div class="col-lg-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="200"><div class="stat-box"><div class="stat-number-wrapper">+<span class="stat-number" data-target="100">0</span></div><div class="stat-label">Alumni</div></div></div>
      <div class="col-lg-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="300"><div class="stat-box"><div class="stat-number-wrapper">+<span class="stat-number" data-target="80">0</span></div><div class="stat-label">Pendidik</div></div></div>
    </div>
  </div>
</section>


<section id="video-Profile-full" class="position-relative w-100 overflow-hidden bg-dark">
    
    <div class="video-cinematic-wrapper">
        <div class="ratio ratio-16x9">
    <iframe 
        src="https://www.youtube.com/embed/zyiKW6JHdP8?si=custom_param" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen>
    </iframe>
</div>
        </div>
    </div>

    <div class="video-overlay-text pe-none">
        <div class="container h-100 d-flex flex-column justify-content-end pb-5">
            <h2 data-aos="fade-up">Profile Pondok</h2>
            <p data-aos="fade-up" data-aos-delay="100">Mengenal lebih dekat Pondok Pesantren Islam Internasional Terpadu Terpadu <br> </p>
                <p style="font-weight: bold;"> Asy-Syifaa Wal Mahmuudiyyah</p>
        </div>
    </div>

</section>



<section id="ekstrakurikuler" class="py-5 position-relative overflow-hidden">
    <div class="bg-decor-circle"></div>

    <div class="container">
        <div class="d-flex justify-content-between align-items-end mb-5" data-aos="fade-up">
            <div class="section-header text-start m-0">
                <h2 class="text-start">Ekstrakurikuler</h2>
                <p class="text-muted mt-2 mb-0" style="max-width: 500px;">
                    Wadah pengembangan bakat dan kreativitas santri dengan fasilitas modern dan pembimbing ahli.
                </p>
            </div>
            <div class="d-none d-md-flex align-items-center gap-3">
                <a href="/profil-ekskul.html" class="link-lihat-semua">Lihat Semua <i class="bi bi-arrow-right"></i></a>
                <div class="nav-buttons d-flex gap-2">
                    <button class="nav-btn-custom prev-btn" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>
                    <button class="nav-btn-custom next-btn" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>
                </div>
            </div>
        </div>

<div class="ekskul-slider-wrapper" data-aos="fade-up" data-aos-delay="100">
            <div class="ekskul-track" id="ekskulTrack">
                
                <div class="ekskul-card">
                    <div class="ekskul-img">
                        <img src="/assets/media/gallery/Dars Fajr Al Haddar/1.jpg" alt="Bahtsul Masail" loading="lazy">
                        <div class="ekskul-overlay"></div>
                        <div class="ekskul-badge"><i class="fa-solid fa-book-open"></i></div>
                    </div>
                    <div class="ekskul-content">
                        <span class="ekskul-tag">Bahtsul Masail</span>
                    </div>
                </div>

                <div class="ekskul-card">
                    <div class="ekskul-img">
                        <img src="/assets/media/gallery/Tabligh Akbar Habib Muhammad Al-Habsy/1.jpg" alt="Khitobah" loading="lazy">
                        <div class="ekskul-overlay"></div>
                        <div class="ekskul-badge"><i class="fa-solid fa-microphone-lines"></i></div>
                    </div>
                    <div class="ekskul-content">
                        <span class="ekskul-tag">Khitobah</span>
                    </div>
                </div>

                <div class="ekskul-card">
                    <div class="ekskul-img">
                        <img src="/assets/media/gallery/TASYRIK CHAMPIONSHIP/1.jpg" alt="Pencak Silat" loading="lazy">
                        <div class="ekskul-overlay"></div>
                        <div class="ekskul-badge"><i class="fa-solid fa-user-ninja"></i></div>
                    </div>
                    <div class="ekskul-content">
                        <span class="ekskul-tag">Pencak Silat</span>
                    </div>
                </div>

                <div class="ekskul-card">
                    <div class="ekskul-img">
                        <img src="/assets/media/gallery/Dauroh Ilmiyyah Qiro'ah/1.jpg" alt="Bahasa Arab" loading="lazy">
                        <div class="ekskul-overlay"></div>
                        <div class="ekskul-badge"><i class="fa-solid fa-language"></i></div>
                    </div>
                    <div class="ekskul-content">
                        <span class="ekskul-tag">Bahasa Arab</span>
                    </div>
                </div>

                <div class="ekskul-card">
                    <div class="ekskul-img">
                        <img src="/assets/media/gallery/Maulid Akbar 1447 H/1.jpg" alt="Hadroh & Terbangnan" loading="lazy">
                        <div class="ekskul-overlay"></div>
                        <div class="ekskul-badge"><i class="fa-solid fa-music"></i></div>
                    </div>
                    <div class="ekskul-content">
                        <span class="ekskul-tag">Hadroh & Terbangnan</span>
                    </div>
                </div>

                <div class="ekskul-card">
                    <div class="ekskul-img">
                        <img src="/assets/media/gallery/Upacara Hari Santri/1.jpg" alt="Ilmu Alat" loading="lazy">
                        <div class="ekskul-overlay"></div>
                        <div class="ekskul-badge"><i class="fa-solid fa-scroll"></i></div>
                    </div>
                    <div class="ekskul-content">
                        <span class="ekskul-tag">Ilmu Alat</span>
                    </div>
                </div>

            </div>
        </div>

        <div class="d-md-none text-center mt-4">
             <a href="/profil-ekskul.html" class="btn btn-outline-success rounded-pill px-4">Lihat Semua Ekskul</a>
        </div>
    </div>
</section>


<section id="guru-staf" class="py-5 position-relative bg-light">
    <div class="bg-decor-circle-left"></div>

    <div class="container">
        <div class="d-flex justify-content-between align-items-end mb-5" data-aos="fade-up">
            <div class="section-header text-start m-0">
                <h2 class="text-start">Guru & Staf</h2>
                <p class="text-muted mt-2 mb-0" style="max-width: 500px;">
                    Mengenal wajah-wajah pendidik yang berdedikasi membimbing santri dengan keilmuan dan akhlak mulia.
                </p>
            </div>
            
            <div class="d-flex gap-2">
                <button class="nav-btn-guru prev-guru" aria-label="Previous"><i class="fa-solid fa-chevron-left"></i></button>
                <button class="nav-btn-guru next-guru" aria-label="Next"><i class="fa-solid fa-chevron-right"></i></button>
            </div>
        </div>

        <div class="guru-slider-window" data-aos="fade-up" data-aos-delay="100">
            <div class="guru-track" id="guruTrack">
                
<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/profile-pondok/abuya-1.png" alt="Abuya K.H. Muhammad Muhyiddin" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Mudir 'Am</div>
        <h4 class="guru-nama">Prof. Dr. (H.C.) Abuya K.H. Muhammad Muhyiddin Abdul Qodir Al-Manafi, MA</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muhammad Tsabit" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Rois 'Am</div>
        <h4 class="guru-nama">Mu'allim Muhammad Tsabit</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muhammad Idris Syafei" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Muhammad Idris Syafei</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Syarif Muhammad Al Hasani" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Syarif Muhammad Al Hasani</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Maulana Jafar Shodiq" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Maulana Jafar Shodiq</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Taufiq Sholeh" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Taufiq Sholeh</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muhammad Hasanuddin" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Muhammad Hasanuddin</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muhammad Iqbal" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Muhammad Iqbal</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muhammad Abu Yazid" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Muhammad Abu Yazid</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Firman Hambali" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Firman Hambali</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Deden Maoludin" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Deden Maoludin</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Acep Yana Nurdiana" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Acep Yana Nurdiana</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Komarudin" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Komarudin</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Firman Jayusman" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Firman Jayusman</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Ade Setiawan" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Ade Setiawan</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Mochammad Wassy Abdul Basith" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Mochammad Wassy Abdul Basith</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Sansan Suherlan" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Sansan Suherlan</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muhammad Umar Al Kaff" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Muhammad Umar Al Kaff</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Gun Gun Gunawan" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Gun Gun Gunawan</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Jajang Nurjaman" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Jajang Nurjaman</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Abdul Rojak" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Abdul Rojak</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Taufik" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Taufik</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Adnan Muzaki" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Adnan Muzaki</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Cahya" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Cahya</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Dadang Jalaludin" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Dadang Jalaludin</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Moch Mukti Fauzi" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Moch Mukti Fauzi</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muhamad Salahudien Hambali" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Muhamad Salahudien Hambali</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Ucu Jaja Jamaludin" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Ucu Jaja Jamaludin</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Wail Akhyar Jamaludin" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Wail Akhyar Jamaludin</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Ardi Erliansah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Ardi Erliansah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Azali Deva Muhamad" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Azali Deva Muhamad</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Toni Abdullah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Toni Abdullah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Mochammad Fachrudin" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Mochammad Fachrudin</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Parhan Suhanda" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Parhan Suhanda</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Ahmad Wahya" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Ahmad Wahya</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Deden Tajudin" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Deden Tajudin</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Dimas Lutfi Husen M. Dimyati" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Dimas Lutfi Husen M. Dimyati</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Mahmud" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Mahmud</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muhamad Arief Ferdyansyah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Muhamad Arief Ferdyansyah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Taufik Rasyidin Nugraha" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allim Taufik Rasyidin Nugraha</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Hj. Syifa Alawiyah KH" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Ustadzah Hj. Syifa Alawiyah KH</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Saodah Uqbah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Ustadzah Saodah Uqbah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Hj. Zulfa Khodijah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Ustadzah Hj. Zulfa Khodijah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Hj. Salma Ummu Habibah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Ustadzah Hj. Salma Ummu Habibah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Hj. Shofiyyah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Ustadzah Hj. Shofiyyah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Dewi Hasna" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Ustadzah Dewi Hasna</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Dini Sa'diyah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Ustadzah Dini Sa'diyah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Mardliyah Azda Putri B" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Ustadzah Mardliyah Azda Putri B.</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Allra Septiani Subarna" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Ustadzah Allra Septiani Subarna</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Syarifah Zulfa Al Jufri" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Ustadzah Syarifah Zulfa Al Jufri</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Hj. Aisyah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Ustadzah Hj. Aisyah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Hj. Nabela" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Ustadzah Hj. Nabela</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Hj. Khodijah Adillatul Millah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Ustadzah Hj. Khodijah Adillatul Millah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Nadya Khodijah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Nadya Khodijah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Mega Syara Balqiyah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Mega Syara Balqiyah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Suci Nur Sholehah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Ustadzah Suci Nur Sholehah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Sri Wulan" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Sri Wulan</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Witri" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Witri</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Rina Oktavia" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Rina Oktavia</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Siti Romlah Habibah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Siti Romlah Habibah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Annisa April" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Annisa April</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Nurfadilah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Nurfadilah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Indah Nur Aisyah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Indah Nur Aisyah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Hamidhah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Hamidhah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Anisa Icha" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Anisa Icha</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Rofi Fakhriyyah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Rofi Fakhriyyah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Jelita Ayu Sukmana" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Jelita Ayu Sukmana</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Siti Nur Ilmi" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Siti Nur Ilmi</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Rina Mulyani" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Rina Mulyani</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Zulfa Aisyah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Zulfa Aisyah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Nur'aini Pusparini" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Nur'aini Pusparini</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Hafsoh Adibah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Hafsoh Adibah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Gita Dwi Pratiwi" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Gita Dwi Pratiwi</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Nur Fitri Meliani" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Nur Fitri Meliani</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Hj. Ruqoyyah Arsyad" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Hj. Ruqoyyah Arsyad</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Siti Hakimah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Siti Hakimah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Hj. Syamsi" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Ustadzah Hj. Syamsi</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Syifa Maulidina Khodijah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Syifa Maulidina Khodijah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Siti Hasna Lathifah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Siti Hasna Lathifah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Zakiyyah Rabiah A" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Zakiyyah Rabiah A.</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Ika Siti Khodijah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Ika Siti Khodijah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Resti Damayanti" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Resti Damayanti</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Fathimah Rosyidah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Muallimah Fathimah Rosyidah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Mu'allimah Aisyah Tholibah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allimah Aisyah Tholibah</h4>
        <div class="guru-line"></div>
    </div>
</div>

<div class="guru-card">
    <div class="guru-img-container">
        <img src="/assets/media/images/foto-mudir.jpg" alt="Mu'allimah Iis Midah" loading="lazy">
        <div class="guru-overlay"></div>
    </div>
    <div class="guru-content">
        <div class="guru-jabatan">Pengajar</div>
        <h4 class="guru-nama">Mu'allimah Iis Midah</h4>
        <div class="guru-line"></div>
    </div>
</div>


            </div>
        </div>

    </div>
</section>


<!-- ========== START: FOTO TERKINI (UPDATED TO INSTAGRAM GRID) ========== -->
<section id="foto-terkini" class="py-5 bg-light">
    <div class="container">
        <header class="text-center section-header" data-aos="fade-up">
            <h2>Foto Terkini</h2>
        </header>
        <p id="homeGalleryLoading" class="text-muted text-center">Memuat foto terkini...</p>
        <div id="homeGalleryEmpty" class="alert alert-warning d-none">Belum ada data galeri.</div>
        <div class="gallery-grid" id="homeGalleryGridRoot"></div>
        <div class="text-center mt-4">
            <a href="/galeri" class="btn btn-outline-success rounded-pill px-4">Lihat Semua Galeri</a>
        </div>
</div>


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
<script>
    document.addEventListener('DOMContentLoaded', () => {
    // Logika Slider Guru
    const guruTrack = document.getElementById('guruTrack');
    const prevGuruBtn = document.querySelector('.prev-guru');
    const nextGuruBtn = document.querySelector('.next-guru');

    if (guruTrack && prevGuruBtn && nextGuruBtn) {
        const scrollAmountGuru = 310; // Sesuaikan dengan (lebar kartu + gap)

        nextGuruBtn.addEventListener('click', () => {
            guruTrack.scrollBy({ left: scrollAmountGuru, behavior: 'smooth' });
        });

        prevGuruBtn.addEventListener('click', () => {
            guruTrack.scrollBy({ left: -scrollAmountGuru, behavior: 'smooth' });
        });
        
        // Opsional: Sembunyikan tombol jika mentok (Logic sama seperti ekskul)
        guruTrack.addEventListener('scroll', () => {
            const maxScrollLeft = guruTrack.scrollWidth - guruTrack.clientWidth;
            
            // Cek Kiri
            if (guruTrack.scrollLeft <= 10) {
                prevGuruBtn.style.opacity = '0.5';
                prevGuruBtn.style.pointerEvents = 'none';
            } else {
                prevGuruBtn.style.opacity = '1';
                prevGuruBtn.style.pointerEvents = 'auto';
            }

            // Cek Kanan
            if (guruTrack.scrollLeft >= maxScrollLeft - 10) {
                nextGuruBtn.style.opacity = '0.5';
                nextGuruBtn.style.pointerEvents = 'none';
            } else {
                nextGuruBtn.style.opacity = '1';
                nextGuruBtn.style.pointerEvents = 'auto';
            }
        });

        // Trigger scroll event saat load untuk set status tombol awal
        guruTrack.dispatchEvent(new Event('scroll'));
    }
});
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script src="/assets/js/main.js"></script>
<script src="/assets/js/api-config.js"></script>
<script src="/assets/js/gallery-pages.js"></script>

</body>
</html>









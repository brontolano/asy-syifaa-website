<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
 <title>Profile Abuya - Pondok Pesantren Asy-Syifaa Wal Mahmuudiyyah</title>

  <!-- Bootstrap & Icons -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />

  <!-- Custom CSS -->
  <link rel="stylesheet" href="/assets/css/main.css?v=20260519" />
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source Sans 3:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/footer.css?v=20260517">
<link rel="icon" href="/assets/media/images/logo.png" type="image/png" sizes="32x32">

  
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
 <link rel="stylesheet" href="/assets/css/main.css?v=20260519">
<script src="/assets/js/main.js"></script>
 <style>
/* =======================================================
   MODERN ISLAMIC ProfileE STYLING (REFINED 2026)
   Fokus: Elegan, Bersih, Aesthetic, & High-End
   ======================================================= */

/* --- 1. HERO SECTION: PRESTIGE & DEPTH --- */
.Profilee-hero {
    position: relative;
    /* Ubah padding agar pas dengan navbar fixed */
    padding: 160px 0 100px 0;
    /* Gradient yang lebih halus dan dalam */
    background: radial-gradient(circle at 80% 20%, #2a5a46 0%, #153022 100%);
    color: white;
    overflow: hidden;
    min-height: 85vh; /* Sedikit lebih tinggi */
    display: flex;
    align-items: center;
}

/* Pattern Background Halus (Islamic Geometric Vibe) */
.Profilee-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: 
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 0;
    mask-image: radial-gradient(circle, black 40%, transparent 90%); /* Fade out di pinggir */
}

/* Ornamen Cahaya Emas */
.Profilee-hero::after {
    content: '';
    position: absolute;
    top: -100px;
    right: -50px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, rgba(20, 60, 40, 0) 70%);
    border-radius: 50%;
    filter: blur(40px);
    z-index: 0;
    animation: pulse-glow 6s infinite alternate;
}

@keyframes pulse-glow {
    0% { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(1.1); opacity: 0.8; }
}

.Profilee-hero-content {
    position: relative;
    z-index: 2;
    padding-right: 2rem;
}

.Profilee-title-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 24px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 215, 0, 0.5); /* Gold Border */
    backdrop-filter: blur(8px);
    border-radius: 50px;
    color: #FFD700;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 1px;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.Profilee-name {
    font-family: 'Merriweather', serif;
    font-size: clamp(2.5rem, 5vw, 4.2rem);
    font-weight: 700;
    line-height: 1.15;
    margin-bottom: 1.5rem;
    color: #fff;
    /* Text Gradient Emas Lembut */
    background: linear-gradient(to bottom right, #fff 30%, #ffd700 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
}

.Profilee-hero p.lead {
    font-family: 'Source Sans 3', sans-serif;
    font-weight: 300;
    line-height: 1.8;
    color: rgba(255,255,255,0.85) !important;
    font-size: 1.1rem;
}

/* Hero Image Wrapper - Glassmorphism & Elevation */
.hero-image-wrapper {
    position: relative;
    padding: 15px;
    border-radius: 200px 200px 20px 20px; /* Kubah style */
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    box-shadow: 
        0 20px 50px rgba(0,0,0,0.4),
        inset 0 0 20px rgba(255,255,255,0.05);
    transform: translateY(0);
    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.hero-image-wrapper:hover {
    transform: translateY(-15px) rotate(1deg);
}

.placeholder-img-1 {
    width: 100%;
    height: 550px;
    object-fit: cover;
    border-radius: 190px 190px 15px 15px;
    background: linear-gradient(to bottom, #e0e0e0, #f5f5f5);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #888;
    position: relative;
    overflow: hidden;
}

/* --- 2. BIOGRAPHY & MODERN CARDS --- */
.bio-section {
    padding: 100px 0;
    background-color: #fafafa;
}

.modern-card {
    background: #ffffff;
    border-radius: 24px;
    border: 1px solid rgba(0,0,0,0.03);
    box-shadow: 0 10px 40px -10px rgba(32, 108, 78, 0.08); /* Green tinted shadow */
    padding: 45px;
    height: 100%;
    position: relative;
    transition: all 0.4s ease;
    overflow: hidden;
}

.modern-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px -15px rgba(32, 108, 78, 0.15);
}

/* Dekorasi sudut kartu */
.modern-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 6px;
    background: linear-gradient(90deg, var(--primary-green), var(--accent-gold));
}

.bio-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #999;
    margin-bottom: 6px;
    font-weight: 600;
    font-family: 'Source Sans 3', sans-serif;
}

.bio-value {
    font-family: 'Merriweather', serif;
    font-size: 1.35rem;
    color: var(--dark-green);
    border-bottom: 1px solid rgba(0,0,0,0.05);
    padding-bottom: 15px;
    margin-bottom: 25px;
    line-height: 1.4;
    font-weight: 600;
}

/* Image 2 Frame Styling */
.img-frame-accent {
    position: relative;
    margin-bottom: 30px;
}
.img-frame-accent::after {
    border: 2px solid var(--accent-gold);
    border-radius: 24px;
    top: 15px; left: -15px;
    opacity: 0.6;
    transition: all 0.3s ease;
}
.img-frame-accent:hover::after {
    top: 10px; left: -10px;
    opacity: 1;
}
.placeholder-img-2 {
    border-radius: 24px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
}

/* --- 3. TIMELINE (AESTHETIC VERTICAL) --- */
.timeline-modern {
    position: relative;
    padding-left: 50px;
    border-left: 2px dashed rgba(32, 108, 78, 0.15); /* Dashed line lebih modern */
}

.timeline-item {
    position: relative;
    margin-bottom: 50px;
}

.timeline-dot {
    position: absolute;
    left: -59px; /* Adjust posisi */
    top: 5px;
    width: 20px;
    height: 20px;
    background: var(--accent-gold);
    border: 4px solid #fff;
    outline: 1px solid var(--accent-gold);
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
    z-index: 2;
    transition: all 0.3s ease;
}

.timeline-item:hover .timeline-dot {
    transform: scale(1.3);
    background: var(--primary-green);
    outline-color: var(--primary-green);
}

.timeline-date {
    display: inline-block;
    margin-bottom: 8px;
}
.timeline-date .badge {
    background-color: rgba(32, 108, 78, 0.1) !important;
    color: var(--primary-green) !important;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.85rem;
}

.timeline-title {
    font-family: 'Merriweather', serif;
    font-size: 1.5rem;
    color: var(--dark-green);
    font-weight: 700;
    margin-bottom: 10px;
}

.timeline-desc {
    color: #666;
    line-height: 1.7;
    background: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.03);
    border: 1px solid #f0f0f0;
}

/* --- 4. GURU GRID & SANAD (CLEAN) --- */
.guru-grid-item {
    background: #fff;
    padding: 25px;
    border-radius: 16px;
    border: 1px solid #eee;
    border-left: 4px solid var(--primary-green);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    height: 100%;
}

.guru-grid-item:hover {
    background: #fff;
    box-shadow: 0 15px 30px rgba(0,0,0,0.08);
    transform: translateY(-5px);
    border-color: transparent;
}

.guru-name {
    font-family: 'Merriweather', serif;
    font-weight: 700;
    color: var(--dark-green);
    font-size: 1.15rem;
    margin-bottom: 5px;
}

/* Sanad List Item */
.list-unstyled li {
    padding: 12px 15px;
    border-radius: 8px;
    transition: background 0.2s;
}
.list-unstyled li:hover {
    background-color: rgba(32, 108, 78, 0.04);
}

/* --- 5. NASAB SECTION (CHAIN OF GOLD) --- */
.nasab-section {
    background: linear-gradient(180deg, #f9f9f9 0%, #fff 100%);
    padding: 100px 0;
}

/* Custom Scrollbar untuk Nasab */
.nasab-container {
    max-height: 550px;
    overflow-y: auto;
    padding: 20px;
    border-radius: 20px;
    background: #fff;
    box-shadow: inset 0 0 20px rgba(0,0,0,0.03);
    border: 1px solid #eee;
}

.nasab-container::-webkit-scrollbar {
    width: 8px;
}
.nasab-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}
.nasab-container::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
}
.nasab-container::-webkit-scrollbar-thumb:hover {
    background: var(--primary-green);
}

.nasab-item {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 0; /* Reset */
    padding: 18px 20px;
    background: white;
    border: 1px solid #f0f0f0;
    border-radius: 12px;
    transition: transform 0.2s, box-shadow 0.2s;
    margin-bottom: 12px; /* Jarak antar item */
}

/* Garis penghubung nasab (Chain effect) */
.nasab-item:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 37px; /* Sesuaikan dengan tengah lingkaran */
    bottom: -14px;
    width: 2px;
    height: 14px;
    background-color: #ddd;
    z-index: 1;
}

.nasab-item:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    border-color: var(--primary-green);
    z-index: 2;
}

.nasab-number {
    width: 36px;
    height: 36px;
    background: var(--dark-green);
    color: #fff; /* Gold text */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    margin-right: 20px;
    font-size: 0.9rem;
    flex-shrink: 0;
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    border: 2px solid #fff;
    outline: 1px solid var(--dark-green);
}

/* Special styling for Nabi SAW & Abuya */
.nasab-item:first-child, .nasab-item:last-child {
    background: linear-gradient(135deg, var(--primary-green) 0%, var(--dark-green) 100%);
    color: white;
    border: none;
}
.nasab-item:first-child .nasab-number, .nasab-item:last-child .nasab-number {
    background: white;
    color: var(--dark-green);
    outline: none;
}
.nasab-item:first-child small {
    color: rgba(255,255,255,0.8) !important;
}

/* --- 6. KIPRAH CARDS --- */
.section-title-modern {
    font-family: 'Merriweather', serif;
    font-size: 2.8rem;
    color: var(--dark-green);
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;
}

/* Garis bawah judul yang lebih artistik */
.section-title-modern::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: var(--accent-gold);
    margin-top: 15px;
    border-radius: 2px;
}

/* Icon box di dalam kartu kiprah */
.modern-card .display-4 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    background: rgba(var(--primary-green-rgb), 0.1);
    width: 90px;
    height: 90px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: var(--primary-green) !important; /* Override warna default */
}

/* =======================================
   ULTRA-MODERN ACADEMIC PILLARS CSS
   ======================================= */

/* 1. Main Title Styling */
.expertise-main-title {
    font-family: 'Merriweather', serif;
    font-weight: 800;
    font-size: 1.5rem;
    color: var(--dark-green);
    position: relative;
    padding-bottom: 15px;
}

/* Efek garis bawah gradien */
.expertise-main-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(to right, var(--accent-gold), var(--primary-green));
    border-radius: 2px;
}

/* Efek Teks Gradien Emas */
.gradient-text {
    background: linear-gradient(45deg, var(--dark-green), var(--accent-gold));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
}


/* 2. Pillars Container */
.expertise-pillars {
    display: flex;
    flex-direction: column;
    gap: 20px; /* Jarak antar kartu */
}

/* 3. Pillar Card (Unit Keahlian) */
.pillar-card {
    background: #fff;
    border-radius: 16px;
    padding: 25px;
    position: relative;
    overflow: hidden;
    /* Soft, premium shadow */
    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.08);
    border: 1px solid rgba(255, 255, 255, 0.5);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Efek Hover pada Kartu: Mengangkat & Glowing */
.pillar-card:hover {
    transform: translateY(-5px) scale(1.01);
    box-shadow: 0 15px 35px -10px rgba(32, 108, 78, 0.15);
    border-color: rgba(var(--accent-gold-rgb), 0.3);
}


/* 4. Header Area (Icon + Title) */
.pillar-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

/* Icon Box with Gradient & Glow */
.pillar-icon-box {
    width: 55px;
    height: 55px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    margin-right: 18px;
    color: white;
    box-shadow: 0 6px 15px -5px rgba(0,0,0,0.2);
    flex-shrink: 0;
}

/* Varian Warna Gradien Ikon */
.icon-gold { background: linear-gradient(135deg, #d4af37, #f9d976); box-shadow: 0 8px 20px -5px rgba(212, 175, 55, 0.4); }
.icon-green { background: linear-gradient(135deg, var(--primary-green), #4ade80); box-shadow: 0 8px 20px -5px rgba(32, 108, 78, 0.4); }
.icon-purple { background: linear-gradient(135deg, #6f42c1, #a66efa); box-shadow: 0 8px 20px -5px rgba(111, 66, 193, 0.4); }
.icon-blue { background: linear-gradient(135deg, #0d6efd, #60a5fa); box-shadow: 0 8px 20px -5px rgba(13, 110, 253, 0.4); }


.pillar-title {
    font-family: 'Merriweather', serif;
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--dark-green);
    margin: 0;
}


/* 5. Clean List Style */
.pillar-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.pillar-list li {
    display: flex;
    align-items: center;
    font-family: 'Source Sans 3', sans-serif;
    font-size: 0.9rem;
    color: #555;
    padding: 6px 0;
    border-bottom: 1px dashed rgba(0,0,0,0.05);
}

.pillar-list li:last-child {
    border-bottom: none;
}

/* Ikon Checklist kecil di samping teks */
.pillar-list .ico {
    font-size: 0.85rem;
    margin-right: 10px;
    color: var(--accent-gold); /* Warna emas untuk centang */
    opacity: 0.8;
}

/* Khusus untuk pilar terakhir yang itemnya banyak, kita buat 2 kolom */
.two-column-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 15px;
}

/* Responsive Check */
@media (max-width: 400px) {
    .two-column-list {
        grid-template-columns: 1fr; /* Kembali 1 kolom di HP kecil */
    }
    .pillar-header {
        flex-direction: column;
        align-items: flex-start;
    }
    .pillar-icon-box {
        margin-bottom: 10px;
    }
}













/* --- RESPONSIVE TWEAKS --- */
@media (max-width: 768px) {
    .Profilee-hero {
        text-align: center;
        padding-top: 120px;
    }
    
    .Profilee-hero-content {
        padding-right: 0;
    }

    .Profilee-name {
        font-size: 2.2rem;
    }

    .hero-image-wrapper {
        border-radius: 20px; /* Reset kubah di mobile agar gambar jelas */
        max-width: 300px;
        margin: 0 auto;
    }
    .placeholder-img-1 {
        border-radius: 15px;
        height: 400px;
    }

    .timeline-modern {
        padding-left: 30px;
    }
    .timeline-dot {
        left: -39px;
        width: 16px;
        height: 16px;
    }
}
    

/* =======================================================
   RESPONSIVE Profile ABUYA: EXTREME COMPACT (HEMAT TEMPAT)
   Paste di paling bawah style.css
   ======================================================= */

@media (max-width: 767.98px) {

    /* --- 1. KERTAS & LAYOUT --- */
    .paper-card {
        padding: 15px 10px !important; /* Padding kertas sangat tipis */
        margin-bottom: 20px !important;
    }

    .split-layout {
        gap: 15px !important; /* Jarak foto ke teks sangat dekat */
    }

    /* --- 2. FOTO ABUYA (UKURAN PAS FOTO) --- */
    .portrait-frame {
        width: 100px !important; /* Perkecil drastis (Lebar 100px) */
        height: 133px !important; /* Sesuai rasio 3:4 */
        margin: 0 auto 10px auto !important;
        border-radius: 8px !important;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1) !important;
    }

    .placeholder-info {
        display: none !important; /* Sembunyikan teks placeholder agar bersih */
    }

    /* --- 3. JUDUL / NAMA --- */
    .silsilah-title {
        text-align: center !important;
        margin-bottom: 10px !important;
        padding-bottom: 5px !important;
        border-bottom: 1px solid #eee !important;
    }

    .silsilah-title strong {
        font-size: 1rem !important; /* Nama kecil saja (16px) */
        line-height: 1.2 !important;
    }

    .silsilah-title span {
        font-size: 0.75rem !important; /* Jabatan sangat kecil (12px) */
        margin-top: 2px !important;
        display: block !important;
    }

    /* --- 4. INTRO TEKS --- */
    .silsilah-intro {
        font-size: 0.75rem !important; /* Teks pengantar kecil */
        padding: 8px !important;
        margin-bottom: 10px !important;
        line-height: 1.4 !important;
    }

    /* --- 5. DAFTAR GURU (GRID RAPAT) --- */
    .guru-grid {
        /* Ubah jadi 2 Kolom agar daftar ke bawahnya pendek (hemat scroll) */
        grid-template-columns: repeat(2, 1fr) !important; 
        gap: 5px !important; /* Jarak antar kotak sangat rapat */
    }

    .guru-item {
        flex-direction: column !important; /* Nomor di atas, Nama di bawah */
        align-items: center !important;
        text-align: center !important;
        padding: 6px 4px !important; /* Padding super tipis */
        border: 1px solid #eee !important;
        background: #fcfcfc !important;
        border-radius: 6px !important;
    }

    .guru-number {
        width: 18px !important; /* Nomor lingkaran kecil */
        height: 18px !important;
        font-size: 0.65rem !important;
        margin-right: 0 !important; /* Hapus margin kanan */
        margin-bottom: 4px !important; /* Beri jarak ke nama */
    }

    .guru-info {
        width: 100% !important;
    }

    .guru-name {
        font-size: 0.7rem !important; /* Nama guru sangat kecil (11px) */
        line-height: 1.1 !important;
        white-space: nowrap !important; /* Jangan turun baris */
        overflow: hidden !important;
        text-overflow: ellipsis !important; /* Potong ... jika kepanjangan */
        display: block !important;
    }

    .guru-loc {
        display: none !important; /* SEMBUNYIKAN LOKASI (Mekah/Yaman) agar hemat tempat */
    }
    
    /* Jika ingin nama guru turun baris (tidak dipotong), pakai ini: */
    /*
    .guru-name {
        white-space: normal !important;
        font-size: 0.65rem !important;
    }
    */
}

/* Khusus layar HP sangat kecil (iPhone SE / Galaxy Fold) */
@media (max-width: 360px) {
    .guru-grid {
        grid-template-columns: 1fr !important; /* Kembali 1 kolom jika layar terlalu sempit */
    }
    .guru-item {
        flex-direction: row !important; /* Nomor di samping lagi */
        text-align: left !important;
    }
    .guru-number {
        margin-right: 8px !important;
        margin-bottom: 0 !important;
    }
}





/* =======================================
   MOBILE COMPACT MODE (SANGAT KECIL)
   ======================================= */
@media (max-width: 768px) {
    
    /* 1. Rapatkan Jarak Antar Kartu */
    .expertise-pillars {
        gap: 10px !important; 
    }

    /* 2. Kartu Lebih Tipis & Hemat Ruang */
    .pillar-card {
        padding: 12px 15px !important; /* Padding sangat tipis */
        border-radius: 10px !important;
        box-shadow: 0 4px 10px rgba(0,0,0,0.05) !important; /* Shadow lebih tipis */
    }

    /* 3. Perkecil Header & Ikon Utama */
    .pillar-header {
        margin-bottom: 8px !important; /* Jarak judul ke isi diperpendek */
    }

    .pillar-icon-box {
        width: 38px !important;  /* Ikon box jadi kecil */
        height: 38px !important;
        font-size: 1rem !important; /* Ikon di dalam kecil */
        margin-right: 10px !important;
        border-radius: 8px !important;
    }

    .pillar-title {
        font-size: 0.95rem !important; /* Judul pilar mengecil */
    }

    /* 4. TRANSFORMASI LIST: Menjadi 2 Kolom Grid (Sangat Hemat Tinggi) */
    .pillar-list, 
    .two-column-list {
        display: grid !important;
        grid-template-columns: repeat(2, 1fr) !important; /* Paksa jadi 2 kolom sebelahan */
        gap: 4px 10px !important; /* Jarak antar item rapat */
    }

    .pillar-list li {
        font-size: 0.7rem !important; /* Font list sangat kecil (namun terbaca) */
        padding: 2px 0 !important;
        border-bottom: none !important; /* Hilangkan garis agar terlihat bersih */
        line-height: 1.2 !important;
        align-items: flex-start !important;
    }

    /* Ikon Centang Kecil */
    .pillar-list .ico {
        font-size: 0.65rem !important;
        margin-right: 5px !important;
        margin-top: 2px !important; /* Pas kan posisi dengan teks */
    }
}
 </style>

</head>

 
<body id="top">

<?php include __DIR__ . '/partials.header.php'; ?>

<section class="Profilee-hero">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-7 Profilee-hero-content" data-aos="fade-right">
                <span class="Profilee-title-badge"><i class="fas fa-star me-2"></i> Pimpinan Umum (Mudiir 'Aam)</span>
                <h1 class="Profilee-name">
                    Abuya Prof. Dr. (H.C.) <br>
                    K. H. Muhammad Muhyiddin <br>
                    Abdul Qodir Al Manafi, M.A.
                </h1>
                <p class="lead text-white-50 mb-4" style="font-weight: 300; max-width: 600px;">
                    Seorang ulama kharismatik, pendidik, dan pembimbing umat yang mendedikasikan hidupnya untuk menyebarkan ilmu agama Islam, aqidah Ahlussunnah Wal Jama'ah, dan membangun peradaban melalui pendidikan pesantren.
                </p>
                <div class="d-flex gap-3">
                    <a href="#biografi" class="btn btn-outline-light rounded-pill px-4 py-2">Biografi Singkat</a>
                    <a href="#nasab" class="btn btn-warning text-dark rounded-pill px-4 py-2 fw-bold">Lihat Nasab</a>
                </div>
            </div>
            
            <div class="col-lg-5 mt-5 mt-lg-0" data-aos="fade-left">
                <div class="hero-image-wrapper">
                    <img src="Abuya/500x600.png" class="placeholder-img-1" alt="Foto Abuya">
                </div>
            </div>
        </div>
    </div>
</section>

<section id="biografi" class="bio-section">
    <div class="container">
        <div class="row gx-5">
            <div class="col-lg-5 mb-5 mb-lg-0" data-aos="fade-up">
                <div class="img-frame-accent mb-4">
<img src="Abuya/600x800.png" class="placeholder-img-2 w-100" style="object-fit: cover;" alt="Foto Mengajar">
                </div>
                

                <div class="modern-card bg-light border-0">
                    
                    <h4 class="mb-4" style="color: var(--primary-green); font-family: 'Merriweather';"><i class="fas fa-id-card me-2"></i> Data Singkat</h4>
                    
                    <div class="mb-3">
                        <div class="bio-label">Nama Panggilan</div>
                        <div class="bio-value">Abuya</div>
                    </div>
                    <div class="mb-3">
                        <div class="bio-label">Tempat, Tanggal Lahir</div>
                        <div class="bio-value">Bandung, 27 Desember 1969 <br><small class="text-muted">(17 Syawal 1389 H)</small></div>
                    </div>
                    <div class="mb-3">
                        <div class="bio-label">Alamat</div>
                        <div class="bio-value" style="font-size: 1rem; line-height: 1.6;">
                            Dusun Simpang RT 004 RW 001, Desa Haurgombong, Kec. Pamulihan, Kab. Sumedang
                        </div>
                    </div>
                    
                 <div class="expertise-section mt-5">
    <h5 class="expertise-main-title mb-4" data-aos="fade-right">
        <span class="gradient-text">Keahlian Abuya</span>
    </h5>

    <div class="expertise-pillars">
        
        <div class="pillar-card" data-aos="fade-up" data-aos-delay="100">
            <div class="pillar-header">
                <div class="pillar-icon-box icon-gold">
                    <i class="fas fa-scroll"></i>
                </div>
                <h6 class="pillar-title">Linguistik & Logika Arab</h6>
            </div>
            <ul class="pillar-list">
                <li><i class="fas fa-check-circle ico"></i> Nahwu & Shorof (Tata Bahasa)</li>
                <li><i class="fas fa-check-circle ico"></i> Balaghah & Sastra Arab</li>
                <li><i class="fas fa-check-circle ico"></i> Mantiq (Logika) & 'Arud</li>
                <li><i class="fas fa-check-circle ico"></i> Istiqoq (Etimologi)</li>
            </ul>
        </div>

        <div class="pillar-card" data-aos="fade-up" data-aos-delay="200">
            <div class="pillar-header">
                <div class="pillar-icon-box icon-green">
                    <i class="fas fa-kaaba"></i>
                </div>
                <h6 class="pillar-title">Aqidah & Syariah</h6>
            </div>
            <ul class="pillar-list">
                <li><i class="fas fa-check-circle ico"></i> Aqidah Ahlus Sunnah Wal Jama'ah</li>
                <li><i class="fas fa-check-circle ico"></i> <strong>Fiqih 4 Madzhab</strong> (Perbandingan)</li>
                <li><i class="fas fa-check-circle ico"></i> Ushul Fiqih & Qawaid</li>
            </ul>
        </div>

        <div class="pillar-card" data-aos="fade-up" data-aos-delay="300">
            <div class="pillar-header">
                <div class="pillar-icon-box icon-purple">
                    <i class="fas fa-hand-holding-heart"></i>
                </div>
                <h6 class="pillar-title">Tasawuf & Akhlak</h6>
            </div>
            <ul class="pillar-list">
                <li><i class="fas fa-check-circle ico"></i> Tazkiyatun Nafs (Penyucian Jiwa)</li>
                <li><i class="fas fa-check-circle ico"></i> Thoriqoh Mu'tabaroh</li>
                <li><i class="fas fa-check-circle ico"></i> Ilmu Ihsan & Adab</li>
            </ul>
        </div>

         <div class="pillar-card" data-aos="fade-up" data-aos-delay="400">
            <div class="pillar-header">
                <div class="pillar-icon-box icon-blue">
                    <i class="fas fa-book-quran"></i>
                </div>
                <h6 class="pillar-title">Al-Quran, Hadits & Sains</h6>
            </div>
            <ul class="pillar-list two-column-list">
                <li><i class="fas fa-check-circle ico"></i> Tafsir & Ilmu Al-Quran</li>
                <li><i class="fas fa-check-circle ico"></i> Qiro'at Asyrah (10)</li>
                <li><i class="fas fa-check-circle ico"></i> Mustolahul Hadits</li>
                <li><i class="fas fa-check-circle ico"></i> Ilmu Falaq & Hisab</li>
            </ul>
        </div>

    </div>
</div>
                    
                </div>
                
            </div>

            

            
<div class="col-lg-7">
                
                <div class="mb-5" data-aos="fade-up">
                    <div class="d-flex align-items-center mb-4">
                        <div class="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 50px; height: 50px;">
                            <i class="fas fa-graduation-cap fa-lg"></i>
                        </div>
                        <h3 class="section-title-modern mb-0" style="margin-top: 0;">Pendidikan Formal</h3>
                    </div>
                    
                    <div class="timeline-modern ms-2">
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="timeline-date"><span class="badge bg-success">2024</span></div>
                            <h5 class="timeline-title">Gelar Profesor (H.C.) & Doktor (H.C.)</h5>
                            <div class="timeline-desc">
                                <ul class="list-unstyled mb-0 mt-2">
                                    <li class="mb-2">
                                        <i class="fas fa-award text-warning me-2"></i> <strong>Profesor (H.C.)</strong><br>
                                        <span class="text-muted ms-4 small">Universal Institute Of Professional Management (UIPM), Amerika Serikat (USA).</span>
                                    </li>
                                    <li>
                                        <i class="fas fa-award text-warning me-2"></i> <strong>Doktor (H.C.)</strong><br>
                                        <span class="text-muted ms-4 small">Universal Institute Of Professional Management (UIPM), Malaysia.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="timeline-date">2024</div>
                            <h5 class="timeline-title">SMA / Paket C</h5>
                            <p class="timeline-desc">Menyelesaikan pendidikan setara Sekolah Menengah Atas.</p>
                        </div>

                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="timeline-date">2020</div>
                            <h5 class="timeline-title">SMP / Paket B</h5>
                            <p class="timeline-desc">Menyelesaikan pendidikan setara Sekolah Menengah Pertama.</p>
                        </div>

                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="timeline-date">1982</div>
                            <h5 class="timeline-title">SD Jelegong Bandung</h5>
                            <p class="timeline-desc">Tamat pendidikan dasar.</p>
                        </div>
                    </div>
                </div>

                <hr class="my-5" style="border-top: 2px dashed #ccc;">

                <div class="mb-5" data-aos="fade-up">
                    <div class="d-flex align-items-center mb-4">
                        <div class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 50px; height: 50px;">
                            <i class="fas fa-mosque fa-lg"></i>
                        </div>
                        <h3 class="section-title-modern mb-0" style="margin-top: 0;">Pendidikan Non-Formal</h3>
                    </div>
                    
                    <h5 class="fw-bold mb-3 ms-1 text-dark">1. Riwayat Abuya Pesantren</h5>
                    <div class="row g-3 mb-4">
                        
                        <div class="col-12">
                            <div class="guru-grid-item h-100 border-start border-4 border-success bg-white shadow-sm">
                                <h5 class="guru-name text-success">PP. Sindang Wangi Al-Mahmuudiyyah</h5>
                                <div class="small text-muted mb-2"><i class="fas fa-map-marker-alt me-1"></i> Dusun Badaraksa, Desa Jelegong, Kab. Bandung</div>
                                <p class="small mb-0 text-dark">
                                    <strong>Guru:</strong> Ayahanda Mama K.H. Ahmad Toha Mustawi bin Mama K.H. Hasan Mustawi.<br>
                                    <span class="text-muted fst-italic mt-1 d-block">(Murid Mama K.H. Rd. Muhammad Kurdi Cibabat & Mama K.H. Rd. Muhammad Zarkasyi Cibaduyut).</span>
                                </p>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="guru-grid-item h-100 bg-light">
                                <span class="badge bg-secondary mb-2">Tahun 1984</span>
                                <h6 class="guru-name">PP. Darul Hadits Alfaqihiyyah</h6>
                                <div class="small text-muted mb-2">Malang, Jawa Timur</div>
                                <hr class="my-2">
                                <div class="small">
                                    <strong>Guru:</strong><br>
                                    Prof. Dr. Al-Habib Abdullah Bin Abdul Qodir Bilfaqih RA.
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="guru-grid-item h-100 bg-light">
                                <span class="badge bg-secondary mb-2">Tahun 1986</span>
                                <h6 class="guru-name">PP. Miftahul Huda</h6>
                                <div class="small text-muted mb-2">Manonjaya, Tasikmalaya</div>
                                <hr class="my-2">
                                <div class="small">
                                    <strong>Guru:</strong> K.H. Khoer Affandi (Uwa Ajengan).<br>
                                    <span class="text-muted">(Fiqh Madzhab Syafi'i)</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="guru-grid-item h-100 bg-light">
                                <span class="badge bg-secondary mb-2">Tahun 1989</span>
                                <h6 class="guru-name">PP. Cisaat Sukabumi</h6>
                                <div class="small text-muted"><strong>Guru:</strong> Mama K.H. Aang Syadzili (Spesialisasi Ilmu Balaghah).</div>
                            </div>
                        </div>
                    </div>

                    <h5 class="fw-bold mb-3 ms-1 text-dark mt-5">2. Penyambungan Sanad Keilmuan</h5>
                    <div class="modern-card p-4 border-0" style="background-color: #f8fcf9;">
                        <p class="small text-muted mb-3">
                            <i class="fas fa-info-circle me-1"></i> Beliau bertabaruk mengambil ijazah dan sanad dari Ulama Besar Dunia:
                        </p>
                        <ul class="list-unstyled row gy-3 gx-2 mb-0">
                            <li class="col-12 border-bottom pb-2">
                                <i class="fas fa-check text-success me-2"></i> <strong>As-Sayyid Muhammad bin 'Alawi Al-Maliki</strong> <span class="text-muted small ms-1">(Makkah, 1989)</span>
                            </li>
                            <li class="col-12 border-bottom pb-2">
                                <i class="fas fa-check text-success me-2"></i> <strong>Al-Habib Zein bin Ibrohim bin Sumaith</strong> <span class="text-muted small ms-1">(Madinah)</span>
                            </li>
                            <li class="col-12 border-bottom pb-2">
                                <i class="fas fa-check text-success me-2"></i> <strong>Al-Habib Salim As-Syatiiri</strong> <span class="text-muted small ms-1">(Tarim, Yaman - Sulthonul Ilmi)</span>
                            </li>
                            <li class="col-12 border-bottom pb-2">
                                <i class="fas fa-check text-success me-2"></i> <strong>Al-Habib Umar bin Hafidz</strong> <span class="text-muted small ms-1">(Tarim, Yaman)</span>
                            </li>
                            
                            <li class="col-md-6"><i class="fas fa-circle text-warning me-2" style="font-size: 8px;"></i> Al-Habib Sa’ad Al-Idrus (Yaman)</li>
                            <li class="col-md-6"><i class="fas fa-circle text-warning me-2" style="font-size: 8px;"></i> Al-Habib Ali Baafaqih (Bali)</li>
                            <li class="col-md-6"><i class="fas fa-circle text-warning me-2" style="font-size: 8px;"></i> Syekh Abdurrahman Al-Kattani (Maroko)</li>
                            <li class="col-md-6"><i class="fas fa-circle text-warning me-2" style="font-size: 8px;"></i> Syekh Ismail Al-Yamani (Makkah)</li>
                            <li class="col-md-6"><i class="fas fa-circle text-warning me-2" style="font-size: 8px;"></i> Syekh Ahmad Al-Hurori (Makkah)</li>
                            <li class="col-md-6"><i class="fas fa-circle text-warning me-2" style="font-size: 8px;"></i> Al-Habib Miskin Al-Misri</li>
                            <li class="col-md-6"><i class="fas fa-circle text-warning me-2" style="font-size: 8px;"></i> Mbah Tubagus Mansur RA (Plered)</li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    </div>
</section>

<section class="py-5 bg-white">
    <div class="container">
        <div class="row" data-aos="fade-up">
            <div class="col-12 text-center mb-5">
                <h3 class="section-title-modern">Kiprah & Penghargaan</h3>
            </div>
        </div>
        
        <div class="row g-4">
            <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
                <div class="modern-card text-center h-100">
                    <div class="display-4 text-warning mb-3"><i class="fas fa-briefcase"></i></div>
                    <h5 class="fw-bold mb-3">Riwayat Pekerjaan</h5>
                    <ul class="list-unstyled text-start small">
                        <li class="mb-2 border-bottom pb-2"><strong>Mudiir 'Aam</strong> PP. Islam Internasional Terpadu Asy-Syifaa Wal Mahmuudiyyah.</li>
                        <li class="mb-2 border-bottom pb-2"><strong>Direktur</strong> PT. Syifa Madinah Arafah.</li>
                        <li class="mb-2"><strong>Pembimbing Haji & Umroh</strong> (Sejak 2000 - Sekarang) membimbing ribuan jamaah.</li>
                    </ul>
                </div>
            </div>

            <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
                <div class="modern-card text-center h-100">
                    <div class="display-4 text-primary mb-3"><i class="fas fa-users"></i></div>
                    <h5 class="fw-bold mb-3">Organisasi</h5>
                    <ul class="list-unstyled text-start small">
                        <li class="mb-2 border-bottom pb-2"><strong>Pendiri & Dewan Syuro</strong> Majlis Muwasholeh Baena il Muslimin Indonesia.</li>
                        <li class="mb-2 border-bottom pb-2"><strong>Pembina Utama</strong> Majlis Talim Bersatu (MTB).</li>
                        <li class="mb-2"><strong>Penasihat DKM</strong> Masjid Agung Bandung & Masjid Al Kamil Jatigede.</li>
                    </ul>
                </div>
            </div>

            <div class="col-md-4" data-aos="fade-up" data-aos-delay="300">
                <div class="modern-card text-center h-100">
                    <div class="display-4 text-danger mb-3"><i class="fas fa-medal"></i></div>
                    <h5 class="fw-bold mb-3">Penghargaan</h5>
                    <p class="small text-muted mb-2">1 Juli 2009 / 8 Rajab 1430 H</p>
                    <h6 class="fw-bold text-dark">Honorary Police</h6>
                    <p class="small text-start mt-2">Diberikan oleh Kapolwil Priangan Kombes Pol. Drs. Anton Charliyan, M.Pkn. pada HUT Bhayangkara ke-63.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="nasab" class="nasab-section">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-5 order-lg-2 mb-4 mb-lg-0" data-aos="fade-left">
<img src="Abuya/500x700.png" class="img-fluid rounded-4 shadow-sm w-100" alt="Foto Nasab/Keluarga">
            </div>



            <div class="col-lg-7 order-lg-1" data-aos="fade-right">
                <h3 class="section-title-modern">Sanad Nasab Mulia</h3>
                <p class="mb-4 text-muted">Jalur keturunan beliau bersambung hingga kepada Baginda Nabi Besar Muhammad SAW melalui jalur Kesultanan Cirebon dan Pajajaran.</p>
                
                <div class="modern-card p-0 overflow-hidden">
                    <div class="bg-dark text-white p-3 d-flex align-items-center justify-content-between">
                        <span class="fw-bold"><i class="fas fa-scroll me-2"></i> Silsilah Keturunan</span>
                        <span class="badge bg-warning text-dark">Lengkap 1-41</span>
                    </div>
                    
                    <div class="nasab-container p-4" style="max-height: 600px; overflow-y: auto;">
                        
                        <div class="nasab-item bg-success text-white">
                            <div class="nasab-number bg-white text-success">1</div>
                            <div>
                                <strong>Siti Sayyidah Fatimah Binti Muhammad SAW</strong><br>
                                <small style="opacity: 0.9;">Menikah dengan Sayyidina Ali bin Abi Tholib RA</small>
                            </div>
                        </div>

                        <div class="nasab-item"><div class="nasab-number">2</div><div>Sayyidina Husain Assabti RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">3</div><div>Sayyidina Zaenal Abidin RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">4</div><div>Sayyidina Muhammad Al Baqir RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">5</div><div>Sayyidina Jafar Shodiq RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">6</div><div>Sayyidina Kasim Al Kamil (Ali Al Uraidi) RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">7</div><div>Sayyidina Muhammad Naqib (Idris) RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">8</div><div>Sayyidina Isa Al Basri RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">9</div><div>Sayyidina Ahmad Al Muhajir RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">10</div><div>Sayyidina Ubaidillah RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">11</div><div>Sayyidina Alwi RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">12</div><div>Sayyidina Muhammad RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">13</div><div>Sayyidina Alwi RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">14</div><div>Sayyidina Ali Kholiqosam RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">15</div><div>Sayyidina Muhammad Shohibul Mirbath RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">16</div><div>Sayyidina Alwi Amir Faqih RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">17</div><div>Sayyidina Abdul Malik RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">18</div><div>Sayyidina Abullah Khan Nurdin (Amir) RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">19</div><div>Sayyidina Amir Ahmad Syech Jalaludin RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">20</div><div>Sayyidina Jamaluddin Al Husein RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">21</div><div>Sayyidina Ali Nurul Alam RA</div></div>
                        
                        <div class="nasab-item" style="background-color: #f8f9fa;">
                            <div class="nasab-number">22</div>
                            <div>
                                <strong>Sayyidina Syarif Abdullah RA (Sultan Mesir)</strong><br>
                                <small class="text-muted">Menikah dengan Siti Syarifah Mudaim (Rara Santang) Putri Raja Pajajaran Prabu Siliwangi</small>
                            </div>
                        </div>

                        <div class="nasab-item bg-light border-start border-4 border-success">
                            <div class="nasab-number bg-success text-white">23</div>
                            <div class="fw-bold text-success">Sayyidina Syarif Hidayatullah RA (Sunan Gunung Jati / Cirebon)</div>
                        </div>

                        <div class="nasab-item"><div class="nasab-number">24</div><div>Sayyidina Abdurrahman Al Qodri RA (Mataram)</div></div>
                        <div class="nasab-item"><div class="nasab-number">25</div><div>Pangeran Atas Angin RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">26</div><div>Pangeran Dipati Ukur I RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">27</div><div>Pangeran Dipati Ukur II RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">28</div><div>Pangeran Dipati Ukur III RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">29</div><div>Dalem Nayasari Timanganten RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">30</div><div>Dalem Nayadirga Cisebel / Sukamiskin RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">31</div><div>Dalem H. Abdul Manaf Mahmuud RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">32</div><div>M’bah Suta Jaya RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">33</div><div>M’bah Saba RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">34</div><div>M’bah Inu RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">35</div><div>M’bah Ranci RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">36</div><div>M’bah Jamiyah RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">37</div><div>M’bah Ampiyah RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">38</div><div>M’bah Ibu Mursifah RA</div></div>
                        <div class="nasab-item"><div class="nasab-number">39</div><div>K.H. M. Hasan Mustawi RA (Mama Bojong)</div></div>
                        <div class="nasab-item"><div class="nasab-number">40</div><div>K.H. Ahmad Thoha Mustawi RA (Ayahanda)</div></div>
                        
                        <div class="nasab-item border border-warning shadow-sm" style="background-color: #fffbf2;">
                            <div class="nasab-number bg-warning text-dark border border-2 border-white">41</div>
                            <div class="fw-bold text-dark">
                                Abuya Prof. Dr. (H.C.) K. H. Muhammad Muhyiddin Abdul Qodir Al-Manafi, MA.
                            </div>
                        </div>

                    </div>
                    <div class="bg-light p-2 text-center text-muted small">
                        <i class="fas fa-arrow-up"></i> Gunakan scroll untuk melihat urutan lengkap
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>





























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


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script src="/assets/js/main.js"></script>

</body>
</html>












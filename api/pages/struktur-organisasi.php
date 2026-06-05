<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Kurikulum Pesantren: Tamhidi, Wustho & Ulya - Asy-Syifaa Wal Mahmuudiyyah</title>

<meta name="description" content="Pelajari struktur kurikulum lengkap Ponpes Asy-Syifaa Wal Mahmuudiyyah. Program pendidikan berbasis kitab kuning mulai dari Tamhidi, Wustho, Ulya, hingga Pengabdian." />
<meta name="description" content="Lihat Struktur Organisasi terbaru Asy-Syifaa Wal Mahmuudiyyah Pusat T.A 2025/2026. Lengkap dari Mudir 'Aam (Abuya), Rais 'Aam, Qism, hingga Wali Kelas." />

<meta name="keywords" content="Struktur Organisasi, Asy-Syifaa Wal Mahmuudiyyah, Abuya Muhyiddin, Pesantren Sumedang, Pengurus Pondok 2026" />

  <!-- Bootstrap & Icons -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />

  <!-- Custom CSS -->
  <link rel="stylesheet" href="/css/style.css?v=20260517" />
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source Sans 3:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/footer.css?v=20260517">
<link rel="icon" href="/assets/media/images/logo.png" type="image/png" sizes="32x32">

  
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
 <link rel="stylesheet" href="/assets/css/main.css?v=20260519">
 <style>



/* === 2. HIERARCHY TREE LAYOUT (DESKTOP) === */
    .tree-container {
        padding-top: 50px;
        padding-bottom: 80px;
        position: relative;
    }

    /* Garis Vertikal Utama */
    .tree-connector-vertical {
        width: var(--line-width);
        background-color: var(--line-color);
        margin: 0 auto;
        height: 60px; /* Jarak vertikal antar level */
        position: relative;
        z-index: 0;
    }

    /* Garis Horizontal Cabang (Branch) */
    .tree-branch {
        border-top: var(--line-width) solid var(--line-color);
        width: 80%; /* Lebar penyebaran cabang */
        margin: 0 auto 40px auto;
        position: relative;
    }
    /* Kaki-kaki kecil turun dari garis horizontal */
    .tree-branch::before, .tree-branch::after {
        content: '';
        position: absolute;
        top: 0;
        width: var(--line-width);
        height: 30px;
        background-color: var(--line-color);
    }
    .tree-branch::before { left: 0; }
    .tree-branch::after { right: 0; }
    
    /* Garis tengah tambahan untuk cabang */
    .tree-branch-center {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        width: var(--line-width);
        height: 30px;
        background-color: var(--line-color);
    }

    /* === 3. MODERN CARD DESIGN === */
    .org-card {
        background: var(--card-bg);
        border-radius: 20px;
        padding: 30px 20px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.05); /* Soft Shadow */
        position: relative;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border: 1px solid rgba(0,0,0,0.03);
        z-index: 2;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    /* Efek Hover Mewah */
    .org-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(32, 108, 78, 0.15); /* Bayangan Hijau Halus */
        border-bottom: 4px solid var(--accent-gold);
    }

    /* Foto Profile */
    .org-img-wrapper {
        width: 100px;
        height: 100px;
        margin-bottom: 15px;
        position: relative;
        z-index: 2;
    }
    
    .org-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid white;
        box-shadow: 0 0 0 3px var(--accent-gold); /* Ring Emas */
        transition: transform 0.5s ease, box-shadow 0.3s ease;
    }

    .org-card:hover .org-img {
        transform: scale(1.1);
        box-shadow: 0 0 0 3px var(--primary-green); /* Berubah Hijau saat hover */
    }

    /* Typography */
    .org-role {
        display: inline-block;
        background: rgba(32, 108, 78, 0.08);
        color: var(--primary-green);
        padding: 5px 15px;
        border-radius: 50px;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        margin-bottom: 10px;
    }

    .org-name {
        font-family: 'Merriweather', serif;
        font-weight: 700;
        font-size: 1.15rem;
        color: var(--dark-green);
        line-height: 1.3;
        margin-bottom: 5px;
    }

    /* Detail Anggota/Wakil */
    .org-details {
        margin-top: auto; /* Push ke bawah */
        padding-top: 15px;
        width: 100%;
        border-top: 1px dashed #eee;
        font-size: 0.85rem;
        color: #666;
    }
    
    .org-details strong {
        color: var(--primary-green);
        font-weight: 600;
    }

    /* === 4. SPECIAL CARDS (LEADERS) === */
    .leader-card-wrapper {
        max-width: 450px;
        margin: 0 auto;
        position: relative;
    }
    
    /* Kartu Abuya & Rais lebih besar */
    .leader-card {
        padding: 40px 30px;
        border: 2px solid rgba(255, 215, 0, 0.2); /* Border Emas Tipis */
        background: linear-gradient(to bottom right, #fff, #fcfcfc);
    }
    
    .leader-card .org-img-wrapper {
        width: 140px;
        height: 140px;
        box-shadow: 0 0 25px rgba(255, 215, 0, 0.3); /* Glow Effect */
        border-radius: 50%;
    }
    
    .leader-card .org-name {
        font-size: 1.5rem;
        margin-top: 10px;
    }

    /* === 5. SECTION DIVIDER (Title Level) === */
    .level-title {
        text-align: center;
        margin: 50px 0 30px;
        position: relative;
        z-index: 10;
    }
    
    .level-badge {
        background: var(--primary-green);
        color: white;
        padding: 10px 40px;
        border-radius: 50px;
        font-family: 'Merriweather', serif;
        font-size: 1.5rem;
        font-style: italic;
        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        border: 2px solid var(--accent-gold);
        display: inline-block;
    }

    /* === 6. RESPONSIVE ADJUSTMENTS (MOBILE) === */
    @media (max-width: 991px) {
        /* Hilangkan garis pohon di Tablet & HP */
        .tree-connector-vertical, 
        .tree-branch,
        .tree-branch-center,
        .tree-branch::before, 
        .tree-branch::after {
            display: none; 
        }

        .tree-container {
            padding-top: 20px;
        }

        /* Perkecil kartu pimpinan */
        .leader-card-wrapper {
            max-width: 100%;
            margin-bottom: 20px;
        }
        
        .leader-card .org-img-wrapper {
            width: 110px;
            height: 110px;
        }
        
        .leader-card .org-name {
            font-size: 1.25rem;
        }
    }

    @media (max-width: 767.98px) {
        /* Grid untuk HP: 2 Kolom untuk Anggota, 1 Kolom untuk Pimpinan */
        .org-grid-mobile {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
        
        /* Kartu Qism (Bagian) dibuat penuh jika kontennya banyak, atau grid 2 jika muat */
        .qism-grid {
            display: grid;
            grid-template-columns: 1fr; /* 1 Kolom untuk Qism biar detailnya terbaca */
            gap: 15px;
        }

        .org-card {
            padding: 20px 15px;
            border-radius: 15px;
        }

        .org-img-wrapper {
            width: 70px;
            height: 70px;
            margin-bottom: 10px;
        }

        .org-role {
            font-size: 0.65rem;
            padding: 4px 10px;
        }

        .org-name {
            font-size: 0.95rem;
        }

        .org-details {
            font-size: 0.75rem;
        }
        
        .level-badge {
            font-size: 1.1rem;
            padding: 8px 25px;
            margin: 30px 0 15px;
        }
    }

 </style>
<script src="/assets/js/main.js"></script>
 
</head>

 
<body id="top">

<?php include __DIR__ . '/partials.header.php'; ?>


<div class="hero-section" style="height: 60vh; min-height: 400px; display: flex; align-items: center; justify-content: center;">
    <div class="hero-bg" style="background-image: url('../assets/img/hero-background.jpg'); filter: brightness(0.4);"></div>
    <div class="hero-content container text-center" data-aos="fade-up" data-aos-duration="1000">
        <span class="hero-intro text-white mb-2 ls-2 d-block" style="font-weight: 300; letter-spacing: 4px;">KEPENGURUSAN PONDOK</span>
        <h1 class="hero-brand text-white mb-3" style="font-size: clamp(2rem, 5vw, 4rem); text-shadow: 0 5px 15px rgba(0,0,0,0.5);">Struktur Organisasi</h1>
        <div style="width: 100px; height: 4px; background: var(--accent-gold); margin: 0 auto 20px; border-radius: 2px;"></div>
        <p class="text-white-50 fs-5">Tahun Ajaran 2025/2026</p>
    </div>
</div>

<section class="container tree-container">

    <div class="row justify-content-center" data-aos="fade-down">
        <div class="col-12 text-center">
            <div class="leader-card-wrapper">
                <div class="org-card leader-card">
                    <div class="org-img-wrapper">
                        <img loading="lazy" decoding="async" src="/assets/media/images/foto-mudir.jpg" 
                             onerror="this.src='https://ui-avatars.com/api/?name=Muhyiddin+Al+Manafi&background=206c4e&color=fff&size=200'" 
                             alt="Mudir 'Aam" class="org-img">
                    </div>
                    <span class="org-role">MUDIR 'AAM</span>
                    <h3 class="org-name">Prof. Dr. (H.C.) Abuya <br>K.H. Muhammad Muhyiddin <br>Abdul Qodir Al-Manafi, MA.</h3>
                </div>
            </div>
        </div>
    </div>

    <div class="tree-connector-vertical"></div>

    <div class="row justify-content-center" data-aos="fade-up">
        <div class="col-12 text-center">
            <div class="leader-card-wrapper">
                <div class="org-card leader-card">
                    <div class="org-img-wrapper">
                        <img loading="lazy" decoding="async" src="/assets/media/images/foto-rais.jpg" 
                             onerror="this.src='https://ui-avatars.com/api/?name=Sabit+Al+Manafi&background=1a3e2c&color=fff&size=200'" 
                             alt="Rais 'Aam" class="org-img">
                    </div>
                    <span class="org-role">RAIS 'AAM</span>
                    <h4 class="org-name">Muallim <br>Muhammad Sabit Al-Manafi</h4>
                </div>
            </div>
        </div>
    </div>

    <div class="tree-connector-vertical"></div>
    <div class="tree-branch">
        <div class="tree-branch-center"></div>
    </div>

    <div class="level-title" data-aos="fade-up">
        <div class="level-badge">Qism & Bagian</div>
    </div>

    <div class="row g-4 justify-content-center pb-5">
        
        <div class="col-lg-3 col-md-6 col-sm-12" data-aos="fade-up" data-aos-delay="100">
            <div class="org-card">
                <div class="org-img-wrapper">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Umar+Al+Kaff&background=random&color=fff'" class="org-img">
                </div>
                <span class="org-role">KEAMANAN</span>
                <h5 class="org-name">Habib Umar Al-Kaff</h5>
                <div class="org-details">
                    <div><strong>Wakil:</strong> Muallim Nuruddin</div>
                    <div><strong>Anggota:</strong> Muallim Ahmad Wahya</div>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-12" data-aos="fade-up" data-aos-delay="150">
            <div class="org-card">
                <div class="org-img-wrapper">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Qomar&background=random&color=fff'" class="org-img">
                </div>
                <span class="org-role">'UBUDIYYAH</span>
                <h5 class="org-name">Muallim Qomar</h5>
                <div class="org-details">
                    <div><strong>Wakil:</strong> Muallim Muwafaq</div>
                    <div><strong>Anggota:</strong> Muallim David</div>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-12" data-aos="fade-up" data-aos-delay="200">
            <div class="org-card">
                <div class="org-img-wrapper">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Adnan&background=random&color=fff'" class="org-img">
                </div>
                <span class="org-role">KESEHATAN</span>
                <h5 class="org-name">Muallim Adnan</h5>
                <div class="org-details">
                    <div><strong>Wakil:</strong> Muallim Dimas</div>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-12" data-aos="fade-up" data-aos-delay="250">
            <div class="org-card">
                <div class="org-img-wrapper">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Yasin&background=random&color=fff'" class="org-img">
                </div>
                <span class="org-role">KEBERSIHAN</span>
                <h5 class="org-name">Muallim Yasin</h5>
                <div class="org-details">
                    <div><strong>Wakil:</strong> Muallim Nafi</div>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-12" data-aos="fade-up">
            <div class="org-card">
                <div class="org-img-wrapper">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Najib+Zibril&background=random&color=fff'" class="org-img">
                </div>
                <span class="org-role">PENASEHAT</span>
                <h5 class="org-name">Muallim Najib Zibril</h5>
                <div class="org-details">
                    <div><strong>Wakil:</strong> Muallim Deden T.</div>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-12" data-aos="fade-up">
            <div class="org-card">
                <div class="org-img-wrapper">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Hambali&background=random&color=fff'" class="org-img">
                </div>
                <span class="org-role">KEDISIPLINAN</span>
                <h5 class="org-name">Muallim Hambali</h5>
                <div class="org-details">
                    <div><strong>Wakil:</strong> Muallim Jamaluddin</div>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-12" data-aos="fade-up">
            <div class="org-card">
                <div class="org-img-wrapper">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Salman&background=random&color=fff'" class="org-img">
                </div>
                <span class="org-role">AROBIYYAH</span>
                <h5 class="org-name">Muallim Salman</h5>
                <div class="org-details">
                    <div><strong>Wakil:</strong> Muallim Mahmud</div>
                    <div style="font-size: 0.75rem;">(Tim: Hambali, Nafi, Wail)</div>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-12" data-aos="fade-up">
            <div class="org-card">
                <div class="org-img-wrapper">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Jalaluddin&background=random&color=fff'" class="org-img">
                </div>
                <span class="org-role">TO'AM (LOGISTIK)</span>
                <h5 class="org-name">Muallim Jalaluddin</h5>
                <div class="org-details">
                    <div><strong>Wakil:</strong> Muallim Fahruddin</div>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-12" data-aos="fade-up">
            <div class="org-card">
                <div class="org-img-wrapper">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Nuruddin+Cahya&background=random&color=fff'" class="org-img">
                </div>
                <span class="org-role">LAUNDRY & EKSKUL</span>
                <h5 class="org-name">Muallim Nuruddin (Cahya)</h5>
                <div class="org-details">
                    <div><strong>Wakil:</strong> Muallim Nuruddin (Abot)</div>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-12" data-aos="fade-up">
            <div class="org-card">
                <div class="org-img-wrapper">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Maulana&background=random&color=fff'" class="org-img">
                </div>
                <span class="org-role">DATABASE & IT</span>
                <h5 class="org-name">Muallim Maulana</h5>
                <div class="org-details">
                    <div><strong>Tim:</strong> Ahmad, Rozaq, Deva, Solahudien</div>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-12" data-aos="fade-up">
            <div class="org-card">
                <div class="org-img-wrapper">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Ade+Jafar&background=random&color=fff'" class="org-img">
                </div>
                <span class="org-role">KEPALA KANTOR</span>
                <h5 class="org-name">Ustadz Ade Ja`far Sodiq</h5>
                <div class="org-details">
                    <div><strong>Tim:</strong> Hibat, Toni, Rozaq</div>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6 col-sm-12" data-aos="fade-up">
            <div class="org-card">
                <div class="org-img-wrapper">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Abdul+Muhyi&background=random&color=fff'" class="org-img">
                </div>
                <span class="org-role">RIYADHOH</span>
                <h5 class="org-name">Muallim Abdul Muhyi</h5>
                <div class="org-details">
                    <div><strong>Wakil:</strong> M. Farhan Suhanda</div>
                </div>
            </div>
        </div>

    </div>

    <div class="level-title" data-aos="fade-up">
        <div class="level-badge">Wali Kelas</div>
    </div>

    <div class="org-grid-mobile row g-3 justify-content-center">
        
        <div class="col-lg-2 col-md-4 col-sm-6" data-aos="fade-up">
            <div class="org-card p-3">
                <span class="badge bg-secondary mb-2">KELAS 6A</span>
                <div class="org-img-wrapper" style="width: 60px; height: 60px;">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Didin&background=random&color=fff'" class="org-img">
                </div>
                <h6 class="org-name fs-6">Muallim Didin</h6>
            </div>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-6" data-aos="fade-up">
            <div class="org-card p-3">
                <span class="badge bg-secondary mb-2">KELAS 6B</span>
                <div class="org-img-wrapper" style="width: 60px; height: 60px;">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Ahmad&background=random&color=fff'" class="org-img">
                </div>
                <h6 class="org-name fs-6">Muallim Ahmad</h6>
            </div>
        </div>

        <div class="col-lg-2 col-md-4 col-sm-6" data-aos="fade-up">
            <div class="org-card p-3">
                <span class="badge bg-secondary mb-2">KELAS 5A</span>
                <div class="org-img-wrapper" style="width: 60px; height: 60px;">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Najib+Zibril&background=random&color=fff'" class="org-img">
                </div>
                <h6 class="org-name fs-6">M. Najib Zibril</h6>
            </div>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-6" data-aos="fade-up">
            <div class="org-card p-3">
                <span class="badge bg-secondary mb-2">KELAS 5B</span>
                <div class="org-img-wrapper" style="width: 60px; height: 60px;">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Qomar&background=random&color=fff'" class="org-img">
                </div>
                <h6 class="org-name fs-6">Muallim Qomar</h6>
            </div>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-6" data-aos="fade-up">
            <div class="org-card p-3">
                <span class="badge bg-secondary mb-2">KELAS 5C</span>
                <div class="org-img-wrapper" style="width: 60px; height: 60px;">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Muhammad&background=random&color=fff'" class="org-img">
                </div>
                <h6 class="org-name fs-6">Muallim Muhammad</h6>
            </div>
        </div>

        <div class="col-lg-2 col-md-4 col-sm-6" data-aos="fade-up">
            <div class="org-card p-3">
                <span class="badge bg-secondary mb-2">KELAS 4A</span>
                <div class="org-img-wrapper" style="width: 60px; height: 60px;">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Yasiin&background=random&color=fff'" class="org-img">
                </div>
                <h6 class="org-name fs-6">Muallim Yasiin</h6>
            </div>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-6" data-aos="fade-up">
            <div class="org-card p-3">
                <span class="badge bg-secondary mb-2">KELAS 4B</span>
                <div class="org-img-wrapper" style="width: 60px; height: 60px;">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Wail&background=random&color=fff'" class="org-img">
                </div>
                <h6 class="org-name fs-6">Muallim Wail A.J</h6>
            </div>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-6" data-aos="fade-up">
            <div class="org-card p-3">
                <span class="badge bg-secondary mb-2">KELAS 4C</span>
                <div class="org-img-wrapper" style="width: 60px; height: 60px;">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Hambali&background=random&color=fff'" class="org-img">
                </div>
                <h6 class="org-name fs-6">Muallim Hambali</h6>
            </div>
        </div>

        <div class="col-lg-2 col-md-4 col-sm-6" data-aos="fade-up">
            <div class="org-card p-3">
                <span class="badge bg-secondary mb-2">KELAS 3A</span>
                <div class="org-img-wrapper" style="width: 60px; height: 60px;">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Nuruddin&background=random&color=fff'" class="org-img">
                </div>
                <h6 class="org-name fs-6">Muallim Nuruddin</h6>
            </div>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-6" data-aos="fade-up">
            <div class="org-card p-3">
                <span class="badge bg-secondary mb-2">KELAS 3B</span>
                <div class="org-img-wrapper" style="width: 60px; height: 60px;">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Jamaluddin&background=random&color=fff'" class="org-img">
                </div>
                <h6 class="org-name fs-6">M. Jamaluddin</h6>
            </div>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-6" data-aos="fade-up">
            <div class="org-card p-3">
                <span class="badge bg-secondary mb-2">KELAS 3C</span>
                <div class="org-img-wrapper" style="width: 60px; height: 60px;">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Muwafaq&background=random&color=fff'" class="org-img">
                </div>
                <h6 class="org-name fs-6">Muallim Muwafaq</h6>
            </div>
        </div>

        <div class="col-lg-2 col-md-4 col-sm-6" data-aos="fade-up">
            <div class="org-card p-3">
                <span class="badge bg-secondary mb-2">KELAS 2A</span>
                <div class="org-img-wrapper" style="width: 60px; height: 60px;">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Solahudien&background=random&color=fff'" class="org-img">
                </div>
                <h6 class="org-name fs-6">M. Solahudieun</h6>
            </div>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-6" data-aos="fade-up">
            <div class="org-card p-3">
                <span class="badge bg-secondary mb-2">KELAS 2B</span>
                <div class="org-img-wrapper" style="width: 60px; height: 60px;">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Abdul+Muhyi&background=random&color=fff'" class="org-img">
                </div>
                <h6 class="org-name fs-6">M. Abdul Muhyi</h6>
            </div>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-6" data-aos="fade-up">
            <div class="org-card p-3">
                <span class="badge bg-secondary mb-2">KELAS 2C</span>
                <div class="org-img-wrapper" style="width: 60px; height: 60px;">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Deden&background=random&color=fff'" class="org-img">
                </div>
                <h6 class="org-name fs-6">M. Deden T.</h6>
            </div>
        </div>

        <div class="col-lg-2 col-md-4 col-sm-6" data-aos="fade-up">
            <div class="org-card p-3">
                <span class="badge bg-secondary mb-2">KELAS 1A</span>
                <div class="org-img-wrapper" style="width: 60px; height: 60px;">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Jalaluddin&background=random&color=fff'" class="org-img">
                </div>
                <h6 class="org-name fs-6">Muallim Jalaluddin</h6>
            </div>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-6" data-aos="fade-up">
            <div class="org-card p-3">
                <span class="badge bg-secondary mb-2">KELAS 1B</span>
                <div class="org-img-wrapper" style="width: 60px; height: 60px;">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Adnan&background=random&color=fff'" class="org-img">
                </div>
                <h6 class="org-name fs-6">Muallim Adnan</h6>
            </div>
        </div>

        <div class="col-lg-2 col-md-4 col-sm-6" data-aos="fade-up">
            <div class="org-card p-3">
                <span class="badge bg-secondary mb-2">TAMHIDI A</span>
                <div class="org-img-wrapper" style="width: 60px; height: 60px;">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Azali&background=random&color=fff'" class="org-img">
                </div>
                <h6 class="org-name fs-6">Muallim Azali D.</h6>
            </div>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-6" data-aos="fade-up">
            <div class="org-card p-3">
                <span class="badge bg-secondary mb-2">TAMHIDI B</span>
                <div class="org-img-wrapper" style="width: 60px; height: 60px;">
                    <img loading="lazy" decoding="async" src="/assets/media/images/logo.png" onerror="this.src='https://ui-avatars.com/api/?name=Farhan&background=random&color=fff'" class="org-img">
                </div>
                <h6 class="org-name fs-6">Muallim Farhan</h6>
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
<script>
    if (window.AOS && typeof window.AOS.init === "function") {
        window.AOS.init({
            once: true,
            duration: 800,
            easing: 'ease-out-cubic'
        });
    }
</script>

</body>
</html>











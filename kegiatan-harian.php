<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Kegiatan Harian - Asy-Syifaa Wal Mahmuudiyyah</title>

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
<script src="/assets/js/main.js"></script>
 <style>
 :root {
    --kh-bg-soft: #f6f8f4;
 }

 body#top {
    background:
        radial-gradient(circle at 12% 8%, rgba(199, 154, 55, 0.16), transparent 22rem),
        radial-gradient(circle at 90% 14%, rgba(32, 108, 78, 0.12), transparent 24rem),
        linear-gradient(180deg, #f9f8f3 0%, #f5f8f3 40%, #f7fbf8 100%);
 }

/* --- HEADER SECTION (HERO) --- */
 .page-header-premium {
    position: relative;
    min-height: 72vh;
    display: flex;
    align-items: center;
    text-align: center;
    background:
      linear-gradient(130deg, rgba(9, 56, 38, 0.9) 0%, rgba(20, 103, 70, 0.84) 60%, rgba(35, 128, 83, 0.82) 100%),
      url("/assets/media/images/hero-background.webp") center/cover no-repeat;
    color: #fff;
    overflow: hidden;
 }

 .page-header-premium > .container {
    position: relative;
    z-index: 2;
    padding-top: 1.2rem;
 }
 
 .page-header-premium::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: radial-gradient(circle, var(--accent-gold) 0%, transparent 100%);
 }

 .page-header-premium::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 22% 18%, rgba(255, 255, 255, 0.2), transparent 24rem);
    pointer-events: none;
    z-index: 1;
 }

 .header-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    background: rgba(255, 255, 255, 0.13);
    color: #f6ebcb !important;
    padding: 11px 26px;
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.24);
    font-weight: 700;
    font-size: 0.88rem;
    margin-bottom: 2rem;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    margin-inline: auto;
 }

 .header-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 6vw, 5.2rem);
    color: #ffffff !important;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
    letter-spacing: -0.02em;
    text-wrap: balance;
    line-height: 1.1;
 }

 .header-subtitle {
    max-width: 980px;
    margin: 0.25rem auto 0;
    color: rgba(255, 255, 255, 0.93) !important;
    font-size: clamp(1rem, 2vw, 1.38rem);
    line-height: 1.65;
 }

 .header-highlights {
    margin-top: 1.25rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.55rem;
 }

 .header-highlights span {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.58rem 1.05rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.26);
    background: rgba(255, 255, 255, 0.13);
    color: #f2fff5;
    font-size: 0.82rem;
    font-weight: 700;
 }

 /* ============================================
    DESKTOP VIEW: ROYAL TIMELINE
    (Hidden on Mobile)
    ============================================ */
 .desktop-view {
    display: block;
    padding: 38px 0 80px;
 }

 .timeline-royal {
    position: relative;
    max-width: 1100px;
    margin: 50px auto 0;
    padding: 20px 0;
 }

 /* Garis Vertikal Tengah */
 .timeline-royal::before {
    content: '';
    position: absolute;
    top: 0; bottom: 0; left: 50%;
    width: 2px;
    background: #e0e0e0;
    transform: translateX(-1px);
 }

 .tr-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
    position: relative;
 }

 /* Lingkaran Tengah */
 .tr-dot {
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    width: 20px; height: 20px;
    background: var(--accent-gold);
    border: 4px solid white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px #e0e0e0;
    z-index: 2;
    transition: all 0.3s ease;
 }

 .tr-item:hover .tr-dot {
    transform: translate(-50%, -50%) scale(1.5);
    background: var(--primary-green);
    box-shadow: 0 0 0 4px rgba(32, 108, 78, 0.2);
 }

 /* Kartu Konten */
 .tr-card {
    width: 46%;
    background: rgba(255, 255, 255, 0.96);
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 18px 44px rgba(26, 64, 43, 0.12);
    border: 1px solid rgba(23, 92, 59, 0.12);
    position: relative;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
 }

 .tr-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 4px; height: 100%;
    background: var(--primary-green);
 }

 .tr-item:hover .tr-card {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
 }

 /* Layout Zig-Zag */
 .tr-item:nth-child(odd) .tr-card { margin-right: auto; text-align: right; }
 .tr-item:nth-child(odd) .tr-card::before { left: auto; right: 0; }
 .tr-item:nth-child(even) .tr-card { margin-left: auto; text-align: left; }
 
 /* Isi Kartu */
 .tr-time {
    font-size: 1.8rem;
    font-family: 'Merriweather', serif;
    color: var(--primary-green);
    font-weight: 700;
    margin-bottom: 5px;
    display: block;
 }
 .tr-act {
    font-size: 1.1rem;
    color: #444;
    font-weight: 500;
    margin: 0;
 }
 .tr-desc {
    font-size: 0.9rem;
    color: #888;
    margin-top: 5px;
    font-style: italic;
 }

 /* Waktu di sisi berlawanan */
 .tr-opposite-time {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 46%;
    font-size: 0.9rem;
    font-weight: 600;
    color: #aaa;
    letter-spacing: 2px;
    text-transform: uppercase;
 }
 .tr-item:nth-child(odd) .tr-opposite-time { right: 0; text-align: left; padding-left: 30px; }
 .tr-item:nth-child(even) .tr-opposite-time { left: 0; text-align: right; padding-right: 30px; }


 /* ============================================
    MOBILE VIEW: ULTRA COMPACT AGENDA
    (Visible Only on Mobile)
    ============================================ */
 .mobile-view {
    display: none; /* Default Hidden */
    background: transparent;
    min-height: 100vh;
 }

 .agenda-container {
    padding: 0; /* Full Width */
 }

 /* Sticky Header per Bagian Waktu */
 .agenda-header {
    position: sticky;
    top: 70px; /* Di bawah navbar */
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(5px);
    padding: 12px 20px;
    font-weight: 800;
    font-size: 0.85rem;
    color: var(--dark-green);
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid #eee;
    z-index: 10;
    display: flex;
    align-items: center;
    box-shadow: 0 5px 14px rgba(0,0,0,0.06);
    margin-top: 0;
 }

 .agenda-header i {
    color: var(--accent-gold);
    margin-right: 10px;
    font-size: 1rem;
 }

 .agenda-list {
    list-style: none;
    padding: 0;
    margin: 0;
 }

 .agenda-item {
    display: flex;
    padding: 12px 20px;
    border-bottom: 1px solid #eef3ef;
    align-items: center; /* Center Vertikal */
    background: rgba(255, 255, 255, 0.86);
 }

 .agenda-item:last-child { border-bottom: none; }

 .ag-time {
    width: 60px; /* Sangat kecil */
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--primary-green);
    text-align: right;
    margin-right: 15px;
    line-height: 1.2;
    flex-shrink: 0;
 }

 .ag-content {
    flex-grow: 1;
    font-size: 0.9rem;
    color: #333;
    font-weight: 500;
    line-height: 1.3;
 }
 
 .ag-sub {
    display: block;
    font-size: 0.75rem;
    color: #999;
    font-weight: 400;
 }

 /* BREAKPOINTS */
 @media (max-width: 991.98px) {
    .desktop-view { display: none; }
    .mobile-view { display: block; }
    
    .page-header-premium {
        min-height: 64vh;
        padding: 2rem 0;
    }
    .header-title { font-size: clamp(2rem, 10vw, 3.05rem); }
    .header-subtitle { font-size: 1.03rem; line-height: 1.75; }
    .header-badge { font-size: 0.74rem; padding: 8px 14px; }
    .header-highlights span { font-size: 0.76rem; }
    
    /* Navbar Adjustment for sticky header */
    body { padding-top: 0; } /* Reset padding body karena kita atur manual */
 }
 </style>

</head>

 
<body id="top">

<?php include __DIR__ . '/partials.header.php'; ?>

<header class="page-header-premium">
    <div class="container position-relative">
        <span class="header-badge"><i class="fa-solid fa-clock me-1"></i> Agenda 24 Jam Santri</span><br>
        <h1 class="header-title">Kegiatan Harian Pesantren</h1>
        <p class="header-subtitle">Rangkaian kegiatan harian santri dari sepertiga malam hingga istirahat malam untuk membangun disiplin ibadah, adab, dan keilmuan.</p>
        <div class="header-highlights">
            <span><i class="fa-solid fa-mosque"></i> Ibadah Berjamaah</span>
            <span><i class="fa-solid fa-book-open-reader"></i> KBM Terjadwal</span>
            <span><i class="fa-solid fa-moon"></i> Murojaah Malam</span>
        </div>
    </div>
</header>

<main>

    <section class="desktop-view">
        <div class="container">
            <div class="timeline-royal">
                
                <div class="tr-item" data-aos="fade-up">
                    <div class="tr-card">
                        <span class="tr-time">03:00 - 04:00</span>
                        <h4 class="tr-act">Bangun & Qiyamul Lail</h4>
                        <p class="tr-desc">Mandi, Tahajud, Munajat, Menghafal, Muthola'ah</p>
                    </div>
                    <div class="tr-dot"></div>
                    <div class="tr-opposite-time">Sepertiga Malam</div>
                </div>

                <div class="tr-item" data-aos="fade-up">
                    <div class="tr-card">
                        <span class="tr-time">04:00 - 06:00</span>
                        <h4 class="tr-act">Sholat Shubuh & Wirid</h4>
                        <p class="tr-desc">Berjamaah, Mengaji Quran / Baca Rotib (Wirdul Latif, Yasin)</p>
                    </div>
                    <div class="tr-dot"></div>
                    <div class="tr-opposite-time">Fajar Shodiq</div>
                </div>

                <div class="tr-item" data-aos="fade-up">
                    <div class="tr-card">
                        <span class="tr-time">06:00 - 07:00</span>
                        <h4 class="tr-act">KBM (Mengaji) 1</h4>
                        <p class="tr-desc">Kajian Kitab Kuning / Tahfidz</p>
                    </div>
                    <div class="tr-dot"></div>
                    <div class="tr-opposite-time">Pagi Hari</div>
                </div>

                <div class="tr-item" data-aos="fade-up">
                    <div class="tr-card">
                        <span class="tr-time">07:00 - 08:00</span>
                        <h4 class="tr-act">Persiapan & Sarapan</h4>
                        <p class="tr-desc">Mandi Pagi, Sarapan Pagi, Persiapan Sekolah</p>
                    </div>
                    <div class="tr-dot"></div>
                    <div class="tr-opposite-time">Persiapan</div>
                </div>

                 <div class="tr-item" data-aos="fade-up">
                    <div class="tr-card">
                        <span class="tr-time">08:00 - 09:30</span>
                        <h4 class="tr-act">KBM (Mengaji) 2</h4>
                        <p class="tr-desc">Kegiatan Belajar Mengajar Sesi Kedua</p>
                    </div>
                    <div class="tr-dot"></div>
                    <div class="tr-opposite-time">Dhuha Awal</div>
                </div>

                <div class="tr-item" data-aos="fade-up">
                    <div class="tr-card">
                        <span class="tr-time">09:30 - 10:00</span>
                        <h4 class="tr-act">Sholat Dhuha & Istirahat</h4>
                        <p class="tr-desc">Jeda istirahat dan sholat sunnah</p>
                    </div>
                    <div class="tr-dot"></div>
                    <div class="tr-opposite-time">Istirahat</div>
                </div>

                <div class="tr-item" data-aos="fade-up">
                    <div class="tr-card">
                        <span class="tr-time">10:00 - 12:00</span>
                        <h4 class="tr-act">KBM (Mengaji) 3 & 4</h4>
                        <p class="tr-desc">Melanjutkan kegiatan belajar mengajar</p>
                    </div>
                    <div class="tr-dot"></div>
                    <div class="tr-opposite-time">Menjelang Siang</div>
                </div>

                <div class="tr-item" data-aos="fade-up">
                    <div class="tr-card">
                        <span class="tr-time">12:00 - 12:30</span>
                        <h4 class="tr-act">Sholat Dzuhur Berjamaah</h4>
                        <p class="tr-desc">Dilanjutkan dengan Wirid</p>
                    </div>
                    <div class="tr-dot"></div>
                    <div class="tr-opposite-time">Dzuhur</div>
                </div>

                <div class="tr-item" data-aos="fade-up">
                    <div class="tr-card">
                        <span class="tr-time">12:30 - 14:45</span>
                        <h4 class="tr-act">Makan Siang & Istirahat</h4>
                        <p class="tr-desc">Ishoma (Istirahat, Sholat, Makan)</p>
                    </div>
                    <div class="tr-dot"></div>
                    <div class="tr-opposite-time">Siang Hari</div>
                </div>

                <div class="tr-item" data-aos="fade-up">
                    <div class="tr-card">
                        <span class="tr-time">15:00 - 17:00</span>
                        <h4 class="tr-act">Sholat Ashar & KBM 5</h4>
                        <p class="tr-desc">Sholat Ashar Berjamaah, Wirid, Dilanjut Mengaji Sore</p>
                    </div>
                    <div class="tr-dot"></div>
                    <div class="tr-opposite-time">Sore Hari</div>
                </div>

                <div class="tr-item" data-aos="fade-up">
                    <div class="tr-card">
                        <span class="tr-time">18:00 - 20:00</span>
                        <h4 class="tr-act">Maghrib, Rotib & Isya</h4>
                        <p class="tr-desc">Sholat Maghrib, Baca Yasin/Waqiah/Mulk, Rotib Al-Haddad, Sholat Isya</p>
                    </div>
                    <div class="tr-dot"></div>
                    <div class="tr-opposite-time">Malam Awal</div>
                </div>

                 <div class="tr-item" data-aos="fade-up">
                    <div class="tr-card">
                        <span class="tr-time">21:00 - 22:00</span>
                        <h4 class="tr-act">Muthola'ah / Muroja'ah</h4>
                        <p class="tr-desc">Mengulang pelajaran dan belajar mandiri</p>
                    </div>
                    <div class="tr-dot"></div>
                    <div class="tr-opposite-time">Belajar Malam</div>
                </div>

            </div>
        </div>
    </section>


    <section class="mobile-view">
        <div class="container agenda-container">
            
            <div class="agenda-header">
                <i class="fas fa-sun"></i> Qiyamul Lail & Pagi
            </div>
            <ul class="agenda-list">
                <li class="agenda-item">
                    <div class="ag-time">03:00<br>04:00</div>
                    <div class="ag-content">Bangun, Mandi, Tahajud<span class="ag-sub">Persiapan & Munajat</span></div>
                </li>
                <li class="agenda-item">
                    <div class="ag-time">04:00<br>06:00</div>
                    <div class="ag-content">Sholat Shubuh & Wirid<span class="ag-sub">Mengaji Quran / Rotib</span></div>
                </li>
                <li class="agenda-item">
                    <div class="ag-time">06:00<br>07:00</div>
                    <div class="ag-content">KBM (Mengaji) 1<span class="ag-sub">Kajian Pagi</span></div>
                </li>
                <li class="agenda-item">
                    <div class="ag-time">07:00<br>08:00</div>
                    <div class="ag-content">Mandi & Sarapan<span class="ag-sub">Persiapan Sekolah</span></div>
                </li>
            </ul>

            <div class="agenda-header" style="color: #b8860b;">
                <i class="fas fa-cloud-sun"></i> KBM & Dhuha
            </div>
            <ul class="agenda-list">
                <li class="agenda-item">
                    <div class="ag-time">08:00<br>09:30</div>
                    <div class="ag-content">KBM (Mengaji) 2</div>
                </li>
                <li class="agenda-item">
                    <div class="ag-time">09:30<br>10:00</div>
                    <div class="ag-content">Sholat Dhuha<span class="ag-sub">Istirahat Pagi</span></div>
                </li>
                <li class="agenda-item">
                    <div class="ag-time">10:00<br>12:00</div>
                    <div class="ag-content">KBM (Mengaji) 3 & 4</div>
                </li>
            </ul>

            <div class="agenda-header" style="color: #206c4e;">
                <i class="fas fa-mosque"></i> Siang & Sore
            </div>
            <ul class="agenda-list">
                <li class="agenda-item">
                    <div class="ag-time">12:00<br>12:30</div>
                    <div class="ag-content">Sholat Dzuhur<span class="ag-sub">Berjamaah & Wirid</span></div>
                </li>
                <li class="agenda-item">
                    <div class="ag-time">12:30<br>14:45</div>
                    <div class="ag-content">Makan Siang<span class="ag-sub">Istirahat / Tidur Siang</span></div>
                </li>
                <li class="agenda-item">
                    <div class="ag-time">15:00<br>16:00</div>
                    <div class="ag-content">Sholat Ashar<span class="ag-sub">Berjamaah & Wirid</span></div>
                </li>
                <li class="agenda-item">
                    <div class="ag-time">16:00<br>17:00</div>
                    <div class="ag-content">KBM (Mengaji) 5<span class="ag-sub">Kajian Sore</span></div>
                </li>
            </ul>

            <div class="agenda-header" style="background: #1a3e2c; color: #ffd700;">
                <i class="fas fa-moon"></i> Ibadah Malam
            </div>
            <ul class="agenda-list">
                <li class="agenda-item">
                    <div class="ag-time">18:00<br>20:00</div>
                    <div class="ag-content">Maghrib, Rotib & Isya<span class="ag-sub">Yasin, Waqiah, Mulk, Burdah</span></div>
                </li>
                <li class="agenda-item">
                    <div class="ag-time">20:00<br>21:00</div>
                    <div class="ag-content">Makan Malam<span class="ag-sub">Istirahat Sejenak</span></div>
                </li>
                <li class="agenda-item">
                    <div class="ag-time">21:00<br>22:00</div>
                    <div class="ag-content">Muthola'ah<span class="ag-sub">Belajar Mandiri / Murojaah</span></div>
                </li>
                <li class="agenda-item">
                    <div class="ag-time">22:00<br>03:00</div>
                    <div class="ag-content">Istirahat Tidur</div>
                </li>
            </ul>

        </div>
    </section>

</main>














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
  AOS.init({ duration: 700, once: true, offset: 70 });
</script>

</body>
</html>







    .page-header-premium > .container { padding-top: 0.4rem; }


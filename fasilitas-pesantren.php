<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Pondok Pesantren Islam Internasional Terpadu Asy-Syifaa Wal Mahmuudiyyah</title>

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
  .facility-hero {
    position: relative;
    min-height: 68vh;
    display: flex;
    align-items: end;
    background:
      linear-gradient(180deg, rgba(5, 22, 15, 0.38) 0%, rgba(5, 22, 15, 0.88) 62%, rgba(5, 22, 15, 0.93) 100%),
      url("/assets/media/images/hero-background.webp") center/cover no-repeat;
    color: #fff;
    margin-bottom: 2.5rem;
  }
  .facility-hero .wrap {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 2.2rem 1rem 2.4rem;
  }
  .facility-kicker {
    display: inline-flex;
    align-items: center;
    gap: .4rem;
    border: 1px solid rgba(255,255,255,.38);
    background: rgba(255,255,255,.13);
    border-radius: 999px;
    padding: .35rem .85rem;
    font-size: .78rem;
    letter-spacing: .03em;
    text-transform: uppercase;
    font-weight: 700;
  }
  .facility-title {
    margin: .85rem 0 .65rem;
    font-family: "Playfair Display", serif;
    font-size: clamp(2rem, 5.8vw, 4rem);
    line-height: 1.1;
    color: #ffffff;
    text-shadow: 0 10px 28px rgba(0, 0, 0, .55), 0 2px 6px rgba(0,0,0,.45);
  }
  .facility-subtitle {
    max-width: 820px;
    font-size: clamp(1rem, 1.9vw, 1.28rem);
    color: rgba(255,255,255,.98);
    line-height: 1.65;
    text-shadow: 0 2px 8px rgba(0,0,0,.42);
  }
  .facility-section {
    padding: 0 0 2.2rem;
  }
  .facility-heading {
    max-width: 760px;
    margin: 0 auto 1.4rem;
    text-align: center;
  }
  .facility-heading h2 {
    color: #154f38;
    font-weight: 800;
    margin: 0 0 .45rem;
  }
  .facility-heading p {
    color: #5a7166;
    margin: 0;
  }
  .facility-card {
    border: 1px solid rgba(20, 84, 56, 0.14);
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 10px 24px rgba(8, 43, 30, .07);
    overflow: hidden;
    height: 100%;
    transition: transform .24s ease, box-shadow .24s ease;
  }
  .facility-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 18px 28px rgba(8, 43, 30, .12);
  }
  .facility-card .media {
    height: 180px;
    background:
      linear-gradient(160deg, rgba(24,110,73,.32), rgba(13,67,43,.48)),
      url("/assets/media/images/Foto%20Terkini/slider1.jpg") center/cover no-repeat;
  }
  .facility-card.media-kelas .media {
    background:
      linear-gradient(160deg, rgba(24,110,73,.32), rgba(13,67,43,.48)),
      url("/assets/media/images/Foto%20Terkini/slider2.jpg") center/cover no-repeat;
  }
  .facility-card.media-asrama .media {
    background:
      linear-gradient(160deg, rgba(24,110,73,.32), rgba(13,67,43,.48)),
      url("/assets/media/images/Foto%20Terkini/slider3.jpg") center/cover no-repeat;
  }
  .facility-card.media-perpus .media {
    background:
      linear-gradient(160deg, rgba(24,110,73,.32), rgba(13,67,43,.48)),
      url("/assets/media/images/Foto%20Terkini/slider4.jpg") center/cover no-repeat;
  }
  .facility-card.media-dapur .media {
    background:
      linear-gradient(160deg, rgba(24,110,73,.32), rgba(13,67,43,.48)),
      url("/assets/media/images/Foto%20Terkini/slider5.jpg") center/cover no-repeat;
  }
  .facility-card.media-klinik .media {
    background:
      linear-gradient(160deg, rgba(24,110,73,.32), rgba(13,67,43,.48)),
      url("/assets/media/images/slider1.jpg") center/cover no-repeat;
  }
  .facility-card .body {
    padding: 1rem 1rem 1.1rem;
  }
  .facility-card h3 {
    margin: 0 0 .45rem;
    font-size: 1.07rem;
    color: #154f38;
    font-weight: 800;
  }
  .facility-card p {
    margin: 0;
    color: #4d6358;
    font-size: .92rem;
    line-height: 1.62;
  }
  .facility-metrics {
    background: #f5faf7;
    border: 1px solid rgba(21, 79, 56, .12);
    border-radius: 16px;
    padding: 1rem;
  }
  .metric-item {
    text-align: center;
    padding: .6rem;
  }
  .metric-item strong {
    display: block;
    font-size: 1.35rem;
    color: #1b6f4d;
  }
  .metric-item span {
    color: #5a7166;
    font-size: .84rem;
  }
  .facility-cta {
    background: linear-gradient(135deg, #0f563b, #1f7a54);
    color: #fff;
    border-radius: 18px;
    padding: 1.4rem 1.2rem;
  }
  @media (max-width: 767.98px) {
    .facility-hero { min-height: 56vh; }
    .facility-hero .wrap { padding-bottom: 1.8rem; }
  }
 </style>

</head>

 
<body id="top">

<?php include __DIR__ . '/partials.header.php'; ?>

<main>
  <section class="facility-hero">
    <div class="wrap">
      <span class="facility-kicker"><i class="fa-solid fa-building"></i> Fasilitas Pesantren</span>
      <h1 class="facility-title">Lingkungan Belajar, Ibadah, dan Pembinaan yang Terintegrasi</h1>
      <p class="facility-subtitle">Asy-Syifaa menghadirkan fasilitas pendidikan dan asrama yang dirancang untuk mendukung pembentukan ilmu, adab, kemandirian, serta kesehatan santri dalam satu ekosistem pembinaan.</p>
    </div>
  </section>

  <section class="facility-section">
    <div class="container">
      <div class="facility-heading" data-aos="fade-up">
        <h2>Fasilitas Unggulan Pesantren</h2>
        <p>Setiap fasilitas disiapkan untuk menunjang ritme ibadah, pembelajaran, dan pembinaan karakter santri dari pagi hingga malam.</p>
      </div>
      <div class="facility-metrics mb-4" data-aos="fade-up">
        <div class="row g-2">
          <div class="col-6 col-md-3 metric-item"><strong>24/7</strong><span>Pembinaan & Pengawasan</span></div>
          <div class="col-6 col-md-3 metric-item"><strong>6+</strong><span>Area Fasilitas Inti</span></div>
          <div class="col-6 col-md-3 metric-item"><strong>100%</strong><span>Dukungan Aktivitas Santri</span></div>
          <div class="col-6 col-md-3 metric-item"><strong>Terpadu</strong><span>Akademik, Asrama, Ibadah</span></div>
        </div>
      </div>

      <div class="row g-3">
        <div class="col-md-6 col-lg-4" data-aos="fade-up">
          <article class="facility-card media-kelas">
            <div class="media"></div>
            <div class="body">
              <h3><i class="fa-solid fa-book-quran me-2"></i>Masjid & Majelis Ilmu</h3>
              <p>Pusat kegiatan ibadah jama'i, kajian kitab, tahfidz, dan pembinaan ruhani harian santri.</p>
            </div>
          </article>
        </div>
        <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="80">
          <article class="facility-card media-asrama">
            <div class="media"></div>
            <div class="body">
              <h3><i class="fa-solid fa-school me-2"></i>Kelas Pembelajaran</h3>
              <p>Ruang belajar nyaman dengan dukungan jadwal terstruktur untuk pelajaran diniyah dan umum.</p>
            </div>
          </article>
        </div>
        <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="140">
          <article class="facility-card media-perpus">
            <div class="media"></div>
            <div class="body">
              <h3><i class="fa-solid fa-bed me-2"></i>Asrama Putra & Putri</h3>
              <p>Penataan hunian yang disiplin, bersih, dan aman untuk membentuk kemandirian serta kebersamaan.</p>
            </div>
          </article>
        </div>
        <div class="col-md-6 col-lg-4" data-aos="fade-up">
          <article class="facility-card media-dapur">
            <div class="media"></div>
            <div class="body">
              <h3><i class="fa-solid fa-book-open-reader me-2"></i>Perpustakaan</h3>
              <p>Koleksi rujukan keislaman dan penunjang akademik untuk memperkuat budaya literasi santri.</p>
            </div>
          </article>
        </div>
        <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="80">
          <article class="facility-card media-klinik">
            <div class="media"></div>
            <div class="body">
              <h3><i class="fa-solid fa-utensils me-2"></i>Dapur & Ruang Makan</h3>
              <p>Layanan konsumsi santri yang terjadwal dan higienis untuk menunjang stamina belajar dan ibadah.</p>
            </div>
          </article>
        </div>
        <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="140">
          <article class="facility-card">
            <div class="media"></div>
            <div class="body">
              <h3><i class="fa-solid fa-heart-pulse me-2"></i>Layanan Kesehatan</h3>
              <p>Pemantauan kesehatan dasar santri serta pendampingan awal saat membutuhkan penanganan medis.</p>
            </div>
          </article>
        </div>
      </div>

      <div class="facility-cta mt-4" data-aos="fade-up">
        <div class="row align-items-center g-3">
          <div class="col-lg-8">
            <h3 class="h4 mb-2">Ingin melihat fasilitas secara langsung?</h3>
            <p class="mb-0 text-white-50">Lanjutkan ke pendaftaran untuk mendapatkan informasi teknis dan alur bergabung sebagai santri Asy-Syifaa.</p>
          </div>
          <div class="col-lg-4 text-lg-end">
            <a href="/daftar-sekarang" class="btn btn-light fw-bold px-4 py-2 rounded-pill">
              <i class="fa-solid fa-user-plus me-2"></i>Daftar Sekarang
            </a>
          </div>
        </div>
      </div>
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

</body>
</html>











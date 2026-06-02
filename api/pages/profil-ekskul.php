<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Ekstrakurikuler Santri | Pondok Pesantren Asy-Syifaa Wal Mahmuudiyyah</title>
  <meta name="description" content="Program ekstrakurikuler santri Asy-Syifaa Wal Mahmuudiyyah untuk pembinaan bakat, adab, kepemimpinan, dan kompetensi santri secara terarah." />
  <meta name="keywords" content="Ekstrakurikuler Santri, Asy-Syifaa, Profil Ekskul, Kegiatan Santri, Pesantren Sumedang" />

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />
  <link rel="icon" href="/assets/media/images/logo.png" type="image/png" sizes="32x32">

  <link rel="stylesheet" href="/css/style.css?v=20260517" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/footer.css?v=20260517">
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/main.css?v=20260519">
  <script src="/assets/js/main.js"></script>

  <style>
    .asf-ekskul-page {
      background: #f4f7f5;
    }

    .asf-ekskul-hero {
      position: relative;
      padding: 8.25rem 0 4.25rem;
      color: #ffffff;
      background: linear-gradient(140deg, rgba(8, 27, 17, 0.95) 0%, rgba(13, 52, 33, 0.92) 52%, rgba(20, 76, 48, 0.9) 100%), url('/img/Simpang.png') center/cover no-repeat;
      overflow: hidden;
    }

    .asf-ekskul-hero::before {
      content: "";
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 82% 14%, rgba(255, 255, 255, 0.1), transparent 56%),
        linear-gradient(rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.28));
      pointer-events: none;
    }

    .asf-ekskul-hero .container {
      position: relative;
      z-index: 2;
    }

    .asf-ekskul-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      border-radius: 999px;
      padding: 0.32rem 0.76rem;
      background: rgba(255, 255, 255, 0.16);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #d8f5e5;
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }

    .asf-ekskul-hero h1 {
      margin: 1rem 0 0.5rem;
      font-family: 'Playfair Display', serif;
      font-size: clamp(2rem, 4.2vw, 3.35rem);
      line-height: 1.1;
      color: #ffffff !important;
      opacity: 1 !important;
      visibility: visible !important;
      text-shadow: 0 4px 18px rgba(0, 0, 0, 0.28);
    }

    .asf-ekskul-hero p {
      margin: 0;
      max-width: 760px;
      color: rgba(255, 255, 255, 0.88);
      font-size: 1.02rem;
      opacity: 1 !important;
      visibility: visible !important;
    }

    .asf-ekskul-hero [data-aos] {
      opacity: 1 !important;
      transform: none !important;
      visibility: visible !important;
    }

    .asf-ekskul-hero-pills {
      margin-top: 1.1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.55rem;
    }

    .asf-ekskul-hero-pills span {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      border-radius: 999px;
      padding: 0.3rem 0.7rem;
      background: rgba(50, 220, 100, 0.18);
      border: 1px solid rgba(50, 220, 100, 0.45);
      color: #c8f9dd;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .asf-ekskul-section {
      padding: 4rem 0;
    }

    .asf-ekskul-section .section-header h2 {
      font-size: clamp(1.7rem, 3vw, 2.45rem);
    }

    .asf-ekskul-program-card {
      height: 100%;
      border: 1px solid rgba(20, 84, 53, 0.11);
      border-radius: 1rem;
      background: #ffffff;
      box-shadow: 0 10px 30px rgba(15, 45, 30, 0.09);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      overflow: hidden;
    }

    .asf-ekskul-program-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 36px rgba(15, 45, 30, 0.14);
    }

    .asf-ekskul-program-card .card-body {
      padding: 1.2rem;
    }

    .asf-ekskul-icon {
      width: 3rem;
      height: 3rem;
      border-radius: 0.85rem;
      display: grid;
      place-items: center;
      font-size: 1.2rem;
      color: #ffffff;
      background: linear-gradient(130deg, #1f6b43 0%, #2f8c59 100%);
      box-shadow: 0 8px 18px rgba(31, 107, 67, 0.32);
      margin-bottom: 0.9rem;
    }

    .asf-ekskul-program-card h3 {
      font-size: 1.08rem;
      margin-bottom: 0.45rem;
      color: #123a28;
    }

    .asf-ekskul-program-card p {
      font-size: 0.93rem;
      color: #436152;
      margin-bottom: 0.75rem;
    }

    .asf-ekskul-meta {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.78rem;
      font-weight: 700;
      color: #1d6a43;
      background: rgba(29, 106, 67, 0.09);
      border: 1px solid rgba(29, 106, 67, 0.16);
      border-radius: 999px;
      padding: 0.22rem 0.55rem;
    }

    .asf-ekskul-schedule-wrap {
      background: #ffffff;
      border: 1px solid rgba(20, 84, 53, 0.12);
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 0 10px 26px rgba(16, 52, 35, 0.08);
    }

    .asf-ekskul-schedule-wrap table {
      margin-bottom: 0;
    }

    .asf-ekskul-schedule-wrap thead th {
      background: linear-gradient(140deg, #0f3d25 0%, #1f6b43 100%);
      color: #ffffff;
      border-bottom: 0;
      font-weight: 700;
      font-size: 0.9rem;
      letter-spacing: 0.01em;
    }

    .asf-ekskul-schedule-wrap tbody td {
      vertical-align: middle;
      color: #234937;
      font-size: 0.92rem;
      border-color: rgba(31, 107, 67, 0.1);
    }

    .asf-ekskul-step {
      border: 1px solid rgba(20, 84, 53, 0.12);
      border-radius: 0.95rem;
      padding: 1rem 1rem 0.95rem;
      background: #ffffff;
      height: 100%;
    }

    .asf-ekskul-step-number {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      display: grid;
      place-items: center;
      font-size: 0.86rem;
      font-weight: 700;
      color: #ffffff;
      background: #1f6b43;
      margin-bottom: 0.7rem;
    }

    .asf-ekskul-step h4 {
      font-size: 1rem;
      margin-bottom: 0.35rem;
      color: #103828;
    }

    .asf-ekskul-step p {
      margin: 0;
      font-size: 0.9rem;
      color: #4a6658;
    }

    .asf-ekskul-cta {
      border-radius: 1.1rem;
      padding: 1.35rem;
      background: linear-gradient(140deg, #0f3d25 0%, #1f6b43 56%, #2d925c 100%);
      color: #ffffff;
      box-shadow: 0 12px 30px rgba(13, 45, 28, 0.25);
    }

    .asf-ekskul-cta h3 {
      font-family: 'Playfair Display', serif;
      margin-bottom: 0.35rem;
      font-size: clamp(1.4rem, 2.6vw, 2rem);
      color: #ffffff;
    }

    .asf-ekskul-cta p {
      margin-bottom: 0;
      color: rgba(255, 255, 255, 0.9);
    }

    @media (max-width: 991.98px) {
      .asf-ekskul-hero {
        padding-top: 7.2rem;
      }

      .asf-ekskul-cta {
        text-align: center;
      }
    }
  </style>
</head>

<body id="top">
<?php include __DIR__ . '/partials.header.php'; ?>

<main class="asf-ekskul-page">
  <section class="asf-ekskul-hero">
    <div class="container">
      <span class="asf-ekskul-badge"><i class="fa-solid fa-seedling"></i> Profil Pesantren</span>
      <h1 data-aos="fade-up">Ekstrakurikuler Santri</h1>
      <p data-aos="fade-up" data-aos-delay="100">
        Program pendamping kurikulum untuk menumbuhkan keberanian, kreativitas, kedisiplinan, ukhuwah, dan kepemimpinan santri dengan pembinaan langsung dari pembimbing pesantren.
      </p>
      <div class="asf-ekskul-hero-pills" data-aos="fade-up" data-aos-delay="180">
        <span><i class="fa-solid fa-check"></i> Pembinaan Karakter</span>
        <span><i class="fa-solid fa-check"></i> Penguatan Kompetensi</span>
        <span><i class="fa-solid fa-check"></i> Latihan Rutin Terjadwal</span>
      </div>
    </div>
  </section>

  <section class="asf-ekskul-section">
    <div class="container">
      <div class="section-header text-center mb-4" data-aos="fade-up">
        <h2>Program Unggulan Ekstrakurikuler</h2>
        <p class="text-muted mb-0">Santri memilih program sesuai minat, lalu dibina bertahap dari dasar sampai tampil di kegiatan pesantren.</p>
      </div>
      <div class="row g-4">
        <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="50">
          <article class="asf-ekskul-program-card">
            <div class="card-body">
              <div class="asf-ekskul-icon"><i class="fa-solid fa-book-open"></i></div>
              <h3>Bahtsul Masail</h3>
              <p>Latihan analisis masalah keislaman berbasis kitab turats dan diskusi terstruktur.</p>
              <span class="asf-ekskul-meta"><i class="fa-regular fa-clock"></i> Selasa Sore</span>
            </div>
          </article>
        </div>
        <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="90">
          <article class="asf-ekskul-program-card">
            <div class="card-body">
              <div class="asf-ekskul-icon"><i class="fa-solid fa-microphone-lines"></i></div>
              <h3>Khitobah</h3>
              <p>Pembinaan public speaking, teknik pidato, dan adab tampil di depan jamaah.</p>
              <span class="asf-ekskul-meta"><i class="fa-regular fa-clock"></i> Kamis Sore</span>
            </div>
          </article>
        </div>
        <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="130">
          <article class="asf-ekskul-program-card">
            <div class="card-body">
              <div class="asf-ekskul-icon"><i class="fa-solid fa-user-ninja"></i></div>
              <h3>Pencak Silat</h3>
              <p>Penguatan fisik, ketangkasan, dan akhlak ksatria sebagai benteng diri santri.</p>
              <span class="asf-ekskul-meta"><i class="fa-regular fa-clock"></i> Ahad Pagi</span>
            </div>
          </article>
        </div>
        <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="170">
          <article class="asf-ekskul-program-card">
            <div class="card-body">
              <div class="asf-ekskul-icon"><i class="fa-solid fa-language"></i></div>
              <h3>Bahasa Arab</h3>
              <p>Latihan percakapan, mufrodat, dan ekspresi harian untuk lingkungan berbahasa.</p>
              <span class="asf-ekskul-meta"><i class="fa-regular fa-clock"></i> Senin Sore</span>
            </div>
          </article>
        </div>
        <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="210">
          <article class="asf-ekskul-program-card">
            <div class="card-body">
              <div class="asf-ekskul-icon"><i class="fa-solid fa-music"></i></div>
              <h3>Hadroh & Terbangnan</h3>
              <p>Pembinaan seni islami, ritme, dan kekompakan tim untuk acara resmi pesantren.</p>
              <span class="asf-ekskul-meta"><i class="fa-regular fa-clock"></i> Rabu Sore</span>
            </div>
          </article>
        </div>
        <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="250">
          <article class="asf-ekskul-program-card">
            <div class="card-body">
              <div class="asf-ekskul-icon"><i class="fa-solid fa-scroll"></i></div>
              <h3>Ilmu Alat</h3>
              <p>Pendalaman nahwu-shorof praktis untuk memperkuat kemampuan membaca kitab.</p>
              <span class="asf-ekskul-meta"><i class="fa-regular fa-clock"></i> Jumat Sore</span>
            </div>
          </article>
        </div>
        <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="290">
          <article class="asf-ekskul-program-card">
            <div class="card-body">
              <div class="asf-ekskul-icon"><i class="fa-solid fa-compass-drafting"></i></div>
              <h3>Pramuka Santri</h3>
              <p>Latihan kemandirian, kerja tim, survival dasar, dan kepemimpinan lapangan.</p>
              <span class="asf-ekskul-meta"><i class="fa-regular fa-clock"></i> Sabtu Pagi</span>
            </div>
          </article>
        </div>
        <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="330">
          <article class="asf-ekskul-program-card">
            <div class="card-body">
              <div class="asf-ekskul-icon"><i class="fa-solid fa-camera-retro"></i></div>
              <h3>Media Dakwah</h3>
              <p>Dasar desain konten, dokumentasi kegiatan, dan publikasi dakwah santri.</p>
              <span class="asf-ekskul-meta"><i class="fa-regular fa-clock"></i> Sabtu Sore</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>

  <section class="asf-ekskul-section pt-0">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-7" data-aos="fade-up">
          <div class="asf-ekskul-schedule-wrap">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Hari</th>
                    <th>Program</th>
                    <th>Waktu</th>
                    <th>Lokasi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Senin</td>
                    <td>Bahasa Arab</td>
                    <td>16.00 - 17.15</td>
                    <td>Ruang Bahasa</td>
                  </tr>
                  <tr>
                    <td>Selasa</td>
                    <td>Bahtsul Masail</td>
                    <td>16.00 - 17.30</td>
                    <td>Aula Kajian</td>
                  </tr>
                  <tr>
                    <td>Rabu</td>
                    <td>Hadroh & Terbangnan</td>
                    <td>16.00 - 17.15</td>
                    <td>Pendopo Pesantren</td>
                  </tr>
                  <tr>
                    <td>Kamis</td>
                    <td>Khitobah</td>
                    <td>16.00 - 17.30</td>
                    <td>Masjid Utama</td>
                  </tr>
                  <tr>
                    <td>Jumat</td>
                    <td>Ilmu Alat</td>
                    <td>15.45 - 17.00</td>
                    <td>Ruang Kitab</td>
                  </tr>
                  <tr>
                    <td>Sabtu</td>
                    <td>Pramuka Santri / Media Dakwah</td>
                    <td>08.00 - 10.00 / 16.00 - 17.30</td>
                    <td>Lapangan / Studio Media</td>
                  </tr>
                  <tr>
                    <td>Ahad</td>
                    <td>Pencak Silat</td>
                    <td>07.00 - 09.00</td>
                    <td>Lapangan Pesantren</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-lg-5" data-aos="fade-up" data-aos-delay="80">
          <div class="h-100 d-flex flex-column gap-3">
            <div class="asf-ekskul-step">
              <div class="asf-ekskul-step-number">1</div>
              <h4>Pemetaan Minat</h4>
              <p>Santri mengikuti pengarahan awal dan memilih ekskul sesuai minat serta bakat.</p>
            </div>
            <div class="asf-ekskul-step">
              <div class="asf-ekskul-step-number">2</div>
              <h4>Seleksi Ringan</h4>
              <p>Pembimbing melakukan observasi dasar untuk menentukan kelompok pembinaan.</p>
            </div>
            <div class="asf-ekskul-step">
              <div class="asf-ekskul-step-number">3</div>
              <h4>Pembinaan Berkala</h4>
              <p>Program berjalan rutin dengan evaluasi adab, disiplin, dan perkembangan skill.</p>
            </div>
            <div class="asf-ekskul-step">
              <div class="asf-ekskul-step-number">4</div>
              <h4>Tampil & Apresiasi</h4>
              <p>Santri menampilkan hasil latihan pada event pesantren dan kegiatan masyarakat.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="asf-ekskul-section pt-0 pb-5">
    <div class="container">
      <div class="asf-ekskul-cta">
        <div class="row align-items-center g-3">
          <div class="col-lg-8">
            <h3>Ingin melihat kegiatan ekskul terbaru?</h3>
            <p>Kunjungi halaman kegiatan untuk dokumentasi rutinan santri dan agenda pembinaan pekanan.</p>
          </div>
          <div class="col-lg-4 d-flex flex-wrap gap-2 justify-content-lg-end justify-content-center">
            <a class="btn btn-light fw-semibold px-3" href="/kegiatan-harian.html">Lihat Kegiatan</a>
            <a class="btn btn-outline-light fw-semibold px-3" href="https://wa.me/6285322170007" target="_blank" rel="noopener">Hubungi Admin</a>
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






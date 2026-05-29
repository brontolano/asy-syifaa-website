<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Profil Pesantren | Asy-Syifaa Wal Mahmuudiyyah</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />
<link rel="icon" href="/assets/media/images/logo.png" type="image/png" sizes="32x32">

  <link rel="stylesheet" href="/css/style.css?v=20260517" />
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source Sans 3:wght@400;500;600&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="/assets/css/main.css?v=20260519">
<script src="/assets/js/main.js?v=20260519-click"></script>
<style>

.Profilee-selection-section {
    /* min-height: 100vh;  <-- Hapus atau jadikan komentar baris ini agar tinggi tidak memaksa satu layar penuh */
    min-height: auto; /* Ganti jadi auto agar tinggi menyesuaikan konten saja */
    
    display: flex;
    /* align-items: center; <-- Hapus atau jadikan komentar baris ini agar konten tidak dipaksa ke tengah vertikal */
    align-items: flex-start; /* Ganti jadi flex-start agar konten mulai dari atas */
    
    justify-content: center;
    background: radial-gradient(circle at center, #fcfcfc 0%, #eff5f2 100%);
    
    /* Ubah padding atas dari 140px menjadi 100px (cukup untuk melewati navbar) */
    padding: 40px 0 80px 0; 
    
    position: relative;
    overflow: hidden;
}
    /* Background Decoration (Optional Pattern) */
    .bg-pattern {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background-image: radial-gradient(var(--primary-green) 1px, transparent 1px);
        background-size: 40px 40px;
        opacity: 0.05;
        z-index: 0;
        pointer-events: none;
    }

    /* Container Header */
    .selection-header {
        position: relative;
        z-index: 2;
        margin-bottom: 3rem;
    }
    .selection-header h2 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        color: var(--dark-green);
        margin-bottom: 0.5rem;
    }
    .selection-header p {
        color: #7f8c8d;
        font-size: 1.1rem;
        max-width: 600px;
        margin: 0 auto;
    }

    /* === THE CARDS === */
    .Profilee-card-wrapper {
        position: relative;
        z-index: 2;
        perspective: 1000px; /* Untuk efek 3D */
    }

    .Profilee-choice-card {
        display: block;
        position: relative;
        height: 550px; /* Tinggi kartu */
        width: 100%;
        border-radius: 25px;
        overflow: hidden;
        text-decoration: none;
        box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        cursor: default;
        border: 1px solid rgba(255,255,255,0.4);
        z-index: 3;
        pointer-events: auto;
    }

    /* Background Image setup */
    .card-bg-img {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        transition: transform 0.8s ease;
        z-index: 0;
        pointer-events: none;
    }
    
    /* GANTI URL GAMBAR DI SINI */
    .bg-abuya {
        background-image: url('/assets/media/profile-pondok/abuya-1.png');
    }
    .bg-pondok {
        background-image: url('/assets/media/profile-pondok/simpang-1200x675.png');
    }

    /* Overlay Gradient (Supaya teks terbaca & kesan modern) */
    .card-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to top, 
            rgba(var(--dark-green-rgb), 0.95) 0%, 
            rgba(var(--dark-green-rgb), 0.6) 40%, 
            rgba(var(--primary-green-rgb), 0.3) 100%
        );
        opacity: 0.3;
        transition: opacity 0.5s ease;
        z-index: 1;
        pointer-events: none;
    }

    /* Content inside Card */
    .card-content {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 40px 40px 110px;
        z-index: 3;
        color: white;
        transform: translateY(20px);
        transition: transform 0.5s ease;
        pointer-events: none;
    }

    /* Icon/Graphic Floating */
    .card-icon-float {
        position: absolute;
        top: 30px;
        right: 30px;
        font-size: 3rem;
        color: var(--accent-gold);
        opacity: 0.5;
        z-index: 3;
        transition: all 0.5s ease;
        background: rgba(255,255,255,0.1);
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255,255,255,0.2);
        pointer-events: none;
    }

    /* Typography */
    .card-title-modern {
        font-family: 'Merriweather', serif;
        font-size: 2.5rem;
        margin-bottom: 10px;
        color: white;
        text-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    
    .card-desc {
        font-family: 'Source Sans 3', sans-serif;
        font-size: 1rem;
        color: rgba(255,255,255,0.8);
        margin-bottom: 25px;
        line-height: 1.6;
        opacity: 0; /* Hidden by default, show on hover */
        transform: translateY(10px);
        transition: all 0.5s ease 0.1s; /* Delay dikit */
    }

    /* Tombol palsu (Call to Action) */
    .card-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        position: absolute;
        left: 40px;
        bottom: 40px;
        padding: 12px 30px;
        background: rgba(255,255,255,0.15);
        border: 1px solid var(--accent-gold);
        color: var(--accent-gold);
        border-radius: 50px;
        font-weight: 600;
        backdrop-filter: blur(5px);
        transition: all 0.3s ease;
        z-index: 10;
        pointer-events: auto !important;
        cursor: pointer !important;
        text-decoration: none;
    }

    /* HOVER EFFECTS - The Magic Happens Here */
    .Profilee-choice-card:hover {
        transform: translateY(-15px) scale(1.02); /* Naik & Zoom dikit */
        box-shadow: 0 30px 60px rgba(var(--primary-green-rgb), 0.3);
        border-color: var(--accent-gold);
    }

    .Profilee-choice-card:hover .card-bg-img {
        transform: scale(1.1); /* Zoom gambar background */
    }

    .Profilee-choice-card:hover .card-overlay {
        opacity: 0.7; /* Overlay menipis biar gambar lebih jelas */
        background: linear-gradient(
            to top, 
            rgba(var(--dark-green-rgb), 0.9) 0%, 
            rgba(var(--primary-green-rgb), 0.2) 100%
        );
    }

    .Profilee-choice-card:hover .card-content {
        transform: translateY(0);
    }

    .Profilee-choice-card:hover .card-desc {
        opacity: 1;
        transform: translateY(0);
    }

    .Profilee-choice-card:hover .card-icon-float {
        transform: rotate(15deg) scale(1.2);
        opacity: 1;
        background: var(--accent-gold);
        color: var(--dark-green);
        border-color: var(--accent-gold);
    }

    .Profilee-choice-card:hover .card-btn {
        background: var(--accent-gold);
        color: var(--dark-green);
        padding-left: 40px; /* Efek geser */
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .Profilee-choice-card { height: 400px; margin-bottom: 20px; }
        .card-title-modern { font-size: 2rem; }
        .card-desc { opacity: 1; transform: translateY(0); display: block; } /* Di HP selalu muncul */
        .card-content { transform: translateY(0); }
    }

    /* === CSS RESPONSIVE KHUSUS MOBILE (HP) === */
@media (max-width: 576px) {
    
    /* 1. Paksa Grid menjadi 2 Kolom Sejajar */
    .Profilee-selection-section .row {
        margin-left: -5px;
        margin-right: -5px;
    }
    
    .Profilee-selection-section .col-md-6 {
        flex: 0 0 50%;     /* Paksa lebar flex 50% */
        width: 50%;        /* Paksa lebar 50% */
        padding-left: 5px; /* Kurangi gap antar kartu */
        padding-right: 5px;
    }

    /* 2. Perkecil Ukuran Kartu */
    .Profilee-choice-card {
        height: 220px; /* Tinggi kita pangkas drastis dari 550px ke 220px */
        border-radius: 15px; /* Radius sudut diperkecil sedikit */
    }

    /* 3. Sesuaikan Konten di Dalam Kartu */
    .card-content {
        padding: 15px 15px 58px; /* Padding dalam dikurangi */
        bottom: 0;
    }

    /* 4. Judul Dikecilkan */
    .card-title-modern {
        font-size: 1.1rem; /* Ukuran font judul disesuaikan */
        margin-bottom: 5px;
        line-height: 1.2;
    }

    /* 5. Sembunyikan Deskripsi (PENTING: Agar muat 2 kolom) */
    .card-desc {
        display: none; /* Kita hide deskripsi di mode HP agar tidak penuh */
    }

    /* 6. Ikon Melayang Dikecilkan */
    .card-icon-float {
        width: 35px;
        height: 35px;
        font-size: 1rem;
        top: 10px;
        right: 10px;
        border-width: 1px;
    }

    /* 7. Tombol "Selengkapnya" Disederhanakan */
    .card-btn {
        left: 15px;
        bottom: 15px;
        padding: 6px 12px;
        font-size: 0.7rem;
        margin-top: 5px;
        white-space: nowrap; /* Mencegah teks turun baris */
    }
    
    /* Opsional: Jika tombol teks kepanjangan, bisa ganti icon saja lewat CSS trick, 
       tapi kode di atas sudah cukup aman */
}

</style>
  </head>
<body>

<?php include __DIR__ . '/partials.header.php'; ?>


<section class="Profilee-selection-section">
    <div class="bg-pattern"></div>

    <div class="container">
        
        <div class="text-center selection-header" data-aos="fade-down" data-aos-duration="1000">
            <h2>Profile & Sejarah</h2>
            <p>Mengenal lebih dekat sosok pendiri dan lembaga pendidikan kami.</p>
        </div>

        <div class="row g-4 justify-content-center align-items-center">
            
            <div class="col-lg-5 col-md-6" data-aos="fade-right" data-aos-delay="200">
                <div class="Profilee-choice-card">
                    <div class="card-bg-img bg-abuya"></div>
                    <div class="card-overlay"></div>
                    <div class="card-icon-float">
                        <i class="fa-solid fa-user-tie"></i>
                    </div>
                    
                    <div class="card-content">
                        <h3 class="card-title-modern">Profile Abuya</h3>
                        <div class="card-desc">
                            Mengenal sosok Kyai karismatik, pendiri, dan pengasuh pondok pesantren. Teladani perjuangan, keilmuan, dan nasab beliau.
                        </div>
                    </div>
                    <a class="card-btn" href="/profil-abuya.html" aria-label="Buka halaman Profile Abuya">
                        Selengkapnya <i class="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            </div>

            <div class="col-lg-5 col-md-6" data-aos="fade-left" data-aos-delay="400">
                <div class="Profilee-choice-card">
                    <div class="card-bg-img bg-pondok"></div>
                    <div class="card-overlay"></div>
                    <div class="card-icon-float">
                        <i class="fa-solid fa-mosque"></i>
                    </div>
                    
                    <div class="card-content">
                        <h3 class="card-title-modern">Profile Pondok Pesantren</h3>
                        <div class="card-desc">
                            Sejarah berdirinya Asy-Syifaa Wal Mahmuudiyyah, visi misi, fasilitas, dan keunggulan lembaga dalam mencetak generasi Rabbani.
                        </div>
                    </div>
                    <a class="card-btn" href="/profil-pondok-pesantren.html" aria-label="Buka halaman Profile Pondok Pesantren">
                        Selengkapnya <i class="fa-solid fa-arrow-right"></i>
                    </a>
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
  <script src="/assets/js/main.js?v=20260519-click"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll('.card-btn[href]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target = btn.getAttribute('href');
          if (target) {
            window.location.href = target;
          }
        });
      });
    });
  </script>
</body>
</html>









<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Direktori Alumni & Database Lulusan Resmi - Ponpes Asy-Syifaa Wal Mahmuudiyyah Sumedang</title>

<meta name="description" content="Akses data lengkap alumni, santri pengabdian, dan tendik di Direktori Resmi Ponpes Asy-Syifaa Wal Mahmuudiyyah. Cari teman angkatan mudah berdasarkan nama dan tahun masuk.">

<meta name="keywords" content="Alumni Asy-Syifaa, Direktori Santri, Data Lulusan Pesantren Sumedang, Santri Asy-Syifaa Wal Mahmuudiyyah, Database Alumni">
  <!-- Tailwind CSS dari CDN, untuk styling login form -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet" />
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source Sans 3:wght@400;500;600&display=swap" rel="stylesheet">

  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source Sans 3:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/main.css?v=20260519">
  <link rel="icon" href="/assets/media/images/logo.png" type="image/png" sizes="32x32">

  <style>
/* ==================================================================
   1. IMPORT FONT MODERN (POPPINS)
   ================================================================== 
   Kita gunakan font 'Source Sans 3' dari Google. Font ini sangat populer 
   karena kejelasan dan kesan modernnya.
*/
@import url('https://fonts.googleapis.com/css2?family=Source Sans 3:wght@400;500;600;700&display=swap');

/* ==================================================================
   3. HEADER HALAMAN & PENCARIAN
   ================================================================== */
.page-header {
    background: #ffffff;
    padding: 30px 0;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.03);
    margin-bottom: 30px;
}

.page-title {
    font-weight: 700;
    color: var(--dark-green);
    margin-bottom: 5px;
}

.search-box input {
    border-radius: 50px; /* Input pencarian bulat */
    padding: 12px 25px;
    border: 2px solid #e9ecef;
    background-color: #fcfcfc;
    transition: all 0.3s ease;
    font-weight: 500;
}

.search-box input:focus {
    box-shadow: none;
    border-color: var(--light-green);
    background-color: #fff;
}

/* ==================================================================
   4. STYLE TABEL MODERN & AESTHETIC (CLEAN LOOK)
   ================================================================== */
.table-responsive {
    background: #ffffff;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05); /* Bayangan besar tapi sangat halus */
}

.modern-table {
    border-collapse: separate;
    border-spacing: 0; /* Rapat, tidak ada jarak antar baris */
    width: 100%;
}

/* STYLE JUDUL KOLOM (YANG ANTUM MINTA DIPERJELAS) */
.modern-table thead th {
    font-family: var(--font-primary);
    font-size: 1rem; /* Ukuran font lebih besar */
    font-weight: 700; /* SANGAT TEBAL (Bold) */
    text-transform: uppercase; /* Huruf kapital semua agar tegas */
    letter-spacing: 1.5px; /* Jarak antar huruf direnggangkan */
    color: var(--text-dark); /* Warna hitam pekat */
    background-color: #ffffff;
    border-bottom: 3px solid #f0f2f5; /* Garis pemisah bawah yang tegas */
    padding: 20px; /* Ruang yang lega */
}

/* STYLE ISI TABEL */
.modern-table tbody tr {
    transition: all 0.2s ease-in-out;
}

/* Efek saat mouse diarahkan ke baris */
.modern-table tbody tr:hover {
    background-color: #f8fffb; /* Warna hijau sangat muda saat di-hover */
    transform: scale(1.01); /* Sedikit membesar agar interaktif */
}

.modern-table td {
    padding: 20px; /* Padding besar agar lega (aesthetic) */
    vertical-align: middle; /* Teks rata tengah secara vertikal */
    border-bottom: 1px solid #f0f2f5; /* Garis pemisah tipis antar baris */
    font-weight: 500; /* Ketebalan font sedang */
    font-size: 1rem;
}

/* Khusus Kolom Nama Lengkap */
.modern-table tbody tr td:first-child {
    font-weight: 600; /* Lebih tebal dari yang lain */
    color: var(--dark-green);
    font-size: 1.05rem;
}

/* Avatar Huruf Depan Nama */
.avatar-placeholder {
    width: 45px;
    height: 45px;
    background: linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%);
    color: var(--dark-green);
    font-size: 1.2rem;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

/* ==================================================================
   5. STYLE BADGE STATUS & KELAS (LEBIH MODERN)
   ================================================================== */
.status-badge {
    padding: 8px 14px;
    border-radius: 10px; /* Sudut sedikit mengkotak, modern */
    font-size: 0.9rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.status-aktif {
    background-color: #dcfce7; /* Hijau yang lebih segar */
    color: #166534;
}

.status-nonaktif {
    background-color: #fee2e2; /* Merah soft */
    color: #991b1b;
}

/* Status Pengabdian: Biru Langit (Kesan Mengabdi/Tenang) */
.status-pengabdian {
    background-color: #e0f2fe; /* Biru sangat muda */
    color: #0369a1; /* Biru tua */
    border: 1px solid #bae6fd;
}

/* Status Tendik: Oranye/Kuning (Kesan Pekerja/Profesional) */
.status-tendik {
    background-color: #fff7ed; /* Oranye sangat muda */
    color: #c2410c; /* Oranye tua */
    border: 1px solid #fed7aa;
}

/* Badge Kelas */
.kelas-badge {
    background-color: #ebf5ee; /* Latar belakang hijau nuansa sangat muda */
    color: var(--dark-green);
    padding: 8px 18px;
    border-radius: 12px;
    font-weight: 700; /* Sangat tebal agar jelas */
    font-size: 0.95rem;
    display: inline-block;
    border: 1px solid #ccead9; /* Garis pinggir halus */
}

/* =========================================
   TOMBOL KEMBALI KE BERANDA (CUSTOM)
   ========================================= */
.btn-back-home {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 35px;
    background-color: white; /* Dasar Putih */
    color: var(--dark-green); /* Teks Hijau Tua */
    border: 2px solid var(--primary-green); /* Garis Pinggir Hijau */
    border-radius: 50px; /* Membulat (Pill Shape) */
    text-decoration: none; /* Hilangkan garis bawah link */
    font-weight: 600;
    font-family: 'Source Sans 3', sans-serif;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 4px 10px rgba(0,0,0,0.05); /* Bayangan Halus */
}

/* Efek saat Mouse Menempel (Hover) */
.btn-back-home:hover {
    background-color: var(--primary-green); /* Berubah jadi Hijau */
    color: white; /* Teks jadi Putih */
    border-color: var(--primary-green);
    transform: translateY(-5px); /* Tombol naik sedikit */
    box-shadow: 0 10px 20px rgba(32, 108, 78, 0.2); /* Bayangan makin nyata */
}

/* Animasi Panah saat Hover */
.btn-back-home:hover i {
    transform: translateX(-5px); /* Panah bergerak ke kiri */
    transition: transform 0.3s ease;
}


/* ==================================================================
   6. RESPONSIVE MOBILE (CSS TAMBAHAN)
   ================================================================== */

/* Aturan untuk layar Tablet dan HP (Lebar di bawah 991px) */
@media screen and (max-width: 991px) {
    
    /* 1. Penyesuaian Header & Pencarian */
    .page-header {
        padding: 20px 0;
    }
    
    .search-bar-container {
        width: 100%;
        margin-bottom: 20px;
    }

    /* 2. Transformasi Tabel Menjadi Kartu (Card View) */
    /* Menyembunyikan Header Tabel (Nama, Status, dll) karena ganti format */
    .modern-table thead {
        display: none;
    }

    /* Mengubah Baris (TR) menjadi Kotak Kartu */
    .modern-table tbody tr {
        display: block;
        background: #fff;
        margin-bottom: 20px;
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.08); /* Bayangan kartu */
        border: 1px solid #e9ecef;
        padding: 15px;
    }

    /* Efek hover dinonaktifkan di HP agar tidak "berkedip" saat disentuh */
    .modern-table tbody tr:hover {
        transform: none;
        background-color: #fff;
    }

    /* Mengubah Sel (TD) menjadi baris-baris di dalam kartu */
    .modern-table tbody td {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #f0f2f5;
        font-size: 0.95rem;
        text-align: right; /* Isi data rata kanan */
    }

    /* Menghapus garis di baris terakhir dalam kartu */
    .modern-table tbody td:last-child {
        border-bottom: none;
    }

    /* --- LOGIKA LABEL OTOMATIS (PENTING) --- */
    /* Kita gunakan CSS ::before untuk memberi label karena header tabel disembunyikan */
    
    /* Kolom 1: Nama Lengkap (Kita buat rata tengah dan besar) */
    .modern-table tbody td:first-child {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding-bottom: 15px;
        border-bottom: 2px solid #206c4e; /* Garis pemisah hijau */
        margin-bottom: 10px;
    }
    
    .modern-table tbody td:first-child .d-flex {
        flex-direction: column; /* Avatar di atas nama */
        align-items: center !important;
    }
    
    .modern-table tbody td:first-child .avatar-placeholder {
        margin-right: 0 !important;
        margin-bottom: 10px;
        width: 60px !important; /* Avatar lebih besar di HP */
        height: 60px !important;
        font-size: 1.5rem !important;
    }

    /* Kolom 2: Status */
    .modern-table tbody td:nth-of-type(2)::before {
        content: "Status";
        font-weight: 700;
        color: #206c4e;
        float: left;
    }

    /* Kolom 3: Tahun Masuk */
    .modern-table tbody td:nth-of-type(3)::before {
        content: "Tahun Masuk";
        font-weight: 700;
        color: #206c4e;
    }

    /* Kolom 4: Kelas (Blok) */
    .modern-table tbody td:nth-of-type(4)::before {
        content: "Kelas";
        font-weight: 700;
        color: #206c4e;
    }

    /* Kolom 5: Kelas Detail */
    .modern-table tbody td:nth-of-type(5)::before {
        content: "Ruang/Detail";
        font-weight: 700;
        color: #206c4e;
    }
    

    
    /* Tombol Kembali */
    .btn-back-home {
        width: 100%; /* Tombol lebar penuh */
    }
}








  </style>

<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

  // Konfigurasi Firebase (Tetap disimpan jika Anda mengambil data santri dari database Firebase)
  const firebaseConfig = {
    apiKey: "AIzaSyDSZrEOjTYAvJOTzH8c99eHwJt7FCIIq94",
    authDomain: "direktori-santri-banin.firebaseapp.com",
    projectId: "direktori-santri-banin",
    storageBucket: "direktori-santri-banin.firebasestorage.app",
    messagingSenderId: "622158014579",
    appId: "1:622158014579:web:6ac791602acfad5ecde206",
    measurementId: "G-ZS75MKC952"
  };

  // Initialize Firebase (Hanya App, Auth tidak perlu)
  if (Object.keys(firebaseConfig).length > 0) {
      const app = initializeApp(firebaseConfig);
      console.log("Firebase initialized (Data Only).");
  }

  // ==================================================================
  // FUNGSI TAMPILAN LANGSUNG (TANPA LOGIN)
  // ==================================================================
  document.addEventListener('DOMContentLoaded', () => {
      const loginContainer = document.getElementById('login-container');
      const direktoriContent = document.getElementById('direktori-santri-content');
      
      // Navigasi (Opsional, untuk menyembunyikan menu login/logout)
      const loginNavItem = document.getElementById('loginNavItem');
      const logoutNavItem = document.getElementById('logoutNavItem');

      // LOGIKA UTAMA: Langsung sembunyikan login, langsung tampilkan konten
      if (loginContainer) loginContainer.style.display = 'none';
      if (direktoriContent) direktoriContent.style.display = 'block';

      // Atur menu navigasi: biarkan sama seperti beranda.
      
      console.log("Mode Publik: Akses langsung diberikan.");
  });
</script>
</head>
 
<body>

<?php include __DIR__ . '/partials.header.php'; ?>


<!-- Konten yang terlindungi, hanya ditampilkan setelah login -->
<div id="direktori-santri-content">
  <main>
      <section id="direktori-santri">
          <div class="container-fluid px-md-5">
              <header class="text-center section-header" data-aos="fade-up">
            <h2>Direktori Alumni</h2>
        </header>
              
              <div class="search-bar-container">
                  <i class="bi bi-search"></i>
                 <input 
    type="text" 
    class="form-control" 
    placeholder="Cari Santri, Kelas, atau Tahun..." 
    id="searchInput" 
>
              </div>

<div class="table-responsive p-4">
    <table class="table table-hover modern-table align-middle">
       <thead class="table-light">
            <tr>
                <th scope="col" width="35%">Nama Lengkap</th>
                <th scope="col" width="30%">Status</th>
                <th scope="col" width="30%">Tahun Masuk</th>
            </tr>
        </thead>
        <tbody id="santriTableBody">
            </tbody>
    </table>
</div>
          </div>
      </section>
      <div class="container text-center mb-5 mt-4">
          <a href="/" class="btn-back-home">
              <i class="fa-solid fa-arrow-left me-2"></i> Kembali ke Beranda
          </a>
      </div>
  </main>
  <div id="searchOverlay">
    <span id="closeSearch" class="close-search" title="Tutup">×</span>
    <div class="search-box">
      <form class="d-flex gap-2" action="/pencarian.html" method="GET">
        <input type="text" name="s" class="form-control" autocomplete="off" placeholder="Cari di seluruh situs..." required />
        <button type="submit"><i class="bi bi-search"></i> CARI</button>
      </form>
    </div>
  </div>
</div>


<?php include __DIR__ . '/partials.footer.php'; ?>
<a href="#top" id="backToTop" title="Kembali ke atas">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
    <path d="M10,0L9.4,0.6L0.8,9.1l1.2,1.2l7.1-7.1V20h1.7V3.3l7.1,7.1l1.2-1.2l-8.5-8.5L10,0z"></path>
  </svg>
</a>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
 document.addEventListener('DOMContentLoaded', () => {
        
        const tableBody = document.getElementById('santriTableBody');
        const searchInput = document.getElementById('searchInput'); 


        const santriData = [
            {"No": 1, "Status": "Alumni", "Tahun Masuk": 2017, "Nama lengkap": "Abdullah Bahrudin Hambali"},
            {"No": 2, "Status": "Alumni", "Tahun Masuk": 2016, "Nama lengkap": "Abdurohman Nul Azis"},
            {"No": 3, "Status": "Alumni", "Tahun Masuk": 2016, "Nama lengkap": "Achmad Zidan Fazri Zazuli"},
            {"No": 4, "Status": "Alumni", "Tahun Masuk": 2018, "Nama lengkap": "Ahmad Fauzan Juarsa Putra"},
            {"No": 5, "Status": "Alumni", "Tahun Masuk": 2015, "Nama lengkap": "Alfarizi Yusup Abdillah"},
            {"No": 6, "Status": "Alumni", "Tahun Masuk": 2016, "Nama lengkap": "Asep Maulana"},
            {"No": 7, "Status": "Alumni", "Tahun Masuk": 2015, "Nama lengkap": "Avif Pudiansah"},
            {"No": 8, "Status": "Alumni", "Tahun Masuk": 2017, "Nama lengkap": "Azki Nur Faiz M. Haikal"},
            {"No": 9, "Status": "Alumni", "Tahun Masuk": 2016, "Nama lengkap": "Cucu Ahmad Fathurrohman"},
            {"No": 10, "Status": "Alumni", "Tahun Masuk": 2017, "Nama lengkap": "Deni Supriatna"},
            {"No": 11, "Status": "Alumni", "Tahun Masuk": 2019, "Nama lengkap": "Dzikri Fathurrahman"},
            {"No": 12, "Status": "Alumni", "Tahun Masuk": 2016, "Nama lengkap": "Fauzan Taufiqurrohman"},
            {"No": 13, "Status": "Alumni", "Tahun Masuk": 2017, "Nama lengkap": "Imam Robana"},
            {"No": 14, "Status": "Alumni", "Tahun Masuk": 2016, "Nama lengkap": "Mochamad Farhan Nuri Abdulloh"},
            {"No": 15, "Status": "Alumni", "Tahun Masuk": 2017, "Nama lengkap": "Mochamad Naufal Taufiq"},
            {"No": 16, "Status": "Alumni", "Tahun Masuk": 2016, "Nama lengkap": "Mochamad Tegar Pamungkas"},
            {"No": 17, "Status": "Alumni", "Tahun Masuk": 2016, "Nama lengkap": "Muhamad Zaki"},
            {"No": 18, "Status": "Alumni", "Tahun Masuk": 2017, "Nama lengkap": "Muhammad Ibnu Ruslan"},
            {"No": 19, "Status": "Alumni", "Tahun Masuk": 2017, "Nama lengkap": "Muhammad Naufal"},
            {"No": 20, "Status": "Alumni", "Tahun Masuk": 2016, "Nama lengkap": "Muhammad Nijar Alwansyarisi"},
            {"No": 21, "Status": "Alumni", "Tahun Masuk": 2016, "Nama lengkap": "Muhammad Rosyidin Ash Shiddiq"},
            {"No": 22, "Status": "Alumni", "Tahun Masuk": 2016, "Nama lengkap": "Muhammad Sya'Banul Khoir"},
            {"No": 23, "Status": "Alumni", "Tahun Masuk": 2017, "Nama lengkap": "Muhammad Zainal Abidin"},
            {"No": 24, "Status": "Alumni", "Tahun Masuk": 2016, "Nama lengkap": "Nu'Man Naufal Haedar"},
            {"No": 25, "Status": "Alumni", "Tahun Masuk": 2016, "Nama lengkap": "Rifki Murtadlo"},
            {"No": 26, "Status": "Alumni", "Tahun Masuk": 2017, "Nama lengkap": "Rifqi Ahmadi Taufik"},
            {"No": 27, "Status": "Alumni", "Tahun Masuk": 2016, "Nama lengkap": "Riyan Maulana"},
            {"No": 28, "Status": "Alumni", "Tahun Masuk": 2016, "Nama lengkap": "Rizra Fathur Syaban"},
            {"No": 29, "Status": "Alumni", "Tahun Masuk": 2016, "Nama lengkap": "Saeful Mutaqin"},
            {"No": 30, "Status": "Alumni", "Tahun Masuk": 2016, "Nama lengkap": "Yogi Muhammad Lukman"},
            {"No": 31, "Status": "Alumni", "Tahun Masuk": 2017, "Nama lengkap": "Zikri Dwi Alfiansyah"},
            {"No": 32, "Status": "Alumni", "Tahun Masuk": 2014, "Nama lengkap": "Azka Muhammad Arrifa'I"},
            {"No": 33, "Status": "Alumni", "Tahun Masuk": 2015, "Nama lengkap": "Deden Kamaludin"},
            {"No": 34, "Status": "Alumni", "Tahun Masuk": 2014, "Nama lengkap": "Deden Muhammad Fazrin"},
            {"No": 35, "Status": "Alumni", "Tahun Masuk": 2014, "Nama lengkap": "Edo Rossi Satrio Jati"},
            {"No": 36, "Status": "Alumni", "Tahun Masuk": 2013, "Nama lengkap": "Fathul Jeudid Kamalludin"},
            {"No": 37, "Status": "Alumni", "Tahun Masuk": 2015, "Nama lengkap": "Ilham Muhammad Ependi"},
            {"No": 38, "Status": "Alumni", "Tahun Masuk": 2015, "Nama lengkap": "M Hasan Ismail"},
            {"No": 39, "Status": "Alumni", "Tahun Masuk": 2016, "Nama lengkap": "M. Farid Ardya Zainurrafi"},
            {"No": 40, "Status": "Alumni", "Tahun Masuk": 2015, "Nama lengkap": "M. Mustaidz Billah"},
            {"No": 41, "Status": "Alumni", "Tahun Masuk": 2015, "Nama lengkap": "Maqdum Ibrahim"},
            {"No": 42, "Status": "Alumni", "Tahun Masuk": 2018, "Nama lengkap": "Miftahudin"},
            {"No": 43, "Status": "Alumni", "Tahun Masuk": 2015, "Nama lengkap": "Mochamad Lutfi Nurul Faiz"},
            {"No": 44, "Status": "Alumni", "Tahun Masuk": 2015, "Nama lengkap": "Mohammad Faiz Hanif"},
            {"No": 45, "Status": "Alumni", "Tahun Masuk": 2015, "Nama lengkap": "Muhamad Raka Handika"},
            {"No": 46, "Status": "Alumni", "Tahun Masuk": 2015, "Nama lengkap": "Muhammad Farhan Maulana"},
            {"No": 47, "Status": "Alumni", "Tahun Masuk": 2014, "Nama lengkap": "Muhammad Hilman Najib Muzaddy"},
            {"No": 48, "Status": "Alumni", "Tahun Masuk": 2014, "Nama lengkap": "Muhammad Ihsanul Muttaqin"},
            {"No": 49, "Status": "Alumni", "Tahun Masuk": 2016, "Nama lengkap": "Muhammad Khudlori"},
            {"No": 50, "Status": "Alumni", "Tahun Masuk": 2015, "Nama lengkap": "Nizar Akbar Abdillah"},
            {"No": 51, "Status": "Alumni", "Tahun Masuk": 2013, "Nama lengkap": "Noval M. Nuer"},
            {"No": 52, "Status": "Alumni", "Tahun Masuk": 2015, "Nama lengkap": "Rif'At Muhammad Naufal"},
            {"No": 53, "Status": "Pengabdian", "Tahun Masuk": 2019, "Nama lengkap": "Abdul Lathif"},
            {"No": 54, "Status": "Pengabdian", "Tahun Masuk": 2017, "Nama lengkap": "Abdul Sidik"},
            {"No": 55, "Status": "Pengabdian", "Tahun Masuk": 2016, "Nama lengkap": "Agus Munawar"},
            {"No": 56, "Status": "Pengabdian", "Tahun Masuk": 2017, "Nama lengkap": "Arif Hidayatuloh"},
            {"No": 57, "Status": "Pengabdian", "Tahun Masuk": 2017, "Nama lengkap": "Asep Abdul Kohar"},
            {"No": 58, "Status": "Tendik", "Tahun Masuk": 2016, "Nama lengkap": "Dapid Aditia Maulana"},
            {"No": 59, "Status": "Pengabdian", "Tahun Masuk": 2015, "Nama lengkap": "Dika Risaleh Ramadhan"},
            {"No": 60, "Status": "Pengabdian", "Tahun Masuk": 2018, "Nama lengkap": "Fikri Ahmad Syauqi"},
            {"No": 61, "Status": "Pengabdian", "Tahun Masuk": 2017, "Nama lengkap": "Habib Aliansyah"},
            {"No": 62, "Status": "Pengabdian", "Tahun Masuk": 2017, "Nama lengkap": "Kanzha Praditya Syahid"},
            {"No": 63, "Status": "Pengabdian", "Tahun Masuk": 2018, "Nama lengkap": "Khairul Raffy Iqsan Fauzhy"},
            {"No": 64, "Status": "Pengabdian", "Tahun Masuk": 2017, "Nama lengkap": "M. Candra Nuriryanto"},
            {"No": 65, "Status": "Pengabdian", "Tahun Masuk": 2017, "Nama lengkap": "M. Reza Alhusaeni"},
            {"No": 66, "Status": "Pengabdian", "Tahun Masuk": 2018, "Nama lengkap": "Moch. Arifin Mustofa"},
            {"No": 67, "Status": "Pengabdian", "Tahun Masuk": 2017, "Nama lengkap": "Mohamad Akmal Hermawan"},
            {"No": 68, "Status": "Pengabdian", "Tahun Masuk": 2017, "Nama lengkap": "Muhamad Azmi Raihan Taufik"},
            {"No": 69, "Status": "Pengabdian", "Tahun Masuk": 2015, "Nama lengkap": "Muhamad Hoerudin Nawawif"},
            {"No": 70, "Status": "Pengabdian", "Tahun Masuk": 2015, "Nama lengkap": "Muhamad Ihsan Nurzaen"},
            {"No": 71, "Status": "Pengabdian", "Tahun Masuk": 2016, "Nama lengkap": "Muhamad Zainal Abidin"},
            {"No": 72, "Status": "Pengabdian", "Tahun Masuk": 2017, "Nama lengkap": "Muhammad Hafidz Sholihin"},
            {"No": 73, "Status": "Pengabdian", "Tahun Masuk": 2017, "Nama lengkap": "Patra Byansyah Maulana Sidik"},
            {"No": 74, "Status": "Pengabdian", "Tahun Masuk": 2017, "Nama lengkap": "Satriazy Almadzumy Rizky Abdillah"},
            {"No": 75, "Status": "Pengabdian", "Tahun Masuk": 2017, "Nama lengkap": "Syaripudin"},
            {"No": 76, "Status": "Pengabdian", "Tahun Masuk": 2018, "Nama lengkap": "Syamsul Fajar"},
            {"No": 77, "Status": "Pengabdian", "Tahun Masuk": 2014, "Nama lengkap": "Muhammad Ariq Rabbany"},
            {"No": 78, "Status": "Pengabdian", "Tahun Masuk": 2015, "Nama lengkap": "Pery Kurniawan"},
            {"No": 79, "Status": "Tendik", "Tahun Masuk": 2013, "Nama lengkap": "Abdul Rojak"},
            {"No": 80, "Status": "Tendik", "Tahun Masuk": 2015, "Nama lengkap": "Ade Setiawan"},
            {"No": 81, "Status": "Tendik", "Tahun Masuk": 2013, "Nama lengkap": "Adnan Muzaki"},
            {"No": 82, "Status": "Tendik", "Tahun Masuk": 2015, "Nama lengkap": "Ahmad Wahya"},
            {"No": 83, "Status": "Tendik", "Tahun Masuk": 2014, "Nama lengkap": "Ardi Erliansah"},
            {"No": 84, "Status": "Tendik", "Tahun Masuk": 2014, "Nama lengkap": "Azali Deva Muhamad"},
            {"No": 85, "Status": "Tendik", "Tahun Masuk": 2013, "Nama lengkap": "Cahya"},
            {"No": 86, "Status": "Tendik", "Tahun Masuk": 2013, "Nama lengkap": "Dadang Jalaludin"},
            {"No": 87, "Status": "Tendik", "Tahun Masuk": 2015, "Nama lengkap": "Deden Tajudin"},
            {"No": 88, "Status": "Tendik", "Tahun Masuk": 2015, "Nama lengkap": "Dimas Lutfi Husen M. Dimyati"},
            {"No": 89, "Status": "Tendik", "Tahun Masuk": 2013, "Nama lengkap": "Gun Gun Gunawan"},
            {"No": 90, "Status": "Tendik", "Tahun Masuk": 2015, "Nama lengkap": "Mahmud"},
            {"No": 91, "Status": "Tendik", "Tahun Masuk": 2013, "Nama lengkap": "Moch Mukti Fauzi"},
            {"No": 92, "Status": "Tendik", "Tahun Masuk": 2014, "Nama lengkap": "Mochammad Fachrudin"},
            {"No": 93, "Status": "Tendik", "Tahun Masuk": 2014, "Nama lengkap": "Muhamad Arief Ferdyansyah"},
            {"No": 94, "Status": "Tendik", "Tahun Masuk": 2014, "Nama lengkap": "Muhamad Paqih Abdul Qodir"},
            {"No": 95, "Status": "Tendik", "Tahun Masuk": 2013, "Nama lengkap": "Muhamad Salahudien Hambali"},
            {"No": 96, "Status": "Tendik", "Tahun Masuk": 2014, "Nama lengkap": "Parhan Suhanda"},
            {"No": 97, "Status": "Tendik", "Tahun Masuk": 2014, "Nama lengkap": "Rizqi Abdul Fattah"},
            {"No": 98, "Status": "Tendik", "Tahun Masuk": 2013, "Nama lengkap": "Sansan Suherlan"},
            {"No": 99, "Status": "Tendik", "Tahun Masuk": 2015, "Nama lengkap": "Taufik Rasyidin Nugraha"},
            {"No": 100, "Status": "Tendik", "Tahun Masuk": 2014, "Nama lengkap": "Toni Abdullah"},
            {"No": 101, "Status": "Tendik", "Tahun Masuk": 2013, "Nama lengkap": "Ucu Jaja Jamaludin"},
            {"No": 102, "Status": "Tendik", "Tahun Masuk": 2013, "Nama lengkap": "Wail Akhyar Jamaludin"}
        ];


        // ==========================================
        // FUNGSI RENDER TABEL (5 KOLOM)
        // ==========================================
        const populateTable = (data) => {
            tableBody.innerHTML = ''; 

            data.forEach((santri) => {
                // Ambil data
                const nama = (santri["Nama lengkap"] || '-').trim();
                const rawStatus = (santri["Status"] || '-').trim().toLowerCase();
                const tahunMasuk = santri["Tahun Masuk"] || '-';

                // Logika Warna & Ikon Status (LENGKAP)
                let statusClass = 'status-nonaktif';
                let statusIcon = 'bi-x-circle';
                let statusText = 'Tidak Aktif';

                if (rawStatus.includes('aktif')) {
                    statusClass = 'status-aktif';
                    statusIcon = 'bi-check-circle-fill';
                    statusText = 'Aktif';
                } else if (rawStatus.includes('boyong') || rawStatus.includes('pindah')) {
                    statusText = 'Boyong/Pindah';
                } else if (rawStatus.includes('alumni')) {
                    statusClass = 'status-alumni'; 
                    statusIcon = 'bi-mortarboard-fill'; // Ikon Topi Toga
                    statusText = 'Alumni';
                } else if (rawStatus.includes('waqof')) {
                     statusClass = 'status-waqof'; 
                     statusIcon = 'bi-pause-circle-fill'; // Ikon Pause
                     statusText = 'Waqof';
                } else if (rawStatus.includes('pengabdian')) {
                     statusClass = 'status-pengabdian'; 
                     statusIcon = 'bi-person-badge-fill'; // Ikon Kartu Tanda Pengenal
                     statusText = 'Pengabdian';
                } else if (rawStatus.includes('tendik')) {
                     statusClass = 'status-tendik'; 
                     statusIcon = 'bi-briefcase-fill'; // Ikon Tas Kerja
                     statusText = 'Tendik';
                }

                // Render Baris (5 Kolom)
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <div class="d-flex align-items-center">
                            <div class="avatar-placeholder me-3" style="width:40px; height:40px; background:#e9ecef; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#206c4e; font-weight:bold;">
                                ${nama.charAt(0)}
                            </div>
                            <span>${nama}</span>
                        </div>
                    </td>
                    <td>
                        <span class="status-badge ${statusClass}">
                            <i class="bi ${statusIcon}"></i> ${statusText}
                        </span>
                    </td>
                    <td style="font-family: 'Source Sans 3'; font-weight:500;">${tahunMasuk}</td>
                    
                `;
                tableBody.appendChild(row);
            });

            // Baris Total
            if (data.length > 0) {
                const totalRow = document.createElement('tr');
                totalRow.style.backgroundColor = '#f0fdf4';
                totalRow.style.borderTop = '2px solid #206c4e';
                
                // colspan jadi 5 karena kolom bertambah
                totalRow.innerHTML = `
                    <td colspan="5" class="text-center py-3" style="color: #1a3e2c;">
                        <span style="font-weight: 500;">Total Alumni Ditampilkan:</span> 
                        <span style="font-weight: 800; font-size: 1.2rem; margin-left: 10px;">${data.length} Orang</span>
                    </td>
                `;
                tableBody.appendChild(totalRow);
            }
        };

        // ==========================================
        // FUNGSI PENCARIAN (Cari di semua kolom)
        // ==========================================
        const filterData = () => {
            if (!searchInput) return; 
            
            const query = searchInput.value.toLowerCase().trim();

            const filteredData = santriData.filter(santri => {
                const nama = (santri["Nama lengkap"] || '').toLowerCase();
                const tahun = (santri["Tahun Masuk"] || '').toString().toLowerCase();
                const status = (santri["Status"] || '').toLowerCase();

                return nama.includes(query) || 
                       tahun.includes(query) ||
                       status.includes(query);
            });

            populateTable(filteredData);

            if (filteredData.length === 0) {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="5" class="text-center py-5 text-muted">
                            <i class="bi bi-search display-6 d-block mb-3"></i>
                            <h5>Data tidak ditemukan</h5>
                        </td>
                    </tr>
                `;
            }
        };

        if (searchInput) {
            searchInput.addEventListener('keyup', filterData);
        }
        
        // Load data awal
        populateTable(santriData);
    });
</script>

<script src="/assets/js/api-config.js"></script>
<script>
/* ERP_WEBSITE_INTEGRATION_V1 */
(function(){
  const tableBody=document.getElementById('santriTableBody');
  const searchInput=document.getElementById('searchInput');
  if(!tableBody) return;
  let rows=[];
  async function getJson(path){
    const url = (window.ASF_API_BASE || "") + path;
    const res = await fetch(url);
    if(!res.ok) throw new Error('erp_fetch_failed');
    return await res.json();
  }
  function render(items){
    if(!items.length){ tableBody.innerHTML='<tr><td colspan="3" class="text-center text-muted py-4">Belum ada data alumni.</td></tr>'; return; }
    tableBody.innerHTML=items.map(s=>`<tr><td><div class="d-flex align-items-center"><div class="avatar-placeholder me-3">${(s.full_name||'?').charAt(0)}</div><span>${s.full_name||'-'}</span></div></td><td><span class="status-badge status-alumni"><i class="bi bi-mortarboard-fill"></i> Alumni</span></td><td>${(s.created_at||'').slice(0,4)||'-'}</td></tr>`).join('') + `<tr style="background:#f0fdf4"><td colspan="3" class="text-center"><strong>Total Alumni Ditampilkan: ${items.length} Orang</strong></td></tr>`;
  }
  function apply(){ const q=(searchInput?.value||'').toLowerCase(); render(rows.filter(x=>(`${x.full_name} ${x.class_name}`).toLowerCase().includes(q))); }
  getJson('/api/public/students?status=alumni').then(({ok,data})=>{ rows=ok&&Array.isArray(data)?data:[]; apply(); }).catch(()=>{ tableBody.innerHTML='<tr><td colspan="3" class="text-center text-danger">Gagal memuat data ERP.</td></tr>'; });
  if(searchInput) searchInput.addEventListener('input',apply);
})();
</script>

<script src='/assets/js/main.js'></script>
</body>
</html>













<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Profile Guru & Staf Pengajar - Ponpes Asy-Syifaa Wal Mahmuudiyyah</title>
<meta name="description" content="Mengenal Profile Dewan Guru, Asatidz, dan Staf Pengajar di Pondok Pesantren Islam Internasional Terpadu Asy-Syifaa Wal Mahmuudiyyah Sumedang. Dibimbing langsung oleh Abuya K.H. Muhammad Muhyiddin beserta para Mu'allim yang berdedikasi.">
<meta name="keywords" content="Guru Asy-Syifaa, Asatidz Sumedang, Profile Pengajar Pesantren, Abuya KH Muhammad Muhyiddin, Ponpes Asy-Syifaa Wal Mahmuudiyyah">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />
<link rel="icon" href="/assets/media/images/logo.png" type="image/png" sizes="32x32">

  <link rel="stylesheet" href="/css/style.css?v=20260517" />
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source Sans 3:wght@400;500;600&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="/assets/css/main.css?v=20260519">
   <style>/* Styling Kartu Guru agar mirip referensi */
/* 1. Styling Container Utama Kartu */
.guru-card {
    background: var(--card-bg);
    border-radius: 16px; /* Sudut melengkung modern */
    border: none;
    overflow: hidden; /* Agar gambar tidak keluar dari lengkungan */
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); /* Bayangan halus (Soft Shadow) */
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Efek membal saat hover */
    display: flex;
    flex-direction: column;
    height: 100%;
}

/* Efek saat mouse diarahkan ke kartu (Hover) */
.guru-card:hover {
    transform: translateY(-10px); /* Kartu naik sedikit */
    box-shadow: 0 20px 40px rgba(32, 108, 78, 0.15); /* Bayangan menebal warna hijau pudar */
}

/* 2. Styling Container Gambar */
.guru-img-container {
    position: relative;
    width: 100%;
    padding-top: 125%; /* Aspect Ratio 4:5 (Standar Instagram Portrait) agar rapi */
    overflow: hidden;
    background-color: #f0f0f0;
}

.guru-img-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Mencegah gambar gepeng */
    object-position: top center; /* Fokus ke wajah (atas) */
    transition: transform 0.6s ease;
}

/* Efek Zoom in gambar saat hover */
.guru-card:hover .guru-img-container img {
    transform: scale(1.1);
}

/* Overlay gradient halus di bawah gambar */
.guru-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.guru-card:hover .guru-overlay {
    opacity: 1;
}

/* 3. Styling Konten Text - Perkecil padding */
.guru-content {
    padding: 1rem; /* Diubah dari 1.5rem menjadi 1rem agar lebih hemat tempat */
    text-align: center;
    background-color: #fff;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}

/* 4. Styling JABATAN - Perkecil ukuran font dan padding */
.guru-jabatan {
    display: inline-block;
    background-color: rgba(32, 108, 78, 0.1);
    color: var(--pesantren-green);
    font-size: 0.65rem; /* Diubah dari 0.75rem */
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 4px 12px; /* Padding diperkecil */
    border-radius: 50px;
    margin-bottom: 8px;
    border: 1px solid rgba(32, 108, 78, 0.2);
}

/* 5. Styling Nama Guru - Perkecil font agar tidak terlalu turun ke bawah */
.guru-nama {
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 0.95rem; /* Diubah dari 1.15rem */
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.3;
    margin-bottom: 10px;
}

/* 6. Garis Dekorasi Kecil */
.guru-line {
    width: 40px;
    height: 3px;
    background-color: var(--pesantren-gold); /* Aksen emas */
    border-radius: 2px;
    margin-top: auto; /* Memaksa garis ke bawah jika konten tidak rata */
    transition: width 0.3s ease;
}

.guru-card:hover .guru-line {
    width: 80px; /* Garis memanjang saat hover */
    background-color: var(--pesantren-green);
}

/* Responsif untuk layar HP kecil */
@media (max-width: 576px) {
    .guru-content {
        padding: 1.25rem;
    }
    .guru-nama {
        font-size: 1rem;
    }
}
</style>
<script src="/assets/js/main.js"></script>
  </head>
<body>

<?php include __DIR__ . '/partials.header.php'; ?>

<section id="guru-staf" class="py-5 position-relative bg-light">
    <div class="bg-decor-circle-left"></div>

    <div class="container">
        <div class="text-start mb-5" data-aos="fade-up">
            <h1 class="text-start">Guru & Staf</h1>
            <p class="text-muted mt-2 mb-0" style="max-width: 500px;">
                Mengenal wajah-wajah pendidik yang berdedikasi membimbing santri dengan keilmuan dan akhlak mulia.
            </p>
        </div>

        <div class="row row-cols-2 row-cols-md-4 row-cols-lg-5 g-3" data-aos="fade-up" data-aos-delay="100">
            
            <div class="col">
                <div class="guru-card h-100"> <div class="guru-img-container">
                        <img src="/assets/media/profile-pondok/abuya-1.png" alt="Abuya K.H. Muhammad Muhyiddin" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Mudir 'Am</div>
                        <h4 class="guru-nama">Prof. Dr. (H.C.) Abuya K.H. Muhammad Muhyiddin Abdul Qodir Al-Manafi, MA</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muhammad Tsabit" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Rois 'Am</div>
                        <h4 class="guru-nama">Mu'allim Muhammad Tsabit</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muhammad Idris Syafei" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Muhammad Idris Syafei</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Syarif Muhammad Al Hasani" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Syarif Muhammad Al Hasani</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Maulana Jafar Shodiq" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Maulana Jafar Shodiq</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Taufiq Sholeh" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Taufiq Sholeh</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muhammad Hasanuddin" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Muhammad Hasanuddin</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muhammad Iqbal" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Muhammad Iqbal</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muhammad Abu Yazid" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Muhammad Abu Yazid</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Firman Hambali" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Firman Hambali</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Deden Maoludin" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Deden Maoludin</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Acep Yana Nurdiana" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Acep Yana Nurdiana</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Komarudin" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Komarudin</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Firman Jayusman" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Firman Jayusman</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Ade Setiawan" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Ade Setiawan</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Mochammad Wassy Abdul Basith" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Mochammad Wassy Abdul Basith</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Sansan Suherlan" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Sansan Suherlan</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muhammad Umar Al Kaff" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Muhammad Umar Al Kaff</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Gun Gun Gunawan" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Gun Gun Gunawan</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Jajang Nurjaman" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Jajang Nurjaman</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Abdul Rojak" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Abdul Rojak</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Taufik" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Taufik</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Adnan Muzaki" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Adnan Muzaki</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Cahya" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Cahya</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Dadang Jalaludin" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Dadang Jalaludin</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Moch Mukti Fauzi" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Moch Mukti Fauzi</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muhamad Salahudien Hambali" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Muhamad Salahudien Hambali</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Ucu Jaja Jamaludin" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Ucu Jaja Jamaludin</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Wail Akhyar Jamaludin" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Wail Akhyar Jamaludin</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Ardi Erliansah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Ardi Erliansah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Azali Deva Muhamad" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Azali Deva Muhamad</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Toni Abdullah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Toni Abdullah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Mochammad Fachrudin" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Mochammad Fachrudin</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Parhan Suhanda" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Parhan Suhanda</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Ahmad Wahya" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Ahmad Wahya</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Deden Tajudin" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Deden Tajudin</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Dimas Lutfi Husen M. Dimyati" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Dimas Lutfi Husen M. Dimyati</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Mahmud" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Mahmud</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muhamad Arief Ferdyansyah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Muhamad Arief Ferdyansyah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Taufik Rasyidin Nugraha" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allim Taufik Rasyidin Nugraha</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

<div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Hj. Syifa Alawiyah KH" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Ustadzah Hj. Syifa Alawiyah KH</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Saodah Uqbah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Ustadzah Saodah Uqbah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Hj. Zulfa Khodijah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Ustadzah Hj. Zulfa Khodijah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Hj. Salma Ummu Habibah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Ustadzah Hj. Salma Ummu Habibah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Hj. Shofiyyah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Ustadzah Hj. Shofiyyah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Dewi Hasna" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Ustadzah Dewi Hasna</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Dini Sa'diyah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Ustadzah Dini Sa'diyah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Mardliyah Azda Putri B" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Ustadzah Mardliyah Azda Putri B.</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Allra Septiani Subarna" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Ustadzah Allra Septiani Subarna</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Syarifah Zulfa Al Jufri" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Ustadzah Syarifah Zulfa Al Jufri</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Hj. Aisyah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Ustadzah Hj. Aisyah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Hj. Nabela" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Ustadzah Hj. Nabela</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Hj. Khodijah Adillatul Millah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Ustadzah Hj. Khodijah Adillatul Millah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Nadya Khodijah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Nadya Khodijah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Mega Syara Balqiyah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Mega Syara Balqiyah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Suci Nur Sholehah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Ustadzah Suci Nur Sholehah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Sri Wulan" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Sri Wulan</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Witri" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Witri</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Rina Oktavia" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Rina Oktavia</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Siti Romlah Habibah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Siti Romlah Habibah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Annisa April" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Annisa April</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Nurfadilah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Nurfadilah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Indah Nur Aisyah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Indah Nur Aisyah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Hamidhah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Hamidhah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Anisa Icha" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Anisa Icha</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Rofi Fakhriyyah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Rofi Fakhriyyah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Jelita Ayu Sukmana" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Jelita Ayu Sukmana</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Siti Nur Ilmi" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Siti Nur Ilmi</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Rina Mulyani" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Rina Mulyani</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Zulfa Aisyah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Zulfa Aisyah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Nur'aini Pusparini" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Nur'aini Pusparini</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Hafsoh Adibah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Hafsoh Adibah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Gita Dwi Pratiwi" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Gita Dwi Pratiwi</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Nur Fitri Meliani" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Nur Fitri Meliani</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Hj. Ruqoyyah Arsyad" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Hj. Ruqoyyah Arsyad</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Siti Hakimah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Siti Hakimah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Ustadzah Hj. Syamsi" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Ustadzah Hj. Syamsi</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Syifa Maulidina Khodijah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Syifa Maulidina Khodijah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Siti Hasna Lathifah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Siti Hasna Lathifah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Zakiyyah Rabiah A" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Zakiyyah Rabiah A.</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Ika Siti Khodijah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Ika Siti Khodijah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Resti Damayanti" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Resti Damayanti</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Muallimah Fathimah Rosyidah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Muallimah Fathimah Rosyidah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Mu'allimah Aisyah Tholibah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allimah Aisyah Tholibah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>

            <div class="col">
                <div class="guru-card h-100">
                    <div class="guru-img-container">
                        <img src="/assets/media/images/foto-mudir.jpg" alt="Mu'allimah Iis Midah" loading="lazy" class="img-fluid w-100">
                        <div class="guru-overlay"></div>
                    </div>
                    <div class="guru-content">
                        <div class="guru-jabatan">Pengajar</div>
                        <h4 class="guru-nama">Mu'allimah Iis Midah</h4>
                        <div class="guru-line"></div>
                    </div>
                </div>
            </div>














        </div> </div> </section>

 
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











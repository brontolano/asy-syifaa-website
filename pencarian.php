<?php
declare(strict_types=1);

/**
 * @return array<int, array{title:string,slug:string,folder_name:string,description:string,cover:string}>
 */
function buildGallerySearchIndex(string $baseDir): array
{
    $jsonPath = $baseDir . '/assets/data/gallery-local.json';
    if (!is_file($jsonPath)) {
        return [];
    }

    $raw = file_get_contents($jsonPath);
    $rows = is_string($raw) ? json_decode($raw, true) : null;
    if (!is_array($rows)) {
        return [];
    }

    $items = [];
    foreach ($rows as $row) {
        if (!is_array($row)) {
            continue;
        }
        $slug = trim((string)($row['slug'] ?? ''));
        if ($slug === '') {
            continue;
        }
        $title = trim((string)($row['title'] ?? $slug));
        $folder = trim((string)($row['folder_name'] ?? $title));
        $desc = trim((string)($row['description'] ?? 'Dokumentasi kegiatan'));

        $cover = '/assets/media/images/hero-background.jpg';
        $dirs = [
            ['fs' => $baseDir . '/img/' . $folder, 'web' => '/img/' . $folder],
            ['fs' => $baseDir . '/Galeri/img/' . $folder, 'web' => '/Galeri/img/' . $folder],
            ['fs' => $baseDir . '/assets/media/gallery/' . $folder, 'web' => '/assets/media/gallery/' . $folder],
        ];

        foreach ($dirs as $dir) {
            if (!is_dir($dir['fs'])) {
                continue;
            }
            $files = scandir($dir['fs']);
            if ($files === false) {
                continue;
            }
            $images = [];
            foreach ($files as $file) {
                if ($file === '.' || $file === '..') {
                    continue;
                }
                $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                if (in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif'], true)) {
                    $images[] = $file;
                }
            }
            if ($images === []) {
                continue;
            }
            natsort($images);
            $first = (string)array_values($images)[0];
            $cover = $dir['web'] . '/' . rawurlencode($first);
            break;
        }

        $items[] = [
            'title' => $title,
            'slug' => $slug,
            'folder_name' => $folder,
            'description' => $desc,
            'cover' => $cover,
        ];
    }

    return $items;
}

$gallerySearchIndex = buildGallerySearchIndex(__DIR__);
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Pencarian - Pondok Pesantren Islam Internasional Terpadu Asy-Syifaa Wal Mahmuudiyyah Sumedang</title>

  <meta name="description" content="Temukan informasi lengkap seputar Pondok Pesantren Islam Internasional Terpadu Asy-Syifaa Wal Mahmuudiyyah Sumedang di sini. Gunakan fitur pencarian ini untuk menelusuri info pendaftaran (PPDB), direktori santri dan pengajar, Profile pondok, kurikulum, hingga galeri kegiatan dan berita terbaru." />

  <meta name="keywords" content="Pencarian Asy-Syifaa, Arsip Digital Pesantren, Data Santri, PPDB Sumedang, Asy-Syifaa Wal Mahmuudiyyah, Info Pesantren, Berita Asy-Syifaa" />

  <meta name="author" content="Tim IT Asy-Syifaa Wal Mahmuudiyyah" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet" />
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source Sans 3:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="icon" href="/assets/media/images/logo.png" type="image/png" sizes="32x32">


  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source Sans 3:wght@400;500;600&display=swap" rel="stylesheet">
  
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/main.css?v=20260519">
    <style>

/* =========================================
   MODERN SEARCH PAGE STYLES (2026 UPDATE)
   ========================================= */

.search-page-body {
    background-color: #f8f9fa;
}

.text-dark-green {
    color: var(--dark-green);
}

/* Header & Search Input Besar */
.big-search-box {
    max-width: 600px;
    margin: 0 auto;
    position: relative;
}

.big-search-input {
    padding: 1.2rem 1.2rem 1.2rem 3.5rem; /* Padding kiri untuk ikon */
    border-radius: 50px;
    border: 2px solid #e9ecef;
    box-shadow: 0 5px 20px rgba(0,0,0,0.05);
    font-size: 1.1rem;
    transition: all 0.3s ease;
}

.big-search-input:focus {
    border-color: var(--primary-green);
    box-shadow: 0 8px 25px rgba(32, 108, 78, 0.15);
}

.search-icon-input {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #adb5bd;
    font-size: 1.2rem;
    z-index: 10;
}

.btn-search-action {
    position: absolute;
    right: 8px;
    top: 6px;
    bottom: 6px;
    border-radius: 40px;
    background: var(--primary-green);
    color: white;
    padding: 0 25px;
    font-weight: 600;
    transition: all 0.3s;
}

.btn-search-action:hover {
    background: var(--dark-green);
    color: var(--accent-gold);
}

.divider-modern {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
    margin-bottom: 3rem;
}

/* Kartu Hasil Pencarian Modern */
.search-result-card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(0,0,0,0.04);
    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-left 0.3s ease;
    --cover-h: 220px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 16px;
    position: relative;
    overflow: hidden;
}
.result-cover {
    width: calc(var(--cover-h) * 16 / 9);
    min-width: calc(var(--cover-h) * 16 / 9);
    max-width: calc(var(--cover-h) * 16 / 9);
    height: var(--cover-h);
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 0;
    background: #eef3ef;
    align-self: stretch;
}
.result-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
.result-body {
    flex: 1;
    min-width: 0;
}
@media (max-width: 768px) {
    .search-result-card {
        flex-direction: column;
        gap: 12px;
    }
    .result-cover {
        width: 100%;
        min-width: 0;
        max-width: 100%;
        height: auto;
        aspect-ratio: 16 / 9;
    }
}

.search-result-card:hover {
    transform: translateY(-5px) scale(1.01);
    box-shadow: 0 15px 30px rgba(0,0,0,0.08);
    border-left: 5px solid var(--accent-gold);
}

.result-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
}

.result-title a {
    font-family: 'Merriweather', serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--dark-green);
    text-decoration: none;
    transition: color 0.2s;
}

.result-title a:hover {
    color: var(--primary-green);
}

.result-badge {
    background-color: #e8f5e9;
    color: var(--primary-green);
    font-size: 0.75rem;
    padding: 5px 12px;
    border-radius: 20px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.result-url {
    font-size: 0.85rem;
    color: #999;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 5px;
}

.result-snippet {
    color: #555;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1rem;
}

/* Highlight Text */
mark {
    background-color: rgba(255, 215, 0, 0.4); /* Gold transparan */
    padding: 0 2px;
    border-radius: 3px;
    color: var(--dark-green);
    font-weight: 600;
}

/* Tombol Kunjungi */
.result-link-btn {
    align-self: flex-start;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--primary-green);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-top: auto;
}

.result-link-btn:hover {
    color: var(--accent-gold);
    gap: 8px; /* Animasi panah geser */
    transition: gap 0.3s ease;
}

/* Animasi Masuk */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translate3d(0, 20px, 0);
    }
    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}

.animate-fade-in {
    animation: fadeInUp 0.5s ease-out forwards;
}

    </style>
  
</head>
 
<body id="top">


<?php include __DIR__ . '/partials.header.php'; ?>


<main class="container py-5 mt-5">
    <div class="search-header-container text-center mb-5" data-aos="fade-down">
        <h1 class="display-5 fw-bold text-dark-green">Pencarian</h1>
        <p class="text-muted">Menelusuri arsip digital Pondok Pesantren</p>
        
        <div class="big-search-box mt-4">
            <form action="/pencarian" method="GET" class="position-relative">
                <i class="fa-solid fa-search search-icon-input"></i>
                <input type="text" name="s" id="mainSearchInput" class="form-control big-search-input" placeholder="Ketik kata kunci (misal: pendaftaran, banin, visi)..." autocomplete="off">
                <button type="submit" class="btn btn-search-action">CARI</button>
            </form>
        </div>
    </div>

    <hr class="divider-modern">

    <div class="row justify-content-center">
        <div class="col-lg-10">
            <div id="search-results-info" class="mb-4 text-center"></div>
            <div id="search-results-container" class="search-results-list">
                </div>
            
            <div id="empty-state" class="text-center py-5 d-none">
                <div class="empty-icon mb-3">
                    <i class="bi bi-search" style="font-size: 4rem; color: #dee2e6;"></i>
                </div>
                <h3 class="h4 text-muted">Belum ada hasil ditemukan</h3>
                <p class="text-secondary">Coba gunakan kata kunci yang lebih umum.</p>
            </div>
        </div>
    </div>
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
    <form class="d-flex gap-2" action="/pencarian" method="GET">
      <input type="text" name="s" class="form-control" autocomplete="off" placeholder="Cari di seluruh situs..." required />
      <button type="submit"><i class="bi bi-search"></i> CARI</button>
    </form>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script src="/assets/js/main.js"></script>
<script>
// ... (Kode AOS, Navbar, dll biarkan saja di atas) ...

// ================================================
// 8. LOGIKA PENCARIAN SITUS (FIXED & MODERNIZED)
// ================================================
document.addEventListener('DOMContentLoaded', async function() {
    
    // Pastikan kita berada di halaman Pencarian.html atau ada elemen search overlay
    const resultsContainerEl = document.getElementById('search-results-container');
    const resultsInfoEl = document.getElementById('search-results-info');
    const emptyStateEl = document.getElementById('empty-state');
    const mainSearchInput = document.getElementById('mainSearchInput');

    // DATABASE URL dasar (non-galeri)
    // "category" digunakan untuk badge warna
    const siteIndex = [
        {
            title: 'Beranda Utama',
            url: '/', 
            category: 'Utama',
            keywords: 'home beranda selamat datang pondok pesantren asy-syifaa wal mahmuudiyyah'
        },
        {
            title: 'Visi & Misi',
            url: '/visi-dan-misi',
            category: 'Profile',
            keywords: 'visi misi tujuan cita-cita yayasan Profile'
        },
        {
            title: 'Sejarah Pesantren',
            url: '/profil-pondok-pesantren',
            category: 'Profile',
            keywords: 'sejarah berdiri latar belakang pendiri abah'
        },
        {
            title: 'Fasilitas Pesantren',
            url: '/fasilitas-pesantren',
            category: 'Profile',
            keywords: 'fasilitas gedung asrama masjid perpustakaan lab komputer lapangan'
        },
        {
            title: 'Struktur Organisasi',
            url: '/struktur-organisasi',
            category: 'Profile',
            keywords: 'struktur organisasi pengurus ketua yayasan bendahara sekretaris'
        },
        {
            title: 'Kurikulum Santri',
            url: '/profil-kurikulum',
            category: 'Pendidikan',
            keywords: 'kurikulum pendidikan pelajaran kitab kuning dinas'
        },
        {
            title: 'Direktori Santri Aktif',
            url: '/direktori-santri',
            category: 'Direktori',
            keywords: 'data santri aktif banin banat putra putri siswa siswi database'
        },
        {
            title: 'Direktori Pengajar',
            url: '/direktori-pengajar',
            category: 'Direktori',
            keywords: 'guru ustadz ustadzah pengajar asatidz data'
        },
        {
            title: 'Alur & Syarat Pendaftaran',
            url: '/alur-pendaftaran',
            category: 'Pendaftaran',
            keywords: 'daftar syarat pendaftaran psb ppdb siswa baru cara masuk biaya'
        },
        {
            title: 'Daftar Sekarang (Formulir)',
            url: '/daftar-sekarang',
            category: 'Pendaftaran',
            keywords: 'formulir isi data register online'
        },
        {
            title: 'Hasil Seleksi',
            url: '/hasil-seleksi',
            category: 'Pendaftaran',
            keywords: 'pengumuman kelulusan hasil ujian seleksi diterima'
        },
        {
            title: 'Kegiatan Harian',
            url: '/kegiatan-harian',
            category: 'Kegiatan',
            keywords: 'jadwal harian rutinitas bangun tidur sholat jadwal'
        },
        {
            title: 'Kegiatan Mingguan & Tahunan',
            url: '/kegiatan-mingguan',
            category: 'Kegiatan',
            keywords: 'mingguan bulanan tahunan phbi maulid rajab muharram'
        },

    ];

    function coverFromFolder(folderName) {
        const encodedFolder = encodeURIComponent(String(folderName || '').trim()).replace(/%2F/g, '/');
        return `/img/${encodedFolder}/1.jpg`;
    }

    const galleryRows = <?= json_encode($gallerySearchIndex, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?>;
    if (Array.isArray(galleryRows) && galleryRows.length > 0) {
        siteIndex.push({
            title: 'Galeri Foto',
            url: '/galeri',
            category: 'Galeri',
            keywords: 'foto gambar dokumentasi kegiatan album',
            cover: '/assets/media/images/hero-background.jpg'
        });
        galleryRows.forEach((row) => {
            const slug = String(row.slug || '').trim();
            if (!slug) return;
            const title = String(row.title || slug).trim();
            const description = String(row.description || 'Dokumentasi kegiatan').trim();
            siteIndex.push({
                title,
                url: `/galeri/${slug}`,
                category: 'Galeri',
                keywords: `foto galeri ${title.toLowerCase()} ${description.toLowerCase()}`,
                cover: String(row.cover || '/assets/media/images/hero-background.jpg')
            });
        });
    }

    // Fungsi untuk mendapatkan parameter dari URL (?s=keyword)
    const params = new URLSearchParams(window.location.search);
    const query = params.get('s')?.toLowerCase().trim() || '';

    // Isi ulang input search box jika ada query
    if (mainSearchInput && query) {
        mainSearchInput.value = query;
    }

    // LOGIKA PENCARIAN UTAMA
    if (resultsContainerEl) {
        resultsContainerEl.innerHTML = ''; // Bersihkan kontainer

        if (query) {
            // Filter database berdasarkan Judul ATAU Keyword
            const results = siteIndex.filter(item =>
                item.title.toLowerCase().includes(query) || 
                item.keywords.toLowerCase().includes(query)
            );

            // Tampilkan Info Hasil
            resultsInfoEl.innerHTML = `
                <span class="text-muted">Menampilkan ${results.length} hasil untuk:</span> 
                <span class="fw-bold text-dark-green fst-italic">"${query}"</span>
            `;

            if (results.length > 0) {
                // Sembunyikan empty state
                if(emptyStateEl) emptyStateEl.classList.add('d-none');

                // Regex untuk highlight text
                // Escape special characters in query to prevent regex errors
                const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`(${safeQuery})`, 'gi');

                results.forEach((result, index) => {
                    // Highlight logic
                    const highlightedTitle = result.title.replace(regex, '<mark>$1</mark>');
                    
                    // Snippet: Ambil keywords yang cocok saja agar tidak terlalu panjang
                    let relevantKeywords = result.keywords;
                    // Highlight keywords
                    const highlightedSnippet = relevantKeywords.replace(regex, '<mark>$1</mark>');

                    const card = document.createElement('div');
                    card.className = 'search-result-card animate-fade-in';
                    card.style.animationDelay = `${index * 0.1}s`; // Stagger animation

                    const coverHtml = result.cover
                        ? `<div class="result-cover"><img src="${result.cover}" alt="${result.title}" loading="lazy" onerror="this.onerror=null;this.src='/assets/media/images/hero-background.jpg';"></div>`
                        : '';

                    card.innerHTML = `
                        ${coverHtml}
                        <div class="result-body">
                        <div class="result-header">
                            <span class="result-badge">${result.category}</span>
                        </div>
                        <h3 class="result-title">
                            <a href="${result.url}">${highlightedTitle}</a>
                        </h3>
                        <div class="result-url">
                            <i class="bi bi-link-45deg"></i> asy-syifaa/${result.url}
                        </div>
                        <p class="result-snippet">
                            ...${highlightedSnippet}...
                        </p>
                        <a href="${result.url}" class="result-link-btn">
                            Kunjungi Halaman <i class="bi bi-arrow-right"></i>
                        </a>
                        </div>
                    `;
                    resultsContainerEl.appendChild(card);
                });
            } else {
                // Jika tidak ada hasil
                if(emptyStateEl) emptyStateEl.classList.remove('d-none');
            }
        } else {
            // Jika user membuka halaman pencarian tanpa query
            resultsInfoEl.innerHTML = '<span class="text-muted">Silakan masukkan kata kunci di atas.</span>';
            if(emptyStateEl) emptyStateEl.classList.remove('d-none');
        }
    }
});

</script>


</body>
</html>












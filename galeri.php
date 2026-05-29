<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

use Website\Support\ApiClient;

/**
 * @param mixed $value
 */
function e($value): string
{
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}

function normalize_slug(string $slug): string
{
    $slug = strtolower(trim($slug));
    $slug = str_replace(['-sya-ban', '-qiro-ah'], ['-syaban', '-qiroah'], $slug);
    return preg_replace('/-+/', '-', $slug) ?? $slug;
}

/**
 * @return array<int, array<string, mixed>>
 */
function load_gallery_rows(string $jsonPath): array
{
    if (!is_file($jsonPath)) {
        return [];
    }

    $raw = file_get_contents($jsonPath);
    if ($raw === false) {
        return [];
    }

    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

/**
 * @return string|null
 */
function first_cover_from_folder(string $folderName): ?string
{
    $dirs = [
        ['fs' => __DIR__ . '/img/' . $folderName, 'web' => '/img/' . $folderName],
        ['fs' => __DIR__ . '/Galeri/img/' . $folderName, 'web' => '/Galeri/img/' . $folderName],
        ['fs' => __DIR__ . '/Galeri/' . $folderName, 'web' => '/Galeri/' . $folderName],
        ['fs' => __DIR__ . '/assets/media/gallery/' . $folderName, 'web' => '/assets/media/gallery/' . $folderName],
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
            if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif'], true)) {
                continue;
            }
            $images[] = $file;
        }

        if ($images === []) {
            continue;
        }

        natsort($images);
        $first = (string)array_values($images)[0];
        return $dir['web'] . '/' . rawurlencode($first);
    }

    return null;
}

function get_erp_storage_url(string $path): string
{
    $erpBase = getenv('ASF_ERP_BASE_URL') ?: 'https://erp.asy-syifaa.com';
    if (str_starts_with($path, 'http')) {
        return $path;
    }
    return rtrim($erpBase, '/') . '/storage/' . ltrim($path, '/');
}

// Try API first, fallback to local JSON
$cards = [];
$apiResponse = ApiClient::fetchJson('/api/v1/galleries', ['limit' => '50']);

if (($apiResponse['ok'] ?? false) === true && !empty($apiResponse['data'])) {
    // Use API data from ERP CMS
    foreach ($apiResponse['data'] as $gallery) {
        $slug = trim((string)($gallery['slug'] ?? ''));
        if ($slug === '') continue;

        $title = trim((string)($gallery['title'] ?? 'Galeri'));
        $description = trim((string)($gallery['description'] ?? 'Dokumentasi kegiatan'));

        // Try to get cover from first item or featured image
        $cover = '/assets/media/images/hero-background.jpg';
        if (!empty($gallery['items']) && is_array($gallery['items'])) {
            $firstItem = $gallery['items'][0];
            $cover = get_erp_storage_url($firstItem['image_path'] ?? '');
        }

        $cards[] = [
            'url' => '/galeri/' . $slug,
            'title' => $title,
            'description' => $description,
            'cover' => $cover,
        ];
    }
} else {
    // Fallback to local JSON
    $rows = load_gallery_rows(__DIR__ . '/assets/data/gallery-local.json');
    foreach ($rows as $row) {
        $slug = normalize_slug((string)($row['slug'] ?? ''));
        if ($slug === '') continue;

        $title = trim((string)($row['title'] ?? 'Galeri'));
        $description = trim((string)($row['description'] ?? 'Dokumentasi kegiatan'));
        $folderName = trim((string)($row['folder_name'] ?? $title));
        $cover = first_cover_from_folder($folderName) ?? '/assets/media/images/hero-background.jpg';

        $cards[] = [
            'url' => '/galeri/' . $slug,
            'title' => $title,
            'description' => $description,
            'cover' => $cover,
        ];
    }
}

usort($cards, static fn(array $a, array $b): int => strcmp($a['title'], $b['title']));
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Galeri Foto Kegiatan & Prestasi Santri | Ponpes Asy-Syifaa Wal Mahmuudiyyah</title>
  <meta name="description" content="Lihat dokumentasi lengkap kegiatan santri, acara besar, dan prestasi di Pondok Pesantren Asy-Syifaa Wal Mahmuudiyyah.">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />
  <link rel="icon" href="/assets/media/images/logo.png" type="image/png" sizes="32x32">
  <link rel="stylesheet" href="/css/style.css?v=20260517" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source+Sans+3:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/footer.css?v=20260517">
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/main.css?v=20260519">
  <style>
    .gallery-page-container { margin-top: 110px; }
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 24px;
      padding-bottom: 40px;
    }
    @media (max-width: 991.98px) { .gallery-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 575.98px) { .gallery-grid { grid-template-columns: 1fr; } }
    .gallery-item {
      display: block;
      position: relative;
      width: 100%;
      aspect-ratio: 4 / 5;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      transition: all .35s ease;
      text-decoration: none;
    }
    .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
    .gallery-item::after {
      content: "";
      position: absolute;
      inset: auto 0 0 0;
      height: 62%;
      background: linear-gradient(to top, rgba(0, 0, 0, .92) 0%, rgba(0, 0, 0, 0) 100%);
    }
    .gallery-item-info {
      position: absolute;
      z-index: 2;
      left: 18px;
      right: 18px;
      bottom: 18px;
      transform: translateY(8px);
      transition: transform .3s ease;
    }
    .gallery-item-info h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem;
      color: #fff;
      margin-bottom: 4px;
      text-shadow: 0 2px 4px rgba(0,0,0,.35);
    }
    .gallery-item-info p {
      font-family: 'Source Sans 3', sans-serif;
      font-size: .92rem;
      color: rgba(255,255,255,.9);
      margin: 0;
      line-height: 1.35;
    }
    .gallery-item:hover { transform: translateY(-6px); box-shadow: 0 18px 34px rgba(0, 0, 0, 0.2); }
    .gallery-item:hover img { transform: scale(1.08); }
    .gallery-item:hover .gallery-item-info { transform: translateY(0); }
    .btn-back-home {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 35px;
      background-color: #fff;
      color: var(--dark-green);
      border: 2px solid var(--primary-green);
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      transition: all .25s ease;
      box-shadow: 0 4px 10px rgba(0,0,0,.05);
    }
    .btn-back-home:hover { background-color: var(--primary-green); color: #fff; transform: translateY(-4px); }
  </style>
</head>
<body id="top">
<?php include __DIR__ . '/partials.header.php'; ?>

<div class="container gallery-page-container">
  <div class="section-header" data-aos="fade-up">
    <h2>Galeri Foto <span style="color: var(--primary-green);">Pondok Pesantren</span></h2>
  </div>

  <?php if ($cards === []): ?>
    <div class="alert alert-warning">Belum ada data galeri.</div>
  <?php else: ?>
    <div class="gallery-grid" id="galleryGridRoot">
      <?php foreach ($cards as $index => $card): ?>
        <a href="<?= e($card['url']) ?>" class="gallery-item" data-aos="fade-up" data-aos-delay="<?= (int)(($index % 6) * 60) ?>">
          <img src="<?= e($card['cover']) ?>" alt="<?= e($card['title']) ?>">
          <div class="gallery-item-info">
            <h3><?= e($card['title']) ?></h3>
            <p><?= e($card['description']) ?></p>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>
</div>

<div class="container text-center mb-5 mt-4">
  <a href="/" class="btn-back-home"><i class="fa-solid fa-arrow-left me-2"></i> Kembali ke Beranda</a>
</div>

<?php include __DIR__ . '/partials.footer.php'; ?>

<a href="#top" id="backToTop" title="Kembali ke atas">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="white"><path d="M10,0L9.4,0.6L0.8,9.1l1.2,1.2l7.1-7.1V20h1.7V3.3l7.1,7.1l1.2-1.2l-8.5-8.5L10,0z"></path></svg>
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
<script>AOS.init({ duration: 700, once: true });</script>
</body>
</html>


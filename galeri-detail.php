<?php
declare(strict_types=1);
require_once __DIR__ . '/bootstrap.php';

use Website\Support\ApiClient;

function normalize_gallery_slug(string $slug): string
{
    $normalized = strtolower(trim($slug));
    $normalized = trim($normalized, '/');
    $normalized = preg_replace('/\.html$/i', '', $normalized) ?? $normalized;
    $normalized = str_replace([' ', '_'], '-', $normalized);
    $normalized = preg_replace('/-+/', '-', $normalized) ?? $normalized;

    if ($normalized !== '' && !str_starts_with($normalized, 'galeri-')) {
        $normalized = 'galeri-' . $normalized;
    }

    $aliases = [
        'galeri-malam-nishfu-sya-ban' => 'galeri-malam-nishfu-syaban',
        'galeri-dauroh-ilmiyyah-qiro-ah' => 'galeri-dauroh-ilmiyyah-qiroah',
    ];

    return $aliases[$normalized] ?? $normalized;
}

function slugify_folder_name(string $value): string
{
    $slug = strtolower(trim($value));
    $slug = str_replace(['\'', '`', '"'], '', $slug);
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug) ?? $slug;
    $slug = trim($slug, '-');
    $slug = preg_replace('/-+/', '-', $slug) ?? $slug;

    return $slug;
}

function gallery_url_from_abs_path(string $absolutePath, string $basePath): string
{
    if (!str_starts_with($absolutePath, $basePath)) {
        return '';
    }

    $relative = substr($absolutePath, strlen($basePath));
    $relative = ltrim(str_replace('\\', '/', $relative), '/');
    if ($relative === '') {
        return '';
    }

    $segments = array_values(array_filter(explode('/', $relative), static fn (string $segment): bool => $segment !== ''));
    $encodedSegments = array_map(static fn (string $segment): string => rawurlencode($segment), $segments);

    return '/' . implode('/', $encodedSegments);
}

function gallery_list_image_urls(string $directory, string $basePath): array
{
    if (!is_dir($directory)) {
        return [];
    }

    $items = glob($directory . DIRECTORY_SEPARATOR . '*', GLOB_NOSORT);
    if ($items === false) {
        return [];
    }

    $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    $files = [];

    foreach ($items as $item) {
        if (!is_file($item)) {
            continue;
        }

        $extension = strtolower(pathinfo($item, PATHINFO_EXTENSION));
        if (!in_array($extension, $allowedExtensions, true)) {
            continue;
        }

        $files[] = $item;
    }

    natsort($files);

    $urls = [];
    foreach ($files as $file) {
        $url = gallery_url_from_abs_path($file, $basePath);
        if ($url !== '') {
            $urls[] = $url;
        }
    }

    return array_values($urls);
}

function gallery_read_entries(string $dataFile): array
{
    if (!is_file($dataFile)) {
        return [];
    }

    $raw = file_get_contents($dataFile);
    if ($raw === false || trim($raw) === '') {
        return [];
    }

    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        return [];
    }

    $result = [];
    foreach ($decoded as $entry) {
        if (!is_array($entry)) {
            continue;
        }

        $result[] = $entry;
    }

    return $result;
}

function gallery_find_by_slug(array $entries, string $slug): ?array
{
    foreach ($entries as $entry) {
        $entrySlug = normalize_gallery_slug((string)($entry['slug'] ?? ''));
        if ($entrySlug === $slug) {
            return $entry;
        }
    }

    return null;
}

function gallery_first_existing_images(array $candidateDirectories, string $basePath): array
{
    $uniqueDirectories = array_values(array_unique($candidateDirectories));

    foreach ($uniqueDirectories as $directory) {
        $images = gallery_list_image_urls($directory, $basePath);
        if ($images !== []) {
            return [$images, $directory];
        }
    }

    return [[], ''];
}

function gallery_discover_directories_by_slug(string $slug, string $basePath): array
{
    $roots = [
        $basePath . DIRECTORY_SEPARATOR . 'img',
        $basePath . DIRECTORY_SEPARATOR . 'Galeri',
        $basePath . DIRECTORY_SEPARATOR . 'Galeri' . DIRECTORY_SEPARATOR . 'img',
    ];

    $expectedSlug = preg_replace('/^galeri-/', '', $slug) ?? $slug;
    $directories = [];

    foreach ($roots as $root) {
        if (!is_dir($root)) {
            continue;
        }

        $folders = glob($root . DIRECTORY_SEPARATOR . '*', GLOB_ONLYDIR);
        if ($folders === false) {
            continue;
        }

        foreach ($folders as $folderPath) {
            $folderName = basename($folderPath);
            $folderSlug = slugify_folder_name($folderName);
            $fullSlug = 'galeri-' . $folderSlug;

            if ($fullSlug === $slug || $folderSlug === $expectedSlug) {
                $directories[] = $folderPath;
            }
        }
    }

    return $directories;
}

$basePath = __DIR__;
$requestPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$requestPath = rawurldecode(is_string($requestPath) ? $requestPath : '/');

$slug = normalize_gallery_slug((string)($_GET['slug'] ?? ''));
if ($slug === '' && str_starts_with($requestPath, '/galeri/')) {
    $slug = normalize_gallery_slug(substr($requestPath, strlen('/galeri/')));
}

if ($slug === '' && preg_match('#^/galeri-[^/]+(?:\.html)?/?$#i', $requestPath) === 1) {
    $legacySlug = ltrim($requestPath, '/');
    $legacySlug = preg_replace('/\.html$/i', '', $legacySlug) ?? $legacySlug;
    $slug = normalize_gallery_slug($legacySlug);
}

$entries = gallery_read_entries($basePath . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'gallery-local.json');
$gallery = $slug !== '' ? gallery_find_by_slug($entries, $slug) : null;
$apiGallery = null;
$images = [];
$sourceDirectory = '';

if ($slug !== '') {
    // Try new ERP CMS API first
    $apiResponse = ApiClient::fetchJson('/api/v1/galleries/' . rawurlencode($slug));
    if (($apiResponse['ok'] ?? false) === true && is_array($apiResponse['data'] ?? null)) {
        $apiGallery = $apiResponse['data'];
        $apiItems = is_array($apiGallery['items'] ?? null) ? $apiGallery['items'] : [];
        $erpBase = getenv('ASF_ERP_BASE_URL') ?: 'https://erp.asy-syifaa.com';
        foreach ($apiItems as $item) {
            if (!is_array($item)) {
                continue;
            }
            $path = trim((string)($item['image_path'] ?? ''));
            if ($path !== '') {
                $url = str_starts_with($path, 'http') ? $path : rtrim($erpBase, '/') . '/storage/' . ltrim($path, '/');
                $images[] = $url;
            }
        }
    } else {
        // Fallback: try old API
        $apiResponse = ApiClient::fetchJson('/api/public/content/gallery/' . rawurlencode($slug));
        if (($apiResponse['ok'] ?? false) === true && is_array($apiResponse['data'] ?? null)) {
            $apiGallery = $apiResponse['data'];
            $apiPhotos = is_array($apiGallery['photos'] ?? null) ? $apiGallery['photos'] : [];
            foreach ($apiPhotos as $photo) {
                if (!is_array($photo)) {
                    continue;
                }
                $url = trim((string)($photo['media_url'] ?? ''));
                if ($url !== '') {
                    $images[] = $url;
                }
            }
        }
    }
}

$title = trim((string)($apiGallery['title'] ?? ($gallery['title'] ?? '')));
if ($title === '' && $slug !== '') {
    $title = ucwords(str_replace('-', ' ', preg_replace('/^galeri-/', '', $slug) ?? $slug));
}

$description = trim((string)($apiGallery['description'] ?? ($gallery['description'] ?? 'Dokumentasi kegiatan Pondok Pesantren Asy-Syifaa Wal Mahmuudiyyah.')));
$folderName = trim((string)($gallery['folder_name'] ?? ''));

if ($images === []) {
    $candidateDirectories = [];
    if ($folderName !== '') {
        $candidateDirectories[] = $basePath . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . $folderName;
        $candidateDirectories[] = $basePath . DIRECTORY_SEPARATOR . 'Galeri' . DIRECTORY_SEPARATOR . $folderName;
        $candidateDirectories[] = $basePath . DIRECTORY_SEPARATOR . 'Galeri' . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . $folderName;
    }

    [$images, $sourceDirectory] = gallery_first_existing_images($candidateDirectories, $basePath);
    if ($images === [] && $slug !== '') {
        $discoveredDirectories = gallery_discover_directories_by_slug($slug, $basePath);
        [$images, $sourceDirectory] = gallery_first_existing_images($discoveredDirectories, $basePath);
    }
}

$photoCount = count($images);
$apiCoverImage = trim((string)($apiGallery['cover_url'] ?? ''));
$coverImage = $photoCount > 0 ? $images[0] : ($apiCoverImage !== '' ? $apiCoverImage : '/assets/media/images/logo.png');
$metaTitle = ($title !== '' ? $title : 'Detail Galeri') . ' - Ponpes Asy-Syifaa Wal Mahmuudiyyah';

if ($slug === '' || ($gallery === null && $apiGallery === null && $photoCount === 0)) {
    http_response_code(404);
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= htmlspecialchars($metaTitle, ENT_QUOTES) ?></title>
  <meta name="description" content="<?= htmlspecialchars($description, ENT_QUOTES) ?>">
  <link rel="icon" href="/assets/media/images/logo.png" type="image/png" sizes="32x32">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="/css/style.css?v=20260517">
  <link rel="stylesheet" href="/footer.css?v=20260517">
  <link rel="stylesheet" href="/assets/css/main.css?v=20260519">
  <style>
    :root {
      --gallery-green: #1f6e4d;
      --gallery-green-dark: #0f3f2a;
      --gallery-gold: #d5a94f;
      --gallery-bg: #f4f6f8;
      --gallery-text: #1a2b23;
    }

    body {
      background: radial-gradient(circle at top right, rgba(31, 110, 77, 0.08), transparent 32%),
                  radial-gradient(circle at top left, rgba(213, 169, 79, 0.1), transparent 38%),
                  var(--gallery-bg);
      color: var(--gallery-text);
      min-height: 100vh;
    }

    .gallery-detail-main {
      padding-top: 108px;
      padding-bottom: 64px;
    }

    .gallery-back-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      font-weight: 600;
      text-decoration: none;
      color: var(--gallery-green-dark);
    }

    .gallery-back-link:hover {
      color: var(--gallery-green);
    }

    .gallery-hero {
      position: relative;
      border-radius: 24px;
      overflow: hidden;
      color: #fff;
      padding: 32px;
      min-height: 240px;
      display: flex;
      align-items: flex-end;
      background-image: linear-gradient(140deg, rgba(6, 26, 18, 0.78), rgba(6, 26, 18, 0.18)),
                        linear-gradient(30deg, rgba(31, 110, 77, 0.35), rgba(213, 169, 79, 0.16)),
                        var(--cover-image);
      background-size: cover;
      background-position: center;
      box-shadow: 0 18px 45px rgba(8, 35, 22, 0.22);
    }

    .gallery-badge-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 14px;
    }

    .gallery-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border: 1px solid rgba(255, 255, 255, 0.24);
      background: rgba(255, 255, 255, 0.12);
      color: #ffffff !important;
      padding: 5px 12px;
      border-radius: 999px;
      font-size: 0.84rem;
      font-weight: 600;
      letter-spacing: 0.01em;
    }

    .gallery-title {
      font-size: clamp(1.7rem, 2.8vw, 2.7rem);
      line-height: 1.2;
      margin-bottom: 10px;
      text-wrap: balance;
      color: #ffffff !important;
      text-shadow: 0 3px 14px rgba(0, 0, 0, 0.48);
    }

    .gallery-hero h1,
    .gallery-hero h2,
    .gallery-hero h3 {
      color: #ffffff !important;
    }

    .gallery-description {
      margin: 0;
      max-width: 760px;
      font-size: 1.02rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.92);
    }

    .gallery-content-card {
      margin-top: 24px;
      background: #fff;
      border-radius: 22px;
      box-shadow: 0 14px 34px rgba(8, 35, 22, 0.09);
      padding: clamp(18px, 3vw, 30px);
    }

    .gallery-content-heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
      margin-bottom: 18px;
      flex-wrap: wrap;
    }

    .gallery-content-heading h2 {
      margin: 0;
      font-size: clamp(1.25rem, 2vw, 1.7rem);
      color: var(--gallery-green-dark);
    }

    .gallery-content-meta {
      color: #51645b;
      font-size: 0.92rem;
      margin: 0;
    }

    .gallery-photo-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: clamp(12px, 2vw, 18px);
    }

    .gallery-photo-btn {
      position: relative;
      border: 0;
      padding: 0;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 7px 20px rgba(10, 34, 21, 0.16);
      cursor: zoom-in;
      background: #0b1f16;
      aspect-ratio: 4 / 5;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }

    .gallery-photo-btn img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.5s ease;
    }

    .gallery-photo-btn::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent 55%, rgba(8, 21, 15, 0.46));
      opacity: 0;
      transition: opacity 0.25s ease;
    }

    .gallery-photo-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 14px 28px rgba(10, 34, 21, 0.22);
    }

    .gallery-photo-btn:hover::after {
      opacity: 1;
    }

    .gallery-photo-btn:hover img {
      transform: scale(1.06);
    }

    .gallery-empty {
      border: 1px dashed rgba(31, 110, 77, 0.35);
      border-radius: 14px;
      padding: 24px;
      background: rgba(31, 110, 77, 0.06);
      color: #456156;
      margin-bottom: 0;
    }

    .gallery-lightbox {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.88);
      display: none;
      z-index: 1080;
      padding: 24px;
    }

    .gallery-lightbox.active {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 12px;
    }

    .gallery-lightbox img {
      max-width: min(94vw, 1200px);
      max-height: 82vh;
      object-fit: contain;
      border-radius: 12px;
      box-shadow: 0 18px 38px rgba(0, 0, 0, 0.4);
    }

    .gallery-lightbox-tools {
      position: absolute;
      top: 14px;
      right: 16px;
      display: flex;
      gap: 8px;
    }

    .gallery-lightbox-btn {
      border: 0;
      border-radius: 999px;
      width: 44px;
      height: 44px;
      background: rgba(255, 255, 255, 0.16);
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .gallery-lightbox-btn:hover {
      background: rgba(255, 255, 255, 0.28);
    }

    .gallery-lightbox-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      border: 0;
      width: 50px;
      height: 50px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.18);
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .gallery-lightbox-nav:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .gallery-lightbox-prev {
      left: 16px;
    }

    .gallery-lightbox-next {
      right: 16px;
    }

    .gallery-lightbox-caption {
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.95rem;
      margin: 0;
    }

    @media (max-width: 992px) {
      .gallery-photo-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 768px) {
      .gallery-detail-main {
        padding-top: 96px;
      }

      .gallery-hero {
        padding: 22px;
        min-height: 200px;
      }

      .gallery-photo-grid {
        grid-template-columns: 1fr;
      }

      .gallery-lightbox {
        padding: 14px;
      }

      .gallery-lightbox-nav {
        width: 42px;
        height: 42px;
      }
    }
  </style>
</head>
<body id="top">
<?php include __DIR__ . '/partials.header.php'; ?>

<main class="gallery-detail-main">
  <div class="container">
    <a href="/galeri" class="gallery-back-link">
      <i class="bi bi-arrow-left"></i>
      Kembali ke halaman galeri
    </a>

    <section class="gallery-hero" style="--cover-image: url('<?= htmlspecialchars($coverImage, ENT_QUOTES) ?>');">
      <div>
        <div class="gallery-badge-list">
          <span class="gallery-badge"><i class="bi bi-images"></i> <?= $photoCount ?> foto</span>
          <?php if ($sourceDirectory !== ''): ?>
            <span class="gallery-badge"><i class="bi bi-folder2-open"></i> <?= htmlspecialchars(basename($sourceDirectory), ENT_QUOTES) ?></span>
          <?php endif; ?>
        </div>

        <h1 class="gallery-title"><?= htmlspecialchars($title !== '' ? $title : 'Detail Galeri', ENT_QUOTES) ?></h1>
        <p class="gallery-description"><?= htmlspecialchars($description, ENT_QUOTES) ?></p>
      </div>
    </section>

    <section class="gallery-content-card">
      <div class="gallery-content-heading">
        <h2>Dokumentasi Foto</h2>
        <p class="gallery-content-meta">Klik foto untuk melihat ukuran penuh.</p>
      </div>

      <?php if ($images === []): ?>
        <p class="gallery-empty mb-0">Foto untuk galeri ini belum tersedia atau jalur folder belum sesuai. Silakan cek ulang struktur folder `img`/`Galeri`.</p>
      <?php else: ?>
        <div class="gallery-photo-grid">
          <?php foreach ($images as $index => $imageUrl): ?>
            <button type="button" class="gallery-photo-btn js-gallery-photo" data-index="<?= $index ?>">
              <img loading="lazy" decoding="async" src="<?= htmlspecialchars($imageUrl, ENT_QUOTES) ?>" alt="<?= htmlspecialchars(($title !== '' ? $title : 'Galeri') . ' foto ' . ($index + 1), ENT_QUOTES) ?>" loading="lazy">
            </button>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </section>
  </div>
</main>

<?php include __DIR__ . '/partials.footer.php'; ?>

<a href="#top" id="backToTop" title="Kembali ke atas">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="white" aria-hidden="true">
    <path d="M10,0L9.4,0.6L0.8,9.1l1.2,1.2l7.1-7.1V20h1.7V3.3l7.1,7.1l1.2-1.2l-8.5-8.5L10,0z"></path>
  </svg>
</a>

<div id="searchOverlay">
  <span id="closeSearch" class="close-search" title="Tutup">×</span>
  <div class="search-box">
    <form class="d-flex gap-2" action="/pencarian" method="GET">
      <input type="text" name="s" class="form-control" autocomplete="off" placeholder="Cari di seluruh situs..." required>
      <button type="submit"><i class="bi bi-search"></i> CARI</button>
    </form>
  </div>
</div>

<div class="gallery-lightbox" id="galleryLightbox" aria-hidden="true">
  <button type="button" class="gallery-lightbox-nav gallery-lightbox-prev" id="lightboxPrev" aria-label="Foto sebelumnya">
    <i class="bi bi-chevron-left"></i>
  </button>
  <button type="button" class="gallery-lightbox-nav gallery-lightbox-next" id="lightboxNext" aria-label="Foto berikutnya">
    <i class="bi bi-chevron-right"></i>
  </button>

  <div class="gallery-lightbox-tools">
    <button type="button" class="gallery-lightbox-btn" id="lightboxClose" aria-label="Tutup lightbox">
      <i class="bi bi-x-lg"></i>
    </button>
  </div>

  <img loading="lazy" decoding="async" id="lightboxImage" src="" alt="Foto galeri">
  <p class="gallery-lightbox-caption" id="lightboxCaption"></p>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="/assets/js/main.js"></script>
<script>
  (() => {
    const imageUrls = <?= json_encode($images, JSON_UNESCAPED_SLASHES) ?>;
    const title = <?= json_encode($title !== '' ? $title : 'Detail Galeri') ?>;

    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeButton = document.getElementById('lightboxClose');
    const prevButton = document.getElementById('lightboxPrev');
    const nextButton = document.getElementById('lightboxNext');
    const photoButtons = document.querySelectorAll('.js-gallery-photo');

    if (!lightbox || !lightboxImage || !lightboxCaption || imageUrls.length === 0) {
      return;
    }

    let activeIndex = 0;

    const render = (index) => {
      activeIndex = (index + imageUrls.length) % imageUrls.length;
      lightboxImage.src = imageUrls[activeIndex];
      lightboxCaption.textContent = `${title} (${activeIndex + 1}/${imageUrls.length})`;
    };

    const open = (index) => {
      render(index);
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    const next = () => render(activeIndex + 1);
    const prev = () => render(activeIndex - 1);

    photoButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const index = Number(button.dataset.index || '0');
        open(Number.isNaN(index) ? 0 : index);
      });
    });

    closeButton.addEventListener('click', close);
    nextButton.addEventListener('click', next);
    prevButton.addEventListener('click', prev);

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        close();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (!lightbox.classList.contains('active')) {
        return;
      }

      if (event.key === 'Escape') {
        close();
      } else if (event.key === 'ArrowRight') {
        next();
      } else if (event.key === 'ArrowLeft') {
        prev();
      }
    });
  })();
</script>
</body>
</html>

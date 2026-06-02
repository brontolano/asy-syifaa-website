<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Detail Artikel - Asy-Syifaa Wal Mahmuudiyyah</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source+Sans+3:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/main.css?v=20260519">
  <link rel="stylesheet" href="/assets/css/blog-cms.css?v=20260519-1">
</head>
<body class="article-detail-page" id="top">
  <?php include __DIR__ . '/partials.header.php'; ?>

  <section id="articleHeroRoot"></section>
  <main class="article-detail-shell" id="blogPageRoot" data-mode="detail">
    <section id="articleRoot"></section>
    <section class="container mt-4 pb-5">
      <p class="text-uppercase mb-1" style="letter-spacing:.08em;color:#5e776c;font-size:.78rem;">Bacaan Lainnya</p>
      <h2 class="h4 mb-3" style="color:#173f30;">Saran Artikel</h2>
      <div id="recommendList" class="blog-grid"></div>
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
  <script src="/assets/js/main.js"></script>
  <script src="/assets/js/api-config.js"></script>
  <script src="/assets/js/blog-pages.js"></script>
</body>
</html>


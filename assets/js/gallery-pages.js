(function () {
  function esc(text) {
    return String(text || "").replace(/[&<>"']/g, function (m) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" })[m];
    });
  }

  function slugify(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "galeri";
  }

  function apiBase() {
    return (window.ASF_API_BASE || "");
  }

  var SPECIAL_IMAGE_BY_SLUG = {
    "galeri-wisuda-vi": "/assets/media/gallery/Wisuda%20VI/Dokumentasi%20Wisuda%20VI%200.jpg"
  };

  function resolveImageFromFolder(folderName, fallbackFile) {
    if (!folderName) return "";
    return "/assets/media/gallery/" + encodeURIComponent(folderName) + "/" + encodeURIComponent(fallbackFile || "1.jpg");
  }

  function resolveGalleryImage(row, slug) {
    if (row && row.cover_url) return row.cover_url;
    if (slug && SPECIAL_IMAGE_BY_SLUG[slug]) return SPECIAL_IMAGE_BY_SLUG[slug];
    if (row && row.folder_name) return resolveImageFromFolder(row.folder_name, "1.jpg");
    if (row && row.title) return resolveImageFromFolder(row.title, "1.jpg");
    return "/assets/media/images/hero-background.jpg";
  }

  async function loadJson(path) {
    var res = await fetch(apiBase() + path, { cache: "no-store" });
    if (!res.ok) throw new Error("request_failed");
    return res.json();
  }

  async function loadLocalGalleryRows() {
    try {
      var res = await fetch("/assets/data/gallery-local.json", { cache: "no-store" });
      if (!res.ok) return [];
      var rows = await res.json();
      return Array.isArray(rows) ? rows : [];
    } catch (_e) {
      return [];
    }
  }

  function mergeGalleryRows(apiRows, localRows) {
    var bySlug = Object.create(null);
    var merged = [];
    function addRow(row) {
      var slug = (row && row.slug ? row.slug : ("galeri-" + slugify(row && row.title))).trim();
      if (!slug || bySlug[slug]) return;
      bySlug[slug] = true;
      merged.push({
        title: row && row.title ? row.title : slug.replace(/^galeri-/, "").replace(/-/g, " "),
        slug: slug,
        folder_name: row && row.folder_name ? row.folder_name : (row && row.title ? row.title : ""),
        description: row && row.description ? row.description : "Dokumentasi kegiatan",
        category: row && row.category ? row.category : "Galeri",
        date: row && row.date ? row.date : "",
        cover_url: row && row.cover_url ? row.cover_url : ""
      });
    }
    (apiRows || []).forEach(addRow);
    (localRows || []).forEach(addRow);
    return merged;
  }

  async function loadGalleryList() {
    var root = document.getElementById("galleryGridRoot");
    if (!root) return;
    var PAGE_SIZE = 12;
    var loading = document.getElementById("galleryLoading");
    var empty = document.getElementById("galleryEmpty");
    var pagination = document.getElementById("galleryPagination");
    if (!pagination) {
      pagination = document.createElement("div");
      pagination.id = "galleryPagination";
      pagination.className = "d-flex justify-content-center flex-wrap gap-2 mt-4";
      root.insertAdjacentElement("afterend", pagination);
    }
    try {
      var apiRows = [];
      try {
        var payload = await loadJson("/api/public/content/gallery?limit=200");
        apiRows = Array.isArray(payload && payload.data) ? payload.data : [];
      } catch (_e) {}
      var localRows = await loadLocalGalleryRows();
      var rows = mergeGalleryRows(apiRows, localRows);
      if (!rows.length) {
        if (empty) empty.classList.remove("d-none");
        pagination.innerHTML = "";
        return;
      }
      var params = new URLSearchParams(window.location.search);
      var currentPage = parseInt(params.get("page") || "1", 10);
      if (!Number.isFinite(currentPage) || currentPage < 1) currentPage = 1;
      var totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
      if (currentPage > totalPages) currentPage = totalPages;
      var start = (currentPage - 1) * PAGE_SIZE;
      var pageRows = rows.slice(start, start + PAGE_SIZE);
      root.innerHTML = pageRows.map(function (row, idx) {
        var slug = row.slug || ("galeri-" + slugify(row.title));
        var image = resolveGalleryImage(row, slug);
        return '<a href="/galeri/' + esc(slug) + '" class="gallery-item" data-aos="fade-up" data-aos-delay="' + String((idx % 6) * 60 + 100) + '">' +
          '<img loading="lazy" decoding="async" src="' + esc(image) + '" alt="' + esc(row.title) + '" onerror="this.onerror=null;this.src=\'/assets/media/images/hero-background.jpg\'">' +
          '<div class="gallery-item-info">' +
          '<h3>' + esc(row.title) + '</h3>' +
          '<p>' + esc(row.description || row.category || "Dokumentasi kegiatan") + '</p>' +
          '</div></a>';
      }).join("");
      if (totalPages <= 1) {
        pagination.innerHTML = "";
      } else {
        var items = [];
        var prevPage = Math.max(1, currentPage - 1);
        var nextPage = Math.min(totalPages, currentPage + 1);
        items.push('<a class="btn btn-outline-success btn-sm rounded-pill px-3' + (currentPage === 1 ? ' disabled' : '') + '" href="/galeri?page=' + prevPage + '">Sebelumnya</a>');
        for (var i = 1; i <= totalPages; i++) {
          items.push('<a class="btn ' + (i === currentPage ? 'btn-success' : 'btn-outline-success') + ' btn-sm rounded-pill px-3" href="/galeri?page=' + i + '">' + i + '</a>');
        }
        items.push('<a class="btn btn-outline-success btn-sm rounded-pill px-3' + (currentPage === totalPages ? ' disabled' : '') + '" href="/galeri?page=' + nextPage + '">Berikutnya</a>');
        pagination.innerHTML = items.join("");
      }
    } catch (_e) {
      if (empty) {
        empty.classList.remove("d-none");
        empty.textContent = "Data galeri belum bisa dimuat.";
      }
      pagination.innerHTML = "";
    } finally {
      if (loading) loading.classList.add("d-none");
    }
  }

  async function loadHomeGalleryList() {
    var root = document.getElementById("homeGalleryGridRoot");
    if (!root) return;
    var loading = document.getElementById("homeGalleryLoading");
    var empty = document.getElementById("homeGalleryEmpty");
    try {
      var apiRows = [];
      try {
        var payload = await loadJson("/api/public/content/gallery?limit=200");
        apiRows = Array.isArray(payload && payload.data) ? payload.data : [];
      } catch (_e) {}
      var localRows = await loadLocalGalleryRows();
      var rows = mergeGalleryRows(apiRows, localRows).slice(0, 8);
      if (!rows.length) {
        if (empty) empty.classList.remove("d-none");
        return;
      }
      root.innerHTML = rows.map(function (row, idx) {
        var slug = row.slug || ("galeri-" + slugify(row.title));
        var image = resolveGalleryImage(row, slug);
        return '<a href="/galeri/' + esc(slug) + '" class="gallery-item" data-aos="fade-up" data-aos-delay="' + String((idx % 6) * 60 + 100) + '">' +
          '<img loading="lazy" decoding="async" src="' + esc(image) + '" alt="' + esc(row.title) + '" onerror="this.onerror=null;this.src=\'/assets/media/images/hero-background.jpg\'">' +
          '<div class="gallery-item-info">' +
          '<h3>' + esc(row.title) + '</h3>' +
          '<p>' + esc(row.description || row.category || "Dokumentasi kegiatan") + '</p>' +
          '</div></a>';
      }).join("");
    } catch (_e) {
      if (empty) {
        empty.classList.remove("d-none");
        empty.textContent = "Data galeri belum bisa dimuat.";
      }
    } finally {
      if (loading) loading.classList.add("d-none");
    }
  }

  async function loadGalleryDetail() {
    var detailRoot = document.getElementById("galleryDetailRoot");
    if (!detailRoot) return;
    var qsSlug = new URLSearchParams(window.location.search).get("slug");
    var cleanPath = (window.location.pathname || "/").replace(/^\/+|\/+$/g, "");
    if (!qsSlug && (cleanPath === "galeri-detail" || cleanPath === "galeri-detail.html")) {
      window.location.replace("/galeri");
      return;
    }
    var pathParts = cleanPath ? cleanPath.split("/") : [];
    var slugFromPath = "";
    if (pathParts.length >= 2 && pathParts[0] === "galeri") {
      slugFromPath = pathParts[1];
    } else if (pathParts.length === 1 && pathParts[0] && pathParts[0] !== "galeri-detail.html" && pathParts[0] !== "galeri-detail") {
      slugFromPath = pathParts[0];
    }
    var path = (qsSlug || slugFromPath).trim();
    if (!path || path === "galeri") return;
    try {
      var row = null;
      try {
        var payload = await loadJson("/api/public/content/gallery/" + encodeURIComponent(path));
        row = payload && payload.data ? payload.data : null;
      } catch (_e) {}
      if (!row) {
        var localRows = await loadLocalGalleryRows();
        row = localRows.find(function (r) { return (r.slug || "").trim() === path; }) || null;
      }
      if (!row) throw new Error("not_found");
      var rowSlug = row.slug || ("galeri-" + slugify(row.title));
      var image = resolveGalleryImage(row, rowSlug);
      document.title = row.title + " | Galeri Asy-Syifaa";
      detailRoot.innerHTML = '<section class="container py-5">' +
        '<h1 class="mb-2">' + esc(row.title) + '</h1>' +
        '<p class="text-muted mb-4">' + esc(row.date) + ' • ' + esc(row.category || "Galeri") + '</p>' +
        '<img loading="lazy" decoding="async" src="' + esc(image) + '" alt="' + esc(row.title) + '" class="img-fluid rounded-4 mb-3" onerror="this.onerror=null;this.src=\'/assets/media/images/hero-background.jpg\'">' +
        '<p>' + esc(row.description || "Detail galeri.") + '</p>' +
        '<a href="/galeri" class="btn btn-outline-success rounded-pill px-4 mt-2">Kembali ke Galeri</a>' +
        '</section>';
    } catch (_e) {
      detailRoot.innerHTML = '<section class="container py-5"><div class="alert alert-warning">Detail galeri tidak ditemukan.</div><a href="/galeri" class="btn btn-outline-success rounded-pill px-4">Kembali ke Galeri</a></section>';
    }
  }

  if (document.getElementById("galleryGridRoot")) {
    loadGalleryList();
  }
  if (document.getElementById("galleryDetailRoot")) {
    loadGalleryDetail();
  }
  if (document.getElementById("homeGalleryGridRoot")) {
    loadHomeGalleryList();
  }
})();

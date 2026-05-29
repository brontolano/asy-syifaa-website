(function () {
  const root = document.getElementById("blogPageRoot");
  if (!root) return;

  const mode = root.dataset.mode || "list";
  const filterType = (root.dataset.filterType || "general").toLowerCase();
  const listEl = document.getElementById("blogList");
  const emptyEl = document.getElementById("blogEmpty");
  const loadingEl = document.getElementById("blogLoading");
  const API_BASE = window.ASF_API_BASE || "";
  const categoryMap = {
    "general": "announcement",
    "info-prestasi": "achievement",
  };
  const apiCategory = categoryMap[filterType] || "announcement";
  const API = API_BASE + "/api/v1/posts?category=" + encodeURIComponent(apiCategory) + "&limit=12";

  function esc(text) {
    return String(text || "").replace(/[&<>"']/g, (m) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    }[m]));
  }

  function parseTags(item) {
    if (Array.isArray(item.tags)) return item.tags.map((t) => String(t.name || t).trim()).filter(Boolean);
    if (typeof item.tags === "string") return item.tags.split(",").map((t) => t.trim()).filter(Boolean);
    return [];
  }

  function readExcerpt(item) {
    const raw = item.excerpt || item.content || "";
    const plain = String(raw).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return plain.slice(0, 165) + (plain.length > 165 ? "..." : "");
  }

  function shouldShow(item) {
    return true; // filtering already done by API category param
  }

  function getAuthorName(item) {
    if (item.author && item.author.full_name) return item.author.full_name;
    return "Admin";
  }

  function getDate(item) {
    return item.published_at || item.created_at || "";
  }

  function getCover(item) {
    if (item.featured_image) {
      // If it's a relative path, prepend ERP base
      if (item.featured_image.startsWith("/")) {
        return (window.ASF_ERP_BASE || "") + "/storage/" + item.featured_image.replace(/^\/+/, "");
      }
      if (item.featured_image.startsWith("http")) return item.featured_image;
      return (window.ASF_ERP_BASE || "") + "/storage/" + item.featured_image;
    }
    return "/assets/media/images/hero-background.jpg";
  }

  function cardHtml(item) {
    const tags = parseTags(item);
    const cover = getCover(item);
    const excerpt = readExcerpt(item);
    const articleUrl = `/info-artikel.html?slug=${encodeURIComponent(item.slug || item.id)}`;
    const dateStr = formatDateID(getDate(item));
    const author = getAuthorName(item);
    return `
<article class="blog-card">
  <img src="${esc(cover)}" alt="${esc(item.title)}" loading="lazy">
  <div class="blog-card-body">
    <div class="blog-meta">${esc(dateStr)} â¢ ${esc(author)}</div>
    <a class="blog-title" href="${articleUrl}">${esc(item.title)}</a>
    <p class="blog-excerpt mt-2">${esc(excerpt)}</p>
    <div>${tags.map((t) => `<span class="tag-chip">#${esc(t)}</span>`).join("")}</div>
  </div>
</article>`;
  }

  function formatDateID(value) {
    const dt = new Date(value);
    if (Number.isNaN(dt.getTime())) return String(value || "");
    return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "long", year: "numeric" }).format(dt);
  }

  function estimateReadMinutes(item) {
    const raw = String(item?.content_html || item?.content || "");
    const plain = raw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const words = plain ? plain.split(" ").length : 0;
    return Math.max(1, Math.ceil(words / 200));
  }

  async function loadList() {
    try {
      const res = await fetch(API, { cache: "no-store" });
      const payload = await res.json();
      const rows = Array.isArray(payload?.data) ? payload.data : [];
      const filtered = rows;
      if (!filtered.length) {
        if (emptyEl) emptyEl.classList.remove("d-none");
        return;
      }
      if (listEl) listEl.innerHTML = filtered.map(cardHtml).join("");
    } catch (_e) {
      if (emptyEl) {
        emptyEl.classList.remove("d-none");
        emptyEl.textContent = "Konten belum bisa dimuat. Silakan coba lagi.";
      }
    } finally {
      if (loadingEl) loadingEl.classList.add("d-none");
    }
  }

  async function loadDetail() {
    const heroEl = document.getElementById("articleHeroRoot");
    const articleEl = document.getElementById("articleRoot");
    const recommendEl = document.getElementById("recommendList");
    const slug = new URLSearchParams(location.search).get("slug") || new URLSearchParams(location.search).get("id");
    if (!articleEl || !slug) return;
    try {
      const detailRes = await fetch(API_BASE + "/api/v1/posts/" + encodeURIComponent(slug), { cache: "no-store" });
      const detailPayload = await detailRes.json();
      if (!detailPayload?.ok || !detailPayload?.data) throw new Error("not_found");
      const item = detailPayload.data;
      const cover = getCover(item);
      const tags = parseTags(item);
      const bodyHtml = item.content || `<p>${esc(item.excerpt || "").replace(/\n/g, "<br>")}</p>`;
      // Fetch related posts
      const relRes = await fetch(API + "&limit=5", { cache: "no-store" }).catch(() => null);
      const relPayload = relRes ? await relRes.json().catch(() => ({})) : {};
      const allRows = Array.isArray(relPayload?.data) ? relPayload.data : [];
      const related = allRows.filter((row) => String(row.id) !== String(item.id)).slice(0, 4);
      const readMins = estimateReadMinutes(item);
      const formattedDate = formatDateID(getDate(item));
      if (heroEl) {
        heroEl.innerHTML = `
<section class="article-hero full-width" style="background-image:url('${esc(cover)}');">
  <div class="article-hero-content">
    <div class="blog-meta" style="color:rgba(255,255,255,0.9)">${esc(formattedDate)} â¢ ${esc(item.author || "Admin")}</div>
    <h1 class="article-hero-title">${esc(item.title)}</h1>
    <div>${tags.map((t) => `<span class="tag-chip" style="background:rgba(255,255,255,.16);border-color:rgba(255,255,255,.36);color:#fff;">#${esc(t)}</span>`).join("")}</div>
  </div>
</section>`;
      }
      articleEl.innerHTML = `
<section class="article-shell article-content-section">
  <div class="article-content">
    <div class="article-content-inner">
      <nav class="article-breadcrumb">
        <a href="/index.html">Beranda</a>
        <span>/</span>
        <a href="/info-pengumuman.html">Artikel</a>
        <span>/</span>
        <span>${esc(item.title)}</span>
      </nav>
      <div class="article-detail-grid">
        <article class="article-main-card">
          <div class="article-meta-row">
            <img class="article-avatar" src="/assets/media/images/logo.png" alt="Author">
            <div>
              <strong>${esc(getAuthorName(item))}</strong><br>
              <small class="text-muted">${esc(item.category?.name || "Artikel")}</small>
            </div>
            <span class="meta-pill"><i class="fa-regular fa-calendar"></i> ${esc(formattedDate)}</span>
            <span class="meta-pill"><i class="fa-regular fa-clock"></i> ${readMins} menit baca</span>
          </div>
          <div class="article-body-html">
            ${bodyHtml}
          </div>
        </article>
        <aside class="article-sidebar-card">
          <h3 class="sidebar-title">Artikel Terkait</h3>
          <ul class="sidebar-list">
            ${related.map((row) => `
              <li>
                <a href="/info-artikel.html?slug=${encodeURIComponent(row.slug || row.id)}">${esc(row.title)}</a>
                <small>${esc(formatDateID(row.published_at || row.created_at || ""))}</small>
              </li>`).join("") || "<li><small>Belum ada artikel terkait.</small></li>"}
          </ul>
          <hr>
          <h3 class="sidebar-title">Kategori</h3>
          <div class="sidebar-tags">
            ${(tags.length ? tags : ["general"]).map((t) => `<span class="tag-chip">#${esc(t)}</span>`).join("")}
          </div>
        </aside>
      </div>
    </div>
  </div>
</section>`;
      if (recommendEl) {
        const recommendations = rows.filter((row) => String(row.id) !== String(id)).slice(0, 3);
        recommendEl.innerHTML = recommendations.length
          ? recommendations.map(cardHtml).join("")
          : '<div class="blog-empty">Belum ada rekomendasi artikel lain.</div>';
      }
    } catch (_e) {
      if (heroEl) {
        heroEl.innerHTML = "";
      }
      articleEl.innerHTML = `<div class="blog-empty">Artikel tidak ditemukan.</div>`;
      if (recommendEl) {
        recommendEl.innerHTML = "";
      }
    }
  }

  if (mode === "detail") {
    loadDetail();
    return;
  }
  loadList();
})();

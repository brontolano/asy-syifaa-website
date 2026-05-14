const form = document.getElementById("uploadForm");
const msgEl = document.getElementById("uploadMsg");
const listEl = document.getElementById("libraryList");
const listInfoEl = document.getElementById("listInfo");
const uploadSection = document.getElementById("uploadSection");
const lockedSection = document.getElementById("lockedSection");
const filterForm = document.getElementById("filterForm");
const resetFilterBtn = document.getElementById("resetFilter");

let currentFilter = { q: "", category: "", language: "" };

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function escapeHtml(value) {
  return (value || "")
    .toString()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function row(item) {
  const uploaded = new Date(item.uploadedAt).toLocaleString("id-ID");
  const tags = (item.tags || []).length ? item.tags.map((v) => `<span class="tag-chip">${escapeHtml(v)}</span>`).join("") : "-";
  return `
    <article class="library-item">
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>Penulis: ${escapeHtml(item.author || "-")}</p>
        <p>Kategori: ${escapeHtml(item.category || "-")} • Bahasa: ${escapeHtml(item.language || "-")}</p>
        <p>Tag: ${tags}</p>
        <p>${escapeHtml(item.originalName)} • ${formatBytes(item.fileSize)} • ${uploaded}</p>
      </div>
      <div class="actions">
        <a class="btn ghost" href="${item.fileUrl}" target="_blank" rel="noreferrer">Buka PDF</a>
      </div>
    </article>
  `;
}

function toQueryString(filter) {
  const q = new URLSearchParams();
  if (filter.q) q.set("q", filter.q);
  if (filter.category) q.set("category", filter.category);
  if (filter.language) q.set("language", filter.language);
  return q.toString();
}

async function loadLibrary() {
  const qs = toQueryString(currentFilter);
  const resp = await fetch(`/api/perpustakaan/search${qs ? `?${qs}` : ""}`);
  const data = await resp.json();

  listInfoEl.textContent = `${data.total || 0} dokumen ditemukan`;

  if (!data.data.length) {
    listEl.innerHTML = "<p class='note'>Belum ada dokumen sesuai filter.</p>";
    return;
  }

  listEl.innerHTML = data.data.map(row).join("");
}

async function applyUploadAccess() {
  const s = await window.erpAuth.getSession();
  if (s.authenticated && s.role === "superadmin") {
    uploadSection.hidden = false;
    lockedSection.hidden = true;
    msgEl.textContent = "Mode superadmin aktif: upload PDF diizinkan.";
    return;
  }
  uploadSection.hidden = true;
  lockedSection.hidden = false;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const category = document.getElementById("category").value.trim();
  const language = document.getElementById("language").value.trim();
  const tags = document.getElementById("tags").value.trim();
  const pdf = document.getElementById("pdf").files[0];

  if (!pdf) {
    msgEl.textContent = "Pilih file PDF dulu.";
    return;
  }

  const body = new FormData();
  body.append("title", title);
  body.append("author", author);
  body.append("category", category);
  body.append("language", language);
  body.append("tags", tags);
  body.append("pdf", pdf);

  msgEl.textContent = "Sedang upload...";

  const resp = await fetch("/api/library/upload", { method: "POST", body });
  const data = await resp.json();

  if (!resp.ok) {
    msgEl.textContent = data.message || "Upload gagal.";
    return;
  }

  msgEl.textContent = `Upload berhasil: ${data.title}`;
  form.reset();
  await loadLibrary();
});

filterForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  currentFilter = {
    q: document.getElementById("q").value.trim(),
    category: document.getElementById("filterCategory").value.trim(),
    language: document.getElementById("filterLanguage").value.trim()
  };
  await loadLibrary();
});

resetFilterBtn.addEventListener("click", async () => {
  filterForm.reset();
  currentFilter = { q: "", category: "", language: "" };
  await loadLibrary();
});

applyUploadAccess();
loadLibrary();

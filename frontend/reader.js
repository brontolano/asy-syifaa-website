const titleEl = document.getElementById("readerTitle");
const metaEl = document.getElementById("readerMeta");
const frameEl = document.getElementById("readerFrame");
const formEl = document.getElementById("readerBookmarkForm");
const msgEl = document.getElementById("readerMsg");

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name) || "";
}

async function loadBook() {
  const id = getParam("id");
  if (!id) {
    metaEl.textContent = "ID buku tidak ditemukan.";
    return;
  }

  const resp = await fetch(`/api/perpustakaan/books`);
  const data = await resp.json();
  const book = (data.data || []).find((v) => v.id === id);
  if (!book) {
    metaEl.textContent = "Buku tidak ditemukan.";
    return;
  }

  titleEl.textContent = book.title || "Reader PDF";
  metaEl.textContent = `Penulis: ${book.author || "-"} | Kategori: ${book.category || "-"}`;
  frameEl.src = book.fileUrl;
}

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = getParam("id");
  const page = Number(document.getElementById("readerPage").value);
  const note = document.getElementById("readerNote").value.trim();
  const resp = await fetch("/api/perpustakaan/bookmarks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookId: id, page, note })
  });
  const data = await resp.json();
  if (!resp.ok) {
    msgEl.textContent = data.message || "Gagal simpan bookmark.";
    return;
  }
  msgEl.textContent = `Bookmark tersimpan di halaman ${data.page}`;
});

loadBook();

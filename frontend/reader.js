const titleEl = document.getElementById("readerTitle");
const metaEl = document.getElementById("readerMeta");
const frameEl = document.getElementById("readerFrame");
const formEl = document.getElementById("readerBookmarkForm");
const msgEl = document.getElementById("readerMsg");
const prevBtn = document.getElementById("prevPageBtn");
const nextBtn = document.getElementById("nextPageBtn");
const gotoInput = document.getElementById("gotoPageInput");
const gotoBtn = document.getElementById("gotoPageBtn");
const pageInfo = document.getElementById("pageInfo");

let currentBook = null;
let currentPage = 1;

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name) || "";
}

function setReaderPage(page) {
  if (!currentBook) return;
  currentPage = Math.max(1, Number(page) || 1);
  frameEl.src = `${currentBook.fileUrl}#page=${currentPage}`;
  pageInfo.textContent = `Page ${currentPage}`;
  gotoInput.value = String(currentPage);
  document.getElementById("readerPage").value = String(currentPage);
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

  currentBook = book;
  titleEl.textContent = book.title || "Reader PDF";
  metaEl.textContent = `Penulis: ${book.author || "-"} | Kategori: ${book.category || "-"}`;
  setReaderPage(1);
}

prevBtn.addEventListener("click", () => setReaderPage(currentPage - 1));
nextBtn.addEventListener("click", () => setReaderPage(currentPage + 1));
gotoBtn.addEventListener("click", () => setReaderPage(Number(gotoInput.value || 1)));

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") setReaderPage(currentPage - 1);
  if (e.key === "ArrowRight") setReaderPage(currentPage + 1);
});

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

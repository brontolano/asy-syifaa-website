(function () {
  const form = document.getElementById("cmsArticleForm");
  if (!form) return;

  const state = {
    token: "",
    editingId: null
  };

  const authStatus = document.getElementById("authStatus");
  const listEl = document.getElementById("cmsPostList");
  const bodyInput = document.getElementById("contentHtml");
  const coverUrlInput = document.getElementById("coverUrl");
  const bodyImageInput = document.getElementById("bodyImageFile");

  function setStatus(msg, ok = true) {
    authStatus.textContent = msg;
    authStatus.className = ok ? "text-success small" : "text-danger small";
  }

  const API_BASE = window.ASF_API_BASE || "";

  async function api(path, options = {}) {
    const headers = Object.assign({}, options.headers || {});
    if (state.token) headers.Authorization = `Bearer ${state.token}`;
    const url = path.startsWith("http") ? path : API_BASE + path;
    const res = await fetch(url, { ...options, headers });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data?.ok === false) throw new Error(data?.message || "request gagal");
    return data;
  }

  function splitTags(raw) {
    return String(raw || "").split(",").map((t) => t.trim()).filter(Boolean);
  }

  function serializeTags(tags) {
    return tags.join(", ");
  }

  async function uploadFile(file, folder) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", folder);
    const res = await fetch(API_BASE + "/api/media/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${state.token}` },
      body: fd
    });
    const payload = await res.json().catch(() => ({}));
    if (!res.ok || payload?.ok === false) throw new Error(payload?.message || "Upload gagal");
    return payload?.data?.url || "";
  }

  async function loginCms() {
    const identity = document.getElementById("identity").value || "Mudir Aam";
    const role = document.getElementById("role").value || "superadmin";
    const res = await fetch(API_BASE + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identity, role })
    });
    const payload = await res.json();
    if (!res.ok || payload?.ok === false || !payload?.token) {
      throw new Error(payload?.message || "Login CMS gagal");
    }
    state.token = payload.token;
    setStatus(`Login CMS berhasil sebagai ${payload.user?.role || role}.`);
  }

  function insertAtCursor(field, text) {
    const start = field.selectionStart || 0;
    const end = field.selectionEnd || 0;
    const before = field.value.slice(0, start);
    const after = field.value.slice(end);
    field.value = `${before}${text}${after}`;
    const nextPos = start + text.length;
    field.focus();
    field.setSelectionRange(nextPos, nextPos);
  }

  async function loadPosts() {
    const payload = await api("/api/public/content/announcements?status=aktif");
    const rows = Array.isArray(payload.data) ? payload.data : [];
    listEl.innerHTML = rows.map((item) => `
<button type="button" class="list-group-item list-group-item-action" data-id="${item.id}">
  <strong>${item.title}</strong><br>
  <small>${item.date} • ${item.author || "Admin"}</small>
</button>`).join("") || '<div class="text-muted small p-3">Belum ada artikel aktif.</div>';

    listEl.querySelectorAll("button[data-id]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        const found = rows.find((r) => String(r.id) === String(id));
        if (!found) return;
        state.editingId = found.id;
        form.title.value = found.title || "";
        form.date.value = found.date || "";
        form.author.value = found.author || "";
        form.category.value = found.category || "general";
        form.status.value = found.status || "aktif";
        form.tags.value = Array.isArray(found.tags) ? serializeTags(found.tags) : (found.tags || "");
        form.excerpt.value = found.excerpt || "";
        form.content.value = found.content || "";
        form.contentHtml.value = found.content_html || "";
        form.coverUrl.value = found.cover_url || "";
      });
    });
  }

  document.getElementById("btnCmsLogin").addEventListener("click", async () => {
    try {
      await loginCms();
      await loadPosts();
    } catch (err) {
      setStatus(String(err.message || err), false);
    }
  });

  document.getElementById("btnResetForm").addEventListener("click", () => {
    state.editingId = null;
    form.reset();
  });

  document.getElementById("btnInsertImage").addEventListener("click", async () => {
    try {
      if (!state.token) throw new Error("Silakan login CMS dulu.");
      const file = bodyImageInput.files?.[0];
      if (!file) throw new Error("Pilih gambar dulu.");
      const url = await uploadFile(file, "artikel");
      insertAtCursor(bodyInput, `\n<p><img src="${url}" alt="Gambar Artikel"></p>\n`);
      setStatus("Gambar berhasil di-insert ke konten.");
    } catch (err) {
      setStatus(String(err.message || err), false);
    }
  });

  document.getElementById("coverFile").addEventListener("change", async (ev) => {
    try {
      if (!state.token) return;
      const file = ev.target.files?.[0];
      if (!file) return;
      const url = await uploadFile(file, "cover-artikel");
      coverUrlInput.value = url;
      setStatus("Cover berhasil diupload.");
    } catch (err) {
      setStatus(String(err.message || err), false);
    }
  });

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    try {
      if (!state.token) throw new Error("Silakan login CMS dulu.");
      const payload = {
        title: form.title.value.trim(),
        date: form.date.value,
        author: form.author.value.trim(),
        category: form.category.value.trim() || "general",
        status: form.status.value,
        tags: splitTags(form.tags.value),
        excerpt: form.excerpt.value.trim(),
        content: form.content.value.trim(),
        content_html: form.contentHtml.value.trim(),
        cover_url: form.coverUrl.value.trim()
      };
      const isEdit = Boolean(state.editingId);
      const path = isEdit ? `/api/cms/content/announcements/${state.editingId}` : "/api/cms/content/announcements";
      await api(path, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setStatus(isEdit ? "Artikel berhasil diperbarui." : "Artikel berhasil dipublikasikan.");
      if (!isEdit) form.reset();
      state.editingId = null;
      await loadPosts();
    } catch (err) {
      setStatus(String(err.message || err), false);
    }
  });
})();

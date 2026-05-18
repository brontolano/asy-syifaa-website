"use client";
import { useEffect, useState } from "react";
import { fetchApi } from "../../../lib/api-client";
import { readRole } from "../../../lib/session";

const CATEGORIES = ["PPDB", "Akademik", "Keuangan", "Kegiatan", "Umum"];

const EMPTY_FORM = { id: null, title: "", date: "", category: "Umum", status: "draft", author: "", content: "" };

export default function PengumumanPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const role = readRole();

  async function load() {
    const res = await fetchApi("/api/public/content/announcements");
    setItems(Array.isArray(res.data?.data) ? res.data.data : []);
  }

  useEffect(() => { load(); }, []);

  async function submitForm(event) {
    event.preventDefault();
    setSaving(true);
    const isEdit = Boolean(form.id);
    const path = isEdit ? `/api/cms/content/announcements/${form.id}` : "/api/cms/content/announcements";
    const res = await fetchApi(path, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json", "x-role": role || "superadmin" },
      body: JSON.stringify(form)
    });
    setSaving(false);
    if (!res.ok) {
      setMessage(res.data?.message || "Gagal menyimpan pengumuman.");
      return;
    }
    setForm(EMPTY_FORM);
    setMessage(isEdit ? "Pengumuman diperbarui." : "Pengumuman ditambahkan.");
    await load();
  }

  async function deleteItem(id) {
    const res = await fetchApi(`/api/cms/content/announcements/${id}`, {
      method: "DELETE",
      headers: { "x-role": role || "superadmin" }
    });
    if (!res.ok) {
      setMessage(res.data?.message || "Gagal menghapus pengumuman.");
      return;
    }
    setMessage("Pengumuman dihapus.");
    await load();
  }

  return (
    <div style={{ padding: "1rem 1.25rem 2rem", display: "grid", gap: "0.85rem" }}>
      <form onSubmit={submitForm} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1rem", display: "grid", gap: "0.55rem" }}>
        <h3 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800 }}>🧩 CMS Pengumuman</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "0.55rem" }}>
          <input placeholder="Judul" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
          <input type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} required />
          <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}>
            {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}>
            <option value="aktif">aktif</option>
            <option value="draft">draft</option>
            <option value="arsip">arsip</option>
          </select>
          <input placeholder="Penulis" value={form.author} onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))} />
        </div>
        <textarea placeholder="Isi pengumuman" value={form.content} onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))} rows={4} required />
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button className="asf-button asf-button-primary" type="submit" disabled={saving}>{saving ? "Menyimpan..." : form.id ? "Update" : "Tambah"}</button>
          {form.id ? <button type="button" className="asf-button asf-button-secondary" onClick={() => setForm(EMPTY_FORM)}>Batal Edit</button> : null}
          {message ? <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{message}</span> : null}
        </div>
      </form>

      <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1rem", display: "grid", gap: "0.55rem" }}>
        {items.map((item) => (
          <div key={item.id} style={{ borderBottom: "1px solid var(--line)", paddingBottom: "0.55rem" }}>
            <strong>{item.title}</strong>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.date} · {item.category} · {item.status}</div>
            <div style={{ marginTop: "0.35rem", display: "flex", gap: "0.4rem" }}>
              <button className="asf-button asf-button-secondary" type="button" onClick={() => setForm({ ...item })}>Edit</button>
              <button className="asf-button asf-button-secondary" type="button" onClick={() => deleteItem(item.id)}>Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

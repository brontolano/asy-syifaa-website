"use client";
import { useEffect, useState } from "react";
import { fetchApi } from "../../../lib/api-client";
import { readRole } from "../../../lib/session";

const EMPTY_FORM = { id: null, title: "", date: "", endDate: "", type: "Kegiatan", status: "Mendatang", desc: "", wajib: false };

export default function KegiatanPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const role = readRole();

  async function load() {
    const res = await fetchApi("/api/public/content/events");
    setItems(Array.isArray(res.data?.data) ? res.data.data : []);
  }
  useEffect(() => { load(); }, []);

  async function submitForm(event) {
    event.preventDefault();
    setSaving(true);
    const isEdit = Boolean(form.id);
    const path = isEdit ? `/api/cms/content/events/${form.id}` : "/api/cms/content/events";
    const res = await fetchApi(path, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json", "x-role": role || "superadmin" },
      body: JSON.stringify({ ...form, endDate: form.endDate || form.date })
    });
    setSaving(false);
    if (!res.ok) return setMessage(res.data?.message || "Gagal menyimpan agenda.");
    setForm(EMPTY_FORM);
    setMessage(isEdit ? "Agenda diperbarui." : "Agenda ditambahkan.");
    await load();
  }

  async function deleteItem(id) {
    const res = await fetchApi(`/api/cms/content/events/${id}`, {
      method: "DELETE",
      headers: { "x-role": role || "superadmin" }
    });
    if (!res.ok) return setMessage(res.data?.message || "Gagal menghapus agenda.");
    setMessage("Agenda dihapus.");
    await load();
  }

  return (
    <div style={{ padding: "1rem 1.25rem 2rem", display: "grid", gap: "0.85rem" }}>
      <form onSubmit={submitForm} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1rem", display: "grid", gap: "0.55rem" }}>
        <h3 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800 }}>🗓️ CMS Agenda Kegiatan</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "0.55rem" }}>
          <input placeholder="Judul agenda" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
          <input type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} required />
          <input type="date" value={form.endDate} onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))} />
          <input placeholder="Tipe (Kegiatan/PPDB/Ibadah...)" value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))} />
          <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}>
            <option value="Mendatang">Mendatang</option>
            <option value="Selesai">Selesai</option>
          </select>
          <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem" }}><input type="checkbox" checked={form.wajib} onChange={(e) => setForm((p) => ({ ...p, wajib: e.target.checked }))} /> Wajib Hadir</label>
        </div>
        <textarea placeholder="Deskripsi agenda" value={form.desc} onChange={(e) => setForm((p) => ({ ...p, desc: e.target.value }))} rows={3} />
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
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{item.date}{item.endDate && item.endDate !== item.date ? ` - ${item.endDate}` : ""} · {item.type} · {item.status}</div>
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

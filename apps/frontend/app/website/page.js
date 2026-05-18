"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchApi } from "../../lib/api-client";

export default function WebsiteCmsPanelPage() {
  const [ann, setAnn] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    async function load() {
      const [a, e, g] = await Promise.all([
        fetchApi("/api/public/content/announcements"),
        fetchApi("/api/public/content/events"),
        fetchApi("/api/public/content/gallery")
      ]);
      setAnn(Array.isArray(a.data?.data) ? a.data.data : []);
      setEvents(Array.isArray(e.data?.data) ? e.data.data : []);
      setGallery(Array.isArray(g.data?.data) ? g.data.data : []);
    }
    load();
  }, []);

  return (
    <div className="asf-module-wrap asf-module-wrap--gradient">
      <header className="asf-module-header">
        <p className="asf-eyebrow">Website CMS</p>
        <h1>Panel Konten Website</h1>
        <p>Kelola konten publik dari ERP: pengumuman, agenda kegiatan, dan galeri.</p>
      </header>

      <div style={{ display: "flex", gap: "0.55rem", flexWrap: "wrap" }}>
        <Link href="/website/pengumuman" className="asf-button asf-button-primary">Kelola Pengumuman</Link>
        <Link href="/website/kegiatan" className="asf-button asf-button-secondary">Kelola Agenda</Link>
        <Link href="/website/galeri" className="asf-button asf-button-secondary">Kelola Galeri</Link>
      </div>

      <article className="asf-card">
        <h3 style={{ marginTop: 0 }}>📢 Pengumuman (terbaru)</h3>
        <div className="asf-table-wrap">
          <table className="asf-table">
            <thead><tr><th>Judul</th><th>Tanggal</th><th>Kategori</th><th>Status</th></tr></thead>
            <tbody>
              {ann.slice(0, 8).map((row) => (
                <tr key={row.id}><td>{row.title}</td><td>{row.date}</td><td>{row.category}</td><td>{row.status}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="asf-card">
        <h3 style={{ marginTop: 0 }}>📅 Agenda (terbaru)</h3>
        <div className="asf-table-wrap">
          <table className="asf-table">
            <thead><tr><th>Judul</th><th>Mulai</th><th>Selesai</th><th>Tipe</th><th>Status</th></tr></thead>
            <tbody>
              {events.slice(0, 8).map((row) => (
                <tr key={row.id}><td>{row.title}</td><td>{row.date}</td><td>{row.endDate || row.date}</td><td>{row.type}</td><td>{row.status}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="asf-card">
        <h3 style={{ marginTop: 0 }}>🖼️ Galeri (terbaru)</h3>
        <div className="asf-table-wrap">
          <table className="asf-table">
            <thead><tr><th>Judul</th><th>Tanggal</th><th>Kategori</th><th>Cover</th><th>Jumlah</th></tr></thead>
            <tbody>
              {gallery.slice(0, 8).map((row) => (
                <tr key={row.id}><td>{row.title}</td><td>{row.date}</td><td>{row.category}</td><td>{row.cover || "🖼️"}</td><td>{row.count || 0}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}

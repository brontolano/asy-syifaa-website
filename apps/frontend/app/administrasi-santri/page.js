"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchApi } from "../../lib/api-client";

const STATUS_OPTIONS = ["aktif", "alumni", "keluar"];

export default function AdministrasiSantriPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("semua");
  const [form, setForm] = useState({
    nis: "",
    full_name: "",
    class_name: "",
    guardian_name: ""
  });

  async function loadStudents() {
    setLoading(true);
    setError("");
    const res = await fetchApi("/api/students");
    if (!res.ok) {
      setRows([]);
      setError(res.data?.message || "Gagal memuat data santri");
      setLoading(false);
      return;
    }
    setRows(Array.isArray(res.data) ? res.data : []);
    setLoading(false);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  const filteredRows = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return rows.filter((row) => {
      const statusOk = statusFilter === "semua" ? true : String(row.status || "").toLowerCase() === statusFilter;
      if (!statusOk) return false;
      if (!keyword) return true;
      const haystack = [row.nis, row.full_name, row.class_name, row.guardian_name].join(" ").toLowerCase();
      return haystack.includes(keyword);
    });
  }, [rows, query, statusFilter]);

  async function handleCreate(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetchApi("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-role": "mudir"
      },
      body: JSON.stringify(form)
    });
    setSaving(false);
    if (!res.ok) {
      setError(res.data?.message || "Gagal menambah data santri");
      return;
    }
    setForm({ nis: "", full_name: "", class_name: "", guardian_name: "" });
    await loadStudents();
  }

  async function handleStatusUpdate(id, nextStatus) {
    setError("");
    const res = await fetchApi(`/api/students/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-role": "mudir"
      },
      body: JSON.stringify({ status: nextStatus })
    });
    if (!res.ok) {
      setError(res.data?.message || "Gagal mengubah status santri");
      return;
    }
    await loadStudents();
  }

  const total = rows.length;
  const aktif = rows.filter((item) => item.status === "aktif").length;
  const alumni = rows.filter((item) => item.status === "alumni").length;
  const keluar = rows.filter((item) => item.status === "keluar").length;
  const lastUpdated = new Date().toLocaleTimeString("id-ID", { hour12: false });

  return (
    <>
      <section style={{ background: "linear-gradient(140deg, rgb(15, 61, 37) 0%, rgb(31, 107, 67) 55%, rgb(42, 138, 87) 100%)", color: "rgb(255, 255, 255)", padding: "1.2rem 1rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 85% 20%, rgba(255, 255, 255, 0.07), transparent 55%)", pointerEvents: "none" }} />
        <div style={{ transform: "translateY(0px)", transition: "transform 120ms" }}>
          <p style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255, 255, 255, 0.15)", border: "1px solid rgba(255, 255, 255, 0.25)", borderRadius: "999px", padding: "0.25rem 0.65rem", fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.6rem", color: "rgb(214, 245, 227)" }}>
            📊 Dashboard Role-Based ERP
          </p>
          <h1 style={{ margin: "0px 0px 0.35rem", fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>Master Data Santri</h1>
          <p style={{ margin: 0, color: "rgba(255, 255, 255, 0.86)", fontSize: "0.86rem" }}>
            Kelola data pokok santri aktif, alumni, dan keluar agar siap dipakai modul ERP lain.
          </p>
          <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.45rem", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", background: "rgba(50, 220, 100, 0.2)", border: "1px solid rgba(50, 220, 100, 0.4)", borderRadius: "999px", padding: "0.23rem 0.58rem", fontSize: "0.74rem", fontWeight: 700, color: "rgb(167, 243, 196)" }}>
              ● Sistem Normal
            </span>
            <button type="button" className="asf-button asf-button-secondary" onClick={loadStudents} style={{ padding: "0.22rem 0.64rem", borderRadius: "999px", fontSize: "0.76rem" }}>
              ⟳ Sinkronkan Data
            </button>
          </div>
          <p style={{ margin: "0.55rem 0px 0px", fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.65)" }}>
            Update terakhir: {lastUpdated} WIB
          </p>
        </div>
      </section>

      <section className="asf-module-wrap asf-module-wrap--gradient">

      <div className="asf-kpi-grid">
        <article className="asf-kpi-card"><p>Total Santri</p><strong>{total}</strong></article>
        <article className="asf-kpi-card"><p>Santri Aktif</p><strong>{aktif}</strong></article>
        <article className="asf-kpi-card"><p>Alumni</p><strong>{alumni}</strong></article>
        <article className="asf-kpi-card"><p>Keluar</p><strong>{keluar}</strong></article>
      </div>

      {error ? <p className="asf-error-box">{error}</p> : null}

      <article className="asf-card">
        <h2>Tambah Data Santri</h2>
        <form onSubmit={handleCreate} className="asf-grid-form">
          <label>
            NIS
            <input
              value={form.nis}
              onChange={(event) => setForm((prev) => ({ ...prev, nis: event.target.value }))}
              required
            />
          </label>
          <label>
            Nama Lengkap
            <input
              value={form.full_name}
              onChange={(event) => setForm((prev) => ({ ...prev, full_name: event.target.value }))}
              required
            />
          </label>
          <label>
            Kelas
            <input
              value={form.class_name}
              onChange={(event) => setForm((prev) => ({ ...prev, class_name: event.target.value }))}
              required
            />
          </label>
          <label>
            Nama Wali
            <input
              value={form.guardian_name}
              onChange={(event) => setForm((prev) => ({ ...prev, guardian_name: event.target.value }))}
            />
          </label>
          <button type="submit" disabled={saving}>
            {saving ? "Menyimpan..." : "Simpan Data Santri"}
          </button>
        </form>
      </article>

      <article className="asf-card">
        <div className="asf-card-toolbar">
          <h2>Daftar Master Data</h2>
          <button type="button" onClick={loadStudents} disabled={loading}>{loading ? "Memuat..." : "Refresh"}</button>
        </div>
        <div className="asf-filter-row">
          <input
            type="search"
            placeholder="Cari NIS / nama / kelas / wali"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="semua">Semua Status</option>
            {STATUS_OPTIONS.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="asf-table-wrap">
          <table className="asf-table">
            <thead>
              <tr>
                <th>NIS</th>
                <th>Nama Santri</th>
                <th>Kelas</th>
                <th>Wali</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.nis}</td>
                  <td>{row.full_name}</td>
                  <td>{row.class_name}</td>
                  <td>{row.guardian_name || "-"}</td>
                  <td>{row.status || "-"}</td>
                  <td>
                    <div className="asf-inline-actions">
                      {STATUS_OPTIONS.map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => handleStatusUpdate(row.id, status)}
                          disabled={String(row.status) === status}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={6}>Belum ada data yang sesuai filter.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </article>
      </section>
    </>
  );
}

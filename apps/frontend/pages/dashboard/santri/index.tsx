import { FormEvent, useEffect, useMemo, useState } from "react";

type Santri = {
  id: string;
  nis: string;
  namaLengkap: string;
  tanggalLahir: string;
  alamat: string;
  statusAktif: boolean;
  kamarId?: string | null;
  userId: string;
};

type FormState = {
  userId: string;
  nis: string;
  namaLengkap: string;
  kamarId: string;
  tanggalLahir: string;
  alamat: string;
  statusAktif: boolean;
};

const emptyForm: FormState = {
  userId: "",
  nis: "",
  namaLengkap: "",
  kamarId: "",
  tanggalLahir: "",
  alamat: "",
  statusAktif: true
};

export default function SantriDashboardPage() {
  const [items, setItems] = useState<Santri[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [message, setMessage] = useState<string>("");
  const pageSize = 10;

  const fetchList = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
      if (search) params.set("search", search);
      const res = await fetch(`/api/santri?${params.toString()}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (_error) {
      setMessage("Gagal memuat data santri.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [page]);

  const onOpenCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const onOpenEdit = (item: Santri) => {
    setEditId(item.id);
    setForm({
      userId: item.userId,
      nis: item.nis,
      namaLengkap: item.namaLengkap,
      kamarId: item.kamarId ?? "",
      tanggalLahir: item.tanggalLahir.slice(0, 10),
      alamat: item.alamat,
      statusAktif: item.statusAktif
    });
    setShowForm(true);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const endpoint = editId ? `/api/santri/${editId}` : "/api/santri";
      const method = editId ? "PUT" : "POST";
      const payload = {
        ...form,
        kamarId: form.kamarId || null,
        tanggalLahir: new Date(form.tanggalLahir).toISOString()
      };

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Penyimpanan gagal.");
        return;
      }

      setShowForm(false);
      setMessage(editId ? "Data santri berhasil diperbarui." : "Santri baru berhasil ditambahkan.");
      await fetchList();
    } catch (_error) {
      setMessage("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const onDeactivate = async (id: string) => {
    try {
      const res = await fetch(`/api/santri/${id}/deactivate`, { method: "PATCH" });
      if (!res.ok) {
        setMessage("Gagal menonaktifkan santri.");
        return;
      }
      await fetchList();
      setMessage("Santri dinonaktifkan.");
    } catch (_error) {
      setMessage("Gagal menonaktifkan santri.");
    }
  };

  const tableRows = useMemo(() => items, [items]);

  return (
    <main style={{ padding: 16, maxWidth: 1080, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama atau NIS"
          style={{ flex: 1, minWidth: 220, padding: 10, borderRadius: 8, border: "1px solid #d1d5db" }}
        />
        <button onClick={() => fetchList()} style={{ padding: "10px 14px" }}>Cari</button>
        <button onClick={onOpenCreate} style={{ padding: "10px 14px" }}>Tambah Santri Baru</button>
      </div>

      {message ? <p style={{ marginBottom: 12 }}>{message}</p> : null}

      {loading ? <p>Memuat data...</p> : null}

      <section className="mobile-cards" style={{ display: "grid", gap: 10 }}>
        {tableRows.map((item) => (
          <article key={item.id} style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 }}>
            <strong>{item.namaLengkap}</strong>
            <p>NIS: {item.nis}</p>
            <p>Status: {item.statusAktif ? "Aktif" : "Nonaktif"}</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => onOpenEdit(item)}>Edit</button>
              <button onClick={() => onDeactivate(item.id)}>Nonaktifkan</button>
            </div>
          </article>
        ))}
      </section>

      <section className="desktop-table" style={{ overflowX: "auto", marginTop: 18 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th align="left">NIS</th>
              <th align="left">Nama</th>
              <th align="left">Tanggal Lahir</th>
              <th align="left">Status</th>
              <th align="left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((item) => (
              <tr key={item.id}>
                <td>{item.nis}</td>
                <td>{item.namaLengkap}</td>
                <td>{item.tanggalLahir.slice(0, 10)}</td>
                <td>{item.statusAktif ? "Aktif" : "Nonaktif"}</td>
                <td>
                  <button onClick={() => onOpenEdit(item)}>Edit</button>
                  <button onClick={() => onDeactivate(item.id)} style={{ marginLeft: 8 }}>Nonaktifkan</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <button disabled={page <= 1} onClick={() => setPage((prev) => prev - 1)}>Prev</button>
        <span>Halaman {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>

      {showForm ? (
        <div style={{ marginTop: 20, border: "1px solid #d1d5db", borderRadius: 12, padding: 14 }}>
          <h2>{editId ? "Edit Data Santri" : "Tambah Santri Baru"}</h2>
          <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
            <input required placeholder="User ID (UUID)" value={form.userId} onChange={(e) => setForm({ ...form, userId: e.target.value })} />
            <input required placeholder="NIS" value={form.nis} onChange={(e) => setForm({ ...form, nis: e.target.value })} />
            <input required placeholder="Nama Lengkap" value={form.namaLengkap} onChange={(e) => setForm({ ...form, namaLengkap: e.target.value })} />
            <input placeholder="Kamar ID (opsional)" value={form.kamarId} onChange={(e) => setForm({ ...form, kamarId: e.target.value })} />
            <input required type="date" value={form.tanggalLahir} onChange={(e) => setForm({ ...form, tanggalLahir: e.target.value })} />
            <textarea required placeholder="Alamat" value={form.alamat} onChange={(e) => setForm({ ...form, alamat: e.target.value })} />
            <label>
              <input type="checkbox" checked={form.statusAktif} onChange={(e) => setForm({ ...form, statusAktif: e.target.checked })} /> Status Aktif
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="submit">Simpan</button>
              <button type="button" onClick={() => setShowForm(false)}>Batal</button>
            </div>
          </form>
        </div>
      ) : null}

      <style jsx>{`
        .desktop-table { display: none; }
        @media (min-width: 860px) {
          .mobile-cards { display: none; }
          .desktop-table { display: block; }
        }
        th, td {
          border-bottom: 1px solid #e5e7eb;
          padding: 10px 8px;
        }
      `}</style>
    </main>
  );
}

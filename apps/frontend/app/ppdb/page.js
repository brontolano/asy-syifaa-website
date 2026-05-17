"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchApi } from "../../lib/api-client";

const STEPS = ["Formulir", "Dokumen", "Jadwal Tes", "Status"];

const JENJANG = ["MTs (SMP)", "MA (SMA)"];
const JALUR   = ["Reguler", "Prestasi Akademik", "Tahfidz", "Beasiswa"];
const GENDER  = ["Laki-laki", "Perempuan"];
const PROVINSI = ["Jawa Barat", "Jawa Tengah", "Jawa Timur", "DKI Jakarta", "Banten", "Lainnya"];

const DUMMY_REGISTRANTS = [
  { id: "PPDB-001", nama: "Ahmad Fauzan", jenjang: "MTs (SMP)", jalur: "Reguler",  status: "Lulus Seleksi", tgl: "2025-05-10" },
  { id: "PPDB-002", nama: "Siti Aisyah",  jenjang: "MA (SMA)",  jalur: "Tahfidz",  status: "Menunggu Tes",  tgl: "2025-05-12" },
  { id: "PPDB-003", nama: "Rizki Maulana", jenjang: "MTs (SMP)", jalur: "Beasiswa", status: "Pending Dokumen", tgl: "2025-05-14" },
  { id: "PPDB-004", nama: "Nur Hidayah",  jenjang: "MA (SMA)",  jalur: "Reguler",  status: "Tidak Lulus",   tgl: "2025-05-08" },
];

const STATUS_CFG = {
  "Lulus Seleksi":   { bg: "var(--success-bg)", fg: "var(--success-fg)", border: "rgba(24,117,72,0.2)" },
  "Menunggu Tes":    { bg: "var(--warn-bg)",    fg: "var(--warn-fg)",    border: "rgba(161,93,6,0.2)" },
  "Pending Dokumen": { bg: "var(--warn-bg)",    fg: "var(--warn-fg)",    border: "rgba(161,93,6,0.2)" },
  "Tidak Lulus":     { bg: "var(--danger-bg)",  fg: "var(--danger-fg)",  border: "rgba(178,58,47,0.2)" },
};

const JADWAL_TES = [
  { gelombang: "Gelombang I",  tanggal: "15 Juni 2025",  kuota: 80,  sisa: 24, status: "Buka" },
  { gelombang: "Gelombang II", tanggal: "29 Juni 2025",  kuota: 80,  sisa: 80, status: "Buka" },
  { gelombang: "Gelombang III", tanggal: "13 Juli 2025", kuota: 40,  sisa: 40, status: "Buka" },
];

const BIAYA_ITEMS = [
  { item: "Formulir Pendaftaran", nominal: 50000, keterangan: "Tidak dapat dikembalikan" },
  { item: "Uang Pangkal",         nominal: 3500000, keterangan: "Dibayar setelah diterima" },
  { item: "Seragam Lengkap",     nominal: 1200000, keterangan: "3 pasang seragam + perlengkapan" },
  { item: "SPP Bulan Pertama",   nominal: 750000, keterangan: "Dibayar di awal masuk" },
];

export default function PpdbPage() {
  const [activeTab, setActiveTab] = useState("daftar"); // daftar | pantau | info
  const [step, setStep] = useState(0);
  const [apiOk, setApiOk] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [regCode, setRegCode] = useState("");
  const [cekId, setCekId] = useState("");
  const [cekResult, setCekResult] = useState(null);

  const [form, setForm] = useState({
    nama_lengkap: "", nama_panggilan: "", tempat_lahir: "", tanggal_lahir: "",
    jenis_kelamin: "Laki-laki", jenjang: "MTs (SMP)", jalur: "Reguler",
    asal_sekolah: "", tahun_lulus: "", nilai_rata: "",
    nama_ayah: "", nama_ibu: "", pekerjaan_ayah: "", no_hp_wali: "",
    alamat: "", kota: "", provinsi: "Jawa Barat",
    motivasi: "", prestasi: "", hafalan_juz: "",
  });

  function f(k, v) { setForm(p => ({ ...p, [k]: v })); }

  useEffect(() => {
    fetchApi("/api/health").then(r => setApiOk(r.ok)).catch(() => {});
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 900)); // simulate network
    const code = "PPDB-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    setRegCode(code);
    setSubmitted(true);
    setSubmitting(false);
  }

  function handleCek(e) {
    e.preventDefault();
    const found = DUMMY_REGISTRANTS.find(r => r.id.toLowerCase() === cekId.toLowerCase() || r.nama.toLowerCase().includes(cekId.toLowerCase()));
    setCekResult(found || null);
  }

  const fmt = (n) => new Intl.NumberFormat("id-ID").format(n);
  const totalBiaya = BIAYA_ITEMS.reduce((s, i) => s + i.nominal, 0);

  const TABS = [
    { id: "daftar", label: "📋 Daftar Baru" },
    { id: "pantau", label: "🔍 Cek Status" },
    { id: "info",   label: "ℹ️ Informasi PPDB" },
  ];

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(140deg, #0f3d25 0%, #1f6b43 55%, #2a8a57 100%)",
        color: "#fff", padding: "1.8rem 1.5rem", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 85% 20%, rgba(255,255,255,0.07), transparent 55%)", pointerEvents: "none" }} />
        <p style={{
          display: "inline-flex", gap: "0.4rem", alignItems: "center",
          background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "999px", padding: "0.25rem 0.65rem",
          fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.65rem", color: "#d6f5e3",
        }}>📋 PPDB / SPMB 2025–2026</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3.5vw, 2rem)", margin: "0 0 0.4rem" }}>
          Penerimaan Peserta Didik Baru
        </h1>
        <p style={{ margin: "0 0 1rem", color: "rgba(255,255,255,0.82)", fontSize: "0.92rem", maxWidth: "520px" }}>
          Pondok Pesantren Asy-Syifaa membuka pendaftaran santri baru T.A. 2025/2026. Kuota terbatas.
        </p>

        {/* Quick stats */}
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {[
            { val: "200",     sub: "Total Kuota" },
            { val: "144",     sub: "Sisa Kursi" },
            { val: "30 Jun",  sub: "Batas Daftar" },
            { val: "3 Jalur", sub: "Jalur Seleksi" },
          ].map(s => (
            <div key={s.sub}>
              <div style={{ fontSize: "1.4rem", fontWeight: 800 }}>{s.val}</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: "0", borderBottom: "1px solid var(--line)", background: "var(--surface)", position: "sticky", top: "3.2rem", zIndex: 10 }}>
        {TABS.map(t => (
          <button key={t.id} type="button" onClick={() => setActiveTab(t.id)} style={{
            flex: 1, padding: "0.75rem 0.5rem", fontSize: "0.85rem", fontWeight: 700,
            border: "none", borderBottom: activeTab === t.id ? "2px solid var(--accent)" : "2px solid transparent",
            background: "transparent", color: activeTab === t.id ? "var(--accent-ink)" : "var(--text-muted)",
            cursor: "pointer", transition: "color 160ms ease",
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── TAB: DAFTAR ── */}
      {activeTab === "daftar" && (
        <div style={{ padding: "1rem 1.25rem 2rem" }}>
          {submitted ? (
            <div style={{
              background: "var(--success-bg)", border: "1px solid rgba(24,117,72,0.25)",
              borderRadius: "var(--radius-lg)", padding: "2rem", textAlign: "center",
              maxWidth: "500px", marginInline: "auto",
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>✅</div>
              <h2 style={{ margin: "0 0 0.5rem", color: "var(--success-fg)", fontFamily: "var(--font-display)" }}>
                Pendaftaran Berhasil!
              </h2>
              <p style={{ color: "var(--success-fg)", margin: "0 0 1rem" }}>
                Nomor registrasi Anda:
              </p>
              <div style={{
                background: "var(--surface)", border: "2px solid var(--accent)", borderRadius: "0.75rem",
                padding: "0.75rem 1.5rem", fontSize: "1.6rem", fontWeight: 900,
                letterSpacing: "0.08em", color: "var(--accent)", marginBottom: "1rem",
              }}>{regCode}</div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: "0 0 1.5rem" }}>
                Simpan nomor ini untuk memantau status pendaftaran. Tim PPDB akan menghubungi wali santri dalam 2×24 jam.
              </p>
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                <button type="button" onClick={() => { setSubmitted(false); setStep(0); setForm({ nama_lengkap:"",nama_panggilan:"",tempat_lahir:"",tanggal_lahir:"",jenis_kelamin:"Laki-laki",jenjang:"MTs (SMP)",jalur:"Reguler",asal_sekolah:"",tahun_lulus:"",nilai_rata:"",nama_ayah:"",nama_ibu:"",pekerjaan_ayah:"",no_hp_wali:"",alamat:"",kota:"",provinsi:"Jawa Barat",motivasi:"",prestasi:"",hafalan_juz:""}); }}
                  className="asf-button asf-button-secondary">Daftar Lagi</button>
                <button type="button" onClick={() => { setActiveTab("pantau"); setCekId(regCode); }}
                  className="asf-button asf-button-primary">Cek Status</button>
              </div>
            </div>
          ) : (
            <div style={{ maxWidth: "720px", marginInline: "auto" }}>
              {/* Step indicator */}
              <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "1.5rem" }}>
                {STEPS.map((s, i) => (
                  <div key={s} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : 0 }}>
                    <div style={{
                      width: "1.8rem", height: "1.8rem", borderRadius: "999px",
                      display: "grid", placeItems: "center", fontSize: "0.75rem", fontWeight: 800, flexShrink: 0,
                      background: i <= step ? "var(--accent)" : "var(--surface-muted)",
                      color: i <= step ? "#fff" : "var(--text-muted)",
                      border: `2px solid ${i <= step ? "var(--accent)" : "var(--line)"}`,
                    }}>{i + 1}</div>
                    {i < STEPS.length - 1 && (
                      <div style={{ flex: 1, height: "2px", background: i < step ? "var(--accent)" : "var(--line)", margin: "0 0.25rem" }} />
                    )}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 0.5rem" }}>
                Langkah {step + 1} dari {STEPS.length}: {STEPS[step]}
              </p>

              <form onSubmit={step < STEPS.length - 1 ? (e) => { e.preventDefault(); setStep(s => s + 1); } : handleSubmit}>
                <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.25rem", boxShadow: "var(--card-shadow)" }}>

                  {/* STEP 0: Data Calon Santri */}
                  {step === 0 && (
                    <div style={{ display: "grid", gap: "0.75rem" }}>
                      <h3 style={{ margin: "0 0 0.25rem", fontSize: "0.96rem", fontWeight: 800 }}>Data Calon Santri</h3>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                        <div style={{ display: "grid", gap: "0.3rem" }}>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Nama Lengkap *</label>
                          <input value={form.nama_lengkap} onChange={e => f("nama_lengkap", e.target.value)} required placeholder="Sesuai akta lahir" />
                        </div>
                        <div style={{ display: "grid", gap: "0.3rem" }}>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Nama Panggilan</label>
                          <input value={form.nama_panggilan} onChange={e => f("nama_panggilan", e.target.value)} placeholder="Nama sehari-hari" />
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                        <div style={{ display: "grid", gap: "0.3rem" }}>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Tempat Lahir *</label>
                          <input value={form.tempat_lahir} onChange={e => f("tempat_lahir", e.target.value)} required />
                        </div>
                        <div style={{ display: "grid", gap: "0.3rem" }}>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Tanggal Lahir *</label>
                          <input type="date" value={form.tanggal_lahir} onChange={e => f("tanggal_lahir", e.target.value)} required />
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                        <div style={{ display: "grid", gap: "0.3rem" }}>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Jenis Kelamin</label>
                          <select value={form.jenis_kelamin} onChange={e => f("jenis_kelamin", e.target.value)}>
                            {GENDER.map(g => <option key={g}>{g}</option>)}
                          </select>
                        </div>
                        <div style={{ display: "grid", gap: "0.3rem" }}>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Jenjang *</label>
                          <select value={form.jenjang} onChange={e => f("jenjang", e.target.value)}>
                            {JENJANG.map(j => <option key={j}>{j}</option>)}
                          </select>
                        </div>
                        <div style={{ display: "grid", gap: "0.3rem" }}>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Jalur Masuk</label>
                          <select value={form.jalur} onChange={e => f("jalur", e.target.value)}>
                            {JALUR.map(j => <option key={j}>{j}</option>)}
                          </select>
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "0.75rem" }}>
                        <div style={{ display: "grid", gap: "0.3rem" }}>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Asal Sekolah *</label>
                          <input value={form.asal_sekolah} onChange={e => f("asal_sekolah", e.target.value)} required placeholder="Nama sekolah asal" />
                        </div>
                        <div style={{ display: "grid", gap: "0.3rem" }}>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Tahun Lulus</label>
                          <input type="number" value={form.tahun_lulus} onChange={e => f("tahun_lulus", e.target.value)} placeholder="2025" min="2020" max="2030" />
                        </div>
                        <div style={{ display: "grid", gap: "0.3rem" }}>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Nilai Rata-rata</label>
                          <input type="number" value={form.nilai_rata} onChange={e => f("nilai_rata", e.target.value)} placeholder="8.5" min="0" max="10" step="0.01" />
                        </div>
                      </div>
                      {form.jalur === "Tahfidz" && (
                        <div style={{ display: "grid", gap: "0.3rem" }}>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Jumlah Hafalan (Juz)</label>
                          <input type="number" value={form.hafalan_juz} onChange={e => f("hafalan_juz", e.target.value)} placeholder="Jumlah juz yang dihafal" min="1" max="30" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 1: Data Orang Tua */}
                  {step === 1 && (
                    <div style={{ display: "grid", gap: "0.75rem" }}>
                      <h3 style={{ margin: "0 0 0.25rem", fontSize: "0.96rem", fontWeight: 800 }}>Data Orang Tua / Wali</h3>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                        <div style={{ display: "grid", gap: "0.3rem" }}>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Nama Ayah *</label>
                          <input value={form.nama_ayah} onChange={e => f("nama_ayah", e.target.value)} required />
                        </div>
                        <div style={{ display: "grid", gap: "0.3rem" }}>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Nama Ibu *</label>
                          <input value={form.nama_ibu} onChange={e => f("nama_ibu", e.target.value)} required />
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                        <div style={{ display: "grid", gap: "0.3rem" }}>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Pekerjaan Ayah</label>
                          <input value={form.pekerjaan_ayah} onChange={e => f("pekerjaan_ayah", e.target.value)} placeholder="Wiraswasta / PNS / dll" />
                        </div>
                        <div style={{ display: "grid", gap: "0.3rem" }}>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>No. HP Wali *</label>
                          <input value={form.no_hp_wali} onChange={e => f("no_hp_wali", e.target.value)} required placeholder="08xxxxxxxxxx" />
                        </div>
                      </div>
                      <div style={{ display: "grid", gap: "0.3rem" }}>
                        <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Alamat Lengkap *</label>
                        <input value={form.alamat} onChange={e => f("alamat", e.target.value)} required placeholder="Jl. / RT / RW / Desa / Kecamatan" />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                        <div style={{ display: "grid", gap: "0.3rem" }}>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Kota/Kabupaten</label>
                          <input value={form.kota} onChange={e => f("kota", e.target.value)} />
                        </div>
                        <div style={{ display: "grid", gap: "0.3rem" }}>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Provinsi</label>
                          <select value={form.provinsi} onChange={e => f("provinsi", e.target.value)}>
                            {PROVINSI.map(p => <option key={p}>{p}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Jadwal Tes */}
                  {step === 2 && (
                    <div style={{ display: "grid", gap: "0.75rem" }}>
                      <h3 style={{ margin: "0 0 0.25rem", fontSize: "0.96rem", fontWeight: 800 }}>Pilih Gelombang Tes</h3>
                      {JADWAL_TES.map(j => (
                        <div key={j.gelombang} style={{
                          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem",
                          padding: "0.85rem 1rem", borderRadius: "0.75rem",
                          border: `2px solid ${j.sisa > 0 ? "var(--accent)" : "var(--line)"}`,
                          background: j.sisa > 0 ? "var(--accent-soft)" : "var(--surface-muted)",
                          cursor: j.sisa > 0 ? "pointer" : "not-allowed", opacity: j.sisa > 0 ? 1 : 0.6,
                        }}>
                          <div>
                            <p style={{ margin: "0 0 0.1rem", fontWeight: 800, fontSize: "0.95rem", color: "var(--accent-ink)" }}>{j.gelombang}</p>
                            <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>📅 {j.tanggal}</p>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <p style={{ margin: "0 0 0.1rem", fontWeight: 800, color: j.sisa < 20 ? "var(--warn-fg)" : "var(--success-fg)", fontSize: "0.9rem" }}>
                              {j.sisa} kursi tersisa
                            </p>
                            <span style={{
                              display: "inline-flex", padding: "0.12rem 0.5rem", borderRadius: "999px",
                              fontSize: "0.7rem", fontWeight: 800,
                              background: "var(--success-bg)", color: "var(--success-fg)",
                            }}>{j.status}</span>
                          </div>
                        </div>
                      ))}
                      <div style={{ display: "grid", gap: "0.3rem", marginTop: "0.25rem" }}>
                        <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>Motivasi & Tujuan *</label>
                        <textarea value={form.motivasi} onChange={e => f("motivasi", e.target.value)} required
                          placeholder="Ceritakan alasan dan motivasi ingin mondok di Asy-Syifaa..." rows={3}
                          style={{ border: "1px solid var(--line)", borderRadius: "0.65rem", padding: "0.56rem 0.65rem", font: "inherit", background: "var(--surface)", color: "var(--text)", resize: "vertical" }} />
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Review & Submit */}
                  {step === 3 && (
                    <div style={{ display: "grid", gap: "0.75rem" }}>
                      <h3 style={{ margin: "0 0 0.25rem", fontSize: "0.96rem", fontWeight: 800 }}>Konfirmasi & Kirim Pendaftaran</h3>
                      <div style={{ background: "var(--surface-muted)", borderRadius: "0.75rem", padding: "1rem", display: "grid", gap: "0.5rem" }}>
                        {[
                          ["Nama Lengkap", form.nama_lengkap],
                          ["Jenis Kelamin", form.jenis_kelamin],
                          ["Jenjang", form.jenjang],
                          ["Jalur", form.jalur],
                          ["Asal Sekolah", form.asal_sekolah],
                          ["Tahun Lulus", form.tahun_lulus],
                          ["Nama Ayah", form.nama_ayah],
                          ["No. HP Wali", form.no_hp_wali],
                          ["Kota", form.kota],
                          ["Provinsi", form.provinsi],
                        ].map(([k, v]) => v ? (
                          <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", padding: "0.2rem 0", borderBottom: "1px solid var(--line)" }}>
                            <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>{k}</span>
                            <span style={{ fontWeight: 700 }}>{v}</span>
                          </div>
                        ) : null)}
                      </div>
                      <div style={{ padding: "0.75rem", background: "var(--warn-bg)", borderRadius: "0.65rem", border: "1px solid rgba(161,93,6,0.2)" }}>
                        <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--warn-fg)", fontWeight: 600 }}>
                          ⚠️ Pastikan data sudah benar sebelum mengirim. Data yang sudah dikirim tidak dapat diubah tanpa menghubungi panitia PPDB.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation buttons */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", gap: "0.5rem" }}>
                  {step > 0 ? (
                    <button type="button" onClick={() => setStep(s => s - 1)} className="asf-button asf-button-secondary">← Kembali</button>
                  ) : (
                    <Link href="/" className="asf-button asf-button-secondary">← Beranda</Link>
                  )}
                  <button type="submit" disabled={submitting} className="asf-button asf-button-primary">
                    {submitting ? "Mengirim..." : step < STEPS.length - 1 ? "Lanjut →" : "✓ Kirim Pendaftaran"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* ── TAB: CEK STATUS ── */}
      {activeTab === "pantau" && (
        <div style={{ padding: "1rem 1.25rem 2rem", maxWidth: "720px", marginInline: "auto" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.25rem", boxShadow: "var(--card-shadow)", marginBottom: "1rem" }}>
            <h3 style={{ margin: "0 0 0.75rem", fontSize: "0.96rem", fontWeight: 800 }}>🔍 Cek Status Pendaftaran</h3>
            <form onSubmit={handleCek} style={{ display: "flex", gap: "0.6rem" }}>
              <input value={cekId} onChange={e => setCekId(e.target.value)} placeholder="Masukkan nomor registrasi atau nama calon santri..."
                style={{ flex: 1, padding: "0.56rem 0.75rem", borderRadius: "0.65rem", border: "1px solid var(--line)", font: "inherit", background: "var(--surface)", color: "var(--text)" }} required />
              <button type="submit" className="asf-button asf-button-primary">Cek</button>
            </form>
            {cekId && cekResult === null && (
              <p style={{ margin: "0.75rem 0 0", fontSize: "0.85rem", color: "var(--danger-fg)", fontWeight: 600 }}>
                ❌ Data tidak ditemukan. Pastikan nomor registrasi atau nama sudah benar.
              </p>
            )}
            {cekResult && (() => {
              const sc = STATUS_CFG[cekResult.status] || {};
              return (
                <div style={{ marginTop: "1rem", padding: "1rem", borderRadius: "0.75rem", border: `1px solid ${sc.border || "var(--line)"}`, background: sc.bg || "var(--surface-muted)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                    <div>
                      <p style={{ margin: "0 0 0.2rem", fontWeight: 800, fontSize: "1rem", color: "var(--text)" }}>{cekResult.nama}</p>
                      <p style={{ margin: "0 0 0.1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>ID: {cekResult.id} · {cekResult.jenjang} · Jalur {cekResult.jalur}</p>
                      <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--text-muted)" }}>Tanggal Daftar: {cekResult.tgl}</p>
                    </div>
                    <span style={{ display: "inline-flex", padding: "0.3rem 0.8rem", borderRadius: "999px", fontSize: "0.82rem", fontWeight: 800, background: sc.bg, color: sc.fg, border: `1px solid ${sc.border}` }}>
                      {cekResult.status}
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* All registrants table */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
            <h3 style={{ margin: "0 0 0.75rem", fontSize: "0.92rem", fontWeight: 800 }}>📋 Daftar Pendaftar ({DUMMY_REGISTRANTS.length})</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                <thead>
                  <tr style={{ background: "var(--surface-muted)" }}>
                    {["ID Reg", "Nama", "Jenjang", "Jalur", "Tgl Daftar", "Status"].map(h => (
                      <th key={h} style={{ padding: "0.6rem 0.75rem", textAlign: "left", fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DUMMY_REGISTRANTS.map(r => {
                    const sc = STATUS_CFG[r.status] || {};
                    return (
                      <tr key={r.id} style={{ borderTop: "1px solid var(--line)" }}>
                        <td style={{ padding: "0.55rem 0.75rem", fontWeight: 700, fontSize: "0.8rem", color: "var(--accent)" }}>{r.id}</td>
                        <td style={{ padding: "0.55rem 0.75rem", fontWeight: 600 }}>{r.nama}</td>
                        <td style={{ padding: "0.55rem 0.75rem", color: "var(--text-muted)", fontSize: "0.82rem" }}>{r.jenjang}</td>
                        <td style={{ padding: "0.55rem 0.75rem", color: "var(--text-muted)", fontSize: "0.82rem" }}>{r.jalur}</td>
                        <td style={{ padding: "0.55rem 0.75rem", color: "var(--text-muted)", fontSize: "0.82rem" }}>{r.tgl}</td>
                        <td style={{ padding: "0.55rem 0.75rem" }}>
                          <span style={{ display: "inline-flex", padding: "0.12rem 0.45rem", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 700, background: sc.bg, color: sc.fg, border: `1px solid ${sc.border || "var(--line)"}` }}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: INFO ── */}
      {activeTab === "info" && (
        <div style={{ padding: "1rem 1.25rem 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "0.85rem", maxWidth: "960px", marginInline: "auto" }}>
            {/* Jadwal */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
              <h3 style={{ margin: "0 0 0.75rem", fontWeight: 800, fontSize: "0.96rem" }}>📅 Timeline PPDB</h3>
              {[
                { fase: "Pendaftaran Online", tanggal: "1 Mei – 30 Juni 2025", done: true },
                { fase: "Seleksi Berkas", tanggal: "1 – 7 Juli 2025", done: false },
                { fase: "Tes Tertulis & Wawancara", tanggal: "15 – 17 Juli 2025", done: false },
                { fase: "Pengumuman Hasil", tanggal: "20 Juli 2025", done: false },
                { fase: "Registrasi Ulang", tanggal: "21 – 25 Juli 2025", done: false },
                { fase: "Hari Pertama Masuk", tanggal: "28 Juli 2025", done: false },
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", padding: "0.45rem 0", borderBottom: "1px solid var(--line)" }}>
                  <span style={{ fontSize: "0.85rem", width: "1rem", flexShrink: 0, color: t.done ? "var(--success-fg)" : "var(--text-muted)" }}>{t.done ? "✓" : "○"}</span>
                  <div>
                    <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: t.done ? 700 : 600, color: t.done ? "var(--success-fg)" : "var(--text)" }}>{t.fase}</p>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>{t.tanggal}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Biaya */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
              <h3 style={{ margin: "0 0 0.75rem", fontWeight: 800, fontSize: "0.96rem" }}>💰 Rincian Biaya</h3>
              {BIAYA_ITEMS.map(b => (
                <div key={b.item} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", padding: "0.45rem 0", borderBottom: "1px solid var(--line)" }}>
                  <div>
                    <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 600 }}>{b.item}</p>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>{b.keterangan}</p>
                  </div>
                  <span style={{ fontWeight: 800, color: "var(--accent)", fontSize: "0.88rem", flexShrink: 0 }}>Rp {fmt(b.nominal)}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.55rem 0 0", marginTop: "0.25rem" }}>
                <span style={{ fontWeight: 800 }}>Total Estimasi</span>
                <span style={{ fontWeight: 900, color: "var(--accent)", fontSize: "1rem" }}>Rp {fmt(totalBiaya)}</span>
              </div>
            </div>

            {/* Persyaratan */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.1rem", boxShadow: "var(--card-shadow)" }}>
              <h3 style={{ margin: "0 0 0.75rem", fontWeight: 800, fontSize: "0.96rem" }}>📄 Persyaratan Dokumen</h3>
              {["Fotokopi Akta Kelahiran (2 lembar)", "Fotokopi KK (2 lembar)", "Fotokopi Rapor Semester Terakhir", "Pas foto 3×4 terbaru (4 lembar)", "Surat Keterangan Sehat dari Dokter", "Surat Izin Orang Tua bermaterai", "Sertifikat prestasi (jika ada)"].map((d, i) => (
                <div key={i} style={{ display: "flex", gap: "0.5rem", padding: "0.35rem 0", borderBottom: "1px solid var(--line)", fontSize: "0.87rem" }}>
                  <span style={{ color: "var(--accent)", fontWeight: 800, flexShrink: 0 }}>✓</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>

            {/* Kontak */}
            <div style={{ background: "var(--accent-soft)", border: "1px solid rgba(31,107,67,0.2)", borderRadius: "var(--radius-md)", padding: "1.1rem" }}>
              <h3 style={{ margin: "0 0 0.75rem", fontWeight: 800, fontSize: "0.96rem", color: "var(--accent-ink)" }}>📞 Hubungi Panitia PPDB</h3>
              {[
                { label: "WhatsApp", val: "0812-xxxx-xxxx (Ust. Fulan)" },
                { label: "Email", val: "ppdb@asy-syifaa.sch.id" },
                { label: "Kantor", val: "Senin – Sabtu, 08.00 – 15.00 WIB" },
                { label: "Alamat", val: "Jl. Pesantren No.1, Kab. Sumedang, Jawa Barat" },
              ].map(c => (
                <div key={c.label} style={{ padding: "0.4rem 0", borderBottom: "1px solid rgba(31,107,67,0.15)", fontSize: "0.87rem" }}>
                  <span style={{ fontWeight: 800, color: "var(--accent-ink)" }}>{c.label}: </span>
                  <span style={{ color: "var(--accent-ink)" }}>{c.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

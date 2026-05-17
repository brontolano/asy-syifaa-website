"use client";

const STRUKTUR = [
  { jabatan: "Mudir Aam", nama: "KH. Ahmad Sulaiman", keterangan: "Pimpinan Pondok" },
  { jabatan: "Mudir Ma'had", nama: "Ust. Muhammad Fauzan", keterangan: "Kepala Asrama" },
  { jabatan: "Kepala Sekolah", nama: "Ust. Ibrahim Hakim", keterangan: "Koordinator Akademik" },
  { jabatan: "Bendahara Umum", nama: "Ust. Yusuf Mansur", keterangan: "Keuangan & Aset" },
  { jabatan: "Ka. Bid. Tahfidz", nama: "Ust. Hasan Bisri", keterangan: "Program Tahfidz" },
  { jabatan: "Ka. Bid. Kesiswaan", nama: "Ustadzah Fatimah", keterangan: "Pembinaan Santri" },
];

const PROGRAM = [
  { icon: "📖", title: "Tahfidz Al-Qur'an", desc: "Program hafalan Al-Qur'an 30 juz dengan target minimal 10 juz per tahun menggunakan metode talaqqi." },
  { icon: "📚", title: "Pendidikan Formal", desc: "Kurikulum Kementerian Agama RI (Madrasah Tsanawiyah & Aliyah) terintegrasi dengan kurikulum pesantren." },
  { icon: "🌙", title: "Diniyah & Kitab Kuning", desc: "Kajian kitab kuning: Fiqih, Nahwu Shorof, Aqidah, Akhlak, Tafsir, dan Hadits." },
  { icon: "💪", title: "Pembinaan Karakter", desc: "Disiplin, kemandirian, kepemimpinan, dan akhlak mulia melalui kegiatan harian terstruktur." },
  { icon: "🌐", title: "Bahasa Arab & Inggris", desc: "Muhadatsah harian, vocabulary building, dan program mahkamah lughah untuk kemahiran berbahasa." },
  { icon: "🏆", title: "Ekstrakurikuler", desc: "Seni rebana, qiro'ah, pramuka, olahraga, kaligrafi, dan jurnalistik." },
];

const PRESTASI = [
  { tahun: "2024", prestasi: "Juara I MTQ Tingkat Kabupaten", kategori: "Tahfidz" },
  { tahun: "2024", prestasi: "Juara II Olimpiade Sains Nasional", kategori: "Akademik" },
  { tahun: "2023", prestasi: "Juara I Lomba Debat Bahasa Arab", kategori: "Bahasa" },
  { tahun: "2023", prestasi: "Santri Teladan Tingkat Provinsi", kategori: "Karakter" },
  { tahun: "2022", prestasi: "Juara I Porsadin Tingkat Kabupaten", kategori: "Olahraga" },
];

export default function ProfilPage() {
  return (
    <div>
      {/* Visi Misi */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.8rem", padding: "1rem 1.25rem 0" }}>
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.2rem", boxShadow: "var(--card-shadow)" }}>
          <h2 style={{ margin: "0 0 0.6rem", fontSize: "1rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.4rem" }}>
            🎯 Visi
          </h2>
          <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.7, color: "var(--text)" }}>
            Menjadi lembaga pendidikan Islam terpadu yang unggul dalam membentuk generasi Qur'ani, berilmu, berakhlak mulia, dan siap mengabdi kepada masyarakat, bangsa, dan agama.
          </p>
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.2rem", boxShadow: "var(--card-shadow)" }}>
          <h2 style={{ margin: "0 0 0.6rem", fontSize: "1rem", fontWeight: 800 }}>🚀 Misi</h2>
          <ol style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.88rem", lineHeight: 1.8, color: "var(--text)" }}>
            <li>Menyelenggarakan pendidikan tahfidz Al-Qur'an berkualitas tinggi</li>
            <li>Mengintegrasikan ilmu agama dan ilmu umum secara seimbang</li>
            <li>Membangun karakter santri yang disiplin, mandiri, dan bertanggung jawab</li>
            <li>Mengembangkan potensi akademik dan non-akademik santri</li>
            <li>Menciptakan lingkungan islami yang kondusif untuk belajar</li>
          </ol>
        </div>
      </section>

      {/* Sejarah singkat */}
      <section style={{ padding: "1rem 1.25rem 0" }}>
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1.2rem", boxShadow: "var(--card-shadow)" }}>
          <h2 style={{ margin: "0 0 0.6rem", fontSize: "1rem", fontWeight: 800 }}>📜 Sejarah Singkat</h2>
          <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text)" }}>
            Pondok Pesantren Asy-Syifaa didirikan pada tahun 1995 oleh KH. Ahmad Sulaiman atas dasar keprihatinan terhadap minimnya lembaga pendidikan Islam yang memadukan tahfidz Al-Qur'an dengan pendidikan formal berkualitas.
            Berawal dari sebuah mushola kecil dengan santri mukim pertama berjumlah 12 orang, pesantren ini terus berkembang menjadi lembaga pendidikan Islam terpercaya dengan ratusan santri aktif.
            Selama lebih dari dua dekade, Asy-Syifaa telah meluluskan ribuan alumni yang tersebar di berbagai instansi, perguruan tinggi ternama, dan lembaga dakwah di seluruh Indonesia.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
            {[
              { val: "1995", label: "Tahun Berdiri" },
              { val: "30+", label: "Tahun Berpengalaman" },
              { val: "2.000+", label: "Alumni Lulusan" },
              { val: "15 Ha", label: "Luas Lahan" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--accent)" }}>{s.val}</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Struktur */}
      <section style={{ padding: "1rem 1.25rem 0" }}>
        <h2 style={{ fontSize: "0.78rem", fontWeight: 800, margin: "0 0 0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Struktur Organisasi
        </h2>
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", boxShadow: "var(--card-shadow)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "var(--surface-muted)" }}>
                <th style={{ padding: "0.7rem 1rem", textAlign: "left", fontWeight: 800, color: "var(--text-muted)", fontSize: "0.78rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>Jabatan</th>
                <th style={{ padding: "0.7rem 1rem", textAlign: "left", fontWeight: 800, color: "var(--text-muted)", fontSize: "0.78rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>Nama</th>
                <th style={{ padding: "0.7rem 1rem", textAlign: "left", fontWeight: 800, color: "var(--text-muted)", fontSize: "0.78rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {STRUKTUR.map((s, i) => (
                <tr key={s.jabatan} style={{ borderTop: "1px solid var(--line)", background: i === 0 ? "var(--accent-soft)" : undefined }}>
                  <td style={{ padding: "0.65rem 1rem", fontWeight: 700, color: i === 0 ? "var(--accent-ink)" : "var(--text)" }}>{s.jabatan}</td>
                  <td style={{ padding: "0.65rem 1rem", color: "var(--text)" }}>{s.nama}</td>
                  <td style={{ padding: "0.65rem 1rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>{s.keterangan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Program Unggulan */}
      <section style={{ padding: "1rem 1.25rem 0" }}>
        <h2 style={{ fontSize: "0.78rem", fontWeight: 800, margin: "0 0 0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Program Unggulan
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "0.8rem" }}>
          {PROGRAM.map((p) => (
            <div key={p.title} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: "1rem", boxShadow: "var(--card-shadow)" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{p.icon}</div>
              <h3 style={{ margin: "0 0 0.3rem", fontSize: "0.92rem", fontWeight: 800 }}>{p.title}</h3>
              <p style={{ margin: 0, fontSize: "0.83rem", color: "var(--text-muted)", lineHeight: 1.55 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Prestasi */}
      <section style={{ padding: "1rem 1.25rem 2rem" }}>
        <h2 style={{ fontSize: "0.78rem", fontWeight: 800, margin: "0 0 0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Prestasi Terkini
        </h2>
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", boxShadow: "var(--card-shadow)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "var(--surface-muted)" }}>
                <th style={{ padding: "0.7rem 1rem", textAlign: "left", fontWeight: 800, color: "var(--text-muted)", fontSize: "0.78rem", textTransform: "uppercase" }}>Tahun</th>
                <th style={{ padding: "0.7rem 1rem", textAlign: "left", fontWeight: 800, color: "var(--text-muted)", fontSize: "0.78rem", textTransform: "uppercase" }}>Prestasi</th>
                <th style={{ padding: "0.7rem 1rem", textAlign: "left", fontWeight: 800, color: "var(--text-muted)", fontSize: "0.78rem", textTransform: "uppercase" }}>Kategori</th>
              </tr>
            </thead>
            <tbody>
              {PRESTASI.map((p) => (
                <tr key={p.prestasi} style={{ borderTop: "1px solid var(--line)" }}>
                  <td style={{ padding: "0.65rem 1rem", fontWeight: 700, color: "var(--accent)", fontSize: "0.88rem" }}>{p.tahun}</td>
                  <td style={{ padding: "0.65rem 1rem", fontWeight: 600 }}>{p.prestasi}</td>
                  <td style={{ padding: "0.65rem 1rem" }}>
                    <span style={{
                      display: "inline-flex", padding: "0.15rem 0.5rem", borderRadius: "999px",
                      fontSize: "0.72rem", fontWeight: 700,
                      background: "var(--accent-soft)", color: "var(--accent-ink)",
                      border: "1px solid rgba(31,107,67,0.2)",
                    }}>{p.kategori}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

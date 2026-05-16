# Asy-Syifaa ERP Pesantren

Platform ERP pesantren modular berbasis Asy-Syifaa Framework untuk digitalisasi operasional akademik, keuangan, kesantrian, asrama, SDM, dan pelaporan regulasi (PMA 31/2020, EMIS).

## Ringkasan
Asy-Syifaa ERP dirancang untuk mengubah proses manual/terfragmentasi menjadi sistem terintegrasi yang:
- menjaga nilai dan kekhasan pesantren (Muadalah, Salafiyah, Tahfidz, Sanad),
- mempercepat administrasi harian,
- meningkatkan transparansi wali santri,
- memenuhi kebutuhan compliance nasional.

## Masalah yang Diselesaikan
- Data santri, akademik, dan keuangan tersebar di banyak file/sistem.
- Rekap EMIS dan laporan regulator memakan waktu tinggi.
- Risiko kebocoran transaksi tunai dan selisih pembukuan.
- Orang tua sulit memantau progres akademik dan iuran secara real-time.

## Sasaran Produk
- Digitalisasi operasional harian pesantren 100%.
- Otomasi pelaporan regulasi hingga 90%.
- Lingkungan transaksi cashless (VA/QRIS) end-to-end.
- Portal wali dengan visibilitas akademik + finansial real-time.

## Modul Inti
- Kesantrian: master data, lifecycle santri, izin, pelanggaran/prestasi.
- Akademik: multi-kurikulum, presensi, nilai, e-rapor, tahfidz tracker.
- Keuangan: billing syahriah/infaq, VA/QRIS, jurnal otomatis, cashflow.
- Asrama & Fasilitas: plotting kamar, aset, inventaris, wakaf.
- SDM & Payroll: data asatidz/staf, presensi pegawai, penggajian.
- Compliance Engine: ekspor/integrasi EMIS/Dapodik, laporan PMA.
- Guardian Portal: akses wali untuk nilai, absensi, tagihan, notifikasi.

## Arsitektur Tingkat Tinggi
- Frontend Web: Next.js (dashboard admin + portal wali).
- Mobile: React Native (offline-first untuk lapangan).
- Backend: Go microservices via API Gateway.
- Data Layer: PostgreSQL (utama), Redis (cache), object storage (dokumen).
- Shared Services: RBAC, dual calendar Hijriah-Masehi, sync engine, audit trail.

## Prinsip Produk
- Three-Click Rule untuk task utama.
- Desain Islami modern, sederhana untuk operator non-teknis.
- Modular dan extensible untuk variasi pesantren.
- Security-first: enkripsi data sensitif, kontrol akses berbasis role.

## KPI Utama
- Uptime 99.9%.
- Response API < 200-500ms (target bertahap).
- Adopsi portal wali >= 80% pada fase awal implementasi.
- Pengurangan waktu rekonsiliasi keuangan dari hari menjadi < 1 jam.

## Roadmap Implementasi
- Phase 1 (Fondasi): auth, RBAC, infra, skema data, design system.
- Phase 2 (MVP): akademik inti, keuangan dasar, portal wali MVP.
- Phase 3 (Kekhasan Pesantren): tahfidz/sanad, asrama, izin digital, sync offline-online.
- Phase 4 (Skala & Compliance): EMIS, aset/wakaf, payroll, hardening security.

## Struktur Dokumen Proyek
- `_doc_erp/_RISET_Pesantren.md`: riset regulasi, benchmarking, blueprint data.
- `_doc_erp/ERP_PESANTREN_PRD.md`: PRD utama produk.
- `_doc_erp/ERP_Pesantren_(Asy-Syifaa_Fram..._PRD.md`: PRD detail framework.
- `_doc_erp/_Product_Vision_Asy-Syifaa_ERP_Pesantren_All-in-One_Solution_Ecosystem.md`: visi, arsitektur, roadmap detail.
- `Agents Skill/`: persona per role tim (PM, BE, FE, UX, DevOps).

## Persona Tim Produk
- Senior Product Manager
- Product Manager (PM)
- Lead Backend Engineer
- Backend Developer
- Senior Frontend Developer
- Frontend Developer
- UI/UX Designer
- DevOps Specialist

## Cara Pakai Dokumen Ini
1. Mulai dari Product Vision untuk arah strategis.
2. Turunkan requirement ke PRD utama dan PRD detail.
3. Gunakan `_RISET_Pesantren.md` sebagai basis validasi regulasi & domain.
4. Jalankan eksekusi lintas tim dengan acuan persona di `Agents Skill/`.

## Catatan
Repositori ini saat ini berfokus pada fondasi produk, riset, dan artefak perencanaan sebagai dasar implementasi engineering end-to-end.

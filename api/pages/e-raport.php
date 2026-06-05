<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Cek E-Raport Santri Online | Pondok Pesantren Asy-Syifaa Wal Mahmuudiyyah</title>

<meta name="description" content="Layanan resmi Cek E-Raport Santri Pondok Pesantren Asy-Syifaa Wal Mahmuudiyyah Sumedang. Masukkan NIS untuk melihat capaian akademik, nilai mata pelajaran, dan catatan wali kelas Semester Genap 2025/2026." />

<meta name="keywords" content="E-Raport Asy-Syifaa, Cek Nilai Santri, Raport Online Sumedang, Pesantren Asy-Syifaa Wal Mahmuudiyyah, Nilai Santri Online" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />
<link rel="icon" href="/assets/media/images/logo.png" type="image/png" sizes="32x32">

  <link rel="stylesheet" href="/css/style.css?v=20260517" />
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source Sans 3:wght@400;500;600&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="/assets/css/main.css?v=20260519">

<style>
/* === CSS TAMPILAN LAYAR (NORMAL) === */
    .table-raport thead th {
        background-color: var(--primary-green) !important;
        color: white !important;
        vertical-align: middle;
        text-align: center;
        border: 1px solid #000;
    }
    .table-raport tbody td {
        border: 1px solid #ccc;
        vertical-align: middle;
    }
    .nilai-merah { color: red; font-weight: bold; }
    .bg-kategori {
        background-color: #f0f0f0;
        font-weight: bold;
        text-align: left;
        padding-left: 15px !important;
    }

    /* === CSS KHUSUS CETAK (PRINT / PDF) === */
    @media print {
        /* 1. Reset Halaman */
        @page {
            size: A4;
            margin: 1cm; /* Margin tipis biar muat banyak */
        }
        
        /* 2. Sembunyikan Semua Elemen Website */
        body * {
            visibility: hidden;
            height: 0;
            overflow: hidden;
        }

        /* 3. Tampilkan Hanya Hasil Raport */
        #raportResult, #raportResult * {
            visibility: visible;
            height: auto;
            overflow: visible;
        }

        /* 4. Posisikan Raport di Pojok Kiri Atas */
        #raportResult {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            background: white;
        }

        /* 5. Perkecil Font & Padding Agar Muat 1 Halaman */
        .card-body { padding: 0 !important; }
        .card-header { padding: 10px !important; }
        h3.h4 { font-size: 18px !important; margin: 0 !important; }
        p.small { font-size: 10px !important; }
        
        /* Tabel Lebih Rapat */
        .table-raport th, .table-raport td {
            padding: 4px 5px !important; /* Rapatkan padding */
            font-size: 11px !important;  /* Perkecil huruf tabel */
            height: auto !important;
        }
        
        /* Font Data Diri */
        .table-sm td {
            padding: 2px !important;
            font-size: 12px !important;
        }

        /* Pastikan Warna Background Tercetak */
        .table-raport thead th, .card-header {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }

        /* Layout Grid Kepribadian & Absensi (Paksa Sebelahan) */
        .row-info-bawah {
            display: flex !important;
            flex-direction: row !important;
            gap: 10px;
            margin-top: 10px !important;
        }
        .col-info-bawah {
            width: 50% !important;
            flex: 0 0 50% !important;
        }
        .border { border: 1px solid #999 !important; }
        
        /* Sembunyikan Tombol Cetak & Elemen Pengganggu */
        .no-print, nav, footer, .navbar-custom, .asf-public-navbar, #backToTop {
            display: none !important;
        }
        
        /* Hindari Pemotongan Halaman di Tengah Tabel */
        tr { page-break-inside: avoid; }
    }
</style>


<script src="/assets/js/main.js"></script>
  </head>
<body>

<?php include __DIR__ . '/partials.header.php'; ?>

<div class="container" style="min-height: 80vh; padding-top: 130px; padding-bottom: 60px;">
    
    <div class="row justify-content-center mb-5">
        <div class="col-md-8 text-center">
            <h2 class="fw-bold" style="color: var(--primary-green); font-family: 'Merriweather', serif;">
                Cek E-Raport Santri
            </h2>
            <p class="text-muted mb-4">Masukkan Nomor Induk Santri (NIS) untuk melihat hasil studi.</p>
            
            <div class="card shadow-lg border-0" style="border-radius: 50px;">
                <div class="card-body p-2 ps-4">
                    <form id="raportForm" class="d-flex align-items-center">
                        <input type="number" id="inputNIS" class="form-control border-0 shadow-none" placeholder="Masukkan NIS Anda (Contoh: 18190052)" required style="font-size: 1.1rem;">
                        <button type="submit" class="btn btn-success rounded-pill px-4 py-2 fw-bold" style="min-width: 120px;">
                            <i class="fa-solid fa-search me-2"></i> CEK
                        </button>
                    </form>
                </div>
            </div>
            <small id="statusMsg" class="text-danger mt-3 d-block fw-bold" style="display: none;"></small>
        </div>
    </div>

    <div id="raportResult" class="row justify-content-center" style="display: none;">
        <div class="col-lg-10">
            <div class="card shadow-lg border-0 overflow-hidden">
                
                <div class="card-header text-white text-center py-4" style="background: var(--primary-green);">
                    <img loading="lazy" decoding="async" src="assets/img/logo.png" alt="Logo" width="60" class="mb-2 bg-white rounded-circle p-1">
                    <h3 class="h4 mb-0 fw-bold">Pondok Pesantren Asy-Syifaa Wal Mahmuudiyyah</h3>
                    <p class="mb-0 small opacity-75">Laporan Hasil Belajar Santri (E-Raport)</p>
                </div>

                <div class="card-body p-4 bg-white">
                    <div class="row mb-4 border-bottom pb-3">
                        <div class="col-md-6">
                            <table class="table table-borderless table-sm mb-0">
                                <tr><td width="130" class="text-muted">Nama Lengkap</td><td class="fw-bold" id="outNama">: -</td></tr>
                                <tr><td class="text-muted">Nomor Induk (NIS)</td><td class="fw-bold" id="outNIS">: -</td></tr>
                                <tr><td class="text-muted">Kelas</td><td class="fw-bold" id="outKelas">: -</td></tr>
                            </table>
                        </div>
                        <div class="col-md-6">
                            <table class="table table-borderless table-sm mb-0">
                                <tr><td width="130" class="text-muted">Semester</td><td class="fw-bold" id="outSemester">: -</td></tr>
                                <tr><td class="text-muted">Tahun Ajaran</td><td class="fw-bold" id="outTahun">: -</td></tr>
                                <tr><td class="text-muted">Tanggal Cetak</td><td class="fw-bold" id="todayDate">: -</td></tr>
                            </table>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-raport table-striped table-hover text-center">
                            <thead>
                                <tr>
                                    <th width="50">No</th>
                                    <th>Mata Pelajaran</th>
                                    <th width="100">Nilai</th>
                                    <th width="150">Predikat</th>
                                </tr>
                            </thead>
                            <tbody id="nilaiBody">
                                </tbody>
                            <tfoot style="background-color: #eee;">
    <tr>
        <td colspan="2" class="text-end fw-bold pe-3">JUMLAH NILAI</td>
        <td id="outJumlah" class="fw-bold">-</td>
        <td></td>
    </tr>
    <tr>
        <td colspan="2" class="text-end fw-bold pe-3">RATA-RATA NILAI</td>
        <td id="outRata" class="fw-bold fs-6">-</td>
        <td id="outPredikatRata" class="fw-bold">-</td>
    </tr>
    <tr style="background-color: #ffeeba;"> <td colspan="2" class="text-end fw-bold pe-3">PERINGKAT (RANKING)</td>
        <td class="fw-bold fs-5 text-danger" id="outRanking">-</td>
        <td class="small">Dari Seluruh Santri</td>
    </tr>
</tfoot>
                        </table>
                    </div>

                    <div class="row mt-4">
                        <div class="col-md-6 mb-3">
                            <div class="border p-3 rounded h-100">
                                <h6 class="fw-bold border-bottom pb-2 text-success"><i class="fa-solid fa-user-check me-2"></i>Kepribadian</h6>
                                <div class="d-flex justify-content-between mb-2"><span>Kelakuan:</span> <span class="fw-bold badge bg-primary" id="outKelakuan">-</span></div>
                                <div class="d-flex justify-content-between mb-2"><span>Kerajinan:</span> <span class="fw-bold badge bg-info text-dark" id="outKerajinan">-</span></div>
                                <div class="d-flex justify-content-between"><span>Kerapihan:</span> <span class="fw-bold badge bg-success" id="outKerapihan">-</span></div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="border p-3 rounded h-100">
                                <h6 class="fw-bold border-bottom pb-2 text-danger"><i class="fa-solid fa-calendar-xmark me-2"></i>Ketidakhadiran</h6>
                                <div class="d-flex justify-content-between mb-2"><span>Sakit:</span> <span class="fw-bold" id="outSakit">0</span> Hari</div>
                                <div class="d-flex justify-content-between mb-2"><span>Izin:</span> <span class="fw-bold" id="outIzin">0</span> Hari</div>
                                <div class="d-flex justify-content-between"><span>Alpha:</span> <span class="fw-bold text-danger" id="outAlpha">0</span> Hari</div>
                            </div>
                        </div>
                    </div>

                    <div class="alert alert-warning mt-2 border-warning">
                        <h6 class="alert-heading fw-bold"><i class="fa-solid fa-comment-dots me-2"></i>Catatan Wali Kelas:</h6>
                        <p class="mb-0 fst-italic" id="outCatatan">Belum ada catatan.</p>
                    </div>

                    <div class="text-center mt-5 no-print">
                        <button onclick="window.print()" class="btn btn-dark rounded-pill px-4 py-2 shadow">
                            <i class="fa-solid fa-print me-2"></i> Cetak / Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    document.getElementById('raportForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nisInput = document.getElementById('inputNIS').value.trim();
        const statusMsg = document.getElementById('statusMsg');
        const resultDiv = document.getElementById('raportResult');
        const btn = this.querySelector('button');

        statusMsg.style.display = 'none';
        resultDiv.style.display = 'none';
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
        btn.disabled = true;

        if(!nisInput) {
            alert("Mohon isi NIS terlebih dahulu!");
            btn.innerHTML = 'CEK';
            btn.disabled = false;
            return;
        }

        fetch('cek_raport_api.php?nis=' + nisInput)
            .then(response => response.json())
            .then(res => {
                if (res.status === 'success') {
                    tampilkanRaport(res.data);
                } else {
                    statusMsg.innerText = res.message;
                    statusMsg.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                statusMsg.innerText = "Terjadi kesalahan sistem.";
                statusMsg.style.display = 'block';
            })
            .finally(() => {
                btn.innerHTML = '<i class="fa-solid fa-search me-2"></i> CEK';
                btn.disabled = false;
            });
    });

    function tampilkanRaport(data) {
        // 1. Isi Data Diri
        document.getElementById('outNama').innerText = ": " + data.nama_lengkap;
        document.getElementById('outNIS').innerText = ": " + data.nis;
        document.getElementById('outKelas').innerText = ": " + data.kelas;
        document.getElementById('outSemester').innerText = ": " + data.semester;
        document.getElementById('outTahun').innerText = ": " + data.tahun_ajaran;
        
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('todayDate').innerText = ": " + new Date().toLocaleDateString('id-ID', options);

        // 2. Daftar SEMUA Kemungkinan Mata Pelajaran
        // Komputer akan mengecek satu-satu, kalau nilainya > 0 baru ditampilkan
        const listMapel = [
            // Kategori A
            { type: "header", label: "A. KITAB / DINIAH" },
            { type: "data", label: "Tafsir", key: "tafsir" },
            { type: "data", label: "Hadits", key: "hadits" },
            { type: "data", label: "Ulumu Tafsir", key: "ulumu_tafsir" },
            { type: "data", label: "Mustholah Hadits", key: "mustholah_hadits" },
            { type: "data", label: "Siroh", key: "siroh" },
            { type: "data", label: "Fiqih", key: "fiqih" },
            { type: "data", label: "Ushul Fiqih", key: "ushul_fiqih" },
            { type: "data", label: "Faroid", key: "faroid" },
            { type: "data", label: "Nahwu", key: "nahwu" },
            { type: "data", label: "Shorof", key: "shorof" },
            { type: "data", label: "Tashowwuf", key: "tashowwuf" },
            { type: "data", label: "Balaghoh", key: "balaghoh" },
            { type: "data", label: "Tauhid", key: "tauhid" },
            { type: "data", label: "Mantiq", key: "mantiq" },
            
            // Kategori B
            { type: "header", label: "B. LISAN / HAFALAN" },
            { type: "data", label: "Nahwu (Lisan)", key: "lisan_nahwu" },
            { type: "data", label: "Mustholah Hadits (Lisan)", key: "lisan_m_hadits" },
            { type: "data", label: "Hadits (Lisan)", key: "lisan_hadits" },
            { type: "data", label: "Balaghoh (Lisan)", key: "lisan_balaghoh" },
            { type: "data", label: "Tafsir (Lisan)", key: "lisan_tafsir" },
            
            // Kategori C
            { type: "header", label: "C. UMUM" },
            { type: "data", label: "PKN", key: "pkn" },
            { type: "data", label: "B. Indonesia", key: "indo" },
            { type: "data", label: "Matematika", key: "mtk" },
            { type: "data", label: "IPA", key: "ipa" },
            { type: "data", label: "IPS", key: "ips" },
            { type: "data", label: "B. Inggris", key: "inggris" },
        ];

        let htmlRows = "";
        let no = 1;
        let currentHeader = ""; // Untuk menyimpan judul kategori sementara
        let hasSubjectInGroup = false; // Penanda apakah ada mapel di grup ini

        // === LOGIKA PINTAR (SMART FILTER) ===
        // Kita loop dulu untuk memproses per grup
        
        // Tampung dulu array sementara biar mudah
        let processedList = []; 
        
        // Logika: Hanya tampilkan Judul Kategori (Header) JIKA ada minimal 1 mapel isinya > 0 di bawahnya
        for (let i = 0; i < listMapel.length; i++) {
            let item = listMapel[i];

            if (item.type === 'header') {
                // Simpan header, tapi jangan diprint dulu
                currentHeader = item.label;
                hasSubjectInGroup = false; 
            } else {
                let nilai = data[item.key] ? parseInt(data[item.key]) : 0;
                
                // Cek apakah mapel ini ada nilainya (Lebih dari 0)
                if (nilai > 0) {
                    // Jika ini mapel pertama di grup yang punya nilai, print headernya dulu
                    if (!hasSubjectInGroup && currentHeader !== "") {
                        htmlRows += `<tr><td colspan="4" class="bg-kategori small py-1">${currentHeader}</td></tr>`;
                        hasSubjectInGroup = true; // Tandai header sudah diprint
                    }

                    // Lalu print baris nilai mapelnya
                    let predikat = hitungPredikat(nilai);
                    let cssClass = nilai < 60 ? "nilai-merah" : ""; 

                    htmlRows += `
                        <tr>
                            <td>${no++}</td>
                            <td class="text-start ps-3">${item.label}</td>
                            <td class="fw-bold ${cssClass}">${nilai}</td>
                            <td>${predikat}</td>
                        </tr>
                    `;
                }
            }
        }

        // Kalau ternyata santri ini ga punya nilai sama sekali (Data Kosong)
        if (htmlRows === "") {
            htmlRows = `<tr><td colspan="4" class="text-center py-3 text-danger">Belum ada data nilai yang diinput untuk santri ini.</td></tr>`;
        }

        document.getElementById('nilaiBody').innerHTML = htmlRows;

        // === ISI DATA FOOTER ===
        document.getElementById('outJumlah').innerText = data.jumlah_nilai || "0";
        document.getElementById('outRata').innerText = data.nilai_rata_rata || "0";
        document.getElementById('outPredikatRata').innerText = hitungPredikat(data.nilai_rata_rata);
        document.getElementById('outRanking').innerText = data.ranking || "-";

        document.getElementById('outKelakuan').innerText = data.kelakuan || '-';
        document.getElementById('outKerajinan').innerText = data.kerajinan || '-';
        document.getElementById('outKerapihan').innerText = data.kerapihan || '-';
        
        document.getElementById('outSakit').innerText = data.sakit || '0';
        document.getElementById('outIzin').innerText = data.izin || '0';
        document.getElementById('outAlpha').innerText = data.alpha || '0';
        
        document.getElementById('outCatatan').innerText = data.catatan || "Tetap semangat dan tingkatkan belajarnya!";

        const resDiv = document.getElementById('raportResult');
        resDiv.style.display = 'block';
        
        setTimeout(() => {
            resDiv.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    function hitungPredikat(nilai) {
        if (!nilai) return "-"; // Kalau kosong
        if (nilai >= 90) return "A (Istimewa)";
        if (nilai >= 80) return "B (Baik)";
        if (nilai >= 70) return "C (Cukup)";
        if (nilai >= 60) return "D (Kurang)";
        return "E (Remedial)";
    }
</script>




 
<?php include __DIR__ . '/partials.footer.php'; ?>

  <a href="#top" id="backToTop" title="Kembali ke atas">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
      <path d="M10,0L9.4,0.6L0.8,9.1l1.2,1.2l7.1-7.1V20h1.7V3.3l7.1,7.1l1.2-1.2l-8.5-8.5L10,0z"></path>
    </svg>
  </a>

<div id="searchOverlay">
  <span id="closeSearch" class="close-search" title="Tutup">×</span>
  <div class="search-box">
    <form class="d-flex gap-2" action="/pencarian.html" method="GET">
      <input type="text" name="s" class="form-control" autocomplete="off" placeholder="Cari di seluruh situs..." required />
      <button type="submit"><i class="bi bi-search"></i> CARI</button>
    </form>
  </div>
</div>

<script>
    document.getElementById('raportForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nisInput = document.getElementById('inputNIS').value.trim();
        const statusMsg = document.getElementById('statusMsg');
        const resultDiv = document.getElementById('raportResult');
        const btn = this.querySelector('button');

        // Reset Tampilan
        statusMsg.style.display = 'none';
        resultDiv.style.display = 'none';
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
        btn.disabled = true;

        if(!nisInput) {
            alert("Mohon isi NIS terlebih dahulu!");
            btn.innerHTML = 'CEK';
            btn.disabled = false;
            return;
        }

        // PANGGIL PHP BACKEND
        fetch('cek_raport_api.php?nis=' + nisInput)
            .then(response => response.json())
            .then(res => {
                if (res.status === 'success') {
                    tampilkanRaport(res.data);
                } else {
                    statusMsg.innerText = res.message;
                    statusMsg.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                statusMsg.innerText = "Terjadi kesalahan sistem. Cek koneksi database.";
                statusMsg.style.display = 'block';
            })
            .finally(() => {
                btn.innerHTML = '<i class="fa-solid fa-search me-2"></i> CEK';
                btn.disabled = false;
            });
    });

    function tampilkanRaport(data) {
        // 1. Isi Data Diri
        document.getElementById('outNama').innerText = ": " + data.nama_lengkap;
        document.getElementById('outNIS').innerText = ": " + data.nis;
        document.getElementById('outKelas').innerText = ": " + data.kelas;
        document.getElementById('outSemester').innerText = ": " + data.semester;
        document.getElementById('outTahun').innerText = ": " + data.tahun_ajaran;
        
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('todayDate').innerText = ": " + new Date().toLocaleDateString('id-ID', options);

        // 2. Mapping Mata Pelajaran (Sesuai Database)
        // Format: [Label Tampilan, Nama Kolom Database]
        const listMapel = [
            { group: "A. KITAB / DINIAH" },
            { label: "Tafsir", key: "tafsir" },
            { label: "Hadits", key: "hadits" },
            { label: "Ulumu Tafsir", key: "ulumu_tafsir" },
            { label: "Mustholah Hadits", key: "mustholah_hadits" },
            { label: "Siroh", key: "siroh" },
            { label: "Fiqih", key: "fiqih" },
            { label: "Ushul Fiqih", key: "ushul_fiqih" },
            { label: "Faroid", key: "faroid" },
            { label: "Nahwu", key: "nahwu" },
            { label: "Shorof", key: "shorof" },
            { label: "Tashowwuf", key: "tashowwuf" },
            { label: "Balaghoh", key: "balaghoh" },
            { label: "Tauhid", key: "tauhid" },
            { label: "Mantiq", key: "mantiq" },
            
            { group: "B. LISAN / HAFALAN" },
            { label: "Nahwu (Lisan)", key: "lisan_nahwu" },
            { label: "Mustholah Hadits (Lisan)", key: "lisan_m_hadits" },
            { label: "Hadits (Lisan)", key: "lisan_hadits" },
            
            { group: "C. UMUM" },
            { label: "PKN", key: "pkn" },
            { label: "Bahasa Indonesia", key: "indo" },
            { label: "Matematika", key: "mtk" },
            { label: "IPA", key: "ipa" },
            { label: "IPS", key: "ips" },
            { label: "Bahasa Inggris", key: "inggris" },
        ];

        let htmlRows = "";
        let no = 1;

        listMapel.forEach(item => {
            if (item.group) {
                // Baris Judul Kategori
                htmlRows += `<tr><td colspan="4" class="bg-kategori">${item.group}</td></tr>`;
            } else {
                // Baris Nilai
                let nilai = data[item.key] ? parseInt(data[item.key]) : 0;
                let predikat = hitungPredikat(nilai);
                let cssClass = nilai < 60 ? "nilai-merah" : ""; // Merah jika nilai < 60

                htmlRows += `
                    <tr>
                        <td>${no++}</td>
                        <td class="text-start ps-4">${item.label}</td>
                        <td class="fw-bold ${cssClass}">${nilai}</td>
                        <td>${predikat}</td>
                    </tr>
                `;
            }
        });

        document.getElementById('nilaiBody').innerHTML = htmlRows;
        document.getElementById('outRata').innerText = data.rata_rata;
        document.getElementById('outPredikatRata').innerText = hitungPredikat(data.rata_rata);

        // 3. Kepribadian & Absensi
        document.getElementById('outKelakuan').innerText = data.kelakuan || '-';
        document.getElementById('outKerajinan').innerText = data.kerajinan || '-';
        document.getElementById('outKerapihan').innerText = data.kerapihan || '-';
        
        document.getElementById('outSakit').innerText = data.sakit || '0';
        document.getElementById('outIzin').innerText = data.izin || '0';
        document.getElementById('outAlpha').innerText = data.alpha || '0';
        
        document.getElementById('outCatatan').innerText = data.catatan || "-";

        // Munculkan Hasil
        const resDiv = document.getElementById('raportResult');
        resDiv.style.display = 'block';
        
        // Scroll ke bawah
        setTimeout(() => {
            resDiv.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    // Fungsi hitung predikat sederhana
    function hitungPredikat(nilai) {
        if (nilai >= 90) return "A (Istimewa)";
        if (nilai >= 80) return "B (Baik)";
        if (nilai >= 70) return "C (Cukup)";
        if (nilai >= 60) return "D (Kurang)";
        return "E (Remedial)";
    }
</script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script src="/assets/js/main.js"></script>

</body>
</html>









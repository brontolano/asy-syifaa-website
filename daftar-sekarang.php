<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Pendaftaran Santri Baru (PSB) 2026/2027 - Asy-Syifaa Wal Mahmuudiyyah</title>
<meta name="description" content="Telah dibuka PSB Tahun Ajaran 2026/2027 Pondok Pesantren Asy-Syifaa Wal Mahmuudiyyah Sumedang. Mari wujudkan generasi berakhlakul karimah. Daftar online sekarang!">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />
<link rel="icon" href="/assets/media/images/logo.png" type="image/png" sizes="32x32">

  <link rel="stylesheet" href="/css/style.css?v=20260517" />
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source Sans 3:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/footer.css?v=20260517">

  
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/main.css?v=20260519">
  <style>
/* Animasi Halus */
    .form-step {
        animation: fadeIn 0.5s;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Card Styling */
    .card {
        border-radius: 15px;
        border: none;
    }

    /* --- STEPPER / PROGRESS BAR (ANTI ANCUR) --- */
    .stepper-wrapper {
        position: relative;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        margin-top: 10px;
    }
    .stepper-wrapper::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 100%;
        height: 4px;
        background-color: #e9ecef;
        z-index: 1;
    }
    .stepper-progress {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        height: 4px;
        background-color: var(--primary-green);
        width: 0%;
        z-index: 2;
        transition: width 0.3s ease;
    }
    .step-dot {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #e9ecef;
        color: #999;
        border: 3px solid #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        position: relative;
        z-index: 3;
        transition: all 0.3s;
    }
    .step-dot.active {
        background-color: var(--primary-green);
        color: #fff;
        box-shadow: 0 0 10px rgba(0, 104, 55, 0.4);
    }

    /* Floating Labels */
    .form-floating > .form-control:focus ~ label,
    .form-floating > .form-control:not(:placeholder-shown) ~ label {
      color: var(--primary-green);
      font-weight: 600;
    }
    .form-control:focus, .form-select:focus {
      border-color: var(--primary-green);
      box-shadow: 0 0 0 0.25rem rgba(0, 104, 55, 0.25);
    }

    /* --- MEDIA QUERY KHUSUS HP (Layar Kecil) --- */
    @media (max-width: 768px) {
        main.container {
            margin-top: 85px !important; 
            padding-left: 10px;
            padding-right: 10px;
        }
        h2.fw-bold {
            font-size: 1.5rem;
        }
        .step-dot {
            width: 30px;
            height: 30px;
            font-size: 12px;
            border-width: 2px;
        }
        .card-body {
            padding: 1.5rem !important;
        }
        
        /* FIX JARAK TOMBOL DI HP */
        /* Tombol jadi full width dan ada jarak vertikal */
        .btn-nav-mobile {
            width: 100%;
            margin-bottom: 100px;
        }
        /* Membalik urutan agar 'Selanjutnya' ada di atas (opsional, tapi saya biarkan standar: Kembali dulu baru Selanjutnya) */
    }
    
  
    .ppdb-embed-card {
      background: #fff;
      border: 1px solid rgba(15, 61, 37, 0.12);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 16px 40px rgba(0,0,0,0.08);
    }
    .ppdb-embed-head {
      padding: 1rem 1.25rem;
      border-bottom: 1px solid rgba(15, 61, 37, 0.12);
      background: linear-gradient(140deg, rgb(15, 61, 37) 0%, rgb(31, 107, 67) 55%, rgb(42, 138, 87) 100%);
      color: #fff;
    }
    .ppdb-embed-head h2 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 700;
    }
    .ppdb-embed-frame {
      width: 100%;
      min-height: 82vh;
      border: 0;
      background: #fff;
    }
    .ppdb-legacy {
      display: block;
    }

    .required-mark {
      color: #dc3545;
      font-weight: 700;
      margin-left: 0.2rem;
    }

    .required-note {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      margin-top: 0.55rem;
      font-size: 0.82rem;
      color: #6c757d;
      background: #fff8f8;
      border: 1px solid #f1d2d2;
      border-radius: 999px;
      padding: 0.2rem 0.65rem;
    }
</style>
<script src="/assets/js/main.js"></script>
 

</head>

 
<body id="top">
<?php include __DIR__ . '/partials.header.php'; ?>




<main class="container ppdb-legacy" style="margin-top: 130px; margin-bottom: 50px;">
    <div class="row justify-content-center">
        <div class="col-lg-10 col-md-12">

            <div class="card shadow-lg overflow-hidden">
                
                <div class="card-header text-center py-4 bg-white border-bottom-0">
                    <h2 class="fw-bold" style="color: var(--primary-green);">Formulir Pendaftaran</h2>
                    <p class="text-muted mb-0 small">Tahun Ajaran 2026/2027 - Gelombang 2</p>
                    <p class="required-note mb-0">
                        <span class="required-mark">*</span> wajib diisi
                    </p>
                    
                    <div class="px-3 mt-4">
                        <div class="stepper-wrapper">
                            <div class="stepper-progress" id="progressBar"></div>

                            <div class="step-dot active" id="dot1">1</div>
                            <div class="step-dot" id="dot2">2</div>
                            <div class="step-dot" id="dot3">3</div>
                            <div class="step-dot" id="dot4">4</div>
                            <div class="step-dot" id="dot5">5</div>
                            <div class="step-dot" id="dot6">6</div>
                        </div>
                    </div>
                    </div>

                <div class="card-body p-4 p-md-5 bg-light">
                    <form action="#" method="POST" id="mainForm">
                        
                        <div class="form-step" id="step1">
                            <h5 class="mb-4 fw-bold text-secondary border-bottom pb-2"><i class="fa-solid fa-user-graduate me-2"></i>Data Calon Santri</h5>
                            
                            <div class="row g-3">
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" name="nama_lengkap" id="namaLengkap" placeholder="Nama" required>
                                        <label>Nama Lengkap (Sesuai Ijazah/KK)</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="number" class="form-control" name="nisn" placeholder="NISN" required>
                                        <label>NISN</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="number" class="form-control" name="nik_santri" placeholder="NIK" required>
                                        <label>NIK Santri</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" name="tempat_lahir" placeholder="Tempat Lahir" required>
                                        <label>Tempat Lahir</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="date" class="form-control" name="tgl_lahir" required>
                                        <label>Tanggal Lahir</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label small fw-bold text-muted">Jenis Kelamin</label>
                                    <div class="d-flex gap-3">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="jenis_kelamin" value="Laki-Laki" id="jkL" checked>
                                            <label class="form-check-label" for="jkL">Laki-Laki</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="jenis_kelamin" value="Perempuan" id="jkP">
                                            <label class="form-check-label" for="jkP">Perempuan</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <select class="form-select" name="gol_darah">
                                            <option value="-">- Pilih -</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="O">O</option>
                                            <option value="AB">AB</option>
                                        </select>
                                        <label>Golongan Darah</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="number" class="form-control" name="anak_ke" placeholder="Anak Ke">
                                        <label>Anak Ke-</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="number" class="form-control" name="jml_saudara" placeholder="Jml Saudara">
                                        <label>Jumlah Saudara</label>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" name="hobi" placeholder="Hobi">
                                        <label>Hobi (Pisahkan dengan koma)</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" name="cita_cita" placeholder="Cita-cita">
                                        <label>Cita-Cita</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <select class="form-select" name="pendidikan_terakhir">
                                            <option value="SD/MI">SD/MI</option>
                                            <option value="SMP/MTs">SMP/MTs</option>
                                        </select>
                                        <label>Pendidikan Terakhir</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 text-end">
                                <button type="button" class="btn btn-success px-4 py-2 rounded-pill shadow-sm w-100 w-md-auto" onclick="nextStep(1)">
                                    Selanjutnya <i class="fas fa-arrow-right ms-2"></i>
                                </button>
                            </div>
                        </div>

                        <div class="form-step d-none" id="step2">
                            <h5 class="mb-4 fw-bold text-secondary border-bottom pb-2"><i class="fa-solid fa-user-tie me-2"></i>Data Ayah Kandung</h5>
                            <div class="row g-3">
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" name="nama_ayah" placeholder="Nama Ayah" required>
                                        <label>Nama Ayah</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <select class="form-select" name="status_ayah" required>
                                            <option value="Hidup">Masih Hidup</option>
                                            <option value="Meninggal">Meninggal</option>
                                        </select>
                                        <label>Status</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="number" class="form-control" name="nik_ayah" placeholder="NIK Ayah">
                                        <label>NIK Ayah</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <select class="form-select" name="pekerjaan_ayah" required>
                                            <option value="Wiraswasta">Wiraswasta</option>
                                            <option value="PNS">PNS</option>
                                            <option value="Petani">Petani</option>
                                            <option value="Buruh">Buruh</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                        <label>Pekerjaan</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <select class="form-select" name="penghasilan_ayah" required>
                                            <option value="< 1 Juta">< Rp 1.000.000</option>
                                            <option value="1-3 Juta">Rp 1.000.000 - 3.000.000</option>
                                            <option value="> 3 Juta">> Rp 3.000.000</option>
                                        </select>
                                        <label>Penghasilan</label>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" name="no_wa_ayah" placeholder="WhatsApp" required>
                                        <label>No. WhatsApp Ayah</label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <textarea class="form-control" name="alamat_ayah" id="alamatAyah" style="height: 100px" placeholder="Alamat" required></textarea>
                                        <label>Alamat Lengkap Ayah</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 d-flex flex-column flex-md-row justify-content-between gap-3">
                                <button type="button" class="btn btn-outline-secondary px-4 py-2 rounded-pill w-100 w-md-auto" onclick="prevStep(2)">Kembali</button>
                                <button type="button" class="btn btn-success px-4 py-2 rounded-pill shadow-sm w-100 w-md-auto" onclick="nextStep(2)">Selanjutnya <i class="fas fa-arrow-right ms-2"></i></button>
                            </div>
                        </div>

                        <div class="form-step d-none" id="step3">
                            <h5 class="mb-4 fw-bold text-secondary border-bottom pb-2"><i class="fa-solid fa-person-dress me-2"></i>Data Ibu Kandung</h5>
                            <div class="row g-3">
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" name="nama_ibu" placeholder="Nama Ibu" required>
                                        <label>Nama Ibu</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <select class="form-select" name="status_ibu">
                                            <option value="Hidup">Masih Hidup</option>
                                            <option value="Meninggal">Meninggal</option>
                                        </select>
                                        <label>Status</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="number" class="form-control" name="nik_ibu" placeholder="NIK Ibu">
                                        <label>NIK Ibu</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <select class="form-select" name="pekerjaan_ibu">
                                            <option value="IRT">Ibu Rumah Tangga</option>
                                            <option value="PNS">PNS</option>
                                            <option value="Wiraswasta">Wiraswasta</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                        <label>Pekerjaan</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" name="no_wa_ibu" placeholder="WhatsApp">
                                        <label>No. WhatsApp Ibu</label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-check mb-2">
                                        <input class="form-check-input" type="checkbox" id="cekAlamatSama" onchange="copyAlamat()">
                                        <label class="form-check-label text-muted small" for="cekAlamatSama">
                                            Alamat sama dengan Ayah
                                        </label>
                                    </div>
                                    <div class="form-floating">
                                        <textarea class="form-control" name="alamat_ibu" id="alamatIbu" style="height: 100px" placeholder="Alamat"></textarea>
                                        <label>Alamat Lengkap Ibu</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 d-flex justify-content-between">
                                <button type="button" class="btn btn-outline-secondary px-4 py-2 rounded-pill" onclick="prevStep(3)">Kembali</button>
                                <button type="button" class="btn btn-success px-4 py-2 rounded-pill shadow-sm" onclick="nextStep(3)">Selanjutnya <i class="fas fa-arrow-right ms-2"></i></button>
                            </div>
                        </div>

                        <div class="form-step d-none" id="step4">
                            <h5 class="mb-4 fw-bold text-secondary border-bottom pb-2"><i class="fa-solid fa-check-double me-2"></i>Konfirmasi & Wali</h5>
                            
                            <div class="row g-3">
                                <div class="col-12">
                                    <label class="form-label fw-bold">Pembiaya Pesantren</label>
                                    <select class="form-select" name="pembiaya">
                                        <option value="Orang Tua">Orang Tua Kandung</option>
                                        <option value="Wali">Wali / Orang Tua Asuh</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="number" class="form-control" name="no_kk" placeholder="No KK" required>
                                        <label>Nomor Kartu Keluarga (KK)</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" name="kepala_keluarga" placeholder="Kepala Keluarga" required>
                                        <label>Nama Kepala Keluarga</label>
                                    </div>
                                </div>
                            </div>

                            <div class="alert alert-warning mt-4 d-flex align-items-center" role="alert">
                                <i class="fa-solid fa-triangle-exclamation fs-2 me-3"></i>
                                <div>
                                    <small>Pastikan data yang diisi sudah benar. Data tidak dapat diubah setelah tombol <b>Kirim Pendaftaran</b> ditekan.</small>
                                </div>
                            </div>

                            <div class="mt-4 d-flex justify-content-between">
                                <button type="button" class="btn btn-outline-secondary px-4 py-2 rounded-pill" onclick="prevStep(4)">Kembali</button>
                                <button type="button" class="btn btn-success px-4 py-2 rounded-pill shadow-sm" onclick="nextStep(4)">Selanjutnya <i class="fas fa-arrow-right ms-2"></i></button>
                            </div>
                        </div>

                        <div class="form-step d-none" id="step5">
                            <h5 class="mb-4 fw-bold text-secondary border-bottom pb-2"><i class="fa-solid fa-mobile-screen-button me-2"></i>Nomor WhatsApp Peserta</h5>
                            <div class="row g-3">
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" name="no_wa_peserta" id="noWaPeserta" placeholder="08xxxxxxxxxx" required>
                                        <label>No. WhatsApp Peserta (Aktif)</label>
                                    </div>
                                    <small class="text-muted">Nomor ini dipakai untuk kirim akun ERP & password via WhatsApp.</small>
                                </div>
                            </div>
                            <div class="mt-4 d-flex justify-content-between">
                                <button type="button" class="btn btn-outline-secondary px-4 py-2 rounded-pill" onclick="prevStep(5)">Kembali</button>
                                <button type="submit" name="submit_daftar" class="btn btn-success px-5 py-2 rounded-pill shadow-lg fw-bold">
                                    <i class="fa-solid fa-paper-plane me-2"></i> KIRIM PENDAFTARAN
                                </button>
                            </div>
                        </div>

                        <div class="form-step d-none" id="step6">
                            <h5 class="mb-4 fw-bold text-secondary border-bottom pb-2"><i class="fa-solid fa-qrcode me-2"></i>E‑Ticket PPDB</h5>
                            <div class="text-center">
                                <p class="mb-3">Pendaftaran berhasil. Simpan QR ini untuk verifikasi panitia.</p>
                                <div id="eticketQrWrap" class="d-inline-flex align-items-center justify-content-center p-3 bg-white border rounded-3"></div>
                                <p class="mt-3 mb-1 fw-bold" id="eticketNoText">-</p>
                                <small class="text-muted d-block" id="eticketAccountText"></small>
                                <div class="alert alert-info mt-3 text-start small">
                                  <strong>Langkah selanjutnya:</strong> Login ke Portal PPDB untuk melengkapi data diri dan upload dokumen persyaratan (KK, KTP Ortu, Ijazah, Akta Lahir, Foto, Surat Sehat).
                                </div>
                                <div class="mt-3 d-flex justify-content-center gap-2 flex-wrap">
                                  <a href="/login/" class="btn btn-primary rounded-pill px-4"><i class="fa-solid fa-right-to-bracket me-1"></i> Login ke Portal PPDB</a>
                                  <a href="/" class="btn btn-outline-secondary rounded-pill px-4">Kembali ke Beranda</a>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</main>







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


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
<script src="/assets/js/api-config.js"></script>
<script>
  function applyRequiredMarkers(formId) {
      const form = document.getElementById(formId);
      if (!form) return;
      const requiredFields = form.querySelectorAll("input[required], select[required], textarea[required]");
      requiredFields.forEach((field) => {
          let label = null;
          const floating = field.closest(".form-floating");
          if (floating) {
              label = floating.querySelector("label");
          }
          if (!label && field.id) {
              label = form.querySelector(`label[for="${field.id}"]`);
          }
          if (!label && field.closest(".col-12, .col-md-6, .col-md-12")) {
              label = field.closest(".col-12, .col-md-6, .col-md-12").querySelector("label.form-label");
          }
          if (!label) return;
          if (label.querySelector(".required-mark")) return;
          const mark = document.createElement("span");
          mark.className = "required-mark";
          mark.textContent = "*";
          label.appendChild(mark);
      });
  }

  if (window.AOS && typeof window.AOS.init === "function") { window.AOS.init(); }
  applyRequiredMarkers("mainForm");

  let currentStep = 1;
  const totalSteps = 6;
  
  function updateProgress(step) {
      // 1. Update Lebar Garis Hijau sesuai total step.
      let percent = ((step - 1) / (totalSteps - 1)) * 100;
      if(percent > 100) percent = 100;
      document.getElementById('progressBar').style.width = percent + '%';
      
      // 2. Update Warna Tombol Angka
      for(let i=1; i<=totalSteps; i++) {
          let dot = document.getElementById('dot'+i);
          if(i <= step) {
              dot.classList.add('active'); // Jadi hijau
          } else {
              dot.classList.remove('active'); // Jadi abu
          }
      }
  }

  function nextStep(step) {
      // Validasi Input
      let inputs = document.getElementById('step' + step).querySelectorAll('input[required], select[required], textarea[required]');
      let valid = true;
      
      inputs.forEach(input => {
          if (!input.value) {
              input.classList.add('is-invalid');
              valid = false;
          } else {
              input.classList.remove('is-invalid');
          }
      });

      if (valid) {
          // Pindah Halaman
          document.getElementById('step' + step).classList.add('d-none');
          document.getElementById('step' + (step + 1)).classList.remove('d-none');
          
          currentStep = step + 1;
          updateProgress(currentStep);
          window.scrollTo(0, 0); // Scroll ke atas
      } else {
          alert('Mohon lengkapi data yang wajib diisi!');
      }
  }

  function prevStep(step) {
      document.getElementById('step' + step).classList.add('d-none');
      document.getElementById('step' + (step - 1)).classList.remove('d-none');
      
      currentStep = step - 1;
      updateProgress(currentStep);
      window.scrollTo(0, 0);
  }

  function copyAlamat() {
      if(document.getElementById('cekAlamatSama').checked) {
          document.getElementById('alamatIbu').value = document.getElementById('alamatAyah').value;
      } else {
          document.getElementById('alamatIbu').value = '';
      }
  }

  function normalizeGuardianPhone(value) {
      let raw = String(value || "").trim().replace(/[^\d+]/g, "");
      if (!raw) return "";
      if (raw.startsWith("+")) raw = raw.slice(1);          // buang tanda +
      raw = raw.replace(/^0+(?=62)/, "");                    // 062.. -> 62..
      if (raw.startsWith("62")) return raw;                 // sudah pakai kode negara
      if (raw.startsWith("0")) return `62${raw.slice(1)}`;  // 08xx -> 628xx
      if (raw.startsWith("8")) return `62${raw}`;           // 8xx (tanpa 0) -> 628xx
      return raw;
  }

  function isValidGuardianPhone(value) {
      // 08 + 8..12 digit (format 62: 628 + [1-9] + 6..11 digit)
      return /^628[1-9][0-9]{6,11}$/.test(value);
  }

  function buildEticket(id) {
      const safeId = String(id || 0).padStart(6, "0");
      const part = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      return `ETK-${part}-${safeId}`;
  }
  function renderEticketQr(text) {
      const wrap = document.getElementById("eticketQrWrap");
      if (!wrap) return;
      wrap.innerHTML = "";
      if (window.QRCode) {
          new QRCode(wrap, {
              text,
              width: 220,
              height: 220,
              colorDark: "#0e6b45",
              colorLight: "#ffffff",
              correctLevel: QRCode.CorrectLevel.M
          });
          return;
      }
      const img = document.createElement("img");
      img.alt = "QR E-Ticket";
      img.width = 220;
      img.height = 220;
      img.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(text)}`;
      wrap.appendChild(img);
  }

  const formEl = document.getElementById("mainForm");
  if (formEl) {
      formEl.addEventListener("submit", async function (event) {
          event.preventDefault();

          const submitBtn = formEl.querySelector('button[type="submit"]');
          if (submitBtn) {
              submitBtn.disabled = true;
              submitBtn.dataset.originalText = submitBtn.innerHTML;
              submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Mengirim...';
          }

          try {
              const fd = new FormData(formEl);
              const namaLengkap = String(fd.get("nama_lengkap") || "").trim();
              const namaAyah = String(fd.get("nama_ayah") || "").trim();
              const namaIbu = String(fd.get("nama_ibu") || "").trim();
              const noWaAyah = normalizeGuardianPhone(fd.get("no_wa_ayah"));
              const noWaIbu = normalizeGuardianPhone(fd.get("no_wa_ibu"));
              const noWaPeserta = normalizeGuardianPhone(fd.get("no_wa_peserta"));
              const guardianPhone = noWaAyah || noWaIbu;

              if (!guardianPhone || !isValidGuardianPhone(guardianPhone)) {
                  alert("Nomor WhatsApp wali tidak valid. Gunakan format 08xxxxxxxxxx.");
                  return;
              }
              if (!noWaPeserta || !isValidGuardianPhone(noWaPeserta)) {
                  alert("Nomor WhatsApp peserta tidak valid. Gunakan format 08xxxxxxxxxx.");
                  return;
              }

              const notes = [
                  `nisn:${fd.get("nisn") || "-"}`,
                  `nik_santri:${fd.get("nik_santri") || "-"}`,
                  `tempat_lahir:${fd.get("tempat_lahir") || "-"}`,
                  `tgl_lahir:${fd.get("tgl_lahir") || "-"}`,
                  `jenis_kelamin:${fd.get("jenis_kelamin") || "-"}`,
                  `pendidikan_terakhir:${fd.get("pendidikan_terakhir") || "-"}`,
                  `pembiaya:${fd.get("pembiaya") || "-"}`,
                  `no_kk:${fd.get("no_kk") || "-"}`,
                  `kepala_keluarga:${fd.get("kepala_keluarga") || "-"}`
              ].join(" | ");

              const jk = String(fd.get("jenis_kelamin") || "").toLowerCase();
              const gender = jk.startsWith("p") ? "P" : "L";
              const tahun = new Date().getFullYear();
              const academicYear = `${tahun}/${tahun + 1}`;

              const payload = {
                  student_name: namaLengkap,
                  nik: String(fd.get("nik_santri") || "").trim(),
                  nisn: String(fd.get("nisn") || "").trim() || null,
                  gender,
                  birth_place: String(fd.get("tempat_lahir") || "").trim() || null,
                  birth_date: String(fd.get("tgl_lahir") || "").trim() || null,
                  origin_school: String(fd.get("pendidikan_terakhir") || "").trim() || null,
                  parent_name: [namaAyah, namaIbu].filter(Boolean).join(" / ") || null,
                  parent_phone: guardianPhone,
                  guardian_phone: guardianPhone,
                  participant_phone: noWaPeserta,
                  academic_year: academicYear,
                  source: "website",
                  notes
              };

              const apiBase = window.ASF_API_BASE || "";
              const response = await fetch(apiBase + "/api/v1/spmb/register", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", "Accept": "application/json" },
                  body: JSON.stringify(payload)
              });
              const result = await response.json().catch(() => ({}));
              if (!response.ok || !(result?.success || result?.ok)) {
                  const firstErr = result?.errors ? Object.values(result.errors)[0]?.[0] : null;
                  throw new Error(firstErr || result?.message || "Pendaftaran gagal dikirim.");
              }

              const data = result?.data || {};
              const eticket = data.eticket_no || data.registration_number || buildEticket(data.id);
              const username = data.username || data.erp_username || result?.account?.username || "-";
              const qrPayload = `ETICKET:${eticket}|NAMA:${namaLengkap}|WA:${noWaPeserta}|USER:${username}`;
              renderEticketQr(qrPayload);
              const eticketNoEl = document.getElementById("eticketNoText");
              if (eticketNoEl) eticketNoEl.textContent = eticket;
              const eticketAccountEl = document.getElementById("eticketAccountText");
              if (eticketAccountEl) eticketAccountEl.textContent = `Username Portal: ${username} — Password dikirim via WhatsApp.`;
              document.getElementById("step5").classList.add("d-none");
              document.getElementById("step6").classList.remove("d-none");
              currentStep = 6;
              updateProgress(currentStep);
              window.scrollTo(0, 0);
          } catch (error) {
              alert(error.message || "Terjadi gangguan saat mengirim pendaftaran.");
          } finally {
              if (submitBtn) {
                  submitBtn.disabled = false;
                  submitBtn.innerHTML = submitBtn.dataset.originalText || '<i class="fa-solid fa-paper-plane me-2"></i> KIRIM PENDAFTARAN';
              }
          }
      });
  }
</script>

</body>
</html>













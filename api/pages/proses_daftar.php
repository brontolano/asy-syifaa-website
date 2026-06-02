<?php
// Panggil jembatan koneksi
include 'koneksi.php';

// Cek apakah tombol kirim sudah ditekan
if (isset($_POST['submit_daftar'])) {

    // Ambil data dari formulir
    $nama_lengkap = mysqli_real_escape_string($koneksi, $_POST['nama_lengkap']);
    $nisn = $_POST['nisn'];
    $nik_santri = $_POST['nik_santri'];
    $tempat_lahir = $_POST['tempat_lahir'];
    $tgl_lahir = $_POST['tgl_lahir'];
    $jenis_kelamin = $_POST['jenis_kelamin'];
    $gol_darah = $_POST['gol_darah'];
    $anak_ke = $_POST['anak_ke'];
    $jml_saudara = $_POST['jml_saudara'];
    $hobi = $_POST['hobi'];
    $cita_cita = $_POST['cita_cita'];
    $pendidikan_terakhir = $_POST['pendidikan_terakhir'];

    // Data Ayah
    $nama_ayah = mysqli_real_escape_string($koneksi, $_POST['nama_ayah']);
    $status_ayah = $_POST['status_ayah'];
    $nik_ayah = $_POST['nik_ayah'];
    $pekerjaan_ayah = $_POST['pekerjaan_ayah'];
    $penghasilan_ayah = $_POST['penghasilan_ayah'];
    $no_wa_ayah = $_POST['no_wa_ayah'];
    $alamat_ayah = mysqli_real_escape_string($koneksi, $_POST['alamat_ayah']);

    // Data Ibu
    $nama_ibu = mysqli_real_escape_string($koneksi, $_POST['nama_ibu']);
    $status_ibu = $_POST['status_ibu'];
    $nik_ibu = $_POST['nik_ibu'];
    $pekerjaan_ibu = $_POST['pekerjaan_ibu'];
    $no_wa_ibu = $_POST['no_wa_ibu'];
    $alamat_ibu = mysqli_real_escape_string($koneksi, $_POST['alamat_ibu']);

    // Data Wali & KK
    $pembiaya = $_POST['pembiaya'];
    $no_kk = $_POST['no_kk'];
    $kepala_keluarga = mysqli_real_escape_string($koneksi, $_POST['kepala_keluarga']);

    // Perintah SQL untuk menyimpan
    $query = "INSERT INTO pendaftaran_santri (
        nama_lengkap, nisn, nik_santri, tempat_lahir, tgl_lahir, jenis_kelamin, gol_darah,
        anak_ke, jml_saudara, hobi, cita_cita, pendidikan_terakhir,
        nama_ayah, status_ayah, nik_ayah, pekerjaan_ayah, penghasilan_ayah, no_wa_ayah, alamat_ayah,
        nama_ibu, status_ibu, nik_ibu, pekerjaan_ibu, no_wa_ibu, alamat_ibu,
        pembiaya, no_kk, kepala_keluarga
    ) VALUES (
        '$nama_lengkap', '$nisn', '$nik_santri', '$tempat_lahir', '$tgl_lahir', '$jenis_kelamin', '$gol_darah',
        '$anak_ke', '$jml_saudara', '$hobi', '$cita_cita', '$pendidikan_terakhir',
        '$nama_ayah', '$status_ayah', '$nik_ayah', '$pekerjaan_ayah', '$penghasilan_ayah', '$no_wa_ayah', '$alamat_ayah',
        '$nama_ibu', '$status_ibu', '$nik_ibu', '$pekerjaan_ibu', '$no_wa_ibu', '$alamat_ibu',
        '$pembiaya', '$no_kk', '$kepala_keluarga'
    )";

    // Eksekusi perintah
    if (mysqli_query($koneksi, $query)) {
        // PERBAIKAN DI SINI: Redirect kembali ke halaman formulir (refresh)
        echo "<script>
                alert('Alhamdulillah! Pendaftaran Berhasil Dikirim.');
                window.location.href = 'Daftar Sekarang.html'; 
              </script>";
    } else {
        // Jika gagal
        echo "Error: " . $query . "<br>" . mysqli_error($koneksi);
    }
}
?>
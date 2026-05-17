<?php
header('Content-Type: application/json');
include 'koneksi.php';

// Ambil NIS dari input
$nis = isset($_GET['nis']) ? $_GET['nis'] : '';

if(empty($nis)) {
    echo json_encode(['status' => 'error', 'message' => 'NIS tidak boleh kosong']);
    exit;
}

// Cari data di database
// Karena kolom 'nilai_rata_rata' sudah ada di tabel, dia otomatis ikut terpanggil
$query = mysqli_query($koneksi, "SELECT * FROM nilai_santri WHERE nis = '$nis'");
$data = mysqli_fetch_assoc($query);

if($data) {
    // Kita kirimkan nilai rata-rata dari database ke frontend
    // Pastikan nama kuncinya 'rata_rata' agar HTML tidak perlu diubah
    $data['rata_rata'] = $data['nilai_rata_rata']; 
    
    echo json_encode(['status' => 'success', 'data' => $data]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Data santri dengan NIS tersebut tidak ditemukan.']);
}
?>
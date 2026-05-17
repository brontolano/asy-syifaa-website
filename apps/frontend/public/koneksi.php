<?php
$host = "localhost";
$user = "root";     // User default XAMPP
$pass = "";         // Password default XAMPP (kosong)
$db   = "db_pesantren"; // Nama database yang tadi dibuat

// Melakukan koneksi
$koneksi = mysqli_connect($host, $user, $pass, $db);

// Cek koneksi berhasil atau tidak
if (!$koneksi) {
    die("Koneksi gagal: " . mysqli_connect_error());
}
?>
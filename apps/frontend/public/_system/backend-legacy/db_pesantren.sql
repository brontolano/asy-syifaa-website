-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Feb 2026 pada 17.08
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_pesantren`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `pendaftaran_santri`
--

CREATE TABLE `pendaftaran_santri` (
  `id` int(11) NOT NULL,
  `nama_lengkap` varchar(100) DEFAULT NULL,
  `nisn` varchar(20) DEFAULT NULL,
  `nik_santri` varchar(20) DEFAULT NULL,
  `tempat_lahir` varchar(50) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `jenis_kelamin` varchar(15) DEFAULT NULL,
  `gol_darah` varchar(5) DEFAULT NULL,
  `anak_ke` int(2) DEFAULT NULL,
  `jml_saudara` int(2) DEFAULT NULL,
  `hobi` varchar(255) DEFAULT NULL,
  `cita_cita` varchar(50) DEFAULT NULL,
  `pendidikan_terakhir` varchar(20) DEFAULT NULL,
  `nama_ayah` varchar(100) DEFAULT NULL,
  `status_ayah` varchar(20) DEFAULT NULL,
  `nik_ayah` varchar(20) DEFAULT NULL,
  `pekerjaan_ayah` varchar(50) DEFAULT NULL,
  `penghasilan_ayah` varchar(50) DEFAULT NULL,
  `no_wa_ayah` varchar(20) DEFAULT NULL,
  `alamat_ayah` text DEFAULT NULL,
  `nama_ibu` varchar(100) DEFAULT NULL,
  `status_ibu` varchar(20) DEFAULT NULL,
  `nik_ibu` varchar(20) DEFAULT NULL,
  `pekerjaan_ibu` varchar(50) DEFAULT NULL,
  `no_wa_ibu` varchar(20) DEFAULT NULL,
  `alamat_ibu` text DEFAULT NULL,
  `pembiaya` varchar(50) DEFAULT NULL,
  `no_kk` varchar(30) DEFAULT NULL,
  `kepala_keluarga` varchar(100) DEFAULT NULL,
  `waktu_daftar` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pendaftaran_santri`
--

INSERT INTO `pendaftaran_santri` (`id`, `nama_lengkap`, `nisn`, `nik_santri`, `tempat_lahir`, `tgl_lahir`, `jenis_kelamin`, `gol_darah`, `anak_ke`, `jml_saudara`, `hobi`, `cita_cita`, `pendidikan_terakhir`, `nama_ayah`, `status_ayah`, `nik_ayah`, `pekerjaan_ayah`, `penghasilan_ayah`, `no_wa_ayah`, `alamat_ayah`, `nama_ibu`, `status_ibu`, `nik_ibu`, `pekerjaan_ibu`, `no_wa_ibu`, `alamat_ibu`, `pembiaya`, `no_kk`, `kepala_keluarga`, `waktu_daftar`) VALUES
(1, 'ASDASD', '213321', '321213', '213213', '0000-00-00', 'Laki-Laki', 'A', 321321, 213321, '321321', '321321', 'SD/MI', '321', 'Hidup', '321321', 'Buruh', '< 1 Juta', '321213', '321213', '321321', 'Hidup', '213213', 'IRT', '321321', '321213', 'Orang Tua', '321321', '321321', '2026-02-07 15:58:13');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `pendaftaran_santri`
--
ALTER TABLE `pendaftaran_santri`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `pendaftaran_santri`
--
ALTER TABLE `pendaftaran_santri`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

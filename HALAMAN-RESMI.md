# Halaman Resmi Website (Rapi)

## Navigasi utama
- `/` : Beranda
- `/mahad` : Ma'had (halaman induk)
- `/galeri` : List Galeri (12 grid per halaman)
- `/info-pengumuman` : Pengumuman
- `/info-prestasi` : Prestasi
- `/asy-syifaa-tv` : Live streaming (auto-detect + pilihan server)
- `/alur-pendaftaran` : Alur Pendaftaran
- `/daftar-sekarang` : Form Pendaftaran
- `/hasil-seleksi` : Hasil Seleksi

## Detail galeri
- `/galeri/<slug>` : Detail per album

## Sub halaman Ma'had
- `/profil-pondok-pesantren`
- `/visi-dan-misi`
- `/fasilitas-pesantren`
- `/profil-kurikulum`
- `/profil-ekskul`
- `/kegiatan-harian`
- `/kegiatan-mingguan`
- `/profil-abuya`
- `/profil-guru`
- `/struktur-organisasi`
- `/direktori-pengajar`
- `/direktori-santri`
- `/direktori-alumni`

## Catatan route legacy
- File `galeri-*.html` dipertahankan untuk kompatibilitas lama, dan diarahkan ke route baru `/galeri/<slug>`.
- `/galeri-detail` diarahkan ke `/galeri`.

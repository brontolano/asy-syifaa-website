<?php require_once __DIR__ . '/partials.bootstrap.php'; ?>
<nav class="navbar navbar-expand-xl asf-public-navbar fixed-top">
  <div class="container-fluid px-3 px-xl-4">
    <a class="navbar-brand fw-bold d-flex align-items-center" href="/">
      <img src="/assets/media/images/logo.png" alt="Logo Asy-Syifaa Wal Mahmuudiyyah" width="56" height="56" class="me-2">
      <span class="fs-5 mb-0">Asy-Syifaa Wal Mahmuudiyyah</span>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#asfPublicNavbar" aria-controls="asfPublicNavbar" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="asfPublicNavbar">
      <ul class="navbar-nav mx-auto mb-2 mb-xl-0">
        <li class="nav-item"><a class="nav-link<?= nav_active('/', $currentPath) ?>" href="/"><i class="fa-solid fa-house"></i> Beranda</a></li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle<?= nav_active('/mahad', $currentPath) ?>" href="/mahad" id="asfMaHadDropdown" role="button" aria-expanded="false"><i class="fa-solid fa-school"></i> Ma'had</a>
          <ul class="dropdown-menu" aria-labelledby="asfMaHadDropdown">
            <li class="dropdown-submenu">
              <a class="dropdown-item dropdown-toggle" href="/profil-pondok-pesantren" aria-expanded="false">Pesantren</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/visi-dan-misi">Visi Misi</a></li>
                <li><a class="dropdown-item" href="/fasilitas-pesantren">Fasilitas</a></li>
                <li><a class="dropdown-item" href="/profil-kurikulum">Kurikulum</a></li>
                <li><a class="dropdown-item" href="/profil-ekskul">Ekskul</a></li>
                <li><a class="dropdown-item" href="/kegiatan-harian">Agenda 24 Jam</a></li>
                <li><a class="dropdown-item" href="/kegiatan-mingguan">Agenda Rutin</a></li>
              </ul>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="/profil-abuya">Abuya</a></li>
            <li><a class="dropdown-item" href="/profil-guru">Para Guru</a></li>
            <li><a class="dropdown-item" href="/struktur-organisasi">Pengurus</a></li>
            <li><a class="dropdown-item" href="/direktori-pengajar">Pengajar</a></li>
            <li><a class="dropdown-item" href="/direktori-santri">Santri</a></li>
            <li><a class="dropdown-item" href="/direktori-alumni">Alumni</a></li>
          </ul>
        </li>
        <li class="nav-item"><a class="nav-link<?= nav_active('/galeri', $currentPath) ?>" href="/galeri"><i class="fa-solid fa-images"></i> Galeri</a></li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="asfInformasiDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-info"></i> Informasi</a>
          <ul class="dropdown-menu" aria-labelledby="asfInformasiDropdown">
            <li><a class="dropdown-item" href="/info-pengumuman">Pengumuman</a></li>
            <li><a class="dropdown-item" href="/info-prestasi">Prestasi</a></li>
          </ul>
        </li>
        <li class="nav-item"><a class="nav-link<?= nav_active('/asy-syifaa-tv', $currentPath) ?>" href="/asy-syifaa-tv"><i class="fa-solid fa-tv"></i> Asy-Syifaa TV</a></li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="asfPpdbDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-user-plus"></i> Pendaftaran Santri</a>
          <ul class="dropdown-menu" aria-labelledby="asfPpdbDropdown">
            <li><a class="dropdown-item" href="/alur-pendaftaran">Alur Pendaftaran Santri</a></li>
            <li><a class="dropdown-item" href="/daftar-sekarang">Daftar Santri</a></li>
            <li><a class="dropdown-item" href="/hasil-seleksi">Hasil Seleksi</a></li>
          </ul>
        </li>
      </ul>
      <ul class="navbar-nav ms-xl-3 asf-public-navbar-right">
        <?php if ($isLoggedIn): ?>
          <li class="nav-item"><a class="nav-link" href="<?= htmlspecialchars($dashboardUrl) ?>"><i class="fa-solid fa-user"></i> <?= htmlspecialchars($displayName) ?></a></li>
          <li class="nav-item"><a class="nav-link" href="/logout.php"><i class="fa-solid fa-right-from-bracket"></i> Logout</a></li>
        <?php else: ?>
          <li class="nav-item" id="loginNavItem"><a class="nav-link" href="https://erp.asy-syifaa.com" id="apps-erp-link"><i class="fa-solid fa-right-to-bracket"></i> Login / Signup</a></li>
        <?php endif; ?>
        <li class="nav-item"><a class="nav-link" href="#" id="toggleSearch" title="Pencarian"><i class="fa-solid fa-search"></i></a></li>
      </ul>
    </div>
  </div>
</nav>

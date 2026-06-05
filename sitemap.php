<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

use Website\Support\ApiClient;

header('Content-Type: application/xml; charset=UTF-8');

$base = 'https://asy-syifaa.com';
$urls = [];

// Halaman statis penting
$static = ['/', '/galeri', '/mahad', '/profil-pondok-pesantren', '/visi-dan-misi',
    '/struktur-organisasi', '/fasilitas-pesantren', '/profil-abuya', '/profil-guru',
    '/info-artikel', '/info-pengumuman', '/info-prestasi', '/daftar-sekarang'];
foreach ($static as $p) {
    $urls[] = [$base . $p, '0.7'];
}

// Galeri (dari CMS)
$g = ApiClient::fetchJson('/api/public/content/gallery', ['limit' => 200]);
foreach (($g['data'] ?? []) as $row) {
    if (!empty($row['slug'])) {
        $urls[] = [$base . '/galeri/' . rawurlencode((string) $row['slug']), '0.6'];
    }
}

// Artikel (dari CMS) — hanya bila tampil (API sudah filter publish & jadwal)
$a = ApiClient::fetchJson('/api/v1/posts', ['limit' => 50]);
foreach (($a['data'] ?? []) as $row) {
    if (!empty($row['slug'])) {
        $urls[] = [$base . '/info-artikel?slug=' . rawurlencode((string) $row['slug']), '0.6'];
    }
}

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($urls as [$loc, $pri]) {
    echo '  <url><loc>' . htmlspecialchars($loc, ENT_XML1) . '</loc><priority>' . $pri . '</priority></url>' . "\n";
}
echo '</urlset>';

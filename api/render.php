<?php
/**
 * Vercel Serverless PHP Router
 * All page PHP files are in api/pages/ to avoid includeFiles bloat.
 */

$page = $_GET['page'] ?? 'index';
$page = preg_replace('/[^a-zA-Z0-9_\-]/', '', $page);

$filePath = __DIR__ . '/pages/' . $page . '.php';

if ($page && file_exists($filePath)) {
    // Set working directory to pages dir so relative includes work
    chdir(__DIR__ . '/pages');

    // Pass query params through
    ob_start();
    include $filePath;
    $output = ob_get_clean();

    header('Content-Type: text/html; charset=UTF-8');
    echo $output;
} else {
    http_response_code(404);
    header('Content-Type: text/html; charset=UTF-8');
    echo '<h1>404 - Halaman tidak ditemukan</h1>';
    echo '<p><a href="/">Kembali ke beranda</a></p>';
}

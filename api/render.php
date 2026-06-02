<?php
/**
 * Vercel Serverless PHP Router
 * Catches all page requests and includes the correct PHP file from root.
 */

// Get the requested page from query string
$page = $_GET['page'] ?? 'index';

// Sanitize: only allow alphanumeric, dash, underscore
$page = preg_replace('/[^a-zA-Z0-9_\-]/', '', $page);

// Build path to the PHP file (one level up from api/)
$filePath = __DIR__ . '/../' . $page . '.php';

if ($page && file_exists($filePath)) {
    // Set working directory to project root so includes work
    chdir(__DIR__ . '/../');

    // Start output buffering
    ob_start();
    include $filePath;
    $output = ob_get_clean();

    // Output with proper headers
    header('Content-Type: text/html; charset=UTF-8');
    echo $output;
} else {
    http_response_code(404);
    header('Content-Type: text/html; charset=UTF-8');
    echo '<h1>404 - Halaman tidak ditemukan</h1>';
    echo '<p><a href="/">Kembali ke beranda</a></p>';
}

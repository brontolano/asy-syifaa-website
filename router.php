<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

use Website\Http\RouteResolver;

$requestPath = rawurldecode(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/');
$target = __DIR__ . str_replace('/', DIRECTORY_SEPARATOR, $requestPath);

// Sitemap dinamis (galeri+artikel dari CMS).
if ($requestPath === '/sitemap.xml') {
    require __DIR__ . '/sitemap.php';
    exit;
}

if ($requestPath !== '/' && is_file($target)) {
    return false;
}

$resolver = new RouteResolver(__DIR__);
$resolvedPath = $resolver->resolve($_SERVER['REQUEST_URI'] ?? '/');

if ($resolvedPath !== '') {
    require $resolvedPath;
    exit;
}

http_response_code(404);
echo 'Not Found';

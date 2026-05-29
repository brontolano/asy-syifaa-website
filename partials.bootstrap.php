<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

use Website\Support\Path;

$currentPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$currentPath = Path::normalize($currentPath);
$isLoggedIn = !empty($_SESSION['user']);
$displayName = $isLoggedIn ? ($_SESSION['user']['name'] ?? 'Pengguna') : '';
$role = $isLoggedIn ? strtolower((string)($_SESSION['user']['role'] ?? '')) : '';
$dashboardUrl = '/login';
if ($role === 'staff' || $role === 'superadmin' || $role === 'admin') {
    $dashboardUrl = '/login';
}

function nav_active(string $route, string $currentPath): string {
    $route = Path::normalize($route);
    if ($route === '/') {
        return $currentPath === '/' || $currentPath === '/index.php' ? ' active' : '';
    }
    return ($currentPath === $route) ? ' active' : '';
}
?>

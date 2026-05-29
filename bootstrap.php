<?php
declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE && !headers_sent()) {
    $sessionPathCandidates = [
        __DIR__ . DIRECTORY_SEPARATOR . 'storage' . DIRECTORY_SEPARATOR . 'sessions',
        'C:\\tmp\\asy-syifaa-sessions',
    ];

    foreach ($sessionPathCandidates as $candidate) {
        if (!is_dir($candidate)) {
            @mkdir($candidate, 0777, true);
        }

        if (is_dir($candidate) && is_writable($candidate)) {
            session_save_path($candidate);
            break;
        }
    }

    session_start();
}

spl_autoload_register(static function (string $class): void {
    $prefix = 'Website\\';
    if (!str_starts_with($class, $prefix)) {
        return;
    }

    $relativeClass = substr($class, strlen($prefix));
    $relativePath = str_replace('\\', DIRECTORY_SEPARATOR, $relativeClass) . '.php';
    $file = __DIR__ . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR . $relativePath;

    if (is_file($file)) {
        require_once $file;
    }
});

<?php
declare(strict_types=1);

// Minimal .env loader (tanpa dependency eksternal).
$envPath = __DIR__ . DIRECTORY_SEPARATOR . '.env';
if (is_file($envPath) && is_readable($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (is_array($lines)) {
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#')) {
                continue;
            }
            $pair = explode('=', $line, 2);
            if (count($pair) !== 2) {
                continue;
            }
            $key = trim($pair[0]);
            $value = trim($pair[1]);
            $value = trim($value, "\"'");
            if ($key !== '' && getenv($key) === false) {
                putenv($key . '=' . $value);
                $_ENV[$key] = $value;
                $_SERVER[$key] = $value;
            }
        }
    }
}

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

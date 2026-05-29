<?php
declare(strict_types=1);

namespace Website\Support;

final class Path
{
    public static function normalize(string $path): string
    {
        $normalized = strtolower(trim($path));
        if ($normalized === '') {
            return '/';
        }

        if ($normalized !== '/' && str_ends_with($normalized, '/')) {
            $normalized = rtrim($normalized, '/');
        }

        return $normalized;
    }
}

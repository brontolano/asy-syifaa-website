<?php
declare(strict_types=1);

namespace Website\Http;

final class RouteResolver
{
    private string $basePath;

    public function __construct(string $basePath)
    {
        $this->basePath = rtrim($basePath, '/\\');
    }

    public function resolve(string $requestUri): string
    {
        $uri = parse_url($requestUri, PHP_URL_PATH);
        $uri = rawurldecode(is_string($uri) ? $uri : '/');
        if ($uri === '') {
            $uri = '/';
        }

        $normalizedUri = strtolower($uri);
        if ($normalizedUri === '/galeri' || $normalizedUri === '/galeri/') {
            return $this->basePath . '/galeri.php';
        }

        if (str_starts_with($normalizedUri, '/galeri/')) {
            $slug = $this->normalizeSlug(substr($uri, strlen('/galeri/')));
            if ($slug === '') {
                return $this->basePath . '/galeri.php';
            }

            $_GET['slug'] = $slug;

            return $this->basePath . '/galeri-detail.php';
        }

        if (preg_match('#^/galeri-[^/]+(?:\.html)?/?$#i', $uri) === 1) {
            $legacySlug = ltrim($uri, '/');
            $legacySlug = preg_replace('/\.html$/i', '', $legacySlug) ?? $legacySlug;
            $legacySlug = $this->normalizeSlug($legacySlug);

            if ($legacySlug !== '' && $legacySlug !== 'galeri-detail') {
                $_GET['slug'] = $legacySlug;

                return $this->basePath . '/galeri-detail.php';
            }
        }

        $path = $this->basePath . $uri;

        if ($uri !== '/' && is_file($path)) {
            return $path;
        }

        if ($uri !== '/' && is_dir($path)) {
            $indexPhp = rtrim($path, '/\\') . DIRECTORY_SEPARATOR . 'index.php';
            if (is_file($indexPhp)) {
                return $indexPhp;
            }

            $indexHtml = rtrim($path, '/\\') . DIRECTORY_SEPARATOR . 'index.html';
            if (is_file($indexHtml)) {
                return $indexHtml;
            }
        }

        if ($uri === '/' || $uri === '') {
            return $this->basePath . '/index.php';
        }

        if (str_ends_with(strtolower($uri), '.html')) {
            $legacyPhp = $this->basePath . preg_replace('/\.html$/i', '.php', $uri);
            if (is_file($legacyPhp)) {
                return $legacyPhp;
            }
        }

        $candidate = $this->basePath . rtrim($uri, '/') . '.php';
        if (is_file($candidate)) {
            return $candidate;
        }

        return '';
    }

    private function normalizeSlug(string $slug): string
    {
        $normalized = strtolower(trim($slug));
        $normalized = trim($normalized, '/');
        $normalized = preg_replace('/\.html$/i', '', $normalized) ?? $normalized;
        $normalized = str_replace([' ', '_'], '-', $normalized);
        $normalized = preg_replace('/-+/', '-', $normalized) ?? $normalized;

        if ($normalized !== '' && !str_starts_with($normalized, 'galeri-')) {
            $normalized = 'galeri-' . $normalized;
        }

        $aliasMap = [
            'galeri-malam-nishfu-sya-ban' => 'galeri-malam-nishfu-syaban',
            'galeri-dauroh-ilmiyyah-qiro-ah' => 'galeri-dauroh-ilmiyyah-qiroah',
        ];

        return $aliasMap[$normalized] ?? $normalized;
    }
}

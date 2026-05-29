<?php
declare(strict_types=1);

namespace Website\Support;

final class ApiClient
{
    private const DEFAULT_BASE_URL = 'https://api.asy-syifaa.com';
    private const DEFAULT_TIMEOUT_SECONDS = 8;

    public static function fetchJson(string $path, array $query = []): array
    {
        $url = self::buildUrl($path, $query);
        if ($url === '') {
            return [];
        }

        $raw = self::request($url);
        if ($raw === '') {
            return [];
        }

        $decoded = json_decode($raw, true);
        if (!is_array($decoded)) {
            return [];
        }

        return $decoded;
    }

    private static function buildUrl(string $path, array $query): string
    {
        $baseUrl = trim((string)(getenv('ASY_SYIFAA_API_BASE_URL') ?: self::DEFAULT_BASE_URL));
        if ($baseUrl === '') {
            return '';
        }

        $url = rtrim($baseUrl, '/') . '/' . ltrim($path, '/');
        if ($query !== []) {
            $url .= '?' . http_build_query($query);
        }

        return $url;
    }

    private static function request(string $url): string
    {
        if (function_exists('curl_init')) {
            $ch = curl_init($url);
            if ($ch === false) {
                return '';
            }

            curl_setopt_array($ch, [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT => self::DEFAULT_TIMEOUT_SECONDS,
                CURLOPT_CONNECTTIMEOUT => 4,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTPHEADER => ['Accept: application/json'],
            ]);

            $body = curl_exec($ch);
            $statusCode = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
            curl_close($ch);

            if ($body === false || $statusCode < 200 || $statusCode >= 300) {
                return '';
            }

            return is_string($body) ? $body : '';
        }

        $context = stream_context_create([
            'http' => [
                'method' => 'GET',
                'timeout' => self::DEFAULT_TIMEOUT_SECONDS,
                'header' => "Accept: application/json\r\n",
                'ignore_errors' => true,
            ],
        ]);

        $body = @file_get_contents($url, false, $context);
        if (!is_string($body) || $body === '') {
            return '';
        }

        $statusCode = 0;
        if (isset($http_response_header) && is_array($http_response_header) && isset($http_response_header[0])) {
            if (preg_match('/\s(\d{3})\s/', (string)$http_response_header[0], $matches) === 1) {
                $statusCode = (int)$matches[1];
            }
        }

        if ($statusCode < 200 || $statusCode >= 300) {
            return '';
        }

        return $body;
    }
}

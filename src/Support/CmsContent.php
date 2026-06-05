<?php
declare(strict_types=1);

namespace Website\Support;

/**
 * Akses konten editable dari CMS (Pengaturan & Profil Website) untuk situs custom.
 * Di-cache 5 menit ke temp agar tidak memanggil API tiap halaman.
 * Selalu sediakan fallback statis → bila CMS kosong/down, situs tetap normal.
 */
final class CmsContent
{
    private const TTL = 300;

    private static ?array $settings = null;

    private static function settings(): array
    {
        if (self::$settings !== null) {
            return self::$settings;
        }
        $cache = sys_get_temp_dir() . '/asf_cms_settings.json';
        if (is_file($cache) && (time() - (int) filemtime($cache)) < self::TTL) {
            $cached = json_decode((string) file_get_contents($cache), true);
            return self::$settings = is_array($cached) ? $cached : [];
        }
        $res = ApiClient::fetchJson('/api/public/content/settings');
        $data = (isset($res['data']) && is_array($res['data'])) ? $res['data'] : [];
        @file_put_contents($cache, json_encode($data));

        return self::$settings = $data;
    }

    /** Nilai kontak (address|phone|email) dari CMS, atau fallback. */
    public static function contact(string $key, string $fallback = ''): string
    {
        $c = self::settings()['contact'] ?? [];
        $v = is_array($c) ? ($c[$key] ?? '') : '';

        return ($v !== '' && $v !== null) ? (string) $v : $fallback;
    }

    /** Nilai branding (name|tagline|logoUrl) dari CMS, atau fallback. */
    public static function branding(string $key, string $fallback = ''): string
    {
        $b = self::settings()['branding'] ?? [];
        $v = is_array($b) ? ($b[$key] ?? '') : '';

        return ($v !== '' && $v !== null) ? (string) $v : $fallback;
    }
}

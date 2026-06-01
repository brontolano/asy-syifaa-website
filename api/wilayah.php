<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=3600');

$level = strtolower(trim((string)($_GET['level'] ?? '')));
$parent = trim((string)($_GET['parent'] ?? ''));

if (!in_array($level, ['provinces', 'regencies', 'districts', 'villages'], true)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'level tidak valid']);
    exit;
}

if ($level !== 'provinces' && $parent === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'parent wajib diisi']);
    exit;
}

if ($level === 'provinces') {
    $remoteUrl = 'https://wilayah.id/api/provinces.json';
} else {
    $segmentMap = [
        'regencies' => 'regencies',
        'districts' => 'districts',
        'villages' => 'villages',
    ];
    $remoteUrl = sprintf(
        'https://wilayah.id/api/%s/%s.json',
        $segmentMap[$level],
        rawurlencode($parent)
    );
}

$context = stream_context_create([
    'http' => [
        'method' => 'GET',
        'timeout' => 15,
        'ignore_errors' => true,
        'header' => "Accept: application/json\r\nUser-Agent: AsySyifaa-Wilayah-Proxy/1.0\r\n",
    ],
]);

$raw = @file_get_contents($remoteUrl, false, $context);
if ($raw === false || trim($raw) === '') {
    http_response_code(502);
    echo json_encode(['ok' => false, 'message' => 'gagal mengambil data wilayah']);
    exit;
}

$decoded = json_decode($raw, true);
if (!is_array($decoded)) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'message' => 'format data wilayah tidak valid']);
    exit;
}

$items = array_is_list($decoded) ? $decoded : (is_array($decoded['data'] ?? null) ? $decoded['data'] : []);
$normalized = [];
foreach ($items as $item) {
    if (!is_array($item)) {
        continue;
    }
    $code = (string)($item['code'] ?? $item['id'] ?? $item['kode'] ?? '');
    $name = (string)($item['name'] ?? $item['nama'] ?? $item['label'] ?? '');
    if ($code === '' || $name === '') {
        continue;
    }
    $normalized[] = [
        'code' => preg_replace('/\.0+$/', '', $code) ?? $code,
        'name' => $name,
        'postal_code' => (string)($item['postal_code'] ?? $item['kodepos'] ?? $item['zip'] ?? ''),
    ];
}

echo json_encode([
    'ok' => true,
    'source' => 'wilayah.id',
    'level' => $level,
    'parent' => $parent,
    'count' => count($normalized),
    'data' => $normalized,
], JSON_UNESCAPED_UNICODE);


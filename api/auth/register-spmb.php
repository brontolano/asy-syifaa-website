<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
if ($raw === false || trim($raw) === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Payload kosong']);
    exit;
}

$apiBase = getenv('ASF_API_BASE_URL');
if (!$apiBase) {
    $apiBase = 'https://erp.asy-syifaa.com';
}
$target = rtrim($apiBase, '/') . '/api/v1/spmb/register';

$context = stream_context_create([
    'http' => [
        'method' => 'POST',
        'timeout' => 25,
        'ignore_errors' => true,
        'header' => "Content-Type: application/json\r\nAccept: application/json\r\n",
        'content' => $raw,
    ],
]);

$resp = @file_get_contents($target, false, $context);
if ($resp === false) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'message' => 'Gagal menghubungi server pendaftaran']);
    exit;
}

$statusCode = 200;
if (isset($http_response_header) && is_array($http_response_header)) {
    foreach ($http_response_header as $headerLine) {
        if (preg_match('#^HTTP/\S+\s+(\d{3})#', $headerLine, $m) === 1) {
            $statusCode = (int)$m[1];
            break;
        }
    }
}
http_response_code($statusCode);
echo $resp;


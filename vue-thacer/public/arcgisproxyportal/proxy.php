<?php
// Simple ArcGIS proxy for production environments with logging.
// Place this file under /arcgisproxyportal/proxy.php on your webroot.
// Usage (client): /arcgisproxyportal/proxy.php?u=https://.../MapServer/0/query?f=geojson&...

// Allowed remote hosts - restrict to your ArcGIS hosts for security.
$allowedHosts = [
    'ops.arxaiologikoktimatologio.gov.gr'
];

$logFile = __DIR__ . '/proxy.log';
function logmsg($msg) {
    global $logFile;
    $line = sprintf("[%s] %s\n", date('c'), $msg);
    @file_put_contents($logFile, $line, FILE_APPEND | LOCK_EX);
}

function bad($code = 400, $msg = '') {
    http_response_code($code);
    if ($msg) echo $msg;
    logmsg("Response $code: $msg");
    exit;
}

try {
    // Get 'u' parameter and decode it safely
    $target = null;
    if (isset($_GET['u']) && $_GET['u'] !== '') {
        $target = $_GET['u'];
    } else {
        $qs = $_SERVER['QUERY_STRING'] ?? '';
        if (preg_match('#^https?://#i', $qs)) {
            $target = $qs;
        }
    }

    if (!$target) {
        bad(400, 'Missing target (use ?u=https://...)');
    }

    // Decode URL if it was encoded by client
    $target = urldecode($target);
    logmsg('Requested target: ' . $target);

    $parsed = parse_url($target);
    if (!$parsed || empty($parsed['host']) || !in_array($parsed['host'], $allowedHosts, true)) {
        bad(403, 'Target host not allowed: ' . ($parsed['host'] ?? ''));
    }

    // Prepare curl
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $target);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_USERAGENT, 'thacer-proxy/1.0');

    $response = curl_exec($ch);
    if ($response === false) {
        $err = curl_error($ch);
        $errno = curl_errno($ch);
        logmsg("cURL error ($errno): $err");
        bad(502, 'Upstream request failed');
    }

    $info = curl_getinfo($ch);
    $status = $info['http_code'] ?? 502;
    $headerSize = $info['header_size'] ?? 0;
    $respHeadersRaw = substr($response, 0, $headerSize);
    $respBody = substr($response, $headerSize);

    logmsg("Upstream returned status $status, body length=" . strlen($respBody));

    // Relay status code and a minimal set of headers
    http_response_code($status);
    foreach (explode("\r\n", $respHeadersRaw) as $hdr) {
        if (stripos($hdr, 'Content-Type:') === 0 || stripos($hdr, 'Cache-Control:') === 0 || stripos($hdr, 'Expires:') === 0) {
            header($hdr);
        }
    }

    echo $respBody;

    curl_close($ch);
} catch (Exception $e) {
    logmsg('Exception: ' . $e->getMessage());
    bad(500, 'Internal proxy error');
}

?>

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const base = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
const target = `${base}/sitemap/`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Page not found — Semper In Motu</title>
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${target}">
<link rel="canonical" href="https://semperinmotu.com/sitemap/">
<script>location.replace(${JSON.stringify(target)});</script>
</head>
<body>
<p><a href="${target}">Sitemap</a></p>
</body>
</html>
`;

writeFileSync(resolve(root, 'out', '404.html'), html);
console.log(`404.html → ${target}`);

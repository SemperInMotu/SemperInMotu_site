import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const HOST = 'https://semperinmotu.com';

/* Canonical pages only. Redirects (/en, /ops, /be, /products/alfakit) stay out:
   Google lists the URL it should show, not aliases. */
const nav = readFileSync(resolve(root, 'lib/sitemap-nav.ts'), 'utf8');
const journal = readFileSync(resolve(root, 'lib/journal.ts'), 'utf8');
const pages = [
  ...new Set([
    ...[...nav.matchAll(/path: '([^']+)'/g)].map((m) => m[1]),
    ...[...journal.matchAll(/href: '([^']+)'/g)].map((m) => m[1]),
  ]),
];

const locales = ['en', 'ru'];

function xml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function loc(lang, page) {
  const path = page === '/' ? '/' : `${page}/`;
  return lang === 'en' ? `${HOST}${path}` : `${HOST}/ru${path}`;
}

function sourceFile(page) {
  if (page.startsWith('/journal/') && page !== '/journal') return 'lib/journal.ts';
  if (page.startsWith('/products/demos/') && page !== '/products/demos') {
    return 'app/[locale]/products/demos/[demo]/page.tsx';
  }
  if (page.startsWith('/methods/') && page !== '/methods') {
    return 'app/[locale]/methods/[slug]/page.tsx';
  }
  if (page === '/') return 'app/[locale]/page.tsx';
  return `app/[locale]${page}/page.tsx`;
}

const lastmodCache = new Map();
function lastmod(page) {
  const file = sourceFile(page);
  if (!lastmodCache.has(file)) {
    const date = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], {
      cwd: root,
      encoding: 'utf8',
    }).trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error(`no lastmod for ${file}`);
    }
    lastmodCache.set(file, date);
  }
  return lastmodCache.get(file);
}

const entries = locales.flatMap((lang) =>
  pages.map((page) => {
    const url = loc(lang, page);
    return [
      '  <url>',
      `    <loc>${xml(url)}</loc>`,
      `    <lastmod>${lastmod(page)}</lastmod>`,
      ...locales.map(
        (alt) =>
          `    <xhtml:link rel="alternate" hreflang="${alt}" href="${xml(loc(alt, page))}" />`,
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${xml(loc('en', page))}" />`,
      '  </url>',
    ].join('\n');
  }),
);

writeFileSync(
  resolve(root, 'public/sitemap.xml'),
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n'),
  'utf8',
);
console.log(`sitemap.xml — ${entries.length} urls`);

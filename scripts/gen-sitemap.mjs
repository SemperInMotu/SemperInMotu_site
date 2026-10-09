import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const HOST = 'https://semperinmotu.com';

const nav = readFileSync(resolve(root, 'lib/sitemap-nav.ts'), 'utf8');
const journal = readFileSync(resolve(root, 'lib/journal.ts'), 'utf8');
const pages = [
  ...new Set([
    ...[...nav.matchAll(/path: '([^']+)'/g)].map((m) => m[1]),
    ...[...journal.matchAll(/href: '([^']+)'/g)].map((m) => m[1]),
  ]),
];

const locales = ['en', 'ru'];

function loc(lang, page) {
  const path = page === '/' ? '/' : `${page}/`;
  return lang === 'en' ? `${HOST}${path}` : `${HOST}/ru${path}`;
}

const entries = locales.flatMap((lang) =>
  pages.map((page) =>
    [
      '  <url>',
      `    <loc>${loc(lang, page)}</loc>`,
      ...locales.map(
        (alt) => `    <xhtml:link rel="alternate" hreflang="${alt}" href="${loc(alt, page)}" />`,
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc('en', page)}" />`,
      '    <changefreq>monthly</changefreq>',
      `    <priority>${page === '/' ? '1.0' : '0.7'}</priority>`,
      '  </url>',
    ].join('\n'),
  ),
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

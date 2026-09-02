import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const demos = [
  { id: 'index', path: '', title: { en: 'Industry data demos', ru: 'Отраслевые витрины', be: 'Галіновыя вітрыны' }, desc: { en: 'Synthetic BI demos for logistics, retail, manufacturing and e-commerce. Semper In Motu.', ru: 'Синтетические BI-демо: логистика, ритейл, производство, e-commerce. Semper In Motu.', be: 'Сінтэтычныя BI-дэма: лагістыка, рытэйл, вытворчасць, e-commerce. Semper In Motu.' } },
  { id: 'logistics', path: 'logistics/', title: { en: 'Logistics control tower', ru: 'Control tower логистики', be: 'Control tower лагістыкі' }, desc: { en: 'Synthetic CEE haul OTIF dashboard. Semper In Motu Data demo.', ru: 'Синтетическая витрина OTIF по плечам CEE. Демо Semper In Motu.', be: 'Сінтэтычная вітрына OTIF па плячах CEE. Дэма Semper In Motu.' } },
  { id: 'retail', path: 'retail/', title: { en: 'Retail store ops', ru: 'Retail store ops', be: 'Retail store ops' }, desc: { en: 'Synthetic CEE retail dashboard: sales, space, new stores.', ru: 'Синтетическая витрина ритейла CEE: продажи, площадь, новые точки.', be: 'Сінтэтычная вітрына рытэйлу CEE: продажы, плошча, новыя кропкі.' } },
  { id: 'manufacturing', path: 'manufacturing/', title: { en: 'Plant OEE', ru: 'OEE завода', be: 'OEE завода' }, desc: { en: 'Synthetic plant OEE dashboard. Defect count is not downtime.', ru: 'Синтетическая витрина OEE. Количество дефектов ≠ простой.', be: 'Сінтэтычная вітрына OEE. Колькасць дэфектаў ≠ простой.' } },
  { id: 'ecommerce', path: 'ecommerce/', title: { en: 'E-commerce fulfillment', ru: 'E-commerce fulfillment', be: 'E-commerce fulfillment' }, desc: { en: 'Synthetic e-commerce fulfillment dashboard: GMV, refunds, pick SLA.', ru: 'Синтетическая витрина e-com: GMV, refund, pick SLA.', be: 'Сінтэтычная вітрына e-com: GMV, refund, pick SLA.' } },
];

const locales = [
  { code: 'en', dir: '', prefix: '' },
  { code: 'ru', dir: 'ru/', prefix: '/ru' },
  { code: 'be', dir: 'be/', prefix: '/be' },
];

function pageHtml(demo, loc) {
  const path = `/ops/demos/${demo.path}`;
  const canonical = `https://semperinmotu.com${loc.prefix}${path}`;
  const title = `${demo.title[loc.code]} — Semper In Motu`;
  const desc = demo.desc[loc.code];
  return `<!doctype html>
<html lang="${loc.code}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="en" href="https://semperinmotu.com${path}" />
  <link rel="alternate" hreflang="ru" href="https://semperinmotu.com/ru${path}" />
  <link rel="alternate" hreflang="be" href="https://semperinmotu.com/be${path}" />
  <link rel="alternate" hreflang="x-default" href="https://semperinmotu.com${path}" />
  <link rel="stylesheet" href="/src/styles/main.css" />
  <link rel="stylesheet" href="/src/styles/demos.css" />
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
  <meta name="robots" content="index,follow" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="https://semperinmotu.com/assets/og-default.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${desc}" />
  <meta name="twitter:image" content="https://semperinmotu.com/assets/og-default.jpg" />
</head>
<body class="demo-page">
  <header class="site-header" data-site-header></header>
  <main data-demo-root></main>
  <footer class="site-footer" data-site-footer></footer>
  <script type="module">
    import { mountChrome } from '/src/site.js';
    import { mountDemo } from '/src/demos/app.js';
    mountChrome({ current: 'ops' });
    mountDemo('${demo.id}');
  </script>
</body>
</html>
`;
}

function redirectHtml(demo) {
  const to = `/ops/demos/${demo.path}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Redirecting</title>
  <link rel="canonical" href="https://semperinmotu.com${to}" />
  <meta name="robots" content="noindex,follow" />
  <meta http-equiv="refresh" content="0; url=${to}" />
  <script>location.replace('${to}' + location.hash);</script>
</head>
<body>
  <p>English is the default language. <a href="${to}">Continue</a>.</p>
</body>
</html>
`;
}

for (const loc of locales) {
  for (const demo of demos) {
    const file = join(root, loc.dir, 'ops', 'demos', demo.path, 'index.html');
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, pageHtml(demo, loc));
  }
}

for (const demo of demos) {
  const file = join(root, 'en', 'ops', 'demos', demo.path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, redirectHtml(demo));
}

console.log('wrote demo html');

export type SiteLink = { path: string; en: string; ru: string };
export type SiteGroup = { id: string; en: string; ru: string; links: SiteLink[] };

export const demoIds = ['logistics', 'retail', 'manufacturing', 'ecommerce'] as const;
export const methodIds = ['kpi-poc', 'shadow-mode', 'audit-lane', 'express-audit'] as const;

export const sitemapGroups: SiteGroup[] = [
  {
    id: 'start',
    en: 'Start',
    ru: 'Старт',
    links: [
      { path: '/', en: 'Home', ru: 'Главная' },
      { path: '/start', en: 'What brought you here?', ru: 'С какой задачей вы пришли?' },
    ],
  },
  {
    id: 'capabilities',
    en: 'Capabilities',
    ru: 'Практики',
    links: [
      { path: '/capabilities', en: 'Capabilities', ru: 'Практики' },
      { path: '/capabilities/analytics', en: 'Data Analytics & AI', ru: 'Аналитика данных и ИИ' },
      { path: '/capabilities/engineering', en: 'AI Engineering', ru: 'Разработка ИИ' },
    ],
  },
  {
    id: 'solutions',
    en: 'Solutions',
    ru: 'Решения',
    links: [
      { path: '/solutions', en: 'Solutions', ru: 'Решения' },
      { path: '/solutions/logistics', en: 'Logistics', ru: 'Логистика' },
      { path: '/solutions/operations', en: 'Operations', ru: 'Операции' },
      { path: '/solutions/sales-ops', en: 'Sales ops', ru: 'Продажи' },
    ],
  },
  {
    id: 'products',
    en: 'Products',
    ru: 'Продукты',
    links: [
      { path: '/products', en: 'Products', ru: 'Продукты' },
      { path: '/products/data', en: 'Data / DWH', ru: 'Данные и хранилища' },
      { path: '/products/smart', en: 'ALFAKIT SMART', ru: 'ALFAKIT SMART' },
      { path: '/products/poc', en: 'KPI POC', ru: 'KPI-пилот' },
      { path: '/products/demos', en: 'Industry demos', ru: 'Отраслевые демо' },
      { path: '/products/demos/logistics', en: 'Logistics demo', ru: 'Демо: логистика' },
      { path: '/products/demos/retail', en: 'Retail demo', ru: 'Демо: розница' },
      { path: '/products/demos/manufacturing', en: 'Manufacturing demo', ru: 'Демо: производство' },
      { path: '/products/demos/ecommerce', en: 'E-commerce demo', ru: 'Демо: интернет-торговля' },
    ],
  },
  {
    id: 'methods',
    en: 'Methods',
    ru: 'Методы',
    links: [
      { path: '/methods', en: 'Methods', ru: 'Методы' },
      { path: '/methods/kpi-poc', en: 'KPI-based POC', ru: 'KPI-пилот' },
      { path: '/methods/shadow-mode', en: 'Shadow mode', ru: 'Режим черновика' },
      { path: '/methods/audit-lane', en: 'Audit lane', ru: 'Журнал действий' },
      { path: '/methods/express-audit', en: 'Express audit', ru: 'Экспресс-аудит' },
    ],
  },
  {
    id: 'studio',
    en: 'Studio',
    ru: 'Студия',
    links: [
      { path: '/work', en: 'Work', ru: 'Кейсы' },
      { path: '/journal', en: 'Journal', ru: 'Журнал' },
      { path: '/engage', en: 'How to buy', ru: 'Как купить' },
      { path: '/about', en: 'About', ru: 'О студии' },
      { path: '/contact', en: 'Contact', ru: 'Контакты' },
      { path: '/sitemap', en: 'Sitemap', ru: 'Карта сайта' },
    ],
  },
];

/** Old URLs that only redirect. Not listed on the HTML sitemap. */
export const redirectPaths = [
  '/products/alfakit',
  '/ops',
  '/ops/alfakit',
  '/ops/data',
  '/ops/smart',
  '/ops/poc',
  '/ops/demos',
  ...demoIds.map((id) => `/ops/demos/${id}`),
];

export const contentPaths = sitemapGroups.flatMap((group) => group.links.map((link) => link.path));

export const enAliasPaths = [...new Set([...contentPaths, ...redirectPaths])];

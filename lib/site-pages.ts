import { journalPosts } from '@/lib/journal';

export type SitePageLink = {
  path: string;
  en: string;
  ru: string;
};

export type SitePageGroup = {
  en: string;
  ru: string;
  items: SitePageLink[];
};

const groups: SitePageGroup[] = [
  {
    en: 'Home',
    ru: 'Главная',
    items: [{ path: '/', en: 'Home', ru: 'Главная' }],
  },
  {
    en: 'Start',
    ru: 'Старт',
    items: [{ path: '/start', en: 'What brought you here', ru: 'С какой задачей вы пришли' }],
  },
  {
    en: 'Capabilities',
    ru: 'Практики',
    items: [
      { path: '/capabilities', en: 'Capabilities', ru: 'Практики' },
      { path: '/capabilities/analytics', en: 'Data Analytics & AI', ru: 'Аналитика данных и ИИ' },
      { path: '/capabilities/engineering', en: 'AI Engineering', ru: 'Разработка ИИ' },
    ],
  },
  {
    en: 'Solutions',
    ru: 'Решения',
    items: [
      { path: '/solutions', en: 'Solutions', ru: 'Решения' },
      { path: '/solutions/logistics', en: 'Logistics', ru: 'Логистика' },
      { path: '/solutions/sales-ops', en: 'Sales ops', ru: 'Продажи' },
      { path: '/solutions/operations', en: 'Operations', ru: 'Операции' },
    ],
  },
  {
    en: 'Products',
    ru: 'Продукты',
    items: [
      { path: '/products', en: 'Products', ru: 'Продукты' },
      { path: '/products/data', en: 'Data · DWH · ETL', ru: 'Данные и хранилища' },
      { path: '/products/smart', en: 'ALFAKIT SMART', ru: 'ALFAKIT SMART' },
      { path: '/products/poc', en: 'KPI-based POC', ru: 'KPI-пилот' },
      { path: '/products/demos', en: 'Industry demos', ru: 'Витрины' },
      { path: '/products/demos/logistics', en: 'Logistics demo', ru: 'Витрина: логистика' },
      { path: '/products/demos/retail', en: 'Retail demo', ru: 'Витрина: розница' },
      { path: '/products/demos/manufacturing', en: 'Manufacturing demo', ru: 'Витрина: производство' },
      { path: '/products/demos/ecommerce', en: 'E-commerce demo', ru: 'Витрина: торговля' },
    ],
  },
  {
    en: 'Methods',
    ru: 'Методы',
    items: [
      { path: '/methods', en: 'Methods', ru: 'Методы' },
      { path: '/methods/kpi-poc', en: 'KPI POC', ru: 'KPI-пилот' },
      { path: '/methods/shadow-mode', en: 'Shadow mode', ru: 'Режим черновика' },
      { path: '/methods/audit-lane', en: 'Audit lane', ru: 'Журнал действий' },
      { path: '/methods/express-audit', en: 'Express audit', ru: 'Экспресс-аудит' },
    ],
  },
  {
    en: 'Engage',
    ru: 'Как купить',
    items: [{ path: '/engage', en: 'How to buy', ru: 'Как купить' }],
  },
  {
    en: 'Work',
    ru: 'Кейсы',
    items: [{ path: '/work', en: 'Work', ru: 'Кейсы' }],
  },
  {
    en: 'Journal',
    ru: 'Журнал',
    items: [
      { path: '/journal', en: 'Journal', ru: 'Журнал' },
      ...journalPosts.map((post) => ({
        path: post.href,
        en: post.en.title,
        ru: post.ru.title,
      })),
    ],
  },
  {
    en: 'About',
    ru: 'О студии',
    items: [{ path: '/about', en: 'About', ru: 'О студии' }],
  },
  {
    en: 'Contact',
    ru: 'Контакты',
    items: [{ path: '/contact', en: 'Contact', ru: 'Контакты' }],
  },
  {
    en: 'Sitemap',
    ru: 'Карта сайта',
    items: [{ path: '/sitemap', en: 'Sitemap', ru: 'Карта сайта' }],
  },
];

export function sitemapGroups(): SitePageGroup[] {
  return groups;
}

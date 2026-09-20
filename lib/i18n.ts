export const locales = ['en', 'ru'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localePrefix(locale: Locale): string {
  return `/${locale}`;
}

export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const withSlash = normalized.endsWith('/') ? normalized : `${normalized}/`;
  return `${localePrefix(locale)}${withSlash === '//' ? '/' : withSlash}`;
}

export function siteUrl(locale: Locale, path: string = '/'): string {
  return `https://semperinmotu.com${localePath(locale, path)}`;
}

export function alfakitUrl(locale: Locale): string {
  if (locale === 'ru') return 'https://alfakit.by/ru/';
  return 'https://alfakit.by/';
}

export function personalUrl(locale: Locale): string {
  if (locale === 'ru') return 'https://vitalykhoruzhko.com/ru/';
  return 'https://vitalykhoruzhko.com/';
}

export function stripLocalePath(pathname: string): string {
  const cleaned = pathname.replace(/^\/(en|ru|be)(?=\/|$)/, '');
  return cleaned || '/';
}

export function switchLocalePath(pathname: string, target: Locale): string {
  return localePath(target, stripLocalePath(pathname));
}

export const chrome = {
  en: {
    menu: 'Menu',
    start: 'Start',
    capabilities: 'Capabilities',
    solutions: 'Solutions',
    methods: 'Methods',
    engage: 'Engage',
    work: 'Work',
    journal: 'Journal',
    contact: 'Contact',
    tagline:
      'AI & Data Engineering for Business — analytics, agents, audit, human-in-the-loop.',
    products: 'Products',
    contactCol: 'Contact',
    formLink: 'Contact form',
    about: 'About',
    personal: 'Vitaly Khoruzhko',
    alfakit: 'ALFAKIT Care · alfakit.by',
    data: 'Data / DWH',
    smart: 'ALFAKIT SMART',
    always: 'Always in motion',
    unp: 'UNP 102176582 · Vitali Kharuzhko',
    sent: 'Message sent. We will reply to the address you provided.',
    langHintRu: ['Site available in Russian', 'Switch'],
  },
  ru: {
    menu: 'Меню',
    start: 'Старт',
    capabilities: 'Практики',
    solutions: 'Решения',
    methods: 'Методы',
    engage: 'Как купить',
    work: 'Кейсы',
    journal: 'Журнал',
    contact: 'Контакты',
    tagline:
      'ИИ и данные для бизнеса — аналитика, агенты, аудит действий, человек в контуре решения.',
    products: 'Продукты',
    contactCol: 'Контакты',
    formLink: 'Форма связи',
    about: 'О студии',
    personal: 'Vitaly Khoruzhko',
    alfakit: 'ALFAKIT Care · alfakit.by',
    data: 'Данные и хранилища',
    smart: 'ALFAKIT SMART',
    always: 'Всегда в движении',
    unp: 'УНП 102176582 · Хоружко В.В.',
    sent: 'Заявка отправлена. Ответим на указанный адрес.',
    langHintRu: ['Сайт доступен на русском', 'Перейти'],
  },
} as const;

export function tChrome(locale: Locale) {
  return chrome[locale];
}

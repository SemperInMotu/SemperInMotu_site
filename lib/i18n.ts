export const locales = ['en', 'ru', 'be'] as const;
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
  if (locale === 'be') return 'https://alfakit.by/be/';
  return 'https://alfakit.by/';
}

export function personalUrl(locale: Locale): string {
  if (locale === 'ru') return 'https://vitalykhoruzhko.com/ru/';
  if (locale === 'be') return 'https://vitalykhoruzhko.com/be/';
  return 'https://vitalykhoruzhko.com/';
}

export function stripLocalePath(pathname: string): string {
  const cleaned = pathname.replace(/^\/(ru|be)(?=\/|$)/, '');
  return cleaned || '/';
}

export function switchLocalePath(pathname: string, target: Locale): string {
  const rest = stripLocalePath(pathname);
  if (target === 'en') return rest === '/' ? '/' : rest.endsWith('/') ? rest : `${rest}/`;
  const tail = rest === '/' ? '/' : rest;
  return `/${target}${tail}`;
}

export const chrome = {
  en: {
    menu: 'Menu',
    ops: 'Ops',
    work: 'Work',
    journal: 'Journal',
    contact: 'Contact',
    tagline:
      'Semper In Motu practice: ALFAKIT TMS Care, Data/DWH, SMART and KPI POC.',
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
    langHintBe: ['Site available in Belarusian', 'Switch'],
  },
  ru: {
    menu: 'Меню',
    ops: 'Ops',
    work: 'Кейсы',
    journal: 'Журнал',
    contact: 'Контакты',
    tagline:
      'Практика Semper In Motu: сопровождение ALFAKIT TMS, Data/DWH, SMART и KPI POC.',
    products: 'Продукты',
    contactCol: 'Контакты',
    formLink: 'Форма связи',
    about: 'О студии',
    personal: 'Vitaly Khoruzhko',
    alfakit: 'ALFAKIT Care · alfakit.by',
    data: 'Data / DWH',
    smart: 'ALFAKIT SMART',
    always: 'Always in motion',
    unp: 'УНП 102176582 · Хоружко В.В.',
    sent: 'Заявка отправлена. Ответим на указанный адрес.',
    langHintRu: ['Сайт доступен на русском', 'Перейти'],
    langHintBe: ['Сайт доступен на русском', 'Перейти'],
  },
  be: {
    menu: 'Меню',
    ops: 'Ops',
    work: 'Кейсы',
    journal: 'Часопіс',
    contact: 'Кантакты',
    tagline:
      'Практыка Semper In Motu: суправаджанне ALFAKIT TMS, Data/DWH, SMART і KPI POC.',
    products: 'Прадукты',
    contactCol: 'Кантакты',
    formLink: 'Форма сувязі',
    about: 'Пра студыю',
    personal: 'Vitaly Khoruzhko',
    alfakit: 'ALFAKIT Care · alfakit.by',
    data: 'Data / DWH',
    smart: 'ALFAKIT SMART',
    always: 'Always in motion',
    unp: 'УНП 102176582 · Хоружко В.В.',
    sent: 'Заяўка адпраўлена. Адкажам на пазначаны email.',
    langHintRu: ['Сайт даступны на русском', 'Перайсці'],
    langHintBe: ['Сайт даступны па-беларуску', 'Перайсці'],
  },
} as const;

export function tChrome(locale: Locale) {
  return chrome[locale];
}

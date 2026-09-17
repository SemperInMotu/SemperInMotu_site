import type { Locale } from '@/lib/i18n';

export type L<T> = Record<Locale, T>;

export const homeCopy: L<{
  title: string;
  description: string;
  lead: string;
  support: string;
  ctaStart: string;
  ctaContact: string;
  trust: string;
  viewWork: string;
  allProjects: string;
  problemFirst: string;
}> = {
  en: {
    title: 'Semper In Motu — AI & Data Engineering for Business',
    description:
      'AI & Data Engineering for Business: analytics, agents, BI, audit and human-in-the-loop.',
    lead: 'We turn business knowledge into intelligent systems.',
    support: 'AI Engineering · Data Analytics · Business Intelligence · Automation',
    ctaStart: 'What brought you here →',
    ctaContact: 'Discuss a project',
    trust: '25+ years between software, data and ops · audit & human-in-the-loop · CEE',
    viewWork: 'View work',
    allProjects: 'All projects',
    problemFirst: "Don't start with AI. Start with the problem.",
  },
  ru: {
    title: 'Semper In Motu — AI & Data Engineering for Business',
    description:
      'AI & Data Engineering for Business: аналитика, агенты, BI, audit и human-in-the-loop.',
    lead: 'Превращаем знания бизнеса в работающие системы.',
    support: 'AI Engineering · Data Analytics · Business Intelligence · Automation',
    ctaStart: 'С какой задачей →',
    ctaContact: 'Обсудить проект',
    trust: '25+ лет между software, data и ops · audit & human-in-the-loop · CEE',
    viewWork: 'Смотреть работы',
    allProjects: 'Все проекты',
    problemFirst: 'Не начинаем с AI. Начинаем с проблемы.',
  },
  be: {
    title: 'Semper In Motu — AI & Data Engineering for Business',
    description:
      'AI & Data Engineering for Business: аналітыка, агенты, BI, audit і human-in-the-loop.',
    lead: 'Ператвараем веды бізнесу ў працуючыя сістэмы.',
    support: 'AI Engineering · Data Analytics · Business Intelligence · Automation',
    ctaStart: 'З якой задачай →',
    ctaContact: 'Абмеркаваць праект',
    trust: '25+ гадоў паміж software, data і ops · audit & human-in-the-loop · CEE',
    viewWork: 'Глядзець кейсы',
    allProjects: 'Усе праекты',
    problemFirst: 'Не пачынаем з AI. Пачынаем з праблемы.',
  },
};

export const opsIndexCopy: L<{
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  cta: string;
  howTitle: string;
  cards: { title: string; body: string; more: string; href: string; external?: boolean }[];
  steps: string[];
}> = {
  en: {
    title: 'Logistics AI — Semper In Motu',
    description: 'Logistics: Domino TMS (alfakit.by), Data/DWH, ALFAKIT SMART, KPI POC. Semper In Motu.',
    eyebrow: 'Solutions · Logistics',
    h1: 'Agentic AI for logistics',
    lead: 'We do not replace your TMS. We provide agents with audit trails, approval gates and KPIs defined before launch.',
    cta: 'Book a discovery call',
    howTitle: 'How we work',
    cards: [
      {
        title: 'ALFAKIT Care',
        body: 'Domino TMS support for PROLOG / ALFAKIT: SLA, modules, audit. Full storefront at alfakit.by — Care pages are not duplicated here.',
        more: 'alfakit.by →',
        href: 'https://alfakit.by/',
        external: true,
      },
      {
        title: 'Data / DWH',
        body: 'Lake, warehouse, ETL from any database, self-service BI. A separate discovery → DWH engagement.',
        more: 'Learn more →',
        href: '/products/data',
      },
      {
        title: 'ALFAKIT SMART',
        body: 'Calls → transcript → scoring → extraction into CRM → Telegram Q&A.',
        more: 'Learn more →',
        href: '/products/smart',
      },
      {
        title: 'KPI POC',
        body: 'A pilot on your metrics: minutes, FCR, SLA. No L3 autonomy.',
        more: 'Request a POC →',
        href: '/products/poc',
      },
    ],
    steps: ['Discovery', 'Baseline KPI', 'Signed POC', '2 weeks live', 'Go / No-Go'],
  },
  ru: {
    title: 'Logistics AI — Semper In Motu',
    description: 'Logistics: Domino TMS (alfakit.by), Data/DWH, ALFAKIT SMART, KPI POC. Semper In Motu.',
    eyebrow: 'Solutions · Logistics',
    h1: 'Agentic AI для логистики',
    lead: 'Не заменяем ваш TMS. Даём агентов с audit, approval gates и KPI до старта.',
    cta: 'Назначить discovery call',
    howTitle: 'Как работаем',
    cards: [
      {
        title: 'ALFAKIT Care',
        body: 'Сопровождение Domino TMS для PROLOG / ALFAKIT: SLA, модули, аудит. Витрина Care — на alfakit.by, здесь не дублируем.',
        more: 'alfakit.by →',
        href: 'https://alfakit.by/ru/',
        external: true,
      },
      {
        title: 'Data / DWH',
        body: 'Lake, warehouse, ETL из любых БД, BI self-service. Отдельный прайс discovery → DWH.',
        more: 'Подробнее →',
        href: '/products/data',
      },
      {
        title: 'ALFAKIT SMART',
        body: 'Звонки → транскрипт → скоринг → extract в КУ/ПУ → Telegram Q&A.',
        more: 'Подробнее →',
        href: '/products/smart',
      },
      {
        title: 'KPI POC',
        body: 'Пилот на ваших метриках: минуты, FCR, SLA. Без L3-автономии.',
        more: 'Запросить POC →',
        href: '/products/poc',
      },
    ],
    steps: ['Discovery', 'Baseline KPI', 'Signed POC', '2 нед live', 'Go / No-Go'],
  },
  be: {
    title: 'Logistics AI — Semper In Motu',
    description: 'Logistics: Domino TMS (alfakit.by), Data/DWH, ALFAKIT SMART, KPI POC.',
    eyebrow: 'Solutions · Logistics',
    h1: 'Agentic AI для лагістыкі',
    lead: 'Не замяняем ваш TMS. Даём агентаў з audit, approval gates і KPI да старту.',
    cta: 'Discovery call',
    howTitle: 'Як працуем',
    cards: [
      {
        title: 'ALFAKIT Care',
        body: 'Суправаджанне Domino TMS для PROLOG / ALFAKIT: SLA, модулі, audit. Вітрына — alfakit.by.',
        more: 'alfakit.by →',
        href: 'https://alfakit.by/be/',
        external: true,
      },
      {
        title: 'Data / DWH',
        body: 'Lake, warehouse, ETL з любых БД, BI self-service.',
        more: 'Падрабязней →',
        href: '/products/data',
      },
      {
        title: 'ALFAKIT SMART',
        body: 'Званкі → транскрыпт → scoring → extract у CRM → Telegram Q&A.',
        more: 'Падрабязней →',
        href: '/products/smart',
      },
      {
        title: 'KPI POC',
        body: 'Пілот на вашых метриках: хвіліны, FCR, SLA.',
        more: 'Запытаць POC →',
        href: '/products/poc',
      },
    ],
    steps: ['Discovery', 'Baseline KPI', 'Signed POC', '2 тыд live', 'Go / No-Go'],
  },
};

export const contactCopy: L<{
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  leadHtml: string;
  topic: string;
  name: string;
  email: string;
  company: string;
  message: string;
  send: string;
  privacy: string;
  topics: { value: string; label: string }[];
}> = {
  en: {
    title: 'Contact — Semper In Motu',
    description: 'Contact Semper In Motu: Analytics, Engineering, SMART, POC, Data.',
    eyebrow: 'Contact',
    h1: 'Get in touch',
    leadHtml:
      'AI & Data: <a href="mailto:info@semperinmotu.com">info@semperinmotu.com</a> · or the form below. Full portfolio: <a href="https://vitalykhoruzhko.com/">vitalykhoruzhko.com</a>.',
    topic: 'Topic',
    name: 'Name',
    email: 'Email',
    company: 'Company',
    message: 'Message',
    send: 'Send',
    privacy: 'We only use your details to handle the enquiry.',
    topics: [
      { value: 'analytics', label: 'Analytics' },
      { value: 'engineering', label: 'AI Engineering' },
      { value: 'logistics', label: 'Logistics' },
      { value: 'alfakit', label: 'ALFAKIT / Domino' },
      { value: 'data-dwh', label: 'Data / DWH' },
      { value: 'smart', label: 'SMART' },
      { value: 'poc', label: 'POC' },
      { value: 'other', label: 'Other' },
    ],
  },
  ru: {
    title: 'Contact — Semper In Motu',
    description: 'Связаться с Semper In Motu: Analytics, Engineering, SMART, POC, Data.',
    eyebrow: 'Contact',
    h1: 'Напишите',
    leadHtml:
      'AI & Data: <a href="mailto:info@semperinmotu.com">info@semperinmotu.com</a> · или форма ниже. Портфель проектов — на <a href="https://vitalykhoruzhko.com/ru/">vitalykhoruzhko.com</a>.',
    topic: 'Тема',
    name: 'Имя',
    email: 'Email',
    company: 'Компания',
    message: 'Сообщение',
    send: 'Отправить',
    privacy: 'Пишем только по делу заявки.',
    topics: [
      { value: 'analytics', label: 'Analytics' },
      { value: 'engineering', label: 'AI Engineering' },
      { value: 'logistics', label: 'Логистика' },
      { value: 'alfakit', label: 'ALFAKIT / Domino' },
      { value: 'data-dwh', label: 'Data / DWH' },
      { value: 'smart', label: 'SMART' },
      { value: 'poc', label: 'POC' },
      { value: 'other', label: 'Other' },
    ],
  },
  be: {
    title: 'Contact — Semper In Motu',
    description: 'Кантакт Semper In Motu: Analytics, Engineering, SMART, POC, Data.',
    eyebrow: 'Contact',
    h1: 'Напішыце',
    leadHtml:
      'AI & Data: <a href="mailto:info@semperinmotu.com">info@semperinmotu.com</a> · або форма ніжэй. Портфель — <a href="https://vitalykhoruzhko.com/be/">vitalykhoruzhko.com</a>.',
    topic: 'Тэма',
    name: 'Імя',
    email: 'Email',
    company: 'Кампанія',
    message: 'Паведамленне',
    send: 'Адправіць',
    privacy: 'Пішем толькі па справе заявкі.',
    topics: [
      { value: 'analytics', label: 'Analytics' },
      { value: 'engineering', label: 'AI Engineering' },
      { value: 'logistics', label: 'Лагістыка' },
      { value: 'alfakit', label: 'ALFAKIT / Domino' },
      { value: 'data-dwh', label: 'Data / DWH' },
      { value: 'smart', label: 'SMART' },
      { value: 'poc', label: 'POC' },
      { value: 'other', label: 'Other' },
    ],
  },
};

export function pick<T>(dict: L<T>, locale: Locale): T {
  return dict[locale];
}

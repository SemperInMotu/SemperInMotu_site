import type { Locale } from '@/lib/i18n';

export type L<T> = Record<Locale, T>;

export const homeCopy: L<{
  title: string;
  description: string;
  lead: string;
  support: string;
  ctaOps: string;
  ctaContact: string;
  trust: string;
  viewWork: string;
  allProjects: string;
}> = {
  en: {
    title: 'Semper In Motu — Ops for logistics and data',
    description:
      'Semper In Motu Ops agency: Data/DWH, ALFAKIT SMART, KPI POC on top of TMS/CRM.',
    lead: 'We turn knowledge into systems — for logistics, data and AI on top of operations.',
    support: 'Agentic ops on TMS/CRM · Data / DWH · conversation intelligence · KPI POC.',
    ctaOps: 'Ops Systems →',
    ctaContact: 'Get in touch',
    trust: '20+ years in TMS/CRM · audit & human-in-the-loop · Eastern Europe',
    viewWork: 'View work',
    allProjects: 'All projects',
  },
  ru: {
    title: 'Semper In Motu — Ops для логистики и данных',
    description: 'Ops-агентство Semper In Motu: Data/DWH, ALFAKIT SMART, KPI POC поверх TMS/CRM.',
    lead: 'Превращаем знания в системы — для логистики, данных и AI поверх операций.',
    support: 'Agentic ops поверх TMS/CRM · Data / DWH · conversation intelligence · KPI POC.',
    ctaOps: 'Ops Systems →',
    ctaContact: 'Написать',
    trust: '20+ лет TMS/CRM · audit & human-in-the-loop · Восточная Европа',
    viewWork: 'Смотреть работы',
    allProjects: 'Все проекты',
  },
  be: {
    title: 'Semper In Motu — Ops для лагістыкі і даных',
    description: 'Ops-агенцтва Semper In Motu: Data/DWH, ALFAKIT SMART, KPI POC паверх TMS/CRM.',
    lead: 'Ператвараем веды ў сістэмы — для лагістыкі, даных і AI паверх аперацый.',
    support: 'Agentic ops паверх TMS/CRM · Data / DWH · conversation intelligence · KPI POC.',
    ctaOps: 'Ops Systems →',
    ctaContact: 'Напісаць',
    trust: '20+ гадоў TMS/CRM · audit & human-in-the-loop · Усходняя Европа',
    viewWork: 'Глядзець кейсы',
    allProjects: 'Усе праекты',
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
    title: 'Ops Systems — Semper In Motu',
    description: 'Ops: Domino TMS (alfakit.by), Data/DWH, ALFAKIT SMART, KPI POC. Semper In Motu.',
    eyebrow: 'Ops Systems',
    h1: 'Agentic AI for business',
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
        href: '/ops/data',
      },
      {
        title: 'ALFAKIT SMART',
        body: 'Calls → transcript → scoring → extraction into CRM → Telegram Q&A.',
        more: 'Learn more →',
        href: '/ops/smart',
      },
      {
        title: 'KPI POC',
        body: 'A pilot on your metrics: minutes, FCR, SLA. No L3 autonomy.',
        more: 'Request a POC →',
        href: '/ops/poc',
      },
    ],
    steps: ['Discovery', 'Baseline KPI', 'Signed POC', '2 weeks live', 'Go / No-Go'],
  },
  ru: {
    title: 'Ops Systems — Semper In Motu',
    description: 'Ops: Domino TMS (alfakit.by), Data/DWH, ALFAKIT SMART, KPI POC. Semper In Motu.',
    eyebrow: 'Ops Systems',
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
        href: '/ops/data',
      },
      {
        title: 'ALFAKIT SMART',
        body: 'Звонки → транскрипт → скоринг → extract в КУ/ПУ → Telegram Q&A.',
        more: 'Подробнее →',
        href: '/ops/smart',
      },
      {
        title: 'KPI POC',
        body: 'Пилот на ваших метриках: минуты, FCR, SLA. Без L3-автономии.',
        more: 'Запросить POC →',
        href: '/ops/poc',
      },
    ],
    steps: ['Discovery', 'Baseline KPI', 'Signed POC', '2 нед live', 'Go / No-Go'],
  },
  be: {
    title: 'Ops Systems — Semper In Motu',
    description: 'Ops: Domino TMS (alfakit.by), Data/DWH, ALFAKIT SMART, KPI POC.',
    eyebrow: 'Ops Systems',
    h1: 'Agentic AI для бізнесу',
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
        href: '/ops/data',
      },
      {
        title: 'ALFAKIT SMART',
        body: 'Званкі → транскрыпт → scoring → extract у CRM → Telegram Q&A.',
        more: 'Падрабязней →',
        href: '/ops/smart',
      },
      {
        title: 'KPI POC',
        body: 'Пілот на вашых метриках: хвіліны, FCR, SLA.',
        more: 'Запытаць POC →',
        href: '/ops/poc',
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
    description: 'Contact Semper In Motu: Ops, SMART, POC, Data.',
    eyebrow: 'Contact',
    h1: 'Get in touch',
    leadHtml:
      'Ops, Data and AI: <a href="mailto:info@semperinmotu.com">info@semperinmotu.com</a> · or the form below. Full portfolio: <a href="https://vitalykhoruzhko.com/">vitalykhoruzhko.com</a>.',
    topic: 'Topic',
    name: 'Name',
    email: 'Email',
    company: 'Company',
    message: 'Message',
    send: 'Send',
    privacy: 'We only use your details to handle the enquiry.',
    topics: [
      { value: 'ops', label: 'Ops' },
      { value: 'alfakit', label: 'ALFAKIT / Domino' },
      { value: 'data-dwh', label: 'Data / DWH' },
      { value: 'smart', label: 'SMART' },
      { value: 'poc', label: 'POC' },
      { value: 'other', label: 'Other' },
    ],
  },
  ru: {
    title: 'Contact — Semper In Motu',
    description: 'Связаться с Semper In Motu: Ops, SMART, POC, Data.',
    eyebrow: 'Contact',
    h1: 'Напишите',
    leadHtml:
      'Ops, Data и AI: <a href="mailto:info@semperinmotu.com">info@semperinmotu.com</a> · или форма ниже. Портфель проектов — на <a href="https://vitalykhoruzhko.com/ru/">vitalykhoruzhko.com</a>.',
    topic: 'Тема',
    name: 'Имя',
    email: 'Email',
    company: 'Компания',
    message: 'Сообщение',
    send: 'Отправить',
    privacy: 'Пишем только по делу заявки.',
    topics: [
      { value: 'ops', label: 'Ops' },
      { value: 'alfakit', label: 'ALFAKIT / Domino' },
      { value: 'data-dwh', label: 'Data / DWH' },
      { value: 'smart', label: 'SMART' },
      { value: 'poc', label: 'POC' },
      { value: 'other', label: 'Other' },
    ],
  },
  be: {
    title: 'Contact — Semper In Motu',
    description: 'Кантакт Semper In Motu: Ops, SMART, POC, Data.',
    eyebrow: 'Contact',
    h1: 'Напішыце',
    leadHtml:
      'Ops, Data і AI: <a href="mailto:info@semperinmotu.com">info@semperinmotu.com</a> · або форма ніжэй. Портфель — <a href="https://vitalykhoruzhko.com/be/">vitalykhoruzhko.com</a>.',
    topic: 'Тэма',
    name: 'Імя',
    email: 'Email',
    company: 'Кампанія',
    message: 'Паведамленне',
    send: 'Адправіць',
    privacy: 'Пішем толькі па справе заявкі.',
    topics: [
      { value: 'ops', label: 'Ops' },
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

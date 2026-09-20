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
    title: 'Semper In Motu — ИИ и данные для бизнеса',
    description:
      'ИИ и инженерия данных для бизнеса: аналитика, агенты, отчётность, аудит и человек в контуре решения.',
    lead: 'Превращаем знания бизнеса в работающие системы.',
    support: 'Разработка ИИ · аналитика данных · отчётность · автоматизация',
    ctaStart: 'С какой задачей →',
    ctaContact: 'Обсудить проект',
    trust: '25+ лет на стыке ПО, данных и операций · аудит и человек в контуре · Восточная Европа',
    viewWork: 'Смотреть работы',
    allProjects: 'Все проекты',
    problemFirst: 'Не начинаем с ИИ. Начинаем с проблемы.',
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
    title: 'ИИ для логистики — Semper In Motu',
    description: 'Логистика: Domino TMS (alfakit.by), данные и хранилища, ALFAKIT SMART, KPI-пилот.',
    eyebrow: 'Решения · Логистика',
    h1: 'ИИ-агенты для логистики',
    lead: 'Не заменяем вашу TMS. Даём агентов с журналом действий, подтверждением человеком и метриками до старта.',
    cta: 'Назначить созвон-знакомство',
    howTitle: 'Как работаем',
    cards: [
      {
        title: 'ALFAKIT Care',
        body: 'Сопровождение Domino TMS для PROLOG / ALFAKIT: соглашения об уровне сервиса, модули, аудит. Витрина Care — на alfakit.by, здесь не дублируем.',
        more: 'alfakit.by →',
        href: 'https://alfakit.by/ru/',
        external: true,
      },
      {
        title: 'Данные и хранилища',
        body: 'Озеро данных, хранилище, загрузка из любых БД, отчёты для пользователей. Отдельный прайс: обследование → хранилище.',
        more: 'Подробнее →',
        href: '/products/data',
      },
      {
        title: 'ALFAKIT SMART',
        body: 'Звонки → расшифровка → оценка → извлечение в CRM → ответы в Telegram.',
        more: 'Подробнее →',
        href: '/products/smart',
      },
      {
        title: 'KPI-пилот',
        body: 'Пилот на ваших метриках: минуты, доля закрытия с первого раза, сроки сервиса. Без полной автономии.',
        more: 'Запросить пилот →',
        href: '/products/poc',
      },
    ],
    steps: ['Знакомство', 'Исходные KPI', 'Подписанный пилот', '2 нед. на реальных данных', 'Решение: идём / не идём'],
  },
};

export const contactCopy: L<{
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
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
    title: 'Контакты — Semper In Motu',
    description: 'Связаться с Semper In Motu: аналитика, разработка ИИ, SMART, пилот, данные.',
    eyebrow: 'Контакты',
    h1: 'Напишите',
    topic: 'Тема',
    name: 'Имя',
    email: 'Эл. почта',
    company: 'Компания',
    message: 'Сообщение',
    send: 'Отправить',
    privacy: 'Пишем только по делу заявки.',
    topics: [
      { value: 'analytics', label: 'Аналитика данных' },
      { value: 'engineering', label: 'Разработка ИИ' },
      { value: 'logistics', label: 'Логистика' },
      { value: 'alfakit', label: 'ALFAKIT / Domino' },
      { value: 'data-dwh', label: 'Данные и хранилища' },
      { value: 'smart', label: 'SMART' },
      { value: 'poc', label: 'KPI-пилот' },
      { value: 'other', label: 'Другое' },
    ],
  },
};

export function pick<T>(dict: L<T>, locale: Locale): T {
  return dict[locale];
}

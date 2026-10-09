import Link from 'next/link';
import type { Metadata } from 'next';
import { asLocale, localePath } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

type MethodKey = 'kpi-poc' | 'shadow-mode' | 'audit-lane' | 'express-audit';

const content: Record<
  MethodKey,
  { path: string; title: string; en: { h1: string; lead: string; body: string[] }; ru: { h1: string; lead: string; body: string[] } }
> = {
  'kpi-poc': {
    path: '/methods/kpi-poc',
    title: 'KPI POC',
    en: {
      h1: 'KPI-based POC',
      lead: '95% of GenAI pilots die without ROI. We start with one metric and one use case.',
      body: ['Baseline before build', '2 weeks live', 'Go/No-Go report', 'No L3 autonomy'],
    },
    ru: {
      h1: 'KPI-пилот',
      lead: '95% пилотов с генеративным ИИ умирают без окупаемости. Стартуем с одной метрики и одного сценария.',
      body: ['Исходный уровень до разработки', '2 недели на реальных данных', 'Отчёт «идём / не идём»', 'Без полной автономии'],
    },
  },
  'shadow-mode': {
    path: '/methods/shadow-mode',
    title: 'Shadow mode',
    en: {
      h1: 'Shadow mode',
      lead: 'The agent drafts; humans approve. Auto-approve rises only when eval allows it.',
      body: ['Zero silent writes at start', 'Audit every suggestion', 'Raise auto-approve with evidence'],
    },
    ru: {
      h1: 'Режим черновика',
      lead: 'Агент пишет черновик; человек подтверждает. Доля автоподтверждений растёт только по результатам проверки качества.',
      body: ['Сначала без тихой записи в систему', 'Журнал каждой рекомендации', 'Рост автоподтверждений по фактам'],
    },
  },
  'audit-lane': {
    path: '/methods/audit-lane',
    title: 'Audit lane',
    en: {
      h1: 'Audit lane',
      lead: 'Every action: who / when / why / source. Same discipline for TMS and DWH.',
      body: ['Immutable log', 'Provenance for extracts', 'Human-in-the-loop roles'],
    },
    ru: {
      h1: 'Журнал действий',
      lead: 'Каждое действие: кто / когда / зачем / из какого источника. Одна дисциплина для TMS и хранилища данных.',
      body: ['Неизменяемый журнал', 'Происхождение извлечённых фактов', 'Роли с человеком в контуре'],
    },
  },
  'express-audit': {
    path: '/methods/express-audit',
    title: 'Express audit',
    en: {
      h1: 'Express audit',
      lead: '€500–900 depending on interviews. Written findings, risks, next steps — no build included.',
      body: ['3–5 interviews', 'Process + data map', 'Use-case shortlist', 'Feasibility & effort'],
    },
    ru: {
      h1: 'Экспресс-аудит',
      lead: '€500–900 в зависимости от числа интервью. Письменное заключение — без внедрения.',
      body: ['3–5 интервью', 'Карта процессов и данных', 'Шортлист сценариев', 'Осуществимость и трудоёмкость'],
    },
  },
};

export function generateStaticParams() {
  return (Object.keys(content) as MethodKey[]).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const m = content[slug as MethodKey];
  if (!m) return {};
  return pageMetadata({
    locale: asLocale(locale),
    path: m.path,
    title: `${m.title} — Semper In Motu`,
    description: m.en.lead,
  });
}

export default async function MethodSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = asLocale(raw);
  const m = content[slug as MethodKey];
  if (!m) return null;
  const isRu = locale === 'ru';
  const c = isRu ? m.ru : m.en;

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{isRu ? 'Методы' : 'Methods'}</div>
          <h1>{c.h1}</h1>
          <p className="lead">{c.lead}</p>
          <div className="cta-row">
            <Link
              className="btn btn-ink"
              href={`${localePath(locale, '/contact')}?topic=${slug === 'express-audit' ? 'other' : 'poc'}`}
            >
              {isRu ? 'Обсудить' : 'Discuss'}
            </Link>
            <Link className="btn btn-ghost" href={localePath(locale, '/methods')}>
              {isRu ? 'Все методы' : 'All methods'}
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap panel">
          <ul className="list-clean">
            {c.body.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

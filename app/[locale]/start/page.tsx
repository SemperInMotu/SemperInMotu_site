import Link from 'next/link';
import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({
    locale,
    path: '/start',
    title: 'Start — Semper In Motu',
    description: 'Choose where to begin: analytics, AI engineering, logistics, or discovery.',
  });
}

const doors = [
  {
    href: '/capabilities/analytics',
    en: { t: 'Data, but no decisions', d: 'Analytics, KPI, marts, Go/No-Go.' },
    ru: { t: 'Есть данные, нет решений', d: 'Analytics, KPI, витрины, Go/No-Go.' },
  },
  {
    href: '/capabilities/engineering',
    en: { t: 'Idea for an agent / pilot', d: 'AI engineering + KPI POC.' },
    ru: { t: 'Идея агента / пилота', d: 'AI engineering + KPI POC.' },
  },
  {
    href: '/solutions/logistics',
    en: { t: 'Logistics / TMS / calls', d: 'Our strongest runway.' },
    ru: { t: 'Логистика / TMS / звонки', d: 'Главный runway.' },
  },
  {
    href: '/methods/express-audit',
    en: { t: 'Not sure yet', d: 'Express audit — map the next step.' },
    ru: { t: 'Пока неясно', d: 'Express audit — карта следующего шага.' },
  },
] as const;

export default async function StartPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isRu = locale === 'ru' || locale === 'be';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Start</div>
          <h1>{isRu ? 'С какой задачей вы пришли?' : 'What brought you here?'}</h1>
          <p className="lead">
            {isRu
              ? 'Не начинаем с AI. Начинаем с проблемы. Выберите ближайшую дверь.'
              : "Don't start with AI. Start with the problem. Pick the closest door."}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid-2">
          {doors.map((d) => {
            const c = isRu ? d.ru : d.en;
            return (
              <Link key={d.href} className="card ops-card" href={localePath(locale, d.href)}>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
                <span className="more">{isRu ? 'Дальше →' : 'Continue →'}</span>
              </Link>
            );
          })}
        </div>
        <div className="wrap" style={{ marginTop: '1.5rem' }}>
          <Link className="btn btn-ink" href={`${localePath(locale, '/contact')}?topic=other`}>
            {isRu ? 'Описать задачу без ТЗ' : 'Describe the problem without a brief'}
          </Link>
        </div>
      </section>
    </main>
  );
}

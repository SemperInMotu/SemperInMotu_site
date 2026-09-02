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
    path: '/ops/poc',
    title: 'KPI-based AI POC — Semper In Motu',
    description: 'KPI-based AI POC: one use case, human-in-the-loop, Go/No-Go after 2 weeks live.',
  });
}

export default async function PocPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isRu = locale === 'ru' || locale === 'be';

  return (
    <main>
      <section className="page-hero ops">
        <div className="wrap">
          <div className="eyebrow ops">Ops · Engagement</div>
          <h1>KPI-based AI POC</h1>
          <p className="lead">
            {isRu
              ? '95% GenAI-пилотов умирают без ROI. Мы стартуем с метрик и одного use case.'
              : '95% of GenAI pilots die without ROI. We start with metrics and one use case.'}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid-2">
          <div className="panel">
            <h2>{isRu ? 'Один UC на старт' : 'Choose one UC to begin'}</h2>
            <ul className="list-clean">
              <li>{isRu ? 'Статус-запросы клиентов' : 'Customer status requests'}</li>
              <li>{isRu ? 'Исключения: задержка рейса' : 'Exceptions: delayed trips'}</li>
              <li>{isRu ? 'NL-аналитика для руководителя' : 'Natural-language analytics for management'}</li>
            </ul>
          </div>
          <div className="panel">
            <h2>Guardrails</h2>
            <ul className="list-clean">
              <li>TMS-native integration</li>
              <li>Human-in-the-loop</li>
              <li>{isRu ? 'Один agent' : 'One agent'}</li>
              <li>No L3 autonomy</li>
            </ul>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: '1.25rem' }}>
          <div className="panel">
            <h3>Deliverable</h3>
            <p className="muted" style={{ margin: 0 }}>
              {isRu ? 'Live 2 нед · ROI dashboard · Go/No-Go report.' : 'Live for 2 weeks · ROI dashboard · Go/No-Go report.'}
            </p>
          </div>
          <Link className="btn btn-ink" style={{ marginTop: '1.25rem', display: 'inline-flex' }} href={`${localePath(locale, '/contact')}?topic=poc`}>
            {isRu ? 'Запросить kickoff' : 'Request a kickoff'}
          </Link>
        </div>
      </section>
    </main>
  );
}

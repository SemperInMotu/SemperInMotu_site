import Link from 'next/link';
import type { Metadata } from 'next';
import { asLocale, localePath } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = asLocale((await params).locale);
  return pageMetadata({
    locale,
    path: '/products/poc',
    title: locale === 'ru' ? 'KPI-пилот — Semper In Motu' : 'KPI-based AI POC — Semper In Motu',
    description:
      locale === 'ru'
        ? 'KPI-пилот: один сценарий, человек в контуре, решение «идём / не идём» через 2 недели.'
        : 'KPI-based AI POC: one use case, human-in-the-loop, Go/No-Go after 2 weeks live.',
  });
}

export default async function PocPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = asLocale((await params).locale);
  const isRu = locale === 'ru';

  return (
    <main>
      <section className="page-hero ops">
        <div className="wrap">
          <div className="eyebrow ops">{isRu ? 'Продукт · формат' : 'Ops · Engagement'}</div>
          <h1>{isRu ? 'KPI-пилот' : 'KPI-based AI POC'}</h1>
          <p className="lead">
            {isRu
              ? '95% пилотов с генеративным ИИ умирают без окупаемости. Мы стартуем с метрик и одного сценария.'
              : '95% of GenAI pilots die without ROI. We start with metrics and one use case.'}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid-2">
          <div className="panel">
            <h2>{isRu ? 'Один сценарий на старт' : 'Choose one UC to begin'}</h2>
            <ul className="list-clean">
              <li>{isRu ? 'Статус-запросы клиентов' : 'Customer status requests'}</li>
              <li>{isRu ? 'Исключения: задержка рейса' : 'Exceptions: delayed trips'}</li>
              <li>{isRu ? 'Аналитика на естественном языке для руководителя' : 'Natural-language analytics for management'}</li>
            </ul>
          </div>
          <div className="panel">
            <h2>{isRu ? 'Ограничения' : 'Guardrails'}</h2>
            <ul className="list-clean">
              <li>{isRu ? 'Интеграция в вашу TMS' : 'TMS-native integration'}</li>
              <li>{isRu ? 'Человек в контуре решения' : 'Human-in-the-loop'}</li>
              <li>{isRu ? 'Один агент' : 'One agent'}</li>
              <li>{isRu ? 'Без полной автономии' : 'No L3 autonomy'}</li>
            </ul>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: '1.25rem' }}>
          <div className="panel">
            <h3>{isRu ? 'Результат' : 'Deliverable'}</h3>
            <p className="muted" style={{ margin: 0 }}>
              {isRu
                ? '2 недели на реальных данных · дашборд окупаемости · отчёт «идём / не идём».'
                : 'Live for 2 weeks · ROI dashboard · Go/No-Go report.'}
            </p>
          </div>
          <Link
            className="btn btn-ink"
            style={{ marginTop: '1.25rem', display: 'inline-flex' }}
            href={`${localePath(locale, '/contact')}?topic=poc`}
          >
            {isRu ? 'Запросить старт' : 'Request a kickoff'}
          </Link>
        </div>
      </section>
    </main>
  );
}

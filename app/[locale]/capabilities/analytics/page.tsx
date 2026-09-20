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
    path: '/capabilities/analytics',
    title: locale === 'ru' ? 'Аналитика данных и ИИ — Semper In Motu' : 'Data Analytics & AI — Semper In Motu',
    description:
      locale === 'ru'
        ? 'Сценарии, KPI, витрины, проверка качества извлечения и решение «идём / не идём».'
        : 'UC, KPI, data marts, BI, LLM eval and Go/No-Go recommendations.',
  });
}

export default async function AnalyticsCapabilityPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isRu = locale === 'ru';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{isRu ? 'Практики' : 'Capabilities'}</div>
          <h1>{isRu ? 'Аналитика данных и ИИ' : 'Data Analytics & AI'}</h1>
          <p className="lead">
            {isRu
              ? 'Из хаоса операций — вопрос, метрика, гипотеза, решение. Без исходных KPI пилота нет.'
              : 'From operational noise to a question, a metric, a hypothesis, a decision. No baseline KPI — no pilot.'}
          </p>
          <Link className="btn btn-ink" href={`${localePath(locale, '/contact')}?topic=analytics`}>
            {isRu ? 'Обсудить аналитику' : 'Discuss analytics'}
          </Link>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid-2">
          <div className="panel">
            <h2>{isRu ? 'Что сдаём' : 'What we deliver'}</h2>
            <ul className="list-clean">
              {isRu ? (
                <>
                  <li>Сценарий + KPI + исходный уровень</li>
                  <li>SQL / витрины / отчёты</li>
                  <li>Наборы для проверки извлечения и оценки</li>
                  <li>Краткий бриф · решение «идём / не идём»</li>
                </>
              ) : (
                <>
                  <li>UC + KPI + baseline</li>
                  <li>SQL / marts / BI</li>
                  <li>Eval sets for extract / score</li>
                  <li>Brief · Go/No-Go</li>
                </>
              )}
            </ul>
          </div>
          <div className="panel">
            <h2>{isRu ? 'Граница' : 'Boundary'}</h2>
            <p className="muted">
              {isRu
                ? 'Не обещаем промышленного агента без разработки. Не строим отчёт ради отчёта.'
                : 'We do not ship a production agent without Engineering. No dashboard for its own sake.'}
            </p>
            <Link
              className="btn btn-line"
              style={{ marginTop: '1rem', display: 'inline-flex' }}
              href={localePath(locale, '/methods/express-audit')}
            >
              {isRu ? 'Экспресс-аудит →' : 'Express audit →'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

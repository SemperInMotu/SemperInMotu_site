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
    path: '/capabilities',
    title: locale === 'ru' ? 'Практики — Semper In Motu' : 'Capabilities — Semper In Motu',
    description:
      locale === 'ru'
        ? 'Аналитика данных и разработка ИИ — две практики, один контур ответственности.'
        : 'Data Analytics & AI and AI Engineering — two practices, one accountable delivery.',
  });
}

export default async function CapabilitiesIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = asLocale((await params).locale);
  const isRu = locale === 'ru';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{isRu ? 'Практики' : 'Capabilities'}</div>
          <h1>{isRu ? 'Две практики · один контур ответственности' : 'Two practices · one accountable delivery'}</h1>
          <p className="lead">
            {isRu
              ? 'Аналитик сдаёт решение на данных и критерии. Инженер сдаёт сервис с записью в систему и журналом действий.'
              : 'Analytics delivers the decision criteria. Engineering delivers the service with writeback and audit.'}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid-2">
          <Link className="card ops-card" href={localePath(locale, '/capabilities/analytics')}>
            <h3>{isRu ? 'Аналитика данных и ИИ' : 'Data Analytics & AI'}</h3>
            <p>
              {isRu
                ? 'Сценарии · KPI · витрины · проверка качества · решение «идём / не идём»'
                : 'UC · KPI · marts · eval · Go/No-Go'}
            </p>
            <span className="more">{isRu ? 'Открыть →' : 'Open →'}</span>
          </Link>
          <Link className="card ops-card" href={localePath(locale, '/capabilities/engineering')}>
            <h3>{isRu ? 'Разработка ИИ' : 'AI Engineering'}</h3>
            <p>
              {isRu
                ? 'Цепочка обработки · агенты · интеграции · черновик → промышленная эксплуатация'
                : 'Pipeline · agents · integrations · shadow→prod'}
            </p>
            <span className="more">{isRu ? 'Открыть →' : 'Open →'}</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

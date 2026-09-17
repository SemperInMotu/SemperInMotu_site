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
    path: '/capabilities',
    title: 'Capabilities — Semper In Motu',
    description: 'Data Analytics & AI and AI Engineering — two practices, one accountable delivery.',
  });
}

export default async function CapabilitiesIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isRu = locale === 'ru' || locale === 'be';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Capabilities</div>
          <h1>{isRu ? 'Две практики · один контур ответственности' : 'Two practices · one accountable delivery'}</h1>
          <p className="lead">
            {isRu
              ? 'Analyst сдаёт решение на данных и критерии. Engineer сдаёт сервис с writeback и audit.'
              : 'Analytics delivers the decision criteria. Engineering delivers the service with writeback and audit.'}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid-2">
          <Link className="card ops-card" href={localePath(locale, '/capabilities/analytics')}>
            <h3>Data Analytics & AI</h3>
            <p>{isRu ? 'UC · KPI · витрины · eval · Go/No-Go' : 'UC · KPI · marts · eval · Go/No-Go'}</p>
            <span className="more">{isRu ? 'Открыть →' : 'Open →'}</span>
          </Link>
          <Link className="card ops-card" href={localePath(locale, '/capabilities/engineering')}>
            <h3>AI Engineering</h3>
            <p>
              {isRu
                ? 'Pipeline · agents · integrations · shadow→prod'
                : 'Pipeline · agents · integrations · shadow→prod'}
            </p>
            <span className="more">{isRu ? 'Открыть →' : 'Open →'}</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

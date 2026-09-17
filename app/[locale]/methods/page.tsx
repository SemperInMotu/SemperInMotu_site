import Link from 'next/link';
import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

const methods = [
  { href: '/methods/kpi-poc', en: 'KPI POC', ru: 'KPI POC', dEn: '2 weeks · one UC · Go/No-Go', dRu: '2 нед · один UC · Go/No-Go' },
  { href: '/methods/shadow-mode', en: 'Shadow mode', ru: 'Shadow mode', dEn: 'Draft → rising auto-approve %', dRu: 'Черновик → рост % auto-approve' },
  { href: '/methods/audit-lane', en: 'Audit lane', ru: 'Audit lane', dEn: 'who / when / why / source', dRu: 'who / when / why / source' },
  { href: '/methods/express-audit', en: 'Express audit', ru: 'Express audit', dEn: '€500–900 · written findings', dRu: '€500–900 · письменное заключение' },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({
    locale,
    path: '/methods',
    title: 'Methods — Semper In Motu',
    description: 'How we work: KPI POC, shadow mode, audit lane, express audit.',
  });
}

export default async function MethodsIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isRu = locale === 'ru' || locale === 'be';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Methods</div>
          <h1>{isRu ? 'Как работаем' : 'How we work'}</h1>
          <p className="lead">
            {isRu
              ? 'Problem → data → analysis → engineering → AI → production. Не демо-театр.'
              : 'Problem → data → analysis → engineering → AI → production. No demo theatre.'}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid-2">
          {methods.map((m) => (
            <Link key={m.href} className="card ops-card" href={localePath(locale, m.href)}>
              <h3>{isRu ? m.ru : m.en}</h3>
              <p>{isRu ? m.dRu : m.dEn}</p>
              <span className="more">→</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

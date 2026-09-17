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
  const isRu = locale !== 'en';
  return pageMetadata({
    locale,
    path: '/products',
    title: isRu ? 'Products — Semper In Motu' : 'Products — Semper In Motu',
    description: isRu
      ? 'Data/DWH, SMART, KPI POC, industry demos.'
      : 'Data/DWH, SMART, KPI POC, industry demos.',
  });
}

const cards = [
  { href: '/products/data', title: 'Data / DWH', en: 'Lakes, warehouses, marts, BI.', ru: 'Lake, DWH, витрины, BI.' },
  { href: '/products/smart', title: 'ALFAKIT SMART', en: 'Calls → CRM with approve.', ru: 'Звонки → CRM с approve.' },
  { href: '/products/poc', title: 'KPI POC', en: '2-week pilot on your metrics.', ru: 'Пилот 2 нед на ваших KPI.' },
  { href: '/products/demos', title: 'Industry demos', en: 'Synthetic BI marts.', ru: 'Синтетические витрины.' },
] as const;

export default async function ProductsIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isRu = locale === 'ru' || locale === 'be';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Products</div>
          <h1>{isRu ? 'Упакованные офферы' : 'Packaged offers'}</h1>
          <p className="lead">
            {isRu
              ? 'Готовые входы: данные, conversation intelligence, KPI POC. Логистика — в Solutions.'
              : 'Ready entry points: data, conversation intelligence, KPI POC. Logistics lives under Solutions.'}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid-2">
          {cards.map((c) => (
            <Link key={c.href} className="card ops-card" href={localePath(locale, c.href)}>
              <h3>{c.title}</h3>
              <p>{isRu ? c.ru : c.en}</p>
              <span className="more">{isRu ? 'Открыть →' : 'Open →'}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

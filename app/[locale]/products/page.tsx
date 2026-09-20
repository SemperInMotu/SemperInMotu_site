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
    path: '/products',
    title: locale === 'ru' ? 'Продукты — Semper In Motu' : 'Products — Semper In Motu',
    description:
      locale === 'ru'
        ? 'Данные и хранилища, SMART, KPI-пилот, отраслевые демо.'
        : 'Data/DWH, SMART, KPI POC, industry demos.',
  });
}

const cards = [
  {
    href: '/products/data',
    titleEn: 'Data / DWH',
    titleRu: 'Данные и хранилища',
    en: 'Lakes, warehouses, marts, BI.',
    ru: 'Озёра данных, хранилища, витрины, отчёты.',
  },
  {
    href: '/products/smart',
    titleEn: 'ALFAKIT SMART',
    titleRu: 'ALFAKIT SMART',
    en: 'Calls → CRM with approve.',
    ru: 'Звонки → CRM после подтверждения.',
  },
  {
    href: '/products/poc',
    titleEn: 'KPI POC',
    titleRu: 'KPI-пилот',
    en: '2-week pilot on your metrics.',
    ru: 'Пилот на 2 недели по вашим метрикам.',
  },
  {
    href: '/products/demos',
    titleEn: 'Industry demos',
    titleRu: 'Отраслевые демо',
    en: 'Synthetic BI marts.',
    ru: 'Синтетические витрины данных.',
  },
] as const;

export default async function ProductsIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isRu = locale === 'ru';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{isRu ? 'Продукты' : 'Products'}</div>
          <h1>{isRu ? 'Готовые предложения' : 'Packaged offers'}</h1>
          <p className="lead">
            {isRu
              ? 'Готовые входы: данные, разведка переговоров, KPI-пилот. Логистика — в разделе «Решения».'
              : 'Ready entry points: data, conversation intelligence, KPI POC. Logistics lives under Solutions.'}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid-2">
          {cards.map((c) => (
            <Link key={c.href} className="card ops-card" href={localePath(locale, c.href)}>
              <h3>{isRu ? c.titleRu : c.titleEn}</h3>
              <p>{isRu ? c.ru : c.en}</p>
              <span className="more">{isRu ? 'Открыть →' : 'Open →'}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

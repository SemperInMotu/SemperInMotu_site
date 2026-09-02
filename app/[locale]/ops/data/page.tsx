import Link from 'next/link';
import type { Metadata } from 'next';
import { alfakitUrl, localePath, personalUrl, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Data · DWH · ETL — Semper In Motu',
    description: 'Data Lake, Data Warehouse, ETL and self-service BI from any database.',
  },
  ru: {
    title: 'Data · DWH · ETL — Semper In Motu',
    description: 'Data Lake, DWH, ETL и self-service BI из любых источников.',
  },
  be: {
    title: 'Data · DWH · ETL — Semper In Motu',
    description: 'Data Lake, DWH, ETL і self-service BI з любых крыніц.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[locale as Locale];
  return pageMetadata({ locale: locale as Locale, path: '/ops/data', ...m });
}

export default async function DataPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isRu = locale === 'ru' || locale === 'be';

  return (
    <main>
      <section className="page-hero ops">
        <div className="wrap">
          <div className="eyebrow ops">Ops · Data</div>
          <h1>Data Lake · DWH · ETL · self-service BI</h1>
          <p className="lead">
            {isRu
              ? 'Витрины и склады из любых источников — не только Domino. Объём фиксируется после discovery.'
              : 'Data marts and warehouses from any source — not only Domino. Scope is fixed after discovery.'}
          </p>
          <Link className="btn btn-ink" href={`${localePath(locale, '/contact')}?topic=data-dwh`}>
            {isRu ? 'Запросить discovery' : 'Request discovery'}
          </Link>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid-2">
          <div className="panel">
            <h2>{isRu ? 'Что делаем' : 'What we deliver'}</h2>
            <ul className="list-clean">
              <li>SQL/NoSQL, ERP/1C, CSV/API, Domino NSF, integration logs</li>
              <li>ETL/ELT: schedules, data quality, idempotent loads</li>
              <li>Lake → Warehouse → marts for CFO / Sales / Ops</li>
              <li>Self-service BI: QlikView / Power BI, access rights</li>
            </ul>
          </div>
          <div className="panel">
            <h2>{isRu ? 'Ориентир по цене' : 'Indicative pricing'}</h2>
            <ul className="list-clean">
              <li>
                <strong>Discovery</strong> — from €1 200 / $1 300
              </li>
              <li>
                <strong>{isRu ? 'Пилот одной витрины' : 'One-mart pilot'}</strong> — from €4 500 / $4 800
              </li>
              <li>
                <strong>DWH + 2–3 marts</strong> — from €12 000 / $12 800
              </li>
              <li>
                <strong>{isRu ? 'Поддержка витрины' : 'Mart support'}</strong> — from €600 / $650 / month
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section-tight">
        <div className="wrap">
          <h2>{isRu ? 'Отраслевые витрины · синтетические демо' : 'Industry marts · synthetic demos'}</h2>
          <div className="grid-2" style={{ marginTop: '1rem' }}>
            <Link className="card ops-card" href={localePath(locale, '/ops/demos/logistics')}>
              <h3>Logistics control tower</h3>
              <p>{isRu ? 'Какая CEE-линия ломает OTIF.' : 'Which CEE lane breaks OTIF.'}</p>
              <span className="more">{isRu ? 'Открыть демо →' : 'Open demo →'}</span>
            </Link>
            <Link className="card ops-card" href={localePath(locale, '/ops/demos/retail')}>
              <h3>Retail store ops</h3>
              <p>TY vs LY, sales per m².</p>
              <span className="more">{isRu ? 'Открыть демо →' : 'Open demo →'}</span>
            </Link>
            <Link className="card ops-card" href={localePath(locale, '/ops/demos/manufacturing')}>
              <h3>Plant OEE</h3>
              <p>{isRu ? 'Дефекты ≠ простой.' : 'Defect count is not downtime.'}</p>
              <span className="more">{isRu ? 'Открыть демо →' : 'Open demo →'}</span>
            </Link>
            <Link className="card ops-card" href={localePath(locale, '/ops/demos/ecommerce')}>
              <h3>E-commerce fulfillment</h3>
              <p>GMV up, margin down.</p>
              <span className="more">{isRu ? 'Открыть демо →' : 'Open demo →'}</span>
            </Link>
          </div>
          <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
            <Link className="btn btn-ink" href={`${localePath(locale, '/contact')}?topic=data-dwh`}>
              {isRu ? 'Связаться' : 'Contact Semper'}
            </Link>
            <a className="btn btn-line" href={alfakitUrl(locale)}>
              Domino TMS · alfakit.by →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

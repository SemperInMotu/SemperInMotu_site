import Link from 'next/link';
import type { Metadata } from 'next';
import { alfakitUrl, localePath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({
    locale,
    path: '/products/data',
    title:
      locale === 'ru'
        ? 'Данные и хранилища — Semper In Motu'
        : 'Data · DWH · ETL — Semper In Motu',
    description:
      locale === 'ru'
        ? 'Озёра данных, хранилища, загрузка и отчёты из любых источников.'
        : 'Data Lake, Data Warehouse, ETL and self-service BI from any database.',
  });
}

export default async function DataPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isRu = locale === 'ru';

  return (
    <main>
      <section className="page-hero ops">
        <div className="wrap">
          <div className="eyebrow ops">{isRu ? 'Продукт · данные' : 'Ops · Data'}</div>
          <h1>
            {isRu
              ? 'Озеро данных · хранилище · загрузка · отчёты'
              : 'Data Lake · DWH · ETL · self-service BI'}
          </h1>
          <p className="lead">
            {isRu
              ? 'Витрины и склады из любых источников — не только Domino. Объём фиксируется после обследования.'
              : 'Data marts and warehouses from any source — not only Domino. Scope is fixed after discovery.'}
          </p>
          <Link className="btn btn-ink" href={`${localePath(locale, '/contact')}?topic=data-dwh`}>
            {isRu ? 'Запросить обследование' : 'Request discovery'}
          </Link>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid-2">
          <div className="panel">
            <h2>{isRu ? 'Что делаем' : 'What we deliver'}</h2>
            <ul className="list-clean">
              {isRu ? (
                <>
                  <li>SQL / NoSQL, ERP / 1С, CSV / API, Domino NSF, журналы интеграций</li>
                  <li>Загрузка по расписанию, качество данных, идемпотентные прогоны</li>
                  <li>Озеро → хранилище → витрины для финансов / продаж / операций</li>
                  <li>Отчёты для пользователей: QlikView / Power BI, права доступа</li>
                </>
              ) : (
                <>
                  <li>SQL/NoSQL, ERP/1C, CSV/API, Domino NSF, integration logs</li>
                  <li>ETL/ELT: schedules, data quality, idempotent loads</li>
                  <li>Lake → Warehouse → marts for CFO / Sales / Ops</li>
                  <li>Self-service BI: QlikView / Power BI, access rights</li>
                </>
              )}
            </ul>
          </div>
          <div className="panel">
            <h2>{isRu ? 'Ориентир по цене' : 'Indicative pricing'}</h2>
            <ul className="list-clean">
              <li>
                <strong>{isRu ? 'Обследование' : 'Discovery'}</strong> — from €1 200 / $1 300
              </li>
              <li>
                <strong>{isRu ? 'Пилот одной витрины' : 'One-mart pilot'}</strong> — from €4 500 / $4 800
              </li>
              <li>
                <strong>{isRu ? 'Хранилище + 2–3 витрины' : 'DWH + 2–3 marts'}</strong> — from €12 000 / $12 800
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
            <Link className="card ops-card" href={localePath(locale, '/products/demos/logistics')}>
              <h3>{isRu ? 'Диспетчерская башня логистики' : 'Logistics control tower'}</h3>
              <p>
                {isRu
                  ? 'Какое плечо ломает своевременность доставок.'
                  : 'Which CEE lane breaks OTIF.'}
              </p>
              <span className="more">{isRu ? 'Открыть демо →' : 'Open demo →'}</span>
            </Link>
            <Link className="card ops-card" href={localePath(locale, '/products/demos/retail')}>
              <h3>{isRu ? 'Розница: магазины' : 'Retail store ops'}</h3>
              <p>{isRu ? 'Этот год vs прошлый, продажи на м².' : 'TY vs LY, sales per m².'}</p>
              <span className="more">{isRu ? 'Открыть демо →' : 'Open demo →'}</span>
            </Link>
            <Link className="card ops-card" href={localePath(locale, '/products/demos/manufacturing')}>
              <h3>{isRu ? 'OEE завода' : 'Plant OEE'}</h3>
              <p>{isRu ? 'Дефекты ≠ простой.' : 'Defect count is not downtime.'}</p>
              <span className="more">{isRu ? 'Открыть демо →' : 'Open demo →'}</span>
            </Link>
            <Link className="card ops-card" href={localePath(locale, '/products/demos/ecommerce')}>
              <h3>{isRu ? 'Интернет-торговля: исполнение' : 'E-commerce fulfillment'}</h3>
              <p>{isRu ? 'Оборот растёт, маржа падает.' : 'GMV up, margin down.'}</p>
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

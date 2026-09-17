import Link from 'next/link';
import type { Metadata } from 'next';
import { alfakitUrl, localePath, personalUrl, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({
    locale,
    path: '/about',
    title: 'About — Semper In Motu',
    description: 'AI & Data Engineering for Business — two engineers, analytics and delivery.',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isRu = locale === 'ru' || locale === 'be';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">About</div>
          <h1>{isRu ? 'Знания → системы' : 'Knowledge → systems'}</h1>
          <p className="lead">
            {isRu
              ? 'Два инженера с общим AI-бэкграундом: аналитика, данные, delivery и интерфейсы. Не staffing-агентство.'
              : 'Two engineers with a shared AI background: analytics, data, delivery and interfaces. Not a staffing shop.'}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid-2">
          <div className="panel">
            <h3>Vitaly</h3>
            <p className="muted">
              {isRu
                ? 'Discovery · KPI · DWH/BI · logistics domain · SMART / writeback. 20+ лет TMS/CRM/ERP/BI, AI+GIS с 2003.'
                : 'Discovery · KPI · DWH/BI · logistics domain · SMART / writeback. 20+ years TMS/CRM/ERP/BI, AI+GIS since 2003.'}
            </p>
            <a className="more" href={personalUrl(locale)}>
              vitalykhoruzhko.com →
            </a>
          </div>
          <div className="panel">
            <h3>{isRu ? 'Engineering partner' : 'Engineering partner'}</h3>
            <p className="muted">
              {isRu
                ? 'Delivery · FE/full-stack · ML · team lead · production UI для агентов и BI.'
                : 'Delivery · FE/full-stack · ML · team lead · production UI for agents and BI.'}
            </p>
            <Link className="more" href={localePath(locale, '/capabilities/engineering')}>
              {isRu ? 'AI Engineering →' : 'AI Engineering →'}
            </Link>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: '1.5rem' }}>
          <div className="panel">
            <h3>Ops Systems</h3>
            <p className="muted">ALFAKIT Care (→ alfakit.by) · SMART · KPI POC · Data / DWH</p>
            <Link className="more" href={localePath(locale, '/solutions/logistics')}>
              {isRu ? 'Logistics →' : 'Logistics →'}
            </Link>
          </div>
          <Link className="btn btn-ink" style={{ marginTop: '1.5rem', display: 'inline-flex' }} href={localePath(locale, '/contact')}>
            {isRu ? 'Связаться' : 'Contact us'}
          </Link>
          <p className="fine" style={{ marginTop: '1rem' }}>
            <a href={alfakitUrl(locale)}>alfakit.by</a>
          </p>
        </div>
      </section>
    </main>
  );
}

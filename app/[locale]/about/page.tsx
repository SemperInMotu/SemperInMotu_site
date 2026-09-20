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
    title: locale === 'ru' ? 'О студии — Semper In Motu' : 'About — Semper In Motu',
    description:
      locale === 'ru'
        ? 'ИИ и данные для бизнеса — два инженера, аналитика и разработка.'
        : 'AI & Data Engineering for Business — two engineers, analytics and delivery.',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isRu = locale === 'ru';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{isRu ? 'О студии' : 'About'}</div>
          <h1>{isRu ? 'Знания → системы' : 'Knowledge → systems'}</h1>
          <p className="lead">
            {isRu
              ? 'Два инженера с общим бэкграундом по ИИ: аналитика, данные, разработка и интерфейсы. Не агентство по подбору персонала.'
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
                ? 'Знакомство · KPI · хранилища и отчёты · логистика · SMART / запись в систему. 20+ лет TMS/CRM/ERP, ИИ и ГИС с 2003.'
                : 'Discovery · KPI · DWH/BI · logistics domain · SMART / writeback. 20+ years TMS/CRM/ERP/BI, AI+GIS since 2003.'}
            </p>
            <a className="more" href={personalUrl(locale)}>
              vitalykhoruzhko.com →
            </a>
          </div>
          <div className="panel">
            <h3>{isRu ? 'Партнёр по разработке' : 'Engineering partner'}</h3>
            <p className="muted">
              {isRu
                ? 'Поставка · интерфейсы и полный стек · машинное обучение · тимлид · промышленный UI для агентов и отчётов.'
                : 'Delivery · FE/full-stack · ML · team lead · production UI for agents and BI.'}
            </p>
            <Link className="more" href={localePath(locale, '/capabilities/engineering')}>
              {isRu ? 'Разработка ИИ →' : 'AI Engineering →'}
            </Link>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: '1.5rem' }}>
          <div className="panel">
            <h3>{isRu ? 'Операционные системы' : 'Ops Systems'}</h3>
            <p className="muted">
              {isRu
                ? 'ALFAKIT Care (→ alfakit.by) · SMART · KPI-пилот · данные и хранилища'
                : 'ALFAKIT Care (→ alfakit.by) · SMART · KPI POC · Data / DWH'}
            </p>
            <Link className="more" href={localePath(locale, '/solutions/logistics')}>
              {isRu ? 'Логистика →' : 'Logistics →'}
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

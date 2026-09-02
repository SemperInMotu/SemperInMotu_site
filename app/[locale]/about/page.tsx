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
    description: 'Semper In Motu: Ops agency — Data/DWH, ALFAKIT SMART, KPI POC.',
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
          <h1>Ops: {isRu ? 'знания → системы' : 'knowledge → systems'}</h1>
          <p className="lead">
            Semper In Motu — {isRu ? 'ops-практика' : 'an ops practice'} for logistics: ALFAKIT TMS Care (Domino),
            Data/DWH, ALFAKIT SMART and KPI pilots. Care storefront —{' '}
            <a href={alfakitUrl(locale)}>alfakit.by</a>; portfolio —{' '}
            <a href={personalUrl(locale)}>vitalykhoruzhko.com</a>.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="panel">
            <h3>Ops Systems</h3>
            <p className="muted">ALFAKIT Care (→ alfakit.by) · SMART · KPI POC · Data / DWH</p>
            <Link className="more" href={localePath(locale, '/ops')}>
              {isRu ? 'Открыть →' : 'Open →'}
            </Link>
          </div>
          <Link className="btn btn-ink" style={{ marginTop: '1.5rem', display: 'inline-flex' }} href={localePath(locale, '/contact')}>
            {isRu ? 'Связаться' : 'Contact us'}
          </Link>
        </div>
      </section>
    </main>
  );
}

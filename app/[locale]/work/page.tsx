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
    path: '/work',
    title: 'Work — Semper In Motu',
    description: 'Semper In Motu cases: Ops, SMART, Data.',
  });
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isRu = locale === 'ru' || locale === 'be';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Work</div>
          <h1>{isRu ? 'Кейсы Ops' : 'Ops evidence'}</h1>
          <p className="lead">{isRu ? 'Кейсы по data и AI поверх операций.' : 'Agency cases on data and AI over operations.'}</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="panel" id="ops">
            <h3>{isRu ? 'Conversation intelligence на живых звонках' : 'Conversation intelligence on live calls'}</h3>
            <p className="muted">
              {isRu
                ? 'Транспортный оператор (BY/CEE): PBX → ASR → score/extract → approve → CRM. ALFAKIT SMART + MikoPBX.'
                : 'Transport operator (BY/CEE): PBX → ASR → score/extract → approve → CRM. ALFAKIT SMART + MikoPBX pilot.'}
            </p>
            <Link className="btn btn-ink" style={{ marginTop: '1rem', display: 'inline-flex' }} href={`${localePath(locale, '/contact')}?topic=smart`}>
              {isRu ? 'Обсудить похожий pilot' : 'Discuss a similar pilot'}
            </Link>
          </div>
          <div className="panel" id="data" style={{ marginTop: '1.25rem' }}>
            <h3>{isRu ? 'Отраслевые витрины данных' : 'Industry data marts'}</h3>
            <p className="muted">
              {isRu
                ? 'Синтетические демо: logistics OTIF, retail, plant OEE, e-commerce.'
                : 'Synthetic demos: logistics OTIF tower, retail store ops, plant OEE, e-commerce fulfillment.'}
            </p>
            <Link className="btn btn-line" style={{ marginTop: '1rem', display: 'inline-flex' }} href={localePath(locale, '/ops/demos')}>
              {isRu ? 'Открыть демо →' : 'Open demos →'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

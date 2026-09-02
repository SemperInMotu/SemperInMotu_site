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
    path: '/ops/smart',
    title: 'ALFAKIT SMART — Semper In Motu',
    description: 'ALFAKIT SMART: call transcripts, scoring, CRM extraction and Telegram Q&A.',
  });
}

export default async function SmartPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isRu = locale === 'ru' || locale === 'be';

  return (
    <main>
      <section className="page-hero ops">
        <div className="wrap">
          <div className="eyebrow ops">Ops · Module</div>
          <h1>ALFAKIT SMART — {isRu ? 'разговоры → действия в CRM' : 'conversations → CRM actions'}</h1>
          <p className="lead">
            {isRu
              ? 'Транскрипты переговоров (MikoPBX и др.), скоринг, extract ставок и обещаний, Telegram Q&A, digest владельцу.'
              : 'Call transcripts (MikoPBX and others), scoring, extraction of rates and commitments, Telegram Q&A, owner digest.'}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <h2>Pipeline</h2>
          <div className="pipeline" style={{ margin: '1rem 0 2rem' }}>
            <span>PBX</span>
            <i>→</i>
            <span>ASR</span>
            <i>→</i>
            <span>score / extract</span>
            <i>→</i>
            <span>KB</span>
            <i>→</i>
            <span>approve</span>
            <i>→</i>
            <span>writeback CRM</span>
          </div>
          <h2>{isRu ? 'Тарифы (ориентир)' : 'Indicative pricing'}</h2>
          <div className="table-wrap" style={{ marginTop: '1rem' }}>
            <table>
              <thead>
                <tr>
                  <th>{isRu ? 'Тариф' : 'Plan'}</th>
                  <th>{isRu ? 'Ориентир' : 'Indicative price'}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Starter</td>
                  <td>from $800–1.2k / month</td>
                </tr>
                <tr>
                  <td>Growth</td>
                  <td>from $1.5–2.5k / month</td>
                </tr>
                <tr>
                  <td>Ops</td>
                  <td>from $2.5–4k / month</td>
                </tr>
                <tr>
                  <td>Usage</td>
                  <td>ASR/LLM pass-through + 20–30%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
            <Link className="btn btn-ink" href={`${localePath(locale, '/contact')}?topic=smart`}>
              {isRu ? 'Запросить демо / pilot' : 'Request a demo / pilot'}
            </Link>
            <Link className="btn btn-line" href={localePath(locale, '/ops/poc')}>
              KPI POC →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

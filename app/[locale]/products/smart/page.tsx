import Link from 'next/link';
import type { Metadata } from 'next';
import { asLocale, localePath } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = asLocale((await params).locale);
  return pageMetadata({
    locale,
    path: '/products/smart',
    title: 'ALFAKIT SMART — Semper In Motu',
    description:
      locale === 'ru'
        ? 'ALFAKIT SMART: расшифровка звонков, оценка, извлечение в CRM и ответы в Telegram.'
        : 'ALFAKIT SMART: call transcripts, scoring, CRM extraction and Telegram Q&A.',
  });
}

export default async function SmartPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = asLocale((await params).locale);
  const isRu = locale === 'ru';

  return (
    <main>
      <section className="page-hero ops">
        <div className="wrap">
          <div className="eyebrow ops">{isRu ? 'Продукт · модуль' : 'Ops · Module'}</div>
          <h1>ALFAKIT SMART — {isRu ? 'разговоры → действия в CRM' : 'conversations → CRM actions'}</h1>
          <p className="lead">
            {isRu
              ? 'Расшифровка переговоров (MikoPBX и др.), оценка качества, извлечение ставок и обещаний, ответы в Telegram, сводка владельцу.'
              : 'Call transcripts (MikoPBX and others), scoring, extraction of rates and commitments, Telegram Q&A, owner digest.'}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <h2>{isRu ? 'Цепочка' : 'Pipeline'}</h2>
          <div className="pipeline" style={{ margin: '1rem 0 2rem' }}>
            {isRu ? (
              <>
                <span>АТС</span>
                <i>→</i>
                <span>распознавание речи</span>
                <i>→</i>
                <span>оценка / извлечение</span>
                <i>→</i>
                <span>база знаний</span>
                <i>→</i>
                <span>подтверждение</span>
                <i>→</i>
                <span>запись в CRM</span>
              </>
            ) : (
              <>
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
              </>
            )}
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
                  <td>{isRu ? 'от $800–1,2k / мес' : 'from $800–1.2k / month'}</td>
                </tr>
                <tr>
                  <td>Growth</td>
                  <td>{isRu ? 'от $1,5–2,5k / мес' : 'from $1.5–2.5k / month'}</td>
                </tr>
                <tr>
                  <td>Ops</td>
                  <td>{isRu ? 'от $2,5–4k / мес' : 'from $2.5–4k / month'}</td>
                </tr>
                <tr>
                  <td>{isRu ? 'По использованию' : 'Usage'}</td>
                  <td>{isRu ? 'распознавание/модель по факту + 20–30%' : 'ASR/LLM pass-through + 20–30%'}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
            <Link className="btn btn-ink" href={`${localePath(locale, '/contact')}?topic=smart`}>
              {isRu ? 'Запросить демо / пилот' : 'Request a demo / pilot'}
            </Link>
            <Link className="btn btn-line" href={localePath(locale, '/products/poc')}>
              {isRu ? 'KPI-пилот →' : 'KPI POC →'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

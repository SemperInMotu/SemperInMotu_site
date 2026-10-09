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
    path: '/work',
    title: locale === 'ru' ? 'Кейсы — Semper In Motu' : 'Work — Semper In Motu',
    description:
      locale === 'ru'
        ? 'Кейсы Semper In Motu: операции, SMART, данные.'
        : 'Semper In Motu cases: Ops, SMART, Data.',
  });
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = asLocale((await params).locale);
  const isRu = locale === 'ru';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{isRu ? 'Кейсы' : 'Work'}</div>
          <h1>{isRu ? 'Кейсы по операциям' : 'Ops evidence'}</h1>
          <p className="lead">
            {isRu
              ? 'Кейсы по данным и ИИ поверх операций.'
              : 'Agency cases on data and AI over operations.'}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="panel" id="ops">
            <h3>{isRu ? 'Разведка переговоров на живых звонках' : 'Conversation intelligence on live calls'}</h3>
            <p className="muted">
              {isRu
                ? 'Транспортный оператор (Беларусь / Восточная Европа): АТС → распознавание речи → оценка/извлечение → подтверждение → CRM. ALFAKIT SMART + MikoPBX.'
                : 'Transport operator (BY/CEE): PBX → ASR → score/extract → approve → CRM. ALFAKIT SMART + MikoPBX pilot.'}
            </p>
            <Link
              className="btn btn-ink"
              style={{ marginTop: '1rem', display: 'inline-flex' }}
              href={`${localePath(locale, '/contact')}?topic=smart`}
            >
              {isRu ? 'Обсудить похожий пилот' : 'Discuss a similar pilot'}
            </Link>
          </div>
          <div className="panel" id="data" style={{ marginTop: '1.25rem' }}>
            <h3>{isRu ? 'Отраслевые витрины данных' : 'Industry data marts'}</h3>
            <p className="muted">
              {isRu
                ? 'Синтетические демо: своевременность в логистике, розница, OEE завода, интернет-торговля.'
                : 'Synthetic demos: logistics OTIF tower, retail store ops, plant OEE, e-commerce fulfillment.'}
            </p>
            <Link
              className="btn btn-line"
              style={{ marginTop: '1rem', display: 'inline-flex' }}
              href={localePath(locale, '/products/demos')}
            >
              {isRu ? 'Открыть демо →' : 'Open demos →'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

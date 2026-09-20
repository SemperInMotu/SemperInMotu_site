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
    path: '/solutions/sales-ops',
    title: 'Sales ops AI — Semper In Motu',
    description: 'Conversation intelligence: calls to CRM with scoring, extract and approval gates.',
  });
}

export default async function SalesOpsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isRu = locale === 'ru';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{isRu ? 'Решения' : 'Solutions'}</div>
          <h1>{isRu ? 'Продажи' : 'Sales ops'}</h1>
          <p className="lead">
            {isRu
              ? 'Разговоры → действия в CRM. Не «ещё один чат-бот» — запись в систему после подтверждения.'
              : 'Conversations → CRM actions. Not another chatbot — approved writeback.'}
          </p>
          <div className="cta-row">
            <Link className="btn btn-ink" href={localePath(locale, '/products/smart')}>
              SMART →
            </Link>
            <Link className="btn btn-ghost" href={`${localePath(locale, '/contact')}?topic=smart`}>
              {isRu ? 'Обсудить' : 'Discuss'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

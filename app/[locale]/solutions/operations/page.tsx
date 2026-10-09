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
    path: '/solutions/operations',
    title: 'Operations AI — Semper In Motu',
    description: 'Exception desk, SOP Q&A with citations, shadow mode agents.',
  });
}

export default async function OperationsSolutionPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = asLocale((await params).locale);
  const isRu = locale === 'ru';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{isRu ? 'Решения' : 'Solutions'}</div>
          <h1>{isRu ? 'Операции' : 'Operations'}</h1>
          <p className="lead">
            {isRu
              ? 'Стол исключений, ответы по регламентам со ссылками на источники, режим черновика до автоподтверждения.'
              : 'Exception desk, SOP Q&A with citations, shadow mode before auto-approve.'}
          </p>
          <div className="cta-row">
            <Link className="btn btn-ink" href={localePath(locale, '/products/poc')}>
              {isRu ? 'KPI-пилот →' : 'KPI POC →'}
            </Link>
            <Link className="btn btn-ghost" href={localePath(locale, '/methods/shadow-mode')}>
              {isRu ? 'Режим черновика →' : 'Shadow mode →'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

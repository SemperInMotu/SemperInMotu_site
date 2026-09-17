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
    path: '/solutions/operations',
    title: 'Operations AI — Semper In Motu',
    description: 'Exception desk, SOP Q&A with citations, shadow mode agents.',
  });
}

export default async function OperationsSolutionPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isRu = locale === 'ru' || locale === 'be';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Solutions</div>
          <h1>Operations</h1>
          <p className="lead">
            {isRu
              ? 'Exception desk, Q&A по регламентам с citations, shadow mode до auto-approve.'
              : 'Exception desk, SOP Q&A with citations, shadow mode before auto-approve.'}
          </p>
          <div className="cta-row">
            <Link className="btn btn-ink" href={localePath(locale, '/products/poc')}>
              KPI POC →
            </Link>
            <Link className="btn btn-ghost" href={localePath(locale, '/methods/shadow-mode')}>
              Shadow mode →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

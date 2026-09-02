import Link from 'next/link';
import type { Metadata } from 'next';
import { opsIndexCopy, pick } from '@/lib/copy';
import { alfakitUrl, localePath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = pick(opsIndexCopy, locale as Locale);
  return pageMetadata({
    locale: locale as Locale,
    path: '/ops',
    title: copy.title,
    description: copy.description,
  });
}

function cardHref(locale: Locale, card: (typeof opsIndexCopy.en.cards)[number]) {
  if (card.external) return card.href.includes('alfakit') ? alfakitUrl(locale) : card.href;
  return localePath(locale, card.href);
}

export default async function OpsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const copy = pick(opsIndexCopy, locale);

  return (
    <main>
      <section className="page-hero ops">
        <div className="wrap">
          <div className="eyebrow ops">{copy.eyebrow}</div>
          <h1>{copy.h1}</h1>
          <p className="lead">{copy.lead}</p>
          <Link className="btn btn-ink" href={`${localePath(locale, '/contact')}?topic=ops`}>
            {copy.cta}
          </Link>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid-3">
          {copy.cards.map((card) =>
            card.external ? (
              <a key={card.title} className="card ops-card" href={cardHref(locale, card)}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <span className="more">{card.more}</span>
              </a>
            ) : (
              <Link key={card.title} className="card ops-card" href={cardHref(locale, card)}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <span className="more">{card.more}</span>
              </Link>
            ),
          )}
        </div>
      </section>
      <section className="section-tight">
        <div className="wrap">
          <h2>{copy.howTitle}</h2>
          <div className="steps" style={{ marginTop: '1rem' }}>
            {copy.steps.map((step) => (
              <div key={step} className="step">
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

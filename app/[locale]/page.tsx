import Link from 'next/link';
import type { Metadata } from 'next';
import { HeroShell } from '@/components/HeroMap';
import { homeCopy, pick } from '@/lib/copy';
import { localePath, personalUrl, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = pick(homeCopy, locale as Locale);
  return pageMetadata({
    locale: locale as Locale,
    path: '/',
    title: copy.title,
    description: copy.description,
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const copy = pick(homeCopy, locale);

  return (
    <main>
      <HeroShell>
        <div className="wrap">
          <h1 className="brand-mark">Semper In Motu</h1>
          <p className="hero-lead">{copy.lead}</p>
          <p className="hero-support">{copy.support}</p>
          <div className="cta-row">
            <Link className="btn btn-signal" href={localePath(locale, '/ops')}>
              {copy.ctaOps}
            </Link>
            <Link className="btn btn-ghost" href={localePath(locale, '/contact')}>
              {copy.ctaContact}
            </Link>
          </div>
          <p className="trust">{copy.trust}</p>
        </div>
      </HeroShell>
      <section className="section">
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem 1.5rem' }}>
          <Link className="btn btn-line" href={localePath(locale, '/work')}>
            {copy.viewWork}
          </Link>
          <a className="btn btn-line" href={personalUrl(locale)}>
            {copy.allProjects}
          </a>
        </div>
      </section>
    </main>
  );
}

import Link from 'next/link';
import type { Metadata } from 'next';
import { getJournalPost, journalCopy, journalPosts } from '@/lib/journal';
import { localePath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = raw as Locale;
  const post = getJournalPost(slug);
  if (!post) return {};
  const c = journalCopy(post, locale);
  return pageMetadata({
    locale,
    path: post.href,
    title: `${c.title} — Semper In Motu`,
    description: c.description,
  });
}

export default async function JournalSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = raw as Locale;
  const post = getJournalPost(slug);
  if (!post) notFound();
  const isRu = locale === 'ru';
  const c = journalCopy(post, locale);

  return (
    <main>
      <article>
        <section className="page-hero">
          <div className="wrap">
            <div className="eyebrow">{isRu ? 'Журнал' : 'Journal'}</div>
            <p className="fine" style={{ marginBottom: '0.75rem' }}>
              <span className="tag" style={{ marginRight: '0.75rem' }}>
                {isRu ? post.tag.ru : post.tag.en}
              </span>
              {post.date} · {post.minutes} {isRu ? 'мин' : 'min'}
            </p>
            <h1>{c.title}</h1>
            <p className="lead">{c.lead}</p>
          </div>
        </section>
        <section className="section">
          <div className="wrap journal-article">
            {c.sections.map((s) => (
              <section key={s.h}>
                <h2>{s.h}</h2>
                {s.paras.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
                {s.list ? (
                  <ul className="list-clean">
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
            <div className="cta-row" style={{ marginTop: '2rem' }}>
              {post.slug === 'audit-provenance-hitl' ? (
                <>
                  <Link className="btn btn-ink" href={localePath(locale, '/methods/audit-lane')}>
                    {isRu ? 'Журнал действий →' : 'Audit lane →'}
                  </Link>
                  <Link className="btn btn-line" href={`${localePath(locale, '/contact')}?topic=other`}>
                    {isRu ? 'Обсудить' : 'Discuss'}
                  </Link>
                </>
              ) : (
                <>
                  <Link className="btn btn-ink" href={localePath(locale, '/products/smart')}>
                    ALFAKIT SMART →
                  </Link>
                  <Link className="btn btn-line" href={`${localePath(locale, '/contact')}?topic=smart`}>
                    {isRu ? 'Обсудить пилот' : 'Discuss a pilot'}
                  </Link>
                </>
              )}
              <Link className="btn btn-ghost" href={localePath(locale, '/journal')}>
                {isRu ? 'Все заметки' : 'All notes'}
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}

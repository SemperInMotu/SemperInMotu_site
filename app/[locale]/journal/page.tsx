import Link from 'next/link';
import type { Metadata } from 'next';
import { journalPosts } from '@/lib/journal';
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
    path: '/journal',
    title: locale === 'ru' ? 'Журнал — Semper In Motu' : 'Journal — Semper In Motu',
    description:
      locale === 'ru'
        ? 'Журнал Semper In Motu: ИИ в операциях, данные и метод.'
        : 'Semper In Motu Journal: ops AI, data and method notes.',
  });
}

export default async function JournalPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = asLocale((await params).locale);
  const isRu = locale === 'ru';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{isRu ? 'Журнал' : 'Journal'}</div>
          <h1>{isRu ? 'Заметки о системах' : 'Notes on systems'}</h1>
          <p className="lead">
            {isRu ? 'ИИ в операциях, данные и метод.' : 'Ops AI, data and method.'}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap post-list">
          {journalPosts.map((post) => {
            const c = isRu ? post.ru : post.en;
            return (
              <Link key={post.slug} className="post" href={localePath(locale, post.href)}>
                <span className="tag">{isRu ? post.tag.ru : post.tag.en}</span>
                <h3>{c.title}</h3>
                <p className="muted">{c.lead}</p>
                <span className="more">{isRu ? 'Читать →' : 'Read →'}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

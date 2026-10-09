import Link from 'next/link';
import type { Metadata } from 'next';
import { asLocale, localePath, type Locale } from '@/lib/i18n';
import { journalPosts } from '@/lib/journal';
import { pageMetadata } from '@/lib/metadata';
import { sitemapGroups, type SiteGroup } from '@/lib/sitemap-nav';

function groups(): SiteGroup[] {
  return sitemapGroups.map((group) => {
    if (group.id !== 'studio') return group;
    const journalLinks = journalPosts.map((post) => ({
      path: post.href,
      en: post.en.title,
      ru: post.ru.title,
    }));
    const links = [...group.links];
    const journalAt = links.findIndex((link) => link.path === '/journal');
    links.splice(journalAt + 1, 0, ...journalLinks);
    return { ...group, links };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale?: string }>;
}): Promise<Metadata> {
  const locale = asLocale((await params).locale);
  const isRu = locale === 'ru';
  return pageMetadata({
    locale,
    path: '/sitemap',
    title: isRu ? 'Карта сайта — Semper In Motu' : 'Sitemap — Semper In Motu',
    description: isRu
      ? 'Все страницы semperinmotu.com.'
      : 'Every page on semperinmotu.com.',
  });
}

export default async function SitemapPage({ params }: { params: Promise<{ locale?: string }> }) {
  const locale: Locale = asLocale((await params).locale);
  const isRu = locale === 'ru';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{isRu ? 'Навигация' : 'Navigate'}</div>
          <h1>{isRu ? 'Карта сайта' : 'Sitemap'}</h1>
          <p className="lead">
            {isRu ? 'Все публичные страницы студии.' : 'Every public page of the studio.'}
          </p>
        </div>
      </section>
      <section className="section">
        <div
          className="wrap"
          style={{
            display: 'grid',
            gap: '2rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
          }}
        >
          {groups().map((group) => (
            <div key={group.id}>
              <h2 style={{ fontSize: '1rem', margin: '0 0 0.5rem' }}>{isRu ? group.ru : group.en}</h2>
              <ul className="list-clean">
                {group.links.map((link) => (
                  <li key={link.path}>
                    <Link href={localePath(locale, link.path)}>{isRu ? link.ru : link.en}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

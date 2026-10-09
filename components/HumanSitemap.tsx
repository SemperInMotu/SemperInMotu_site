import Link from 'next/link';
import { localePath, type Locale } from '@/lib/i18n';
import { sitemapGroups, type SitePageGroup } from '@/lib/site-pages';

function Column({
  locale,
  groups,
}: {
  locale: Locale;
  groups: SitePageGroup[];
}) {
  const heading = locale === 'ru' ? 'Русский' : 'English';
  return (
    <section lang={locale} aria-label={heading}>
      <h2>{heading}</h2>
      {groups.map((group) => (
        <div className="sitemap-group" key={group.en}>
          <h3>{locale === 'ru' ? group.ru : group.en}</h3>
          <ul className="list-clean">
            {group.items.map((item) => {
              const href = localePath(locale, item.path);
              const label = locale === 'ru' ? item.ru : item.en;
              return (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                  <span className="sitemap-path">{href}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}

export function HumanSitemap({ locale }: { locale: Locale }) {
  const isRu = locale === 'ru';
  const groups = sitemapGroups();

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{isRu ? 'Карта сайта' : 'Sitemap'}</div>
          <h1>{isRu ? 'Все страницы' : 'All pages'}</h1>
          <p className="lead">
            {isRu
              ? 'Английский открывается без языкового префикса. Те же английские страницы по-прежнему доступны по /en/. Русские страницы — по /ru/. Старые адреса /ops/… перенаправляют на страницы ниже, /be/ — на русскую версию.'
              : 'English is served without a language prefix. The same English pages still open under /en/. Russian pages stay under /ru/. Legacy /ops/… addresses redirect to the pages below, and /be/ opens the Russian site.'}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <nav className="sitemap-cols" aria-label={isRu ? 'Карта сайта' : 'Sitemap'}>
            <Column locale="en" groups={groups} />
            <Column locale="ru" groups={groups} />
          </nav>
        </div>
      </section>
    </main>
  );
}

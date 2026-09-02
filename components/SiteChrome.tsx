'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  alfakitUrl,
  localePath,
  personalUrl,
  switchLocalePath,
  tChrome,
  type Locale,
} from '@/lib/i18n';

type NavKey = 'home' | 'ops' | 'work' | 'journal' | 'contact' | 'about';

export function SiteHeader({ locale, current }: { locale: Locale; current?: NavKey }) {
  const t = tChrome(locale);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const currentKey: NavKey | undefined =
    current ??
    (pathname.includes('/contact')
      ? 'contact'
      : pathname.includes('/about')
        ? 'about'
        : pathname.includes('/journal')
          ? 'journal'
          : pathname.includes('/work')
            ? 'work'
            : pathname.includes('/ops')
              ? 'ops'
              : pathname === localePath(locale, '/') || pathname === '/'
                ? 'home'
                : undefined);

  const links: { key: NavKey; href: string; label: string }[] = [
    { key: 'ops', href: localePath(locale, '/ops'), label: t.ops },
    { key: 'work', href: localePath(locale, '/work'), label: t.work },
    { key: 'journal', href: localePath(locale, '/journal'), label: t.journal },
  ];

  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Link className="brand" href={localePath(locale, '/')}>
          Semper In Motu <span>studio</span>
        </Link>
        <div className="header-tools">
          <nav className="lang-switch" aria-label="Language">
            {(['en', 'ru', 'be'] as const).map((code) =>
              code === locale ? (
                <span key={code} className="lang-current" aria-current="page">
                  {code.toUpperCase()}
                </span>
              ) : (
                <Link key={code} href={switchLocalePath(pathname, code)} hrefLang={code}>
                  {code.toUpperCase()}
                </Link>
              ),
            )}
          </nav>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {t.menu}
          </button>
        </div>
        <nav className={`nav${open ? ' is-open' : ''}`} id="site-nav">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              aria-current={currentKey === link.key ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="nav-cta"
            href={localePath(locale, '/contact')}
            aria-current={currentKey === 'contact' ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {t.contact}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = tChrome(locale);
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Semper In Motu</div>
            <p className="fine" style={{ color: 'rgba(238,243,240,.65)', maxWidth: '28rem', margin: 0 }}>
              {t.tagline}
            </p>
          </div>
          <div className="footer-col">
            <h4>{t.products}</h4>
            <ul>
              <li>
                <a href={alfakitUrl(locale)}>{t.alfakit}</a>
              </li>
              <li>
                <Link href={localePath(locale, '/ops/data')}>{t.data}</Link>
              </li>
              <li>
                <Link href={localePath(locale, '/ops/smart')}>{t.smart}</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t.contactCol}</h4>
            <ul>
              <li>
                <a href="mailto:info@semperinmotu.com">info@semperinmotu.com</a>
              </li>
              <li>
                <a href="https://t.me/N_FT210993" rel="noopener">
                  Telegram
                </a>
              </li>
              <li>
                <Link href={localePath(locale, '/contact')}>{t.formLink}</Link>
              </li>
              <li>
                <Link href={localePath(locale, '/about')}>{t.about}</Link>
              </li>
              <li>
                <a href={personalUrl(locale)}>{t.personal}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Semper In Motu</span>
          <span>{t.unp}</span>
          <span>
            <a href={alfakitUrl(locale)} style={{ color: 'inherit' }}>
              ALFAKIT Care
            </a>
          </span>
          <span>{t.always}</span>
        </div>
      </div>
    </footer>
  );
}

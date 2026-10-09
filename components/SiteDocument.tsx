import type { ReactNode } from 'react';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { SiteFooter, SiteHeader } from '@/components/SiteChrome';
import { YandexMetrika } from '@/components/YandexMetrika';
import type { Locale } from '@/lib/i18n';

export function SiteDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
        <YandexMetrika />
      </head>
      <body>
        <GoogleAnalytics />
        <SiteHeader locale={locale} />
        {children}
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { siteUrl } from '@/lib/i18n';

type MetaInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  robots?: string;
};

export function pageMetadata({
  locale,
  path,
  title,
  description,
  robots = 'index,follow',
}: MetaInput): Metadata {
  const url = siteUrl(locale, path);
  const languages: Record<string, string> = {
    en: siteUrl('en', path),
    ru: siteUrl('ru', path),
    be: siteUrl('be', path),
    'x-default': siteUrl('en', path),
  };

  return {
    title,
    description,
    robots,
    alternates: { canonical: url, languages },
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      images: [{ url: 'https://semperinmotu.com/assets/og-default.jpg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://semperinmotu.com/assets/og-default.jpg'],
    },
  };
}

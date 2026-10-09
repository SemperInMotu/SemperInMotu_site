import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import '../globals.css';
import { SiteDocument } from '@/components/SiteDocument';
import { isLocale, locales, type Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale = raw as Locale;

  return <SiteDocument locale={locale}>{children}</SiteDocument>;
}

import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import '../globals.css';
import { SiteShell } from '@/components/SiteShell';
import { isLocale, type Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return [{ locale: 'ru' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw) || raw === 'en') notFound();

  return <SiteShell locale={raw as Locale}>{children}</SiteShell>;
}

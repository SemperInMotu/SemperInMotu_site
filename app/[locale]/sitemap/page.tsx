import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HumanSitemap } from '@/components/HumanSitemap';
import { isLocale, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : 'en') as Locale;
  const isRu = locale === 'ru';
  return pageMetadata({
    locale,
    path: '/sitemap',
    title: isRu ? 'Карта сайта — Semper In Motu' : 'Sitemap — Semper In Motu',
    description: isRu
      ? 'Все публичные страницы semperinmotu.com. Английский без префикса, русский на /ru/.'
      : 'Every public page on semperinmotu.com. English has no prefix; Russian lives under /ru/.',
  });
}

export default async function SitemapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return <HumanSitemap locale={raw} />;
}

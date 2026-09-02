import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '@/app/demos.css';
import { DemoMount } from '@/components/DemoMount';
import { type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

const demos = ['logistics', 'retail', 'manufacturing', 'ecommerce'] as const;

export async function generateStaticParams() {
  return demos.flatMap((demo) =>
    (['en', 'ru', 'be'] as const).map((locale) => ({ locale, demo })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; demo: string }>;
}): Promise<Metadata> {
  const { locale, demo } = await params;
  if (!demos.includes(demo as (typeof demos)[number])) return {};
  return pageMetadata({
    locale: locale as Locale,
    path: `/ops/demos/${demo}`,
    title: `${demo} demo — Semper In Motu`,
    description: `Synthetic ${demo} BI demo by Semper In Motu.`,
  });
}

export default async function DemoPage({ params }: { params: Promise<{ demo: string }> }) {
  const { demo } = await params;
  if (!demos.includes(demo as (typeof demos)[number])) notFound();
  return <DemoMount demoId={demo} />;
}

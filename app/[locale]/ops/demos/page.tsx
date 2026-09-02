import type { Metadata } from 'next';
import '@/app/demos.css';
import { DemoMount } from '@/components/DemoMount';
import { type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({
    locale,
    path: '/ops/demos',
    title: 'Industry data demos — Semper In Motu',
    description: 'Synthetic BI demos for logistics, retail, manufacturing and e-commerce.',
  });
}

export default function DemosIndexPage() {
  return <DemoMount demoId="index" />;
}

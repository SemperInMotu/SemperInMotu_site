import { redirectLocale } from '@/lib/redirect';

const demos = ['logistics', 'retail', 'manufacturing', 'ecommerce'] as const;

export function generateStaticParams() {
  return demos.map((demo) => ({ demo }));
}

export default async function OpsDemoRedirect({
  params,
}: {
  params: Promise<{ locale: string; demo: string }>;
}) {
  const { locale, demo } = await params;
  redirectLocale(locale, `/products/demos/${demo}`);
}

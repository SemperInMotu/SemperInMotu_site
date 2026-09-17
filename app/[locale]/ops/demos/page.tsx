import { redirectLocale } from '@/lib/redirect';

export default async function OpsDemosRedirect({ params }: { params: Promise<{ locale: string }> }) {
  redirectLocale((await params).locale, '/products/demos');
}

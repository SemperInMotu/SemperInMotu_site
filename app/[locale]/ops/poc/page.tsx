import { redirectLocale } from '@/lib/redirect';

export default async function OpsPocRedirect({ params }: { params: Promise<{ locale: string }> }) {
  redirectLocale((await params).locale, '/products/poc');
}

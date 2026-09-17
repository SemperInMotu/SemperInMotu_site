import { redirectLocale } from '@/lib/redirect';

/** @deprecated Use /products/* — kept for parallel compare / bookmarks */
export default async function OpsDataRedirect({ params }: { params: Promise<{ locale: string }> }) {
  redirectLocale((await params).locale, '/products/data');
}

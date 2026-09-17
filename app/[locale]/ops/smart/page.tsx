import { redirectLocale } from '@/lib/redirect';

export default async function OpsSmartRedirect({ params }: { params: Promise<{ locale: string }> }) {
  redirectLocale((await params).locale, '/products/smart');
}

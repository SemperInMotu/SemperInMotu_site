import { redirectLocale } from '@/lib/redirect';

export default async function OpsRedirect({ params }: { params: Promise<{ locale: string }> }) {
  redirectLocale((await params).locale, '/solutions/logistics');
}

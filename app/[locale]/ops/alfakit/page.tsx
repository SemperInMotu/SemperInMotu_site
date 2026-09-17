import { redirectLocale } from '@/lib/redirect';

export default async function OpsAlfakitRedirect({ params }: { params: Promise<{ locale: string }> }) {
  redirectLocale((await params).locale, '/products/alfakit');
}

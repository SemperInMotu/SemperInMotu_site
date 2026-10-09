import { redirect } from 'next/navigation';
import { asLocale, alfakitUrl } from '@/lib/i18n';

export default async function AlfakitRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const locale = asLocale((await params).locale);
  redirect(alfakitUrl(locale));
}

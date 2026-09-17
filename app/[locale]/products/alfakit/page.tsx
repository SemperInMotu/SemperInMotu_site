import { redirect } from 'next/navigation';
import { alfakitUrl, type Locale } from '@/lib/i18n';

export default async function AlfakitRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  redirect(alfakitUrl(locale));
}

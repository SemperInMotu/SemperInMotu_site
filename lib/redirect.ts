import { redirect } from 'next/navigation';
import { localePath, type Locale } from '@/lib/i18n';

/** Static-export friendly locale redirect. */
export function redirectLocale(locale: string, path: string): never {
  redirect(localePath(locale as Locale, path));
}

import { redirect } from 'next/navigation';
import { asLocale, localePath } from '@/lib/i18n';

/** Static-export friendly locale redirect. Missing locale is English. */
export function redirectLocale(locale: string | undefined, path: string): never {
  redirect(localePath(asLocale(locale), path));
}

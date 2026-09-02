'use client';

import { useSearchParams } from 'next/navigation';
import { tChrome, type Locale } from '@/lib/i18n';

export function FormSentStatus({ locale }: { locale: Locale }) {
  const params = useSearchParams();
  if (params.get('sent') !== '1') return null;
  return (
    <p className="form-status" role="status" tabIndex={-1}>
      {tChrome(locale).sent}
    </p>
  );
}

import type { ReactNode } from 'react';
import '../globals.css';
import { SiteDocument } from '@/components/SiteDocument';

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteDocument locale="en">{children}</SiteDocument>;
}

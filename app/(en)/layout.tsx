import type { ReactNode } from 'react';
import '../globals.css';
import { SiteShell } from '@/components/SiteShell';

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}

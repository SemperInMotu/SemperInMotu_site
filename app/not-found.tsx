'use client';

import { useEffect } from 'react';

const target = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/sitemap/`;

export default function NotFound() {
  useEffect(() => {
    window.location.replace(target);
  }, []);

  return (
    <main>
      <p>
        <a href={target}>Sitemap</a>
      </p>
    </main>
  );
}

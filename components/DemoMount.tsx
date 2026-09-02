'use client';

import { useEffect, useRef } from 'react';

export function DemoMount({ demoId }: { demoId: string }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.setAttribute('data-demo-root', '');
    import('@/lib/demos/app.js').then(({ mountDemo }) => {
      mountDemo(demoId);
    });
  }, [demoId]);

  return <main ref={rootRef} className="demo-page" data-demo-root />;
}

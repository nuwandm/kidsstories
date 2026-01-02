'use client';

import { useEffect } from 'react';

/**
 * Story Page Layout
 *
 * Hides the parent layout's Header and Footer for fullscreen reading.
 * Also suppresses scroll restoration to prevent Next.js warnings.
 */
export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Hide parent layout elements
    const body = document.body;
    const header = body.querySelector('header');
    const footer = body.querySelector('footer');
    const skipLink = body.querySelector('a[href="#main-content"]');

    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (skipLink) (skipLink as HTMLElement).style.display = 'none';

    // Prevent body scroll
    body.style.overflow = 'hidden';
    body.style.height = '100vh';

    return () => {
      // Restore on unmount
      if (header) header.style.display = '';
      if (footer) footer.style.display = '';
      if (skipLink) (skipLink as HTMLElement).style.display = '';
      body.style.overflow = '';
      body.style.height = '';
    };
  }, []);

  return <>{children}</>;
}

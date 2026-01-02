'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';

/**
 * Conditional Layout Wrapper
 *
 * Hides Header and Footer on story pages to prevent
 * Next.js scroll restoration warnings with position: fixed
 */
export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStoryPage = pathname?.startsWith('/stories/');

  if (isStoryPage) {
    // Story pages: No header/footer, just the reader
    return <>{children}</>;
  }

  // Regular pages: Full layout with header and footer
  return (
    <>
      <Header />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}

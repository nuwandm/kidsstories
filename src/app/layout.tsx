import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

/**
 * Root layout for the Kids Stories website
 *
 * This layout wraps all pages and provides:
 * - Global metadata for SEO
 * - Consistent header and footer
 * - Font and theme configuration
 */

// Default metadata for the site (can be overridden per page)
export const metadata: Metadata = {
  // Base title template - individual pages append their titles
  title: {
    default: 'Kids Stories - Fun Stories for Children',
    template: '%s | Kids Stories',
  },
  // Default description for pages without custom descriptions
  description:
    'Discover magical stories for children! Read fun, educational, and entertaining stories perfect for kids under 10. New stories added regularly!',
  // Keywords for SEO
  keywords: [
    'kids stories',
    'children stories',
    'bedtime stories',
    'stories for kids',
    'read aloud stories',
    'picture books online',
    'free stories for children',
  ],
  // Author information
  authors: [{ name: 'Kids Stories Team' }],
  // Creator
  creator: 'Kids Stories',
  // Publisher
  publisher: 'Kids Stories',
  // Robots directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Open Graph metadata for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Kids Stories',
    title: 'Kids Stories - Fun Stories for Children',
    description:
      'Discover magical stories for children! Read fun, educational, and entertaining stories perfect for kids under 10.',
  },
  // Twitter card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Kids Stories - Fun Stories for Children',
    description:
      'Discover magical stories for children! Read fun, educational, and entertaining stories perfect for kids under 10.',
  },
  // Verification for search engines (add your IDs when ready)
  // verification: {
  //   google: 'your-google-verification-code',
  // },
};

// Viewport configuration for responsive design
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  // Theme color for browser chrome
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fffbeb' },
    { media: '(prefers-color-scheme: dark)', color: '#1e293b' },
  ],
};

/**
 * Root layout component
 *
 * Provides consistent structure across all pages:
 * - Semantic HTML structure
 * - Skip link for accessibility
 * - Header with navigation
 * - Main content area
 * - Footer
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Skip link for keyboard/screen reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-kid"
        >
          Skip to main content
        </a>

        {/* Site header with navigation */}
        <Header />

        {/* Main content area */}
        <main id="main-content" className="flex-grow">
          {children}
        </main>

        {/* Site footer */}
        <Footer />
      </body>
    </html>
  );
}

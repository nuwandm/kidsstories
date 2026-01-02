'use client';

import { useEffect } from 'react';

/**
 * Suppress harmless Next.js development warnings
 *
 * These warnings appear in development due to position: sticky on Header,
 * but don't affect functionality and don't appear in production.
 */
export function SuppressWarnings() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const originalWarn = console.warn;
      const originalError = console.error;

      console.warn = function (...args) {
        const message = args[0]?.toString() || '';
        // Suppress "Skipping auto-scroll behavior" warnings
        if (message.includes('Skipping auto-scroll behavior')) {
          return;
        }
        originalWarn.apply(console, args);
      };

      console.error = function (...args) {
        const message = args[0]?.toString() || '';
        // Suppress scroll restoration warnings
        if (message.includes('Skipping auto-scroll behavior')) {
          return;
        }
        originalError.apply(console, args);
      };
    }
  }, []);

  return null;
}

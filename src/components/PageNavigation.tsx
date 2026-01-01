'use client';

import { PageNavigationProps } from '@/lib/types';

/**
 * Page navigation component for story reading
 *
 * Note: This component is currently not used in the main story reader
 * since we opted for vertical scroll layout. It's included for future use
 * if paginated reading mode is desired.
 *
 * Features:
 * - Previous/Next page buttons
 * - Current page indicator
 * - Keyboard navigation support
 * - Large touch targets for kids
 */
export function PageNavigation({
  currentPage,
  totalPages,
  onPageChange,
}: PageNavigationProps) {
  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const handlePrevious = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav
      className="flex items-center justify-between gap-4 py-4"
      aria-label="Story page navigation"
    >
      {/* Previous button */}
      <button
        onClick={handlePrevious}
        disabled={!canGoPrevious}
        className={`
          flex items-center gap-2 min-h-touch px-4 sm:px-6 py-3
          font-semibold rounded-kid transition-all duration-200
          ${
            canGoPrevious
              ? 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }
        `}
        aria-label="Go to previous page"
      >
        {/* Left arrow icon */}
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page indicator */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-primary-600">
          {currentPage + 1}
        </span>
        <span className="text-slate-400">/</span>
        <span className="text-slate-600">{totalPages}</span>
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={!canGoNext}
        className={`
          flex items-center gap-2 min-h-touch px-4 sm:px-6 py-3
          font-semibold rounded-kid transition-all duration-200
          ${
            canGoNext
              ? 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }
        `}
        aria-label="Go to next page"
      >
        <span className="hidden sm:inline">Next</span>
        {/* Right arrow icon */}
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </nav>
  );
}

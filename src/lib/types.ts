/**
 * TypeScript type definitions for the Kids Stories website
 *
 * These types ensure type safety across the application and
 * define the contract for story data structures.
 */

/**
 * Represents a single page within a story
 * Each page has text content and an accompanying image
 */
export interface StoryPage {
  /** The narrative text for this page */
  text: string;
  /** Path to the page image (relative to public folder) */
  image: string;
}

/**
 * Represents a complete story with all its content
 * This is the full data structure stored in individual JSON files
 */
export interface Story {
  /** URL-friendly identifier for the story */
  slug: string;
  /** Display title of the story */
  title: string;
  /** Path to the cover image (relative to public folder) */
  coverImage: string;
  /** Array of story pages in reading order */
  pages: StoryPage[];
}

/**
 * Lightweight story metadata for the index
 *
 * Used on the home page to avoid loading full story content.
 * This keeps the home page bundle small even with 1000+ stories.
 *
 * Memory comparison for 1000 stories:
 * - Full stories: ~500KB+ (with all page text/images)
 * - Index items: ~50KB (just metadata)
 */
export interface StoryIndexItem {
  /** URL-friendly identifier for the story */
  slug: string;
  /** Display title of the story */
  title: string;
  /** Path to the cover image (relative to public folder) */
  coverImage: string;
}

/**
 * Props for the StoryCard component
 */
export interface StoryCardProps {
  story: StoryIndexItem;
  /** Whether this is a priority/featured story (affects image loading) */
  priority?: boolean;
}

/**
 * Props for the StoryReader component
 */
export interface StoryReaderProps {
  story: Story;
}

/**
 * Props for the PageNavigation component
 */
export interface PageNavigationProps {
  /** Current page index (0-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
}

/**
 * Props for the AdSlot component
 */
export interface AdSlotProps {
  /** Unique identifier for the ad slot */
  slotId: string;
  /** Ad format type */
  format?: 'horizontal' | 'vertical' | 'square';
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the MoreStories component
 */
export interface MoreStoriesProps {
  /** Slug of the current story (to exclude from recommendations) */
  currentSlug: string;
  /** Maximum number of stories to show */
  limit?: number;
}

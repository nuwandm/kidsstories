/**
 * TypeScript type definitions for the Kids Stories website
 *
 * These types ensure type safety across the application and
 * define the contract for story data structures.
 */

/**
 * Represents a single page within a story
 * Each page has an image and optional text
 *
 * Two scenarios supported:
 * 1. Separate text and image: Provide both `text` and `image`
 * 2. Text embedded in image: Provide only `image`, leave `text` empty or omit it
 */
export interface StoryPage {
  /** The narrative text for this page (optional - omit if text is embedded in image) */
  text?: string;
  /** Path to the page image (relative to public folder) */
  image: string;
}

/**
 * Age group categories for filtering stories
 */
export type AgeGroup = '3-5' | '6-8' | '9-12';

/**
 * Story categories for filtering
 */
export type Category = 'Adventure' | 'Fantasy' | 'Educational' | 'Bedtime' | 'Funny' | 'Animal' | 'Friendship' | 'Science';

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
  /** Date when the story was uploaded (ISO 8601 format) */
  uploadedDate: string;
  /** Target age group for the story */
  ageGroup: AgeGroup;
  /** Story category for filtering */
  category: Category;
  /** Array of story pages in reading order */
  pages: StoryPage[];
}

/**
 * Represents a PDF-based story
 * PDF files are stored in Cloudflare R2 bucket and loaded on demand
 */
export interface PdfStory {
  /** URL-friendly identifier for the story */
  slug: string;
  /** Display title of the story */
  title: string;
  /** Path to the cover image (relative to public folder) */
  coverImage: string;
  /** Date when the story was uploaded (ISO 8601 format) */
  uploadedDate: string;
  /** Target age group for the story */
  ageGroup: AgeGroup;
  /** Story category for filtering */
  category: Category;
  /**
   * PDF filename in R2 bucket (e.g., "story.pdf")
   * Will be combined with NEXT_PUBLIC_PDF_BUCKET_URL environment variable
   */
  pdfFileName: string;
  /** Number of pages in the PDF (optional, for progress display) */
  pageCount?: number;
  /** Indicates this is a PDF story */
  isPdf: true;
}

/**
 * Union type for both traditional page-based stories and PDF stories
 */
export type AnyStory = Story | PdfStory;

/**
 * Type guard to check if a story is a PDF story
 */
export function isPdfStory(story: AnyStory): story is PdfStory {
  return 'isPdf' in story && story.isPdf === true;
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
  /** Date when the story was uploaded (ISO 8601 format) */
  uploadedDate: string;
  /** Target age group for the story */
  ageGroup: AgeGroup;
  /** Story category for filtering */
  category: Category;
  /** Number of pages in the story (optional for backwards compatibility) */
  pageCount?: number;
  /** Indicates this is a PDF story (optional) */
  isPdf?: boolean;
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

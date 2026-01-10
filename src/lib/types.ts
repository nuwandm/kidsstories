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

// ==========================================
// LEARN SECTION TYPES
// ==========================================

/**
 * Continent type for countries
 */
export type Continent = 'Africa' | 'Asia' | 'Europe' | 'North America' | 'South America' | 'Oceania';

/**
 * Represents a country in the Countries Explorer
 */
export interface Country {
  slug: string;
  name: string;
  continent: Continent;
  flag: string;
  /** Path to flag image (e.g., "/images/learn/country/flags/japan.webp") */
  flagImage?: string;
  capital: string;
  languages: string[];
  greeting: string;
  funFacts: string[];
  landmarks: string[];
  animals: string[];
  foods: string[];
  ageContent: {
    '3-5': string;
    '6-8': string;
    '9-12': string;
  };
}

/**
 * Lightweight country metadata for index
 */
export interface CountryIndexItem {
  slug: string;
  name: string;
  continent: Continent;
  flag: string;
  /** Path to flag image (e.g., "/images/learn/country/flags/japan.webp") */
  flagImage?: string;
  capital: string;
}

/**
 * Category for famous people
 */
export type FamousPersonCategory = 'Scientist' | 'Inventor' | 'Artist' | 'Explorer' | 'Leader';

/**
 * Represents a famous person in the Famous People section
 */
export interface FamousPerson {
  slug: string;
  name: string;
  title: string;
  portrait: string;
  birthYear: number;
  deathYear?: number;
  country: string;
  category: FamousPersonCategory;
  famousFor: string;
  quote: string;
  achievements: string[];
  funFacts: string[];
  ageContent: {
    '3-5': string;
    '6-8': string;
    '9-12': string;
  };
}

/**
 * Lightweight famous person metadata for index
 */
export interface FamousPersonIndexItem {
  slug: string;
  name: string;
  title: string;
  portrait: string;
  category: FamousPersonCategory;
  famousFor: string;
}

/**
 * Animal type classification
 */
export type AnimalType = 'Mammal' | 'Bird' | 'Reptile' | 'Amphibian' | 'Fish' | 'Insect';

/**
 * Animal diet type
 */
export type AnimalDiet = 'Herbivore' | 'Carnivore' | 'Omnivore';

/**
 * Represents an animal in the Animal Kingdom section
 */
export interface Animal {
  slug: string;
  name: string;
  type: AnimalType;
  habitat: string[];
  diet: AnimalDiet;
  image: string;
  sound?: string;
  funFacts: string[];
  conservationStatus: string;
  ageContent: {
    '3-5': string;
    '6-8': string;
    '9-12': string;
  };
}

/**
 * Lightweight animal metadata for index
 */
export interface AnimalIndexItem {
  slug: string;
  name: string;
  type: AnimalType;
  image: string;
  habitat: string[];
}

/**
 * Category for fun facts
 */
export type FunFactCategory = 'Science' | 'Nature' | 'Animals' | 'Geography' | 'Space' | 'History';

/**
 * Represents a fun fact
 */
export interface FunFact {
  id: string;
  category: FunFactCategory;
  fact: string;
  image?: string;
  ageGroups: AgeGroup[];
}

// ==========================================
// PLAY SECTION TYPES
// ==========================================

/**
 * Memory game card
 */
export interface MemoryCard {
  id: string;
  image: string;
  name: string;
  matched: boolean;
  flipped: boolean;
}

/**
 * Memory game mode
 */
export type MemoryGameMode = 'flags' | 'animals' | 'people';

/**
 * Memory game difficulty
 */
export type MemoryDifficulty = 'easy' | 'medium' | 'hard';

/**
 * Memory game high score
 */
export interface MemoryHighScore {
  mode: MemoryGameMode;
  difficulty: MemoryDifficulty;
  moves: number;
  time: number;
  date: string;
}

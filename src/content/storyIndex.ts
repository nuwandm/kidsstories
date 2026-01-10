import { StoryIndexItem } from "@/lib/types";

/**
 * Lightweight story index for the home page
 *
 * IMPORTANT: This file contains ONLY metadata (slug, title, coverImage).
 * Full story content is stored in individual JSON files and loaded
 * only when needed on story pages.
 *
 * Performance benefits:
 * - Home page loads ~50 bytes per story instead of full content
 * - Scales to 1000+ stories without performance issues
 * - No story text or page images loaded until story is opened
 * - PDF stories load from Cloudflare R2 on demand (zero initial bundle impact)
 *
 * To add a new story:
 * 1. Create a JSON file in src/content/stories/{slug}.json
 * 2. Add images to public/images/stories/{slug}/
 * 3. Add an entry to this array
 *
 * For PDF stories:
 * 1. Upload PDF to Cloudflare R2 bucket
 * 2. Create JSON with pdfFileName and isPdf: true
 * 3. Add entry here with isPdf: true
 */
export const storyIndex: StoryIndexItem[] = [
  {
    slug: "sample-test",
    title: "Sample Test",
    coverImage: "/images/stories/sample-test/cover.webp",
    uploadedDate: "2026-01-10T10:00:00Z",
    ageGroup: "6-8",
    category: "Educational",
    pageCount: 1,
    isPdf: true, // PDF story from Cloudflare R2
  },
  {
    slug: "miko-banana-rescue",
    title: "Miko the Monkey and Ella the Elephant: The Great Banana Rescue",
    coverImage: "/images/stories/miko-banana-rescue/cover.webp",
    uploadedDate: "2026-01-09T10:00:00Z",
    ageGroup: "3-5",
    category: "Adventure",
    pageCount: 12,
    isPdf: true, // PDF story from Cloudflare R2
  },
  {
    slug: "jungle-friends-adventure",
    title: "Jungle Friends: Miko and Ella's Amazing Adventure",
    coverImage: "/images/stories/jungle-friends/cover.webp",
    uploadedDate: "2026-01-09T12:00:00Z",
    ageGroup: "6-8",
    category: "Friendship",
    pageCount: 12,
    isPdf: true, // PDF story from Cloudflare R2
  },
  {
    slug: "nila-and-kavi",
    title: "The Little Adventure of Nila and Kavi",
    // Using picsum.photos for placeholder images during development
    // Replace with local images for production: '/images/stories/nila-and-kavi/cover.webp'
    coverImage: "https://picsum.photos/seed/nila-cover/800/600",
    uploadedDate: "2025-12-28T10:00:00Z", // Recent - will show "New" badge
    ageGroup: "6-8",
    category: "Adventure",
    pageCount: 7,
  },
  {
    slug: "bunny-adventure",
    title: "The Brave Little Bunny",
    // Using picsum.photos for placeholder images during development
    // Replace with local images for production: '/images/stories/bunny-adventure/cover.webp'
    coverImage: "https://picsum.photos/seed/bunny-cover/800/600",
    uploadedDate: "2025-12-25T10:00:00Z",
    ageGroup: "3-5",
    category: "Animal",
    pageCount: 7,
  },
  {
    slug: "Bunny-big-day",
    title: "Bunny's Big Day",
    // Using picsum.photos for placeholder images during development
    // Replace with local images for production: '/images/stories/bunny-adventure/cover.webp'
    coverImage: "/images/stories/Bunny-big-day/cover.webp",
    uploadedDate: "2026-01-06T10:00:00Z",
    ageGroup: "3-5",
    category: "Educational",
    pageCount: 7,
  },
];

/**
 * Get the total number of stories
 * Useful for displaying counts on the home page
 */
export const getTotalStoryCount = (): number => storyIndex.length;

/**
 * Get stories for "More Stories" section
 * Excludes the current story and returns a random selection
 *
 * @param excludeSlug - Slug of the current story to exclude
 * @param limit - Maximum number of stories to return
 */
export const getRelatedStories = (
  excludeSlug: string,
  limit: number = 4
): StoryIndexItem[] => {
  const filtered = storyIndex.filter((story) => story.slug !== excludeSlug);

  // Shuffle and take the first 'limit' items
  // Using a simple Fisher-Yates shuffle variant
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, limit);
};

/**
 * Get the next story in the list
 * Returns null if current story is the last one
 *
 * @param currentSlug - Slug of the current story
 */
export const getNextStory = (currentSlug: string): StoryIndexItem | null => {
  const currentIndex = storyIndex.findIndex(
    (story) => story.slug === currentSlug
  );
  if (currentIndex === -1 || currentIndex === storyIndex.length - 1) {
    // If not found or last story, return a random different story
    const otherStories = storyIndex.filter(
      (story) => story.slug !== currentSlug
    );
    return otherStories.length > 0
      ? otherStories[Math.floor(Math.random() * otherStories.length)]
      : null;
  }
  return storyIndex[currentIndex + 1];
};

import { AgeGroup, Category, StoryIndexItem } from "@/lib/types";

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
    slug: "cinderella",
    title: "Cinderella and the Magic Shoes",
    // Using R2 for cover image: stories/cinderella/cover.webp
    coverImage: "stories/cinderella/cover.webp",
    uploadedDate: "2026-01-09T10:00:00Z",
    ageGroup: AgeGroup.PRESCHOOL,
    category: Category.FANTASY,
    pageCount: 12,
    isPdf: true, // PDF story from Cloudflare R2
  },
  {
    slug: "Panda-and-the-Big-Hug",
    title: "Panda and the Big Hug",
    coverImage: "stories/Panda-and-the-Big-Hug/cover.webp",
    uploadedDate: "2026-01-06T10:00:00Z",
    ageGroup: AgeGroup.PRESCHOOL,
    category: Category.ANIMAL,
    pageCount: 7,
  },
  {
    slug: "Mike-and-John-Great-Adventure",
    title: "Mike and John: The Great Adventure",
    coverImage: "stories/Mike-and-John-Great-Adventure/cover.webp",
    uploadedDate: "2026-01-06T10:00:00Z",
    ageGroup: AgeGroup.LATE_ELEMENTARY,
    category: Category.ADVENTURE,
    pageCount: 10,
  },
  {
    slug: "miko-banana-rescue",
    title: "Miko the Monkey and Ella the Elephant: The Great Banana Rescue",
    coverImage: "stories/miko-banana-rescue/cover.webp",
    uploadedDate: "2026-01-09T10:00:00Z",
    ageGroup: AgeGroup.PRESCHOOL,
    category: Category.ADVENTURE,
    pageCount: 12,
    isPdf: true, // PDF story from Cloudflare R2
  },
  {
    slug: "lumi-and-robot",
    title: "Lumi and the Little Ai Robot Who Learned to Care",
    // Using picsum.photos for placeholder images during development
    // Replace with local images for production: '/images/stories/bunny-adventure/cover.webp'
    coverImage: "stories/lumi-and-robot/cover.webp",
    uploadedDate: "2026-01-06T10:00:00Z",
    ageGroup: AgeGroup.EARLY_ELEMENTARY,
    category: Category.FRIENDSHIP, // "Friendship",
    pageCount: 12,
  },
  {
    slug: "robin",
    title: "Robin Hood - The Hero of Sherwood Forest",
    // Using picsum.photos for placeholder images during development
    // Replace with local images for production: '/images/stories/bunny-adventure/cover.webp'
    coverImage: "stories/robin/cover.webp",
    uploadedDate: "2026-01-06T10:00:00Z",
    ageGroup: AgeGroup.LATE_ELEMENTARY,
    category: Category.ADVENTURE,
    pageCount: 13,
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

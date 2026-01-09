import { Story, PdfStory, AnyStory, isPdfStory } from "./types";

/**
 * Loads a single story by its slug
 *
 * This function is designed to be called only on the server during
 * static generation. Each story is loaded individually to prevent
 * loading all stories into memory at once.
 *
 * Supports both traditional page-based stories and PDF stories.
 *
 * Performance notes:
 * - Uses dynamic import to load only the requested story
 * - Runs at build time, not at runtime
 * - Zero client-side bundle impact
 *
 * @param slug - The URL-friendly identifier for the story
 * @returns The complete story data (either Story or PdfStory)
 * @throws Error if the story file doesn't exist
 */
export async function loadStory(slug: string): Promise<AnyStory> {
  console.log("inside load Story function");
  try {
    // Dynamic import loads only the specific story JSON file
    // This is resolved at build time during static generation
    const storyModule = await import(`@/content/stories/${slug}.json`);

    // Handle both default export and direct module patterns
    const story: AnyStory = storyModule.default || storyModule;

    // Validate that the story has required fields
    if (!story.slug || !story.title) {
      throw new Error(`Invalid story format for slug: ${slug}`);
    }

    // Validate PDF story has pdfFileName
    if (isPdfStory(story) && !story.pdfFileName) {
      throw new Error(`PDF story "${slug}" is missing pdfFileName`);
    }

    // Validate regular story has pages
    if (!isPdfStory(story) && !story.pages) {
      throw new Error(`Story "${slug}" is missing pages array`);
    }

    return story;
  } catch (error) {
    // Re-throw with more context for debugging
    throw new Error(
      `Failed to load story "${slug}". Ensure the file exists at src/content/stories/${slug}.json`
    );
  }
}

// Re-export type guard for convenience
export { isPdfStory };

/**
 * Gets all story slugs for static generation
 *
 * This is used by generateStaticParams to pre-render all story pages
 * at build time. It imports only the lightweight index, not full stories.
 *
 * @returns Array of all story slugs
 */
export async function getAllStorySlugs(): Promise<string[]> {
  // Import the story index (lightweight, metadata only)
  const { storyIndex } = await import("@/content/storyIndex");
  return storyIndex.map((story) => story.slug);
}

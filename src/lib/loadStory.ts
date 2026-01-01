import { Story } from './types';

/**
 * Loads a single story by its slug
 *
 * This function is designed to be called only on the server during
 * static generation. Each story is loaded individually to prevent
 * loading all stories into memory at once.
 *
 * Performance notes:
 * - Uses dynamic import to load only the requested story
 * - Runs at build time, not at runtime
 * - Zero client-side bundle impact
 *
 * @param slug - The URL-friendly identifier for the story
 * @returns The complete story data
 * @throws Error if the story file doesn't exist
 */
export async function loadStory(slug: string): Promise<Story> {
  try {
    // Dynamic import loads only the specific story JSON file
    // This is resolved at build time during static generation
    const storyModule = await import(`@/content/stories/${slug}.json`);

    // Handle both default export and direct module patterns
    const story: Story = storyModule.default || storyModule;

    // Validate that the story has required fields
    if (!story.slug || !story.title || !story.pages) {
      throw new Error(`Invalid story format for slug: ${slug}`);
    }

    return story;
  } catch (error) {
    // Re-throw with more context for debugging
    throw new Error(
      `Failed to load story "${slug}". Ensure the file exists at src/content/stories/${slug}.json`
    );
  }
}

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
  const { storyIndex } = await import('@/content/storyIndex');
  return storyIndex.map((story) => story.slug);
}

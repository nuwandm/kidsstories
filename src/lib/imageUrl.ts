/**
 * Image URL Helper
 * Handles both local (public folder) and R2 (Cloudflare) images
 */

const R2_BASE_URL = process.env.NEXT_PUBLIC_PDF_BUCKET_URL || '';

/**
 * Get the full URL for an image
 *
 * @param path - Image path, can be:
 *   - Local path starting with "/" (e.g., "/images/logo.png")
 *   - R2 path without "/" (e.g., "FamousPersons/einstein/profile.webp")
 * @returns Full URL to the image
 */
export function getImageUrl(path: string | undefined): string {
  if (!path) return '';

  // If path starts with /, it's in public folder
  if (path.startsWith('/')) {
    return path;
  }

  // Otherwise, it's in R2 bucket
  return `${R2_BASE_URL}/${path}`;
}

/**
 * Check if an image is from R2
 */
export function isR2Image(path: string | undefined): boolean {
  if (!path) return false;
  return !path.startsWith('/');
}

/**
 * Get image path for famous person
 * Constructs the R2 path for famous person images
 */
export function getFamousPersonImageUrl(
  slug: string,
  type: 'profile' | 'cover'
): string {
  return getImageUrl(`FamousPersons/${slug}/${type}.webp`);
}

/**
 * Get PDF URL for a story
 * Constructs the R2 path for story PDFs
 */
export function getStoryPdfUrl(pdfFileName: string, slug: string): string {
  const R2_BASE_URL = process.env.NEXT_PUBLIC_PDF_BUCKET_URL || '';

  if (!R2_BASE_URL) {
    console.warn('NEXT_PUBLIC_PDF_BUCKET_URL is not configured');
    return pdfFileName;
  }

  // Encode the filename to handle spaces and special characters
  const encodedFileName = encodeURIComponent(pdfFileName);

  // PDFs are stored in 'stories/{slug}/' folder structure in R2
  return `${R2_BASE_URL}/stories/${slug}/${encodedFileName}`;
}

/**
 * Get cover image URL for a story from R2
 * Constructs the R2 path for story cover images
 *
 * @param slug - The story slug
 * @returns Full URL to the cover image in R2 bucket
 *
 * @example
 * getStoryCoverUrl('cinderella')
 * // Returns: https://pub-...r2.dev/stories/cinderella/cover.webp
 */
export function getStoryCoverUrl(slug: string): string {
  const R2_BASE_URL = process.env.NEXT_PUBLIC_PDF_BUCKET_URL || '';

  if (!R2_BASE_URL) {
    console.warn('NEXT_PUBLIC_PDF_BUCKET_URL is not configured');
    return '';
  }

  // Cover images follow the pattern: stories/{slug}/cover.webp
  return `${R2_BASE_URL}/stories/${slug}/cover.webp`;
}

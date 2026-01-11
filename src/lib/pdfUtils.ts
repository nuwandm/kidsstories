/**
 * PDF URL utilities for Cloudflare R2 storage
 *
 * PDFs are stored in Cloudflare R2 bucket and loaded on demand
 * when users open a PDF story. This keeps the main bundle small
 * and provides fast global CDN delivery.
 */

/**
 * Get the base URL for PDF storage from environment
 * Falls back to empty string if not configured
 */
export function getPdfBucketUrl(): string {
  return process.env.NEXT_PUBLIC_PDF_BUCKET_URL || '';
}

/**
 * Build full PDF URL from filename and slug
 *
 * @param pdfFileName - The PDF filename (will be URL encoded)
 * @param slug - The story slug (used for folder structure)
 * @returns Full URL to the PDF in R2 bucket
 *
 * @example
 * buildPdfUrl('cinderella.pdf', 'cinderella')
 * // Returns: https://pub-045678fbe1134176990c8f92088d9b70.r2.dev/stories/cinderella/cinderella.pdf
 */
export function buildPdfUrl(pdfFileName: string, slug?: string): string {
  const baseUrl = getPdfBucketUrl();

  if (!baseUrl) {
    console.warn('NEXT_PUBLIC_PDF_BUCKET_URL is not configured');
    return pdfFileName;
  }

  // Encode the filename to handle spaces and special characters
  const encodedFileName = encodeURIComponent(pdfFileName);

  // PDFs are stored in 'stories/{slug}/' folder structure in R2
  // If slug is provided, use folder structure: stories/slug/filename
  // Otherwise, use old structure: stories/filename (for backwards compatibility)
  if (slug) {
    return `${baseUrl}/stories/${slug}/${encodedFileName}`;
  } else {
    return `${baseUrl}/stories/${encodedFileName}`;
  }
}

/**
 * Validate that a PDF URL is accessible
 * Useful for debugging and health checks
 */
export async function validatePdfUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

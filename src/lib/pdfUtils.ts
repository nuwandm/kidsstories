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
 * Build full PDF URL from filename
 *
 * @param pdfFileName - The PDF filename (will be URL encoded)
 * @returns Full URL to the PDF in R2 bucket
 *
 * @example
 * buildPdfUrl('miko-banana-rescue.pdf')
 * // Returns: https://bucket.r2.dev/storysite/miko-banana-rescue.pdf
 */
export function buildPdfUrl(pdfFileName: string): string {
  const baseUrl = getPdfBucketUrl();

  if (!baseUrl) {
    console.warn('NEXT_PUBLIC_PDF_BUCKET_URL is not configured');
    return pdfFileName;
  }

  // Encode the filename to handle spaces and special characters
  const encodedFileName = encodeURIComponent(pdfFileName);

  return `${baseUrl}/${encodedFileName}`;
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

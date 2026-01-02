/**
 * Utility functions for the Kids Stories website
 */

/**
 * Check if a story is "new" (uploaded within the last 7 days)
 *
 * @param uploadedDate - ISO 8601 date string (e.g., "2024-01-15T10:30:00Z")
 * @returns true if the story was uploaded within the last 7 days
 */
export function isStoryNew(uploadedDate: string): boolean {
  const uploaded = new Date(uploadedDate);
  const now = new Date();
  const daysSinceUpload = (now.getTime() - uploaded.getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceUpload <= 7;
}

/**
 * Format a date for display
 *
 * @param dateString - ISO 8601 date string
 * @returns Formatted date string (e.g., "Jan 15, 2024")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

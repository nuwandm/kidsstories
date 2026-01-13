import { MetadataRoute } from 'next'

/**
 * Dynamic robots.txt generator
 * Uses environment variable for sitemap URL
 * Automatically uses correct domain (Vercel or custom)
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Uncomment if you want to disallow specific paths
      // disallow: ['/api/', '/admin/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}

import { MetadataRoute } from 'next'
import { storyIndex } from '@/content/storyIndex'
import { countryIndex } from '@/content/countries/countryIndex'
import { peopleIndex } from '@/content/famous-people/peopleIndex'
import { animalIndex } from '@/content/animals/animalIndex'

/**
 * Dynamic Sitemap Generator
 *
 * Automatically generates sitemap.xml for search engines
 * Includes all pages: main pages, stories, countries, famous people, and animals
 *
 * SEO Benefits:
 * - Helps search engines discover all content
 * - Provides priority and update frequency hints
 * - Includes last modified dates for better crawling
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  // Main navigation pages
  const mainRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/stories/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/learn/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/learn/countries/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/learn/famous-people/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/learn/animals/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Individual story pages
  const storyRoutes: MetadataRoute.Sitemap = storyIndex.map((story) => ({
    url: `${SITE_URL}/stories/${story.slug}/`,
    lastModified: new Date(story.uploadedDate),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Individual country pages
  const countryRoutes: MetadataRoute.Sitemap = countryIndex.map((country) => ({
    url: `${SITE_URL}/learn/countries/${country.slug}/`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Individual famous people pages
  const peopleRoutes: MetadataRoute.Sitemap = peopleIndex.map((person) => ({
    url: `${SITE_URL}/learn/famous-people/${person.slug}/`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Individual animal pages
  const animalRoutes: MetadataRoute.Sitemap = animalIndex.map((animal) => ({
    url: `${SITE_URL}/learn/animals/${animal.slug}/`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    ...mainRoutes,
    ...storyRoutes,
    ...countryRoutes,
    ...peopleRoutes,
    ...animalRoutes,
  ]
}

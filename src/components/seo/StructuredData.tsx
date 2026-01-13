/**
 * Structured Data (Schema.org) Components
 *
 * These components add JSON-LD structured data to pages for better SEO.
 * Helps search engines understand content and enables rich snippets.
 *
 * Learn more: https://schema.org/
 */

import { Story, Country, FamousPerson, Animal } from '@/lib/types'

/**
 * Organization Schema
 * Describes the website organization
 * Add to root layout for site-wide context
 */
export function OrganizationSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Kids Stories',
    description: 'Educational stories and learning content for children ages 3-12',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      // Add your social media URLs here when available
      // 'https://facebook.com/kidsstories',
      // 'https://twitter.com/kidsstories',
      // 'https://instagram.com/kidsstories',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Story/Article Schema
 * For individual story pages
 */
export function StorySchema({ story }: { story: Story }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: story.title,
    image: story.coverImage,
    datePublished: story.uploadedDate,
    dateModified: story.uploadedDate,
    author: {
      '@type': 'Organization',
      name: 'Kids Stories',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kids Stories',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    genre: story.category,
    keywords: `kids story, ${story.category}, ${story.ageGroup}, children's story, educational story`,
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: `children aged ${story.ageGroup}`,
    },
    inLanguage: 'en-US',
    isAccessibleForFree: true,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Breadcrumb Schema
 * Shows page hierarchy in search results
 */
interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Educational Content Schema
 * For learning section pages (countries, people, animals)
 */
export function EducationalContentSchema({
  name,
  description,
  type = 'LearningResource',
}: {
  name: string
  description: string
  type?: string
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    name: name,
    description: description,
    educationalLevel: 'beginner',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: 'children aged 3-12',
    },
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    publisher: {
      '@type': 'Organization',
      name: 'Kids Stories',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Place Schema
 * For country pages
 */
export function PlaceSchema({ country }: { country: Country }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: country.name,
    description: `Learn about ${country.name} - capital: ${country.capital}, continent: ${country.continent}`,
    geo: {
      '@type': 'GeoCoordinates',
      // Add actual coordinates if available
    },
    containedInPlace: {
      '@type': 'Continent',
      name: country.continent,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Person Schema
 * For famous people pages
 */
export function PersonSchema({ person }: { person: FamousPerson }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    description: person.famousFor,
    birthDate: person.birthYear.toString(),
    ...(person.deathYear && { deathDate: person.deathYear.toString() }),
    nationality: person.country,
    jobTitle: person.title,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * WebSite Schema
 * For the homepage - enables sitelinks search box
 */
export function WebSiteSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kids Stories',
    description: 'Educational stories and learning content for children',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/stories/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

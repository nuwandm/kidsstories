# Kids Stories - Complete Documentation

> A fast, SEO-friendly educational website for children featuring stories, famous people, countries, and animals. Built with Next.js 14 App Router and Cloudflare R2 for global content delivery.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Cloudflare R2 Setup](#cloudflare-r2-setup)
5. [Adding Stories](#adding-stories)
6. [Adding Famous People](#adding-famous-people)
7. [Adding Countries](#adding-countries)
8. [Adding Animals](#adding-animals)
9. [Features & UI Components](#features--ui-components)
10. [Deployment](#deployment)
11. [Performance Optimization](#performance-optimization)
12. [Troubleshooting](#troubleshooting)

---

## Project Overview

### Features

- **Learn Section**
  - Countries Explorer with real flags and cultural information
  - Famous People profiles (Facebook-style) with biographies
  - Animal Kingdom with sounds and fun facts

- **Stories Section**
  - PDF stories from Cloudflare R2
  - Traditional page-by-page stories
  - Advanced filtering (age group, category, search)
  - Reading progress tracking
  - Favorites system

- **Play Section**
  - Memory Match games
  - Educational mini-games

- **Technical Features**
  - Static Site Generation (SSG) for all pages
  - Optimized for 1000+ stories
  - Mobile-first responsive design
  - SEO optimized with dynamic metadata
  - Cloudflare R2 CDN for global content delivery
  - TypeScript for full type safety

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Images**: next/image with WebP format
- **Storage**: Cloudflare R2 (for PDFs and images)
- **Deployment**: Vercel

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
- Cloudflare R2 account (for images/PDFs)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd kidsstories

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Environment Variables

Create `.env.local` in the project root:

```bash
# Cloudflare R2 Base URL
NEXT_PUBLIC_PDF_BUCKET_URL=https://pub-045678fbe1134176990c8f92088d9b70.r2.dev
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Static files will be in .next directory
```

---

## Project Structure

```
kidsstories/
├── public/
│   └── images/
│       ├── stories/              # Local story cover images
│       └── learn/
│           └── country/flags/    # Country flag images
│
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   ├── stories/
│   │   │   ├── page.tsx          # Stories listing
│   │   │   └── [slug]/page.tsx   # Story reader
│   │   ├── learn/
│   │   │   ├── page.tsx          # Learn hub
│   │   │   ├── countries/        # Countries section
│   │   │   ├── famous-people/    # Famous people section
│   │   │   └── animals/          # Animals section
│   │   └── play/
│   │       └── memory/           # Memory game
│   │
│   ├── components/
│   │   ├── StoryCard.tsx         # Story card component
│   │   ├── PDFBookReader.tsx     # PDF viewer
│   │   ├── RecentlyRead.tsx      # Continue reading section
│   │   └── learn/                # Learn section components
│   │
│   ├── content/
│   │   ├── stories/
│   │   │   ├── {slug}.json       # Individual story data
│   │   │   └── storyIndex.ts     # Lightweight index
│   │   ├── countries/
│   │   │   ├── {slug}.json       # Country data
│   │   │   └── countryIndex.ts   # Country index
│   │   ├── famous-people/
│   │   │   ├── {slug}.json       # Person data
│   │   │   └── peopleIndex.ts    # People index
│   │   └── animals/
│   │       ├── {slug}.json       # Animal data
│   │       └── animalIndex.ts    # Animal index
│   │
│   └── lib/
│       ├── types.ts              # TypeScript interfaces
│       ├── imageUrl.ts           # Image URL helper (R2/local)
│       ├── pdfUtils.ts           # PDF URL builder
│       ├── storage.ts            # LocalStorage utilities
│       └── loadStory.ts          # Story loading utility
│
└── Configuration files
```

---

## Cloudflare R2 Setup

### What is Cloudflare R2?

Cloudflare R2 is an S3-compatible object storage service with:
- ✅ **Global CDN** - Fast delivery worldwide
- ✅ **Zero egress fees** - No charges for downloads
- ✅ **Scalability** - Store unlimited files
- ✅ **Low cost** - ~$0.10-0.50/month for typical usage
- ✅ **Update anytime** - No redeployment needed

### R2 Directory Structure

```
R2 Bucket Root (kids-stories-images)/
├── FamousPersons/
│   ├── albert-einstein/
│   │   ├── profile.webp
│   │   └── cover.webp
│   ├── marie-curie/
│   │   ├── profile.webp
│   │   └── cover.webp
│   └── {person-slug}/
│       ├── profile.webp
│       └── cover.webp
│
└── stories/
    ├── cinderella/
    │   ├── cinderella.pdf
    │   └── cover.webp
    ├── miko-banana-rescue/
    │   ├── miko-banana-rescue.pdf
    │   └── cover.webp
    └── {story-slug}/
        ├── {story-slug}.pdf
        └── cover.webp
```

### Setting Up R2

#### 1. Create R2 Bucket

1. Log in to Cloudflare Dashboard
2. Navigate to **R2** → **Create bucket**
3. Name your bucket (e.g., `kids-stories-images`)
4. Create bucket

#### 2. Configure Public Access

1. Go to bucket **Settings**
2. Enable **Public access**
3. Copy the public URL (e.g., `https://pub-xxxxx.r2.dev`)
4. Add to `.env.local` as `NEXT_PUBLIC_PDF_BUCKET_URL`

#### 3. Create Folder Structure

Create these folders in your R2 bucket:
- `FamousPersons/`
- `stories/`

### How Image URLs Work

The app uses an intelligent helper (`src/lib/imageUrl.ts`) that automatically detects image location:

```typescript
// R2 image (no leading /)
getImageUrl("FamousPersons/einstein/profile.webp")
// → "https://pub-xxxxx.r2.dev/FamousPersons/einstein/profile.webp"

// Local image (has leading /)
getImageUrl("/images/logo.png")
// → "/images/logo.png"
```

**Rule:** Paths starting with `/` are local, others are R2.

---

## Adding Stories

### Story Types

1. **PDF Stories** - Stored in R2, displayed with PDF viewer
2. **Page-by-Page Stories** - Traditional image + text format
3. **Mixed Format** - Some pages with text, some without

### Adding a PDF Story

#### Step 1: Prepare Files

1. **PDF File**
   - Format: PDF
   - Naming: `{slug}.pdf` (e.g., `cinderella.pdf`)
   - Size: Optimized for web (under 5MB recommended)

2. **Cover Image**
   - Format: WebP (preferred) or PNG/JPG
   - Size: 800x600px (4:3 aspect ratio)
   - Naming: `cover.webp`

#### Step 2: Upload to R2

1. Go to Cloudflare Dashboard → R2 → Your bucket
2. Navigate to `stories/` folder
3. Create folder: `{story-slug}/`
4. Upload both files:
   - `{story-slug}.pdf`
   - `cover.webp`

**Result URLs:**
- PDF: `https://pub-xxxxx.r2.dev/stories/{slug}/{slug}.pdf`
- Cover: `https://pub-xxxxx.r2.dev/stories/{slug}/cover.webp`

#### Step 3: Create Story JSON

Create `src/content/stories/{slug}.json`:

```json
{
  "slug": "my-story",
  "title": "My Amazing Story",
  "coverImage": "stories/my-story/cover.webp",
  "uploadedDate": "2026-01-11T10:00:00Z",
  "ageGroup": "6-8",
  "category": "Adventure",
  "pdfFileName": "my-story.pdf",
  "pageCount": 12,
  "isPdf": true
}
```

**Important:**
- `coverImage` - R2 path (no leading `/`)
- `pdfFileName` - Just the filename
- `isPdf` - Must be `true`

#### Step 4: Add to Story Index

Update `src/content/storyIndex.ts`:

```typescript
{
  slug: "my-story",
  title: "My Amazing Story",
  coverImage: "stories/my-story/cover.webp",
  uploadedDate: "2026-01-11T10:00:00Z",
  ageGroup: "6-8",
  category: "Adventure",
  pageCount: 12,
  isPdf: true,
}
```

#### Step 5: Rebuild

```bash
npm run build
```

### Adding a Page-by-Page Story

#### Step 1: Prepare Images

Create folder: `public/images/stories/{slug}/`

Add images:
- `cover.webp` - Cover image (800x600px)
- `page-1.webp`, `page-2.webp`, etc. - Page illustrations

**Image Specifications:**
- **With separate text**: 1200x800px (3:2 ratio)
- **Text embedded**: 1080x1440px (3:4 portrait ratio)

#### Step 2: Create Story JSON

Create `src/content/stories/{slug}.json`:

```json
{
  "slug": "my-story",
  "title": "My Amazing Story",
  "coverImage": "/images/stories/my-story/cover.webp",
  "uploadedDate": "2026-01-11T10:00:00Z",
  "ageGroup": "3-5",
  "category": "Animal",
  "pageCount": 5,
  "pages": [
    {
      "text": "Once upon a time...",
      "image": "/images/stories/my-story/page-1.webp"
    },
    {
      "text": "The hero embarked on an adventure...",
      "image": "/images/stories/my-story/page-2.webp"
    }
  ]
}
```

**For text embedded in image:**
```json
{
  "image": "/images/stories/my-story/page-1.webp"
}
```

Omit the `"text"` field entirely.

#### Step 3: Add to Story Index

Same as PDF stories (without `isPdf` field).

### Story Metadata Fields

All stories require these fields:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `slug` | string | URL identifier | `"my-story"` |
| `title` | string | Display title | `"My Story"` |
| `coverImage` | string | Cover path (R2 or local) | `"stories/my-story/cover.webp"` |
| `uploadedDate` | string | ISO 8601 date | `"2026-01-11T10:00:00Z"` |
| `ageGroup` | `"3-5"` \| `"6-8"` \| `"9-12"` | Target age | `"6-8"` |
| `category` | Category | Story type | `"Adventure"` |
| `pageCount` | number | Number of pages | `12` |
| `isPdf` | boolean | Is PDF story? | `true` |

**Categories:**
`Adventure`, `Fantasy`, `Educational`, `Bedtime`, `Funny`, `Animal`, `Friendship`, `Science`

---

## Adding Famous People

Famous people profiles use a Facebook-style layout with profile picture and cover image.

### Image Specifications

**Profile Picture:**
- Format: WebP (preferred) or PNG/JPG
- Aspect Ratio: 1:1 (square)
- Size: 400x400px or higher
- Content: Portrait/headshot

**Cover Photo:**
- Format: WebP (preferred) or PNG/JPG
- Aspect Ratio: 16:9 or 21:9 (wide banner)
- Size: 1200x400px or higher
- Content: Related to their work

### Adding a Person

#### Step 1: Upload to R2

1. Go to Cloudflare Dashboard → R2 → Your bucket
2. Navigate to `FamousPersons/` folder
3. Create folder: `{person-slug}/`
4. Upload both images:
   - `profile.webp`
   - `cover.webp`

**Result URLs:**
- Profile: `https://pub-xxxxx.r2.dev/FamousPersons/{slug}/profile.webp`
- Cover: `https://pub-xxxxx.r2.dev/FamousPersons/{slug}/cover.webp`

#### Step 2: Create Person JSON

Create `src/content/famous-people/{slug}.json`:

```json
{
  "slug": "marie-curie",
  "name": "Marie Curie",
  "title": "Physicist & Chemist",
  "portrait": "👩‍🔬",
  "profileImage": "FamousPersons/marie-curie/profile.webp",
  "coverImage": "FamousPersons/marie-curie/cover.webp",
  "birthYear": 1867,
  "deathYear": 1934,
  "country": "Poland/France",
  "category": "Scientist",
  "famousFor": "Discovering radioactivity and winning two Nobel Prizes",
  "quote": "Nothing in life is to be feared, it is only to be understood.",
  "achievements": [
    "Discovered radioactivity",
    "Won two Nobel Prizes",
    "First woman to win a Nobel Prize"
  ],
  "funFacts": [
    "She was the first woman to win a Nobel Prize!",
    "She won Nobel Prizes in two different sciences",
    "Her notebooks are still radioactive today!"
  ],
  "ageContent": {
    "3-5": "Marie was a scientist who discovered special rays...",
    "6-8": "Marie Curie studied invisible rays called radioactivity...",
    "9-12": "Marie Curie was a Polish-French physicist who conducted pioneering research on radioactivity..."
  }
}
```

**Important:**
- `profileImage` and `coverImage` - R2 paths (no leading `/`, no base URL)
- `category` - `Scientist`, `Inventor`, `Artist`, `Explorer`, or `Leader`

#### Step 3: Add to People Index

Update `src/content/famous-people/peopleIndex.ts`:

```typescript
{
  slug: "marie-curie",
  name: "Marie Curie",
  title: "Physicist & Chemist",
  portrait: "👩‍🔬",
  profileImage: "FamousPersons/marie-curie/profile.webp",
  category: "Scientist",
  famousFor: "Discovering radioactivity and winning two Nobel Prizes",
}
```

#### Step 4: Rebuild

```bash
npm run build
```

### Fallback Behavior

If images are missing:
- **Profile**: Gradient circle with emoji portrait
- **Cover**: Gradient background with large emoji

Gradient colors match the category.

---

## Adding Countries

Countries include flags, cultural information, and age-adapted content.

### Flag Images

**Specifications:**
- Format: WebP (preferred) or PNG/JPG
- Aspect Ratio: 3:2 (standard flag ratio)
- Size: 600x400px or higher
- Location: `public/images/learn/country/flags/{slug}.webp`

### Adding a Country

#### Step 1: Add Flag Image

Place flag image in:
```
public/images/learn/country/flags/{country-slug}.webp
```

#### Step 2: Create Country JSON

Create `src/content/countries/{slug}.json`:

```json
{
  "slug": "france",
  "name": "France",
  "continent": "Europe",
  "flag": "🇫🇷",
  "flagImage": "/images/learn/country/flags/france.webp",
  "capital": "Paris",
  "languages": ["French"],
  "greeting": "Bonjour!",
  "funFacts": [
    "France is famous for the Eiffel Tower!",
    "French people love cheese - there are over 400 types!",
    "France is the most visited country in the world!"
  ],
  "landmarks": [
    "Eiffel Tower",
    "Louvre Museum",
    "Palace of Versailles"
  ],
  "animals": [
    "Red Fox",
    "European Rabbit",
    "Alpine Marmot"
  ],
  "foods": [
    "Croissants",
    "Baguettes",
    "Crêpes",
    "Cheese"
  ],
  "ageContent": {
    "3-5": "France is a beautiful country in Europe...",
    "6-8": "France is known for its art, fashion, and delicious food...",
    "9-12": "France has a rich history spanning over 2,000 years..."
  }
}
```

#### Step 3: Add to Country Index

Update `src/content/countries/countryIndex.ts`:

```typescript
{
  slug: "france",
  name: "France",
  continent: "Europe",
  flag: "🇫🇷",
  flagImage: "/images/learn/country/flags/france.webp",
  capital: "Paris",
}
```

#### Step 4: Rebuild

```bash
npm run build
```

### Continents

Valid continent values:
- `Africa`
- `Asia`
- `Europe`
- `North America`
- `South America`
- `Oceania`
- `Antarctica`

---

## Adding Animals

Animals include images, sounds, and educational facts.

### Adding an Animal

#### Step 1: Prepare Files

Create folder: `public/images/learn/animals/{slug}/`

Add files:
- `animal.webp` - Main image (800x600px)
- `sound.mp3` - Animal sound (optional)

#### Step 2: Create Animal JSON

Create `src/content/animals/{slug}.json`:

```json
{
  "slug": "lion",
  "name": "Lion",
  "type": "Mammal",
  "habitat": ["Savanna", "Grasslands"],
  "diet": "Carnivore",
  "image": "/images/learn/animals/lion/animal.webp",
  "sound": "/images/learn/animals/lion/sound.mp3",
  "funFacts": [
    "Lions are called the 'King of the Jungle'!",
    "Male lions have beautiful manes",
    "Lions sleep up to 20 hours a day!"
  ],
  "conservationStatus": "Vulnerable",
  "ageContent": {
    "3-5": "Lions are big cats with loud roars...",
    "6-8": "Lions live in groups called prides...",
    "9-12": "Lions are apex predators found primarily in Africa..."
  }
}
```

#### Step 3: Add to Animal Index

Update `src/content/animals/animalIndex.ts`:

```typescript
{
  slug: "lion",
  name: "Lion",
  type: "Mammal",
  habitat: ["Savanna", "Grasslands"],
  diet: "Carnivore",
  image: "/images/learn/animals/lion/animal.webp",
}
```

#### Step 4: Rebuild

```bash
npm run build
```

### Animal Types

Valid type values:
- `Mammal`
- `Bird`
- `Reptile`
- `Amphibian`
- `Fish`
- `Insect`

### Diet Types

Valid diet values:
- `Herbivore` - Plants only
- `Carnivore` - Meat only
- `Omnivore` - Both plants and meat

---

## Features & UI Components

### Stories Features

**Stories Listing Page** (`/stories`)
- Grid layout with filter bar
- Search by title
- Filter by age group and category
- Results counter
- Empty state

**Story Reader**
- PDF viewer for PDF stories
- Page-by-page reader for traditional stories
- Eye Comfort Mode (sepia tones, reduced blue light)
- Reading progress tracking
- Keyboard navigation (← → arrows)
- Responsive image containers

**Reading Progress**
- Automatically saves progress in localStorage
- Continue Reading section on home page
- Progress badges on story cards (X% complete)
- Completed badge when finished

**Favorites System**
- Heart icon on story cards
- Toggle favorite on/off
- Filter favorites on stories page
- Persistent via localStorage

### Learn Section Features

**Countries Explorer** (`/learn/countries`)
- Grid of country cards with flags
- Filter by continent
- Country detail pages with age-adapted content
- Cultural information (greeting, foods, animals, landmarks)

**Famous People** (`/learn/famous-people`)
- Facebook-style profiles
- Profile picture + cover photo
- Tab navigation (About, Achievements, Fun Facts)
- Age-adapted biographies
- Category badges

**Animal Kingdom** (`/learn/animals`)
- Animal cards with images
- Filter by type (mammal, bird, etc.)
- Animal detail pages
- Sound playback (if available)
- Conservation status
- Age-adapted content

### Play Section

**Memory Match** (`/play/memory`)
- Card matching game
- Multiple difficulty levels
- Timer and move counter
- High scores in localStorage
- Celebratory sounds on win

---

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variable: `NEXT_PUBLIC_PDF_BUCKET_URL`
4. Deploy!

Vercel automatically:
- Detects Next.js project
- Runs `npm run build`
- Deploys to global CDN

### Environment Variables in Vercel

Go to **Project Settings** → **Environment Variables** and add:

```
NEXT_PUBLIC_PDF_BUCKET_URL=https://pub-xxxxx.r2.dev
```

### Custom Domain

1. Add domain in Vercel dashboard
2. Update DNS records as instructed
3. SSL automatically provisioned

---

## Performance Optimization

### Core Web Vitals Targets

| Metric | Target | Status |
|--------|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | ✅ |
| FID (First Input Delay) | < 100ms | ✅ |
| CLS (Cumulative Layout Shift) | < 0.1 | ✅ |

### Optimizations

**Static Generation**
- All pages pre-rendered at build time
- No server-side rendering overhead
- Instant page loads

**Image Optimization**
- WebP format for all images
- Responsive images with `next/image`
- Lazy loading for off-screen content
- Proper `sizes` attribute for each context

**Code Splitting**
- Automatic code splitting per route
- Dynamic imports for heavy components
- Minimal JavaScript bundle

**Content Delivery**
- Vercel Edge Network for HTML/JS/CSS
- Cloudflare R2 CDN for images/PDFs
- Global coverage for fast delivery

**Lightweight Index Pattern**
- Story index only contains metadata (~50 bytes/story)
- Full content loaded on demand
- Scales to 1000+ stories without performance issues

---

## Troubleshooting

### Cover Images Not Showing

**Symptoms:** Story or person cover images return 404

**Solutions:**
1. Check if path starts with `/` for local or no `/` for R2
2. Verify file exists in R2 bucket or public folder
3. Check `NEXT_PUBLIC_PDF_BUCKET_URL` in `.env.local`
4. Clear browser cache and rebuild:
   ```bash
   rm -rf .next
   npm run build
   ```

### PDF Not Loading

**Symptoms:** PDF viewer shows error or blank page

**Solutions:**
1. Verify PDF exists at: `https://your-r2-url/stories/{slug}/{slug}.pdf`
2. Check R2 bucket has public access enabled
3. Ensure `isPdf: true` in story JSON
4. Check `pdfFileName` matches actual file name
5. Verify slug matches folder name exactly (case-sensitive)

### Build Errors

**Symptoms:** Build fails with module not found or type errors

**Solutions:**
1. Delete `.next` folder and rebuild:
   ```bash
   rm -rf .next
   npm run build
   ```
2. Check all JSON files are valid (use JSON validator)
3. Verify all required fields are present in story/person/country JSON
4. Check TypeScript types match data structure

### Image URL Helper Not Working

**Symptoms:** Images show as broken or incorrect URLs

**Solutions:**
1. Check `src/lib/imageUrl.ts` is imported in component
2. Verify using `getImageUrl()` wrapper around image paths
3. Check environment variable is set correctly
4. Restart dev server after changing `.env.local`

### LocalStorage Issues

**Symptoms:** Reading progress or favorites not saving

**Solutions:**
1. Check browser allows localStorage (not in incognito mode)
2. Verify `src/lib/storage.ts` is being used correctly
3. Check for console errors related to storage
4. Clear browser localStorage and test again:
   ```javascript
   localStorage.clear()
   ```

### Responsive Layout Issues

**Symptoms:** Layout breaks on mobile or certain screen sizes

**Solutions:**
1. Test with Chrome DevTools responsive mode
2. Check Tailwind breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px)
3. Verify all images have proper `sizes` attribute
4. Check for fixed widths that don't scale

---

## Additional Resources

### Image Sourcing

**Public Domain Images:**
- [Wikimedia Commons](https://commons.wikimedia.org) - Historical figures, flags
- [Library of Congress](https://www.loc.gov/pictures/) - Historical photos
- [NASA Image Library](https://images.nasa.gov) - Space, astronauts
- [Unsplash](https://unsplash.com) / [Pexels](https://pexels.com) - High-quality photos

**Image Optimization Tools:**
- [Squoosh.app](https://squoosh.app) - Google's image optimizer
- [TinyPNG](https://tinypng.com) - PNG/JPG compression
- ImageMagick CLI for batch processing

### Content Guidelines

**For Young Readers (3-5):**
- Simple sentences (5-10 words)
- Bright, colorful images
- Familiar concepts and objects
- Repetition for learning

**For Early Elementary (6-8):**
- Longer sentences (10-15 words)
- More complex plots
- Educational elements
- Age-appropriate challenges

**For Late Elementary (9-12):**
- Chapter-like structure
- Science and history topics
- Critical thinking elements
- Real-world connections

---

## Summary

This Kids Stories website provides:

✅ **Educational Content** - Countries, famous people, animals
✅ **Interactive Stories** - PDFs and page-by-page formats
✅ **Global CDN** - Fast delivery via Cloudflare R2
✅ **Advanced Features** - Filtering, search, progress tracking
✅ **Mobile-First** - Responsive design for all devices
✅ **Performance** - Optimized Core Web Vitals
✅ **Scalability** - Supports 1000+ stories

**For Questions or Issues:**
Check the troubleshooting section above or review the specific feature documentation.

---

**Last Updated:** January 11, 2026
**Version:** 1.0
**Author:** Kids Stories Development Team

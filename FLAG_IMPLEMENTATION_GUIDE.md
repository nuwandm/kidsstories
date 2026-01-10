# Flag Image Implementation Guide

## Overview
The country explorer now supports real flag images instead of just emojis. The system automatically uses flag images when available and falls back to emoji flags when not.

## Directory Structure
```
public/images/learn/country/flags/
├── japan.webp           ✓ Implemented
├── france.webp          (Add this)
├── brazil.webp          (Add this)
├── kenya.webp           (Add this)
├── australia.webp       (Add this)
├── usa.webp             (Add this)
├── india.webp           (Add this)
├── egypt.webp           (Add this)
├── mexico.webp          (Add this)
└── italy.webp           (Add this)
```

## How to Add a New Flag

### Step 1: Add the Image File
Place your flag image in: `public/images/learn/country/flags/{country-slug}.webp`

**Image Specifications:**
- Format: WebP (preferred) or PNG/JPG
- Aspect Ratio: 3:2 (standard flag ratio)
- Recommended Size: 600x400px or higher
- File naming: Use the country slug (e.g., `japan.webp`, `france.webp`)

### Step 2: Update the Country JSON File
Edit: `src/content/countries/{country-slug}.json`

Add the `flagImage` field:
```json
{
  "slug": "france",
  "name": "France",
  "continent": "Europe",
  "flag": "🇫🇷",
  "flagImage": "/images/learn/country/flags/france.webp",
  "capital": "Paris",
  ...
}
```

### Step 3: Update the Country Index
Edit: `src/content/countries/countryIndex.ts`

Add the `flagImage` field to the corresponding entry:
```typescript
{
  slug: "france",
  name: "France",
  continent: "Europe",
  flag: "🇫🇷",
  flagImage: "/images/learn/country/flags/france.webp",
  capital: "Paris",
},
```

### Step 4: Rebuild the Site
```bash
npm run build
```

## Display Locations

### 1. Country Detail Page (`/learn/countries/[slug]`)
- **Hero Section**: Large flag display (320x224px on desktop)
- Shows above the country name
- Has rounded corners with shadow and white border

### 2. Countries List Page (`/learn/countries`)
- **Country Cards**: Medium flag display (112x80px)
- Shows at the top of each country card
- Has rounded corners with shadow

## Fallback Behavior
If `flagImage` is not provided or the image fails to load:
- The system automatically displays the emoji flag (e.g., 🇯🇵)
- No error is shown to the user
- The layout remains consistent

## Example: Complete Country Entry

```typescript
// In countryIndex.ts
{
  slug: "japan",
  name: "Japan",
  continent: "Asia",
  flag: "🇯🇵",
  flagImage: "/images/learn/country/flags/japan.webp",
  capital: "Tokyo",
}
```

```json
// In japan.json
{
  "slug": "japan",
  "name": "Japan",
  "continent": "Asia",
  "flag": "🇯🇵",
  "flagImage": "/images/learn/country/flags/japan.webp",
  "capital": "Tokyo",
  "languages": ["Japanese"],
  "greeting": "Konnichiwa! (こんにちは)",
  "funFacts": [...],
  "landmarks": [...],
  "animals": [...],
  "foods": [...],
  "ageContent": {...}
}
```

## Current Status

| Country   | Slug        | Flag Image | Status |
|-----------|-------------|------------|--------|
| Japan     | japan       | ✓          | ✅ Done |
| France    | france      | -          | ⏳ Pending |
| Brazil    | brazil      | -          | ⏳ Pending |
| Kenya     | kenya       | -          | ⏳ Pending |
| Australia | australia   | -          | ⏳ Pending |
| USA       | usa         | -          | ⏳ Pending |
| India     | india       | -          | ⏳ Pending |
| Egypt     | egypt       | -          | ⏳ Pending |
| Mexico    | mexico      | -          | ⏳ Pending |
| Italy     | italy       | -          | ⏳ Pending |

## Tips

1. **Image Quality**: Use high-quality flag images for best display
2. **Consistent Aspect Ratio**: Keep all flags at 3:2 ratio for uniformity
3. **File Size**: Optimize images to keep them under 100KB each
4. **Testing**: After adding a flag, visit the country page to verify it displays correctly
5. **Batch Processing**: You can add multiple flags at once, then rebuild once

## Need Help?

If a flag image isn't displaying:
1. Check the file path matches exactly (case-sensitive)
2. Verify the image is in the correct directory
3. Ensure the JSON is valid (use a JSON validator)
4. Clear your browser cache and rebuild the project

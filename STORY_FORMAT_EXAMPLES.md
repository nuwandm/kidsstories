# Story Format Examples

This document shows how to create stories with different text/image layouts.

## Scenario 1: Separate Text and Image (Traditional)

Text appears below the image in the book reader.

```json
{
  "slug": "my-story",
  "title": "My Amazing Story",
  "coverImage": "/images/stories/my-story/cover.png",
  "uploadedDate": "2026-01-02T10:00:00Z",
  "ageGroup": "6-8",
  "category": "Adventure",
  "pages": [
    {
      "text": "Once upon a time, there was a brave little hero...",
      "image": "/images/stories/my-story/page1.png"
    },
    {
      "text": "The hero embarked on an incredible journey...",
      "image": "/images/stories/my-story/page2.png"
    }
  ]
}
```

**Layout:**
- Top 40-55%: Image
- Bottom 45-60%: Text with page number

---

## Scenario 2: Text Embedded in Image

Text is part of the image itself. No separate text section needed.

```json
{
  "slug": "my-comic-story",
  "title": "My Comic Book Story",
  "coverImage": "/images/stories/my-comic-story/cover.png",
  "uploadedDate": "2026-01-02T10:00:00Z",
  "ageGroup": "3-5",
  "category": "Funny",
  "pages": [
    {
      "image": "/images/stories/my-comic-story/page1.png"
    },
    {
      "image": "/images/stories/my-comic-story/page2.png"
    }
  ]
}
```

**Note:** Omit the `"text"` field entirely, or set it to empty string `"text": ""`

**Layout:**
- Image section: Centered image with modern shadow and rounded corners
- Page info section: Clean page number display below image ("Page X of Y")
- Modern white background with subtle border separation

---

## Scenario 3: Mixed (Some pages with text, some without)

You can mix both formats in the same story!

```json
{
  "slug": "mixed-story",
  "title": "A Mixed Format Story",
  "coverImage": "/images/stories/mixed-story/cover.png",
  "uploadedDate": "2026-01-02T10:00:00Z",
  "ageGroup": "9-12",
  "category": "Fantasy",
  "pages": [
    {
      "text": "This page has separate text below the image.",
      "image": "/images/stories/mixed-story/page1.png"
    },
    {
      "image": "/images/stories/mixed-story/page2.png"
    },
    {
      "text": "Back to traditional layout with text.",
      "image": "/images/stories/mixed-story/page3.png"
    },
    {
      "image": "/images/stories/mixed-story/page4.png"
    }
  ]
}
```

**Page 1 & 3:** Traditional split layout (image + text)
**Page 2 & 4:** Full-page image (text embedded in image)

---

## Best Practices

### For Traditional Stories (Scenario 1):
- Keep text concise (max 2-3 sentences per page)
- Images should be 1200x800px or similar 3:2 aspect ratio
- Text will automatically wrap and scroll if too long

### For Image-Only Stories (Scenario 2):
- Images should be 900x1200px or similar portrait aspect
- Design images with text placement in mind
- Page numbers appear below the image (not overlaid), so use full image space
- Use high-contrast backgrounds behind text in your images
- Modern, clean presentation with white background

### For Mixed Stories (Scenario 3):
- Use image-only pages for action sequences or full illustrations
- Use text pages for dialogue or narration
- Maintain visual consistency despite layout changes

---

## Image Requirements

All scenarios:
- Format: PNG, JPG, or WebP
- Location: `/public/images/stories/[story-slug]/`
- Naming: `page1.png`, `page2.png`, `cover.png`, etc.

Recommended sizes:
- **Cover images:** 800x600px (landscape)
- **Traditional pages (with text):** 1200x800px (landscape, 3:2 ratio)
- **Full-page images (no text):** 900x1200px or 800x1000px (portrait, 3:4 ratio)

---

## Story Metadata Fields

All stories must include the following metadata fields:

### Required Fields:

- **`slug`** (string): URL-friendly identifier (lowercase, hyphens only)
  - Example: `"my-adventure-story"`

- **`title`** (string): Display title of the story
  - Example: `"My Amazing Adventure"`

- **`coverImage`** (string): Path to cover image
  - Example: `"/images/stories/my-story/cover.png"`

- **`uploadedDate`** (string): ISO 8601 date format
  - Example: `"2026-01-02T10:00:00Z"`

- **`ageGroup`** (string): Target age group - one of:
  - `"3-5"` - Preschool/Early readers
  - `"6-8"` - Early elementary
  - `"9-12"` - Late elementary/Middle school

- **`category`** (string): Story category - one of:
  - `"Adventure"` - Exciting journeys and quests
  - `"Fantasy"` - Magic and imagination
  - `"Educational"` - Learning and discovery
  - `"Bedtime"` - Calming stories for sleep
  - `"Funny"` - Humor and comedy
  - `"Animal"` - Stories about animals
  - `"Friendship"` - Stories about relationships
  - `"Science"` - Science and exploration

### Usage in Story Listing:
These fields are used for filtering and searching on the `/stories` page:
- Users can filter by age group to find age-appropriate stories
- Users can filter by category to find specific types of stories
- Users can search by title to find specific stories

### Example Complete Story:
```json
{
  "slug": "space-adventure",
  "title": "Journey to the Stars",
  "coverImage": "/images/stories/space-adventure/cover.png",
  "uploadedDate": "2026-01-02T10:00:00Z",
  "ageGroup": "9-12",
  "category": "Science",
  "pages": [
    {
      "text": "In a distant galaxy...",
      "image": "/images/stories/space-adventure/page1.png"
    }
  ]
}
```

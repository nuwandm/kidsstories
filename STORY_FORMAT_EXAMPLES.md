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
- Images should be 1200x800px (3:2 aspect ratio)
- Text will automatically wrap and scroll if too long
- Images use `object-cover` for edge-to-edge display

### For Image-Only Stories (Scenario 2): text inside images
- Images should be **1080x1440px** (3:4 portrait aspect ratio) or **1200x1600px** for higher quality
- Design images with text placement in mind - ensure all important content (faces, characters, text) is centered
- Page numbers appear below the image (not overlaid), so use full image space
- Use high-contrast backgrounds behind text in your images
- **Responsive display:** Images use `object-contain` to show the entire image without cropping
- **Adaptive aspect ratios:** Container adjusts based on device orientation (3:4 portrait, 16:9 landscape, 4:3 desktop)
- **No cropping guarantee:** All image content remains visible across all devices

### For Mixed Stories (Scenario 3):
- Use image-only pages for action sequences or full illustrations
- Use text pages for dialogue or narration
- Maintain visual consistency despite layout changes
- Ensure portrait images are 1080x1440px and landscape images are 1200x800px

---

## Image Requirements

All scenarios:
- Format: PNG, JPG, or WebP
- Location: `/public/images/stories/[story-slug]/`
- Naming: `page1.png`, `page2.png`, `cover.png`, etc.

**Recommended sizes (Full-Bleed Experience):**
- **Cover images:** 800x600px (landscape, 4:3 ratio)
- **Traditional pages (with text):** 1200x800px (landscape, 3:2 ratio)
- **Full-page images (no text):**
  - **Primary (Recommended):** 1080x1440px (portrait, 3:4 ratio)
  - **High Quality:** 1200x1600px (portrait, 3:4 ratio)
  - **Alternative:** 1200x1200px (square, 1:1 ratio - works for all layouts)

**Aspect Ratio Guidelines:**
- Portrait images: Maintain **3:4 aspect ratio** (e.g., 1080x1440, 1200x1600)
- Landscape images: Maintain **3:2 aspect ratio** (e.g., 1200x800, 1800x1200)
- Square images: **1:1 aspect ratio** for universal compatibility

**Why these sizes?**
- 1080x1440px matches modern mobile device screens (3:4 ratio)
- Scales beautifully on desktop displays
- Works perfectly with `object-contain` to show entire image without cropping
- Optimal file size vs quality balance

---

## Responsive Image Behavior

The book reader uses **adaptive aspect ratios** based on device orientation to ensure optimal viewing:

### Mobile Portrait (< 768px width, portrait orientation)
- **Container aspect ratio:** 3:4
- **Min height:** 400px
- **Max height:** calc(100vh - 200px)
- **Image fit:** `object-contain` (entire image visible, no cropping)
- **Background:** Soft gradient fill for letterboxing

### Mobile Landscape (< 768px width, landscape orientation)
- **Container aspect ratio:** 16:9
- **Min height:** 300px (prevents tiny images)
- **Max height:** calc(100vh - 120px)
- **Image fit:** `object-contain`
- **Rationale:** Wider container prevents images from becoming too small in low-height landscape viewports

### Tablet Portrait (768px - 1023px, portrait orientation)
- **Container aspect ratio:** 3:4
- **Min height:** 500px
- **Max height:** calc(100vh - 220px)
- **Image fit:** `object-contain`

### Tablet Landscape & Desktop (≥ 768px landscape or ≥ 1024px)
- **Container aspect ratio:** 4:3
- **Min height:** 400px
- **Max height:** calc(100vh - 180px)
- **Image fit:** `object-contain`
- **Optimal for:** Larger screens with more horizontal space

### Key Benefits:
✅ **No image cropping** - Characters, faces, and text always fully visible
✅ **No duplicate images needed** - Single image works across all devices
✅ **Responsive to orientation changes** - Adapts when device rotates
✅ **Minimum height enforcement** - Images never become too small
✅ **Professional appearance** - Soft gradient background fills letterbox space
✅ **Eye Comfort Mode** - Reduces blue light with warm color temperature

---

## Professional Reading Features

### Eye Comfort Mode
The book reader includes an **Eye Comfort Mode** designed for extended reading sessions:

**Features:**
- **Warm color temperature** - Reduces blue light emission
- **Sepia-toned backgrounds** - Easier on the eyes (#f5ebe0, #ede0d4)
- **Adjusted text colors** - Softer contrast for comfortable reading
- **Persistent preference** - Saves user's choice in localStorage
- **Smooth transitions** - 500ms fade between modes

**Color Palette:**
- Normal Mode: Cool whites (#fff, #f8f9fa)
- Eye Comfort: Warm sepia (#f5ebe0, #ede0d4, #e6ccb2)
- Text (Normal): Stone gray (#57534e)
- Text (Comfort): Warm brown (#3e2a1c)

### Space-Optimized Layout

**Compact Header** (was 64px, now 40-48px):
- Minimal padding (py-2 sm:py-2.5)
- Integrated page counter
- Compact icon buttons (16px icons)
- Glassmorphism design (backdrop-blur-md)

**Maximized Content Area**:
- Reduced outer padding (p-2 sm:p-3)
- Larger max-width (900px → 1000px)
- Removed decorative page stack effect
- Minimal spine indicator (2px vs 20px)

**Compact Footer** (was 80px, now 40-48px):
- Horizontal progress layout
- Smaller progress dots (1.5px → 2.5px)
- Thinner progress bar (0.5px height)
- Inline keyboard hints

**Overall Space Savings:**
- Header: ~20px saved
- Footer: ~35px saved
- Padding: ~16px saved
- **Total: ~70px more screen space for content**

### Professional UI Elements

**Glass morphism Design:**
```css
bg-black/40 backdrop-blur-md border border-white/5
```

**Compact Navigation Arrows:**
- Size: 40px → 56px (was 56px → 80px)
- Style: Rounded rectangles (rounded-lg)
- Minimal design with subtle hover effects
- Consistent with modern UI patterns

**Typography Optimization:**
- Reduced first-letter size (60px → 48px sm screens)
- Tighter line heights (1.9 → 1.8)
- Smaller base font (20px → 18px)
- Better readability at smaller sizes

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

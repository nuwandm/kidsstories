# Enum Usage Examples

This guide shows how to use the new `AgeGroup` and `Category` enums in your code.

## Overview

Enums provide type safety and autocomplete support when working with age groups and categories throughout the application.

---

## Age Group Enum

### Definition

```typescript
export enum AgeGroup {
  PRESCHOOL = '3-5',
  EARLY_ELEMENTARY = '6-8',
  LATE_ELEMENTARY = '9-12',
}
```

### Usage Examples

#### 1. Creating a Story with Enums

```typescript
import { AgeGroup, Category } from '@/lib/types';

// Using enums (recommended - type safe)
const story = {
  slug: "my-story",
  title: "My Amazing Story",
  ageGroup: AgeGroup.EARLY_ELEMENTARY,  // ✅ Autocomplete support
  category: Category.ADVENTURE,          // ✅ Autocomplete support
  // ... other fields
};

// Using strings (still supported for JSON files)
const story2 = {
  slug: "my-story-2",
  title: "Another Story",
  ageGroup: "6-8",                       // ✅ Still works
  category: "Adventure",                  // ✅ Still works
  // ... other fields
};
```

#### 2. Filter Dropdowns in Components

```typescript
import { AgeGroup, getAllAgeGroups, getAgeGroupLabel } from '@/lib/types';

function AgeGroupFilter() {
  const [selected, setSelected] = useState<AgeGroup | 'all'>('all');

  return (
    <select
      value={selected}
      onChange={(e) => setSelected(e.target.value as AgeGroup | 'all')}
    >
      <option value="all">All Ages</option>
      {getAllAgeGroups().map((ageGroup) => (
        <option key={ageGroup} value={ageGroup}>
          {getAgeGroupLabel(ageGroup)}
        </option>
      ))}
    </select>
  );
}
```

#### 3. Comparing Age Groups

```typescript
import { AgeGroup } from '@/lib/types';

// Type-safe comparison
if (story.ageGroup === AgeGroup.PRESCHOOL) {
  // Show age-appropriate content
}

// Works with both enum and string
if (story.ageGroup === '3-5') {
  // Also works
}
```

---

## Category Enum

### Definition

```typescript
export enum Category {
  ADVENTURE = 'Adventure',
  FANTASY = 'Fantasy',
  EDUCATIONAL = 'Educational',
  BEDTIME = 'Bedtime',
  FUNNY = 'Funny',
  ANIMAL = 'Animal',
  FRIENDSHIP = 'Friendship',
  SCIENCE = 'Science',
}
```

### Usage Examples

#### 1. Category Filter Component

```typescript
import { Category, getAllCategories, getCategoryIcon } from '@/lib/types';

function CategoryFilter() {
  const [selected, setSelected] = useState<Category | 'all'>('all');

  return (
    <select
      value={selected}
      onChange={(e) => setSelected(e.target.value as Category | 'all')}
    >
      <option value="all">🎨 All Categories</option>
      {getAllCategories().map((category) => (
        <option key={category} value={category}>
          {getCategoryIcon(category)} {category}
        </option>
      ))}
    </select>
  );
}
```

#### 2. Conditional Styling Based on Category

```typescript
import { Category } from '@/lib/types';

function getCardColor(category: Category | CategoryType): string {
  switch (category) {
    case Category.ADVENTURE:
      return 'bg-gradient-to-r from-purple-500 to-pink-500';
    case Category.FANTASY:
      return 'bg-gradient-to-r from-pink-500 to-rose-500';
    case Category.EDUCATIONAL:
      return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    case Category.BEDTIME:
      return 'bg-gradient-to-r from-indigo-500 to-purple-500';
    case Category.FUNNY:
      return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    case Category.ANIMAL:
      return 'bg-gradient-to-r from-green-500 to-emerald-500';
    case Category.FRIENDSHIP:
      return 'bg-gradient-to-r from-rose-500 to-pink-500';
    case Category.SCIENCE:
      return 'bg-gradient-to-r from-cyan-500 to-blue-500';
    default:
      return 'bg-gradient-to-r from-gray-500 to-slate-500';
  }
}
```

#### 3. Filtering Stories by Category

```typescript
import { Category, StoryIndexItem } from '@/lib/types';

function filterStoriesByCategory(
  stories: StoryIndexItem[],
  category: Category | 'all'
): StoryIndexItem[] {
  if (category === 'all') {
    return stories;
  }

  return stories.filter(story => story.category === category);
}

// Usage
const adventureStories = filterStoriesByCategory(allStories, Category.ADVENTURE);
```

---

## Helper Functions

### getAllAgeGroups()

Returns all age group enum values as an array.

```typescript
import { getAllAgeGroups } from '@/lib/types';

const ageGroups = getAllAgeGroups();
// [AgeGroup.PRESCHOOL, AgeGroup.EARLY_ELEMENTARY, AgeGroup.LATE_ELEMENTARY]
```

### getAllCategories()

Returns all category enum values as an array.

```typescript
import { getAllCategories } from '@/lib/types';

const categories = getAllCategories();
// [Category.ADVENTURE, Category.FANTASY, ...]
```

### getAgeGroupLabel()

Returns a human-readable label for an age group.

```typescript
import { AgeGroup, getAgeGroupLabel } from '@/lib/types';

const label = getAgeGroupLabel(AgeGroup.PRESCHOOL);
// "Preschool (3-5 years)"

const label2 = getAgeGroupLabel('6-8');
// "Early Elementary (6-8 years)"
```

### getCategoryIcon()

Returns the emoji icon for a category.

```typescript
import { Category, getCategoryIcon } from '@/lib/types';

const icon = getCategoryIcon(Category.ADVENTURE);
// "🗺️"

const icon2 = getCategoryIcon('Science');
// "🔬"
```

---

## JSON Files (No Change Required)

JSON files continue to use string values. The enums are primarily for TypeScript code.

```json
{
  "slug": "my-story",
  "title": "My Story",
  "ageGroup": "3-5",
  "category": "Adventure"
}
```

The TypeScript interfaces accept both enum values and string literals, so your existing JSON files work without modification.

---

## Benefits of Using Enums

### 1. Autocomplete Support

```typescript
// IDE suggests: PRESCHOOL, EARLY_ELEMENTARY, LATE_ELEMENTARY
const age = AgeGroup.
```

### 2. Typo Prevention

```typescript
// ✅ Correct - TypeScript accepts this
category: Category.ADVENTURE

// ❌ Error - TypeScript catches typo
category: Category.ADVVENTURE  // Property 'ADVVENTURE' does not exist
```

### 3. Refactoring Safety

If you rename an enum value, TypeScript will show errors everywhere it's used, making refactoring safer.

### 4. Better Code Documentation

```typescript
// Clear what values are expected
function processStory(category: Category) {
  // ...
}

// Less clear
function processStory(category: string) {
  // ...
}
```

---

## Migration from String Literals

### Before (String Literals)

```typescript
const story = {
  ageGroup: '6-8',
  category: 'Adventure',
};

if (story.category === 'Adventure') {
  // ...
}
```

### After (Using Enums)

```typescript
import { AgeGroup, Category } from '@/lib/types';

const story = {
  ageGroup: AgeGroup.EARLY_ELEMENTARY,
  category: Category.ADVENTURE,
};

if (story.category === Category.ADVENTURE) {
  // ...
}
```

**Note:** Both approaches work! The interfaces accept both enum and string values for backward compatibility.

---

## Best Practices

### 1. Use Enums in TypeScript Code

```typescript
// ✅ Good - type safe
import { Category } from '@/lib/types';
const category = Category.ADVENTURE;

// ⚠️ Works but not recommended - prone to typos
const category = 'Adventure';
```

### 2. Use Strings in JSON Files

```json
{
  "category": "Adventure"
}
```

JSON files should continue using string values since JSON doesn't support enums.

### 3. Use Helper Functions for Dropdowns

```typescript
// ✅ Good - maintains single source of truth
const categories = getAllCategories();

// ❌ Avoid - duplicate list
const categories = ['Adventure', 'Fantasy', ...];
```

### 4. Use Type Unions for Flexibility

```typescript
// Accepts both enum and string
function filterByAge(ageGroup: AgeGroup | AgeGroupType | 'all') {
  // ...
}
```

---

## Complete Example: Story Filter Component

```typescript
import { useState, useMemo } from 'react';
import {
  AgeGroup,
  Category,
  StoryIndexItem,
  getAllAgeGroups,
  getAllCategories,
  getAgeGroupLabel,
  getCategoryIcon,
} from '@/lib/types';

interface StoryFilterProps {
  stories: StoryIndexItem[];
}

export function StoryFilter({ stories }: StoryFilterProps) {
  const [ageGroup, setAgeGroup] = useState<AgeGroup | 'all'>('all');
  const [category, setCategory] = useState<Category | 'all'>('all');

  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      if (ageGroup !== 'all' && story.ageGroup !== ageGroup) {
        return false;
      }
      if (category !== 'all' && story.category !== category) {
        return false;
      }
      return true;
    });
  }, [stories, ageGroup, category]);

  return (
    <div>
      {/* Age Group Filter */}
      <select
        value={ageGroup}
        onChange={(e) => setAgeGroup(e.target.value as AgeGroup | 'all')}
      >
        <option value="all">All Ages</option>
        {getAllAgeGroups().map((age) => (
          <option key={age} value={age}>
            👶 {getAgeGroupLabel(age)}
          </option>
        ))}
      </select>

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as Category | 'all')}
      >
        <option value="all">All Categories</option>
        {getAllCategories().map((cat) => (
          <option key={cat} value={cat}>
            {getCategoryIcon(cat)} {cat}
          </option>
        ))}
      </select>

      {/* Results */}
      <div>
        Showing {filteredStories.length} of {stories.length} stories
      </div>
    </div>
  );
}
```

---

## Summary

✅ **Enums provide:**
- Autocomplete support in IDEs
- Type safety and compile-time checks
- Better code documentation
- Easier refactoring

✅ **Backward compatibility:**
- Existing JSON files work without changes
- String literals still accepted
- No breaking changes

✅ **Helper functions:**
- `getAllAgeGroups()` - Get all age group values
- `getAllCategories()` - Get all category values
- `getAgeGroupLabel()` - Get human-readable labels
- `getCategoryIcon()` - Get category emoji icons

**Use enums in TypeScript code, use strings in JSON files!**

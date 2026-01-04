/**
 * LocalStorage utility for managing user data
 * All data is stored client-side, no backend required
 */

// Storage keys
const STORAGE_KEYS = {
  READING_PROGRESS: 'kidsstories_reading_progress',
  FAVORITES: 'kidsstories_favorites',
  READING_HISTORY: 'kidsstories_reading_history',
  ACHIEVEMENTS: 'kidsstories_achievements',
  READING_STATS: 'kidsstories_reading_stats',
  PREFERENCES: 'kidsstories_preferences',
} as const;

// Types
export interface ReadingProgress {
  [storySlug: string]: {
    currentPage: number;
    totalPages: number;
    lastRead: string; // ISO date
    completed: boolean;
  };
}

export interface ReadingHistoryItem {
  slug: string;
  title: string;
  lastRead: string;
  coverImage: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
  target?: number;
}

export interface ReadingStats {
  totalStoriesRead: number;
  totalPagesRead: number;
  favoriteCategory: string;
  readingStreak: number;
  lastReadDate: string;
  storiesByCategory: { [category: string]: number };
}

export interface UserPreferences {
  eyeComfortMode: boolean;
  soundEnabled: boolean;
  darkMode: boolean;
  textToSpeechEnabled: boolean;
  onboardingCompleted: boolean;
  selectedPet?: 'cat' | 'dog' | 'fish';
}

// Reading Progress
export const getReadingProgress = (storySlug: string) => {
  if (typeof window === 'undefined') return null;

  const data = localStorage.getItem(STORAGE_KEYS.READING_PROGRESS);
  if (!data) return null;

  const progress: ReadingProgress = JSON.parse(data);
  return progress[storySlug] || null;
};

export const setReadingProgress = (
  storySlug: string,
  currentPage: number,
  totalPages: number,
  completed: boolean = false
) => {
  if (typeof window === 'undefined') return;

  const data = localStorage.getItem(STORAGE_KEYS.READING_PROGRESS);
  const progress: ReadingProgress = data ? JSON.parse(data) : {};

  progress[storySlug] = {
    currentPage,
    totalPages,
    lastRead: new Date().toISOString(),
    completed,
  };

  localStorage.setItem(STORAGE_KEYS.READING_PROGRESS, JSON.stringify(progress));
};

// Favorites
export const getFavorites = (): string[] => {
  if (typeof window === 'undefined') return [];

  const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
  return data ? JSON.parse(data) : [];
};

export const toggleFavorite = (storySlug: string): boolean => {
  if (typeof window === 'undefined') return false;

  const favorites = getFavorites();
  const index = favorites.indexOf(storySlug);

  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(storySlug);
  }

  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  return index === -1; // Return true if added, false if removed
};

export const isFavorite = (storySlug: string): boolean => {
  return getFavorites().includes(storySlug);
};

// Reading History
export const getReadingHistory = (): ReadingHistoryItem[] => {
  if (typeof window === 'undefined') return [];

  const data = localStorage.getItem(STORAGE_KEYS.READING_HISTORY);
  return data ? JSON.parse(data) : [];
};

export const addToReadingHistory = (item: ReadingHistoryItem) => {
  if (typeof window === 'undefined') return;

  const history = getReadingHistory();

  // Remove if already exists
  const filtered = history.filter(h => h.slug !== item.slug);

  // Add to beginning
  filtered.unshift(item);

  // Keep only last 10
  const limited = filtered.slice(0, 10);

  localStorage.setItem(STORAGE_KEYS.READING_HISTORY, JSON.stringify(limited));
};

// Achievements
export const getAchievements = (): Achievement[] => {
  if (typeof window === 'undefined') return [];

  const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
  return data ? JSON.parse(data) : getDefaultAchievements();
};

export const unlockAchievement = (achievementId: string) => {
  if (typeof window === 'undefined') return;

  const achievements = getAchievements();
  const achievement = achievements.find(a => a.id === achievementId);

  if (achievement && !achievement.unlockedAt) {
    achievement.unlockedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
    return achievement;
  }

  return null;
};

export const updateAchievementProgress = (achievementId: string, progress: number) => {
  if (typeof window === 'undefined') return;

  const achievements = getAchievements();
  const achievement = achievements.find(a => a.id === achievementId);

  if (achievement) {
    achievement.progress = progress;

    // Auto-unlock if target reached
    if (achievement.target && progress >= achievement.target && !achievement.unlockedAt) {
      achievement.unlockedAt = new Date().toISOString();
    }

    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  }
};

// Reading Stats
export const getReadingStats = (): ReadingStats => {
  if (typeof window === 'undefined') {
    return {
      totalStoriesRead: 0,
      totalPagesRead: 0,
      favoriteCategory: '',
      readingStreak: 0,
      lastReadDate: '',
      storiesByCategory: {},
    };
  }

  const data = localStorage.getItem(STORAGE_KEYS.READING_STATS);
  return data ? JSON.parse(data) : {
    totalStoriesRead: 0,
    totalPagesRead: 0,
    favoriteCategory: '',
    readingStreak: 0,
    lastReadDate: '',
    storiesByCategory: {},
  };
};

export const updateReadingStats = (category: string, pagesRead: number, storyCompleted: boolean) => {
  if (typeof window === 'undefined') return;

  const stats = getReadingStats();

  // Update pages
  stats.totalPagesRead += pagesRead;

  // Update stories
  if (storyCompleted) {
    stats.totalStoriesRead += 1;
  }

  // Update category count
  stats.storiesByCategory[category] = (stats.storiesByCategory[category] || 0) + (storyCompleted ? 1 : 0);

  // Find favorite category
  const categories = Object.entries(stats.storiesByCategory);
  if (categories.length > 0) {
    stats.favoriteCategory = categories.reduce((a, b) => a[1] > b[1] ? a : b)[0];
  }

  // Update streak
  const today = new Date().toISOString().split('T')[0];
  const lastRead = stats.lastReadDate ? stats.lastReadDate.split('T')[0] : '';

  if (lastRead === today) {
    // Same day, no change
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastRead === yesterdayStr) {
      stats.readingStreak += 1;
    } else if (lastRead !== today) {
      stats.readingStreak = 1;
    }
  }

  stats.lastReadDate = new Date().toISOString();

  localStorage.setItem(STORAGE_KEYS.READING_STATS, JSON.stringify(stats));

  // Check achievements
  checkAndUnlockAchievements(stats);
};

// User Preferences
export const getPreferences = (): UserPreferences => {
  if (typeof window === 'undefined') {
    return {
      eyeComfortMode: false,
      soundEnabled: true,
      darkMode: false,
      textToSpeechEnabled: false,
      onboardingCompleted: false,
    };
  }

  const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
  return data ? JSON.parse(data) : {
    eyeComfortMode: false,
    soundEnabled: true,
    darkMode: false,
    textToSpeechEnabled: false,
    onboardingCompleted: false,
  };
};

export const updatePreference = <K extends keyof UserPreferences>(
  key: K,
  value: UserPreferences[K]
) => {
  if (typeof window === 'undefined') return;

  const prefs = getPreferences();
  prefs[key] = value;
  localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
};

// Default achievements
function getDefaultAchievements(): Achievement[] {
  return [
    {
      id: 'first_story',
      name: 'First Story',
      description: 'Complete your first story',
      icon: '📖',
      target: 1,
      progress: 0,
    },
    {
      id: 'bookworm',
      name: 'Bookworm',
      description: 'Read 5 stories',
      icon: '🐛',
      target: 5,
      progress: 0,
    },
    {
      id: 'story_master',
      name: 'Story Master',
      description: 'Read 10 stories',
      icon: '🎓',
      target: 10,
      progress: 0,
    },
    {
      id: 'night_owl',
      name: 'Night Owl',
      description: 'Read 3 bedtime stories',
      icon: '🦉',
      target: 3,
      progress: 0,
    },
    {
      id: 'explorer',
      name: 'Explorer',
      description: 'Read stories from all categories',
      icon: '🗺️',
      target: 8,
      progress: 0,
    },
    {
      id: 'page_turner',
      name: 'Page Turner',
      description: 'Read 100 pages',
      icon: '📚',
      target: 100,
      progress: 0,
    },
    {
      id: 'streak_3',
      name: '3-Day Streak',
      description: 'Read for 3 days in a row',
      icon: '🔥',
      target: 3,
      progress: 0,
    },
    {
      id: 'streak_7',
      name: 'Week Warrior',
      description: 'Read for 7 days in a row',
      icon: '⭐',
      target: 7,
      progress: 0,
    },
  ];
}

// Check and unlock achievements based on stats
function checkAndUnlockAchievements(stats: ReadingStats) {
  const achievements = getAchievements();

  achievements.forEach(achievement => {
    if (achievement.unlockedAt) return; // Already unlocked

    let shouldUnlock = false;

    switch (achievement.id) {
      case 'first_story':
        shouldUnlock = stats.totalStoriesRead >= 1;
        achievement.progress = stats.totalStoriesRead;
        break;
      case 'bookworm':
        shouldUnlock = stats.totalStoriesRead >= 5;
        achievement.progress = stats.totalStoriesRead;
        break;
      case 'story_master':
        shouldUnlock = stats.totalStoriesRead >= 10;
        achievement.progress = stats.totalStoriesRead;
        break;
      case 'night_owl':
        const bedtimeCount = stats.storiesByCategory['Bedtime'] || 0;
        shouldUnlock = bedtimeCount >= 3;
        achievement.progress = bedtimeCount;
        break;
      case 'explorer':
        const categoriesCount = Object.keys(stats.storiesByCategory).length;
        shouldUnlock = categoriesCount >= 8;
        achievement.progress = categoriesCount;
        break;
      case 'page_turner':
        shouldUnlock = stats.totalPagesRead >= 100;
        achievement.progress = stats.totalPagesRead;
        break;
      case 'streak_3':
        shouldUnlock = stats.readingStreak >= 3;
        achievement.progress = stats.readingStreak;
        break;
      case 'streak_7':
        shouldUnlock = stats.readingStreak >= 7;
        achievement.progress = stats.readingStreak;
        break;
    }

    if (shouldUnlock) {
      achievement.unlockedAt = new Date().toISOString();
    }
  });

  localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
}

// Utility to calculate reading time
export const calculateReadingTime = (story: { pages: { text?: string }[] }): number => {
  const wordsPerMinute = 150; // Average reading speed for kids
  let totalWords = 0;

  story.pages.forEach(page => {
    if (page.text) {
      totalWords += page.text.split(/\s+/).length;
    }
  });

  // If no text (image-only story), estimate 30 seconds per page
  if (totalWords === 0) {
    return Math.ceil(story.pages.length * 0.5);
  }

  return Math.ceil(totalWords / wordsPerMinute);
};

'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { storyIndex } from '@/content/storyIndex';
import { AgeGroup, Category } from '@/lib/types';
import { getFavorites } from '@/lib/storage';
import { getImageUrl } from '@/lib/imageUrl';

export default function StoriesPage() {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites on mount
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  // Filter stories based on selected filters and search query
  const filteredStories = useMemo(() => {
    return storyIndex.filter((story) => {
      // Filter by favorites
      if (showFavoritesOnly && !favorites.includes(story.slug)) {
        return false;
      }

      // Filter by age group
      if (selectedAgeGroup !== 'all' && story.ageGroup !== selectedAgeGroup) {
        return false;
      }

      // Filter by category
      if (selectedCategory !== 'all' && story.category !== selectedCategory) {
        return false;
      }

      // Filter by search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return story.title.toLowerCase().includes(query);
      }

      return true;
    });
  }, [selectedAgeGroup, selectedCategory, searchQuery, showFavoritesOnly, favorites]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedAgeGroup('all');
    setSelectedCategory('all');
    setSearchQuery('');
    setShowFavoritesOnly(false);
  };

  const hasActiveFilters = selectedAgeGroup !== 'all' || selectedCategory !== 'all' || searchQuery.trim() !== '' || showFavoritesOnly;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50">
      {/* Filters Section - Compact */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-40 shadow-sm">
        <div className="container-story py-3 sm:py-4">
          <div className="flex flex-col gap-3">
            {/* Filter Controls Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3">
              {/* Search Input */}
              <div className="lg:col-span-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 Search stories..."
                  className="w-full px-4 py-2 rounded-full border border-purple-200 focus:border-purple-400 focus:outline-none font-nunito text-sm transition-all"
                />
              </div>

              {/* Favorites Filter */}
              <div>
                <button
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className={`w-full px-4 py-2 rounded-full border font-nunito text-sm transition-all ${
                    showFavoritesOnly
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-600'
                      : 'border-purple-200 bg-white hover:border-purple-400'
                  }`}
                >
                  {showFavoritesOnly ? '❤️ Favorites' : '🤍 Show Favorites'}
                </button>
              </div>

              {/* Age Group Filter */}
              <div>
                <select
                  value={selectedAgeGroup}
                  onChange={(e) => setSelectedAgeGroup(e.target.value as AgeGroup | 'all')}
                  className="w-full px-3 py-2 rounded-full border border-purple-200 focus:border-purple-400 focus:outline-none font-nunito text-sm transition-all cursor-pointer bg-white"
                >
                  <option value="all">👶 All Ages</option>
                  <option value="3-5">👶 3-5 years</option>
                  <option value="6-8">👶 6-8 years</option>
                  <option value="9-12">👶 9-12 years</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
                  className="w-full px-3 py-2 rounded-full border border-purple-200 focus:border-purple-400 focus:outline-none font-nunito text-sm transition-all cursor-pointer bg-white"
                >
                  <option value="all">🎨 All Categories</option>
                  <option value="Adventure">🗺️ Adventure</option>
                  <option value="Fantasy">✨ Fantasy</option>
                  <option value="Educational">📚 Educational</option>
                  <option value="Bedtime">🌙 Bedtime</option>
                  <option value="Funny">😄 Funny</option>
                  <option value="Animal">🐾 Animal</option>
                  <option value="Friendship">🤝 Friendship</option>
                  <option value="Science">🔬 Science</option>
                </select>
              </div>
            </div>

            {/* Results Count & Reset Row */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="font-nunito text-gray-600">
                <span className="font-semibold text-purple-600">{filteredStories.length}</span> of{' '}
                <span className="font-semibold text-purple-600">{storyIndex.length}</span> stories
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="px-4 py-1 rounded-full font-nunito font-medium text-sm bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:scale-105 transition-all shadow-sm"
                >
                  🔄 Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <main className="container-story py-8 sm:py-12">
        {filteredStories.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😢</div>
            <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-gray-700 mb-2">
              No stories found
            </h2>
            <p className="font-nunito text-lg text-gray-600 mb-6">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-fredoka font-semibold text-lg hover:scale-105 transition-all shadow-lg"
            >
              🔄 Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStories.map((story) => (
              <Link
                key={story.slug}
                href={`/stories/${story.slug}`}
                className="story-card group"
              >
                {/* Cover Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-kid-xl bg-gradient-to-br from-purple-100 to-pink-100">
                  <Image
                    src={getImageUrl(story.coverImage)}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Story Info */}
                <div className="p-4 sm:p-5 relative z-10">
                  <h3 className="font-fredoka text-lg sm:text-xl font-bold text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem]">
                    {story.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                      👶 {story.ageGroup}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold">
                      {getCategoryIcon(story.category)} {story.category}
                    </span>
                  </div>

                  {/* Read Button */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="font-nunito font-medium group-hover:text-purple-600 transition-colors">
                      Read Story →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white py-8 mt-12">
          <div className="container-story text-center">
            <p className="font-nunito text-lg">
              Made with ❤️ for young readers everywhere
            </p>
          </div>
        </footer>
    </div>
  );
}

// Helper function to get emoji for category
function getCategoryIcon(category: Category): string {
  const icons: Record<Category, string> = {
    Adventure: '🗺️',
    Fantasy: '✨',
    Educational: '📚',
    Bedtime: '🌙',
    Funny: '😄',
    Animal: '🐾',
    Friendship: '🤝',
    Science: '🔬',
  };
  return icons[category] || '📖';
}

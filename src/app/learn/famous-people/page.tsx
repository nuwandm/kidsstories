'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { peopleIndex, getCategories } from '@/content/famous-people/peopleIndex';
import { PersonCard } from '@/components/learn/PersonCard';
import { getPeopleDiscovered } from '@/lib/storage';

export default function FamousPeoplePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [discoveredPeople, setDiscoveredPeople] = useState<string[]>([]);
  const categories = getCategories();

  useEffect(() => {
    setDiscoveredPeople(getPeopleDiscovered());
  }, []);

  const filteredPeople = selectedCategory === 'All'
    ? peopleIndex
    : peopleIndex.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 py-12 sm:py-16">
        <div className="container-story text-center">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-purple-600 font-fredoka font-semibold mb-4 hover:underline"
          >
            ← Back to Learn
          </Link>
          <div className="inline-block mb-4 animate-bounce-gentle">
            <span className="text-6xl sm:text-7xl md:text-8xl">🌟</span>
          </div>
          <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Famous People
          </h1>
          <p className="font-nunito text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto">
            Meet inspiring scientists, inventors, artists, and explorers who changed the world!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-story py-12 sm:py-16">
        {/* Filter Section */}
        <section className="mb-8">
          <div className="bg-white rounded-kid-xl shadow-soft p-6">
            <h2 className="font-fredoka text-lg font-bold text-gray-700 mb-4">
              Filter by Category:
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-full font-fredoka font-semibold transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({peopleIndex.length})
              </button>
              {categories.map((category) => {
                const count = peopleIndex.filter((p) => p.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-fredoka font-semibold transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Progress */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-kid-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              <div>
                <p className="font-fredoka font-bold text-gray-800">
                  Your Progress
                </p>
                <p className="font-nunito text-gray-600 text-sm">
                  {discoveredPeople.length} of {peopleIndex.length} people discovered
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-fredoka text-2xl font-bold text-purple-600">
                {Math.round((discoveredPeople.length / peopleIndex.length) * 100)}%
              </p>
            </div>
          </div>
        </section>

        {/* People Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPeople.map((person) => (
              <PersonCard
                key={person.slug}
                person={person}
                discovered={discoveredPeople.includes(person.slug)}
              />
            ))}
          </div>

          {filteredPeople.length === 0 && (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🔍</span>
              <p className="font-fredoka text-xl text-gray-600">
                No people found for this category.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

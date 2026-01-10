'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { animalIndex, getAnimalTypes } from '@/content/animals/animalIndex';
import { AnimalCard } from '@/components/learn/AnimalCard';
import { getAnimalsLearned } from '@/lib/storage';

export default function AnimalsPage() {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [learnedAnimals, setLearnedAnimals] = useState<string[]>([]);
  const types = getAnimalTypes();

  useEffect(() => {
    setLearnedAnimals(getAnimalsLearned());
  }, []);

  const filteredAnimals = selectedType === 'All'
    ? animalIndex
    : animalIndex.filter((a) => a.type === selectedType);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 py-12 sm:py-16">
        <div className="container-story text-center">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-green-600 font-fredoka font-semibold mb-4 hover:underline"
          >
            ← Back to Learn
          </Link>
          <div className="inline-block mb-4 animate-bounce-gentle">
            <span className="text-6xl sm:text-7xl md:text-8xl">🦁</span>
          </div>
          <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Animal Kingdom
          </h1>
          <p className="font-nunito text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto">
            Discover amazing animals from around the world!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-story py-12 sm:py-16">
        {/* Filter Section */}
        <section className="mb-8">
          <div className="bg-white rounded-kid-xl shadow-soft p-6">
            <h2 className="font-fredoka text-lg font-bold text-gray-700 mb-4">
              Filter by Type:
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType('All')}
                className={`px-4 py-2 rounded-full font-fredoka font-semibold transition-all ${
                  selectedType === 'All'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({animalIndex.length})
              </button>
              {types.map((type) => {
                const count = animalIndex.filter((a) => a.type === type).length;
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-full font-fredoka font-semibold transition-all ${
                      selectedType === type
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Progress */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-kid-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🐾</span>
              <div>
                <p className="font-fredoka font-bold text-gray-800">
                  Your Progress
                </p>
                <p className="font-nunito text-gray-600 text-sm">
                  {learnedAnimals.length} of {animalIndex.length} animals learned
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-fredoka text-2xl font-bold text-green-600">
                {Math.round((learnedAnimals.length / animalIndex.length) * 100)}%
              </p>
            </div>
          </div>
        </section>

        {/* Animals Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAnimals.map((animal) => (
              <AnimalCard
                key={animal.slug}
                animal={animal}
                learned={learnedAnimals.includes(animal.slug)}
              />
            ))}
          </div>

          {filteredAnimals.length === 0 && (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🔍</span>
              <p className="font-fredoka text-xl text-gray-600">
                No animals found for this type.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

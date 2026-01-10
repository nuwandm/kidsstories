'use client';

import { useState, useEffect } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { countryIndex, getContinents } from '@/content/countries/countryIndex';
import { CountryCard } from '@/components/learn/CountryCard';
import { getCountriesVisited } from '@/lib/storage';
import { Continent } from '@/lib/types';

export default function CountriesPage() {
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);
  const continents = getContinents();

  useEffect(() => {
    setVisitedCountries(getCountriesVisited());
  }, []);

  const filteredCountries = selectedContinent === 'All'
    ? countryIndex
    : countryIndex.filter((c) => c.continent === selectedContinent);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-100 via-cyan-100 to-teal-100 py-12 sm:py-16">
        <div className="container-story text-center">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-blue-600 font-fredoka font-semibold mb-4 hover:underline"
          >
            ← Back to Learn
          </Link>
          <div className="inline-block mb-4 animate-bounce-gentle">
            <span className="text-6xl sm:text-7xl md:text-8xl">🌍</span>
          </div>
          <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Countries Explorer
          </h1>
          <p className="font-nunito text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto">
            Travel the world and discover amazing countries!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-story py-12 sm:py-16">
        {/* Filter Section */}
        <section className="mb-8">
          <div className="bg-white rounded-kid-xl shadow-soft p-6">
            <h2 className="font-fredoka text-lg font-bold text-gray-700 mb-4">
              Filter by Continent:
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedContinent('All')}
                className={`px-4 py-2 rounded-full font-fredoka font-semibold transition-all ${
                  selectedContinent === 'All'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({countryIndex.length})
              </button>
              {continents.map((continent) => {
                const count = countryIndex.filter((c) => c.continent === continent).length;
                return (
                  <button
                    key={continent}
                    onClick={() => setSelectedContinent(continent)}
                    className={`px-4 py-2 rounded-full font-fredoka font-semibold transition-all ${
                      selectedContinent === continent
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {continent} ({count})
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
              <span className="text-3xl">🗺️</span>
              <div>
                <p className="font-fredoka font-bold text-gray-800">
                  Your Progress
                </p>
                <p className="font-nunito text-gray-600 text-sm">
                  {visitedCountries.length} of {countryIndex.length} countries explored
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-fredoka text-2xl font-bold text-green-600">
                {Math.round((visitedCountries.length / countryIndex.length) * 100)}%
              </p>
            </div>
          </div>
        </section>

        {/* Countries Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCountries.map((country) => (
              <CountryCard
                key={country.slug}
                country={country}
                visited={visitedCountries.includes(country.slug)}
              />
            ))}
          </div>

          {filteredCountries.length === 0 && (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🔍</span>
              <p className="font-fredoka text-xl text-gray-600">
                No countries found for this continent.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

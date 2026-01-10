'use client';

import { useState, useEffect } from 'react';
import { Country, AgeGroup } from '@/lib/types';
import { markCountryVisited, getCountriesVisited } from '@/lib/storage';

interface CountryDetailProps {
  country: Country;
}

export function CountryDetail({ country }: CountryDetailProps) {
  const [selectedAge, setSelectedAge] = useState<AgeGroup>('6-8');
  const [isVisited, setIsVisited] = useState(false);

  useEffect(() => {
    // Mark as visited when viewing
    markCountryVisited(country.slug);
    setIsVisited(getCountriesVisited().includes(country.slug));
  }, [country.slug]);

  const ageGroups: { value: AgeGroup; label: string; icon: string }[] = [
    { value: '3-5', label: 'Ages 3-5', icon: '🧒' },
    { value: '6-8', label: 'Ages 6-8', icon: '👦' },
    { value: '9-12', label: 'Ages 9-12', icon: '🧑' },
  ];

  return (
    <div className="space-y-8">
      {/* Age Selector */}
      <section className="bg-white rounded-kid-xl shadow-soft p-6">
        <h2 className="font-fredoka text-lg font-bold text-gray-700 mb-4">
          Choose Your Reading Level:
        </h2>
        <div className="flex flex-wrap gap-2">
          {ageGroups.map((age) => (
            <button
              key={age.value}
              onClick={() => setSelectedAge(age.value)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-fredoka font-semibold transition-all ${
                selectedAge === age.value
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{age.icon}</span>
              <span>{age.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Main Content Based on Age */}
      <section className="bg-white rounded-kid-xl shadow-soft p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">📖</span>
          <h2 className="font-fredoka text-2xl font-bold text-gray-800">
            About {country.name}
          </h2>
        </div>
        <p className="font-nunito text-lg leading-relaxed text-gray-700">
          {country.ageContent[selectedAge]}
        </p>
      </section>

      {/* Languages */}
      <section className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-kid-xl shadow-soft p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🗣️</span>
          <h2 className="font-fredoka text-2xl font-bold text-gray-800">
            Languages
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {country.languages.map((language, index) => (
            <span
              key={index}
              className="inline-block px-4 py-2 bg-white rounded-full font-fredoka font-semibold text-purple-700"
            >
              {language}
            </span>
          ))}
        </div>
      </section>

      {/* Fun Facts */}
      <section className="bg-white rounded-kid-xl shadow-soft p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">💡</span>
          <h2 className="font-fredoka text-2xl font-bold text-gray-800">
            Fun Facts
          </h2>
        </div>
        <div className="space-y-4">
          {country.funFacts.map((fact, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-kid-lg"
            >
              <span className="text-2xl flex-shrink-0">⭐</span>
              <p className="font-nunito text-gray-700">{fact}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Landmarks */}
      <section className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-kid-xl shadow-soft p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🏛️</span>
          <h2 className="font-fredoka text-2xl font-bold text-gray-800">
            Famous Landmarks
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {country.landmarks.map((landmark, index) => (
            <div
              key={index}
              className="bg-white rounded-kid-lg p-4 shadow-sm"
            >
              <p className="font-nunito text-gray-700">{landmark}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Animals */}
      <section className="bg-white rounded-kid-xl shadow-soft p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🐾</span>
          <h2 className="font-fredoka text-2xl font-bold text-gray-800">
            Animals You Can Find
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {country.animals.map((animal, index) => (
            <span
              key={index}
              className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full font-nunito font-semibold"
            >
              {animal}
            </span>
          ))}
        </div>
      </section>

      {/* Foods */}
      <section className="bg-gradient-to-r from-orange-100 to-red-100 rounded-kid-xl shadow-soft p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🍽️</span>
          <h2 className="font-fredoka text-2xl font-bold text-gray-800">
            Traditional Foods
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {country.foods.map((food, index) => (
            <span
              key={index}
              className="inline-block px-4 py-2 bg-white text-orange-700 rounded-full font-nunito font-semibold"
            >
              {food}
            </span>
          ))}
        </div>
      </section>

      {/* Visited Badge */}
      {isVisited && (
        <section className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-kid-xl shadow-lg p-6 text-white text-center">
          <span className="text-4xl mb-2 block">🎉</span>
          <h3 className="font-fredoka text-xl font-bold">
            You&apos;ve Explored {country.name}!
          </h3>
          <p className="font-nunito">Keep exploring to discover more countries!</p>
        </section>
      )}
    </div>
  );
}

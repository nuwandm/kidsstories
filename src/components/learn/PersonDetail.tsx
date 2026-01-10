'use client';

import { useState, useEffect } from 'react';
import { FamousPerson, AgeGroup } from '@/lib/types';
import { markPersonDiscovered, getPeopleDiscovered } from '@/lib/storage';

interface PersonDetailProps {
  person: FamousPerson;
}

export function PersonDetail({ person }: PersonDetailProps) {
  const [selectedAge, setSelectedAge] = useState<AgeGroup>('6-8');
  const [isDiscovered, setIsDiscovered] = useState(false);

  useEffect(() => {
    // Mark as discovered when viewing
    markPersonDiscovered(person.slug);
    setIsDiscovered(getPeopleDiscovered().includes(person.slug));
  }, [person.slug]);

  const ageGroups: { value: AgeGroup; label: string; icon: string }[] = [
    { value: '3-5', label: 'Ages 3-5', icon: '🧒' },
    { value: '6-8', label: 'Ages 6-8', icon: '👦' },
    { value: '9-12', label: 'Ages 9-12', icon: '🧑' },
  ];

  return (
    <div className="space-y-8">
      {/* Famous For */}
      <section className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-kid-xl shadow-soft p-6 sm:p-8 text-center">
        <span className="text-4xl mb-4 block">⭐</span>
        <h2 className="font-fredoka text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Famous For
        </h2>
        <p className="font-nunito text-lg text-gray-700">
          {person.famousFor}
        </p>
      </section>

      {/* Quote */}
      <section className="bg-white rounded-kid-xl shadow-soft p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="text-4xl flex-shrink-0">&ldquo;</span>
          <div>
            <p className="font-nunito text-xl italic text-gray-700 mb-2">
              {person.quote}
            </p>
            <p className="font-fredoka text-gray-500">
              — {person.name}
            </p>
          </div>
        </div>
      </section>

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

      {/* Story Based on Age */}
      <section className="bg-white rounded-kid-xl shadow-soft p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">📖</span>
          <h2 className="font-fredoka text-2xl font-bold text-gray-800">
            Their Story
          </h2>
        </div>
        <p className="font-nunito text-lg leading-relaxed text-gray-700">
          {person.ageContent[selectedAge]}
        </p>
      </section>

      {/* Achievements */}
      <section className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-kid-xl shadow-soft p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🏆</span>
          <h2 className="font-fredoka text-2xl font-bold text-gray-800">
            Achievements
          </h2>
        </div>
        <div className="space-y-3">
          {person.achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex gap-3 p-3 bg-white rounded-kid-lg"
            >
              <span className="text-xl flex-shrink-0">✓</span>
              <p className="font-nunito text-gray-700">{achievement}</p>
            </div>
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
          {person.funFacts.map((fact, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-kid-lg"
            >
              <span className="text-2xl flex-shrink-0">🎯</span>
              <p className="font-nunito text-gray-700">{fact}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Discovered Badge */}
      {isDiscovered && (
        <section className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-kid-xl shadow-lg p-6 text-white text-center">
          <span className="text-4xl mb-2 block">🎉</span>
          <h3 className="font-fredoka text-xl font-bold">
            You&apos;ve Discovered {person.name}!
          </h3>
          <p className="font-nunito">Keep exploring to discover more inspiring people!</p>
        </section>
      )}
    </div>
  );
}

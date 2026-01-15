'use client';

import { useState, useEffect } from 'react';
import { Animal, AgeGroup, AgeGroupType } from '@/lib/types';
import { markAnimalLearned, getAnimalsLearned } from '@/lib/storage';
import { PhotoGallery } from './PhotoGallery';

interface AnimalDetailProps {
  animal: Animal;
}

export function AnimalDetail({ animal }: AnimalDetailProps) {
  const [selectedAge, setSelectedAge] = useState<AgeGroup | AgeGroupType>('6-8');
  const [isLearned, setIsLearned] = useState(false);

  useEffect(() => {
    // Mark as learned when viewing
    markAnimalLearned(animal.slug);
    setIsLearned(getAnimalsLearned().includes(animal.slug));
  }, [animal.slug]);

  const ageGroups: { value: AgeGroup | AgeGroupType; label: string; icon: string }[] = [
    { value: '3-5', label: 'Ages 3-5', icon: '🧒' },
    { value: '6-8', label: 'Ages 6-8', icon: '👦' },
    { value: '9-12', label: 'Ages 9-12', icon: '🧑' },
  ];

  const conservationColors: Record<string, string> = {
    'Least Concern': 'bg-green-100 text-green-700',
    'Vulnerable': 'bg-yellow-100 text-yellow-700',
    'Endangered': 'bg-orange-100 text-orange-700',
    'Critically Endangered': 'bg-red-100 text-red-700',
  };

  const conservationClass = conservationColors[animal.conservationStatus] || 'bg-gray-100 text-gray-700';

  return (
    <div className="space-y-8">
      {/* Conservation Status */}
      <section className={`rounded-kid-xl shadow-soft p-6 text-center ${conservationClass}`}>
        <h2 className="font-fredoka text-lg font-bold mb-2">
          Conservation Status
        </h2>
        <p className="font-nunito text-xl font-semibold">
          {animal.conservationStatus}
        </p>
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
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105'
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
            About the {animal.name}
          </h2>
        </div>
        <p className="font-nunito text-lg leading-relaxed text-gray-700">
          {animal.ageContent[selectedAge]}
        </p>
      </section>

      {/* Quick Facts */}
      <section className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-kid-xl shadow-soft p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">📋</span>
          <h2 className="font-fredoka text-2xl font-bold text-gray-800">
            Quick Facts
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-kid-lg p-4 text-center">
            <span className="text-3xl mb-2 block">🏷️</span>
            <p className="font-fredoka font-bold text-gray-800">Type</p>
            <p className="font-nunito text-gray-600">{animal.type}</p>
          </div>
          <div className="bg-white rounded-kid-lg p-4 text-center">
            <span className="text-3xl mb-2 block">🍽️</span>
            <p className="font-fredoka font-bold text-gray-800">Diet</p>
            <p className="font-nunito text-gray-600">{animal.diet}</p>
          </div>
          <div className="bg-white rounded-kid-lg p-4 text-center">
            <span className="text-3xl mb-2 block">🏠</span>
            <p className="font-fredoka font-bold text-gray-800">Habitat</p>
            <p className="font-nunito text-gray-600">{animal.habitat.join(', ')}</p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {animal.gallery && animal.gallery.length > 0 && (
        <PhotoGallery images={animal.gallery} animalName={animal.name} />
      )}

      {/* Fun Facts */}
      <section className="bg-white rounded-kid-xl shadow-soft p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">💡</span>
          <h2 className="font-fredoka text-2xl font-bold text-gray-800">
            Fun Facts
          </h2>
        </div>
        <div className="space-y-4">
          {animal.funFacts.map((fact, index) => (
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

      {/* Learned Badge */}
      {isLearned && (
        <section className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-kid-xl shadow-lg p-6 text-white text-center">
          <span className="text-4xl mb-2 block">🎉</span>
          <h3 className="font-fredoka text-xl font-bold">
            You&apos;ve Learned About the {animal.name}!
          </h3>
          <p className="font-nunito">Keep exploring to discover more amazing animals!</p>
        </section>
      )}
    </div>
  );
}

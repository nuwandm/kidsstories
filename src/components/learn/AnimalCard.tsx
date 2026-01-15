'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AnimalIndexItem } from '@/lib/types';
import { getImageUrl } from '@/lib/imageUrl';

interface AnimalCardProps {
  animal: AnimalIndexItem;
  learned?: boolean;
}

const typeColors: Record<string, string> = {
  Mammal: 'from-orange-400 to-amber-400',
  Bird: 'from-sky-400 to-blue-400',
  Reptile: 'from-green-400 to-emerald-400',
  Amphibian: 'from-teal-400 to-cyan-400',
  Fish: 'from-blue-400 to-indigo-400',
  Insect: 'from-yellow-400 to-lime-400',
};

const typeBgColors: Record<string, string> = {
  Mammal: 'bg-orange-50',
  Bird: 'bg-sky-50',
  Reptile: 'bg-green-50',
  Amphibian: 'bg-teal-50',
  Fish: 'bg-blue-50',
  Insect: 'bg-yellow-50',
};

export function AnimalCard({ animal, learned = false }: AnimalCardProps) {
  const colorClass = typeColors[animal.type] || 'from-purple-400 to-pink-400';
  const bgColorClass = typeBgColors[animal.type] || 'bg-purple-50';

  return (
    <Link
      href={`/learn/animals/${animal.slug}`}
      className="group block"
    >
      <div className={`${bgColorClass} rounded-kid-xl shadow-soft p-6 hover:shadow-soft-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden`}>
        {/* Learned Badge */}
        {learned && (
          <div className="absolute top-3 right-3 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-fredoka font-bold shadow-lg">
            Learned!
          </div>
        )}

        {/* Animal Image/Emoji */}
        {animal.coverImage ? (
          <div className="relative w-full aspect-square mb-4 rounded-kid-lg overflow-hidden group-hover:scale-105 transition-transform">
            <Image
              src={getImageUrl(animal.coverImage)}
              alt={animal.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {/* Emoji overlay */}
            <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-lg">
              {animal.image}
            </div>
          </div>
        ) : (
          <div className="text-6xl sm:text-7xl text-center mb-4 group-hover:scale-110 transition-transform">
            {animal.image}
          </div>
        )}

        {/* Animal Name */}
        <h3 className="font-fredoka text-xl sm:text-2xl font-bold text-gray-800 text-center mb-2">
          {animal.name}
        </h3>

        {/* Habitat */}
        <p className="font-nunito text-gray-600 text-center text-sm mb-3">
          {animal.habitat.slice(0, 2).join(', ')}
        </p>

        {/* Type Badge */}
        <div className="flex justify-center">
          <span className={`inline-block px-4 py-1 bg-gradient-to-r ${colorClass} text-white rounded-full text-xs font-fredoka font-bold`}>
            {animal.type}
          </span>
        </div>

        {/* Hover Indicator */}
        <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-green-600 font-fredoka font-semibold text-sm">
            Learn more! →
          </span>
        </div>
      </div>
    </Link>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FamousPersonIndexItem } from '@/lib/types';
import { getImageUrl } from '@/lib/imageUrl';

interface PersonCardProps {
  person: FamousPersonIndexItem;
  discovered?: boolean;
}

const categoryColors: Record<string, string> = {
  Scientist: 'from-blue-400 to-cyan-400',
  Inventor: 'from-yellow-400 to-orange-400',
  Artist: 'from-pink-400 to-purple-400',
  Explorer: 'from-green-400 to-emerald-400',
  Leader: 'from-red-400 to-rose-400',
};

const categoryBgColors: Record<string, string> = {
  Scientist: 'bg-blue-50',
  Inventor: 'bg-yellow-50',
  Artist: 'bg-pink-50',
  Explorer: 'bg-green-50',
  Leader: 'bg-red-50',
};

export function PersonCard({ person, discovered = false }: PersonCardProps) {
  const colorClass = categoryColors[person.category] || 'from-purple-400 to-pink-400';
  const bgColorClass = categoryBgColors[person.category] || 'bg-purple-50';

  return (
    <Link
      href={`/learn/famous-people/${person.slug}`}
      className="group block"
    >
      <div className={`${bgColorClass} rounded-kid-xl shadow-soft p-6 hover:shadow-soft-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden`}>
        {/* Discovered Badge */}
        {discovered && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-fredoka font-bold z-10">
            Discovered!
          </div>
        )}

        {/* Portrait */}
        <div className="mb-4 group-hover:scale-105 transition-transform">
          {person.profileImage ? (
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full border-2 border-white shadow-md overflow-hidden">
              <Image
                src={getImageUrl(person.profileImage)}
                alt={person.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center mx-auto`}>
              <span className="text-4xl">{person.portrait}</span>
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="font-fredoka text-xl font-bold text-gray-800 text-center mb-1">
          {person.name}
        </h3>

        {/* Title */}
        <p className="font-nunito text-gray-600 text-center text-sm mb-3">
          {person.title}
        </p>

        {/* Famous For */}
        <p className="font-nunito text-gray-700 text-center text-sm mb-3">
          {person.famousFor}
        </p>

        {/* Category Badge */}
        <div className="flex justify-center">
          <span className={`inline-block px-4 py-1 bg-gradient-to-r ${colorClass} text-white rounded-full text-xs font-fredoka font-bold`}>
            {person.category}
          </span>
        </div>

        {/* Hover Indicator */}
        <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-purple-600 font-fredoka font-semibold text-sm">
            Learn more! →
          </span>
        </div>
      </div>
    </Link>
  );
}

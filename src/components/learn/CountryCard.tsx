'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CountryIndexItem } from '@/lib/types';

interface CountryCardProps {
  country: CountryIndexItem;
  visited?: boolean;
}

export function CountryCard({ country, visited = false }: CountryCardProps) {
  return (
    <Link
      href={`/learn/countries/${country.slug}`}
      className="group block"
    >
      <div className="bg-white rounded-kid-xl shadow-soft p-6 hover:shadow-soft-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
        {/* Visited Badge */}
        {visited && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-fredoka font-bold z-10">
            Visited!
          </div>
        )}

        {/* Flag */}
        <div className="mb-4 group-hover:scale-105 transition-transform">
          {country.flagImage ? (
            <div className="relative w-24 h-16 sm:w-28 sm:h-20 mx-auto rounded-lg overflow-hidden shadow-md border-2 border-gray-100">
              <Image
                src={`${process.env.NEXT_PUBLIC_PDF_BUCKET_URL}${country.flagImage}`}
                alt={`Flag of ${country.name}`}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="text-6xl sm:text-7xl text-center">
              {country.flag}
            </div>
          )}
        </div>

        {/* Country Name */}
        <h3 className="font-fredoka text-xl sm:text-2xl font-bold text-gray-800 text-center mb-2">
          {country.name}
        </h3>

        {/* Capital */}
        <p className="font-nunito text-gray-600 text-center mb-3">
          <span className="text-sm">Capital: </span>
          <span className="font-semibold">{country.capital}</span>
        </p>

        {/* Continent Badge */}
        <div className="flex justify-center">
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm font-fredoka">
            {country.continent}
          </span>
        </div>

        {/* Hover Indicator */}
        <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-purple-600 font-fredoka font-semibold text-sm">
            Click to explore! →
          </span>
        </div>
      </div>
    </Link>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getReadingHistory, type ReadingHistoryItem } from '@/lib/storage';

/**
 * Recently Read Stories Component
 * Displays the last 5 stories the user has read
 */
export function RecentlyRead() {
  const [history, setHistory] = useState<ReadingHistoryItem[]>([]);

  useEffect(() => {
    const recentStories = getReadingHistory().slice(0, 5);
    setHistory(recentStories);
  }, []);

  if (history.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">
            Continue Reading
            <span className="ml-3 text-3xl">📚</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {history.map((item) => (
            <Link
              key={item.slug}
              href={`/stories/${item.slug}/`}
              className="group block focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-400 focus-visible:ring-offset-4 rounded-kid-lg"
            >
              <div className="relative bg-white rounded-kid-lg overflow-hidden shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-2 border-2 border-white/80 hover:border-primary-200">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Continue indicator */}
                  <div className="absolute bottom-2 right-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-primary-500 backdrop-blur-sm rounded-full shadow-md">
                      <span className="text-xs font-bold text-white">Continue</span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="p-3">
                  <h3 className="font-display text-sm font-bold text-slate-800 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

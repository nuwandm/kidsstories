import Image from 'next/image';
import Link from 'next/link';
import { StoryCardProps } from '@/lib/types';
import { isStoryNew } from '@/lib/utils';

/**
 * Modern, Engaging Story Card Component
 *
 * Features:
 * - Smooth hover animations with lift effect
 * - Gradient overlays for visual interest
 * - Decorative elements for kid appeal
 * - Optimized image loading
 * - Playful "Read Now" button
 * - "New" badge for recently uploaded stories (within 7 days)
 */
export function StoryCard({ story, priority = false }: StoryCardProps) {
  const showNewBadge = isStoryNew(story.uploadedDate);
  return (
    <article className="group relative animate-slide-up">
      <Link
        href={`/stories/${story.slug}/`}
        className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-400 focus-visible:ring-offset-4 rounded-kid-xl"
        aria-label={`Read "${story.title}"`}
      >
        {/* Card container */}
        <div className="relative bg-white rounded-kid-xl overflow-hidden shadow-soft transition-all duration-500 ease-out group-hover:shadow-soft-xl group-hover:-translate-y-3 border-2 border-white/80 group-hover:border-primary-200">
          {/* Decorative corner badge - only show if story is new (within 7 days) */}
          {showNewBadge && (
            <div className="absolute top-4 right-4 z-20">
              <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-primary-500 to-candy-500 backdrop-blur-sm rounded-full shadow-md group-hover:scale-110 transition-transform duration-300 animate-pulse-soft">
                <span className="text-sm">✨</span>
                <span className="text-xs font-bold text-white">New</span>
              </div>
            </div>
          )}

          {/* Image container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {/* Image */}
            <Image
              src={story.coverImage}
              alt={`Cover image for ${story.title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              priority={priority}
            />

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Bottom gradient for text readability */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />

            {/* Floating read button on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-4">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-xl font-display font-bold text-primary-600 hover:bg-primary-50 transition-colors">
                <span>Read Now</span>
                <span className="text-lg group-hover:animate-bounce-gentle">
                  📖
                </span>
              </span>
            </div>
          </div>

          {/* Content area */}
          <div className="relative p-5 sm:p-6">
            {/* Decorative dots */}
            <div className="absolute top-0 right-6 flex gap-1.5 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-candy-400" />
              <div className="w-2 h-2 rounded-full bg-sunset-400" />
              <div className="w-2 h-2 rounded-full bg-ocean-400" />
            </div>

            {/* Title */}
            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-800 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2 mb-3">
              {story.title}
            </h2>

            {/* Read action */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary-500 group-hover:text-primary-600 transition-colors">
                <span className="font-display font-semibold text-sm">
                  Start Reading
                </span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>

              {/* Page count badge */}
              <div className="flex items-center gap-1 text-slate-400 text-sm">
                <span>📄</span>
                <span className="font-medium">7 pages</span>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div
            className="h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                'linear-gradient(90deg, #9333ea 0%, #ec4899 50%, #f97316 100%)',
            }}
          />
        </div>
      </Link>
    </article>
  );
}

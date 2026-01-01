import { MoreStoriesProps } from '@/lib/types';
import { getRelatedStories } from '@/content/storyIndex';
import { StoryCard } from './StoryCard';

/**
 * Modern More Stories Component
 *
 * Features:
 * - Engaging section header with decorations
 * - Beautiful story grid
 * - Encouragement for continued reading
 */
export function MoreStories({ currentSlug, limit = 4 }: MoreStoriesProps) {
  const relatedStories = getRelatedStories(currentSlug, limit);

  if (relatedStories.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 sm:mt-20" aria-labelledby="more-stories-heading">
      {/* Section header */}
      <div className="text-center mb-10 sm:mb-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 mb-4 bg-gradient-to-r from-candy-100 to-sunset-100 rounded-full border border-candy-200">
          <span className="text-lg animate-sparkle">✨</span>
          <span className="font-display font-semibold text-candy-700">
            More Adventures
          </span>
          <span
            className="text-lg animate-sparkle"
            style={{ animationDelay: '0.5s' }}
          >
            ✨
          </span>
        </div>

        <h2
          id="more-stories-heading"
          className="font-display text-2xl sm:text-3xl font-bold text-slate-800"
        >
          Keep Reading!
        </h2>
        <p className="mt-2 text-slate-500 font-display">
          Here are more wonderful stories waiting for you.
        </p>
      </div>

      {/* Stories grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {relatedStories.map((story, index) => (
          <div
            key={story.slug}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <StoryCard story={story} priority={false} />
          </div>
        ))}
      </div>
    </section>
  );
}

import { Metadata } from 'next';
import { storyIndex, getTotalStoryCount } from '@/content/storyIndex';
import { StoryCard } from '@/components/StoryCard';
import { AdSlot } from '@/components/AdSlot';

/**
 * Modern, Engaging Home Page
 *
 * Features:
 * - Playful hero section with animations
 * - Beautiful story grid with staggered animations
 * - Decorative floating elements
 * - Kid-friendly visual design
 */

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Kids Stories - Magical Stories for Children Under 10',
  description:
    'Discover magical stories for children! Browse our collection of fun, educational, and entertaining stories perfect for kids under 10. New stories added regularly!',
  openGraph: {
    title: 'Kids Stories - Magical Stories for Children',
    description:
      'Discover magical stories for children! Browse our collection of fun stories perfect for kids under 10.',
    type: 'website',
  },
};

export default function HomePage() {
  const totalStories = getTotalStoryCount();

  return (
    <div className="relative overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="float-decoration top-32 left-[10%] text-5xl">🌟</span>
        <span
          className="float-decoration top-48 right-[15%] text-4xl"
          style={{ animationDelay: '1s' }}
        >
          ✨
        </span>
        <span
          className="float-decoration top-96 left-[5%] text-3xl"
          style={{ animationDelay: '2s' }}
        >
          🌈
        </span>
        <span
          className="float-decoration bottom-48 right-[8%] text-4xl"
          style={{ animationDelay: '1.5s' }}
        >
          🦋
        </span>
        <span
          className="float-decoration bottom-32 left-[12%] text-5xl"
          style={{ animationDelay: '0.5s' }}
        >
          🌸
        </span>
      </div>

      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-12 pb-12 sm:pb-16">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-200/40 to-candy-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-ocean-200/40 to-mint-200/40 rounded-full blur-3xl" />
        </div>

        <div className="container-story text-center">
          {/* Welcome badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white/80 backdrop-blur-sm rounded-full shadow-soft border border-primary-100 animate-slide-up">
            <span className="text-xl animate-wiggle">👋</span>
            <span className="font-display font-semibold text-primary-600">
              Welcome, Little Reader!
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-balance animate-slide-up max-w-4xl mx-auto">
            <span className="text-gradient">Magical Stories</span>
            <br />
            <span className="text-slate-800">for Amazing Kids</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto animate-slide-up font-display">
            Discover wonderful adventures, meet new friends, and explore magical
            worlds in our collection of stories!
          </p>

          {/* Story count badge */}
          <div className="mt-8 animate-slide-up">
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-white font-display font-bold shadow-lg"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <span className="text-2xl">📚</span>
              <span>
                {totalStories} {totalStories === 1 ? 'Story' : 'Stories'} to
                Explore!
              </span>
              <span className="text-2xl animate-bounce-gentle">🎉</span>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="text-3xl animate-float">📖</span>
            <span
              className="text-2xl animate-float"
              style={{ animationDelay: '0.5s' }}
            >
              ⭐
            </span>
            <span
              className="text-3xl animate-float"
              style={{ animationDelay: '1s' }}
            >
              🌙
            </span>
            <span
              className="text-2xl animate-float"
              style={{ animationDelay: '1.5s' }}
            >
              ✨
            </span>
            <span
              className="text-3xl animate-float"
              style={{ animationDelay: '2s' }}
            >
              🦄
            </span>
          </div>
        </div>
      </section>

      {/* Ad slot - non-intrusive placement */}
      <div className="container-story mb-12 sm:mb-16">
        <AdSlot slotId="home-header" format="horizontal" />
      </div>

      {/* Stories Section */}
      <section className="container-story pb-16 sm:pb-24">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-sunset-100 rounded-full">
            <span className="text-lg">🔥</span>
            <span className="font-display font-semibold text-sunset-700 text-sm">
              Popular Stories
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-800">
            Choose Your Adventure
          </h2>
          <p className="mt-2 text-slate-500 font-display">
            Tap on any story to start reading!
          </p>
        </div>

        {/* Stories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {storyIndex.map((story, index) => (
            <div
              key={story.slug}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-slide-up"
            >
              <StoryCard story={story} priority={index < 4} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {storyIndex.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white rounded-kid-xl shadow-soft">
              <span className="text-6xl mb-4 block">😢</span>
              <p className="font-display text-xl text-slate-600">
                No stories yet.
              </p>
              <p className="text-slate-400 mt-2">
                Check back soon for new adventures!
              </p>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        {storyIndex.length > 0 && (
          <div className="mt-16 sm:mt-20 text-center">
            {/* Encouragement card */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-ocean-400 rounded-kid-xl blur-xl opacity-20" />
              <div className="relative glass-card px-8 sm:px-12 py-8 sm:py-10">
                <span className="text-4xl block mb-4 animate-bounce-gentle">
                  🎯
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                  Ready to Read?
                </h3>
                <p className="text-slate-600 font-display">
                  Pick any story above and start your adventure!
                </p>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <span className="text-2xl">👆</span>
                  <span className="font-display font-medium text-primary-600">
                    Just tap a story card
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

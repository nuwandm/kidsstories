import Link from 'next/link';

/**
 * Modern, Playful Header Component
 *
 * Features:
 * - Glass morphism effect
 * - Gradient logo with animation
 * - Floating decorative elements
 * - Kid-friendly navigation
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 no-print">
      {/* Glass background */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-white/50" />

      {/* Decorative gradient line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background:
            'linear-gradient(90deg, #9333ea 0%, #ec4899 25%, #f97316 50%, #06b6d4 75%, #10b981 100%)',
        }}
      />

      <div className="container-story relative">
        <nav
          className="flex items-center justify-between h-20 sm:h-24"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-transform duration-300 hover:scale-105"
          >
            {/* Animated logo icon */}
            <div className="relative">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <span className="animate-bounce-gentle">📚</span>
              </div>
              {/* Sparkle decoration */}
              <span className="absolute -top-1 -right-1 text-lg animate-sparkle">
                ✨
              </span>
            </div>

            {/* Logo text */}
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl font-bold text-gradient-primary">
                Kids Stories
              </span>
              <span className="text-xs sm:text-sm text-slate-500 font-medium hidden sm:block">
                Magical Adventures Await!
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Home button */}
            <Link
              href="/"
              className="group flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white border-2 border-primary-100 hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 hover:shadow-md"
            >
              <span className="text-lg group-hover:animate-bounce-gentle">
                🏠
              </span>
              <span className="font-display font-semibold text-slate-700 group-hover:text-primary-600 transition-colors hidden sm:inline">
                Home
              </span>
            </Link>

            {/* Stories count badge */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-candy-100 to-sunset-100 border border-candy-200">
              <span className="text-sm">📖</span>
              <span className="font-display font-semibold text-candy-700 text-sm">
                New Stories!
              </span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

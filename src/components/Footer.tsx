import Link from 'next/link';

/**
 * Modern, Clean Footer Component
 *
 * Features:
 * - Gradient accent bar
 * - Kid-friendly messaging
 * - Important links for AdSense compliance
 * - Responsive design
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto no-print">
      {/* Top gradient accent */}
      <div
        className="h-1"
        style={{
          background:
            'linear-gradient(90deg, #9333ea 0%, #ec4899 25%, #f97316 50%, #06b6d4 75%, #10b981 100%)',
        }}
      />

      {/* Main footer content */}
      <div className="bg-white/80 backdrop-blur-xl border-t border-white/50">
        <div className="container-story py-12 sm:py-16">
          {/* Top section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {/* Brand section */}
            <div className="text-center md:text-left">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <span>📚</span>
                </div>
                <div>
                  <span className="font-display text-xl font-bold text-gradient-primary">
                    Kids Stories
                  </span>
                  <p className="text-xs text-slate-500">
                    Magical Adventures Await!
                  </p>
                </div>
              </Link>

              <p className="mt-4 text-slate-600 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                A magical place where children discover wonderful stories filled
                with adventure, friendship, and valuable life lessons.
              </p>

              {/* Decorative emojis */}
              <div className="flex items-center justify-center md:justify-start gap-2 mt-4">
                <span className="text-xl">✨</span>
                <span className="text-xl">📖</span>
                <span className="text-xl">🌟</span>
                <span className="text-xl">🦄</span>
              </div>
            </div>

            {/* Quick links */}
            <div className="text-center">
              <h3 className="font-display font-bold text-slate-800 mb-4 flex items-center justify-center gap-2">
                <span className="text-lg">🔗</span>
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-600 transition-colors font-display"
                  >
                    <span>🏠</span>
                    <span>All Stories</span>
                  </Link>
                </li>
                {/* Add more links as needed */}
              </ul>
            </div>

            {/* For parents section */}
            <div className="text-center md:text-right">
              <h3 className="font-display font-bold text-slate-800 mb-4 flex items-center justify-center md:justify-end gap-2">
                <span className="text-lg">👨‍👩‍👧</span>
                For Parents
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto md:ml-auto md:mr-0">
                All stories are carefully crafted to be age-appropriate,
                educational, and entertaining for children under 10.
              </p>

              {/* Trust badges */}
              <div className="flex items-center justify-center md:justify-end gap-3 mt-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-mint-100 rounded-full">
                  <span className="text-sm">✓</span>
                  <span className="text-xs font-bold text-mint-700">Safe</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ocean-100 rounded-full">
                  <span className="text-sm">📚</span>
                  <span className="text-xs font-bold text-ocean-700">
                    Educational
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-slate-200" />

          {/* Bottom section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-slate-500 text-sm font-display">
              © {currentYear} Kids Stories. Made with{' '}
              <span className="text-candy-500">♥</span> for little readers.
            </p>

            {/* Legal links */}
            <div className="flex items-center gap-6 text-sm">
              <span className="text-slate-400 hover:text-primary-600 transition-colors cursor-pointer font-display">
                Privacy Policy
              </span>
              <span className="text-slate-400 hover:text-primary-600 transition-colors cursor-pointer font-display">
                Terms of Use
              </span>
            </div>
          </div>

          {/* Bottom decorative message */}
          <div className="mt-8 text-center">
            <p className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-sm text-primary-600 font-display">
              <span className="animate-wiggle">🌙</span>
              Sweet dreams and happy reading!
              <span className="animate-wiggle" style={{ animationDelay: '0.5s' }}>
                ⭐
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

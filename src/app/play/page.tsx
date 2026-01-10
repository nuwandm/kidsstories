import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Play - Kids Stories',
  description: 'Have fun with educational games! Play memory match games and test your knowledge.',
};

const games = [
  {
    href: '/play/memory',
    icon: '🃏',
    title: 'Memory Match',
    description: 'Test your memory! Match pairs of cards featuring flags, animals, and famous people.',
    color: 'from-purple-400 to-pink-400',
    bgColor: 'bg-purple-50',
    badge: 'Popular',
  },
];

const comingSoon = [
  {
    icon: '❓',
    title: 'Quiz Arena',
    description: 'Test your knowledge with fun quizzes about countries, animals, and more!',
    bgColor: 'bg-blue-50',
  },
  {
    icon: '🧩',
    title: 'Puzzles',
    description: 'Solve jigsaw puzzles and word searches!',
    bgColor: 'bg-green-50',
  },
  {
    icon: '🔢',
    title: 'Math Games',
    description: 'Practice math with fun number games!',
    bgColor: 'bg-orange-50',
  },
];

export default function PlayPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 py-12 sm:py-16">
        <div className="container-story text-center">
          <div className="inline-block mb-4 animate-bounce-gentle">
            <span className="text-6xl sm:text-7xl md:text-8xl">🎮</span>
          </div>
          <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Play & Learn
          </h1>
          <p className="font-nunito text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto">
            Have fun while learning with our educational games!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-story py-12 sm:py-16">
        {/* Available Games */}
        <section className="mb-16">
          <h2 className="font-fredoka text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
            Games to Play
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <Link
                key={game.href}
                href={game.href}
                className="group block"
              >
                <div className={`${game.bgColor} rounded-kid-xl shadow-soft p-8 hover:shadow-soft-xl hover:-translate-y-3 transition-all duration-300 h-full relative`}>
                  {game.badge && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-1 rounded-full font-fredoka font-bold text-sm shadow-lg">
                      {game.badge}
                    </div>
                  )}
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${game.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                    <span className="text-5xl">{game.icon}</span>
                  </div>
                  <h3 className="font-fredoka text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-4">
                    {game.title}
                  </h3>
                  <p className="font-nunito text-gray-700 text-center text-lg leading-relaxed">
                    {game.description}
                  </p>
                  <div className="mt-6 text-center">
                    <span className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${game.color} text-white rounded-full font-fredoka font-semibold group-hover:scale-105 transition-transform`}>
                      Play Now
                      <span className="text-xl">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Coming Soon */}
        <section className="mb-16">
          <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8">
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comingSoon.map((game, index) => (
              <div
                key={index}
                className={`${game.bgColor} rounded-kid-xl shadow-soft p-6 opacity-75`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-4xl grayscale">{game.icon}</span>
                  <h3 className="font-fredoka text-xl font-bold text-gray-600">
                    {game.title}
                  </h3>
                </div>
                <p className="font-nunito text-gray-500">
                  {game.description}
                </p>
                <div className="mt-4">
                  <span className="inline-block px-4 py-2 bg-gray-200 text-gray-500 rounded-full font-fredoka text-sm">
                    Coming Soon
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Game Tips */}
        <section className="mb-16">
          <div className="bg-white rounded-kid-xl shadow-soft p-8 sm:p-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">💡</span>
              <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-gray-800">
                Game Tips
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <span className="text-3xl flex-shrink-0">🎯</span>
                <div>
                  <h3 className="font-fredoka text-lg font-bold text-gray-800 mb-1">
                    Take Your Time
                  </h3>
                  <p className="font-nunito text-gray-600">
                    There&apos;s no rush! Think carefully before making your move.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl flex-shrink-0">🧠</span>
                <div>
                  <h3 className="font-fredoka text-lg font-bold text-gray-800 mb-1">
                    Train Your Brain
                  </h3>
                  <p className="font-nunito text-gray-600">
                    The more you play, the better your memory gets!
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl flex-shrink-0">🏆</span>
                <div>
                  <h3 className="font-fredoka text-lg font-bold text-gray-800 mb-1">
                    Beat Your Score
                  </h3>
                  <p className="font-nunito text-gray-600">
                    Try to complete games with fewer moves each time!
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl flex-shrink-0">🎉</span>
                <div>
                  <h3 className="font-fredoka text-lg font-bold text-gray-800 mb-1">
                    Have Fun!
                  </h3>
                  <p className="font-nunito text-gray-600">
                    Learning is best when you&apos;re having a great time!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-kid-xl shadow-lg p-8 sm:p-12 text-white">
            <h2 className="font-fredoka text-3xl sm:text-4xl font-bold mb-4">
              Ready to Play?
            </h2>
            <p className="font-nunito text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
              Start with our Memory Match game and see how many pairs you can find!
            </p>
            <Link
              href="/play/memory"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-full font-fredoka font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <span className="text-2xl">🃏</span>
              <span>Play Memory Match</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

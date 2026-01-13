import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Learn - Kids Stories',
  description: 'Explore the world! Learn about countries, famous people, and amazing animals in our fun educational section.',
};

const learnCategories = [
  {
    href: '/learn/countries',
    icon: '🌍',
    title: 'Countries',
    description: 'Travel the world and discover amazing countries, their flags, cultures, and fun facts!',
    color: 'from-blue-400 to-cyan-400',
    bgColor: 'bg-blue-50',
  },
  {
    href: '/learn/famous-people',
    icon: '🌟',
    title: 'Famous People',
    description: 'Meet inspiring scientists, inventors, artists, and explorers who changed the world!',
    color: 'from-purple-400 to-pink-400',
    bgColor: 'bg-purple-50',
  },
  {
    href: '/learn/animals',
    icon: '🦁',
    title: 'Animal Kingdom',
    description: 'Explore the amazing animal kingdom! Learn about mammals, birds, reptiles, and more!',
    color: 'from-green-400 to-emerald-400',
    bgColor: 'bg-green-50',
  },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 py-12 sm:py-16">
        <div className="container-story text-center">
          <div className="inline-block mb-4 animate-bounce-gentle">
            <span className="text-6xl sm:text-7xl md:text-8xl">🎓</span>
          </div>
          <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Learn & Discover
          </h1>
          <p className="font-nunito text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto">
            Explore the world around you with fun facts and amazing discoveries!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-story py-12 sm:py-16">
        {/* Categories Grid */}
        <section className="mb-16">
          <h2 className="font-fredoka text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
            Choose Your Topic!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learnCategories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group block"
              >
                <div className={`${category.bgColor} rounded-kid-xl shadow-soft p-8 hover:shadow-soft-xl hover:-translate-y-3 transition-all duration-300 h-full`}>
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                    <span className="text-5xl">{category.icon}</span>
                  </div>
                  <h3 className="font-fredoka text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-4">
                    {category.title}
                  </h3>
                  <p className="font-nunito text-gray-700 text-center text-lg leading-relaxed">
                    {category.description}
                  </p>
                  <div className="mt-6 text-center">
                    <span className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${category.color} text-white rounded-full font-fredoka font-semibold group-hover:scale-105 transition-transform`}>
                      Explore
                      <span className="text-xl">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Fun Stats */}
        <section className="mb-16">
          <div className="bg-white rounded-kid-xl shadow-soft p-8 sm:p-12">
            <h2 className="font-fredoka text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8">
              What You&apos;ll Learn
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl mb-2">🌍</div>
                <p className="font-fredoka text-2xl font-bold text-purple-600">10+</p>
                <p className="font-nunito text-gray-600">Countries</p>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl mb-2">🌟</div>
                <p className="font-fredoka text-2xl font-bold text-pink-600">8+</p>
                <p className="font-nunito text-gray-600">Famous People</p>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl mb-2">🦁</div>
                <p className="font-fredoka text-2xl font-bold text-green-600">15+</p>
                <p className="font-nunito text-gray-600">Animals</p>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl mb-2">💡</div>
                <p className="font-fredoka text-2xl font-bold text-orange-600">100+</p>
                <p className="font-nunito text-gray-600">Fun Facts</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-kid-xl shadow-lg p-8 sm:p-12 text-white">
            <h2 className="font-fredoka text-3xl sm:text-4xl font-bold mb-4">
              Ready to Explore?
            </h2>
            <p className="font-nunito text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
              Pick a topic above and start your learning adventure! Every discovery makes you smarter!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/learn/countries"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-full font-fredoka font-bold hover:scale-105 transition-all"
              >
                <span className="text-xl">🌍</span>
                <span>Countries</span>
              </Link>
              <Link
                href="/learn/famous-people"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm border-2 border-white text-white rounded-full font-fredoka font-bold hover:bg-white/30 hover:scale-105 transition-all"
              >
                <span className="text-xl">🌟</span>
                <span>Famous People</span>
              </Link>
              <Link
                href="/learn/animals"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm border-2 border-white text-white rounded-full font-fredoka font-bold hover:bg-white/30 hover:scale-105 transition-all"
              >
                <span className="text-xl">🦁</span>
                <span>Animals</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

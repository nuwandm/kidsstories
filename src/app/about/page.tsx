import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Kids Stories',
  description: 'Learn about Kids Stories - our mission to provide magical, educational, and entertaining stories for children under 10.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50">
        {/* Hero Section */}
        <header className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 py-12 sm:py-16">
          <div className="container-story text-center">
            <div className="inline-block mb-4 animate-bounce-gentle">
              <span className="text-6xl sm:text-7xl md:text-8xl">✨</span>
            </div>
            <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              About Kids Stories
            </h1>
            <p className="font-nunito text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto">
              Making reading magical for young minds everywhere
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="container-story py-12 sm:py-16">
          {/* Mission Section */}
          <section className="mb-16">
            <div className="bg-white rounded-kid-xl shadow-soft p-8 sm:p-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">🎯</span>
                <h2 className="font-fredoka text-3xl sm:text-4xl font-bold text-gray-800">
                  Our Mission
                </h2>
              </div>
              <p className="font-nunito text-lg sm:text-xl text-gray-700 leading-relaxed mb-4">
                At Kids Stories, we believe that reading is the gateway to imagination, learning, and growth.
                Our mission is to provide children under 10 with access to high-quality, engaging, and
                age-appropriate stories that inspire wonder and foster a lifelong love of reading.
              </p>
              <p className="font-nunito text-lg sm:text-xl text-gray-700 leading-relaxed">
                Every story in our collection is carefully curated to spark curiosity, teach valuable lessons,
                and take young readers on unforgettable adventures—all while keeping the joy of storytelling
                at the heart of everything we do.
              </p>
            </div>
          </section>

          {/* What We Offer Section */}
          <section className="mb-16">
            <h2 className="font-fredoka text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
              What We Offer 🌟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-kid-xl shadow-soft p-6 hover:shadow-soft-xl hover:-translate-y-2 transition-all">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="font-fredoka text-2xl font-bold text-gray-800 mb-3">
                  Age-Appropriate Stories
                </h3>
                <p className="font-nunito text-gray-700 leading-relaxed">
                  Stories carefully categorized for ages 3-5, 6-8, and 9-12 to match your child's
                  reading level and interests.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-kid-xl shadow-soft p-6 hover:shadow-soft-xl hover:-translate-y-2 transition-all">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="font-fredoka text-2xl font-bold text-gray-800 mb-3">
                  Diverse Categories
                </h3>
                <p className="font-nunito text-gray-700 leading-relaxed">
                  From adventures and fantasies to educational and bedtime stories—something
                  for every mood and moment.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-kid-xl shadow-soft p-6 hover:shadow-soft-xl hover:-translate-y-2 transition-all">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="font-fredoka text-2xl font-bold text-gray-800 mb-3">
                  Easy Navigation
                </h3>
                <p className="font-nunito text-gray-700 leading-relaxed">
                  Filter by age group, category, or search by title to quickly find the perfect
                  story for your child.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-kid-xl shadow-soft p-6 hover:shadow-soft-xl hover:-translate-y-2 transition-all">
                <div className="text-5xl mb-4">📖</div>
                <h3 className="font-fredoka text-2xl font-bold text-gray-800 mb-3">
                  Beautiful Design
                </h3>
                <p className="font-nunito text-gray-700 leading-relaxed">
                  Colorful, kid-friendly interface with playful animations and custom cursors
                  that make reading fun.
                </p>
              </div>

              {/* Card 5 */}
              <div className="bg-white rounded-kid-xl shadow-soft p-6 hover:shadow-soft-xl hover:-translate-y-2 transition-all">
                <div className="text-5xl mb-4">🔊</div>
                <h3 className="font-fredoka text-2xl font-bold text-gray-800 mb-3">
                  Interactive Features
                </h3>
                <p className="font-nunito text-gray-700 leading-relaxed">
                  Sound effects, page-turning animations, and fullscreen reading mode for an
                  immersive experience.
                </p>
              </div>

              {/* Card 6 */}
              <div className="bg-white rounded-kid-xl shadow-soft p-6 hover:shadow-soft-xl hover:-translate-y-2 transition-all">
                <div className="text-5xl mb-4">🆓</div>
                <h3 className="font-fredoka text-2xl font-bold text-gray-800 mb-3">
                  Free Access
                </h3>
                <p className="font-nunito text-gray-700 leading-relaxed">
                  All our stories are completely free to read—because every child deserves
                  access to great literature.
                </p>
              </div>
            </div>
          </section>

          {/* Our Values Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-kid-xl shadow-soft p-8 sm:p-12">
              <h2 className="font-fredoka text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
                Our Values 💫
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <span className="text-4xl flex-shrink-0">🌈</span>
                  <div>
                    <h3 className="font-fredoka text-xl font-bold text-gray-800 mb-2">
                      Inclusivity
                    </h3>
                    <p className="font-nunito text-gray-700">
                      Stories that represent diverse cultures, characters, and experiences.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-4xl flex-shrink-0">🎓</span>
                  <div>
                    <h3 className="font-fredoka text-xl font-bold text-gray-800 mb-2">
                      Educational Value
                    </h3>
                    <p className="font-nunito text-gray-700">
                      Stories that teach important lessons while entertaining.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-4xl flex-shrink-0">✨</span>
                  <div>
                    <h3 className="font-fredoka text-xl font-bold text-gray-800 mb-2">
                      Imagination
                    </h3>
                    <p className="font-nunito text-gray-700">
                      Encouraging creativity and wonder through magical storytelling.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-4xl flex-shrink-0">🛡️</span>
                  <div>
                    <h3 className="font-fredoka text-xl font-bold text-gray-800 mb-2">
                      Safety
                    </h3>
                    <p className="font-nunito text-gray-700">
                      Age-appropriate content that parents can trust.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section className="mb-16">
            <div className="bg-white rounded-kid-xl shadow-soft p-8 sm:p-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">💻</span>
                <h2 className="font-fredoka text-3xl sm:text-4xl font-bold text-gray-800">
                  Built with Modern Technology
                </h2>
              </div>
              <p className="font-nunito text-lg sm:text-xl text-gray-700 leading-relaxed mb-4">
                Kids Stories is built using cutting-edge web technologies to provide a fast,
                responsive, and delightful reading experience across all devices.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div className="bg-purple-50 rounded-kid-lg p-4 text-center">
                  <p className="font-fredoka font-semibold text-gray-800">Next.js 14</p>
                </div>
                <div className="bg-pink-50 rounded-kid-lg p-4 text-center">
                  <p className="font-fredoka font-semibold text-gray-800">React</p>
                </div>
                <div className="bg-orange-50 rounded-kid-lg p-4 text-center">
                  <p className="font-fredoka font-semibold text-gray-800">TypeScript</p>
                </div>
                <div className="bg-purple-50 rounded-kid-lg p-4 text-center">
                  <p className="font-fredoka font-semibold text-gray-800">Tailwind CSS</p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-kid-xl shadow-lg p-8 sm:p-12 text-white">
              <h2 className="font-fredoka text-3xl sm:text-4xl font-bold mb-4">
                Start Reading Today! 🎉
              </h2>
              <p className="font-nunito text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
                Join thousands of young readers exploring magical worlds, learning new things,
                and having fun with our collection of stories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/stories"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-full font-fredoka font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <span className="text-2xl">📚</span>
                  <span>Browse All Stories</span>
                </a>
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white text-white rounded-full font-fredoka font-bold text-lg hover:bg-white/30 hover:scale-105 transition-all"
                >
                  <span className="text-2xl">🏠</span>
                  <span>Go to Home</span>
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white py-8 mt-12">
          <div className="container-story text-center">
            <p className="font-nunito text-lg mb-2">
              Made with ❤️ for young readers everywhere
            </p>
            <p className="font-nunito text-sm opacity-90">
              © 2026 Kids Stories. All rights reserved.
            </p>
          </div>
        </footer>
    </div>
  );
}

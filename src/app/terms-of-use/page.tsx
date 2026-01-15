import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of Use for Kids Stories - Guidelines for using our educational stories and learning content for children.',
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-600 mb-4">
            Terms of Use
          </h1>
          <p className="text-gray-600">
            Last updated: January 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 space-y-8">
          {/* Welcome */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">👋</span>
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome to Kids Stories!
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Kids Stories is a free educational website with stories, learning activities,
              and games designed for children. By using our website, you agree to follow
              these simple rules. If you&apos;re a young reader, please read these with a
              parent or guardian!
            </p>
          </section>

          {/* Who Can Use */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">👨‍👩‍👧‍👦</span>
              <h2 className="text-2xl font-bold text-gray-800">
                Who Can Use This Site
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Kids Stories is designed for:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Children of all ages (with parental supervision for younger kids)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Parents and guardians reading with their children
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Teachers and educators using content for educational purposes
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Anyone who loves children&apos;s stories!
              </li>
            </ul>
          </section>

          {/* Using Our Content */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📚</span>
              <h2 className="text-2xl font-bold text-gray-800">
                Using Our Content
              </h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-2xl">
                <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                  <span>✅</span> You CAN:
                </h3>
                <ul className="space-y-1 text-green-700">
                  <li>• Read and enjoy all our stories for free</li>
                  <li>• Share links to our pages with friends and family</li>
                  <li>• Use our content for personal learning</li>
                  <li>• Print stories for personal, non-commercial use</li>
                  <li>• Bookmark your favorite stories</li>
                  <li>• Play our educational games</li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 rounded-2xl">
                <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                  <span>❌</span> Please DON&apos;T:
                </h3>
                <ul className="space-y-1 text-red-700">
                  <li>• Copy our stories to other websites</li>
                  <li>• Sell or make money from our content</li>
                  <li>• Claim our stories as your own</li>
                  <li>• Remove our branding or attribution</li>
                  <li>• Use our content for commercial purposes</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Educational Use */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🏫</span>
              <h2 className="text-2xl font-bold text-gray-800">
                For Teachers and Educators
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              We love that educators use our content! Teachers may:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-blue-500">📖</span>
                Read our stories aloud in classrooms
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">🖥️</span>
                Display stories on classroom screens
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">📝</span>
                Create educational activities based on our stories
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">🔗</span>
                Share links with students and parents
              </li>
            </ul>
            <p className="text-gray-500 text-sm mt-4">
              For bulk or commercial educational use, please contact us.
            </p>
          </section>

          {/* Our Promise */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🤝</span>
              <h2 className="text-2xl font-bold text-gray-800">
                Our Promise to You
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              We promise to:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-2xl">🛡️</span>
                <div>
                  <strong className="text-gray-800">Keep Content Safe</strong>
                  <p className="text-gray-600 text-sm">
                    All stories and content are appropriate for children
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <strong className="text-gray-800">Protect Privacy</strong>
                  <p className="text-gray-600 text-sm">
                    We don&apos;t collect personal information from children
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">📚</span>
                <div>
                  <strong className="text-gray-800">Provide Quality Content</strong>
                  <p className="text-gray-600 text-sm">
                    Our stories are educational, entertaining, and age-appropriate
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🆓</span>
                <div>
                  <strong className="text-gray-800">Keep It Free</strong>
                  <p className="text-gray-600 text-sm">
                    Basic access to stories will always be free
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* Important Rules */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📋</span>
              <h2 className="text-2xl font-bold text-gray-800">
                Important Rules
              </h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-2xl border-2 border-yellow-200">
                <h3 className="font-bold text-yellow-800 mb-2">
                  Be Kind and Respectful
                </h3>
                <p className="text-yellow-700 text-sm">
                  If we add any interactive features in the future, we expect all users
                  to be kind, respectful, and appropriate in their interactions.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-2xl border-2 border-blue-200">
                <h3 className="font-bold text-blue-800 mb-2">
                  Ask a Grown-Up for Help
                </h3>
                <p className="text-blue-700 text-sm">
                  If you&apos;re not sure about something, or if something seems wrong,
                  please ask a parent, guardian, or teacher for help.
                </p>
              </div>
            </div>
          </section>

          {/* Advertising */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📺</span>
              <h2 className="text-2xl font-bold text-gray-800">
                About Advertisements
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Our website may show advertisements. These ads help us keep the site
              running and free to use. All advertisements on our site are:
            </p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Appropriate for children (child-safe settings enabled)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Clearly marked as advertisements
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Not based on personal data or tracking
              </li>
            </ul>
          </section>

          {/* Disclaimer */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">⚠️</span>
              <h2 className="text-2xl font-bold text-gray-800">
                Disclaimer
              </h2>
            </div>
            <div className="text-gray-600 space-y-3 text-sm">
              <p>
                <strong>Educational Content:</strong> Our stories and educational
                content are meant to be fun and informative, but they should not
                replace formal education or professional advice.
              </p>
              <p>
                <strong>Availability:</strong> We try to keep our website running
                smoothly, but we can&apos;t guarantee it will always be available.
                Sometimes we need to make updates or fix problems.
              </p>
              <p>
                <strong>External Links:</strong> Our website may contain links to
                other websites. We are not responsible for the content or privacy
                practices of other sites. Parents should supervise children&apos;s
                internet use.
              </p>
              <p>
                <strong>Content Accuracy:</strong> We work hard to make sure our
                educational content is accurate, but we&apos;re human and might make
                mistakes sometimes. If you notice an error, please let us know!
              </p>
            </div>
          </section>

          {/* Changes */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🔄</span>
              <h2 className="text-2xl font-bold text-gray-800">
                Changes to These Terms
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We may update these Terms of Use from time to time. When we do, we&apos;ll
              update the &quot;Last updated&quot; date at the top. By continuing to use our
              website after changes are made, you agree to the updated terms.
            </p>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📬</span>
              <h2 className="text-2xl font-bold text-gray-800">
                Questions?
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about these Terms of Use, please ask a parent
              or guardian to contact us. We&apos;re happy to help!
            </p>
          </section>

          {/* Fun Summary */}
          <section className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">
            <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center gap-2">
              <span>🌟</span> The Short Version
            </h3>
            <div className="text-purple-900 space-y-2">
              <p>✨ Read and enjoy our stories - they&apos;re free!</p>
              <p>🤗 Share the fun with friends and family</p>
              <p>💜 Be kind and respectful</p>
              <p>📖 Keep learning and having fun!</p>
            </div>
          </section>

          {/* Agreement */}
          <section className="text-center pt-4">
            <p className="text-gray-500 text-sm">
              By using Kids Stories, you agree to these Terms of Use.
              <br />
              Thank you for being part of our reading community!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn about how Kids Stories protects your privacy. We are committed to keeping children safe online and comply with COPPA regulations.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-600 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            Last updated: January 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 space-y-8">
          {/* Introduction */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🛡️</span>
              <h2 className="text-2xl font-bold text-gray-800">
                Your Privacy Matters
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Kids Stories is committed to protecting the privacy of children and families.
              This policy explains what information we collect (very little!) and how we
              keep your experience safe and fun.
            </p>
          </section>

          {/* What We Collect */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📱</span>
              <h2 className="text-2xl font-bold text-gray-800">
                Information Stored on Your Device
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              To make your experience better, we save some information directly on your
              device (in your browser&apos;s local storage). This includes:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-xl">📖</span>
                <div>
                  <strong className="text-gray-800">Reading Progress</strong>
                  <p className="text-gray-600 text-sm">
                    Which page you&apos;re on in each story, so you can continue where you left off
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">⭐</span>
                <div>
                  <strong className="text-gray-800">Favorite Stories</strong>
                  <p className="text-gray-600 text-sm">
                    Stories you&apos;ve bookmarked to read again
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">🎮</span>
                <div>
                  <strong className="text-gray-800">Game Scores</strong>
                  <p className="text-gray-600 text-sm">
                    Your high scores in our memory games
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">🎨</span>
                <div>
                  <strong className="text-gray-800">Display Preferences</strong>
                  <p className="text-gray-600 text-sm">
                    Settings like dark mode and sound preferences
                  </p>
                </div>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-green-50 rounded-2xl border-2 border-green-200">
              <p className="text-green-800 font-medium flex items-center gap-2">
                <span className="text-xl">✅</span>
                Important: This information stays on YOUR device only. We never see it
                or send it anywhere!
              </p>
            </div>
          </section>

          {/* What We DON'T Collect */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🚫</span>
              <h2 className="text-2xl font-bold text-gray-800">
                Information We Do NOT Collect
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              We believe in collecting as little information as possible. We do NOT collect:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { icon: '👤', text: 'Names or usernames' },
                { icon: '📧', text: 'Email addresses' },
                { icon: '🎂', text: 'Birthdays or ages' },
                { icon: '📍', text: 'Location information' },
                { icon: '📷', text: 'Photos or videos' },
                { icon: '🔐', text: 'Passwords' },
                { icon: '📞', text: 'Phone numbers' },
                { icon: '🏫', text: 'School information' },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 p-3 bg-red-50 rounded-xl"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* No Accounts */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🔓</span>
              <h2 className="text-2xl font-bold text-gray-800">
                No Accounts Required
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              You don&apos;t need to create an account or sign up to use Kids Stories.
              Just visit our website and start reading! This means we never ask for
              your personal information.
            </p>
          </section>

          {/* Advertising */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📺</span>
              <h2 className="text-2xl font-bold text-gray-800">
                Advertising
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Our website may display advertisements to help support our free content.
              These ads are:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Configured for children&apos;s content (COPPA-compliant)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Based on the page content, not on personal data
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Do not track or profile users
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Do not use cookies for targeting
              </li>
            </ul>
          </section>

          {/* COPPA */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">👨‍👩‍👧‍👦</span>
              <h2 className="text-2xl font-bold text-gray-800">
                Children&apos;s Privacy (COPPA Compliance)
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Kids Stories is designed for children and complies with the Children&apos;s
              Online Privacy Protection Act (COPPA). This means:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-blue-500">🔹</span>
                We do not collect personal information from children
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">🔹</span>
                We do not require registration or accounts
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">🔹</span>
                We do not use tracking or analytics
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">🔹</span>
                All data stays on the user&apos;s device
              </li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">⚖️</span>
              <h2 className="text-2xl font-bold text-gray-800">
                Your Rights
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              You or your parent/guardian can:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-purple-500">•</span>
                Clear all stored data by clearing your browser&apos;s local storage
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-500">•</span>
                Use the site without any data being stored (reading progress won&apos;t be saved)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-500">•</span>
                Contact us with any questions about our privacy practices
              </li>
            </ul>
            <div className="mt-4 p-4 bg-blue-50 rounded-2xl">
              <p className="text-blue-800 text-sm">
                <strong>How to clear stored data:</strong> In most browsers, go to
                Settings → Privacy → Clear browsing data → Select &quot;Local Storage&quot;
                or &quot;Site Data&quot;
              </p>
            </div>
          </section>

          {/* No Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🍪</span>
              <h2 className="text-2xl font-bold text-gray-800">
                Cookies
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Kids Stories does not use cookies to track users. We only use your
              browser&apos;s local storage to save your reading progress and preferences,
              which you can clear at any time.
            </p>
          </section>

          {/* Third Parties */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🔗</span>
              <h2 className="text-2xl font-bold text-gray-800">
                Third-Party Services
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Our website may use the following third-party services:
            </p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-gray-400">•</span>
                <strong>Cloudflare R2:</strong> For hosting PDF story files
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-400">•</span>
                <strong>GitHub Pages:</strong> For hosting our website
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-400">•</span>
                <strong>Google AdSense:</strong> For displaying advertisements (child-safe settings enabled)
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📬</span>
              <h2 className="text-2xl font-bold text-gray-800">
                Contact Us
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please ask a parent
              or guardian to contact us. We&apos;re happy to answer any questions about
              how we protect your privacy.
            </p>
          </section>

          {/* Changes */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📝</span>
              <h2 className="text-2xl font-bold text-gray-800">
                Changes to This Policy
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. When we do, we will
              update the &quot;Last updated&quot; date at the top of this page. We encourage
              you to check this page periodically for any changes.
            </p>
          </section>

          {/* Summary Box */}
          <section className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">
            <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center gap-2">
              <span>🌟</span> In Summary
            </h3>
            <p className="text-purple-900">
              Kids Stories is designed to be safe for children. We don&apos;t collect
              personal information, we don&apos;t track you, and we don&apos;t use cookies.
              Your reading progress and preferences stay on your own device. We believe
              learning should be fun AND safe!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

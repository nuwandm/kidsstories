import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { countryIndex } from '@/content/countries/countryIndex';
import { Country } from '@/lib/types';
import { CountryDetail } from '@/components/learn/CountryDetail';

// Generate static params for all countries
export async function generateStaticParams() {
  return countryIndex.map((country) => ({
    slug: country.slug,
  }));
}

// Generate metadata for each country
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const countryMeta = countryIndex.find((c) => c.slug === slug);

  if (!countryMeta) {
    return {
      title: 'Country Not Found - Kids Stories',
    };
  }

  return {
    title: `${countryMeta.name} - Learn - Kids Stories`,
    description: `Learn about ${countryMeta.name}! Discover fun facts, landmarks, animals, and culture.`,
  };
}

// Load full country data
async function loadCountry(slug: string): Promise<Country | null> {
  try {
    const countryData = await import(`@/content/countries/${slug}.json`);
    return countryData.default || countryData;
  } catch {
    return null;
  }
}

export default async function CountryPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const country = await loadCountry(slug);

  if (!country) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-100 via-cyan-100 to-teal-100 py-12 sm:py-16">
        <div className="container-story">
          <Link
            href="/learn/countries"
            className="inline-flex items-center gap-2 text-blue-600 font-fredoka font-semibold mb-6 hover:underline"
          >
            ← Back to Countries
          </Link>

          <div className="text-center">
            {/* Flag Display */}
            <div className="inline-block mb-6">
              {country.flagImage ? (
                <div className="relative w-48 h-32 sm:w-64 sm:h-44 md:w-80 md:h-56 mx-auto rounded-kid-xl overflow-hidden shadow-lg border-4 border-white">
                  <Image
                    src={country.flagImage}
                    alt={`Flag of ${country.name}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <span className="text-7xl sm:text-8xl md:text-9xl animate-bounce-gentle">{country.flag}</span>
              )}
            </div>
            <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              {country.name}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full font-nunito">
                <span>🏛️</span>
                <span>Capital: <strong>{country.capital}</strong></span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full font-nunito">
                <span>🗺️</span>
                <span>{country.continent}</span>
              </span>
            </div>
            <p className="font-fredoka text-2xl sm:text-3xl text-purple-700">
              {country.greeting}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-story py-12 sm:py-16">
        <CountryDetail country={country} />
      </main>
    </div>
  );
}

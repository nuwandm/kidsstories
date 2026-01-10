import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { peopleIndex } from '@/content/famous-people/peopleIndex';
import { FamousPerson } from '@/lib/types';
import { PersonDetail } from '@/components/learn/PersonDetail';

// Generate static params for all people
export async function generateStaticParams() {
  return peopleIndex.map((person) => ({
    slug: person.slug,
  }));
}

// Generate metadata for each person
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const personMeta = peopleIndex.find((p) => p.slug === slug);

  if (!personMeta) {
    return {
      title: 'Person Not Found - Kids Stories',
    };
  }

  return {
    title: `${personMeta.name} - Famous People - Kids Stories`,
    description: `Learn about ${personMeta.name}! ${personMeta.famousFor}. Discover their achievements and fun facts.`,
  };
}

// Load full person data
async function loadPerson(slug: string): Promise<FamousPerson | null> {
  try {
    const personData = await import(`@/content/famous-people/${slug}.json`);
    return personData.default || personData;
  } catch {
    return null;
  }
}

export default async function PersonPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const person = await loadPerson(slug);

  if (!person) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 py-12 sm:py-16">
        <div className="container-story">
          <Link
            href="/learn/famous-people"
            className="inline-flex items-center gap-2 text-purple-600 font-fredoka font-semibold mb-6 hover:underline"
          >
            ← Back to Famous People
          </Link>

          <div className="text-center">
            <div className="inline-block mb-4 animate-bounce-gentle">
              <span className="text-7xl sm:text-8xl md:text-9xl">{person.portrait}</span>
            </div>
            <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-2">
              {person.name}
            </h1>
            <p className="font-nunito text-xl sm:text-2xl text-gray-600 mb-4">
              {person.title}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full font-nunito">
                <span>📍</span>
                <span>{person.country}</span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full font-nunito">
                <span>📅</span>
                <span>{person.birthYear}{person.deathYear ? ` - ${person.deathYear}` : ' - Present'}</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-story py-12 sm:py-16">
        <PersonDetail person={person} />
      </main>
    </div>
  );
}

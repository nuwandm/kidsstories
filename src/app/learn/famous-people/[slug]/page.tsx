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
      {/* Minimal Header */}
      <header className="py-6">
        <div className="container-story">
          <Link
            href="/learn/famous-people"
            className="inline-flex items-center gap-2 text-purple-600 font-fredoka font-semibold hover:underline"
          >
            ← Back to Famous People
          </Link>
        </div>
      </header>

      {/* Main Content - Facebook Style Profile */}
      <main className="container-story pb-12">
        <PersonDetail person={person} />
      </main>
    </div>
  );
}

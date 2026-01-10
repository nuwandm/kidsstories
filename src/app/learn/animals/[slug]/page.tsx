import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { animalIndex } from '@/content/animals/animalIndex';
import { Animal } from '@/lib/types';
import { AnimalDetail } from '@/components/learn/AnimalDetail';

// Generate static params for all animals
export async function generateStaticParams() {
  return animalIndex.map((animal) => ({
    slug: animal.slug,
  }));
}

// Generate metadata for each animal
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const animalMeta = animalIndex.find((a) => a.slug === slug);

  if (!animalMeta) {
    return {
      title: 'Animal Not Found - Kids Stories',
    };
  }

  return {
    title: `${animalMeta.name} - Animal Kingdom - Kids Stories`,
    description: `Learn about ${animalMeta.name}! Discover fun facts, habitat, and interesting information.`,
  };
}

// Load full animal data
async function loadAnimal(slug: string): Promise<Animal | null> {
  try {
    const animalData = await import(`@/content/animals/${slug}.json`);
    return animalData.default || animalData;
  } catch {
    return null;
  }
}

export default async function AnimalPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const animal = await loadAnimal(slug);

  if (!animal) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-orange-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 py-12 sm:py-16">
        <div className="container-story">
          <Link
            href="/learn/animals"
            className="inline-flex items-center gap-2 text-green-600 font-fredoka font-semibold mb-6 hover:underline"
          >
            ← Back to Animals
          </Link>

          <div className="text-center">
            <div className="inline-block mb-4 animate-bounce-gentle">
              <span className="text-7xl sm:text-8xl md:text-9xl">{animal.image}</span>
            </div>
            <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              {animal.name}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full font-nunito">
                <span>🏷️</span>
                <span>{animal.type}</span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full font-nunito">
                <span>🍽️</span>
                <span>{animal.diet}</span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full font-nunito">
                <span>🌍</span>
                <span>{animal.habitat.join(', ')}</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-story py-12 sm:py-16">
        <AnimalDetail animal={animal} />
      </main>
    </div>
  );
}

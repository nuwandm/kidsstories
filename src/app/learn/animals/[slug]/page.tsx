import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { animalIndex } from '@/content/animals/animalIndex';
import { Animal } from '@/lib/types';
import { AnimalDetail } from '@/components/learn/AnimalDetail';
import { getImageUrl } from '@/lib/imageUrl';

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
      <header className="relative bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 py-12 sm:py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Decorative Circles */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-green-300/30 rounded-full blur-xl animate-float" />
          <div className="absolute top-1/3 right-20 w-32 h-32 bg-emerald-300/20 rounded-full blur-2xl animate-float-delayed" />
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-teal-300/25 rounded-full blur-xl animate-float-slow" />
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-green-400/20 rounded-full blur-lg animate-pulse-soft" />

          {/* Decorative Shapes */}
          <div className="absolute top-20 right-1/3 text-4xl opacity-20 animate-spin-slow">🌿</div>
          <div className="absolute bottom-32 left-20 text-3xl opacity-20 animate-bounce-gentle">🍃</div>
          <div className="absolute top-1/2 right-16 text-2xl opacity-15 animate-float">🌸</div>
        </div>

        {/* Background Cover Image (if available) */}
        {animal.coverImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={getImageUrl(animal.coverImage)}
              alt={`${animal.name} cover`}
              fill
              className="object-cover opacity-15 animate-slow-zoom"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-green-100/80 via-emerald-100/85 to-teal-100/90 backdrop-blur-[1px]" />
          </div>
        )}

        <div className="container-story relative z-10">
          {/* Back Button with Animation */}
          <Link
            href="/learn/animals"
            className="group inline-flex items-center gap-2 text-green-600 font-fredoka font-semibold mb-8 hover:text-green-700 transition-all duration-300 animate-fade-in"
          >
            <span className="transform transition-transform group-hover:-translate-x-2">←</span>
            <span className="relative">
              Back to Animals
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300" />
            </span>
          </Link>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Cover Image or Emoji */}
            <div className="flex-shrink-0 animate-hero-image">
              {animal.coverImage ? (
                <div className="relative group">
                  {/* Glow Effect Behind Image */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-kid-xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500 animate-pulse-soft" />

                  {/* Main Image Container */}
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-kid-xl overflow-hidden shadow-2xl ring-4 ring-white/60 transform transition-all duration-500 group-hover:scale-[1.02] group-hover:ring-white/80">
                    <Image
                      src={getImageUrl(animal.coverImage)}
                      alt={animal.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority
                      sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                    />

                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full" style={{ transitionDuration: '1s' }} />
                  </div>

                  {/* Floating Corner Decorations */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-xl shadow-lg animate-bounce-gentle">
                    ⭐
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute -inset-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 blur-2xl animate-pulse-soft" />
                  <div className="relative inline-block animate-hero-emoji">
                    <span className="text-7xl sm:text-8xl md:text-9xl drop-shadow-lg">{animal.image}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Animal Info */}
            <div className="text-center lg:text-left flex-grow animate-hero-content">
              {/* Title with Gradient */}
              <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent animate-gradient-text">
                  {animal.name}
                </span>
              </h1>

              {/* Info Badges with Stagger Animation */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-sm rounded-full font-nunito shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-badge-1">
                  <span className="text-lg animate-bounce-gentle">🏷️</span>
                  <span className="font-bold text-gray-700">{animal.type}</span>
                </span>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-sm rounded-full font-nunito shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-badge-2">
                  <span className="text-lg animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>🍽️</span>
                  <span className="font-bold text-gray-700">{animal.diet}</span>
                </span>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-sm rounded-full font-nunito shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-badge-3">
                  <span className="text-lg animate-bounce-gentle" style={{ animationDelay: '0.4s' }}>🌍</span>
                  <span className="font-bold text-gray-700">{animal.habitat.join(', ')}</span>
                </span>
              </div>

              {/* CTA Badge (shown when cover image exists) */}
              {animal.coverImage && (
                <div className="animate-badge-4">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full text-white shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-105 group">
                    <span className="text-2xl group-hover:animate-wiggle">{animal.image}</span>
                    <span className="font-fredoka font-bold text-lg">Meet the {animal.name}!</span>
                    <span className="text-xl animate-bounce-gentle">🎉</span>
                  </div>
                </div>
              )}

              {/* Scroll Indicator */}
              <div className="hidden lg:flex items-center gap-2 mt-8 text-green-600/70 font-nunito text-sm animate-fade-in" style={{ animationDelay: '1s' }}>
                <span>Scroll down to learn more</span>
                <span className="animate-bounce">↓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,95.8,115.9,69.6,174.9,56.4,235.9,42.8,284.4,67.4,321.39,56.44Z"
              className="fill-purple-50/80"
            />
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-story py-12 sm:py-16">
        <AnimalDetail animal={animal} />
      </main>
    </div>
  );
}

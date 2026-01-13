import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { storyIndex } from '@/content/storyIndex';
import { loadStory, isPdfStory } from '@/lib/loadStory';
import { StoryReader } from '@/components/StoryReader';
import { PDFBookReader } from '@/components/PDFBookReader';
import { Story, PdfStory } from '@/lib/types';

/**
 * Story Page - Immersive Fullscreen Reading Experience
 *
 * When a story is opened, the BookReader takes over the entire viewport
 * providing a focused, distraction-free reading experience.
 *
 * Supports both traditional page-based stories and PDF stories from Google Drive.
 */

export const dynamic = 'force-static';
export const revalidate = false;

interface StoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return storyIndex.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const story = await loadStory(slug);

    // Get description based on story type
    let description = '';
    if (isPdfStory(story)) {
      description = `Read ${story.title} - an interactive story for kids aged ${story.ageGroup}`;
    } else {
      const firstPageText = story.pages[0]?.text || '';
      description =
        firstPageText.length > 155
          ? firstPageText.slice(0, 152) + '...'
          : firstPageText;
    }

    return {
      title: story.title,
      description: description,
      alternates: {
        canonical: `/stories/${slug}/`,
      },
      openGraph: {
        title: `${story.title} | Kids Stories`,
        description: description,
        images: [
          {
            url: story.coverImage,
            width: 1200,
            height: 630,
            alt: `Cover image for ${story.title}`,
          },
        ],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: story.title,
        description: description,
        images: [story.coverImage],
      },
    };
  } catch {
    return {
      title: 'Story Not Found',
      description: 'The requested story could not be found.',
    };
  }
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;

  let story;
  try {
    story = await loadStory(slug);
  } catch {
    notFound();
  }

  // Render the appropriate reader based on story type
  // PDF stories use PDFBookReader, regular stories use StoryReader/BookReader
  if (isPdfStory(story)) {
    return <PDFBookReader story={story as PdfStory} />;
  }

  return <StoryReader story={story as Story} />;
}

'use client';

import { StoryReaderProps } from '@/lib/types';
import { BookReader } from './BookReader';

/**
 * Story Reader Component
 *
 * Provides an immersive fullscreen book reading experience.
 * The BookReader takes over the entire viewport when a story is opened.
 */
export function StoryReader({ story }: StoryReaderProps) {
  return <BookReader story={story} />;
}

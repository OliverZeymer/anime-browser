import { Suspense } from 'react';
import { AnimeBrowseSkeleton } from '@/components/anime/AnimeBrowseSkeleton';
import AnimeBrowsePage from '@/components/anime/AnimeBrowsePage';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Browse Anime - Anime Browser',
  description: 'Browse thousands of anime titles. Filter by genre, status, type, and more.',
};

/** HTML shell is static; Jikan is fetched in the client to avoid massive Vercel origin transfer on /anime. */
export default function AnimePage() {
  return (
    <Suspense
      fallback={<AnimeBrowseSkeleton />}>
      <AnimeBrowsePage />
    </Suspense>
  );
}

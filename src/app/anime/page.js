import { Suspense } from 'react';
import Loader from '@/components/Loader';
import AnimeBrowsePage from '@/components/anime/AnimeBrowsePage';

export const metadata = {
  title: 'Browse Anime - Anime Browser',
  description: 'Browse thousands of anime titles. Filter by genre, status, type, and more.',
};

/** HTML shell is static; Jikan is fetched in the client to avoid massive Vercel origin transfer on /anime. */
export default function AnimePage() {
  return (
    <Suspense
      fallback={
        <div className='section flex gap-3 space-x-4'>
          <div className='grow flex justify-center py-24'>
            <Loader size='lg' />
          </div>
        </div>
      }>
      <AnimeBrowsePage />
    </Suspense>
  );
}

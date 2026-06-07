import { Skeleton } from '@/components/ui/skeleton';
import { AnimeCardGridSkeleton } from '@/components/anime/AnimeCardGridSkeleton';
import { ANIME_TAB_RECOMMENDATIONS_LIMIT } from '@/utils/animeCardLayout';

export const AnimeTabsSkeleton = () => {
  return (
    <div className='mt-6 px-4'>
      <div className='inline-flex h-9 w-full items-center justify-center border-b md:justify-start'>
        <Skeleton className='mx-4 h-6 w-28 rounded-sm' />
        <Skeleton className='mx-4 h-6 w-16 rounded-sm' />
      </div>
      <div className='min-h-[500px]'>
        <AnimeCardGridSkeleton count={ANIME_TAB_RECOMMENDATIONS_LIMIT} small className='mt-6' />
      </div>
    </div>
  );
};

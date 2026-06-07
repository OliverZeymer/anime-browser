import { Skeleton } from '@/components/ui/skeleton';
import { AnimeCardGridSkeleton } from '@/components/anime/AnimeCardGridSkeleton';
import { AnimeFiltersSidebarSkeleton } from '@/components/anime/AnimeFiltersSidebarSkeleton';
import { AnimeSearchBarSkeleton } from '@/components/anime/AnimeSearchBarSkeleton';
import { PaginationControlsSkeleton } from '@/components/PaginationControlsSkeleton';

export const AnimeBrowseSkeleton = () => {
  return (
    <div className='section flex gap-3 space-x-4'>
      <AnimeFiltersSidebarSkeleton />

      <div className='grow w-full'>
        <div className='mb-3 flex flex-col items-center justify-between gap-4 xl:flex-row xl:gap-0'>
          <Skeleton className='h-8 w-full max-w-xl rounded-md sm:h-9' />
          <AnimeSearchBarSkeleton />
        </div>
        <AnimeCardGridSkeleton className='mt-3' />
        <PaginationControlsSkeleton />
      </div>
    </div>
  );
};

import { Skeleton } from '@/components/ui/skeleton';
import { ANIME_SEARCH_RESULTS_LIMIT } from '@/utils/animeCardLayout';

export const SearchResultsSkeleton = () => {
  return (
    <ul className='mt-2 flex w-full flex-col gap-2'>
      <Skeleton className='mb-3 h-6 w-56' />
      {Array.from({ length: ANIME_SEARCH_RESULTS_LIMIT }).map((_, index) => (
        <li key={index} className='flex items-center gap-4 rounded-md p-1'>
          <Skeleton className='aspect-[1/1.5] w-[60px] shrink-0 rounded-md' />
          <div className='flex min-w-0 flex-1 flex-col gap-2'>
            <Skeleton className='h-4 w-full max-w-[220px]' />
            <Skeleton className='h-3 w-12' />
          </div>
        </li>
      ))}
      <li className='flex justify-center pt-2'>
        <Skeleton className='h-9 w-36 rounded-md' />
      </li>
    </ul>
  );
};

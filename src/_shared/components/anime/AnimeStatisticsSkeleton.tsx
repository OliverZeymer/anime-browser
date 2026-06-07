import { Skeleton } from '@/components/ui/skeleton';

export const AnimeStatisticsSkeleton = () => {
  return (
    <div className='flex h-full min-h-[280px] flex-col gap-3'>
      <div className='flex min-h-0 flex-1 flex-col'>
        <Skeleton className='mb-2 h-5 w-28 shrink-0 rounded-sm' />
        <Skeleton className='min-h-0 flex-1 rounded-lg' />
      </div>
      <div className='flex min-h-0 flex-1 flex-col'>
        <Skeleton className='mb-2 h-5 w-36 shrink-0 rounded-sm' />
        <Skeleton className='min-h-0 flex-1 rounded-lg' />
      </div>
    </div>
  );
};

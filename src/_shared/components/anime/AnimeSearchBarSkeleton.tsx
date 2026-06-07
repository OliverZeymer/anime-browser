import { Skeleton } from '@/components/ui/skeleton';

export const AnimeSearchBarSkeleton = () => {
  return (
    <div className='mx-auto flex h-10 w-full items-center rounded-full border border-neutral-700 bg-primary-foreground md:mx-0 xl:w-fit'>
      <Skeleton className='ml-3 h-5 w-5 shrink-0 rounded-full' />
      <Skeleton className='mx-3 h-4 flex-1 rounded-sm lg:min-w-[275px]' />
    </div>
  );
};

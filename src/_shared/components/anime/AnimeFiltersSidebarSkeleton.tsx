import { Skeleton } from '@/components/ui/skeleton';
import StickyAside from '../StickyAside';
import { cn } from '@/libs/cn';

export const FilterFieldSkeleton = ({ labelWidth }: { labelWidth: string }) => {
  return (
    <div className='flex w-[180px] flex-col space-y-2'>
      <Skeleton className={cn('h-4', labelWidth)} />
      <Skeleton className='h-10 w-full rounded-md' />
    </div>
  );
};

export const AnimeFiltersSidebarSkeleton = () => {
  return (
    <StickyAside className='hidden md:flex h-screen w-fit flex-col gap-4 overflow-y-auto whitespace-nowrap pr-2 md:top-4'>
      <div className='flex flex-col gap-4 overflow-hidden'>
        <Skeleton className='h-8 w-[72px]' />
        <FilterFieldSkeleton labelWidth='w-14' />
        <FilterFieldSkeleton labelWidth='w-12' />
        <FilterFieldSkeleton labelWidth='w-10' />
        <FilterFieldSkeleton labelWidth='w-12' />
        <div className='flex w-[180px] flex-col gap-2'>
          <Skeleton className='h-4 w-12' />
          <Skeleton className='h-1.5 w-full rounded-full' />
        </div>
        <Skeleton className='h-10 w-[180px] rounded-md' />
      </div>
    </StickyAside>
  );
};

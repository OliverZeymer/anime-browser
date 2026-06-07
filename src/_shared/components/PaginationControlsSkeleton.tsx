import { Skeleton } from '@/components/ui/skeleton';

export const PaginationControlsSkeleton = () => {
  return (
    <div className='mx-auto mt-6 flex w-fit items-center gap-1'>
      <Skeleton className='h-9 w-9 rounded-md' />
      <Skeleton className='h-9 w-9 rounded-md' />
      <Skeleton className='h-9 w-9 rounded-md' />
      <Skeleton className='h-9 w-9 rounded-md' />
      <Skeleton className='h-9 w-9 rounded-md' />
    </div>
  );
};

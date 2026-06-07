import { Skeleton } from '@/components/ui/skeleton';
import PrimaryCard from '@/components/PrimaryCard';

export const ProfileInfoSkeleton = () => {
  return (
    <PrimaryCard className='relative mx-auto flex w-fit items-center justify-center gap-4'>
      <Skeleton className='h-24 w-24 shrink-0 rounded-full' />
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-7 w-36' />
        <Skeleton className='h-4 w-48' />
        <Skeleton className='h-4 w-28' />
      </div>
    </PrimaryCard>
  );
};

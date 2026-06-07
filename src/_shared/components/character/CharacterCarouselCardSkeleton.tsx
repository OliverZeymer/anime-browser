import { Skeleton } from '@/components/ui/skeleton';
import { CAROUSEL_SKELETON_ITEM_CLASS } from '@/utils/carouselLayout';
import { cn } from '@/libs/cn';

export const CharacterCarouselCardSkeleton = () => {
  return (
    <div className={cn('flex shrink-0 flex-col items-center', CAROUSEL_SKELETON_ITEM_CLASS)}>
      <Skeleton className='aspect-[2/3] w-full rounded-2xl' />
      <Skeleton className='mt-2 h-4 w-3/4 rounded-sm' />
    </div>
  );
};

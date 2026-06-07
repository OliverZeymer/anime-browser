import { Skeleton } from '@/components/ui/skeleton';
import PrimaryCard from '@/components/PrimaryCard';
import { CharacterCarouselCardSkeleton } from '@/components/character/CharacterCarouselCardSkeleton';
import { CHARACTER_CAROUSEL_SKELETON_COUNT } from '@/utils/carouselLayout';

export const AnimeCharactersSkeleton = () => {
  return (
    <PrimaryCard>
      <Skeleton className='h-8 w-32 rounded-md' />
      <div className='mt-4 flex gap-3 overflow-hidden lg:gap-6'>
        {Array.from({ length: CHARACTER_CAROUSEL_SKELETON_COUNT }).map((_, index) => (
          <CharacterCarouselCardSkeleton key={index} />
        ))}
      </div>
    </PrimaryCard>
  );
};

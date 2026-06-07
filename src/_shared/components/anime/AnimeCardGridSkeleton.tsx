import { AnimeCardSkeleton } from '@/components/anime/AnimeCardSkeleton';
import { ANIME_BROWSE_LIMIT, ANIME_CARD_GRID_CLASS } from '@/utils/animeCardLayout';
import { cn } from '@/libs/cn';

type Props = {
  count?: number;
  small?: boolean;
  className?: string;
};

export const AnimeCardGridSkeleton = ({ count = ANIME_BROWSE_LIMIT, small, className }: Props) => {
  return (
    <ul className={cn(ANIME_CARD_GRID_CLASS, className)}>
      {Array.from({ length: count }).map((_, index) => (
        <AnimeCardSkeleton key={index} small={small} />
      ))}
    </ul>
  );
};

'use client';
import AnimeCard from '@/components/anime/AnimeCard';
import NoResultsFound from '../NoResultsFound';
import { ANIME_CARD_GRID_CLASS } from '@/utils/animeCardLayout';
import { cn } from '@/libs/cn';

type AnimeListItem = {
  mal_id?: number;
  entry?: { mal_id?: number };
  anime?: { mal_id?: number };
  role?: string;
};

type Props = {
  data?: AnimeListItem[];
  isRecommendations?: boolean;
  isCharacter?: boolean;
  className?: string;
  small?: boolean;
  limit?: number;
};

export default function AnimeCardList({ data, isRecommendations, isCharacter, className, small }: Props) {
  return (
    <section>
      <ul className={cn(ANIME_CARD_GRID_CLASS, className)}>
        {data?.length === 0 || !data ? (
          <NoResultsFound />
        ) : (
          data?.map((anime) => (
            <AnimeCard
              small={isRecommendations || small}
              key={isRecommendations ? anime.entry?.mal_id : isCharacter ? anime.anime?.mal_id : anime.mal_id}
              anime={(isRecommendations ? anime.entry : isCharacter ? anime.anime : anime) ?? {}}
              role={isCharacter ? anime?.role : undefined}
            />
          ))
        )}
      </ul>
    </section>
  );
}

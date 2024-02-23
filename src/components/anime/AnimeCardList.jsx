'use client';
import AnimeCard from '@/components/anime/AnimeCard';
import NoResultsFound from '../NoResultsFound';
import { cn } from '@/lib/utils';

export default function AnimeCardList({ data, isRecommendations, isCharacter, className, small }) {
  return (
    <section>
      <ul className={cn('grid grid-cols-auto-fill-sm md:grid-cols-auto-fill-md lg:grid-cols-auto-fill-lg 3xl:grid-cols-auto-fill-2xl place-items-center gap-3 lg:gap-6 h-fit', className)}>
        {data?.length === 0 || !data ? (
          <NoResultsFound />
        ) : (
          data?.map((anime) => (
            <AnimeCard
              small={isRecommendations || small}
              key={isRecommendations ? anime.entry.mal_id : isCharacter ? anime.anime.mal_id : anime.mal_id}
              anime={isRecommendations ? anime.entry : isCharacter ? anime.anime : anime}
              role={isCharacter && anime?.role}
              length={data?.length}
            />
          ))
        )}
      </ul>
    </section>
  );
}

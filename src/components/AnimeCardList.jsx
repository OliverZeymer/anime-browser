'use client';
import AnimeCard from '@/components/AnimeCard';
import NoResultsFound from './NoResultsFound';
import { cn } from '@/lib/utils';

export default function AnimeCardList({ data, isRecommendations, isCharacter, className }) {
  return (
    <section className={!isCharacter && 'mt-6'}>
      <ul className={cn('sm:grid sm:grid-cols-auto-fit flex flex-col items-center sm:items-start place-items-center gap-3 lg:gap-6 w-full h-fit', className)}>
        {data?.length === 0 || !data ? (
          <NoResultsFound />
        ) : (
          data?.map((anime) => (
            <AnimeCard
              key={isRecommendations ? anime.entry.mal_id : isCharacter ? anime.anime.mal_id : anime.mal_id}
              anime={isRecommendations ? anime.entry : isCharacter ? anime.anime : anime}
              role={isCharacter && anime?.role}
            />
          ))
        )}
      </ul>
    </section>
  );
}

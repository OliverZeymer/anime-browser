'use client';
import AnimeCard from '@/components/AnimeCard';

export default function AnimeCardList({ data, isRecommendations }) {
  return (
    <section className='mt-6'>
      <ul className='sm:grid sm:grid-cols-auto-fit flex flex-col items-center sm:items-start place-items-center gap-3 lg:gap-6 w-full h-fit'>
        {data?.length === 0 || !data ? (
          <p>No results found.</p>
        ) : (
          data?.map((anime) => <AnimeCard key={isRecommendations ? anime.entry.mal_id : anime.mal_id} anime={isRecommendations ? anime.entry : anime} />)
        )}
      </ul>
    </section>
  );
}

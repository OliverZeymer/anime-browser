'use client';
import AnimeCard from '@/components/AnimeCard';
import AnimeCardSkeleton from './AnimeCardSkeleton';

export default function AnimeCardList({ data, limit }) {
  console.log(data);
  return (
    <section className='mt-6'>
      <ul className='sm:grid sm:grid-cols-auto-fit flex flex-col items-center sm:items-start place-items-center gap-3 lg:gap-6 w-full h-fit'>
        {!data && [...Array(limit)].map((_, i) => <AnimeCardSkeleton key={i} />)}
        {data?.map((anime) => (
          <AnimeCard key={anime?.mal_id} anime={anime} />
        ))}
      </ul>
    </section>
  );
}

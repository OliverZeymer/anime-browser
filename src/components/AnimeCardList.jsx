'use client';
import AnimeCard from '@/components/AnimeCard';
import AnimeCardSkeleton from './AnimeCardSkeleton';

export default function AnimeCardList({ data, isLoading, limit }) {
  return (
    <section className='flex mt-6 flex-wrap gap-6 justify-between items-center'>
      {isLoading && [...Array(limit)].map((_, i) => <AnimeCardSkeleton key={i} />)}

      {data?.map((anime) => (
        <AnimeCard key={anime?.mal_id} anime={anime} />
      ))}
    </section>
  );
}

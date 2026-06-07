'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AnimeCardList from '@/components/anime/AnimeCardList';
import PaginationControls from '@/components/PaginationControls';
import AnimeSearchBar from '@/components/anime/AnimeSearchBar';
import AnimeDynamicHeading from '@/components/anime/AnimeDynamicHeading';
import { AnimeCardGridSkeleton } from '@/components/anime/AnimeCardGridSkeleton';
import { AnimeSearchBarSkeleton } from '@/components/anime/AnimeSearchBarSkeleton';
import { PaginationControlsSkeleton } from '@/components/PaginationControlsSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import AnimeFiltersSidebar from '@/components/anime/AnimeFiltersSidebar';
import { buildAnimeBrowseUrl } from '@/utils/buildAnimeBrowseQuery';
import { ANIME_BROWSE_LIMIT } from '@/utils/animeCardLayout';
import type { Anime, JikanResponse } from '@/types/jikan';

const DEFAULT_LIMIT = ANIME_BROWSE_LIMIT;

type FilterOption = {
  name: string;
  value: string;
};

type FilterParam = {
  title: string;
  param: { name: string; value: string };
  options: FilterOption[];
};

const resolvedFilterParams = (order: string, status: string, type: string): FilterParam[] => [
  {
    title: 'Sort by',
    param: { name: 'order', value: order },
    options: [
      { name: 'Popularity', value: 'members' },
      { name: 'Score', value: 'score' },
      { name: 'Episodes', value: 'episodes' },
    ],
  },
  {
    title: 'Status',
    param: { name: 'status', value: status },
    options: [
      { name: 'All', value: 'all' },
      { name: 'Airing', value: 'airing' },
      { name: 'Upcoming', value: 'upcoming' },
      { name: 'Complete', value: 'complete' },
    ],
  },
  {
    title: 'Type',
    param: { name: 'type', value: type },
    options: [
      { name: 'All', value: 'all' },
      { name: 'TV', value: 'tv' },
      { name: 'Movie', value: 'movie' },
      { name: 'OVA', value: 'ova' },
      { name: 'Special', value: 'special' },
      { name: 'ONA', value: 'ona' },
      { name: 'Music', value: 'music' },
    ],
  },
];

export default function AnimeBrowsePage() {
  const searchParams = useSearchParams();
  const queryKey = searchParams.toString();

  const order = searchParams.get('order') || 'members';
  const status = searchParams.get('status') || 'all';
  const search = searchParams.get('search') || '';
  const type = searchParams.get('type') || 'all';
  const genres = searchParams.get('genres') || '';
  const min_score = searchParams.get('min_score') || '';
  const max_score = searchParams.get('max_score') || '';

  const filterParams = useMemo(() => resolvedFilterParams(order, status, type), [order, status, type]);

  const [data, setData] = useState<JikanResponse<Anime[]> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();

    const loadBrowseData = async () => {
      setError(null);
      setIsLoading(true);
      setData(null);

      const sp = new URLSearchParams(queryKey);
      const url = buildAnimeBrowseUrl(sp, DEFAULT_LIMIT);

      try {
        const res = await fetch(url, { signal: ac.signal });
        if (!res.ok) {
          throw new Error(String(res.status));
        }
        const json = (await res.json()) as JikanResponse<Anime[]>;
        setData(json);
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') {
          return;
        }
        setError(e instanceof Error ? e : new Error('Failed to fetch anime'));
        setData(null);
      } finally {
        if (!ac.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadBrowseData();

    return () => ac.abort();
  }, [queryKey]);

  return (
    <div className='section flex gap-3 space-x-4'>
      <AnimeFiltersSidebar
        filterParams={filterParams}
        genres={genres}
        minScore={min_score}
        maxScore={max_score}
      />
      <div className='grow'>
        <div className='flex flex-col xl:flex-row gap-4 xl:gap-0 items-center justify-between'>
          {data && !error ? (
            <AnimeDynamicHeading data={data} order={order} status={status} search={search} type={type} genres={genres} />
          ) : error ? (
            <h2 className='text-xl font-semibold min-h-[2rem]'>Browse Anime</h2>
          ) : (
            <Skeleton className='h-8 w-full max-w-xl rounded-md sm:h-9' />
          )}
          <div className='flex items-center w-full xl:w-fit gap-3'>
            <Suspense fallback={<AnimeSearchBarSkeleton />}>
              <AnimeSearchBar order={order} status={status} search={search} type={type} genres={genres} />
            </Suspense>
          </div>
        </div>

        {error ? (
          <p className='mt-6 text-center text-destructive'>Could not load anime. Please try again.</p>
        ) : isLoading && !data ? (
          <AnimeCardGridSkeleton count={DEFAULT_LIMIT} className='mt-3' />
        ) : (
          <AnimeCardList data={data?.data} limit={DEFAULT_LIMIT} className='mt-3' />
        )}

        <Suspense fallback={<PaginationControlsSkeleton />}>
          <PaginationControls pagination={data?.pagination} />
        </Suspense>
      </div>
    </div>
  );
}

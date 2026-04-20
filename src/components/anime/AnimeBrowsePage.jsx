'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AnimeCardList from '@/components/anime/AnimeCardList';
import PaginationControls from '@/components/PaginationControls';
import AnimeSearchBar from '@/components/anime/AnimeSearchBar';
import AnimeDynamicHeading from '@/components/anime/AnimeDynamicHeading';
import Loader from '@/components/Loader';
import AnimeFiltersSidebar from '@/components/anime/AnimeFiltersSidebar';
import { buildAnimeBrowseQueryString } from '@/utils/animeBrowseQuery';
import { BASE_API } from '@/utils/constants';

const DEFAULT_LIMIT = 20;

const resolvedFilterParams = (order, status, type) => [
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

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    setError(null);
    setIsLoading(true);
    setData(null);

    const sp = new URLSearchParams(queryKey);
    const qs = buildAnimeBrowseQueryString(sp, DEFAULT_LIMIT);
    const url = `${BASE_API}/anime?${qs}`;

    fetch(url, { signal: ac.signal })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((e) => {
        if (e.name === 'AbortError') return;
        setError(e);
        setData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => ac.abort();
  }, [queryKey]);

  return (
    <div className='section flex gap-3 space-x-4'>
      <AnimeFiltersSidebar
        key={queryKey}
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
            <div className='w-full flex mx-auto min-h-[2rem] items-center xl:w-auto'>
              <Loader size='lg' />
            </div>
          )}
          <div className='flex items-center w-full xl:w-fit gap-3'>
            <Suspense fallback={<Loader />}>
              <AnimeSearchBar order={order} status={status} search={search} type={type} genres={genres} />
            </Suspense>
          </div>
        </div>

        {error ? (
          <p className='mt-6 text-center text-destructive'>Could not load anime. Please try again.</p>
        ) : isLoading && !data ? (
          <div className='w-full flex mx-auto mt-3'>
            <Loader size='lg' />
          </div>
        ) : (
          <AnimeCardList data={data?.data} limit={DEFAULT_LIMIT} className='mt-3' />
        )}

        <Suspense fallback={<Loader />}>
          <PaginationControls pagination={data?.pagination} />
        </Suspense>
      </div>
    </div>
  );
}

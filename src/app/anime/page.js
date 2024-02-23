import AnimeCardList from '@/components/anime/AnimeCardList';
import PaginationControls from '@/components/PaginationControls';
import AnimeSearchBar from '@/components/anime/AnimeSearchBar';

import { getFilterdAnime } from '@/utils/api';
import AnimeDynamicHeading from '@/components/anime/AnimeDynamicHeading';
import { Suspense } from 'react';
import Loader from '@/components/Loader';
import AnimeFiltersSidebar from '@/components/anime/AnimeFiltersSidebar';

export default async function AnimePage({ searchParams }) {
  const defaultLimit = 20;

  const { page = '1', order = 'members', status = 'all', search = '', type = 'all', genres = '', min_score = '', max_score = '' } = searchParams;

  const orderParam = `order_by=${order}`;
  const sortParam = '&sort=desc';
  const limitParam = `&limit=${defaultLimit}`;
  const statusParam = status && status !== 'all' ? `&status=${status}` : '';
  const pageParam = `&page=${page}`;
  const searchParam = search ? `&q=${search}` : '';
  const typeParam = type !== 'all' ? `&type=${type}` : '';
  const genreParam = genres ? `&genres=${genres}` : '';
  const minScoreParam = min_score ? `&min_score=${min_score}` : '';
  const maxScoreParam = max_score ? `&max_score=${max_score}` : '';
  const params = `${orderParam}${sortParam}${limitParam}${statusParam}${pageParam}${searchParam}${typeParam}${genreParam}${minScoreParam}${maxScoreParam}&sfw`;
  const data = await getFilterdAnime(params);
  const filterParams = [
    {
      title: 'Sort by',
      param: {
        name: 'order',
        value: order,
      },
      options: [
        { name: 'Popularity', value: 'members' },
        { name: 'Score', value: 'score' },
        { name: 'Episodes', value: 'episodes' },
      ],
    },
    {
      title: 'Status',
      param: {
        name: 'status',
        value: status,
      },
      options: [
        { name: 'All', value: 'all' },
        { name: 'Airing', value: 'airing' },
        { name: 'Upcoming', value: 'upcoming' },
        { name: 'Complete', value: 'complete' },
      ],
    },
    {
      title: 'Type',
      param: {
        name: 'type',
        value: type,
      },
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
  return (
    <div className='section flex gap-3 space-x-4'>
      <AnimeFiltersSidebar filterParams={filterParams} genres={genres} minScore={min_score} maxScore={max_score} />
      <div className='grow'>
        <div className='flex flex-col xl:flex-row gap-4 xl:gap-0 items-center justify-between'>
          <AnimeDynamicHeading data={data} order={order} status={status} search={search} type={type} genres={genres} />
          <div className='flex items-center w-full xl:w-fit gap-3'>
            <Suspense fallback={<Loader />}>
              <AnimeSearchBar order={order} status={status} search={search} type={type} genres={genres} />
            </Suspense>
          </div>
        </div>
        <AnimeCardList data={data?.data} limit={defaultLimit} className='mt-3' />
        <Suspense fallback={<Loader />}>
          <PaginationControls pagination={data?.pagination} />
        </Suspense>
      </div>
    </div>
  );
}

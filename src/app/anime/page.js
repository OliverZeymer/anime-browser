import AnimeCardList from '@/components/AnimeCardList';
import PaginationControls from '@/components/PaginationControls';
import AnimeSearchBar from '@/components/AnimeSearchBar';

import { getFilterdAnime } from '@/utils/api';
import AnimeDynamicHeading from '@/components/AnimeDynamicHeading';
import { Suspense } from 'react';
import Loader from '@/components/Loader';

export default async function AnimePage({ searchParams }) {
  const defaultLimit = 10;

  const calculateLimit = () => {
    if (typeof window === 'undefined') return 20;

    const windowWidth = window.innerWidth;

    if (windowWidth >= 3248) return 20;
    if (windowWidth > 2923) return 20;
    if (windowWidth <= 2923 && windowWidth > 2599) return 24;
    if (windowWidth <= 2599 && windowWidth > 2275) return 21;
    if (windowWidth <= 2275 && windowWidth > 1951) return 24;
    if (windowWidth <= 1951 && windowWidth > 1627) return 25;
    if (windowWidth <= 1627 && windowWidth > 1303) return 24;
  };

  const limit = calculateLimit();

  const { page = '1', order = 'members', status = 'all', search = '', type = 'all', genres = '' } = searchParams;

  const orderParam = `order_by=${order}`;
  const sortParam = '&sort=desc';
  const limitParam = `&limit=${limit}`;
  const statusParam = status && status !== 'all' ? `&status=${status}` : '';
  const pageParam = `&page=${page}`;
  const searchParam = search ? `&q=${search}` : '';
  const typeParam = type !== 'all' ? `&type=${type}` : '';
  const genreParam = genres ? `&genres=${genres}` : '';
  const params = `${orderParam}${sortParam}${limitParam}${statusParam}${pageParam}${searchParam}${typeParam}${genreParam}&sfw`;
  const data = await getFilterdAnime(params);

  return (
    <div className='section'>
      <AnimeDynamicHeading data={data} order={order} status={status} search={search} type={type} genres={genres} />
      <Suspense fallback={<Loader />}>
        <AnimeSearchBar order={order} status={status} search={search} type={type} genres={genres} />
      </Suspense>
      <AnimeCardList data={data?.data} limit={limit} />
      <Suspense fallback={<Loader />}>
        <PaginationControls pagination={data?.pagination} />
      </Suspense>
    </div>
  );
}

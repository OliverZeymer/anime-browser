'use client';
// Importing necessary dependencies and components
import { useQuery } from 'react-query';
import AnimeCardList from '@/components/AnimeCardList';
import PaginationControls from '@/components/PaginationControls';
import AnimeSearchBar from '@/components/AnimeSearchBar';
import { BASE_API } from '@/utils/constants';

export default function AnimePage({ searchParams }) {
  const defaultLimit = 10;

  const calculateLimit = () => {
    if (typeof window !== 'undefined') {
      const windowWidth = window.innerWidth;

      if (windowWidth >= 3248) return 20;
      if (windowWidth > 2923) return 20;
      if (windowWidth <= 2923 && windowWidth > 2599) return 24;
      if (windowWidth <= 2599 && windowWidth > 2275) return 21;
      if (windowWidth <= 2275 && windowWidth > 1951) return 24;
      if (windowWidth <= 1951 && windowWidth > 1627) return 25;
      if (windowWidth <= 1627 && windowWidth > 1303) return 24;
    }

    return defaultLimit;
  };

  const limit = calculateLimit();

  const { page = '1', order = 'members', status = 'all', search = '', type = 'all', genres= '' } = searchParams;

  const orderParam = `order_by=${order}`;
  const sortParam = '&sort=desc';
  const limitParam = `&limit=${limit}`;
  const statusParam = status && status !== 'all' ? `&status=${status}` : '';
  const pageParam = `&page=${page}`;
  const searchParam = search ? `&q=${search}` : '';
  const typeParam = type !== 'all' ? `&type=${type}` : '';
  const genreParam = genres ? `&genre=${genres}` : '';
  const API_URL = `${BASE_API}/anime?${orderParam}${sortParam}${limitParam}${statusParam}${pageParam}&sfw${searchParam}${typeParam}&`;

  const { data, isLoading, error, refetch } = useQuery(['anime', page, order, status, search, type], async () => {
    const response = await fetch(API_URL, { next: { revalidate: 3600 } });
    const data = await response.json();
    return data;
  });

  return (
    <div className='px-4 pt-32'>
      <h1 className='text-6xl font-bold leading-[1.15] mb-6 text-center'>Browse 24.000+ Anime</h1>
      <AnimeSearchBar order={order} status={status} search={search} type={type} />
      <AnimeCardList data={data?.data} isLoading={isLoading} error={error} refetch={refetch} limit={limit} />
      <PaginationControls pagination={data?.pagination} />
    </div>
  );
}

'use client';
// Importing necessary dependencies and components
import { useQuery } from 'react-query';
import AnimeCardList from '@/components/AnimeCardList';
import PaginationControls from '@/components/PaginationControls';
import AnimeSearchBar from '@/components/AnimeSearchBar';
import { BASE_API } from '@/utils/constants';

// Default limit for the number of items to be displayed
const defaultLimit = 10;

// Function to calculate the limit based on window width
const calculateLimit = () => {
  const mediaQueries = [
    { minWidth: 3248, limit: 20 },
    { minWidth: 2924, limit: 20 },
    { minWidth: 2599, maxWidth: 2923, limit: 24 },
    { minWidth: 2275, maxWidth: 2598, limit: 21 },
    { minWidth: 1951, maxWidth: 2274, limit: 24 },
    { minWidth: 1627, maxWidth: 1950, limit: 25 },
    { minWidth: 1303, maxWidth: 1626, limit: 24 },
  ];
  // Find the first media query that matches the current window width
  const matchedQuery = mediaQueries.find((query) => {
    const mediaQuery = window.matchMedia(`(min-width: ${query.minWidth}px)${query.maxWidth ? ` and (max-width: ${query.maxWidth}px)` : ''}`);
    return mediaQuery.matches;
  });

  return matchedQuery ? matchedQuery.limit : defaultLimit;
};
export default function AnimePage({ searchParams }) {
  // Destructuring searchParams with default values
  const { page = '1', order = 'members', status = 'all', search = '' } = searchParams;

  // Calculating the limit based on window width
  const limit = calculateLimit();

  // Building individual parts of the API_URL
  const orderParam = `order_by=${order}`;
  const sortParam = 'sort=desc';
  const limitParam = `limit=${limit}`;
  const statusParam = status && status !== 'all' ? `&status=${status}` : '';
  const pageParam = `&page=${page}`;
  const sfwParam = 'sfw';
  const searchParam = search ? `&q=${search}` : '';

  // Constructing API_URL by joining the individual parts
  const API_URL = `${BASE_API}/anime?${orderParam}&${sortParam}&${limitParam}${statusParam}${pageParam}&${sfwParam}${searchParam}`;

  // Using react-query hook for fetching data
  const { data, isLoading, error, refetch } = useQuery(['anime', page, order, status, search], async () => {
    const response = await fetch(API_URL, { next: { revalidate: 3600 } });
    const data = await response.json();
    return data;
  });

  return (
    <div className='px-4 pt-32'>
      <h1 className='text-6xl font-bold leading-[1.15] mb-6 text-center'>Browse 24.000+ Anime</h1>

      <AnimeSearchBar order={order} status={status} search={search} />
      <AnimeCardList data={data?.data} isLoading={isLoading} error={error} refetch={refetch} limit={limit} />
      <PaginationControls pagination={data?.pagination} />
    </div>
  );
}

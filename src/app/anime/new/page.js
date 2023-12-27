import AnimeCardList from '@/components/AnimeCardList';
import PaginationControls from '@/components/PaginationControls';
import AnimeSearchBar from '@/components/AnimeSearchBar';

import { getThisSeason } from '@/utils/api';


export default async function NewAnimePage({ searchParams }) {
  const limit = 24;

  const { page = '1', order = 'members', status = 'all', search = '', type = 'all', genres = '' } = searchParams;

  const orderParam = `order_by=${order}`;
  const sortParam = '&sort=desc';
  const limitParam = `&limit=${limit}`;
  const statusParam = status && status !== 'all' ? `&status=${status}` : '';
  const pageParam = `&page=${page}`;
  const searchParam = search ? `&q=${search}` : '';
  const typeParam = type !== 'all' ? `&type=${type}` : '';
  const genreParam = genres ? `&genres=${genres}` : '';
  const animeResponse = await getThisSeason(page);
  const data = await animeResponse.json();
  console.log(data.season);
  return (
    <div className='px-4 pt-32'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] mb-6 text-center'>Browsing {new Date().getFullYear()} Anime Season</h1>
      <AnimeSearchBar order={order} status={status} search={search} type={type} genres={genres} />
      <AnimeCardList data={data?.data} limit={limit} />
      <PaginationControls pagination={data?.pagination} />
    </div>
  );
}

import AnimeCardList from '@/components/AnimeCardList';
import PaginationControls from '@/components/PaginationControls';
import AnimeSearchBar from '@/components/AnimeSearchBar';

import { getThisSeason } from '@/utils/api';
import { Suspense } from 'react';
export const metadata = {
  title: `Anime Browser - ${new Date().getFullYear()} Anime`,
  description: `Browse the newest anime of ${new Date().getFullYear()} on Anime Browser. We have a huge library of over 24,000 anime and a user friendly interface. Come sign up and start bookmarking and learning about your favorite anime.`,
};
export default async function NewAnimePage({ searchParams }) {
  const limit = 24;

  const { page = '1', order = 'members', status = 'all', search = '', type = 'all', genres = '' } = searchParams;
  const data = await getThisSeason(page);
  return (
    <div className='px-4 pt-32'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] mb-6 text-center'>Browsing Newest {new Date().getFullYear()} Anime</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <AnimeSearchBar order={order} status={status} search={search} type={type} genres={genres} />
      </Suspense>
      <AnimeCardList data={data?.data} limit={limit} />
      <Suspense fallback={<div>Loading...</div>}>
        <PaginationControls pagination={data?.pagination} />
      </Suspense>
    </div>
  );
}

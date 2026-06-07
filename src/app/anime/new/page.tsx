import AnimeCardList from '@/components/anime/AnimeCardList';
import PaginationControls from '@/components/PaginationControls';
import AnimeSearchBar from '@/components/anime/AnimeSearchBar';
import { getThisSeason } from '@/libs/jikan/fetch-anime';
import { Suspense } from 'react';
import { AnimeSearchBarSkeleton } from '@/components/anime/AnimeSearchBarSkeleton';
import { PaginationControlsSkeleton } from '@/components/PaginationControlsSkeleton';
import { ANIME_SEASON_LIMIT } from '@/utils/animeCardLayout';
import dayjs from 'dayjs';

type Props = {
  searchParams: Promise<{
    page?: string;
    order?: string;
    status?: string;
    search?: string;
    type?: string;
    genres?: string;
  }>;
};

const currentYear = dayjs().year();

export const metadata = {
  title: `Anime Browser - ${currentYear} Anime`,
  description: `Browse the newest anime of ${currentYear} on Anime Browser. We have a huge library of over 24,000 anime and a user friendly interface. Come sign up and start bookmarking and learning about your favorite anime.`,
};

const NewAnimePage = async ({ searchParams }: Props) => {
  const limit = ANIME_SEASON_LIMIT;
  const resolvedSearchParams = await searchParams;
  const {
    page = '1',
    order = 'members',
    status = 'all',
    search = '',
    type = 'all',
    genres = '',
  } = resolvedSearchParams;
  const data = await getThisSeason(Number(page));

  return (
    <div className='px-4 pt-32'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] mb-6 text-center'>
        Browsing Newest {currentYear} Anime
      </h1>
      <Suspense fallback={<AnimeSearchBarSkeleton />}>
        <AnimeSearchBar order={order} status={status} search={search} type={type} genres={genres} />
      </Suspense>
      <AnimeCardList data={data?.data} limit={limit} />
      <Suspense fallback={<PaginationControlsSkeleton />}>
        <PaginationControls pagination={data?.pagination} />
      </Suspense>
    </div>
  );
};

export default NewAnimePage;

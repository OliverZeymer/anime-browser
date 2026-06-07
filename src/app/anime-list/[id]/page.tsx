import { getAnimeListForUser } from '@/app/anime-list/[id]/_services/fetch-anime-list';
import { getUserPublicById } from '@/app/profile/[id]/_services/fetch-user-public';
import AnimeCardList from '@/components/anime/AnimeCardList';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export const revalidate = 60;

const AnimeListPage = async ({ params }: Props) => {
  const { id } = await params;
  const [animeListResult, userResult] = await Promise.all([
    getAnimeListForUser(id),
    getUserPublicById(id),
  ]);

  if (!userResult.success || !userResult.data) {
    notFound();
  }

  const user = userResult.data;

  return (
    <section className='section'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] mb-6 text-center'>
        {user.username}&apos;s Anime List
      </h1>
      <AnimeCardList data={animeListResult.animeList?.anime} />
    </section>
  );
};

export default AnimeListPage;

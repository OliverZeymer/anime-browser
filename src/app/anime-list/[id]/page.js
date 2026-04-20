import { getAnimeListForUser, getUserPublicById } from '@/lib/server/userData';
import AnimeCardList from '@/components/anime/AnimeCardList';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function AnimeListPage({ params }) {
  const id = params.id;
  const [animeListResult, userResult] = await Promise.all([getAnimeListForUser(id), getUserPublicById(id)]);
  if (!userResult.success || !userResult.data) {
    notFound();
  }
  const user = userResult.data;
  return (
    <section className='section'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] mb-6 text-center'>
        {user?.username}
        &apos;s Anime List
      </h1>
      <AnimeCardList data={animeListResult.animeList?.anime} />
    </section>
  );
}

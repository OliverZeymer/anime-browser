import { getAnimeList } from '@/utils/api';
import { getProfile } from '@/utils/api';
import AnimeCardList from '@/components/AnimeCardList';

export default async function AnimeListPage({ params }) {
  const id = params.id;
  const animeListData = await getAnimeList(id);
  const userData = await getProfile(id);
  const user = userData?.data;
  return (
    <section className='section'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] mb-6 text-center'>
        {user?.username}
        's Anime List
      </h1>
      <AnimeCardList data={animeListData?.animeList?.anime} />
    </section>
  );
}
export const dynamic = 'force-dynamic';

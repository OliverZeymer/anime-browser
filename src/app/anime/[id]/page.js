import AnimeCharacters from '@/components/anime/AnimeCharacters';
import AnimeSynopsis from '@/components/anime/AnimeSynopsis';
import AnimeYoutubeEmbed from '@/components/anime/AnimeYoutubeEmbed';
import AnimeStatistics from '@/components/anime/AnimeStatistics';
import { getAnimeById } from '@/utils/api';
export async function generateMetadata({ params }) {
  const data = await getAnimeById(params.id);
  const anime = data.data;
  return {
    title: anime.title_english ? anime.title_english : anime.title_japanese ? anime.title_japanese : anime.title,
    description: anime.synopsis?.replace(/\[Written by MAL Rewrite\]$/, '')?.trim()
      ? anime.synopsis?.replace(/\[Written by MAL Rewrite\]$/, '')?.trim()
      : anime.title_english
      ? anime.title_english
      : anime.title_japanese
      ? anime.title_japanese
      : anime.title,
  };
}
export default async function AnimePage({ params }) {
  const data = await getAnimeById(params.id);
  const anime = data.data;

  return (
    <>
      <div className='flex md:w-[calc(100vw-364px)] flex-col gap-6'>
        <AnimeSynopsis synopsis={anime?.synopsis?.replace(/\[Written by MAL Rewrite\]$/, '')?.trim()} />
        <AnimeCharacters id={params.id} />
        <div className='flex h-full w-full flex-col 2xl:flex-row gap-6'>
          <AnimeYoutubeEmbed title='Trailer' url={anime?.trailer?.embed_url} />
          <AnimeStatistics id={params.id} />
        </div>
      </div>
    </>
  );
}

export const revalidate = 3600;

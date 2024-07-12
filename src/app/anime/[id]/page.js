import AnimeCharacters from '@/components/anime/AnimeCharacters';
import AnimeSynopsis from '@/components/anime/AnimeSynopsis';
import AnimeYoutubeEmbed from '@/components/anime/AnimeYoutubeEmbed';
import AnimeStatistics from '@/components/anime/AnimeStatistics';
import { getAnimeById } from '@/utils/api';
import { Suspense } from 'react';
import Loader from '@/components/Loader';
import PrimaryCard from '@/components/PrimaryCard';
export async function generateMetadata({ params }) {
  const data = await getAnimeById(params.id);
  const anime = data.data;
  const ogImageUrl = anime.images?.webp?.large_image_url;
  const resolvedTitle = anime.title_english || anime.title_japanese || anime.title;
  return {
    title: `${resolvedTitle} - AnimeBrowser`,
    description: anime.synopsis?.replace(/\[Written by MAL Rewrite\]$/, '').trim() ||
      resolvedTitle,
    openGraph: {
      title: resolvedTitle,
      description: anime.synopsis?.replace(/\[Written by MAL Rewrite\]$/, '').trim() ||
        resolvedTitle,
      images: ogImageUrl ? [{
        url: ogImageUrl,
        width: 800,
        height: 600,
        alt: resolvedTitle,
      }] : [],
    },
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
          <PrimaryCard className='w-full font-medium 2xl:w-[30%]'>
            <h4 className='text-2xl font-bold mb-2'>Statistics</h4>
            <Suspense fallback={<Loader size="lg" />}>
              <AnimeStatistics id={params.id} />
            </Suspense>
          </PrimaryCard>
        </div>
      </div>
    </>
  );
}

export const revalidate = 3600;

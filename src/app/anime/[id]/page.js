import AnimeBanner from '@/components/anime/AnimeBanner';
import AnimeCharacters from '@/components/anime/AnimeCharacters';
import AnimeRecommendations from '@/components/anime/AnimeRecommendations';
import AnimeReviewList from '@/components/anime/AnimeReviewList';
import dynamic from 'next/dynamic';
import AnimeStats from '@/components/anime/AnimeStats';
import AnimeSynopsis from '@/components/anime/AnimeSynopsis';
import AnimeYoutubeEmbed from '@/components/anime/AnimeYoutubeEmbed';
import ClickableImage from '@/components/ClickableImage';
import StickyAside from '@/components/StickyAside';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAnimeById, getAnimeStatsById } from '@/utils/api';
const AnimeStatistics = dynamic(() => import('@/components/anime/AnimeStatistics'), { ssr: false });
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
  const statsData = await getAnimeStatsById(params.id);
  const anime = data.data;
  const statistics = statsData.data;

  return (
    <section>
      <AnimeBanner anime={anime} />
      <div className='mt-8 px-4 flex flex-col w-full md:flex-row gap-6'>
        <div>
          <ClickableImage src={anime?.images?.webp?.large_image_url} alt={anime?.title_english} width={450} height={700} />
          <StickyAside className='md:items-start self-start flex flex-col gap-2 items-center md:min-w-[300px] md:top-4 md:w-[300px]'>
            <AnimeStats anime={anime} />
          </StickyAside>
        </div>
        <div className='flex md:w-[calc(100vw-364px)] flex-col gap-6'>
          <AnimeSynopsis synopsis={anime?.synopsis?.replace(/\[Written by MAL Rewrite\]$/, '')?.trim()} />
          <AnimeCharacters id={params.id} />
          <div className='flex h-full w-full flex-col 2xl:flex-row gap-6'>
            <AnimeYoutubeEmbed title='Trailer' url={anime?.trailer?.embed_url} />
            <AnimeStatistics statistics={statistics} />
          </div>
        </div>
      </div>
      <Tabs defaultValue='recommended' className='mt-6 px-4'>
        <TabsList>
          <TabsTrigger value='recommended'>Recommended</TabsTrigger>
          <TabsTrigger value='reviews'>Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value='recommended'>
          <AnimeRecommendations id={params.id} />
        </TabsContent>
        <TabsContent value='reviews'>
          <AnimeReviewList id={params.id} />
        </TabsContent>
      </Tabs>
    </section>
  );
}

export const revalidate = 3600;

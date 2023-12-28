import AnimeBanner from '@/components/AnimeBanner';
import AnimeCharacters from '@/components/AnimeCharacters';
import AnimeRecommendations from '@/components/AnimeRecommendations';
import AnimeReviewList from '@/components/AnimeReviewList';
import AnimeStats from '@/components/AnimeStats';
import AnimeSynopsis from '@/components/AnimeSynopsis';
import AnimeTrailer from '@/components/AnimeTrailer';
import ClickableImage from '@/components/ClickableImage';
import StickyAside from '@/components/StickyAside';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAnimeById } from '@/utils/api';
export const revalidate = 3600;
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
    <section>
      <AnimeBanner anime={anime} />
      <div className='mt-12 px-4 flex flex-col md:flex-row gap-6'>
        <StickyAside>
          <ClickableImage src={anime?.images?.webp?.large_image_url} alt={anime?.title_english} width={450} height={700} />
          <AnimeStats anime={anime} />
        </StickyAside>
        <div className='flex flex-col gap-6 w-fit'>
          <AnimeSynopsis synopsis={anime?.synopsis?.replace(/\[Written by MAL Rewrite\]$/, '')?.trim()} />
          <AnimeCharacters id={params.id} />
          {anime?.trailer?.embed_url && <AnimeTrailer trailer={anime?.trailer?.embed_url} />}
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

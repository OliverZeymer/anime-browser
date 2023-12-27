import AnimeBanner from '@/components/AnimeBanner';
import AnimeCharacters from '@/components/AnimeCharacters';
import AnimeRecommendations from '@/components/AnimeRecommendations';
import AnimeReviewList from '@/components/AnimeReviewList';
import AnimeStats from '@/components/AnimeStats';
import AnimeSynopsis from '@/components/AnimeSynopsis';
import ClickableImage from '@/components/ClickableImage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAnimeById } from '@/utils/api';

export default async function AnimePage({ params }) {
  const animeResponse = await getAnimeById(params.id);
  const animeData = await animeResponse.json();
  const anime = animeData.data;

  return (
    <section>
      <AnimeBanner anime={anime} />
      <div className='mt-12 px-4 flex flex-col md:flex-row gap-6'>
        <aside className='flex flex-col gap-2 w-full items-center md:items-start md:min-w-[300px] md:w-[300px]'>
          <ClickableImage src={anime.images.webp.large_image_url} alt={anime.title_english} width={450} height={700} />
          <AnimeStats anime={anime} />
        </aside>
        <div className='flex flex-col gap-6 w-fit'>
          <AnimeSynopsis synopsis={anime.synopsis.replace(/\[Written by MAL Rewrite\]$/, '').trim()} />
          <AnimeCharacters id={params.id} />
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

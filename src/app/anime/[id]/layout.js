import { getAnimeById } from '@/utils/api';
import AnimeBanner from '@/components/anime/AnimeBanner';
import ClickableImage from '@/components/ClickableImage';
import AnimeStats from '@/components/anime/AnimeStats';
import StickyAside from '@/components/StickyAside';
import AnimeRecommendations from '@/components/anime/AnimeRecommendations';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
export default async function AnimeLayout({ params, children }) {
  const data = await getAnimeById(params.id);
  const anime = data.data;
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
        {children}
      </div>

      <Tabs defaultValue='recommended' className='mt-6 px-4'>
        <TabsList>
          <TabsTrigger value='recommended'>Recommended</TabsTrigger>
        </TabsList>
        <TabsContent value='recommended'>
          <AnimeRecommendations id={params.id} />
        </TabsContent>
      </Tabs>
    </section>
  );
}

import AnimeBanner from '@/components/AnimeBanner';
import AnimeCharacters from '@/components/AnimeCharacters';
import AnimeStats from '@/components/AnimeStats';
import AnimeSynopsis from '@/components/AnimeSynopsis';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAnimeById } from '@/utils/api';
import Image from 'next/image';

export default async function AnimePage({ params }) {
  const animeResponse = await getAnimeById(params.id);
  const animeData = await animeResponse.json();
  const anime = animeData.data;

  return (
    <section>
      <AnimeBanner anime={anime} />
      <div className='mt-12 px-4 flex flex-col sm:flex-row gap-6'>
        <aside className='flex flex-col gap-2 w-full items-center sm:items-start sm:min-w-[300px] sm:w-[300px]'>
          <Image src={anime.images.webp.large_image_url} alt={anime.title_english} width={300} height={450} className='w-[300px] h-[450px] rounded-2xl relative object-cover' />
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
          <div>Recommended</div>
        </TabsContent>
        <TabsContent value='reviews'>
          <div>Reviews</div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

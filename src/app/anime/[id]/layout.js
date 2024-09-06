import { getAnimeById } from '@/utils/api';
import AnimeBanner from '@/components/anime/AnimeBanner';
import ClickableImage from '@/components/ClickableImage';
import AnimeStats from '@/components/anime/AnimeStats';
import StickyAside from '@/components/StickyAside';
import dynamic from 'next/dynamic';

const ClientAnimeTabs = dynamic(() => import('@/components/anime/AnimeTabs'), {
  ssr: false,
});

export default async function AnimeLayout({ params, children }) {
  const data = await getAnimeById(params.id);
  const anime = data.data;

  return (
    <section>
      <AnimeBanner anime={anime} />
      <div className='mt-8 px-4 flex flex-col w-full md:flex-row gap-6 items-center md:items-start'>
        <StickyAside className='md:items-start md:self-start flex flex-col gap-2 items-center md:w-[300px]'>
          <div className='w-full md:w-fit flex flex-col'>
            <ClickableImage src={anime?.images?.webp?.large_image_url} alt={anime?.title_english} className='self-center' width={450} height={700} />
            <AnimeStats anime={anime} />
          </div>
        </StickyAside>
        {children}
      </div>
      <ClientAnimeTabs id={params.id} />
    </section>
  );
}

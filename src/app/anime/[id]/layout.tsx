import { getAnimeById } from '@/libs/jikan/fetch-anime';
import AnimeBanner from '@/components/anime/AnimeBanner';
import ClickableImage from '@/components/ClickableImage';
import AnimeStats from '@/components/anime/AnimeStats';
import StickyAside from '@/components/StickyAside';
import { AnimeTabsSectionWithSuspense } from '@/app/anime/[id]/_components/AnimeTabsSection';

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

const AnimeLayout = async ({ params, children }: Props) => {
  const { id } = await params;
  const data = await getAnimeById(Number(id));
  const anime = data.data;

  return (
    <section>
      <AnimeBanner anime={anime} />
      <div className='mt-8 px-4 flex flex-col w-full md:flex-row gap-6 items-center md:items-start'>
        <StickyAside className='md:items-start md:self-start flex flex-col gap-2 items-center md:w-[300px]'>
          <div className='w-full md:w-fit flex flex-col'>
            <ClickableImage
              src={anime?.images?.webp?.large_image_url ?? ''}
              alt={anime?.title_english ?? anime?.title ?? ''}
              className='self-center'
              width={450}
              height={700}
            />
            <AnimeStats anime={anime} />
          </div>
        </StickyAside>
        {children}
      </div>
      <AnimeTabsSectionWithSuspense id={id} />
    </section>
  );
};

export default AnimeLayout;

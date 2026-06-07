import { Suspense } from 'react';
import { AnimeCharactersSkeleton } from '@/components/anime/AnimeCharactersSkeleton';
import { AnimeTrailerStatsContent } from '@/app/anime/[id]/_components/AnimeTrailerStatsContent';
import { AnimeTrailerStatsSkeleton } from '@/app/anime/[id]/_components/AnimeTrailerStatsSkeleton';
import { AnimeSynopsisSection } from '@/app/anime/[id]/_components/AnimeSynopsisSection';
import AnimeCharacters from '@/components/anime/AnimeCharacters';
import { getAnimeById } from '@/libs/jikan/fetch-anime';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;
  const data = await getAnimeById(Number(id));
  const anime = data.data;
  const ogImageUrl = anime.images?.webp?.large_image_url;
  const resolvedTitle = anime.title_english || anime.title_japanese || anime.title;

  return {
    title: `${resolvedTitle} - AnimeBrowser`,
    description:
      anime.synopsis?.replace(/\[Written by MAL Rewrite\]$/, '').trim() || resolvedTitle,
    openGraph: {
      title: resolvedTitle,
      description:
        anime.synopsis?.replace(/\[Written by MAL Rewrite\]$/, '').trim() || resolvedTitle,
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              width: 800,
              height: 600,
              alt: resolvedTitle,
            },
          ]
        : [],
    },
  };
};

const AnimePage = async ({ params }: Props) => {
  const { id } = await params;
  const animeId = Number(id);

  return (
    <div className='flex md:w-[calc(100vw-364px)] flex-col gap-6'>
      <AnimeSynopsisSection id={animeId} />
      <Suspense fallback={<AnimeCharactersSkeleton />}>
        <AnimeCharacters id={animeId} />
      </Suspense>
      <Suspense fallback={<AnimeTrailerStatsSkeleton />}>
        <AnimeTrailerStatsContent animeId={animeId} />
      </Suspense>
    </div>
  );
};

export default AnimePage;

export const revalidate = 3600;

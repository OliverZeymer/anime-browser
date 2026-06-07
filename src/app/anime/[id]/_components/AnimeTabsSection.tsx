import { Suspense } from 'react';
import { getAnimeRecommendations, getAnimeReviews } from '@/libs/jikan/fetch-anime';
import { AnimeTabsSkeleton } from '@/components/anime/AnimeTabsSkeleton';
import { AnimeTabs } from './AnimeTabs';

type Props = {
  id: string;
};

export const AnimeTabsSection = async ({ id }: Props) => {
  const animeId = Number(id);

  const recommendedResponse = await getAnimeRecommendations(animeId);
  const reviewsResponse = await getAnimeReviews(animeId);

  return (
    <AnimeTabs
      recommendations={recommendedResponse.data ?? []}
      reviews={reviewsResponse.data ?? []}
    />
  );
};

export const AnimeTabsSectionWithSuspense = ({ id }: Props) => {
  return (
    <Suspense fallback={<AnimeTabsSkeleton />}>
      <AnimeTabsSection id={id} />
    </Suspense>
  );
};

'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimeCardList from '@/components/anime/AnimeCardList';
import AnimeReview from '@/components/anime/AnimeReview';
import NoResultsFound from '@/components/NoResultsFound';
import { ANIME_TAB_RECOMMENDATIONS_LIMIT } from '@/utils/animeCardLayout';
import type { AnimeReview as AnimeReviewType, Recommendation } from '@tutkli/jikan-ts/types';

type Props = {
  recommendations: Recommendation[];
  reviews: AnimeReviewType[];
};

export const AnimeTabs = ({ recommendations, reviews }: Props) => {
  const recommendationsData = recommendations.slice(0, ANIME_TAB_RECOMMENDATIONS_LIMIT);

  return (
    <Tabs defaultValue='recommended' className='mt-6 px-4'>
      <TabsList>
        <TabsTrigger value='recommended'>Recommended</TabsTrigger>
        <TabsTrigger value='reviews'>Reviews</TabsTrigger>
      </TabsList>
      <div className='min-h-[500px]'>
        <TabsContent value='recommended'>
          <AnimeCardList className='mt-6' data={recommendationsData} isRecommendations />
        </TabsContent>
        <TabsContent value='reviews'>
          <div className='flex flex-wrap gap-6'>
            {reviews.length > 0 ? (
              reviews.map((review) => {
                return <AnimeReview review={review} key={review.mal_id} />;
              })
            ) : (
              <NoResultsFound />
            )}
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

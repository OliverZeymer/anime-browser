import { getAnimeRecommendations } from '@/utils/api';
import AnimeCardList from './AnimeCardList';

export default async function AnimeRecommendations({ id }) {
  const recommendedResponse = await getAnimeRecommendations(id);
  const recommendations = recommendedResponse.data;

  const recommendationsLimit = 10;

  const recommendationsData = await recommendations?.slice(0, recommendationsLimit);

  return <AnimeCardList className='mt-6' data={recommendationsData} limit={10} isRecommendations />;
}

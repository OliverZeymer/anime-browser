import { getAnimeRecommendations } from '@/utils/api';
import AnimeCardList from './AnimeCardList';

export default async function AnimeRecommendations({ id }) {
  const recommendedResponse = await getAnimeRecommendations(id);
  const recommendedData = await recommendedResponse.json();
  const recommendations = recommendedData.data;

  const recommendationsLimit = 10;

  const recommendationsData = await recommendations?.slice(0, recommendationsLimit);

  return <AnimeCardList data={recommendationsData} limit={10} isRecommendations />;
}

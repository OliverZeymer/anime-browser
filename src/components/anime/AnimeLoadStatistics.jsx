import { getAnimeStatsById } from '@/utils/api';
import AnimeStatisticsCharts from './AnimeStatisticsCharts';
export default async function AnimeLoadStatistics({ id }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const statsData = await getAnimeStatsById(id);
  const statistics = statsData.data;
  return <AnimeStatisticsCharts statistics={statistics} />;
}

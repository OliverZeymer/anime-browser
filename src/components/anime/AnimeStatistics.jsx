import AnimeStatisticsCharts from './AnimeStatisticsCharts';
import { getAnimeStatsById } from '@/utils/api';

export default async function AnimeStatistics({ id }) {
  await new Promise((resolve) => setTimeout(resolve, 1100));
  const statsData = await getAnimeStatsById(id);
  return (
    <AnimeStatisticsCharts statistics={statsData?.data} />
  );
}

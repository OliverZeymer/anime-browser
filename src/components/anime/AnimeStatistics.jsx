import AnimeStatisticsCharts from './AnimeStatisticsCharts';
import { getAnimeStatsById } from '@/utils/api';

export default async function AnimeStatistics({ id }) {
  const statsData = await getAnimeStatsById(id);
  return (
    <AnimeStatisticsCharts statistics={statsData?.data} />
  );
}

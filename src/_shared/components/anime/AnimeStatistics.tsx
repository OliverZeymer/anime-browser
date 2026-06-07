import AnimeStatisticsCharts from './AnimeStatisticsCharts';
import { getAnimeStatsById } from '@/libs/jikan/fetch-anime';

type Props = {
  id: number;
};

export default async function AnimeStatistics({ id }: Props) {
  const statsData = await getAnimeStatsById(id);
  return (
    <AnimeStatisticsCharts statistics={statsData?.data} />
  );
}

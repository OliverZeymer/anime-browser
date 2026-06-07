import AnimeStatisticsCharts from '@/components/anime/AnimeStatisticsCharts';
import AnimeYoutubeEmbed from '@/components/anime/AnimeYoutubeEmbed';
import PrimaryCard from '@/components/PrimaryCard';
import { getAnimeById, getAnimeStatsById } from '@/libs/jikan/fetch-anime';
import { AnimeTrailerStatsLayout, AnimeTrailerStatsPanel } from './AnimeTrailerStatsLayout';

type Props = {
  animeId: number;
};

export const AnimeTrailerStatsContent = async ({ animeId }: Props) => {
  const statsData = await getAnimeStatsById(animeId);
  const animeData = await getAnimeById(animeId);
  const trailerUrl = animeData.data?.trailer?.embed_url;

  return (
    <AnimeTrailerStatsLayout
      dependency={trailerUrl}
      trailer={<AnimeYoutubeEmbed title='Trailer' url={trailerUrl} />}
      statistics={
        <PrimaryCard className='flex h-full min-h-0 flex-col font-medium'>
          <h4 className='mb-4 shrink-0 text-2xl font-bold lg:mb-6'>Statistics</h4>
          <AnimeTrailerStatsPanel className='min-h-0 flex-1 overflow-y-auto'>
            <AnimeStatisticsCharts statistics={statsData.data} />
          </AnimeTrailerStatsPanel>
        </PrimaryCard>
      }
    />
  );
};

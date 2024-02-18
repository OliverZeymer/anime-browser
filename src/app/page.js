import { getAnimeByLimit } from '@/utils/api';
import HeroSection from '@/components/HeroSection';
import AnimeSlider from '@/components/anime/AnimeSlider';

export default async function Home() {
  const topRatedData = await getAnimeByLimit('top/anime', 20);
  const airingData = await getAnimeByLimit('seasons/now', 20);
  const upcomingData = await getAnimeByLimit('seasons/upcoming', 20);
  return (
    <>
      <HeroSection />
      {topRatedData && <AnimeSlider href='/anime?order=score' title='Top Rated' data={topRatedData?.data} />}
      {airingData && <AnimeSlider href='/anime?status=airing' title='Ongoing' data={airingData?.data} />}
      {upcomingData && <AnimeSlider href='/anime?status=upcoming' title='Upcoming' data={upcomingData?.data} />}
    </>
  );
}

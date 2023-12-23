import { getAnimeByLimit } from '@/utils/api';
import HeroSection from '@/components/HeroSection';
import AnimeSlider from '@/components/AnimeSlider';

export default async function Home() {
  const topRatedResponse = await getAnimeByLimit('top/anime', 20);
  const topRated = await topRatedResponse.json();
  const airingResponse = await getAnimeByLimit('seasons/now', 20);
  const airingData = await airingResponse.json();
  const upcomingResponse = await getAnimeByLimit('seasons/upcoming', 20);
  const upcomingData = await upcomingResponse.json();
  return (
    <>
      <HeroSection />
      {topRated && <AnimeSlider href="/top" title='Top Rated' data={topRated?.data} />}
      {airingData && <AnimeSlider href="/airing" title='Airing Now' data={airingData?.data} />}
      {upcomingData && <AnimeSlider href="/upcoming" title='Upcoming' data={upcomingData?.data} />}
    </>
  );
}

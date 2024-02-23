import PrimaryCard from '../PrimaryCard';
import AnimeLoadStatistics from './AnimeLoadStatistics';

export default async function AnimeStatistics({ id }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <PrimaryCard className='w-full 2xl:w-[30%]'>
      <h4 className='text-2xl font-bold mb-6'>Statistics</h4>
      <AnimeLoadStatistics id={id} />
    </PrimaryCard>
  );
}

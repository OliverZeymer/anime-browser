import { Suspense } from 'react';
import PrimaryCard from '../PrimaryCard';
import AnimeLoadStatistics from './AnimeLoadStatistics';
import Loader from '../Loader';

export default async function AnimeStatistics({ id }) {
  return (
    <PrimaryCard className='w-full font-medium 2xl:w-[30%]'>
      <h4 className='text-2xl font-bold mb-6'>Statistics</h4>
      <Suspense fallback={<Loader />}>
        <AnimeLoadStatistics id={id} />
      </Suspense>
    </PrimaryCard>
  );
}

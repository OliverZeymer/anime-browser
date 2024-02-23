'use client';
import { BarList, BarChart } from '@tremor/react';
import PrimaryCard from '../PrimaryCard';
import ErrorCard from '../ErrorCard';

export default function AnimeStatistics({ statistics }) {
  const watchStats = [
    {
      name: 'Completed',
      value: statistics?.completed,
    },
    {
      name: 'Watching Now',
      value: statistics?.watching,
    },
    {
      name: 'Plan to Watch',
      value: statistics?.plan_to_watch,
    },
    {
      name: 'Dropped',
      value: statistics?.dropped,
    },
    {
      name: 'On Hold',
      value: statistics?.on_hold,
    },
  ];
  const sortedWatchStats = watchStats.sort((a, b) => b.value - a.value);
  const valueFormatter = (number) => {
    return number.toLocaleString('en-US');
  };

  return (
    <PrimaryCard className='w-full 2xl:w-[30%]'>
      <h4 className='text-2xl font-bold mb-6'>Statistics</h4>
      {statistics ? (
        <>
          {' '}
          <h5 className='text-lg font-bold mb-3'>Watching Stats</h5>
          <BarList color='animebrowser' valueFormatter={valueFormatter} data={sortedWatchStats} />
          <h5 className='text-lg font-bold mt-6 mb-3'>Score Distribution</h5>
          <BarChart showLegend={false} colors={['animebrowser']} data={statistics?.scores} categories={['votes']} index='score' valueFormatter={valueFormatter} />{' '}
        </>
      ) : (
        <ErrorCard className='w-full h-full flex flex-col items-center justify-center' message={`No statistics found.`}></ErrorCard>
      )}
    </PrimaryCard>
  );
}

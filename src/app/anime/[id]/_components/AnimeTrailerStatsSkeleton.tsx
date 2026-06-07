'use client';

import { Skeleton } from '@/components/ui/skeleton';
import PrimaryCard from '@/components/PrimaryCard';
import { AnimeStatisticsSkeleton } from '@/components/anime/AnimeStatisticsSkeleton';
import { AnimeTrailerStatsLayout, AnimeTrailerStatsPanel } from './AnimeTrailerStatsLayout';

export const AnimeTrailerStatsSkeleton = () => {
  return (
    <AnimeTrailerStatsLayout
      trailer={
        <PrimaryCard className='flex h-full w-full flex-col'>
          <Skeleton className='mb-4 h-7 w-24 shrink-0 rounded-sm lg:mb-6 lg:h-8' />
          <Skeleton className='aspect-video w-full shrink-0 rounded-2xl' />
        </PrimaryCard>
      }
      statistics={
        <PrimaryCard className='flex h-full min-h-0 flex-col font-medium'>
          <Skeleton className='mb-4 h-8 w-32 shrink-0 rounded-sm lg:mb-6' />
          <AnimeTrailerStatsPanel>
            <AnimeStatisticsSkeleton />
          </AnimeTrailerStatsPanel>
        </PrimaryCard>
      }
    />
  );
};

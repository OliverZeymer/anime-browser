'use client';
import SelectFilter from '@/components/SelectFilter';
import { AnimeGenreSelect } from './AnimeGenreSelect';
import { Button } from '../ui/button';
import { RotateCcw } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import StickyAside from '../StickyAside';
import { Input } from '../ui/input';
import AnimeScoreSlider from './AnimeScoreSlider';

export default function AnimeFiltersSidebar({ filterParams, genres, minScore, maxScore }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function resetFilters() {
    router.push('/anime');
  }

  function handleFilterChange(name, value) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.push(`/anime?${params.toString()}`);
  }

  return (
    <StickyAside className='hidden md:flex whitespace-nowrap flex-col gap-4 w-fit pr-2 overflow-y-auto h-screen md:top-4'>
      <div className='flex flex-col gap-4 overflow-hidden'>
        <h2 className='text-2xl font-semibold'>Filters</h2>
        {/* <Input type='text' placeholder='Search filters...' /> */}
        {filterParams.map((param) => (
          <Suspense key={param.title} fallback={<div>Loading...</div>}>
            <SelectFilter
              key={param.title}
              title={param.title}
              param={param.param}
              options={param.options}
              onChange={(value) => handleFilterChange(param.param.name, value)}
            />
          </Suspense>
        ))}
        <AnimeGenreSelect onChange={(value) => handleFilterChange('genres', value)} selectedGenres={genres} />
        <AnimeScoreSlider
          minScore={minScore}
          maxScore={maxScore}
          onMinScoreChange={(value) => handleFilterChange('min_score', value)}
          onMaxScoreChange={(value) => handleFilterChange('max_score', value)}
        />
        <Button onClick={resetFilters} variant='secondary'>
          <RotateCcw size={14} className='inline-block mr-2' />
          <span className='mr-2'>Reset</span>
        </Button>
      </div>
    </StickyAside>
  );
}

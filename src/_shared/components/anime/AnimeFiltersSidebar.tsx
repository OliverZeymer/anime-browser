'use client';
import SelectFilter from '@/components/SelectFilter';
import { AnimeGenreSelect } from './AnimeGenreSelect';
import { Button } from '../ui/button';
import { RotateCcw } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { FilterFieldSkeleton } from './AnimeFiltersSidebarSkeleton';
import StickyAside from '../StickyAside';
import AnimeScoreSlider from './AnimeScoreSlider';

type FilterOption = {
  name: string;
  value: string;
};

type FilterParam = {
  title: string;
  param: { name: string; value: string };
  options: FilterOption[];
};

type Props = {
  filterParams: FilterParam[];
  genres: string;
  minScore: string;
  maxScore: string;
};

export default function AnimeFiltersSidebar({ filterParams, genres, minScore, maxScore }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function resetFilters() {
    router.push('/anime');
  }

  function handleFilterChange(name: string, value: string | number) {
    const params = new URLSearchParams(searchParams.toString());
    const stringValue = String(value);
    const isEmptyValue =
      !stringValue ||
      (name === 'min_score' && Number(value) === 0) ||
      (name === 'max_score' && Number(value) === 10) ||
      (name === 'genres' && !stringValue);

    if (isEmptyValue) {
      params.delete(name);
    } else {
      params.set(name, stringValue);
    }

    params.delete('page');

    const query = params.toString();
    const nextUrl = query ? `/anime?${query}` : '/anime';
    const currentUrl = searchParams.toString() ? `/anime?${searchParams.toString()}` : '/anime';

    if (nextUrl !== currentUrl) {
      router.push(nextUrl);
    }
  }

  return (
    <StickyAside className='hidden md:flex whitespace-nowrap flex-col gap-4 w-fit pr-2 overflow-y-auto h-screen md:top-4'>
      <div className='flex flex-col gap-4 overflow-hidden'>
        <h2 className='text-2xl font-semibold'>Filters</h2>
        {filterParams.map((param) => (
          <Suspense key={param.title} fallback={<FilterFieldSkeleton labelWidth='w-16' />}>
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

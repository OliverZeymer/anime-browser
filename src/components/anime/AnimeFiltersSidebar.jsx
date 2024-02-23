'use client';
import SelectFilter from '@/components/SelectFilter';
import { AnimeGenreSelect } from './AnimeGenreSelect';
import { Button } from '../ui/button';
import { RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import StickyAside from '../StickyAside';
import { Input } from '../ui/input';
import AnimeScoreSlider from './AnimeScoreSlider';

export default function AnimeFiltersSidebar({ filterParams }) {
  const router = useRouter();
  function resetFilters() {
    router.push('/anime');
  }
  return (
    <StickyAside className='hidden md:flex whitespace-nowrap flex-col gap-4 w-fit pr-2 overflow-y-auto h-screen md:top-4'>
      <div className='flex flex-col gap-4 overflow-hidden'>
        <h2 className='text-2xl font-semibold'>Filters</h2>
        <Input type='text' placeholder='Search filters...' />
        {filterParams.map((param) => (
          <Suspense key={param.title} fallback={<div>Loading...</div>}>
            <SelectFilter key={param.title} title={param.title} param={param.param} options={param.options} />
          </Suspense>
        ))}
        <AnimeGenreSelect />
        <AnimeScoreSlider />
        <Button onClick={resetFilters} variant='secondary'>
          <RotateCcw size={14} className='inline-block mr-2' />
          <span className='mr-2'>Reset</span>
        </Button>
      </div>
    </StickyAside>
  );
}

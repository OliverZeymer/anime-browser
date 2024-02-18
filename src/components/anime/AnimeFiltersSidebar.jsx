'use client';
import SelectFilter from '@/components/SelectFilter';
import { AnimeGenreSelect } from './AnimeGenreSelect';
import { Button } from '../ui/button';
import { Expand, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import StickyAside from '../StickyAside';
import { Input } from '../ui/input';
import AnimeScoreSlider from './AnimeScoreSlider';
import MenuExpandIcon from '../icons/MenuExpandIcon';
import CollapseMenuIcon from '../icons/CollapseMenuIcon';
import { AnimatePresence, motion } from 'framer-motion';

export default function AnimeFiltersSidebar({ filterParams }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  function resetFilters() {
    router.push('/anime');
  }

  const sidebarVariants = {
    open: { width: 'auto', opacity: 1 },
    closed: { width: 0, opacity: 0 },
  };

  return (
    <StickyAside className='hidden md:flex whitespace-nowrap flex-col gap-4 w-fit pr-2 overflow-y-auto h-screen md:top-4'>
      <Button
        className='z-10 hover:bg-white/25 h-fit w-fit rounded-full p-2 aspect-square'
        variant='ghost'
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}>
        {isOpen ? <CollapseMenuIcon /> : <MenuExpandIcon />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div variants={sidebarVariants} transition={{ duration: 0.15 }} initial='closed' animate='open' exit='closed' className='flex flex-col gap-4 overflow-hidden'>
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
          </motion.div>
        )}
      </AnimatePresence>
    </StickyAside>
  );
}

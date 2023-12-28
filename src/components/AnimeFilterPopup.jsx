'use client';
import SelectFilter from '@/components/SelectFilter';
import { DialogContent, DialogHeader } from '@/components/ui/dialog';
import { AnimeGenreSelect } from './AnimeGenreSelect';
import { Button } from './ui/button';
import { Check, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
export default function AnimeFilterPopup({ order, status, type, genres, open, setOpen }) {
  const router = useRouter();
  const params = [
    {
      title: 'Sort by',
      param: {
        name: 'order',
        value: order,
      },
      options: [
        { name: 'Popularity', value: 'members' },
        { name: 'Score', value: 'score' },
        { name: 'Episodes', value: 'episodes' },
      ],
    },
    {
      title: 'Status',
      param: {
        name: 'status',
        value: status,
      },
      options: [
        { name: 'All', value: 'all' },
        { name: 'Airing', value: 'airing' },
        { name: 'Upcoming', value: 'upcoming' },
        { name: 'Complete', value: 'complete' },
      ],
    },
    {
      title: 'Type',
      param: {
        name: 'type',
        value: type,
      },
      options: [
        { name: 'All', value: 'all' },
        { name: 'TV', value: 'tv' },
        { name: 'Movie', value: 'movie' },
        { name: 'OVA', value: 'ova' },
        { name: 'Special', value: 'special' },
        { name: 'ONA', value: 'ona' },
        { name: 'Music', value: 'music' },
      ],
    },
  ];
  return (
    <DialogContent className='w-fit'>
      <DialogHeader>
        <h2 className='text-lg font-semibold leading-none tracking-tight'>Filters</h2>
      </DialogHeader>
      <div className='flex flex-col items-center lg:items-start lg:grid lg:grid-cols-2 gap-4'>
        {params.map((param) => (
          <SelectFilter key={param.title} title={param.title} param={param.param} options={param.options} />
        ))}
        <AnimeGenreSelect genresParam={genres} />
        <Button
          onClick={() => {
            setOpen(false);
          }}
          type='button'
          className='w-full lg:w-fit'>
          <Check className='mr-1' size={14} />
          Apply
        </Button>
        <Button
          onClick={() => {
            router.push('/anime');
            setOpen(false);
          }}
          type='button'
          className='w-full lg:w-fit lg:ml-auto'>
          <RotateCcw className='mr-1' size={14} />
          Reset
        </Button>
      </div>
    </DialogContent>
  );
}

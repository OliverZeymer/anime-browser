'use client';
import SelectFilter from '@/components/SelectFilter';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Sliders } from 'lucide-react';
import { AnimeGenreSelect } from './AnimeGenreSelect';

export default function AnimeFilterButton({ order, status, type, genres }) {
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
        { name: 'All', value: 'all'},
        { name: 'TV', value: 'tv' },
        { name: 'Movie', value: 'movie' },
        { name: 'OVA', value: 'ova' },
        { name: 'Special', value: 'special' },
        { name: 'ONA', value: 'ona' },
        { name: 'Music', value: 'music' },
      ],
    }
  ];
  return (
    <Dialog>
      <Button asChild variant='ghost' type='button' className='pl-3 pr-4 py-2 h-auto border-l border-neutral-700 rounded-r-full'>
        <DialogTrigger>
          <Sliders size={24} />
        </DialogTrigger>
      </Button>
      <DialogContent className="w-fit">
        <DialogHeader>
          <h2 className='text-lg font-semibold leading-none tracking-tight'>Filters</h2>
        </DialogHeader>
        <div className='grid grid-cols-2 gap-4'>
          {params.map((param) => (
            <SelectFilter key={param.title} title={param.title} param={param.param} options={param.options} />
          ))}
        <AnimeGenreSelect genresParam={genres} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

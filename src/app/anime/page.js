'use client';
import AnimeCardList from '@/components/AnimeCardList';
import PaginationControls from '@/components/PaginationControls';
import SelectFilter from '@/components/SelectFilter';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { BASE_API } from '@/utils/constants';

import { Sliders } from 'lucide-react';
import { useQuery } from 'react-query';

export default function AnimePage({ searchParams }) {
  let page = searchParams['page'] ?? '1';
  let order = searchParams['order'] ?? 'members';
  let status = searchParams['status'] ?? 'all';
  let search = searchParams['search'] ?? '';
  let limit = 10;
  if (window.innerWidth >= 3248 && window.innerWidth > 2923) {
    limit = 20;
  } else if (window.innerWidth <= 2923 && window.innerWidth > 2599) {
    limit = 24;
  } else if (window.innerWidth <= 2599 && window.innerWidth > 2275) {
    limit = 21;
  } else if (window.innerWidth <= 2275 && window.innerWidth > 1951) {
    limit = 24;
  } else if (window.innerWidth <= 1951 && window.innerWidth > 1627) {
    limit = 25;
  } else if (window.innerWidth <= 1627 && window.innerWidth > 1303) {
    limit = 24;
  } else {
    limit = 10;
  }

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
  ];
  let API_URL = `${BASE_API}/anime?order_by=${order}&sort=desc&limit=${limit}${status && status !== null && status !== 'all' ? `&status=${status}` : ''}&page=${page}&sfw${
    search && search !== null ? `&q=${search}` : ''
  }`;

  const { data, isLoading, error, refetch } = useQuery(['anime', page, order, status, search], async () => {
    const data = await fetch(API_URL, { next: { revalidate: 3600 } }).then((res) => res.json());
    return data;
  });

  if (!isLoading) {
    console.log(data);
  }
  return (
    <div className='px-4 pt-32'>
      <Dialog>
        <DialogTrigger>
          <Button variant='ghost' className='px-2 h-12 w-12'>
            <Sliders size={32} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className='flex flex-col space-y-2'>
            {params.map((param) => (
              <SelectFilter key={param.title} title={param.title} param={param.param} options={param.options} />
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <AnimeCardList data={data?.data} isLoading={isLoading} error={error} refetch={refetch} limit={limit} />
      <PaginationControls pagination={data?.pagination} />
    </div>
  );
}

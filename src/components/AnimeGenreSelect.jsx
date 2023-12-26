'use client';

import { Label } from '@/components/ui/label';
import { animeGenres } from '@/utils/constants';
import { MultiSelect } from './ui/multi-select';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function AnimeGenreSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
    const genresParam = currentSearchParams.get('genres');
    const genresArray = genresParam ? genresParam.split(',') : [];

    const foundGenres = animeGenres.filter((genre) => genresArray.includes(String(genre.value)));

    setGenres(foundGenres);
  }, [searchParams]);

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
    const genresValues = genres.map((genre) => genre?.value);

    if (genres.length === 0) {
      currentSearchParams.delete('genres');
    } else {
      currentSearchParams.set('genres', genresValues);
    }

    const query = currentSearchParams.toString();
    const newURL = `${pathname}${query ? `?${query}` : ''}`;
    router.push(newURL);
  }, [genres, pathname, router, searchParams]);

  return (
    <div className='flex flex-col space-y-2'>
      <Label>Genres</Label>
      <MultiSelect options={animeGenres} selected={genres} onChange={setGenres} />
    </div>
  );
}

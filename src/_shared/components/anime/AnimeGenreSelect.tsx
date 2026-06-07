'use client';

import { Label } from '@/components/ui/label';
import { animeGenres } from '@/utils/constants';
import { MultiSelect } from '../ui/multi-select';

type GenreOption = {
  value: number;
  label: string;
  count: number;
};

type Props = {
  genresParam?: string;
  onChange?: (value: string) => void;
  selectedGenres?: string;
};

const getGenresFromParam = (genresParam: string | null | undefined): GenreOption[] => {
  const genresArray = genresParam ? genresParam.split(',') : [];
  return animeGenres.filter((genre) => genresArray.includes(String(genre.value)));
};

export const AnimeGenreSelect = ({ genresParam, onChange, selectedGenres }: Props) => {
  const paramValue = selectedGenres ?? genresParam ?? '';
  const selected = getGenresFromParam(paramValue || null);

  return (
    <div className='flex flex-col w-full space-y-2'>
      <Label>Genres</Label>
      <MultiSelect
        options={animeGenres.map((genre) => ({ label: genre.label, value: String(genre.value) }))}
        selected={selected.map((genre) => ({ label: genre.label, value: String(genre.value) }))}
        onChange={(items) => {
          const value = items.map((item) => item.value).join(',');
          onChange?.(value);
        }}
      />
    </div>
  );
};

'use client';
import { useMemo } from 'react';
import { animeGenres } from '@/utils/constants';
import type { Anime, JikanResponse } from '@/types/jikan';

type Props = {
  data: JikanResponse<Anime[]>;
  order: string;
  status: string;
  search: string;
  type: string;
  genres: string;
};

export default function AnimeDynamicHeading({ data, order, status, search, type, genres }: Props) {
  const heading = useMemo(() => {
    function getGenreLabel(genre: string) {
      const genreLabel = animeGenres.find((animeGenre) => animeGenre.value == Number(genre));
      return genreLabel?.label ?? '';
    }

    const amountOfResults = data?.pagination?.items?.total || 0;
    const searchString = search ? `matching "${search}"` : '';

    function roundNumber(number: number) {
      const roundedNumber = number > 999 ? Math.round(number / 1000) * 1000 : number > 99 ? Math.round(number / 100) * 100 : number;
      const shouldHavePlus = roundedNumber > 99;
      return roundedNumber.toLocaleString('en-US').replace(/,/g, '.') + (shouldHavePlus ? '+' : '');
    }

    let genresString = genres.length > 0 ? `${genres.split(',').map(getGenreLabel).join(', ')}` : '';
    let statusString = '';
    let typeString = '';

    if (status) {
      switch (status) {
        case 'airing':
          statusString = 'ongoing';
          break;
        case 'upcoming':
          statusString = 'upcoming';
          break;
        case 'complete':
          statusString = 'finished';
          break;
        default:
          statusString = '';
      }
    }

    if (type) {
      switch (type) {
        case 'tv':
        case 'all':
        case '':
          typeString = 'anime';
          break;
        case 'ova':
          typeString = 'OVAs';
          break;
        case 'ona':
          typeString = 'ONAs';
          break;
        case 'movie':
          typeString = 'movies';
          break;
        default:
          typeString = type.charAt(0).toUpperCase() + type.slice(1) + 's';
      }
    }

    return `Browsing ${roundNumber(amountOfResults)} ${statusString}  ${genresString} ${typeString} ${searchString}`;
  }, [status, search, type, genres, data]);
  return <h1 className='text-2xl sm:text-3xl font-semibold max-w-xl'>{heading}</h1>;
}

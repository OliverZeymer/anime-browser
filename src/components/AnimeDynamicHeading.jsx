'use client';
import { useEffect, useState } from 'react';
import { animeGenres } from '@/utils/constants';
export default function AnimeDynamicHeading({ data, order, status, search, type, genres }) {
  const [heading, setHeading] = useState('Browse Anime');
  useEffect(() => {
    function getGenreLabel(genre) {
      const genreLabel = animeGenres.find((animeGenre) => animeGenre.value == genre);
      return genreLabel.label;
    }
    function getHeading() {
      const amountOfResults = data?.pagination?.items?.total || 0;
      const searchString = search ? `matching "${search}"` : '';

      function roundNumber(number) {
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
            //make the first letter uppercase
            typeString = type.charAt(0).toUpperCase() + type.slice(1) + 's';
        }
      }

      return `Browsing ${roundNumber(amountOfResults)} ${statusString}  ${genresString} ${typeString} ${searchString}`;
    }

    setHeading(getHeading());
  }, [order, status, search, type, genres, data]);
  return <h1 className='text-2xl sm:text-3xl font-semibold max-w-xl'>{heading}</h1>;
}

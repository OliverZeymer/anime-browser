'use client';
import { useEffect, useState } from 'react';
import { animeGenres } from '@/utils/constants';
export default function AnimeDynamicHeading({data, order, status, search, type, genres }) {
  const [heading, setHeading] = useState('Browse Anime');
  useEffect(() => {
    function getGenreLabel(genre) {
      const genreLabel = animeGenres.find((animeGenre) => animeGenre.value == genre);
      return genreLabel.label;
    }
    function getHeading() {
      const amountOfResults = data?.pagination?.items?.total?.toLocaleString('en-us') || '';
      const searchString = search ? `matching "${search}"` : '';
      console.log(type);

      let genresString = genres.length > 0 ? `${genres.split(',').map(getGenreLabel).join(', ')}` : '';
      let statusString =  '';
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
            typeString = 'Anime';
            break;
          case 'ova':
            typeString = 'OVAs';
            break;
          case 'ona':
            typeString = 'ONAs';
            break;
          case 'movie':
            typeString = 'Movies';
            break;
          default:
            //make the first letter uppercase
            typeString = type.charAt(0).toUpperCase() + type.slice(1) + 's';
        }
      }

      return `Browsing ${amountOfResults} ${statusString}  ${genresString} ${typeString} ${searchString}`;
    }

    setHeading(getHeading());
  }, [order, status, search, type, genres, data]);
  return <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] mb-6 text-center'>{heading}</h1>;
}

'use client';
// Importing necessary dependencies and components
import { useQuery } from 'react-query';
import AnimeCardList from '@/components/AnimeCardList';
import PaginationControls from '@/components/PaginationControls';
import AnimeSearchBar from '@/components/AnimeSearchBar';
import { BASE_API } from '@/utils/constants';
import { animeGenres } from '@/utils/constants';
import { getGenre } from '@/utils/api';
import { useEffect, useState } from 'react';

export default function AnimePage({ searchParams }) {
  const [heading, setHeading] = useState('Browing all Anime');
  const defaultLimit = 10;

  // const calculateLimit = () => {
  //   if (typeof window !== 'undefined') {
  //     const windowWidth = window.innerWidth;

  //     if (windowWidth >= 3248) return 20;
  //     if (windowWidth > 2923) return 20;
  //     if (windowWidth <= 2923 && windowWidth > 2599) return 24;
  //     if (windowWidth <= 2599 && windowWidth > 2275) return 21;
  //     if (windowWidth <= 2275 && windowWidth > 1951) return 24;
  //     if (windowWidth <= 1951 && windowWidth > 1627) return 25;
  //     if (windowWidth <= 1627 && windowWidth > 1303) return 24;
  //   }

  //   return defaultLimit;
  // };
  const limit = 24;

  const { page = '1', order = 'members', status = 'all', search = '', type = 'all', genres = [] } = searchParams;

  const orderParam = `order_by=${order}`;
  const sortParam = '&sort=desc';
  const limitParam = `&limit=${limit}`;
  const statusParam = status && status !== 'all' ? `&status=${status}` : '';
  const pageParam = `&page=${page}`;
  const searchParam = search ? `&q=${search}` : '';
  const typeParam = type !== 'all' ? `&type=${type}` : '';
  const genreParam = genres ? `&genres=${genres}` : '';
  const API_URL = `${BASE_API}/anime?${orderParam}${sortParam}${limitParam}${statusParam}${pageParam}${searchParam}${typeParam}${genreParam}&sfw`;

  const { data, isLoading, error, refetch } = useQuery(['anime', API_URL], async () => {
    const response = await fetch(API_URL, { next: { revalidate: 3600 } });
    const data = await response.json();
    return data;
  });

  function getGenreLabel(genre) {
    //find the genre with the same value as the genre param from animegenres array
    const genreLabel = animeGenres.find((animeGenre) => animeGenre.value == genre);
    return genreLabel.label;
  }
  function getHeading() {
    const amountOfResults = data?.pagination?.items?.total?.toLocaleString('en-us') || '';
    const searchString = search ? `matching "${search}"` : '';
    console.log(type);

    // add the word and if there are more than one genre 
    let genresString = genres.length > 0 ? `${genres.split(',').map(getGenreLabel).join(', ')}` : '';
    let statusString = status && status !== 'all' ? `${status}` : '';
    let typeString = '';

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

  useEffect(() => {
    setHeading(getHeading());
  }, [searchParams, data]);

  return (
    <div className='px-4 pt-32'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] mb-6 text-center'>{heading}</h1>
      <AnimeSearchBar order={order} status={status} search={search} type={type} genres={genres} />
      <AnimeCardList data={data?.data} isLoading={isLoading} error={error} refetch={refetch} limit={limit} />
      <PaginationControls pagination={data?.pagination} />
    </div>
  );
}

'use server';

import { fetchAnimeBySearch } from '@/libs/jikan/fetch-anime';

export const searchAnime = async (query: string, limit: number) => {
  return fetchAnimeBySearch(query, limit);
};

import { BASE_API } from './constants';

export const getAnime = async () => await fetch(`${BASE_API}/anime`, { next: { revalidate: 3600 } });

export const getAnimeById = async (id) => await fetch(`${BASE_API}/anime${id && '/' + id}/full`, { next: { revalidate: 3600 } });

export const getGenre = async (id, pageId) => await fetch(`${BASE_API}/anime?genres=${id}&page=${pageId}`, { next: { revalidate: 3600 } });

export const getGenres = async () => await fetch(`${BASE_API}/genres/anime`, { next: { revalidate: 3600 } });

export const getSeason = async (id) => await fetch(`${BASE_API}/seasons/now${id && '?&page=' + id}`, { next: { revalidate: 3600 } });

export const getTopRated = async (id) => await fetch(`${BASE_API}/top/anime${id && '?&page=' + id}`, { next: { revalidate: 3600 } });

export const getUpcoming = async (id) => await fetch(`${BASE_API}/seasons/upcoming${id && '?&page=' + id}`, { next: { revalidate: 3600 } });

export const getAnimeByLimit = async (segment, limit) => await fetch(`${BASE_API}/${segment}?limit=${limit}`, { next: { revalidate: 3600 } });

export const search = async (query, pageId) => await fetch(`${BASE_API}/anime?q=${query}&page=${pageId}`, { next: { revalidate: 3600 } });

import { BASE_API } from './constants';

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(response.status);
  }

  return response.json();
};

export const getAnime = async () => {
  const response = await fetch(`${BASE_API}/anime`, { next: { revalidate: 3600 } });
  return handleResponse(response);
};

export const getFileterdAnime = async (params) => {
  const response = await fetch(`${BASE_API}/anime?${params}`, { next: { revalidate: 3600 } });
  return handleResponse(response);
};

export const getAnimeById = async (id) => {
  const response = await fetch(`${BASE_API}/anime${id && '/' + id}/full`, { next: { revalidate: 3600 } });
  return handleResponse(response);
};

export const getAnimeReviews = async (id) => {
  const response = await fetch(`${BASE_API}/anime/${id}/reviews`, { next: { revalidate: 3600 } });
  return handleResponse(response);
};

export const getThisSeason = async (page) => {
  const response = await fetch(`${BASE_API}/seasons/now${page ? `?page=${page}` : ''}`, { next: { revalidate: 3600 } });
  return handleResponse(response);
};

export const getAnimeRecommendations = async (id) => {
  const response = await fetch(`${BASE_API}/anime/${id}/recommendations`, { next: { revalidate: 3600 } });
  return handleResponse(response);
};

export const getAnimeCharacters = async (id) => {
  const response = await fetch(`${BASE_API}/anime/${id}/characters`, { next: { revalidate: 3600 } });
  return handleResponse(response);
};

export const getAnimeCharacterById = async (id) => {
  const response = await fetch(`${BASE_API}/characters/${id}/full`, { next: { revalidate: 3600 } });
  return handleResponse(response);
};

export const getGenre = async (id, pageId) => {
  const response = await fetch(`${BASE_API}/anime?genres=${id}&page=${pageId}`, { next: { revalidate: 3600 } });
  return handleResponse(response);
};

export const getGenres = async () => {
  const response = await fetch(`${BASE_API}/genres/anime`, { next: { revalidate: 3600 } });
  return handleResponse(response);
};

export const getSeason = async (id) => {
  const response = await fetch(`${BASE_API}/seasons/now${id ? '?&page=' + id : ''}`, { next: { revalidate: 3600 } });
  return handleResponse(response);
};

export const getTopRated = async (id) => {
  const response = await fetch(`${BASE_API}/top/anime${id ? '?&page=' + id : ''}`, { next: { revalidate: 3600 } });
  return handleResponse(response);
};

export const getUpcoming = async (id) => {
  const response = await fetch(`${BASE_API}/seasons/upcoming${id ? '?&page=' + id : ''}`, { next: { revalidate: 3600 } });
  return handleResponse(response);
};

export const getAnimeByLimit = async (segment, limit) => {
  const response = await fetch(`${BASE_API}${segment !== '' ? `/${segment}` : '/anime'}?limit=${limit}`, { next: { revalidate: 3600 } });
  return handleResponse(response);
};

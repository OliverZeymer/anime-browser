import { jikanClient } from '@/libs/jikan';
import { createJikanCachedFetch } from '@/libs/jikan/create-cached-jikan-fetch';
import { dedupeInFlightRequest } from '@/libs/jikan/in-flight-dedupe';
import { withJikanFallback } from '@/libs/jikan/with-jikan-fallback';
import { parseMalId } from '@/utils/parseMalId';
import type { Recommendation } from '@tutkli/jikan-ts/types';
import type { AnimeCharacter, AnimeReview, AnimeStatistics, JikanResponse } from '@/types/jikan';

const emptyListResponse = <T>(): JikanResponse<T[]> => ({
  data: [],
  pagination: {
    last_visible_page: 1,
    has_next_page: false,
    current_page: 1,
    items: {
      count: 0,
      total: 0,
      per_page: 0,
    },
  },
});

const emptyStatisticsResponse = (): JikanResponse<AnimeStatistics> => ({
  data: {
    completed: 0,
    watching: 0,
    plan_to_watch: 0,
    dropped: 0,
    on_hold: 0,
    total: 0,
    scores: [],
  },
});

const fetchAnimeById = createJikanCachedFetch(async (id: string | number) => {
  const malId = parseMalId(id);

  return dedupeInFlightRequest(`anime-full:${malId}`, () => {
    return jikanClient.anime.getAnimeFullById(malId);
  });
}, 'jikan-anime-full');

export const fetchAnimeBySearch = createJikanCachedFetch(async (query: string, limit: number) => {
  return dedupeInFlightRequest(`anime-search:${query}:${limit}`, () => {
    return jikanClient.anime.getAnimeSearch({ q: query, limit });
  });
}, 'jikan-anime-search');

const fetchAnimeStatistics = createJikanCachedFetch(async (id: string | number) => {
  const malId = parseMalId(id);

  return dedupeInFlightRequest(`anime-stats:${malId}`, () => {
    return withJikanFallback(
      () => jikanClient.anime.getAnimeStatistics(malId),
      emptyStatisticsResponse()
    );
  });
}, 'jikan-anime-stats');

const fetchAnimeReviews = createJikanCachedFetch(async (id: string | number) => {
  const malId = parseMalId(id);

  return dedupeInFlightRequest(`anime-reviews:${malId}`, () => {
    return withJikanFallback(
      () => jikanClient.anime.getAnimeReviews(malId),
      emptyListResponse<AnimeReview>()
    );
  });
}, 'jikan-anime-reviews');

const fetchAnimeRecommendations = createJikanCachedFetch(async (id: string | number) => {
  const malId = parseMalId(id);

  return dedupeInFlightRequest(`anime-recommendations:${malId}`, () => {
    return withJikanFallback(
      () => jikanClient.anime.getAnimeRecommendations(malId),
      emptyListResponse<Recommendation>()
    );
  });
}, 'jikan-anime-recommendations');

const fetchAnimeCharacters = createJikanCachedFetch(async (id: string | number) => {
  const malId = parseMalId(id);

  return dedupeInFlightRequest(`anime-characters:${malId}`, () => {
    return withJikanFallback(
      () => jikanClient.anime.getAnimeCharacters(malId),
      emptyListResponse<AnimeCharacter>()
    );
  });
}, 'jikan-anime-characters');

const fetchCharacterById = createJikanCachedFetch(async (id: string | number) => {
  const malId = parseMalId(id);

  return dedupeInFlightRequest(`character-full:${malId}`, () => {
    return jikanClient.characters.getCharacterFullById(malId);
  });
}, 'jikan-character-full');

const fetchSeasonNow = createJikanCachedFetch(async (page?: number) => {
  const pageKey = page ?? 'default';

  return dedupeInFlightRequest(`season-now:${pageKey}`, () => {
    return jikanClient.seasons.getSeasonNow(page !== undefined ? { page } : undefined);
  });
}, 'jikan-season-now');

const fetchTopAnime = createJikanCachedFetch(async (limit: number) => {
  return dedupeInFlightRequest(`top-anime:${limit}`, () => {
    return jikanClient.top.getTopAnime({ limit });
  });
}, 'jikan-top-anime');

const fetchSeasonNowLimited = createJikanCachedFetch(async (limit: number) => {
  return dedupeInFlightRequest(`season-now-limited:${limit}`, () => {
    return jikanClient.seasons.getSeasonNow({ limit });
  });
}, 'jikan-season-now-limited');

const fetchSeasonUpcoming = createJikanCachedFetch(async (limit: number) => {
  return dedupeInFlightRequest(`season-upcoming:${limit}`, () => {
    return jikanClient.seasons.getSeasonUpcoming({ limit });
  });
}, 'jikan-season-upcoming');

export const getAnimeById = fetchAnimeById;
export const getAnimeStatsById = fetchAnimeStatistics;
export const getAnimeReviews = fetchAnimeReviews;
export const getAnimeRecommendations = fetchAnimeRecommendations;
export const getAnimeCharacters = fetchAnimeCharacters;
export const getAnimeCharacterById = fetchCharacterById;
export const getThisSeason = fetchSeasonNow;

export const getAnimeByLimit = createJikanCachedFetch(async (segment: string, limit: number) => {
  if (segment === 'top/anime') {
    return fetchTopAnime(limit);
  }

  if (segment === 'seasons/now') {
    return fetchSeasonNowLimited(limit);
  }

  if (segment === 'seasons/upcoming') {
    return fetchSeasonUpcoming(limit);
  }

  throw new Error(`Unsupported segment: ${segment}`);
}, 'jikan-anime-by-limit');

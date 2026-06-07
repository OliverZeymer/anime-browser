import { BASE_URL } from '@tutkli/jikan-ts/types';

export type AnimeBrowseSearchParams = {
  get: (key: string) => string | null;
};

const buildAnimeBrowseQueryString = (
  sp: AnimeBrowseSearchParams,
  defaultLimit = 20,
): string => {
  const page = sp.get('page') || '1';
  const order = sp.get('order') || 'members';
  const status = sp.get('status') || 'all';
  const search = sp.get('search') || '';
  const type = sp.get('type') || 'all';
  const genres = sp.get('genres') || '';
  const min_score = sp.get('min_score') || '';
  const max_score = sp.get('max_score') || '';

  const orderParam = `order_by=${order}`;
  const sortParam = '&sort=desc';
  const limitParam = `&limit=${defaultLimit}`;
  const statusParam = status && status !== 'all' ? `&status=${status}` : '';
  const pageParam = `&page=${page}`;
  const searchParam = search ? `&q=${encodeURIComponent(search)}` : '';
  const typeParam = type !== 'all' ? `&type=${type}` : '';
  const genreParam = genres ? `&genres=${genres}` : '';
  const minScoreParam = min_score ? `&min_score=${min_score}` : '';
  const maxScoreParam = max_score ? `&max_score=${max_score}` : '';

  return `${orderParam}${sortParam}${limitParam}${statusParam}${pageParam}${searchParam}${typeParam}${genreParam}${minScoreParam}${maxScoreParam}&sfw`;
};

export const buildAnimeBrowseUrl = (
  sp: AnimeBrowseSearchParams,
  defaultLimit = 20,
): string => {
  const qs = buildAnimeBrowseQueryString(sp, defaultLimit);
  return `${BASE_URL}/anime?${qs}`;
};

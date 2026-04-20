/**
 * Builds the Jikan v4 query string for the browse page — mirrors the former server page logic
 * (`src/app/anime/page.js` before client-side fetch).
 * @param {URLSearchParams | { get: (key: string) => string | null }} sp
 */
export function buildAnimeBrowseQueryString(sp, defaultLimit = 20) {
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
  // Same as former server (`&q=${search}`); encodeURIComponent so browser fetch() matches Node fetch for spaces/symbols.
  const searchParam = search ? `&q=${encodeURIComponent(search)}` : '';
  const typeParam = type !== 'all' ? `&type=${type}` : '';
  const genreParam = genres ? `&genres=${genres}` : '';
  const minScoreParam = min_score ? `&min_score=${min_score}` : '';
  const maxScoreParam = max_score ? `&max_score=${max_score}` : '';
  return `${orderParam}${sortParam}${limitParam}${statusParam}${pageParam}${searchParam}${typeParam}${genreParam}${minScoreParam}${maxScoreParam}&sfw`;
}

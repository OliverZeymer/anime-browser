import { cn } from '@/libs/cn';

export const ANIME_BROWSE_LIMIT = 20;
export const ANIME_TAB_RECOMMENDATIONS_LIMIT = 10;
export const ANIME_SEARCH_RESULTS_LIMIT = 5;
export const ANIME_SEASON_LIMIT = 24;

export const ANIME_CARD_GRID_CLASS =
  'grid grid-cols-auto-fill-sm md:grid-cols-auto-fill-md lg:grid-cols-auto-fill-lg 3xl:grid-cols-auto-fill-2xl place-items-center gap-3 lg:gap-6 h-fit';

export const getAnimeCardClassName = (small?: boolean) => {
  return cn(
    'min-w-[150px] min-h-[225px] aspect-[1/1.5] h-full w-full md:min-w-[175px] md:min-h-[262.5px] lg:min-w-[225px] lg:min-h-[337.5px] 3xl:min-w-[300px] 3xl:min-h-[450px] rounded-2xl relative px-2 lg:px-5 py-2 max-w-[400px] no-drag',
    small && 'max-w-[300px]'
  );
};

export const getAnimeCarouselCardClassName = () => {
  return 'aspect-[2/3] h-auto w-full min-w-0 rounded-2xl relative px-2 py-2 no-drag lg:px-5';
};

export const dedupeAnimeByMalId = <T extends { mal_id: number }>(items: T[]) => {
  const seen = new Set<number>();

  return items.filter((item) => {
    if (seen.has(item.mal_id)) {
      return false;
    }

    seen.add(item.mal_id);
    return true;
  });
};

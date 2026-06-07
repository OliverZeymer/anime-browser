import { unstable_cache } from 'next/cache';
import { cache } from 'react';

export const createJikanCachedFetch = <TArgs extends unknown[], TResult>(
  fetcher: (...args: TArgs) => Promise<TResult>,
  keyPrefix: string,
  revalidate = 3600
) => {
  return cache(async (...args: TArgs) => {
    const cacheKey = args.map((arg) => String(arg));

    return unstable_cache(() => fetcher(...args), [keyPrefix, ...cacheKey], { revalidate })();
  });
};

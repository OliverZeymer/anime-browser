import ky from 'ky';
import { JikanClient } from '@tutkli/jikan-ts';
import { JIKAN_CONFIG } from '@/config/jikan';
import { scheduleJikanRequest } from '@/libs/jikan/request-queue';

const kyInstance = ky.create({
  prefixUrl: JIKAN_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: JIKAN_CONFIG.REQUEST_TIMEOUT_MS,
  retry: {
    limit: JIKAN_CONFIG.MAX_RETRIES,
    methods: ['get'],
    statusCodes: [408, 500, 502, 503, 504],
    backoffLimit: 10_000,
  },
  fetch: (input, init) => {
    return scheduleJikanRequest(() => globalThis.fetch(input, init));
  },
});

export const jikanClient = new JikanClient({
  cacheOptions: { ttl: JIKAN_CONFIG.CACHE_TTL_MS },
  kyInstance,
});

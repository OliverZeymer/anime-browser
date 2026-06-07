import { HTTPError } from 'ky';
import { JIKAN_CONFIG } from '@/config/jikan';

let lastRequestAt = 0;
let requestChain: Promise<unknown> = Promise.resolve();

const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const getRateLimitWaitMs = (error: HTTPError) => {
  const retryAfter = error.response.headers.get('Retry-After');

  if (retryAfter) {
    const retryAfterSeconds = Number(retryAfter);

    if (!Number.isNaN(retryAfterSeconds)) {
      return retryAfterSeconds * 1000;
    }
  }

  return JIKAN_CONFIG.RATE_LIMIT_RETRY_MS;
};

const runWithRateLimitRetry = async <T>(run: () => Promise<T>): Promise<T> => {
  try {
    return await run();
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 429) {
      await wait(getRateLimitWaitMs(error));
      return run();
    }

    throw error;
  }
};

export const scheduleJikanRequest = <T>(run: () => Promise<T>): Promise<T> => {
  const runScheduled = async () => {
    const now = Date.now();
    const waitMs = Math.max(0, JIKAN_CONFIG.MIN_REQUEST_INTERVAL_MS - (now - lastRequestAt));

    if (waitMs > 0) {
      await wait(waitMs);
    }

    lastRequestAt = Date.now();
    return runWithRateLimitRetry(run);
  };

  const promise = requestChain.then(runScheduled);
  requestChain = promise.then(
    () => undefined,
    () => undefined
  );

  return promise;
};

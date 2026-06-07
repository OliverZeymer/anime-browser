import { HTTPError } from 'ky';

export const withJikanFallback = async <T>(request: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await request();
  } catch (error) {
    if (error instanceof HTTPError && (error.response.status === 429 || error.response.status >= 500)) {
      return fallback;
    }

    throw error;
  }
};

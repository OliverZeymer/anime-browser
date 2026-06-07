const inFlightRequests = new Map<string, Promise<unknown>>();

export const dedupeInFlightRequest = <T>(key: string, run: () => Promise<T>): Promise<T> => {
  const existing = inFlightRequests.get(key);

  if (existing) {
    return existing as Promise<T>;
  }

  const promise = run().finally(() => {
    inFlightRequests.delete(key);
  });

  inFlightRequests.set(key, promise);
  return promise;
};

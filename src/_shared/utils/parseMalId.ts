import { notFound } from 'next/navigation';

export const parseMalId = (id: string | number): number => {
  const malId = typeof id === 'number' ? id : Number(id);

  if (!Number.isInteger(malId) || malId <= 0) {
    notFound();
  }

  return malId;
};

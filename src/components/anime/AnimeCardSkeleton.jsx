import { Skeleton } from '../ui/skeleton';

export default function AnimeCardSkeleton() {
  return (
    <li>
      <Skeleton className='w-[300px] h-[450px] rounded-2xl px-5 py-2' />
    </li>
  );
}

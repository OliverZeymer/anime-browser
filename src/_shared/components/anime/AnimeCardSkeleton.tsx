import { Skeleton } from '@/components/ui/skeleton';
import { getAnimeCardClassName } from '@/utils/animeCardLayout';
import { cn } from '@/libs/cn';

type Props = {
  small?: boolean;
  className?: string;
};

export const AnimeCardSkeleton = ({ small, className }: Props) => {
  return (
    <li className={cn(getAnimeCardClassName(small), 'list-none overflow-hidden', className)}>
      <Skeleton className='absolute inset-0 h-full w-full rounded-2xl' />
      <div className='absolute inset-x-0 bottom-0 h-2/5 rounded-b-2xl bg-gradient-to-t from-background/90 via-background/20 to-transparent' />
      <div className='absolute bottom-2 left-2 right-2 z-10 space-y-2 lg:bottom-4 lg:left-5 lg:right-5'>
        <Skeleton className='h-3.5 w-[85%] rounded-sm bg-background/40' />
        <Skeleton className='h-3 w-[55%] rounded-sm bg-background/40' />
      </div>
    </li>
  );
};

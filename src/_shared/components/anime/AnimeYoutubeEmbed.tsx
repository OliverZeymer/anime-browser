import ErrorCard from '../ErrorCard';
import PrimaryCard from '../PrimaryCard';
import { cn } from '@/libs/cn';

type Props = {
  url?: string | null;
  title: string;
};

export default function AnimeYoutubeEmbed({ url, title }: Props) {
  const urlWithoutAutoplay = url?.replace('&autoplay=1', '&autoplay=0');

  return (
    <PrimaryCard className='flex h-full w-full flex-col 2xl:w-full'>
      <h3 className='mb-4 shrink-0 text-xl font-bold lg:mb-6 lg:text-2xl'>{title}</h3>
      <div className='aspect-video w-full shrink-0 overflow-hidden rounded-2xl'>
        {urlWithoutAutoplay ? (
          <iframe
            src={urlWithoutAutoplay}
            title='YouTube video player'
            className='yt-trailer h-full w-full rounded-2xl'
            allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;'
            allowFullScreen
          />
        ) : (
          <ErrorCard
            className={cn('flex h-full w-full flex-col items-center justify-center rounded-2xl border-dashed')}
            message={`No ${title} found.`}
          />
        )}
      </div>
    </PrimaryCard>
  );
}

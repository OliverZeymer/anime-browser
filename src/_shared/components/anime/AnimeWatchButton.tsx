import { Button } from '../ui/button';
import { cn } from '@/libs/cn';
import { platforms } from '@/utils/constants';

type Props = {
  platform: string;
  url: string;
};

export default function AnimeWatchButton({ platform, url }: Props) {
  const selectedPlatform = platforms.find((p) => p.name === platform);

  if (!selectedPlatform) {
    return null;
  }

  const { icon, classes } = selectedPlatform;
  return (
    <Button asChild className={cn('font-semibold text-xl w-full', classes)}>
      <a className='w-full' href={url} target='_blank'>
        {icon}
      </a>
    </Button>
  );
}

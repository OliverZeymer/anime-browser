import CrunchyrollIcon from './icons/CrunchyrollIcon';
import FunimationIcon from './icons/FunimationIcon';
import NetflixIcon from './icons/NetflixIcon';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const platforms = [
  {
    name: 'Crunchyroll',
    icon: <CrunchyrollIcon className='h-6 mr-2' />,
    classes: 'bg-crunchyroll hover:bg-crunchyroll/90 text-white',
  },
  {
    name: 'Funimation',
    icon: <FunimationIcon className='h-6 mr-2' />,
    classes: 'bg-funimation hover:bg-funimation/90 text-white',
  },
  {
    name: 'Netflix',
    icon: <NetflixIcon className='h-6 mr-2' />,
    classes: 'bg-netflixBg hover:bg-netflixBg/90 text-netflixRed',
  },
];

export default function AnimeWatchButton({ platform, url }) {
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

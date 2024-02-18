import Link from 'next/link';
import getScoreColor from '@/utils/getScoreColor';
import { Badge } from '@/components/ui/badge';
import { Play, Star } from 'lucide-react';
import { platforms } from '@/utils/constants';
import AnimeWatchButton from './AnimeWatchButton';
import ShareModalButton from '../buttons/ShareModalButton';
import PrimaryCard from '../PrimaryCard';
export default function AnimeStats({ anime }) {
  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  // Utility function to check if a streaming name exists in the platforms array
  const isStreamingPlatform = (platformName) => {
    return platforms.some((platform) => platform.name === platformName);
  };

  // Check if any streaming link name is present in the platforms
  const hasMatchingPlatform = anime?.streaming?.some((link) => isStreamingPlatform(link.name));

  return (
    <PrimaryCard className='flex flex-col gap-2 w-full mt-2 md:max-w-[300px] items-center md:items-start'>
      <ul className='flex flex-col gap-2 w-full items-center md:items-start'>
        <h3 className='text-xl font-semibold'>{anime?.title_english ? anime?.title_english : anime?.title}</h3>
        {anime?.genres && (
          <li className='flex pb-1'>
            <div className='flex items-center gap-2 justify-center'>
              <div className='font-semibold flex-wrap flex gap-1 items-center'>
                {anime?.genres.map((genre) => (
                  <Link key={genre.mal_id} className='inline-flex items-center mt-2' href={`/anime?genres=${genre.mal_id}`}>
                    <Badge>{genre.name}</Badge>
                  </Link>
                ))}
              </div>
            </div>
          </li>
        )}
        {anime?.score && (
          <li className='flex mt-2 pb-1'>
            <div className='flex items-center gap-2 justify-center'>
              <p>Score:</p>
              <div className={`${getScoreColor(anime?.score)} font-semibold flex gap-1 items-center justify-center`}>
                <span> {anime?.score}</span>
                <Star size={16} className='inline mb-0.5' fill={getScoreColor(anime?.score).split('-')[1].replaceAll('[', '').replaceAll(']', '')} />
              </div>
            </div>
          </li>
        )}
        {anime?.members && (
          <li className='flex pb-1'>
            <div className='flex items-center gap-2 justify-center'>
              <p>Viewers:</p>
              <div className={`font-semibold flex gap-1 items-center justify-center`}>
                <span> {anime?.members.toLocaleString('en-US')}</span>
              </div>
            </div>
          </li>
        )}
        {anime?.episodes && (
          <li className='flex pb-1'>
            <div className='flex items-center gap-2 justify-center'>
              <p>Episodes:</p>
              <div className={`font-semibold flex gap-1 items-center justify-center`}>
                <span> {anime?.episodes}</span>
                <Play size={15} strokeWidth={2.5} className='inline' />
              </div>
            </div>
          </li>
        )}
        {anime?.rank && (
          <li className='flex pb-1'>
            <div className='flex items-center gap-2 justify-center'>
              <p>Rank:</p>
              <div className='font-semibold flex gap-1 items-center justify-center'>
                <div className={`font-semibold flex gap-1 items-center justify-center`}>
                  <span> {anime?.rank}</span>
                </div>
              </div>
            </div>
          </li>
        )}
        {anime?.studios.length > 0 && (
          <li className='flex pb-1'>
            <div className='flex items-center gap-2 justify-center'>
              <p>{anime?.studios.length === 1 ? 'Studio:' : 'Studios:'}</p>
              <div className='font-semibold flex gap-1 items-center justify-center'>
                <div className={`font-semibold flex gap-1 items-center justify-center ${anime?.studios.length > 2 && 'text-xs'}`}>
                  {anime?.studios.map((studio, index) => (
                    <Link key={studio.mal_id} href={`/studio/${studio.mal_id}`}>
                      {studio.name}
                      {anime?.studios.length !== index + 1 && ','}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </li>
        )}
        {(anime?.aired.from || anime?.aired.to) && (
          <li className='flex pb-1'>
            <div className='flex items-center gap-2 justify-center'>
              <p>Aired:</p>
              <div className='font-semibold flex gap-1 items-center justify-center'>
                <div className={`font-semibold flex gap-1 items-center justify-center`}>
                  <span>
                    {anime?.aired.from ? new Date(anime?.aired.from).toLocaleDateString('en-US', dateOptions)?.replaceAll(',', '') : 'Unknown'} -{' '}
                    {anime?.aired.to ? new Date(anime?.aired.to).toLocaleDateString('en-US', dateOptions)?.replaceAll(',', '') : 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          </li>
        )}
        {anime?.source && (
          <li className='flex pb-1'>
            <div className='flex items-center gap-2 justify-center'>
              <p>Source:</p>
              <div className='font-semibold flex gap-1 items-center justify-center'>
                <div className={`font-semibold flex gap-1 items-center justify-center`}>
                  <span>{anime?.source}</span>
                </div>
              </div>
            </div>
          </li>
        )}
        {anime?.rating && (
          <li className='flex pb-1'>
            <div className='flex items-center gap-2 justify-center'>
              <p>Rating:</p>
              <div className='font-semibold flex gap-1 items-center justify-center'>
                <div className={`font-semibold flex gap-1 items-center justify-center`}>
                  <span title={anime?.rating} className='line-clamp-1'>
                    {anime?.rating}
                  </span>
                </div>
              </div>
            </div>
          </li>
        )}
      </ul>
      {hasMatchingPlatform && (
        <>
          <div className='w-full bg-primary h-[1px] rounded-full mt-1 mb-2' />
          <h4 className='text-lg font-semibold mb-2'>Watch on</h4>
          <div className='flex flex-col gap-6 items-center w-full justify-center'>
            {anime?.streaming?.map((platform) => (
              <AnimeWatchButton key={platform?.url} platform={platform?.name} url={platform?.url} />
            ))}
          </div>
        </>
      )}
      <div className='w-full bg-primary h-[1px] rounded-full my-2' />
      <ShareModalButton />
    </PrimaryCard>
  );
}

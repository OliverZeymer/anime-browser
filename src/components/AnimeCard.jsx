'use client';
import { Bookmark, Play, Star } from 'lucide-react';
import Link from 'next/link';
import getScoreColor from '@/utils/getScoreColor';
import { cn } from '@/lib/utils';
export default function AnimeCard({ anime, role, small }) {
  const animeGenres = anime?.genres
    ?.slice(0, 2)
    ?.map((genre) => genre.name)
    ?.join(' & ');
  const animeTitle = anime?.title_english || anime?.title;
  return (
    <li
      style={{
        backgroundImage: `url(${anime?.images.webp.large_image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className={cn(
        'min-w-[150px] min-h-[225px] aspect-[1/1.5] h-full w-full md:min-w-[225px] md:min-h-[337.5px] lg:min-w-[300px] lg:min-h-[450px] rounded-2xl relative px-2 lg:px-5 py-2 max-w-[400px] cursor-pointer',
        small && 'max-w-[300px]'
      )}>
      <Link href={`/anime/${anime?.mal_id}`} className='absolute top-0 left-0 w-full h-full z-20' />
      {/* <Bookmark size={32} className='absolute top-5 right-5 z-20 bg-black/75 p-1 rounded-full' /> */}
      <div className='flex flex-col justify-end h-full relative z-10'>
        <h3 className='text-white font-semibold text-sm line-clamp-3 lg:line-clamp-1 mb-1'>{animeTitle}</h3>
        <div className='flex items-center gap-1'>
          {anime.score && (
            <>
              <Star className='min-w-fit' size={14} color='#ffcd19' fill='#ffcd19' />
              <span className={`font-semibold text-xs tracking-wider ${getScoreColor(anime.score)}`}>{anime?.score}</span>
              <div className='w-[1px] h-1/2 bg-neutral-400 mx-1' />
            </>
          )}
          {anime?.episodes && (
            <div className='flex items-center text-neutral-400'>
              {anime?.type === 'TV' || anime?.type === 'OVA' ? (
                <>
                  {anime?.episodes && (
                    <>
                      <span className='font-medium text-xs'>{anime?.episodes}</span>
                      <Play size={12} className='ml-1' />
                    </>
                  )}
                </>
              ) : (
                <span className='font-medium text-xs'>{anime?.type}</span>
              )}
            </div>
          )}

          {anime?.episodes && <span className='text-neutral-400 font-bold'>&#xB7;</span>}
          {role && <span className='font-medium text-xs text-neutral-400'>{role} Character</span>}
          {anime?.genres?.length >= 1 && (
            <>
              <span className='font-medium text-xs text-neutral-400 break-all truncate hidden lg:block'>{animeGenres}</span>
              <span className='font-medium text-xs text-neutral-400 break-all truncate lg:hidden block'>{anime?.genres[0]?.name}</span>
            </>
          )}
        </div>
      </div>
      <div className='absolute rounded-b-[14px] -bottom-0 left-0 w-full h-full bg-gradient-to-t from-black via-black/20 lg:via-transparent to-transparent' />
    </li>
  );
}

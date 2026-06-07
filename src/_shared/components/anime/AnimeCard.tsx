'use client';
import { Bookmark, Flame, Play, Star } from 'lucide-react';
import Link from 'next/link';
import getScoreColor from '@/utils/getScoreColor';
import { getAnimeCardClassName, getAnimeCarouselCardClassName } from '@/utils/animeCardLayout';
import { cn } from '@/libs/cn';
import type { Anime } from '@/types/jikan';

type Props = {
  anime: Partial<Anime>;
  role?: string;
  small?: boolean;
  carousel?: boolean;
};

export default function AnimeCard({ anime, role, small, carousel }: Props) {
  const animeGenres = anime?.genres
    ?.slice(0, 2)
    ?.map((genre) => genre.name)
    ?.join(' & ');
  const animeTitle = anime?.title_english || anime?.title;
  const Tag = carousel ? 'div' : 'li';

  return (
    <Tag
      draggable={false}
      style={{
        backgroundImage: `url(${anime?.images?.webp?.large_image_url ?? ''})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className={cn(
        carousel ? getAnimeCarouselCardClassName() : getAnimeCardClassName(small),
        'cursor-pointer'
      )}>
      <Link href={`/anime/${anime?.mal_id}`} draggable={false} className='absolute top-0 left-0 w-full h-full z-20' />
      <div className='flex flex-col justify-end h-full relative z-10'>
        <h3 className='text-white font-semibold text-sm line-clamp-3 lg:line-clamp-2 mb-0.5'>{animeTitle}</h3>
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
          {(anime?.genres?.length ?? 0) >= 1 && (
            <>
              <span className='font-medium text-xs text-neutral-400 break-all truncate hidden lg:block'>{animeGenres}</span>
              <span className='font-medium text-xs text-neutral-400 break-all truncate lg:hidden block'>{anime?.genres?.[0]?.name}</span>
            </>
          )}
        </div>
      </div>
      <div className='absolute rounded-b-[14px] -bottom-0 left-0 w-full h-full bg-gradient-to-t from-black via-black/20 lg:via-transparent to-transparent' />
    </Tag>
  );
}

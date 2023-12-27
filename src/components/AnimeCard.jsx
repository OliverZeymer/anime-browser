'use client';
import { Bookmark, Play, Star } from 'lucide-react';
import Link from 'next/link';
import getScoreColor from '@/utils/getScoreColor';
export default function AnimeCard({ anime }) {
  const animeGenres = anime?.genres
    .slice(0, 2)
    .map((genre) => genre.name)
    .join(' & ');
  const animeTitle = anime?.title_english || anime?.title;
  return (
    <li
      style={{
        backgroundImage: `url(${anime?.images.webp.large_image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className='w-[300px] h-[450px] rounded-2xl relative px-5 py-2 cursor-pointer transition-transform hover:scale-105'>
      <Link href={`/anime/${anime?.mal_id}`} className='absolute top-0 left-0 w-full h-full z-20' />
      {/* <Bookmark size={32} className='absolute top-5 right-5 z-20 bg-black/75 p-1 rounded-full' /> */}
      <div className='flex flex-col justify-end h-full relative z-10'>
        <h3 className='text-white font-semibold line-clamp-1 mb-1'>{animeTitle}</h3>
        <div className='flex items-center gap-1'>
          {anime.score && (
            <>
              <Star size={15} color='#ffcd19' fill='#ffcd19' />
              <span className={`font-semibold text-xs tracking-wider ${getScoreColor(anime.score)}`}>{anime?.score}</span>
              <div className='w-[1px] h-full bg-neutral-400 mx-1' />
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
          <span className='font-medium text-xs text-neutral-400'>{animeGenres}</span>
        </div>
      </div>
      <div className='absolute rounded-b-[14px] -bottom-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent' />
    </li>
  );
}

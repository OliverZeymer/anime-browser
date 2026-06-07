'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimeCard from '@/components/anime/AnimeCard';
import { Button } from '@/components/ui/button';
import { CarouselItem } from '@/components/ui/carousel';
import { CarouselRow } from '@/components/CarouselRow';
import { dedupeAnimeByMalId } from '@/utils/animeCardLayout';
import { CAROUSEL_SLIDE_CLASS } from '@/utils/carouselLayout';
import type { Anime } from '@/types/jikan';

type Props = {
  title: string;
  data?: Anime[];
  href: string;
};

export const AnimeSlider = ({ title, data, href }: Props) => {
  const slides = data ? dedupeAnimeByMalId(data) : [];

  if (!slides.length) {
    return null;
  }

  return (
    <section className='mt-14 sm:mt-16'>
      <div className='mb-4 flex items-end justify-between gap-4 px-4 sm:mb-5 lg:px-12'>
        <h2 className='text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl'>{title}</h2>
        <Button variant='ghost' size='sm' className='shrink-0 gap-1.5 text-muted-foreground hover:text-foreground' asChild>
          <Link href={href}>
            See all
            <ArrowRight className='h-4 w-4' />
          </Link>
        </Button>
      </div>

      <CarouselRow className='px-4 lg:px-12'>
        {slides.map((anime) => (
          <CarouselItem key={anime.mal_id} className={CAROUSEL_SLIDE_CLASS}>
            <div className='origin-center transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.04]'>
              <AnimeCard anime={anime} carousel />
            </div>
          </CarouselItem>
        ))}
      </CarouselRow>
    </section>
  );
};

export default AnimeSlider;

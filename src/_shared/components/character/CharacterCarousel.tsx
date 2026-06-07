'use client';

import { CarouselItem } from '@/components/ui/carousel';
import { CarouselRow } from '@/components/CarouselRow';
import { CharacterCarouselCard } from '@/components/character/CharacterCarouselCard';
import { CAROUSEL_SLIDE_CLASS } from '@/utils/carouselLayout';
import type { AnimeCharacter } from '@/types/jikan';

type Props = {
  characters: AnimeCharacter[];
};

export const CharacterCarousel = ({ characters }: Props) => {
  return (
    <CarouselRow className='mt-4' surface='primary-foreground'>
      {characters.map((character) => (
        <CarouselItem key={character.character.mal_id} className={CAROUSEL_SLIDE_CLASS}>
          <div className='origin-center transition-transform duration-300 ease-out hover:z-10 hover:scale-[1.04]'>
            <CharacterCarouselCard character={character} />
          </div>
        </CarouselItem>
      ))}
    </CarouselRow>
  );
};

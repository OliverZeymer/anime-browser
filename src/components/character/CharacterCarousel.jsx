'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

import Link from 'next/link';
import '@/styles/carousel.css';
export default function CharacterCarousel({ characters }) {
  function formatCharacterName(characterName) {
    const nameParts = characterName.split(', ');

    let formattedName = '';
    if (nameParts.length === 1) {
      formattedName = nameParts[0];
    } else if (nameParts.length === 2) {
      formattedName = `${nameParts[1]} ${nameParts[0]}`;
    } else if (nameParts.length === 3) {
      formattedName = `${nameParts[2]} ${nameParts[0]} ${nameParts[1]}`;
    } else {
      formattedName = nameParts.join(' ');
    }

    return formattedName;
  }
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className='max-w-[calc(100vw-175px)] md:max-w-[calc(100vw-500px)] mx-auto select-none w-full mt-4'>
      <CarouselContent>
        {characters?.map((character) => (
          <CarouselItem key={character.character.mal_id} className='carouselItem'>
            <Link className='flex items-center justify-between h-full flex-col' href={`/character/${character.character.mal_id}`}>
              <img src={character.character.images.webp.image_url} alt={character.character.name} className='max-w-[200px] rounded' />
              <p className='line-clamp-1 mt-2'>{formatCharacterName(character.character.name)}</p>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

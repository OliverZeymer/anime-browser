'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/carousel.css";
export default function CharacterCarousel({ characters }) {
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
              <Image src={character.character.images.webp.image_url} alt={character.character.name} width={450} height={700} className='max-w-[200px] rounded' />
              <p className='line-clamp-1 mt-2'>{character.character.name}</p>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

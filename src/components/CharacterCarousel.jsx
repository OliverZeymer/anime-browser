'use client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';
export default function CharacterCarousel({ characters }) {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className='max-w-[calc(100vw-500px)] mx-auto w-full mt-2'>
      <CarouselContent>
        {characters.map((character, index) => (
          <CarouselItem key={character.character.mal_id} className='md:basis-1/2 lg:basis-1/5 xl:basis-1/6'>
            <Link href={`/character/${character.character.mal_id}`}>
              <Image src={character.character.images.webp.image_url} alt={character.character.name} width={200} height={300} className='rounded-2xl' />
              <p>{character.character.name}</p>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

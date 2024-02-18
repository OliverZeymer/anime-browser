import { Star } from 'lucide-react';

import { Button } from '../ui/button';

export default function CharacterBanner({ character }) {
  return (
    <div className='relative flex flex-col items-center gap-3 md:gap-6 justify-center md:h-72 xl:h-96 mt-16 lg:mt-0'>
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neutral-700 to-transparent' style={{ mixBlendMode: 'multiply' }} />
      <img
        src={character.anime[character.anime.length - 1]?.anime?.images?.webp?.large_image_url}
        alt={character.name}
        className='absolute inset-0 -z-10 blur-md object-cover w-full h-44 md:h-72 xl:h-96 select-none'
      />
      <div className='z-10 mt-6 md:mt-12 lg:mt-[120px] flex flex-col items-center justify-center gap-3'>
        <h1 className='text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white'>{character?.name}</h1>
        <h2 className='text-lg text-center md:text-xl lg:text-2xl text-white z-10'>{character?.name_kanji}</h2>
      </div>

      <div className='flex justify-center items-center z-10'>
        <Button aria-label='favorite this character' className='bg-white text-black hover:bg-white/90'>
          <Star size={24} />
          <span className='ml-2'>Favorite</span>
        </Button>
      </div>
    </div>
  );
}

import { Star } from 'lucide-react';

import { Button } from './ui/button';

export default function CharacterBanner({ character }) {
  return (
    <div className='relative flex flex-col items-center gap-6 justify-center h-[300px] lg:h-[400px] mt-16 lg:mt-0'>
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neutral-700 to-transparent' style={{ mixBlendMode: 'multiply' }} />
      <img
        src={character.anime[character.anime.length - 1]?.anime?.images?.webp?.large_image_url}
        alt={character.name}
        className='absolute inset-0 select-none -z-10 blur-md object-cover w-full h-[300px] lg:h-[400px]'
      />
      <div className='z-10 mt-12 lg:mt-[120px] flex flex-col items-center justify-center gap-6'>
        <h1 className='text-5xl font-bold text-white'>{character.name}</h1>
        <h2 className='text-2xl text-white z-10'>{character.name_kanji}</h2>
      </div>
      <div className='flex justify-center items-center gap-6 z-10'>
        <Button aria-label='favorite this character' className='bg-white text-black hover:bg-white/90'>
          <Star size={24} />
          <span className='ml-2'>Favorite</span>
        </Button>
      </div>
    </div>
  );
}

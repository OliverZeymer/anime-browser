'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatCharacterName } from '@/utils/formatCharacterName';
import type { AnimeCharacter } from '@/types/jikan';

type Props = {
  character: AnimeCharacter;
};

export const CharacterCarouselCard = ({ character }: Props) => {
  return (
    <Link
      href={`/character/${character.character.mal_id}`}
      className='flex h-full w-full min-w-0 flex-col items-center no-drag'>
      <div className='relative aspect-[2/3] w-full overflow-hidden rounded-2xl'>
        <Image
          src={character.character.images?.webp?.image_url ?? ''}
          alt={character.character.name}
          fill
          sizes='(max-width: 768px) 150px, 300px'
          className='object-cover'
        />
      </div>
      <p className='mt-2 line-clamp-2 w-full text-center text-sm font-medium'>
        {formatCharacterName(character.character.name)}
      </p>
    </Link>
  );
};

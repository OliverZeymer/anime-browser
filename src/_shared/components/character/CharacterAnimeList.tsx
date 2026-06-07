import AnimeCardList from '../anime/AnimeCardList';
import PrimaryCard from '../PrimaryCard';

import type { CharacterAnime } from '@/types/jikan';

type Props = {
  data: CharacterAnime[];
};

export default function CharacterAnimeList({ data }: Props) {
  return (
    <PrimaryCard>
      <h3 className='text-xl lg:text-2xl font-bold'>Anime</h3>
      <AnimeCardList className='mt-4' isCharacter data={data} small />
    </PrimaryCard>
  );
}

import AnimeCardList from './AnimeCardList';
import PrimaryCard from './PrimaryCard';

export default function CharacterAnimeList({ data }) {
  return (
    <PrimaryCard>
      <h3 className='text-xl lg:text-2xl font-bold'>Anime</h3>
      <AnimeCardList className="mt-4" isCharacter data={data} />
    </PrimaryCard>
  );
}

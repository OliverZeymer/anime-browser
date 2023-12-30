import { getAnimeCharacters } from '@/utils/api';
import CharacterCarousel from './CharacterCarousel';
import PrimaryCard from './PrimaryCard';
export default async function AnimeCharacters({ id }) {
  const charactersData = await getAnimeCharacters(id);
  const characters = charactersData.data;
  const mostFavoritedCharacters = characters?.sort((a, b) => b.favorites - a.favorites);
  if (mostFavoritedCharacters.length === 0 || !mostFavoritedCharacters) return null;
  return (
    <PrimaryCard>
      <h4 className='text-2xl font-bold'>Characters</h4>
      <CharacterCarousel characters={mostFavoritedCharacters} />
    </PrimaryCard>
  );
}

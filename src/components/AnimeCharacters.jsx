import { getAnimeCharacters } from '@/utils/api';
import CharacterCarousel from './CharacterCarousel';
export default async function AnimeCharacters({ id }) {
  const charactersResponse = await getAnimeCharacters(id);
  const charactersData = await charactersResponse.json();
  const characters = charactersData.data;
  const mostFavoritedCharacters = characters?.sort((a, b) => b.favorites - a.favorites);
  return (
    <div className='bg-primary-foreground p-4 rounded-2xl h-fit'>
      <h4 className='text-2xl font-bold'>Characters</h4>
      <CharacterCarousel characters={mostFavoritedCharacters} />
    </div>
  );
}

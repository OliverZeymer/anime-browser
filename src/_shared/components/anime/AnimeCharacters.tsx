import { getAnimeCharacters } from '@/libs/jikan/fetch-anime';
import { CharacterCarousel } from '../character/CharacterCarousel';
import PrimaryCard from '../PrimaryCard';
type Props = {
  id: number;
};

export default async function AnimeCharacters({ id }: Props) {
  const charactersData = await getAnimeCharacters(id);
  const characters = charactersData.data;
  const mostFavoritedCharacters = characters?.sort(
    (a, b) => ((b as { favorites?: number }).favorites ?? 0) - ((a as { favorites?: number }).favorites ?? 0)
  );
  if (mostFavoritedCharacters.length === 0 || !mostFavoritedCharacters) return null;
  return (
    <PrimaryCard>
      <h4 className='text-2xl font-bold'>Characters</h4>
      <CharacterCarousel characters={mostFavoritedCharacters} />
    </PrimaryCard>
  );
}

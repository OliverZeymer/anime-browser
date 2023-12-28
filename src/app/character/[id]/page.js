import CharacterAbout from '@/components/CharacterAbout';
import CharacterBanner from '@/components/CharacterBanner';
import { getAnimeCharacterById } from '@/utils/api';
import ClickableImage from '@/components/ClickableImage';
import StickyAside from '@/components/StickyAside';
import CharacterAnimeList from '@/components/CharacterAnimeList';
import CharacterStats from '@/components/CharacterStats';
import CharacterVoices from '@/components/CharacterVoices';
export const revalidate = 3600;
export async function generateMetadata({ params }) {
  const characterData = await getAnimeCharacterById(params.id);
  const character = characterData.data;

  return {
    title: `${character.name}${character.anime[0].anime.title && ` | ${character.anime[0].anime.title}`}`,
    description: character.about,
  };
}
export default async function CharacterPage({ params }) {
  const id = params.id;
  const characterData = await getAnimeCharacterById(id);
  const character = characterData.data;
  return (
    <section>
      <CharacterBanner character={character} />
      <div className='mt-12 px-4 flex flex-col sm:flex-row gap-6'>
        <StickyAside>
          <ClickableImage src={character.images.webp.image_url} alt={character.name} width={300} height={450} />
          <CharacterStats character={character} />
        </StickyAside>
        <div className='flex flex-col gap-6 w-fit'>
          <CharacterAbout about={character.about} />
          <CharacterAnimeList data={character.anime} />
          <CharacterVoices voices={character.voices} />
        </div>
      </div>
    </section>
  );
}

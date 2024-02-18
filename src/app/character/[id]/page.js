import CharacterAbout from '@/components/character/CharacterAbout';
import CharacterBanner from '@/components/character/CharacterBanner';
import { getAnimeCharacterById } from '@/utils/api';
import ClickableImage from '@/components/ClickableImage';
import StickyAside from '@/components/StickyAside';
import CharacterAnimeList from '@/components/character/CharacterAnimeList';
import CharacterStats from '@/components/character/CharacterStats';
import CharacterVoices from '@/components/character/CharacterVoices';
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
      <div className='mt-12 px-4 flex flex-col md:flex-row gap-6'>
        <StickyAside className='md:items-start self-start flex flex-col gap-2 items-center md:min-w-[300px] md:top-4 md:w-[300px]'>
          <ClickableImage src={character.images.webp.image_url} alt={character.name} width={300} height={450} />
          <CharacterStats character={character} />
        </StickyAside>
        <div className='flex flex-col gap-6 w-full'>
          <CharacterAbout about={character.about} />
          <CharacterAnimeList data={character.anime} />
          <CharacterVoices voices={character.voices} />
        </div>
      </div>
    </section>
  );
}

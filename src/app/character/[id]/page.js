import CharacterAbout from '@/components/CharacterAbout';
import CharacterBanner from '@/components/CharacterBanner';
import { getAnimeCharacterById } from '@/utils/api';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import ClickableImage from '@/components/ClickableImage';

export default async function CharacterPage({ params }) {
  const id = params.id;
  const characterResponse = await getAnimeCharacterById(id);
  const characterData = await characterResponse.json();
  const character = characterData.data;
  return (
    <section>
      <CharacterBanner character={character} />
      <div className='mt-12 px-4 flex flex-col sm:flex-row gap-6'>
        <aside className='flex flex-col gap-2 w-full items-center sm:items-start sm:min-w-[300px] sm:w-[300px]'>
          <ClickableImage className="rounded" src={character.images.webp.image_url} alt={character.title_english} width={300} height={450} />
          
          <h1 className='text-xl font-bold'>{character.name}</h1>
          <h2 className='text-lg font-bold mt-2'>{character.name_kanji}</h2>
          {character.nicknames.length > 0 && (
            <div>
              <h3 className='text-lg font-bold'>Nicknames:</h3>
              <div className='flex gap-2 mt-2 flex-wrap'>
                {character.nicknames.map((nickname, index) => (
                  <Badge className='hover:bg-primary' key={index}>
                    {nickname}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </aside>
        <div className='flex flex-col gap-6 w-fit'>
          <CharacterAbout about={character.about} />
        </div>
      </div>
    </section>
  );
}

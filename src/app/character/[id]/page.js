import CharacterAbout from '@/components/CharacterAbout';
import CharacterBanner from '@/components/CharacterBanner';
import { getAnimeCharacterById } from '@/utils/api';
import { Badge } from '@/components/ui/badge';

import ClickableImage from '@/components/ClickableImage';
import StickyAside from '@/components/StickyAside';

export default async function CharacterPage({ params }) {
  const id = params.id;
  const characterData = await getAnimeCharacterById(id);
  const character = characterData.data;
  return (
    <section>
      <CharacterBanner character={character} />
      <div className='mt-12 px-4 flex flex-col sm:flex-row gap-6'>
        <StickyAside>
          <ClickableImage className='rounded' src={character.images.webp.image_url} alt={character.title_english} width={300} height={450} />
          <div className='flex bg-primary-foreground p-4 rounded-2xl flex-col gap-2 w-full items-center md:items-start mt-2 md:max-w-[300px]'>
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
          </div>
        </StickyAside>
        <div className='flex flex-col gap-6 w-fit'>
          <CharacterAbout about={character.about} />
        </div>
      </div>
    </section>
  );
}

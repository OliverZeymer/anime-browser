import PrimaryCard from '@/components/PrimaryCard';
import { VoiceActorCard } from '@/components/character/VoiceActorCard';
import type { CharacterFull } from '@/types/jikan';

type Props = {
  voices: CharacterFull['voices'];
};

export const CharacterVoices = ({ voices }: Props) => {
  if (!voices.length) {
    return null;
  }

  return (
    <PrimaryCard>
      <h2 className='text-xl font-bold'>Voice Actors</h2>
      <ul className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
        {voices.map((voice) => (
          <VoiceActorCard
            key={`${voice.person.mal_id}-${voice.language}`}
            name={voice.person.name}
            language={voice.language}
            imageUrl={voice.person.images.jpg.image_url}
          />
        ))}
      </ul>
    </PrimaryCard>
  );
};

export default CharacterVoices;

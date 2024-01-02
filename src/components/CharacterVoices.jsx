import ClickableImage from './ClickableImage';
import PrimaryCard from './PrimaryCard';

export default function CharacterVoices({ voices }) {
  return (
    <PrimaryCard>
      <h1 className='text-xl font-bold'>Voice Actors</h1>
      <ul className='mt-4 grid grid-cols-auto-fill-xs sm:grid-cols-auto-fill-sm gap-2'>
        {voices.map((voice) => (
          <li key={voice.person.name} className='flex flex-col items-center'>
            <ClickableImage src={voice.person.images.jpg.image_url} alt={voice.person.name} className='!w-44 !h-44 object-cover rounded-2xl' />
            <h5 className='font-semibold text-center line-clamp-1 mt-2'>{voice.person.name}</h5>
            <p>{voice.language}</p>
          </li>
        ))}
        <div className={voices.length % 2 === 0 ? 'grow' : 'hidden'} />
      </ul>
    </PrimaryCard>
  );
}

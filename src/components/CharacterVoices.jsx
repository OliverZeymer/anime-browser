import ClickableImage from './ClickableImage';

export default function CharacterVoices({ voices }) {
  return (
    <div className='bg-primary-foreground p-4 rounded-2xl'>
      <h1 className='text-xl font-bold'>Voice Actors</h1>
      <ul className='mt-4 grid grid-cols-small-fit gap-2'>
        {voices.map((voice) => (
          <li key={voice.person.name} className='flex flex-col items-center'>
            <ClickableImage src={voice.person.images.jpg.image_url} alt={voice.person.name} className='!w-44 !h-44 object-cover rounded-2xl' />
            <p className='font-semibold text-lg line-clamp-1 mt-2'>{voice.person.name}</p>
            <p>{voice.language}</p>
          </li>
        ))}
        <div className={voices.length % 2 === 0 ? 'grow' : 'hidden'} />
      </ul>
    </div>
  );
}

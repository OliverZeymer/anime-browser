import { Badge } from './ui/badge';

export default function CharacterStats({ character }) {
  return (
    <ul className='flex bg-primary-foreground p-4 rounded-2xl flex-col gap-2 w-full items-center md:items-start mt-2 md:max-w-[300px]'>
      <h1 className='text-xl font-bold'>{character.name}</h1>
      <h2 className='text-lg font-bold'>{character.name_kanji}</h2>
      {character.nicknames.length > 0 && (
        <li className='flex flex-col md:flex-row gap-2 items-center flex-wrap'>
          <h3 className=''>Nicknames:</h3>
          <div className='flex gap-2 flex-wrap flex-col items-center md:items-start md:flex-row'>
            {character.nicknames.map((nickname, index) => (
              <Badge className='hover:bg-primary' key={index}>
                {nickname}
              </Badge>
            ))}
          </div>
        </li>
      )}
      <li className='flex gap-2 items-center'>
        <p>Fans:</p>
        <span className='font-semibold'>{character.favorites.toLocaleString('en-US')}</span>
      </li>
    </ul>
  );
}

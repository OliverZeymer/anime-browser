import AnimeCardList from './AnimeCardList';

export default function CharacterAnimeList({ data }) {
  return (
    <div className='bg-primary-foreground p-4 rounded-2xl'>
      <h3 className='text-xl lg:text-2xl font-bold'>Anime</h3>
      <AnimeCardList className="mt-4" isCharacter data={data} />
    </div>
  );
}

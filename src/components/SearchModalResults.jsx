import Link from 'next/link';
import { Button } from './ui/button';

function InitialMessage() {
  return (
    <div className='flex flex-col items-center justify-center gap-2 w-full'>
      <p className='text-sm text-neutral-300'>Your search results will appear here.</p>
    </div>
  );
}

function NoResults() {
  return (
    <div className='flex flex-col items-center justify-center gap-2 w-full'>
      <h3 className='text-lg font-semibold'>No results found.</h3>
      <p className='text-sm text-neutral-400'>Try searching for something else.</p>
    </div>
  );
}

function ResultsList({ results, selectedIndex, searchValue }) {
  return (
    <ul className='flex flex-col gap-2 w-full mt-2'>
      <h3 className='text-lg font-semibold leading-none tracking-tight mb-3'>
        {results.length} result{results.length > 1 ? 's' : ''} found for <span className='capitalize'>&quot;{searchValue}&quot;</span>
      </h3>
      {results.map((anime, index) => (
        <li key={anime.mal_id} className={`flex items-center gap-4 w-full hover:bg-secondary transition-colors rounded-md ${index === selectedIndex ? 'bg-secondary' : ''}`}>
          <Link className='flex items-center w-full gap-4' href={`/anime/${anime.mal_id}`}>
            <img src={anime.images.jpg.image_url} alt={anime.title} className='w-[60px] object-cover aspect-[1/1.5] rounded-md' />
            <div className='flex flex-col gap-1'>
              <h3 className='text-base line-clamp-1 font-semibold'>{anime.title}</h3>
              <p className='text-xs text-neutral-400'>{anime.type}</p>
            </div>
          </Link>
        </li>
      ))}
      <li key='show-more' className={`flex items-center justify-center`}>
        <Button asChild variant='secondary' className={`gap-1 ${selectedIndex === results.length ? 'bg-secondary dark:bg-primary dark:text-secondary' : ''}`}>
          <Link href={`/anime?search=${searchValue}`}>Show all results</Link>
        </Button>
      </li>
    </ul>
  );
}

export default function SearchModalResults({ results, selectedIndex, hasSearched, searchValue }) {
  if (results?.length === 0) {
    return hasSearched ? <NoResults /> : <InitialMessage />;
  }

  return <ResultsList results={results} selectedIndex={selectedIndex} searchValue={searchValue} />;
}

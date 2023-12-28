'use client';
import { SearchIcon, X } from 'lucide-react';
import AnimeFilterButton from './AnimeFilterButton';
import { Input } from './ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { useState } from 'react';

export default function AnimeSearchBar({ order, status, search, type, genres }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(search);
  const onSubmit = (event) => {
    event.preventDefault();
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    if (!searchValue) {
      current.delete('search');
    } else {
      current.set('search', searchValue);
    }

    if (current.has('page')) {
      current.delete('page');
    }

    const param = current.toString();
    const query = param ? `?${param}` : '';

    router.push(`/anime${query}`);
  };
  return (
    <form onSubmit={onSubmit} className='bg-primary-foreground mx-auto w-fit flex items-center border border-neutral-700 rounded-full'>
      <div className='relative'>
        <Button aria-label='search' variant='ghost' type='submit' className='absolute left-3 p-1 h-fit top-1/2 -translate-y-1/2'>
          <SearchIcon size={20} />
        </Button>
        <Input
          type='text'
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          value={searchValue}
          placeholder='Search'
          className='rounded-none text-base h-10 w-full xs:w-96 pl-12 bg-white dark:bg-black/30 rounded-l-full border-none focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0'
        />
        {searchValue && (
          <Button
            aria-label='reset search'
            variant='ghost'
            type='button'
            onClick={() => {
              setSearchValue('');
              router.push(`${pathname}`);
            }}
            className='absolute right-1 p-1 h-fit top-1/2 -translate-y-1/2'>
            <X size={20} />
          </Button>
        )}
      </div>
      <AnimeFilterButton order={order} status={status} type={type} genres={genres} />
    </form>
  );
}

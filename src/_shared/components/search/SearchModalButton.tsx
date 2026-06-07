import { useState, useCallback, useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Search, X } from 'lucide-react';
import { debounce } from 'lodash';
import { searchAnime } from '@/libs/jikan/search-anime';
import { SearchResultsSkeleton } from './SearchResultsSkeleton';
import SearchModal from './SearchModal';
import SearchModalInput from './SearchModalInput';
import SearchModalResults from './SearchModalResults';
import type { Anime } from '@/types/jikan';

export default function SearchModalButton() {
  const pathname = usePathname();
  return <SearchModalButtonInner key={pathname} />;
}

function SearchModalButtonInner() {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Anime[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const router = useRouter();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const maxIndex = searchResults.length;

      if (event.key === 'ArrowDown') {
        setSelectedItemIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
      } else if (event.key === 'ArrowUp') {
        setSelectedItemIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (event.key === 'Enter') {
        if (selectedItemIndex >= 0 && selectedItemIndex < searchResults.length) {
          const selectedAnime = searchResults[selectedItemIndex];
          router.push(`/anime/${selectedAnime.mal_id}`);
        } else if (selectedItemIndex === maxIndex) {
          router.push(`/anime?search=${searchValue}`);
        }
      }
    },
    [searchResults, selectedItemIndex, router, searchValue]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const debouncedFetchSearchResults = useMemo(
    () =>
      debounce(async (query: string) => {
        try {
          setHasSearched(true);
          setIsLoading(true);
          const data = await searchAnime(query, 5);
          setSearchResults(data?.data ?? []);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedFetchSearchResults.cancel();
    };
  }, [debouncedFetchSearchResults]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      debouncedFetchSearchResults(value);
    } else {
      setSearchResults([]);
    }
  };
  return (
    <SearchModal open={open} onOpenChange={setOpen}>
      <DialogTrigger className='p-1 h-auto'>
        <Search />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='relative'>
          <h2 className='text-lg font-semibold leading-none tracking-tight mb-2'>Search for anime</h2>
          <div className='h-[1px] w-full bg-gradient-to-r from-white/10 via-white/40 to-white/10' />
        </DialogHeader>
        <SearchModalInput value={searchValue} onChange={handleSearchChange} />
        {isLoading ? (
          <SearchResultsSkeleton />
        ) : (
          <SearchModalResults results={searchResults} selectedIndex={selectedItemIndex} isLoading={isLoading} hasSearched={hasSearched} searchValue={searchValue} />
        )}
      </DialogContent>
    </SearchModal>
  );
}

import { useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import debounce from 'lodash.debounce';
import { getAnimeBySearch } from '@/utils/api';
import Loader from './Loader';
import Link from 'next/link';
import SearchModal from './SearchModal';
import SearchModalInput from './SearchModalInput';
import SearchModalResults from './SearchModalResults';

export default function SearchModalButton() {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const pathname = usePathname();
  const router = useRouter();

  const handleKeyDown = useCallback(
    (event) => {
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
    setOpen(false);
    setSearchValue('');
    setSearchResults([]);
    setHasSearched(false);
    setSelectedItemIndex(-1);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  const fetchSearchResults = async (query) => {
    try {
      if (!hasSearched) {
        setHasSearched(true);
      }
      setIsLoading(true);
      const data = await getAnimeBySearch(query, 5);
      setSearchResults(data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchSearchResults = useCallback(debounce(fetchSearchResults, 500), []);

  const handleSearchChange = (e) => {
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
        {isLoading ? <Loader className="w-8 h-8 dark:text-primary" /> : <SearchModalResults results={searchResults} selectedIndex={selectedItemIndex} isLoading={isLoading} hasSearched={hasSearched} searchValue={searchValue} />}
      </DialogContent>
    </SearchModal>
  );
}

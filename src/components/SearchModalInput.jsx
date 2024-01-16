'use client';
import { Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
export default function SearchModalInput({ value, onChange, onClear }) {
  return (
    <div className='relative grow'>
      <Button aria-label='search' variant='ghost' type='submit' className='absolute left-3 p-1 h-fit top-1/2 -translate-y-1/2'>
        <Search size={20} />
      </Button>
      <Input
        autoFocus={true}
        type='text'
        onChange={onChange}
        value={value}
        placeholder='Search for an anime...'
        className='text-base border-2 h-10 w-full pl-12 bg-white dark:bg-primary-foreground rounded-full focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0'
      />
      {value && (
        <Button
          aria-label='reset search'
          variant='ghost'
          type='button'
          onClick={() => {
            onClear();
          }}
          className='absolute right-1 p-1 h-fit top-1/2 -translate-y-1/2'>
          <X size={20} />
        </Button>
      )}
    </div>
  );
}

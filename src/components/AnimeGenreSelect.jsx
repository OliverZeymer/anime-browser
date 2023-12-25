'use client';

import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { animeGenres } from '@/utils/constants';

export function AnimeGenreSelect() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className='flex flex-col space-y-2'>
        <Label>Genres</Label>
        <PopoverTrigger asChild>
          <Button variant='outline' role='combobox' aria-expanded={open} className='justify-between hover:bg-transparent'>
            {value ? animeGenres.find((genre) => genre.label === value)?.label : 'Genres'}
            <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandInput placeholder='Search genres...' />
            <CommandEmpty>No genres found.</CommandEmpty>
            <CommandGroup className='max-h-64 overflow-y-scroll'>
              {animeGenres.map((genre) => (
                <CommandItem
                  key={genre.label}
                  value={genre.label}
                  onSelect={(e) => {
                    console.log(e);
                    setValue(e === value ? '' : e);
                    setOpen(false);
                  }}>
                  <Check className={cn('mr-2 h-4 w-4', value === genre.label ? 'opacity-100' : 'opacity-0')} />
                  {genre.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </div>
    </Popover>
  );
}

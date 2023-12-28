import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

import { Check, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

function MultiSelect({ options, selected, onChange, className, ...props }) {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const containerRef = useRef(null);

  const handleUnselect = (item) => {
    onChange(selected.filter((i) => i !== item));
  };

  return (
    <div ref={containerRef}>
      <Popover modal={true} open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            ariaLabel='open combobox'
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className={`w-full max-w-[200px] justify-between hover:bg-transparent ${selected.length > 1 ? 'h-full' : 'h-10'}`}
            onClick={() => setOpen(!open)}>
            {selected.length > 0 ? (
              <div className='flex gap-1 flex-wrap'>
                {selected.map((item) => (
                  <Badge variant='secondary' key={item.label} className='mr-1 px-1.5 bg-primary text-primary-foreground hover:bg-white capitalize' onClick={() => handleUnselect(item)}>
                    {item.label}
                    <div
                      className='ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleUnselect(item);
                        }
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleUnselect(item);
                      }}>
                      <X className='h-3 w-3 text-primary-foreground' />
                    </div>
                  </Badge>
                ))}
              </div>
            ) : (
              <span className=''>All</span>
            )}
            <ChevronDown className='h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0' container={containerRef.current}>
          <Command className={cn(className, 'custom-scrollbar')}>
            <CommandInput placeholder='Search ...' />
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup className='max-h-64 overflow-y-auto'>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  className='cursor-pointer capitalize'
                  onSelect={() => {
                    onChange(selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option]);
                    setOpen(true);
                  }}>
                  <Check className={cn('mr-2 h-4 w-4', selected.includes(option) ? 'opacity-100' : 'opacity-0')} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { MultiSelect };

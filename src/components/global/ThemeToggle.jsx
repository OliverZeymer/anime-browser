'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export default function ThemeToggle({ isPathWithBanner }) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none ring-0 border-none' asChild>
        <Button aria-label='open theme toggler' variant='ghost' className={cn('px-0 w-fit h-fit p-1', isPathWithBanner ? 'text-white' : 'text-primary')} size='icon'>
          <Sun className='h-6 w-6 rotate-0 scale-100 dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-6 w-6 rotate-90 scale-0 dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

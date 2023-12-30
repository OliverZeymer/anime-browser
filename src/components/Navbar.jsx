'use client';
import { Navigation } from '@/utils/constants';
import NavLink from './NavLink';
import Link from 'next/link';
import { Search, Settings } from 'lucide-react';
import { Button } from './ui/button';
import MobileNav from './MobileNav';
import { Suspense, useContext } from 'react';
import AuthContext from '@/contexts/AuthContext';
import UserDropdown from './UserDropdown';

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import ThemeToggle from './ThemeToggle';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import SignUpModalButton from './SignUpModalButton';

export default function Navbar() {
  const { auth, cookieCheckDone } = useContext(AuthContext);
  const pathname = usePathname();
  return (
    <>
      <nav className={cn('hidden lg:flex absolute w-full py-4 select-none lg:pt-6 z-20 items-center px-4 lg:px-12 border-primary', pathname !== '/' && 'border-b-2 dark:border-b-0')}>
        <Link href='/'>
          <img src='/images/logo.png' alt='Anime Browser Logo' className='relative text-white h-12 w-12 flex items-center justify-center rounded-full aspect-square' />
        </Link>
        <ul className='flex gap-6 ml-12'>
          {Navigation.map((navItem) => (
            <li key={navItem.name}>
              <Suspense fallback={<div>Loading...</div>}>
                <NavLink
                  navItem={navItem}
                  activeClassName={pathname === '/' ? 'text-white' : 'text-primary'}
                  className={cn('flex gap-2 font-semibold text-neutral-500 transition-colors', pathname === '/' || 'login' ? 'hover:text-white' : 'hover:text-primary')}>
                  {navItem.name}
                </NavLink>
              </Suspense>
            </li>
          ))}
        </ul>
        <div className={cn('flex items-center gap-6 ml-auto', pathname === '/' ? 'text-white' : 'text-primary')}>
          <Button aria-label='open search' variant='ghost' className='p-1 h-auto'>
            <Search />
          </Button>
          <ThemeToggle />
          <Button aria-label='go to settings' variant='ghost' className='p-1 h-auto'>
            <Link href='/settings'>
              <Settings />
            </Link>
          </Button>
          {cookieCheckDone ? (
            <div>
              {!auth ? (
                <SignUpModalButton />
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger className='outline-none'>
                    {auth?.profilePicture ? (
                      <img
                        className={auth?.profilePicture ? 'rounded-full w-10 h-10 object-cover' : 'rounded-full border border-gray-400 w-10 h-10 object-cover'}
                        src={auth?.profilePicture}
                        alt='user-profile'
                      />
                    ) : (
                      <div className='rounded-full border border-gray-600 w-10 h-10' />
                    )}
                  </DropdownMenuTrigger>
                  <UserDropdown />
                </DropdownMenu>
              )}
            </div>
          ) : (
            <Skeleton className='w-10 h-10 rounded-full' />
          )}
        </div>
      </nav>
      <MobileNav />
    </>
  );
}

'use client';
import { Navigation } from '@/utils/constants';
import NavLink from './NavLink';
import Link from 'next/link';
import { Search, Settings } from 'lucide-react';
import { Button } from './ui/button';
import MobileNav from './MobileNav';
import { useContext } from 'react';
import AuthContext from '@/contexts/AuthContext';
import UserDropdown from './UserDropdown';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { auth, cookieCheckDone } = useContext(AuthContext);
  return (
    <>
      <nav className='hidden lg:flex absolute w-full py-4 lg:py-6 z-20 items-center px-4 lg:px-12'>
        <Link className='relative font-extrabold text-2xl bg-gradient-to-tr h-12 w-12 from-purple-500 to-purple-900 flex items-center justify-center p-1 rounded-full aspect-square' href='/'>
          AB
        </Link>
        <ul className='flex gap-6 ml-16'>
          {Navigation.map((navItem) => (
            <li key={navItem.name}>
              <NavLink href={navItem.href} activeClassName='text-white' className='flex gap-2 font-semibold text-neutral-500 hover:text-white transition-colors'>
                <navItem.icon />
                {navItem.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className='flex items-center gap-10 ml-auto'>
          <Search />
          <ThemeToggle />
          <Link href='/settings'>
            <Settings />
          </Link>
          {cookieCheckDone ? (
            <div>
              {!auth ? (
                <Button asChild>
                  <Link href='/login'>Sign In</Link>
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger className='outline-none'>
                    {auth?.profilePicture ? (
                      <Image
                        width={128}
                        height={128}
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

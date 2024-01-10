'use client';
import { Navigation } from '@/utils/constants';
import NavLink from './NavLink';
import Link from 'next/link';
import { Search, Settings } from 'lucide-react';
import { Button } from './ui/button';
import MobileNav from './MobileNav';
import { Suspense, useContext } from 'react';
import AuthContext from '@/contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import NavbarAvatar from './NavbarAvatar';
import { pathsWithBanner } from '@/utils/constants';
export default function Navbar() {
  const { auth, cookieCheckDone } = useContext(AuthContext);
  const pathname = usePathname();
  const isPathWithBanner = pathsWithBanner.some((regex) => regex.test(pathname));
  return (
    <>
      <nav className={cn('hidden lg:flex absolute w-full py-4 select-none lg:pt-6 z-20 items-center px-4 lg:px-12 border-muted-foreground', !isPathWithBanner && 'border-b-2 dark:border-b-0')}>
        <Link href='/'>
          <img src='/images/logo.png' alt='Anime Browser Logo' className='relative text-white h-12 w-12 flex items-center justify-center rounded-full aspect-square' />
        </Link>
        <ul className='flex gap-6 ml-12'>
          {Navigation.map((navItem) => (
            <li key={navItem.name}>
              <Suspense fallback={<div>Loading...</div>}>
                <NavLink
                  navItem={navItem}
                  activeClassName={isPathWithBanner ? 'text-white' : 'text-primary'}
                  className={cn('flex gap-2 font-semibold text-neutral-500 transition-colors', isPathWithBanner ? 'hover:text-white' : 'hover:text-primary')}>
                  {navItem.name}
                </NavLink>
              </Suspense>
            </li>
          ))}
        </ul>
        <div className={cn('flex items-center gap-6 ml-auto', isPathWithBanner ? 'text-white' : 'text-primary')}>
          <Button aria-label='open search' variant='ghost' className='p-1 h-auto'>
            <Search />
          </Button>
          <ThemeToggle isPathWithBanner={isPathWithBanner} />
          <Button aria-label='go to settings' variant='ghost' className='p-1 h-auto'>
            <Link href='/settings'>
              <Settings />
            </Link>
          </Button>
          <NavbarAvatar auth={auth} cookieCheckDone={cookieCheckDone} isPathWithBanner={isPathWithBanner} />
        </div>
      </nav>
      <MobileNav />
    </>
  );
}

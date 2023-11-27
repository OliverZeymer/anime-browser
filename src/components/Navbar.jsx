import { Navigation } from '@/utils/constants';
import NavLink from './NavLink';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import MobileNav from './MobileNav';

export default function Navbar() {
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
          <Button asChild>
            <Link href='/login'>Sign In</Link>
          </Button>
        </div>
      </nav>
      <MobileNav />
    </>
  );
}

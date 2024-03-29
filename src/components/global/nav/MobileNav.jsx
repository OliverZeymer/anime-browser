'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { Navigation, Socials } from '@/utils/constants';
import { Fade as Hamburger } from 'hamburger-react';
import NavLink from '../NavLink';

import { Search, Settings } from 'lucide-react';
import { useContext } from 'react';
import AuthContext from '@/contexts/AuthContext';
import ThemeToggle from '../ThemeToggle';
import { Button } from '../../ui/button';
import NavbarAvatar from './NavbarAvatar';

export default function MobileNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { auth, cookieCheckDone } = useContext(AuthContext);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.body.style.overflow = 'unset';
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMobileMenuOpen]);
  return (
    <nav className={`mobile-menu fixed top-0 z-50 flex w-full items-center justify-between bg-background px-6 py-2 shadow transition-all lg:hidden`}>
      <div className='flex flex-1 items-center justify-start'>
        <Link
          href='/'
          onClick={() => {
            setIsMobileMenuOpen(false);
          }}>
          <img src='/images/logo.png' alt='Anime Browser Logo' className='relative text-white h-12 w-12 flex items-center justify-center rounded-full aspect-square' />
        </Link>
      </div>
      <div className='flex items-center justify-end gap-4'>
        <NavbarAvatar auth={auth} cookieCheckDone={cookieCheckDone} />

        <Hamburger toggled={isMobileMenuOpen} toggle={setIsMobileMenuOpen} />
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: 0.2,
              type: 'tween',
            }}
            className='fixed right-0 top-0 z-30 w-[calc(100vw-4rem)] sm:w-[50vw] bg-primary-foreground'>
            <div className='mobile-menu flex h-screen w-full flex-col px-6'>
              <ul className='mt-24 text-3xl flex w-full flex-col items-end justify-center gap-8'>
                {Navigation.map((item, index) => (
                  <li key={index}>
                    <Suspense fallback={<div>Loading...</div>}>
                      <NavLink
                        navItem={item}
                        className='flex items-center gap-2 justify-center'
                        activeClassName='border-b-4 border-primary'
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                        }}>
                        {item.name}
                      </NavLink>
                    </Suspense>
                  </li>
                ))}
              </ul>
              <div className='mt-auto flex w-full gap-4 justify-end my-5'>
                <Button aria-label='open search' variant='ghost' className='p-1 h-auto'>
                  <Search />
                </Button>
                <ThemeToggle />
                <Button aria-label='go to settings' variant='ghost' className='p-1 h-auto'>
                  <Link href='/settings'>
                    <Settings />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

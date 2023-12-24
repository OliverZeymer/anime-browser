'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navigation, Socials } from '@/utils/constants';
import { Fade as Hamburger } from 'hamburger-react';
import Image from 'next/image';
import NavLink from './NavLink';

export default function MobileNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
          <h1 className='gradient_text text-2xl sm:text-3xl font-bold font-kurale text-primary'>Anime Browser</h1>
        </Link>
      </div>
      <div className='flex items-center justify-end gap-4'>
        {Socials.map((social) => (
          <Link target='_blank' key={social.name} href={social.href} className='hidden sm:block p-2 bg-dark/10 transition-colors hover:bg-dark/20 rounded-full backdrop-blur shadow'>
            <social.icon />
          </Link>
        ))}
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
                    <NavLink
                      navItem={item}
                      className='flex items-center gap-2 justify-center'
                      activeClassName='border-b-4 border-primary'
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                      }}>
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className='mt-auto flex w-full gap-4 justify-end my-5'>
                {Socials.map((social) => (
                  <Link target='_blank' key={social.name} href={social.href} className='p-2 bg-dark/10 transition-colors hover:bg-dark/20 rounded-full backdrop-blur shadow'>
                    <social.icon />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

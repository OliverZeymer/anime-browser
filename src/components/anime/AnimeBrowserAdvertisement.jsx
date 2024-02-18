'use client';
import StickyAside from '@/components/StickyAside';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
export default function AnimeBrowserAdvertisement() {
  const [hideAd, setHideAd] = useState(false);
  return (
    <StickyAside className={cn('hidden relative xl:block pl-2 box-content h-[calc(100vh-2rem)] top-4 w-[250px]', hideAd && 'xl:hidden')}>
      <Button
        className='z-20 hover:bg-white/25 h-auto rounded-full p-1.5 absolute top-3 right-3'
        variant='ghost'
        onClick={(e) => {
          e.preventDefault();
          setHideAd(true);
        }}>
        <X size={24} />
      </Button>
      <img
        src='/images/animebrowser_ad.webp'
        className='w-full object-cover h-full overflow-hidden to-primary-foreground/20 rounded-md uppercase font-semibold text-center justify-center flex items-center'
      />
      <Link href='/' className='w-full h-full z-10 absolute bottom-0 left-0 right-0' />
    </StickyAside>
  );
}

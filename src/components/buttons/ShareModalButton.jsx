'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ImageIcon, Share } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import CopyInput from '../CopyInput';

export default function ShareModalButton({ className }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <Dialog>
      <Button aria-label='open share modal' asChild className={cn('w-full text-base', className)}>
        <DialogTrigger>
          <Share size={18} className='mr-2' />
          Share
        </DialogTrigger>
      </Button>
      <DialogContent className='p-0 max-w-md !rounded-2xl shadow-2xl border-none'>
        <div className='relative'>
          {!isImageLoaded && (
            <div className='absolute inset-0 flex items-center justify-center bg-gray-200 rounded-t-2xl animate-pulse'>
              <ImageIcon size={32} className='w-16 h-16 text-gray-500' />
            </div>
          )}
          <img
            src='/images/one-piece.webp'
            alt='One Piece Cover'
            className={`w-full max-w-md max-h-72 object-cover rounded-t-2xl transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={handleImageLoad}
          />
        </div>
        <div className='!m-0 px-4 pb-6'>
          <DialogTitle className='text-center !mb-3 text-2xl font-bold lg:text-3xl'>This website rocks!</DialogTitle>
          <DialogDescription className='text-base text-center mb-4'>
            Share Anime Browser with your family and neighbours.
            <br />
            Hell, share it with the whole World!
          </DialogDescription>
          <CopyInput />
        </div>
      </DialogContent>
    </Dialog>
  );
}

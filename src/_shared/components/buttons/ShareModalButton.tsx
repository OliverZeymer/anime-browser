'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Share } from 'lucide-react';
import { cn } from '@/libs/cn';
import CopyInput from '../CopyInput';
import Image from 'next/image';

type Props = {
  className?: string;
};

export const ShareModalButton = ({ className }: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Dialog>
      <Button aria-label='open share modal' asChild className={cn('w-full text-base', className)}>
        <DialogTrigger>
          <Share size={18} className='mr-2' />
          Share
        </DialogTrigger>
      </Button>
      <DialogContent className='max-w-md gap-0 overflow-hidden rounded-2xl border-none p-0 shadow-2xl'>
        <div className='relative aspect-[14/9] w-full overflow-hidden'>
          {!isImageLoaded && <Skeleton className='absolute inset-0 rounded-none' />}
          <Image
            src='/images/one-piece.webp'
            alt='One Piece Cover'
            fill
            sizes='(max-width: 768px) 100vw, 448px'
            className={cn(
              'object-cover transition-opacity duration-300',
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => {
              setIsImageLoaded(true);
            }}
          />
        </div>
        <div className='px-4 pb-6 pt-4'>
          <DialogTitle className='mb-3 text-center text-2xl font-bold lg:text-3xl'>This website rocks!</DialogTitle>
          <DialogDescription className='mb-4 text-center text-base'>
            Share Anime Browser with your family and neighbours.
            <br />
            Hell, share it with the whole World!
          </DialogDescription>
          <CopyInput />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModalButton;

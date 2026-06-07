'use client';

import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import ClickableImageTrigger from './ClickableImageTrigger';
import Image from 'next/image';
import { X } from 'lucide-react';

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  variant?: 'poster' | 'avatar';
};

export const ClickableImage = ({ src, alt, className, variant = 'poster' }: Props) => {
  if (!src) {
    return null;
  }

  return (
    <Dialog>
      <ClickableImageTrigger src={src} alt={alt} className={className} variant={variant} />
      <DialogContent
        isFullModal
        hideCloseButton
        className='flex w-auto max-w-[min(95vw,1200px)] items-center justify-center rounded-none border-0 bg-transparent p-0 shadow-none data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95'>
        <DialogTitle className='sr-only'>{alt}</DialogTitle>
        <DialogClose className='fixed right-4 top-4 z-[60] flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white opacity-100 ring-offset-0 backdrop-blur-sm transition-colors hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50'>
          <X className='h-5 w-5' />
          <span className='sr-only'>Close</span>
        </DialogClose>
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={1800}
          className='max-h-[85vh] w-auto max-w-full rounded-lg object-contain'
          sizes='95vw'
        />
      </DialogContent>
    </Dialog>
  );
};

export default ClickableImage;

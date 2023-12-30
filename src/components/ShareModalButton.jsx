'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Share } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import CopyInput from './CopyInput';
export default function ShareModalButton({ className }) {
  return (
    <Dialog>
      <Button aria-label='open share modal' asChild className={cn('w-full text-base', className)}>
        <DialogTrigger>
          <Share size={18} className='mr-2' />
          Share
        </DialogTrigger>
      </Button>
      <DialogContent className='p-0 max-w-md !rounded-2xl shadow-2xl border-none'>
        <DialogHeader>
          <div>
            <img src='/images/one-piece.webp' alt='One Piece Cover' className='w-full max-w-md max-h-72 object-cover rounded-t-2xl ' />
          </div>
          <div className='!m-0 px-4 pb-6'>
            <DialogTitle className='text-center !mb-3 !mt-6 text-2xl font-bold lg:text-3xl'>This website rocks!</DialogTitle>
            <DialogDescription className='text-base text-center mb-4'>
              Share Anime Browser with your family and neighbours.
              <br />
              Hell, share it with the whole World!
            </DialogDescription>
            <CopyInput />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

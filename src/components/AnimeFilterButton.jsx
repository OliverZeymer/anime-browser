'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Sliders } from 'lucide-react';

import AnimeFilterPopup from './AnimeFilterPopup';
import { useState } from 'react';

export default function AnimeFilterButton({ order, status, type, genres }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <Button asChild variant='ghost' type='button' className='pl-3 pr-4 py-2 h-auto border-l border-neutral-700 rounded-r-full'>
        <DialogTrigger>
          <Sliders size={24} />
        </DialogTrigger>
      </Button>
      <AnimeFilterPopup order={order} status={status} type={type} genres={genres} open={open} setOpen={setOpen} />
    </Dialog>
  );
}

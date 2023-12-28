'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Sliders } from 'lucide-react';

import AnimeFilterPopup from './AnimeFilterPopup';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function AnimeFilterButton({ order, status, type, genres }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams = Object.fromEntries(searchParams);
  const paramsWithoutPage = Object.keys(currentParams).filter((key) => key !== 'page');
  useEffect(() => {
    if (pathname === '/anime/new' && paramsWithoutPage.length > 0) {
      const newUrl = `/anime?${searchParams.toString()}`;

      router.push(newUrl);
    }
  }, [paramsWithoutPage]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button aria-label='filter' asChild variant='ghost' type='button' className='pl-3 pr-4 py-2 h-auto border-l border-neutral-700 rounded-r-full'>
        <DialogTrigger>
          <Sliders size={24} />
        </DialogTrigger>
      </Button>
      <AnimeFilterPopup order={order} status={status} type={type} genres={genres} open={open} setOpen={setOpen} />
    </Dialog>
  );
}

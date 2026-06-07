'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Sliders } from 'lucide-react';

import AnimeFilterPopup from './AnimeFilterPopup';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  order: string;
  status: string;
  type: string;
  genres: string;
};

export default function AnimeFilterButton({ order, status, type, genres }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryWithoutPage = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    return params.toString();
  }, [searchParams]);

  useEffect(() => {
    if (pathname === '/anime/new' && queryWithoutPage.length > 0) {
      router.replace(`/anime?${queryWithoutPage}`);
    }
  }, [pathname, queryWithoutPage, router]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button aria-label='filter' asChild variant='ghost' type='button' className='pl-3 pr-4 py-2 h-auto border-l border-neutral-700 rounded-r-full'>
        <DialogTrigger>
          <Sliders size={24} />
        </DialogTrigger>
      </Button>
      <AnimeFilterPopup order={order} status={status} type={type} genres={genres} setOpen={setOpen} />
    </Dialog>
  );
}

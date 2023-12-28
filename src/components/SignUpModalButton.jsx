'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import AuthorizeContainer from '@/components/AuthorizeContainer';
export default function SignUpModalButton() {
  const pathname = usePathname();
  return (
    <Dialog>
      <Button aria-label='open sign up modal' asChild>
        <DialogTrigger className={pathname === '/' && 'text-black bg-white'}>Sign In</DialogTrigger>
      </Button>
      <DialogContent className='w-fit max-w-md'>
        <AuthorizeContainer />
      </DialogContent>
    </Dialog>
  );
}

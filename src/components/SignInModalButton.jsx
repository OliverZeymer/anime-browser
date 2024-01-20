'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import AuthorizeContainer from '@/components/AuthorizeContainer';
export default function SignInModalButton() {
  return (
    <Dialog>
      <Button className="bg-animebrowser text-white hover:bg-animebrowser/90" aria-label='open sign up modal' asChild>
        <DialogTrigger>Sign In</DialogTrigger>
      </Button>
      <DialogContent className='w-fit max-w-md'>
        <AuthorizeContainer />
      </DialogContent>
    </Dialog>
  );
}

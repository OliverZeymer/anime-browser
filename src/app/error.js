'use client';
import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';
export default function Error({ error, reset }) {
  return (
    <section className='px-4 pt-32 flex flex-col h-full grow gap-6 flex-1 items-center justify-center'>
      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] text-center'>Error</h1>
      <img className='max-h-64 md:max-h-96' src='https://res.cloudinary.com/dg1ge7qf8/image/upload/v1703768628/madara-error_vogork.png' />
      <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] mt-6 text-center'>Something went wrong</h2>
      <p className='text-lg'>{error.message}</p>
      <Button
        aria-label='go back'
        onClick={() =>
          //refresh the window
          window.location.reload()
        }>
        Try again
      </Button>
    </section>
  );
}

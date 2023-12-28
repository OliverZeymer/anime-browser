'use client';
import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';
export default function Error({ error, reset }) {
  const router = useRouter();

  return (
    <section className='px-4 pt-32 flex flex-col h-full grow gap-6 flex-1 items-center justify-center'>
      <h1 className='text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.15] text-center'>{error.message}</h1>
      <img src='https://res.cloudinary.com/dg1ge7qf8/image/upload/v1703768628/madara-error_vogork.png' />
      <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] mt-6 text-center'>Something went wrong</h2>
      <Button onClick={() => router.back()}>Try again</Button>
    </section>
  );
}

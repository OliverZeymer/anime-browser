
import Link from 'next/link';
import { Button } from './ui/button';

export default function NoResultsFound() {
  return (
    <div className='flex flex-col items-center gap-4'>
      <img src='https://res.cloudinary.com/dg1ge7qf8/image/upload/v1703768628/tobi_ifkylu.png' alt='Tobi' className='mb-6' />
      <h2 className='text-xl md:text-2xl lg:text-3xl font-bold'>No Results Found</h2>
      <p>We sadly couldn&apos;t find any results. Please try again later.</p>
      <Button aria-label='back to home' asChild>
        <Link href='/'>Back to home</Link>
      </Button>
    </div>
  );
}

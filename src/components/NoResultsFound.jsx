
import Link from 'next/link';
import { Button } from './ui/button';

export default function NoResultsFound() {
  return (
    <div className='flex flex-col items-center gap-4'>
      <img src='/images/tobi.png' alt='Tobi' className='mb-6' />
      <h2 className='text-xl md:text-2xl lg:text-3xl font-bold'>No Results Found</h2>
      <p>We sadly couldn&apos;t find any results. Please try again later.</p>
      <Button asChild>
        <Link href='/'>Back to home</Link>
      </Button>
    </div>
  );
}

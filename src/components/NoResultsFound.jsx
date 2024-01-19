import Link from 'next/link';
import { Button } from './ui/button';

export default function NoResultsFound() {
  return (
    <div className='flex flex-col items-center gap-4'>
      <img src='https://res.cloudinary.com/dg1ge7qf8/image/upload/v1703768628/tobi_ifkylu.png' alt='Tobi' className='mb-6 max-w-xs' />
      <h2 className='text-xl md:text-2xl lg:text-3xl font-bold'>No Results Found</h2>
      <p className='text-center'>
        We sadly couldn&apos;t find any results. <br /> Please try again later.
      </p>
    </div>
  );
}

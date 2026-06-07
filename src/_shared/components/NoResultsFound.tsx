import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

export default function NoResultsFound() {
  return (
    <div className='flex flex-col items-center gap-4'>
      <Image
        src='https://res.cloudinary.com/dg1ge7qf8/image/upload/v1703768628/tobi_ifkylu.png'
        alt='Tobi'
        width={320}
        height={320}
        className='mb-6 max-w-xs h-auto w-auto'
      />
      <h2 className='text-xl md:text-2xl lg:text-3xl font-bold'>No Results Found</h2>
      <p className='text-center'>
        We sadly couldn&apos;t find any results. <br /> Please try again later.
      </p>
    </div>
  );
}

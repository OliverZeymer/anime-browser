import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function LandingButton() {
  return (
    <Link href='/anime' className='h-12 group relative flex rounded-md p-[1px] transition-all hover:scale-[1.025] active:scale-[0.975] sm:max-w-[290px]' type='button'>
      <div className='absolute -left-[1.5px] -top-[1.5px] z-[-1] h-[calc(100%+3px)] w-[calc(100%+3px)] overflow-hidden rounded-md'>
        <div className='animate-rotate bg-rainbow group-hover:animation-running absolute -left-[calc(10px/2)] -top-[calc(215px/2)] h-[300px] w-[300px] md:h-[300px] md:w-[300px]' />
      </div>
      <div className='inline-flex items-center justify-center gap-3 rounded-md px-6 py-1.5 bg-[#171717] text-[#fafafa] text-base lg:text-lg font-medium'>
        Browse Anime
        <ArrowUpRight strokeWidth={1.75} className='text-base lg:text-lg' />
      </div>
      <div className='absolute -left-[1.5px] -top-[1.5px] z-[-1] h-[calc(100%+3px)] w-[calc(100%+3px)] overflow-hidden rounded-md opacity-40 blur-lg'>
        <div className='animate-rotate bg-rainbow group-hover:animation-running absolute -left-[calc(10px/2)] -top-[calc(215px/2)] h-[300px] w-[300px] md:h-[300px] md:w-[300px]' />
      </div>
    </Link>
  );
}

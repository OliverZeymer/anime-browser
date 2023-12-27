import SubscribeModalButton from './SubscribeModalButton';
import HeroImageSlider from './HeroImageSlider';
import LandingButton from './HeroButton';
import Link from 'next/link';
import HeroCurrentlyShowing from './HeroCurrentlyShowing';
import HeroProgressBar from './HeroProgressBar';
export default function HeroSection() {
  return (
    <section className='min-h-[80vh] flex flex-col relative w-full'>
      <HeroImageSlider />
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neutral-900 to-purple-500' style={{ mixBlendMode: 'multiply' }} />
      <div className='flex flex-col flex-grow flex-1 justify-center h-full px-4 lg:px-12 z-10 relative max-w-4xl'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15]'>Browse Unlimited Anime Shows, Movies, New Releases and More Content.</h1>
        <p className='text-sm md:text-base lg:text-lg text-white mt-4 font-medium'>
          Enjoy discovering exclusive popular Anime Movies and Shows.
          <br />
          Start browsing your favorite{' '}
          <Link href='/anime' className='font-bold border-b-2 border-white'>
            Anime
          </Link>{' '}
          now
        </p>
        <div className='flex flex-col gap-4 mt-12 sm:flex-row w-fit'>
          <LandingButton />
          <SubscribeModalButton className='text-[#171717] bg-[#fafafa] hover:bg-[#fafafa]/90' />
        </div>
      </div>
      <HeroCurrentlyShowing />
      <HeroProgressBar />
    </section>
  );
}

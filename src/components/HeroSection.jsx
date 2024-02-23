import SubscribeModalButton from './buttons/SubscribeModalButton';
import HeroImageSlider from './HeroImageSlider';
import LandingButton from './buttons/HeroButton';
import Link from 'next/link';
export default function HeroSection() {
  return (
    <section className='min-h-screen sm-height:min-h-screen lg:min-h-[80vh] flex flex-col relative w-full'>
      <HeroImageSlider />
      <div className='flex flex-col flex-grow flex-1 justify-center h-full px-4 lg:px-12 child:z-10 relative max-w-4xl mt-16 lg:mt-0 select-none'>
        <h1 className='text-3xl lg:text-4xl font-bold text-white leading-[1.15] xl:text-5xl 3xl:text-6xl'>Browse Unlimited Anime Shows, Movies, New Releases and More Content.</h1>
        <p className='text-sm lg:text-base text-white mt-4 font-medium leading-relaxed'>
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
    </section>
  );
}

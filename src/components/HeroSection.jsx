import SubscribeModalButton from './SubscribeModalButton';
import HeroImageSlider from './HeroImageSlider';
import LandingButton from './HeroButton';
export default function HeroSection() {

  return (
    <section className='min-h-[80vh] flex flex-col relative w-full'>
      <HeroImageSlider />
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neutral-900 to-purple-500' style={{ mixBlendMode: 'multiply' }}></div>
      <div className='flex flex-col flex-grow flex-1 justify-center h-full px-4 lg:px-12 z-10 relative max-w-4xl'>
        <h1 className='text-6xl font-bold text-white leading-[1.15]'>Browse Unlimited Anime Shows, Movies, New Releases and More Content.</h1>
        <p className='text-lg text-white mt-8'>
          Enjoy browsing exclusive popular Anime Movies and Shows.
          <br />
          Subscribe to
          <span className='font-semibold'> Anime Browser</span> now
        </p>
        <div className='flex flex-col gap-4 mt-12 sm:flex-row w-fit'>
          <LandingButton />
          <SubscribeModalButton />
        </div>
      </div>
    </section>
  );
}

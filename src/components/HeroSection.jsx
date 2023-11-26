'use client';
import SubscribeModalButton from './SubscribeModalButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
export default function HeroSection() {
  const heroImages = ['oshi-no-ko.jpg', 'csm.jpg', 'aot.webp'];

  return (
    <section className='min-h-[80vh] flex flex-col relative w-full'>
      <Swiper effect='fade' modules={[Autoplay, EffectFade]} speed={1000} autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: false }}>
        {heroImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className='absolute inset-0 transition-opacity duration-1000'
              style={{
                backgroundImage: `url(/images/${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neutral-900 to-purple-500' style={{ mixBlendMode: 'multiply' }}></div>
      <div className='flex flex-col flex-grow flex-1 justify-center h-full px-4 lg:px-12 z-10 relative max-w-4xl'>
        <h1 className='text-6xl font-bold text-white leading-[1.15]'>Browse Unlimited Anime Shows, Movies, New Releases and More Content.</h1>
        <p className='text-lg text-white mt-8'>
          Enjoy browsing exclusive popular Anime Movies and Shows.
          <br />
          Subscribe to
          <span className='font-semibold'> Anime Browser</span> now
        </p>
        <div className='flex gap-4 mt-12'>
          <SubscribeModalButton />
        </div>
      </div>
    </section>
  );
}

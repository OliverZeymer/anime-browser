'use client';
import SubscribeModalButton from './SubscribeModalButton';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, watch } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
export default function HeroSection() {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
  const heroImages = ['oshi-no-ko.jpg', 'csm.jpg', 'aot.webp'];
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <section className='min-h-[80vh] flex flex-col relative w-full'>
      <Swiper effect='fade' modules={[Autoplay, EffectFade]} onAutoplayTimeLeft={onAutoplayTimeLeft} speed={1000} autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: false }}>
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
        <div className='absolute right-4 bottom-4 z-10 w-16 h-16 flex items-center justify-center text-white' slot='container-end'>
          <svg className='absolute left-0 top-0 z-10 w-full h-full stroke-purple-500 fill-none' strokeWidth={4} viewBox='0 0 48 48' ref={progressCircle}>
            <circle cx='24' cy='24' r='20'></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
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

'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import { heroImages } from '@/utils/constants';
export default function HeroImageSlider() {
  return (
    <Swiper effect='fade' modules={[Autoplay, EffectFade]} speed={1000} autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: false }}>
      {heroImages.map((image, index) => (
        <SwiperSlide key={index}>
          <div
            className='absolute inset-0 transition-opacity duration-1000'
            style={{
              backgroundImage: `
              linear-gradient(
              to bottom,
            rgba(0, 0, 0, 0.8) 0%, /* Dark color at the top */
            rgba(51, 0, 99, 0.5) 100% /* Purple color at the bottom */
              ),
              url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
export default function HeroImageSlider() {
  const heroImages = ['demonslayer.jpg', 'csm.jpg', 'aot.webp', 'black-clover.jpg'];

  return (
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
  );
}

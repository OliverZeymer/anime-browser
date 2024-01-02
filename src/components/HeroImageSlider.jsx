'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';

import { heroSwiperBackgrounds } from '@/utils/constants';
import Link from 'next/link';
export default function HeroImageSlider() {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<div class="${className}">
      </div>`;
    },
  };
  return (
    <Swiper
      pagination={pagination}
      effect='fade'
      modules={[Autoplay, EffectFade, Pagination]}
      speed={1000}
      autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: false }}>
      {heroSwiperBackgrounds.map((item, index) => (
        <SwiperSlide key={item.id}>
          <Link className='text-lg font-medium z-50 absolute right-2 bottom-2 !pointer-events-auto' href={`/anime/${item.id}`}>
            {item.name}
          </Link>
          <img src={item.image} className='absolute inset-0 h-full w-full object-cover' />
          <div
            style={{
              backgroundImage: `
              linear-gradient(
              to bottom,
            rgba(0, 0, 0, 0.8) 0%, /* Dark color at the top */
            rgba(51, 0, 99, 0.5) 100% /* Purple color at the bottom */
              ),
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              `,
            }}
            className='absolute inset-0 h-full w-full bg-gradient-to-b from-black/75 via-black/50 to-purple-950/50'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

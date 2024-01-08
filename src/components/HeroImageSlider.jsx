'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { heroSwiperBackgrounds } from '@/utils/constants';
import Link from 'next/link';
import { Badge } from './ui/badge';

export default function HeroImageSlider() {
  return (
    <Swiper
      pagination={{
        clickable: true,
        renderBullet: function (index, className) {
          return `<div id="${index}" class="${className}"></div>`;
        },
      }}
      effect='fade'
      modules={[Autoplay, EffectFade, Pagination]}
      loop={true}
      speed={1000}
      autoplay={{ delay: 5000 }}>
      {heroSwiperBackgrounds.map((item, index) => (
        <SwiperSlide key={item.id}>
          <Link className='z-10 font-medium absolute top-20 -translate-1/2 right-1/3 xs:translate-x-0 xs:top-auto lg:right-12 xs:right-6 xs:bottom-2' href={`/anime/${item.id}`}>
            <Badge variant='secondary'>{item.name}</Badge>
          </Link>
          <img src={item.image} className='absolute inset-0 h-full w-full object-cover' />
          <div className='absolute inset-0 h-full w-full bg-gradient-to-b from-black/80 via-black/60 to-purple-950/50' />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

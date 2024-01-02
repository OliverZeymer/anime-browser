'use client';
import Slider from 'react-slick';
import AnimeCard from '@/components/AnimeCard';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';

function PrevArrow(props) {
  const { onClick, className } = props;
  return (
    <button
      className={`absolute !z-30 top-1/2 flex !left-0 rounded-r-2xl text-white transform !h-full !w-fit items-center -translate-y-1/2 !bg-black/75 focus:outline-none ${className}`}
      onClick={onClick}>
      <ChevronLeft size={58} className='inline-block text-primary' />
    </button>
  );
}

function NextArrow(props) {
  const { onClick, className } = props;
  return (
    <button
      className={`absolute !z-30 top-1/2 flex !right-0 rounded-l-2xl text-white transform !h-full !w-fit items-center -translate-y-1/2 !bg-black/50 focus:outline-none ${className}`}
      onClick={onClick}>
      <ChevronRight size={58} className='inline-block text-primary' />
    </button>
  );
}

export default function AnimeSlider({ title, data, href }) {
  const settings = {
    speed: 500,
    slidesToScroll: 5,
    slidesToShow: 8.14,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    infinite: false,
    responsive: [
      {
        breakpoint: 2320,
        settings: {
          slidesToShow: 7.17,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 2220,
        settings: {
          slidesToShow: 6.17,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 5.17,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1650,
        settings: {
          slidesToShow: 4.17,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 3.15,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 1.05,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className='pl-4 lg:pl-12 mt-16'>
      <div className='flex justify-between mb-10 pr-4 lg:pr-12'>
        <h2 className='text-3xl font-bold'>{title}</h2>
        <Link href={href} className='text-lg font-medium flex items-center gap-2 hover:underline'>
          See all
          <ArrowRight size={18} className='inline-block text-primary' />
        </Link>
      </div>
      <Slider {...settings} className='relative'>
        {data?.map((anime) => (
          <AnimeCard key={anime?.mal_id} anime={anime} small />
        ))}
      </Slider>
    </section>
  );
}

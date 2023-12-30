'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { featuredAnime } from '@/utils/constants';

export default function HeroCurrentlyShowing() {
  const [anime, setAnime] = useState(featuredAnime[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const index = featuredAnime.findIndex((a) => a.id === anime.id);
      if (index === featuredAnime.length - 1) {
        setAnime(featuredAnime[0]);
      } else {
        setAnime(featuredAnime[index + 1]);
      }
    }, 6000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [anime, featuredAnime]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className='absolute bottom-6 right-1/2 translate-x-1/2 z-20'>
      <Link href={`/anime/${anime.id}`}>
        <AnimatePresence mode='wait'>
          <motion.div key={anime.id} className='text-xl border-b-2 border-neutral-300 font-bold text-neutral-300' variants={fadeInUp} initial='initial' animate='animate' exit='exit'>
            {anime.name}
          </motion.div>
        </AnimatePresence>
      </Link>
    </div>
  );
}

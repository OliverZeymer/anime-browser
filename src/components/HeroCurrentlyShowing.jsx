'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function HeroCurrentlyShowing() {
  const animes = [
    {
      name: 'Demon Slayer',
      id: '51019',
    },
    {
      name: 'Chainsaw Man',
      id: '44511',
    },
    {
      name: 'Attack on Titan',
      id: '16498',
    },
    {
      name: 'Black Clover',
      id: '34572',
    }
  ];
  const [anime, setAnime] = useState(animes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const index = animes.findIndex((a) => a.id === anime.id);
      if (index === animes.length - 1) {
        setAnime(animes[0]);
      } else {
        setAnime(animes[index + 1]);
      }
    }, 6000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [anime, animes]);

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

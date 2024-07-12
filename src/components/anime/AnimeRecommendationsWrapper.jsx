'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';

const AnimeRecommendations = dynamic(() => import('./AnimeRecommendations'), {
  ssr: false,
});

export default function ClientAnimeRecommendationsWrapper({ id }) {
  const [isRecommendationsVisible, setIsRecommendationsVisible] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      setIsRecommendationsVisible(true);
    }
  }, [inView]);

  return (
    <div ref={ref}>
      {isRecommendationsVisible && <AnimeRecommendations id={id} />}
    </div>
  );
}

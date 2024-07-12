'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import Loader from '../Loader';

const AnimeReviewList = dynamic(() => import('./AnimeReviewList'), {
  loading: () => <Loader size='lg' />,
});

export default function ClientAnimeReviewListWrapper({ id, isActive }) {
  const [isReviewListVisible, setIsReviewListVisible] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && isActive) {
      setIsReviewListVisible(true);
    }
  }, [inView, isActive]);

  return <div ref={ref}>{isReviewListVisible && <AnimeReviewList id={id} />}</div>;
}

'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import 'swiper/css';
import 'swiper/css/effect-fade';
export default function HeroImageSlider() {
  const heroImages = ['demonslayer.jpg', 'csm.jpg', 'aot.webp'];
  const progressBar = useRef(null);
  const [progress, setProgress] = useState(100);
  function startAnimation () {
    const finalProgress = 0;
    const duration = 5000; // Total animation duration in milliseconds
    const interval = 100; // Interval between updates in milliseconds
    const steps = duration / interval;
    const stepSize = (100 - finalProgress) / steps;

    let currentProgress = 100;
    let timer = setInterval(() => {
      currentProgress -= stepSize;
      setProgress(Math.max(finalProgress, currentProgress));

      if (currentProgress <= finalProgress) {
        clearInterval(timer);
        // Gradually increase the progress during the pause
        const pauseDuration = 1000;
        const pauseInterval = 100;
        const pauseSteps = pauseDuration / pauseInterval;
        const pauseStepSize = 100 / pauseSteps;

        let pauseProgress = 0;
        const pauseTimer = setInterval(() => {
          pauseProgress += pauseStepSize;
          setProgress(Math.min(100, pauseProgress));

          if (pauseProgress >= 100) {
            clearInterval(pauseTimer);
            // Restart the animation after the pause
            setTimeout(() => {
              setProgress(100);
              startAnimation();
            }, 0); // Use 0ms delay to avoid any noticeable gap
          }
        }, pauseInterval);
      }
    }, interval);
  };

  useEffect(() => {
    startAnimation(); // Start the animation initially
  }, []);

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
      <Progress value={progress} className='w-12 absolute z-20 bottom-6 h-2 right-6' />
    </Swiper>
  );
}

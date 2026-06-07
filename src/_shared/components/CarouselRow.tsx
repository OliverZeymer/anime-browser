'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, useCarousel } from '@/components/ui/carousel';
import { CAROUSEL_CONTENT_CLASS, CAROUSEL_OPTS } from '@/utils/carouselLayout';
import { cn } from '@/libs/cn';
import type { ReactNode } from 'react';

type CarouselSurface = 'background' | 'primary-foreground';

const SURFACE_FADE_CLASS: Record<CarouselSurface, string> = {
  background: 'from-background via-background/80',
  'primary-foreground': 'from-primary-foreground via-primary-foreground/80',
};

const SURFACE_BUTTON_CLASS: Record<CarouselSurface, string> = {
  background: 'bg-background/95 hover:bg-background',
  'primary-foreground': 'bg-primary-foreground/95 hover:bg-primary-foreground',
};

type CarouselRowNavProps = {
  surface?: CarouselSurface;
};

const CarouselRowNav = ({ surface = 'background' }: CarouselRowNavProps) => {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();
  const fadeClass = SURFACE_FADE_CLASS[surface];
  const buttonSurfaceClass = SURFACE_BUTTON_CLASS[surface];

  return (
    <>
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r to-transparent transition-opacity duration-200 sm:w-16 md:w-24',
          fadeClass,
          canScrollPrev ? 'opacity-100' : 'opacity-0'
        )}
      />
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l to-transparent transition-opacity duration-200 sm:w-16 md:w-24',
          fadeClass,
          canScrollNext ? 'opacity-100' : 'opacity-0'
        )}
      />

      <Button
        type='button'
        variant='secondary'
        size='icon'
        aria-label='Scroll row left'
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        className={cn(
          'absolute left-1 top-1/2 z-20 h-9 w-9 -translate-y-1/2 rounded-full border border-border/60 shadow-md backdrop-blur-sm transition-all hover:scale-105 sm:left-2 md:left-4 md:h-11 md:w-11',
          buttonSurfaceClass,
          !canScrollPrev && 'pointer-events-none opacity-0'
        )}>
        <ChevronLeft className='h-5 w-5' />
      </Button>

      <Button
        type='button'
        variant='secondary'
        size='icon'
        aria-label='Scroll row right'
        disabled={!canScrollNext}
        onClick={scrollNext}
        className={cn(
          'absolute right-1 top-1/2 z-20 h-9 w-9 -translate-y-1/2 rounded-full border border-border/60 shadow-md backdrop-blur-sm transition-all hover:scale-105 sm:right-2 md:right-4 md:h-11 md:w-11',
          buttonSurfaceClass,
          !canScrollNext && 'pointer-events-none opacity-0'
        )}>
        <ChevronRight className='h-5 w-5' />
      </Button>
    </>
  );
};

type Props = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  surface?: CarouselSurface;
};

export const CarouselRow = ({ children, className, contentClassName, surface = 'background' }: Props) => {
  return (
    <Carousel opts={CAROUSEL_OPTS} className={cn('relative w-full', className)}>
      <CarouselContent className={cn(CAROUSEL_CONTENT_CLASS, contentClassName)}>{children}</CarouselContent>
      <CarouselRowNav surface={surface} />
    </Carousel>
  );
};

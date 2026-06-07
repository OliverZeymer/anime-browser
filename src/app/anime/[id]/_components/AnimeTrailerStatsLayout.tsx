'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/libs/cn';

export const useSyncedColumnHeight = (dependency?: unknown) => {
  const sourceRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const node = sourceRef.current;

    if (!node) {
      return;
    }

    const updateHeight = () => {
      setHeight(node.getBoundingClientRect().height);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(node);

    return () => {
      resizeObserver.disconnect();
    };
  }, [dependency]);

  return { sourceRef, height };
};

type Props = {
  trailer: ReactNode;
  statistics: ReactNode;
  dependency?: unknown;
};

export const AnimeTrailerStatsLayout = ({ trailer, statistics, dependency }: Props) => {
  const { sourceRef, height } = useSyncedColumnHeight(dependency);

  return (
    <div className='flex w-full flex-col gap-6 2xl:flex-row 2xl:items-start'>
      <div ref={sourceRef} className='w-full 2xl:w-[70%]'>
        {trailer}
      </div>
      <div
        className='w-full 2xl:w-[30%]'
        style={height ? { height } : undefined}>
        {statistics}
      </div>
    </div>
  );
};

type PanelProps = {
  children: ReactNode;
  className?: string;
};

export const AnimeTrailerStatsPanel = ({ children, className }: PanelProps) => {
  return (
    <div className={cn('flex h-full min-h-0 flex-col', className)}>
      {children}
    </div>
  );
};

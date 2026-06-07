'use client';

import { DialogTrigger } from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ZoomInIcon } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/libs/cn';

type Props = {
  src: string;
  alt: string;
  className?: string;
  variant?: 'poster' | 'avatar';
};

export const ClickableImageTrigger = ({ src, alt, className, variant = 'poster' }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === 'avatar') {
    return (
      <DialogTrigger
        className={cn('relative block w-full max-w-[11rem]', className)}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}>
        <div className='relative aspect-square w-full overflow-hidden rounded-2xl'>
          <Image src={src} alt={alt} fill sizes='176px' className='object-cover' />
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className='absolute inset-0 z-10 flex items-center justify-center bg-black/30'>
                <ZoomInIcon className='text-white' size={28} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogTrigger>
    );
  }

  return (
    <DialogTrigger
      className='relative mx-auto w-full xs:max-w-xs'
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}>
      <Image
        src={src}
        alt={alt}
        width={300}
        height={450}
        sizes='(max-width: 480px) 100vw, 300px'
        className={cn(
          'mx-auto w-full rounded-2xl object-cover xs:max-w-xs md:h-[450px] md:w-[300px]',
          className
        )}
      />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className='absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/30'>
            <ZoomInIcon className='text-white' size={40} />
          </motion.div>
        )}
      </AnimatePresence>
    </DialogTrigger>
  );
};

export default ClickableImageTrigger;

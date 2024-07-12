'use client';

import { DialogTrigger } from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ZoomInIcon } from 'lucide-react';
import { useState } from 'react';

export default function ClickableImageTrigger({ src, alt, className }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <DialogTrigger className='w-full xs:max-w-xs mx-auto relative' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img src={src} alt={alt} className={`w-full xs:max-w-xs mx-auto md:w-[300px] md:h-[450px] rounded-2xl object-cover ${className}`} />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className='absolute inset-0 flex items-center z-10 justify-center bg-black bg-opacity-30 rounded-2xl'>
            <ZoomInIcon size={40} />
          </motion.div>
        )}
      </AnimatePresence>
    </DialogTrigger>
  );
}

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ImagePlus } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export default function ClickableImage({ src, alt, width, height, className }) {
  return (
    <Dialog>
      <DialogTrigger className='w-full relative'>
        {/* <Button className='absolute top-2 right-2 z-10 rounded-full p-1.5 h-auto bg-black/75 backdrop-blur-sm hover:bg-black/90'>
          <Link href='pictures'>
            <ImagePlus color='#fafafa' size={20} />
          </Link>
        </Button> */}

        <img src={src} alt={alt} className={cn(`w-full xs:w-3/4 sm:w-1/2 mx-auto md:w-[300px] md:h-[450px] rounded-2xl relative object-cover`, className)} />
      </DialogTrigger>
      <DialogContent isImageModal className='bg-transparent border-0 p-0'>
        <img
          src={src}
          alt={alt}
          className={`h-full w-screen ${width && `max-w-${width}`} 
        ${height && `max-h-${height}`}
        px-4 md:px-0 md:w-full rounded relative object-cover`}
        />
      </DialogContent>
    </Dialog>
  );
}

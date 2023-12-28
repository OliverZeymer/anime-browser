import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export default function ClickableImage({ src, alt, width, height, className }) {
  return (
    <Dialog>
      <DialogTrigger>
        <img src={src} alt={alt} className={cn(`w-full xs:w-3/4 sm:w-1/2 md:w-[300px] md:h-[450px] rounded-2xl relative object-cover`, className)} />
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

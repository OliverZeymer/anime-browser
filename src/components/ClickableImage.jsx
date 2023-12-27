import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import Image from 'next/image';
export default function ClickableImage({ src, alt, width, height, className }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Image src={src} alt={alt} width={width} height={height} className={cn('w-full xs:w-3/4 sm:w-1/2 md:w-[300px] md:h-[450px] rounded-2xl relative object-cover', className)} />
      </DialogTrigger>
      <DialogContent isImageModal className='bg-transparent border-0 p-0'>
        <Image src={src} alt={alt} width={width} height={height} className='h-full w-screen px-4 md:px-0 md:w-full rounded relative object-cover' />
      </DialogContent>
    </Dialog>
  );
}

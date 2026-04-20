import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ImagePlus, ZoomInIcon } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import ClickableImageTrigger from './ClickableImageTrigger';
import Image from 'next/image';

export default function ClickableImage({ src, alt, width, height, className }) {
  return (
    <Dialog>
      {/* <Button className='absolute top-2 right-2 z-10 rounded-full p-1.5 h-auto bg-black/75 backdrop-blur-sm hover:bg-black/90'>
          <Link href='pictures'>
            <ImagePlus color='#fafafa' size={20} />
          </Link>
        </Button> */}
      <ClickableImageTrigger src={src} alt={alt} className={className} />
      <DialogContent isFullModal className='bg-transparent border-0 p-0'>
        <div className='relative w-screen max-h-[90vh] min-h-[40vh] px-4 md:px-0 md:w-full'>
          {src ? <Image src={src} alt={alt ?? ''} fill className='rounded object-contain' sizes='100vw' /> : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

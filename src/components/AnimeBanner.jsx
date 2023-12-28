import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
export default function AnimeBanner({ anime }) {
  return (
    <div className='relative flex flex-col items-center gap-6 justify-center h-[300px] lg:h-[400px] mt-16 lg:mt-0'>
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neutral-700 to-transparent' style={{ mixBlendMode: 'multiply' }} />
      <img
        src={anime?.images?.webp?.large_image_url}
        alt={anime?.title_english}
        className='absolute inset-0 -z-10 blur-md object-cover w-full h-[300px] lg:h-[400px] select-none'
      />
      <div className='z-10 mt-12 lg:mt-[120px] flex flex-col items-center justify-center gap-6'>
        <h1 className='text-2xl text-center sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white'>{anime?.title_english ? anime?.title_english : anime?.title}</h1>
        <h2 className='text-lg text-center md:text-xl lg:text-2xl text-white z-10'>{anime?.title_japanese}</h2>
      </div>
      <div className='flex justify-center items-center gap-6 z-10'>
        <Button className='bg-white text-black hover:bg-white/90'>
          <Bookmark size={20} />
          <span className='ml-2'>Add to list</span>
        </Button>
      </div>
    </div>
  );
}

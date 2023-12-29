import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
export default function AnimeBanner({ anime }) {
  return (
    <div className='relative flex flex-col items-center gap-3 md:gap-6 justify-center md:h-72 xl:h-96 mt-16 lg:mt-0'>
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neutral-700 to-transparent' style={{ mixBlendMode: 'multiply' }} />
      <img src={anime?.images?.webp?.large_image_url} alt={anime?.title_english} className='absolute inset-0 -z-10 blur-md object-cover w-full h-44 md:h-72 xl:h-96 select-none' />
      <div className='z-10 mt-6 md:mt-12 lg:mt-[120px] flex flex-col items-center justify-center gap-3'>
        <h1 className='text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white'>{anime?.title_english ? anime?.title_english : anime?.title}</h1>
        <h2 className='text-lg text-center md:text-xl lg:text-2xl text-white z-10'>{anime?.title_japanese}</h2>
      </div>
      <div className='flex justify-center items-center z-10'>
        <Button aria-label='bookmark' className='bg-white text-black hover:bg-white/90'>
          <Bookmark size={20} />
          <span className='ml-2'>Add to list</span>
        </Button>
      </div>
    </div>
  );
}

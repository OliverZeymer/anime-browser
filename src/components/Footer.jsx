import { Socials } from '@/utils/constants';
import SubscribeModalButton from './SubscribeModalButton';
export default function Footer() {
  return (
    <footer className='py-8 px-4 lg:px-12 mt-16 w-full mx-auto relative overflow-hidden lg:overflow-visible'>

      <div className={`mx-auto flex flex-col gap-8`}>
        <div className='flex items-center justify-between flex-wrap gap-5'>
          <h4 className='font-bold md:text-6xl text-5xl'>
            Become a member
          </h4>
          <SubscribeModalButton />
        </div>
        <div className='flex flex-col'>
          <div className='mb-12 bg-muted-foreground h-[2px]' />
          <div className='flex items-center justify-between flex-wrap gap-4'>
            <h4 className='font-extrabold text-2xl'>Anime Browser</h4>
            <p className='font-normal text-sm text-muted-foreground'>Copyright &copy; 2023 - 2023 Anime Browser. All rights reserved.</p>
            <div className='flex gap-4'>
              {Socials.map((social) => (
                <social.icon key={social.label} className='w-6 h-6 object-contain cursor-pointer' />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
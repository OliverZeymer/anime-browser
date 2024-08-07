import { Socials } from '@/utils/constants';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer className='py-8 mt-16 w-full mx-auto relative overflow-hidden lg:overflow-visible'>
      <div className='mb-12 bg-muted-foreground h-[2px]' />
      <div className={`mx-auto px-4 lg:px-12 flex flex-col gap-8`}>
        <div className='flex flex-col'>
          <div className='flex items-center justify-between flex-wrap gap-4'>
            <Link href='/' className='flex gap-2 items-center'>
              <img className='w-8 h-8 object-contain' src='/images/logo.png' alt='Anime Browser Logo' />
              <h4 className='font-extrabold text-2xl'>Anime Browser</h4>
            </Link>
            <p className='font-normal text-sm text-muted-foreground'>Copyright &copy; 2023 - 2023 Anime Browser. All rights reserved.</p>
            <div className='flex gap-4'>
              {/* {Socials.map((social) => (
                <social.icon key={social.label} className='w-6 h-6 object-contain cursor-pointer' />
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

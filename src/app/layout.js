import NextTopLoader from 'nextjs-toploader';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '@/lib/utils';
import TopLevelClient from '@/components/TopLevelClient';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';

const gilroy = localFont({
  src: [
    {
      path: '../../public/fonts/Gilroy-Light.ttf',
      weight: '300',
    },
    {
      path: '../../public/fonts/Gilroy-Regular.ttf',
      weight: '400',
    },
    {
      path: '../../public/fonts/Gilroy-Medium.ttf',
      weight: '500',
    },
    {
      path: '../../public/fonts/Gilroy-SemiBold.ttf',
      weight: '600',
    },
    {
      path: '../../public/fonts/Gilroy-Bold.ttf',
      weight: '700',
    },
    {
      path: '../../public/fonts/Gilroy-ExtraBold.ttf',
      weight: '800',
    },
  ],
  variable: '--font-gilroy',
});

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='h-full dark'>
      <body className={cn('relative h-full font-sans antialiased', gilroy.variable)}>
        <TopLevelClient>
          <NextTopLoader color='#5A2E98' />
          <Navbar />
          <main className='relative flex flex-col min-h-screen'>
            <div className='flex-grow flex-1'>{children}</div>
          </main>
          <Toaster />
        </TopLevelClient>
      </body>
    </html>
  );
}

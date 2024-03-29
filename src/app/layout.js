import NextTopLoader from 'nextjs-toploader';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '@/lib/utils';
import TopLevelClient from '@/components/TopLevelClient';
import Navbar from '@/components/global/nav/Navbar';
import { Toaster } from '@/components/ui/sonner';
import Footer from '@/components/global/Footer';
import ThemeProvider from '@/components/global/ThemeProvider';
import { GeistSans } from 'geist/font/sans';
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

export const metadata = {
  title: 'Anime Browser',
  icons: {
    icon: './favicon.ico',
    shortcut: './favicon.ico',
    apple: './apple-icon.png',
  },
  description:
    'Anime Browser is the best platform to browse anime completely free. We have a huge libraro of over 24,000 anime and a user friendly interface. Come sign up and start bookmarking and learning about your favorite anime.',
  keywords: 'anime, anime browser, anime browser app, anime browser website, anime browser online, anime browser free, anime browser free online, anime browser free website',
};
export const revalidate = 3600;
export default function RootLayout({ children }) {
  return (
    <html lang='en' className={`${GeistSans.className} dark antialiased`} style={{ colorScheme: 'dark' }}>
      <body className={cn('relative h-full font-sans')}>
        <TopLevelClient>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <NextTopLoader color='#5A2E98' />
            <Navbar />
            <div className='w-full flex flex-col relative min-h-screen'>
              <main className='grow'>
                <div className='flex-grow flex-1'>{children}</div>
              </main>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </TopLevelClient>
      </body>
    </html>
  );
}

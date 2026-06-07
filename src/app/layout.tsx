import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import { cn } from '@/libs/cn';
import TopLevelClient from '@/components/TopLevelClient';
import Navbar from '@/components/global/nav/Navbar';
import { Toaster } from '@/components/ui/sonner';
import Footer from '@/components/global/Footer';
import ThemeProvider from '@/components/global/ThemeProvider';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Anime Browser',
  description:
    'Anime Browser is the best platform to browse anime completely free. We have a huge libraro of over 24,000 anime and a user friendly interface. Come sign up and start bookmarking and learning about your favorite anime.',
  keywords:
    'anime, anime browser, anime browser app, anime browser website, anime browser online, anime browser free, anime browser free online, anime browser free website',
};

export const revalidate = 3600;

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang='en' className='antialiased' suppressHydrationWarning>
      <body className={cn('relative h-full', inter.className)}>
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
};

export default RootLayout;

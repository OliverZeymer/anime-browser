import NextTopLoader from 'nextjs-toploader';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '@/lib/utils';
import TopLevelClient from '@/components/TopLevelClient';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/Footer';
import QueryClientProviderComponent from '@/components/QueryClientProviderComponent';
import ThemeProvider from '@/components/ThemeProvider';

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
    <html lang='en' className='h-full dark' style={{ colorScheme: 'dark' }}>
      <body className={cn('relative h-full font-sans antialiased', gilroy.variable)}>
        <TopLevelClient>
          <QueryClientProviderComponent>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
              <NextTopLoader color='#5A2E98' />
              <Navbar />
              <div className='w-full flex flex-col relative overflow-x-hidden min-h-screen'>
                <main className='grow'>
                  <div className='flex-grow flex-1'>{children}</div>
                </main>
                <Footer />
              </div>
              <Toaster />
            </ThemeProvider>
          </QueryClientProviderComponent>
        </TopLevelClient>
      </body>
    </html>
  );
}

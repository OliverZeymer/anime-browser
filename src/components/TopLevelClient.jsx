'use client';
import { usePathname, useRouter } from 'next/navigation';
import * as NProgress from 'nprogress';
import { useEffect } from 'react';
import ContextProvider from './ContextProvider';
export default function TopLevelClient({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    NProgress.done();
  }, [pathname, router]);

  return <ContextProvider>{children}</ContextProvider>;
}

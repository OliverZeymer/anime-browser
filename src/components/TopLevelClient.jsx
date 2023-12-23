'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as NProgress from 'nprogress';
import { useEffect } from 'react';
import ContextProvider from './ContextProvider';
export default function TopLevelClient({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  useEffect(() => {
    NProgress.done();
  }, [pathname, router, searchParams]);

  return <ContextProvider>{children}</ContextProvider>;
}

'use client';

import { usePathname, useRouter } from 'next/navigation';
import * as NProgress from 'nprogress';
import { useEffect } from 'react';
import { AuthProvider } from '@/providers/AuthProvider';

type Props = {
  children: React.ReactNode;
};

const TopLevelClient = ({ children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    NProgress.done();
  }, [pathname, router]);

  return <AuthProvider>{children}</AuthProvider>;
};

export default TopLevelClient;

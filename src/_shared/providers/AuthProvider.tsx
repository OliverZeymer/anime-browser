'use client';

import { useEffect, useState } from 'react';
import { getCookie, setCookie } from 'react-use-cookie';
import { toast } from 'sonner';
import { AuthContext } from '@/providers/AuthContext';
import { verifyToken } from '@/libs/auth/verify-token';
import type { AuthUser } from '@/types/auth';

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState<AuthUser | false>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const cookieToken = getCookie('token');

      if (!cookieToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await verifyToken(cookieToken);

        if (response.success && response.user) {
          setAuth(response.user);
        } else {
          setCookie('token', '', { days: 0 });
          toast('You have been logged out', {
            description: 'See you soon!',
          });
        }
      } catch {
        toast('An error has occurred while logging you in', {
          description: 'Please try logging in again',
        });
        setCookie('token', '', { days: 0 });
      } finally {
        setIsLoading(false);
      }
    };

    void checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoading, cookieCheckDone: !isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

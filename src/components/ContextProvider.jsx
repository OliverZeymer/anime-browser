'use client';
import { useEffect, useState } from 'react';
import AuthContext from '@/contexts/AuthContext';
import { getCookie, setCookie } from 'react-use-cookie';
import axios from 'axios';
import { useToast } from './ui/use-toast';

export default function ContextProvider({ children }) {
  const [auth, setAuth] = useState(false);
  const [cookieCheckDone, setCookieCheckDone] = useState(true);
  const { toast } = useToast();

  async function checkToken() {
    const CookieToken = getCookie('token');
    if (CookieToken) {
      try {
        const response = await axios.get('/api/auth/verifytoken', {
          headers: {
            Authorization: `Bearer ${CookieToken}`,
          },
        });
        if (response.data.success) {
          setAuth(response.data.user);
        } else {
          setCookie('token', '', { days: 0 });
          toast({
            description: 'You have been logged out',
          });
        }
      } catch (error) {
        console.log(error);
        toast({
          description: 'You have been logged out',
        });
        setCookie('token', '', { days: 0 });
      } finally {
        setCookieCheckDone(true);
      }
    } else {
      setCookieCheckDone(true);
    }
  }

  useEffect(() => {
    checkToken();
  }, []);
  return <AuthContext.Provider value={{ auth, setAuth, cookieCheckDone }}>{children}</AuthContext.Provider>;
}

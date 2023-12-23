'use client';
import { useEffect, useState } from 'react';
import AuthContext from '@/contexts/AuthContext';
import { getCookie } from 'react-use-cookie';
import axios from 'axios';
import { useToast } from './ui/use-toast';

export default function ContextProvider({ children }) {
  const [auth, setAuth] = useState(false);
  const [cookieCheckDone, setCookieCheckDone] = useState(false);
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
          setAuth(false);
          toast({
            description: 'You have been logged out',
          });
        }
      } catch (error) {
        console.log(error);
        setAuth(false);
        toast({
          description: 'You have been logged out',
        });
      } finally {
        setCookieCheckDone(true);
      }
    } else {
      setCookieCheckDone(true);
      setAuth(false);
    }
  }

  useEffect(() => {
    checkToken();
  }, []);
  return <AuthContext.Provider value={{ auth, setAuth, cookieCheckDone }}>{children}</AuthContext.Provider>;
}

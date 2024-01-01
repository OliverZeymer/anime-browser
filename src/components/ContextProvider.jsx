'use client';
import { useEffect, useState } from 'react';
import AuthContext from '@/contexts/AuthContext';
import { getCookie, setCookie } from 'react-use-cookie';
import axios from 'axios';
import { toast } from 'sonner';

export default function ContextProvider({ children }) {
  const [auth, setAuth] = useState(false);
  const [cookieCheckDone, setCookieCheckDone] = useState(false);

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
          toast('You have been logged out', {
            description: 'See you soon!',
          });
        }
      } catch (error) {
        console.log(error);
        toast('An error has occurred while loggin you in', {
          description: 'Please try logging in again',
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
    async function initialize() {
      await checkToken();
      setCookieCheckDone(true);
    }

    initialize();
  }, []);
  return <AuthContext.Provider value={{ auth, setAuth, cookieCheckDone }}>{children}</AuthContext.Provider>;
}

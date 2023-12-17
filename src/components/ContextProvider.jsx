'use client';
import { useEffect, useState } from 'react';
import AuthContext from '@/contexts/AuthContext';
import { getCookie } from 'react-use-cookie';
import axios from 'axios';
import { useToast } from './ui/use-toast';

export default function ContextProvider({ children }) {
  const [auth, setAuth] = useState(false);
  const { toast } = useToast();
  console.log(auth);
  async function checkToken() {
    const CookieToken = getCookie('token');
    if (CookieToken) {
      try {
        const response = await axios.get('/api/auth/checkToken', {
          headers: {
            Authorization: `Bearer ${CookieToken}`,
          },
        });
        if (response.data.success) {
          setAuth(true);
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
      }
    }
  }

  useEffect(() => {
    checkToken();
  }, []);
  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

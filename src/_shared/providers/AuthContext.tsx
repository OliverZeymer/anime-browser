import { createContext } from 'react';
import type { AuthContextValue } from '@/types/auth';

export const AuthContext = createContext<AuthContextValue>({
  auth: false,
  setAuth: () => {},
  isLoading: true,
  cookieCheckDone: false,
});

import jwt from 'jsonwebtoken';
import { AUTH_CONFIG, assertAuthConfig } from '@/config/auth';

export const signToken = (email: string): string => {
  assertAuthConfig();

  return jwt.sign({ email }, AUTH_CONFIG.TOKEN_SECRET!);
};

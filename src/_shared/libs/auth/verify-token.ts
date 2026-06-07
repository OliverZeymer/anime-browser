'use server';

import jwt from 'jsonwebtoken';
import { AUTH_CONFIG } from '@/config/auth';
import { connectToDB } from '@/libs/database';
import { User } from '@/libs/models/user.model';
import type { AuthUser, JwtPayload } from '@/types/auth';
import type { ApiResponse } from '@/types/api';

const serializeUser = (user: unknown): AuthUser => {
  return JSON.parse(JSON.stringify(user)) as AuthUser;
};

export const verifyToken = async (token: string): Promise<ApiResponse<AuthUser>> => {
  if (!AUTH_CONFIG.TOKEN_SECRET) {
    return { success: false, message: 'Server configuration error' };
  }

  await connectToDB();

  try {
    const decodedToken = jwt.verify(token, AUTH_CONFIG.TOKEN_SECRET) as JwtPayload;
    const user = await User.findOne({ email: decodedToken.email }).lean();

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    return { success: true, user: serializeUser(user) };
  } catch {
    return { success: false, message: 'Invalid token' };
  }
};

'use server';

import bcrypt from 'bcrypt';
import { connectToDB } from '@/libs/database';
import { User } from '@/libs/models/user.model';
import { signToken } from '@/libs/auth/sign-token';
import type { ApiResponse } from '@/types/api';
import type { AuthUser } from '@/types/auth';

type LoginResult = {
  user: AuthUser;
  token: string;
};

export const login = async (
  email: string,
  password: string,
): Promise<ApiResponse<LoginResult>> => {
  if (!email || !password) {
    return { success: false, message: 'Missing email or password' };
  }

  await connectToDB();

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { success: false, message: 'Invalid credentials' };
    }

    const token = signToken(email);
    const userObject = user.toObject();
    delete (userObject as { password?: string }).password;

    return {
      success: true,
      message: 'User authenticated successfully',
      data: {
        user: JSON.parse(JSON.stringify(userObject)) as AuthUser,
        token,
      },
    };
  } catch {
    return { success: false, message: 'Internal Server Error' };
  }
};

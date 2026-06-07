'use server';

import { connectToDB } from '@/libs/database';
import { User } from '@/libs/models/user.model';
import { signToken } from '@/libs/auth/sign-token';
import type { ApiResponse } from '@/types/api';
import type { AuthUser } from '@/types/auth';

type CreateUserInput = {
  email: string;
  password: string;
  username: string;
  discord?: string;
};

type CreateUserResult = {
  user: AuthUser;
  token: string;
};

export const createUser = async (
  input: CreateUserInput,
): Promise<ApiResponse<CreateUserResult>> => {
  await connectToDB();

  try {
    const existingEmail = await User.findOne({ email: input.email });

    if (existingEmail) {
      return { success: false, message: 'Email already exists' };
    }

    const existingUsername = await User.findOne({ username: input.username });

    if (existingUsername) {
      return { success: false, message: 'Username already exists' };
    }

    const user = await User.create(input);
    const token = signToken(user.email);

    return {
      success: true,
      data: {
        user: JSON.parse(JSON.stringify(user)) as AuthUser,
        token,
      },
    };
  } catch {
    return { success: false, message: 'Internal Server Error' };
  }
};

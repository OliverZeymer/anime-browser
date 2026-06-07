'use server';

import mongoose from 'mongoose';
import { connectToDB } from '@/libs/database';
import { User } from '@/libs/models/user.model';
import type { ApiResponse } from '@/types/api';
import type { AuthUser } from '@/types/auth';

const serializeDoc = (doc: unknown): AuthUser => {
  return JSON.parse(JSON.stringify(doc)) as AuthUser;
};

const fetchUserPublicById = async (
  id: string,
): Promise<ApiResponse<AuthUser>> => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return { success: false, message: 'Invalid user ID.' };
  }

  await connectToDB();
  const user = await User.findById(id, { password: 0 }).lean();

  if (!user) {
    return { success: false, message: 'User not found.' };
  }

  return {
    success: true,
    message: 'User fetched successfully.',
    data: serializeDoc(user),
  };
};

export const getUserPublicById = fetchUserPublicById;

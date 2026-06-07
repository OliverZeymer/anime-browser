'use server';

import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_CONFIG } from '@/config/cloudinary';
import { connectToDB } from '@/libs/database';
import { User } from '@/libs/models/user.model';
import type { ApiResponse } from '@/types/api';
import type { AuthUser } from '@/types/auth';

type UpdateProfileInput = {
  email: string;
  image?: string;
  username?: string;
  description?: string;
  discord?: string;
};

export const updateProfile = async (
  input: UpdateProfileInput,
): Promise<ApiResponse<AuthUser>> => {
  cloudinary.config({
    cloud_name: CLOUDINARY_CONFIG.CLOUD_NAME,
    api_key: CLOUDINARY_CONFIG.API_KEY,
    api_secret: CLOUDINARY_CONFIG.API_SECRET,
  });

  await connectToDB();
  const currentUser = await User.findOne({ email: input.email });

  if (!currentUser) {
    return { success: false, message: 'User not found.' };
  }

  if (input.image) {
    try {
      if (currentUser.profilePicture) {
        const publicId = currentUser.profilePicture.split('/').pop()?.split('.')[0];

        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }

      const imageUrl = await cloudinary.uploader.upload(input.image);
      const updatedUser = await User.findOneAndUpdate(
        { email: input.email },
        { profilePicture: imageUrl.secure_url },
        { new: true },
      );

      return {
        success: true,
        message: 'Profile picture updated successfully.',
        data: JSON.parse(JSON.stringify(updatedUser)) as AuthUser,
      };
    } catch {
      return { success: false, message: 'Profile picture update failed.' };
    }
  }

  if (input.username || input.description !== undefined || input.discord !== undefined) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email: input.email },
        {
          ...(input.username ? { username: input.username } : {}),
          ...(input.description !== undefined ? { description: input.description } : {}),
          ...(input.discord !== undefined ? { discord: input.discord } : {}),
        },
        { new: true },
      );

      return {
        success: true,
        message: 'Username updated successfully.',
        data: JSON.parse(JSON.stringify(updatedUser)) as AuthUser,
      };
    } catch {
      return { success: false, message: 'Username update failed.' };
    }
  }

  return { success: false, message: 'No update provided.' };
};

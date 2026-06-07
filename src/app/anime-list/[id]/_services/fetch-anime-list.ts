'use server';

import mongoose from 'mongoose';
import { connectToDB } from '@/libs/database';
import { AnimeList } from '@/libs/models/animelist.model';
import { User } from '@/libs/models/user.model';
import type { AnimeListDocument } from '@/libs/models/animelist.model';
import type { ApiResponse } from '@/types/api';

const serializeDoc = <T>(doc: T | null): T | null => {
  if (!doc) {
    return null;
  }

  return JSON.parse(JSON.stringify(doc)) as T;
};

const fetchAnimeListForUser = async (
  userId: string,
): Promise<ApiResponse<AnimeListDocument> & { animeList?: AnimeListDocument | null }> => {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return { success: false, message: 'Invalid user ID.' };
  }

  await connectToDB();
  const user = await User.findById(userId, { password: 0 }).lean();

  if (!user) {
    return { success: false, message: 'User not found.' };
  }

  const animeList = await AnimeList.findOne({ user: userId }).lean();

  return {
    success: true,
    animeList: serializeDoc(animeList) as AnimeListDocument | null,
  };
};

export const getAnimeListForUser = fetchAnimeListForUser;

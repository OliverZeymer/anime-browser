import mongoose from 'mongoose';
import AnimeList from '@/models/animelist.model';
import User from '@/models/user.model';
import { connectToDB } from '@/utils/database';

function serializeDoc(doc) {
  if (!doc) return null;
  return JSON.parse(JSON.stringify(doc));
}

export async function getUserPublicById(id) {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return { success: false, message: 'Invalid user ID.', data: null };
  }
  await connectToDB();
  const user = await User.findById(id, { password: 0 }).lean();
  if (!user) {
    return { success: false, message: 'User not found.', data: null };
  }
  return {
    success: true,
    message: 'User fetched successfully.',
    data: serializeDoc(user),
  };
}

export async function getAnimeListForUser(userId) {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return { success: false, message: 'Invalid user ID.', animeList: null };
  }
  await connectToDB();
  const user = await User.findById(userId, { password: 0 }).lean();
  if (!user) {
    return { success: false, message: 'User not found.', animeList: null };
  }
  const animeList = await AnimeList.findOne({ user: userId }).lean();
  return {
    success: true,
    animeList: serializeDoc(animeList),
  };
}

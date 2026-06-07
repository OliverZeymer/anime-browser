'use server';

import mongoose from 'mongoose';
import { connectToDB } from '@/libs/database';
import { AnimeList } from '@/libs/models/animelist.model';
import { User } from '@/libs/models/user.model';
import type { SavedAnimeEntry } from '@/types/saved-anime';
import type { ApiResponse } from '@/types/api';

const animeEntryExists = (animeList: SavedAnimeEntry[], malId: number) => {
  return animeList.some((entry) => entry.mal_id === malId);
};

export const addAnimeToList = async (
  userId: string,
  anime: SavedAnimeEntry,
): Promise<ApiResponse<null>> => {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return { success: false, message: 'Invalid user ID.' };
  }

  await connectToDB();
  const user = await User.findById(userId, { password: 0 });

  if (!user) {
    return { success: false, message: 'User not found.' };
  }

  try {
    const existingAnimeList = await AnimeList.findOne({ user: userId });

    if (existingAnimeList) {
      if (animeEntryExists(existingAnimeList.anime, anime.mal_id)) {
        return { success: false, message: 'Anime already exists in the list.' };
      }

      existingAnimeList.anime.push(anime);
      user.savedAnime.push(String(anime.mal_id));
      await user.save();
      await existingAnimeList.save();

      return { success: true, message: 'Anime added to the list successfully.' };
    }

    const newAnimeList = new AnimeList({
      user: userId,
      anime: [anime],
    });
    user.savedAnime.push(String(anime.mal_id));
    await user.save();
    await newAnimeList.save();

    return { success: true, message: 'Anime list created successfully.' };
  } catch {
    return { success: false, message: 'Something went wrong.' };
  }
};

export const removeAnimeFromList = async (
  userId: string,
  animeId: string,
): Promise<ApiResponse<null>> => {
  await connectToDB();
  const user = await User.findById(userId, { password: 0 });

  if (!user) {
    return { success: false, message: 'User not found.' };
  }

  try {
    const animeList = await AnimeList.findOne({ user: userId });

    if (!animeList) {
      return { success: false, message: 'Anime list not found.' };
    }

    const animeIndex = animeList.anime.findIndex(
      (entry) => entry.mal_id.toString() === animeId,
    );

    if (animeIndex === -1) {
      return { success: false, message: 'Anime not found in the list.' };
    }

    animeList.anime.splice(animeIndex, 1);
    user.savedAnime = user.savedAnime.filter((id) => id !== animeId);
    await user.save();
    await animeList.save();

    return { success: true, message: 'Anime removed from the list successfully.' };
  } catch {
    return { success: false, message: 'Something went wrong.' };
  }
};

const fetchAnimeListByUserId = async (userId: string) => {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return { success: false as const, message: 'Invalid user ID.' };
  }

  await connectToDB();
  const user = await User.findById(userId, { password: 0 });

  if (!user) {
    return { success: false as const, message: 'User not found.' };
  }

  const animeList = await AnimeList.findOne({ user: userId });
  return { success: true as const, animeList };
};

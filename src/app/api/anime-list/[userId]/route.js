import User from '@/models/user.model';
import AnimeList from '@/models/animelist.model';
import { connectToDB } from '@/utils/database';
import mongoose from 'mongoose';

export async function POST(req, context) {
  await connectToDB();

  const incomingAnimeList = await req.json();
  const { userId } = context.params;

  // Check if userId is defined and is a valid ObjectId
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return new Response(JSON.stringify({ success: false, message: 'Invalid user ID.' }), { status: 400 });
  }

  const user = await User.findById(userId, { password: 0 });

  if (!user) {
    return new Response(JSON.stringify({ success: false, message: 'User not found.' }), { status: 404 });
  }

  try {
    let existingAnimeList = await AnimeList.findOne({ user: userId });

    if (existingAnimeList) {
      const newAnimeEntry = incomingAnimeList.anime;
      if (!animeEntryExists(existingAnimeList.anime, newAnimeEntry.mal_id)) {
        existingAnimeList.anime.push(newAnimeEntry);
        user.savedAnime.push(newAnimeEntry.mal_id);
        await user.save();
        await existingAnimeList.save();
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Anime added to the list successfully.',
          }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Anime already exists in the list.',
          }),
          { status: 400 }
        );
      }
    } else {
      const newAnimeList = new AnimeList({
        user: userId,
        anime: [incomingAnimeList.anime],
      });
      user.savedAnime.push(incomingAnimeList.anime.mal_id);
      await user.save();
      await newAnimeList.save();
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Anime list created successfully.',
        }),
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ success: false, message: 'Something went wrong.' }), { status: 500 });
  }
}

export async function GET(req, context) {
  await connectToDB();

  const { userId } = context.params;
  const user = await User.findById(userId, { password: 0 });

  if (!user) {
    return new Response(JSON.stringify({ success: false, message: 'User not found.' }), { status: 404 });
  }

  try {
    const animeList = await AnimeList.findOne({ user: userId });
    return new Response(JSON.stringify({ success: true, animeList }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ success: false, message: 'Something went wrong.' }), { status: 500 });
  }
}



// Helper function to check if an anime entry already exists in the list
function animeEntryExists(animeList, malId) {
  return animeList.some((entry) => entry.mal_id === malId);
}

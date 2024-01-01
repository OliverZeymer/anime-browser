import User from '@/models/user.model';
import AnimeList from '@/models/animelist.model';
import { connectToDB } from '@/utils/database';

export async function DELETE(req, context) {
  await connectToDB();

  const { userId } = context.params;
  const { animeId } = context.params;
  const user = await User.findById(userId, { password: 0 });

  if (!user) {
    return new Response(JSON.stringify({ success: false, message: 'User not found.' }), { status: 404 });
  }
  try {
    const animeList = await AnimeList.findOne({ user: userId });
    if (animeList) {
      const { anime } = animeList;
      const animeIndex = anime.findIndex((entry) => entry.mal_id.toString() === animeId);

      if (animeIndex !== -1) {
        anime.splice(animeIndex, 1);
        user.savedAnime.pull(animeId);
        await user.save();
        await animeList.save();
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Anime removed from the list successfully.',
          }),
          { status: 200 }
        );
      } else {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Anime not found in the list.',
          }),
          { status: 404 }
        );
      }
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Anime list not found.',
        }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ success: false, message: 'Something went wrong.' }), { status: 500 });
  }
}

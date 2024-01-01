import axios from 'axios';

export async function addAnimeToList(anime, userId, setIsLoading, setIsAdded, toast, auth, setAuth) {
  try {
    setIsLoading(true);
    const response = await axios.post(
      `/api/anime-list/${userId}`,
      {
        anime,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );
    if (response.data.success) {
      setAuth({ ...auth, savedAnime: [...auth.savedAnime, anime.mal_id.toString()] });
      toast('Added to list', {
        description: 'This anime has been added to your list',
      });
    } else {
      toast('Something went wrong', {
        description: "We couldn't add this anime to your list",
      });
    }
  } catch (error) {
    console.log('Error:', error);
  } finally {
    setIsLoading(false);
    setIsAdded(true);
  }
}

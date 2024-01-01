import axios from 'axios';

export async function removeAnimeFromList(animeId, animeTitle, userId, setIsLoading, setIsAdded, toast, auth, setAuth) {
  try {
    setIsLoading(true);
    const response = await axios.delete(`/api/anime-list/${userId}/${animeId.toString()}`, {});
    if (response.data.success) {
      setAuth({ ...auth, savedAnime: auth.savedAnime.filter((id) => id !== animeId.toString()) });
      toast('Removed from list', {
        description: `${animeTitle} has been removed from your list.`,
      });
    } else {
      toast(`Couldn't remove ${animeTitle} from list`, { description: 'Something went wrong' });
    }
  } catch (error) {
    console.log('Error:', error);
  } finally {
    setIsLoading(false);
    setIsAdded(false);
  }
}

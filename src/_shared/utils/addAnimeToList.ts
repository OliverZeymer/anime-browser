import { addAnimeToList as addAnimeToListAction } from '@/libs/anime-list/manage-anime-list';
import type { AuthUser } from '@/types/auth';
import type { SavedAnimeEntry } from '@/types/saved-anime';

type ToastFn = (title: string, options?: { description?: string }) => void;

export const addAnimeToList = async (
  anime: SavedAnimeEntry,
  userId: string,
  setIsLoading: (loading: boolean) => void,
  setIsAdded: (added: boolean) => void,
  toast: ToastFn,
  auth: AuthUser,
  setAuth: (user: AuthUser | false) => void,
) => {
  try {
    setIsLoading(true);
    const response = await addAnimeToListAction(userId, anime);

    if (response.success) {
      setAuth({
        ...auth,
        savedAnime: [...(auth.savedAnime ?? []), anime.mal_id.toString()],
      });
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
};

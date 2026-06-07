import { removeAnimeFromList as removeAnimeFromListAction } from '@/libs/anime-list/manage-anime-list';
import type { AuthUser } from '@/types/auth';

type ToastFn = (title: string, options?: { description?: string }) => void;

export const removeAnimeFromList = async (
  animeId: number,
  animeTitle: string,
  userId: string,
  setIsLoading: (loading: boolean) => void,
  setIsAdded: (added: boolean) => void,
  toast: ToastFn,
  auth: AuthUser,
  setAuth: (user: AuthUser | false) => void,
) => {
  try {
    setIsLoading(true);
    const response = await removeAnimeFromListAction(userId, animeId.toString());

    if (response.success) {
      setAuth({
        ...auth,
        savedAnime: (auth.savedAnime ?? []).filter((id) => id !== animeId.toString()),
      });
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
};

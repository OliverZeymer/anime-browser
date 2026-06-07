'use client';
import { useContext, useState } from 'react';
import { Button } from '../ui/button';
import { Bookmark, ListX, Loader2 } from 'lucide-react';
import { AuthContext } from '@/providers/AuthContext';
import { isAuthUser } from '@/types/auth';
import { toast } from 'sonner';
import { addAnimeToList } from '@/utils/addAnimeToList';
import { removeAnimeFromList } from '@/utils/removeAnimeFromList';
import type { SavedAnimeEntry } from '@/types/saved-anime';

type Props = {
  userId: string;
  anime: SavedAnimeEntry;
};

export default function AddToListButton({ userId, anime }: Props) {
  const { auth, setAuth } = useContext(AuthContext);
  const isAddedFromAuth = isAuthUser(auth) && Boolean(auth.savedAnime?.includes(anime.mal_id.toString()));
  const [isAddedOverride, setIsAdded] = useState<boolean | null>(null);
  const isAdded = isAddedOverride ?? isAddedFromAuth;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      onClick={() => {
        if (!isAuthUser(auth)) {
          return;
        }
        isAdded
          ? removeAnimeFromList(anime?.mal_id, anime?.title_english || anime?.title || anime?.title_japanese || '', auth._id, setIsLoading, setIsAdded, toast, auth, setAuth)
          : isLoading
          ? null
          : addAnimeToList(anime, auth._id, setIsLoading, setIsAdded, toast, auth, setAuth);
      }}
      aria-label='bookmark'
      className='bg-white text-black hover:bg-white/90'>
      {isLoading ? (
        <>
          <Loader2 className='mr-2 h-5 w-5 animate-spin' />
          <span>Adding...</span>
        </>
      ) : isAdded ? (
        <>
          <ListX size={20} className='mr-2' />
          <span>Remove from List</span>
        </>
      ) : (
        <>
          <Bookmark size={20} className='mr-2' />
          <span>Add to list</span>
        </>
      )}
    </Button>
  );
}

'use client';
import { useContext, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Bookmark, ListX } from 'lucide-react';
import Loader from './Loader';
import AuthContext from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { addAnimeToList } from '@/utils/addAnimeToList';
import { removeAnimeFromList } from '@/utils/removeAnimeFromList';
export default function AddToListButton({ userId, anime }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (auth?.savedAnime?.includes(anime.mal_id.toString())) {
      setIsAdded(true);
    }
  }, [auth, anime]);

  return (
    <Button
      onClick={() => {
        isAdded
          ? removeAnimeFromList(anime?.mal_id, anime?.title_english || anime?.title || anime?.title_japanese, auth?._id, setIsLoading, setIsAdded, toast, auth, setAuth)
          : isLoading
          ? null
          : addAnimeToList(anime, auth?._id, setIsLoading, setIsAdded, toast, auth, setAuth);
      }}
      aria-label='bookmark'
      className='bg-white text-black hover:bg-white/90'>
      {isLoading ? (
        <>
          <Loader size={20} className='mr-2' />
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

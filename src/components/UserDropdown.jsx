'use client';
import { ListVideo, LogOut, ShieldHalf, User, UserCog } from 'lucide-react';
import Link from 'next/link';
import { setCookie } from 'react-use-cookie';
import AuthContext from '@/contexts/AuthContext';
import { useContext } from 'react';
import { toast } from 'sonner';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

export default function UserDropdown() {
  const { auth, setAuth } = useContext(AuthContext);

  function logOut() {
    setCookie('token', '', 0);
    setAuth(false);
    toast('You have been logged out', {
      description: 'See you soon!',
    });
  }
  return (
    <DropdownMenuContent align='end'>
      <DropdownMenuLabel className='text-base'>{auth?.username}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href={`/profile/${auth?._id}`} className='flex items-center gap-2 rounded-lg cursor-pointer'>
          <User size={20} />
          <p>My Profile</p>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href={`/profile/${auth?._id}?edit=true`} className='flex items-center gap-2 rounded-lg cursor-pointer'>
          <UserCog size={20} />
          <p>Edit Profile</p>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href={`/anime-list/${auth?._id}`} className='flex items-center gap-2 rounded-lg cursor-pointer'>
          <ListVideo size={20} />
          <p>Anime List</p>
        </Link>
      </DropdownMenuItem>
      {auth?.role === 'admin' && (
        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href='/admin' className='flex items-center gap-2 rounded-lg cursor-pointer'>
              <ShieldHalf size={20} />
              <p>Admin Panel</p>
            </Link>
          </DropdownMenuItem>
        </>
      )}
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <button onClick={logOut} className='flex items-center w-full gap-2 rounded-lg cursor-pointer'>
          <LogOut color='red' size={20} />
          <p>Sign Out</p>
        </button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

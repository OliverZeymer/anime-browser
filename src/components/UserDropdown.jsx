'use client';
import { LogOut, User, UserCog } from 'lucide-react';
import Link from 'next/link';
import { setCookie } from 'react-use-cookie';
import AuthContext from '@/contexts/AuthContext';
import { useContext } from 'react';
import { useToast } from './ui/use-toast';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

export default function UserDropdown() {
  const { auth, setAuth } = useContext(AuthContext);
  const { toast } = useToast();
  console.log(auth);

  function logOut() {
    setCookie('token', '', 0);
    setAuth(false);
    toast({
      description: 'You have been logged out',
    });
  }
  return (
    <DropdownMenuContent>
      <DropdownMenuLabel>
        <p>{auth?.username}</p>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href={`/profile/${auth?._id}`} className='flex items-center gap-2 rounded-lg'>
          <User size={20} />
          <p>My Profile</p>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href={`/profile/${auth?._id}?edit=true`} className='flex items-center gap-2 rounded-lg'>
          <UserCog size={20} />
          <p>Edit Profile</p>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <button onClick={logOut} className='flex items-center w-full gap-2'>
          <LogOut color='red' size={20} />
          <p>Sign Out</p>
        </button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

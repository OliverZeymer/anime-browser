import UserDropdown from './UserDropdown';
import SignUpModalButton from './SignUpModalButton';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { User } from 'lucide-react';

export default function NavbarAvatar({ auth, cookieCheckDone }) {
  return (
    <>
      {cookieCheckDone ? (
        <>
          {!auth ? (
            <SignUpModalButton />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className='outline-none'>
                {auth?.profilePicture ? (
                  <img
                    className={auth?.profilePicture ? 'rounded-full w-10 h-10 object-cover' : 'rounded-full border border-gray-400 w-10 h-10 object-cover'}
                    src={auth?.profilePicture}
                    alt='user-profile'
                  />
                ) : (
                  <div className='rounded-full border border-primary flex items-center justify-center w-10 h-10' >
                    <User size={26} className='text-primary' />
                  </div>
                )}
              </DropdownMenuTrigger>
              <UserDropdown />
            </DropdownMenu>
          )}
        </>
      ) : (
        <Skeleton className='w-10 h-10 rounded-full' />
      )}
    </>
  );
}

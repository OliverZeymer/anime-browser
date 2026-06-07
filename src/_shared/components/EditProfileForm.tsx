'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '@/providers/AuthContext';
import { updateProfile } from '@/libs/user/update-profile';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { DialogHeader } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import type { AuthUser } from '@/types/auth';

type Props = {
  data: { user: AuthUser };
  refetch?: () => void;
};

const EditProfileForm = ({ data, refetch }: Props) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const description = formData.get('description') as string;
    const discord = formData.get('discord') as string;

    if (!email) {
      toast('Please enter a valid email', {
        description: 'You need to enter a valid email to continue',
      });
      return;
    }

    try {
      setIsLoading(true);
      const result = await updateProfile({
        email: data.user.email,
        username: username || undefined,
        description,
        discord,
      });

      if (result.success && result.data) {
        toast('Changes applied', { description: 'Your changes have been applied.' });

        if (auth && auth._id === data.user._id) {
          setAuth({ ...auth, ...result.data, description, discord });
        }

        refetch?.();
      } else {
        toast(result.message || 'An error has occurred', {
          description: 'Please try again',
        });
      }
    } catch {
      toast('An error has occurred', { description: 'Please try again' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='bg-'>
      <div className='flex justify-between w-full items-center'>
        <DialogHeader className='text-2xl lg:text-3xl xl:text-4xl font-bold text-center text-white text-shadow'>
          Edit Profile
        </DialogHeader>
      </div>
      <div className='flex flex-col lg:flex-row items-center lg:gap-16 justify-center'>
        <div className='flex flex-col w-full gap-1'>
          <label htmlFor='username' className='text-lg text-white'>
            Username
          </label>
          <Input
            type='text'
            name='username'
            id='username'
            placeholder='Username'
            defaultValue={data?.user?.username}
          />
        </div>
        <div className='flex flex-col w-full gap-1'>
          <label htmlFor='email' className='text-lg text-white'>
            Email
          </label>
          <Input
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            defaultValue={data?.user?.email}
          />
        </div>
      </div>
      <div className='flex items-center flex-col lg:flex-row lg:gap-16 justify-center'>
        <div className='flex flex-col w-full gap-1'>
          <label htmlFor='discord' className='text-lg text-white'>
            Discord
          </label>
          <Input
            type='text'
            name='discord'
            id='discord'
            defaultValue={data?.user?.discord}
            placeholder='Discord'
          />
        </div>
      </div>
      <div className='flex flex-col w-full gap-1'>
        <label htmlFor='description' className='text-lg text-white'>
          Description
        </label>
        <Textarea
          placeholder='Description'
          name='description'
          id='description'
          defaultValue={data?.user?.description}
        />
      </div>

      <Button aria-label='apply changes' className='w-fit mx-auto mt-6' type='submit'>
        {isLoading ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Apply Changes'}
      </Button>
    </form>
  );
};

export default EditProfileForm;

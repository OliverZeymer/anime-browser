'use client';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '@/contexts/AuthContext';
import { useToast } from './ui/use-toast';
import DiscordIcon from './icons/DiscordIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import ProfilePictureForm from '@/components/ProfilePictureUploader';
import EditProfileForm from '@/components/EditProfileForm';
import { Edit, User } from 'lucide-react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useSearchParams } from 'next/navigation';
export default function ProfileInfo({ data, id, refetch }) {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { auth } = useContext(AuthContext);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const editParam = searchParams.get('edit');

  useEffect(() => {
    if (auth?._id === id) {
      setIsMyProfile(true);
    }
  }, [auth, id]);
  useEffect(() => {
    if (editParam === 'true' && isMyProfile) {
      setShowEditModal(true);
    }
  }, [editParam, isMyProfile]);
  return (
    <article className='bg-primary-foreground md:w-fit overflow-hidden mx-auto p-6 rounded-xl shadow-xl relative'>
      <div className='flex items-center space-x-4 justify-center'>
        {isMyProfile ? (
          <>
            <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
              <DialogTrigger className='absolute top-4 right-4 text-2xl hover:brightness-75 transition-colors cursor-pointer'>
                <Edit size={16} />
              </DialogTrigger>
              <DialogContent className='bg-black'>
                <EditProfileForm data={data} refetch={refetch} />
              </DialogContent>
            </Dialog>
            <ProfilePictureForm />
          </>
        ) : data?.user?.image ? (
          <img src={data?.user?.image} alt={data?.user?.username + ' profile avatar'} className='rounded-full w-24 h-24 object-cover' />
        ) : (
          <User className='w-24 h-24' />
        )}
        <div>
          <h1 className=''>{data.username}</h1>
          <div className='cursor-pointer flex items-center'>
            <p>
              {data?.email}
            </p>
          </div>
          {data?.discord && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <div className='flex gap-2 items-center'>
                    <DiscordIcon className='w-5 h-5' />
                    <p>{data?.discord}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Discord Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </article>
  );
}

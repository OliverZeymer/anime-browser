'use client';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '@/components/Loader';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '@/contexts/AuthContext';
import ProfileInfo from '@/components/ProfileInfo';
import ErrorCard from '@/components/ErrorCard';
import { Edit } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import BackgroundBlur from '@/components/BackgroundBlur';
import EditProfileForm from '@/components/EditProfileForm';
import ProfilePictureForm from '@/components/ProfilePictureUploader';
import Image from 'next/image';
export default function ProfilePage({ params }) {
  const id = params.id;
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  const { auth } = useContext(AuthContext);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const { data, isLoading, error, refetch } = useQuery(
    ['profile', id],
    async () => {
      setIsLoadingProfile(true);
      const response = await axios.get(`/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setIsLoadingProfile(false);
      return response.data.data;
    },
    { enabled: isLoadingProfile }
  );

  useEffect(() => {
    if (auth?._id === id) {
      setIsMyProfile(true);
    }
  }, [auth, id]);

  // useEffect(() => {
  //   if (location?.search === '?edit=true' && isMyProfile) {
  //     setShowEditModal(true);
  //   }
  // }, [location, isMyProfile]);
  return (
    <section className='section'>
      <AnimatePresence>
        {showEditModal && (
          <BackgroundBlur isOpen={showEditModal} setIsOpen={setShowEditModal}>
            <EditProfileForm data={data} setShowEditModal={setShowEditModal} refetch={refetch} />
          </BackgroundBlur>
        )}
      </AnimatePresence>
      {isLoadingProfile || isLoading ? (
        <div className='w-full flex mx-auto'>
          <Loader />
        </div>
      ) : error ? (
        <ErrorCard message={error?.message ? error?.message : 'Der skete en fejl. Prøv igen senere eller skriv til en administrator'} />
      ) : (
        <>
          <article className='flex flex-col items-center justify-center gap-3 bg-primary-foreground md:w-fit overflow-hidden mx-auto p-6 rounded-xl shadow-xl relative'>
            {(auth?.role === 'admin' || auth?.role === 'superadmin' || isMyProfile) && (
              <Edit onClick={() => setShowEditModal(true)} className='absolute top-4 right-4 text-2xl hover:brightness-75 transition-colors cursor-pointer' />
            )}
            {isMyProfile ? (
              <ProfilePictureForm />
            ) : data?.user?.image ? (
              <Image width={200} height={200} src={data?.user?.image} alt={data?.user?.email + ' profile avatar'} className='rounded-full w-32 h-32 xl:w-48 xl:h-48 object-cover' />
            ) : (
              <p>logo</p>
            )}
            <ProfileInfo data={data} isMyProfile={isMyProfile} />
          </article>
        </>
      )}
    </section>
  );
}

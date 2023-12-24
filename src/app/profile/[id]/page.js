'use client';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '@/components/Loader';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '@/contexts/AuthContext';
import ProfileInfo from '@/components/ProfileInfo';
import ErrorCard from '@/components/ErrorCard';
import { AnimatePresence } from 'framer-motion';
import BackgroundBlur from '@/components/BackgroundBlur';

export default function ProfilePage({ params }) {
  const id = params.id;
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const { auth } = useContext(AuthContext);
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

  return (
    <section className='section'>
      {isLoadingProfile || isLoading ? (
        <div className='w-full flex mx-auto'>
          <Loader size="lg" />
        </div>
      ) : error ? (
        <ErrorCard message={error?.message ? error?.message : 'Der skete en fejl. Prøv igen senere eller skriv til en administrator'} />
      ) : (
        <ProfileInfo data={data} id={id} refetch={refetch} />
      )}
    </section>
  );
}

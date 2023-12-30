'use client';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '@/components/Loader';
import { Suspense, useContext, useState } from 'react';
import AuthContext from '@/contexts/AuthContext';
import ProfileInfo from '@/components/ProfileInfo';
import ErrorCard from '@/components/ErrorCard';

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
          <Loader size='lg' />
        </div>
      ) : error ? (
        <ErrorCard message={error?.message ? error?.message : 'Error'} />
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileInfo data={data} id={id} refetch={refetch} />
        </Suspense>
      )}
    </section>
  );
}

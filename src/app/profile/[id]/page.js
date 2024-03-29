import Loader from '@/components/Loader';
import { Suspense } from 'react';
import ProfileInfo from '@/components/ProfileInfo';
import { getProfile } from '@/utils/api';

export default async function ProfilePage({ params }) {
  const id = params.id;
  const profileData = await getProfile(id);
  return (
    <section className='section'>
      <Suspense
        fallback={
          <div className='w-full flex mx-auto'>
            <Loader size='lg' />
          </div>
        }>
        <ProfileInfo data={profileData.data} id={id} />
      </Suspense>
    </section>
  );
}
export const dynamic = 'force-dynamic';

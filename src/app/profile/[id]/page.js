import Loader from '@/components/Loader';
import { Suspense } from 'react';
import ProfileInfo from '@/components/ProfileInfo';
import { getUserPublicById } from '@/lib/server/userData';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function ProfilePage({ params }) {
  const id = params.id;
  const profileData = await getUserPublicById(id);
  if (!profileData.success || !profileData.data) {
    notFound();
  }
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

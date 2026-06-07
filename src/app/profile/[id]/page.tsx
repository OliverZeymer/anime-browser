import { ProfileInfoSkeleton } from '@/components/ProfileInfoSkeleton';
import { Suspense } from 'react';
import ProfileInfo from '@/components/ProfileInfo';
import { getUserPublicById } from '@/app/profile/[id]/_services/fetch-user-public';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export const revalidate = 60;

const ProfilePage = async ({ params }: Props) => {
  const { id } = await params;
  const profileData = await getUserPublicById(id);

  if (!profileData.success || !profileData.data) {
    notFound();
  }

  return (
    <section className='section'>
      <Suspense fallback={<ProfileInfoSkeleton />}>
        <ProfileInfo data={profileData.data} id={id} />
      </Suspense>
    </section>
  );
};

export default ProfilePage;

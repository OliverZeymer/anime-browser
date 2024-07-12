'use client';

import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Loader from '../Loader';

const AnimeRecommendationsWrapper = dynamic(() => import('@/components/anime/AnimeRecommendationsWrapper'), {
  loading: () => <Loader size='lg' />,
});

const AnimeReviewListWrapper = dynamic(() => import('@/components/anime/AnimeReviewListWrapper'), {
  loading: () => <Loader size='lg' />,
});

export default function AnimeTabs({ id }) {
  const [activeTab, setActiveTab] = useState('recommended');

  return (
    <Tabs defaultValue='recommended' className='mt-6 px-4' onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value='recommended'>Recommended</TabsTrigger>
        <TabsTrigger value='reviews'>Reviews</TabsTrigger>
      </TabsList>
      <div className='min-h-[500px]'>
        <TabsContent value='recommended'>
          <Suspense fallback={<Loader size='lg' />}>
            <AnimeRecommendationsWrapper id={id} />
          </Suspense>
        </TabsContent>
        <TabsContent value='reviews'>
          <Suspense fallback={<Loader size='lg' />}>
            <AnimeReviewListWrapper id={id} isActive={activeTab === 'reviews'} />
          </Suspense>
        </TabsContent>
      </div>
    </Tabs>
  );
}

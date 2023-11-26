import { getAnimeById } from '@/utils/api';

export default async function AnimePage({params}) {
  const animeResponse = await getAnimeById(params.id);
  const animeData = await animeResponse.json()
  return (
     <div className='h-screen w-full flex items-center justify-center text-5xl font-semibold'>
        {animeData?.data?.title}
     </div>
  );

}
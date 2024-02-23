import ErrorCard from '../ErrorCard';
import PrimaryCard from '../PrimaryCard';

export default function AnimeYoutubeEmbed({ url, title }) {
  const urlWithoutAutoplay = url?.replace('&autoplay=1', '&autoplay=0');
  return (
    <PrimaryCard className='w-full 2xl:w-[70%] h-full flex flex-col'>
      <h3 className='text-xl lg:text-2xl font-bold mb-6'>{title}</h3>
      {urlWithoutAutoplay ? (
        <iframe
          src={urlWithoutAutoplay}
          title='YouTube video player'
          className='aspect-video w-full rounded-2xl'
          allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;'
          allowFullScreen></iframe>
      ) : (
        <ErrorCard className='w-full h-full flex flex-col items-center justify-center' message={`No ${title} found.`}></ErrorCard>
      )}
    </PrimaryCard>
  );
}

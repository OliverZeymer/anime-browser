export default function AnimeTrailer({ trailer }) {
  const trailerWithoutAutoplay = trailer?.replace('&autoplay=1', '&autoplay=0');
  return (
    <div className='bg-primary-foreground p-4 rounded-2xl h-fit'>
      <h3 className='text-xl lg:text-2xl font-bold'>Trailer</h3>
      <iframe
        src={trailerWithoutAutoplay}
        title='YouTube video player'
        className='aspect-video w-full rounded-2xl mt-4 max-w-[2000px]'
        allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;'
        allowFullScreen></iframe>
    </div>
  );
}

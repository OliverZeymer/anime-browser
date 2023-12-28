export default function AnimeTrailer({trailer}) {
  return (
    <div className='bg-primary-foreground p-4 rounded-2xl h-fit'>
      <h3 className='text-xl lg:text-2xl font-bold'>Trailer</h3>
      <iframe
        src={trailer + '&autoplay=0'}
        title='YouTube video player'
        className='aspect-video w-full rounded-2xl mt-4 max-w-[2000px]'
        allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;'
        allowFullScreen></iframe>
    </div>
  );
}
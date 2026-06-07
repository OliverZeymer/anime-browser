import ScrollingCard from './ScrollingCard';

export default function ScrollingCards() {
  return (
    <section className='w-full justify-between items-center flex flex-col lg:flex-row gap-24 xl:gap-32 pl-4 lg:pl-12 mt-16'>
      <div className='flex flex-col w-fit'>
        <h3 className='text-3xl font-bold text-white'>What we provide</h3>
        <p className='text-white mt-2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatibus, voluptate, quia, quos officiis voluptatum quod voluptates quibusdam fugit doloribus consequatur.
          Quisquam voluptatibus, voluptate, quia, quos officiis voluptatum quod voluptates quibusdam fugit doloribus consequatur.
        </p>
      </div>
      <div className='relative overflow-hidden w-full'>
        <div className='pointer-events-none absolute -top-1 z-10 h-20 w-full bg-gradient-to-b from-background to-transparent' />
        <div className='pointer-events-none absolute -bottom-1 z-10 h-20 w-full bg-gradient-to-t from-background to-transparent' />
        <div className='pointer-events-none absolute -left-1 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent' />
        <div className='pointer-events-none absolute -right-1 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent' />
        <div className='mx-auto grid h-[350px] w-[300px] animate-skew-scroll grid-cols-1 gap-6 sm:w-[500px] sm:grid-cols-2'>
          <ScrollingCard />
          <ScrollingCard />
          <ScrollingCard />
          <ScrollingCard />
          <ScrollingCard />
          <ScrollingCard />
          <ScrollingCard />
          <ScrollingCard />
          <ScrollingCard />
          <ScrollingCard />
        </div>
      </div>
    </section>
  );
}

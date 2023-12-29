export default function Banner({ children }) {
  return (
    <div className='relative flex flex-col items-center gap-6 md:h-72 xl:h-96 justify-center'>
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neutral-700 to-transparent' style={{ mixBlendMode: 'multiply' }} />
      {children}
    </div>
  );
}

export default function StickyAside({ children }) {
  return <aside className='flex flex-col self-start gap-2 w-full items-center md:items-start md:min-w-[300px] md:sticky md:top-4 md:w-[300px]'>{children}</aside>;
}

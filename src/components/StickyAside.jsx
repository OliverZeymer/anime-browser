import { cn } from '@/lib/utils';

export default function StickyAside({ children, className }) {
  return <aside className={cn('md:top-4 md:sticky', className)}>{children}</aside>;
}

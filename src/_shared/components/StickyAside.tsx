import { cn } from '@/libs/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function StickyAside({ children, className }: Props) {
  return <aside className={cn('md:top-16 lg:top-4 md:sticky', className)}>{children}</aside>;
}

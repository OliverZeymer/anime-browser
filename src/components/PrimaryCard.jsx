import { cn } from '@/lib/utils';

export default function PrimaryCard({ children, className }) {
  return <div className={cn('bg-primary-foreground p-4 rounded-2xl', className)}>{children}</div>;
}

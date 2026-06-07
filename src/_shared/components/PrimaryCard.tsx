import { cn } from '@/libs/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function PrimaryCard({ children, className }: Props) {
  return <div className={cn('bg-primary-foreground shadow-lg p-4 rounded-2xl border-2', className)}>{children}</div>;
}

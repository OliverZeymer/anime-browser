import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';

export default function Loader({ className, size }) {
  return <Loader2Icon className={cn(`animate-spin flex mx-auto text-primary ${size === 'lg' ? 'w-20 h-20' : 'w-6 h-6'}`, className)} />;
}

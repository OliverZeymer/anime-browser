import { Check } from 'lucide-react';
import PrimaryCard from './PrimaryCard';

export default function ScrollingCard() {
  return (
    <PrimaryCard className='flex cursor-pointer select-none items-center space-x-2 rounded-md border bg-gradient-to-br from-primary-foreground/25 to-primary-foreground border-primary/25 p-5 shadow-md transition-all hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-xl'>
      <Check class='h-6 w-6 flex-none text-violet-600' size={24} />
      <p className=''>Priority support</p>
    </PrimaryCard>
  );
}

import { AlertCircle } from 'lucide-react';

type Props = {
  message: string;
  className?: string;
};

export default function ErrorCard({ message, className }: Props) {
  return (
    <div className={`card flex items-center flex-col border-2 rounded-2xl py-4 px-2 border-white ${className ?? ''}`}>
      <AlertCircle className='w-12 h-12 mx-auto' />
      <h3 className='text-lg xl:text-xl font-semibold'>{message}</h3>
    </div>
  );
}

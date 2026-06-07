'use client';

import { Check, Copy } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { usePathname } from 'next/navigation';
import { cn } from '@/libs/cn';
import { toast } from 'sonner';
import { APP_CONFIG } from '@/config/app';
import { useState } from 'react';

type Props = {
  className?: string;
};

const CopyInput = ({ className }: Props) => {
  const pathname = usePathname();
  const url = `${APP_CONFIG.PUBLIC_HOST}${pathname}`;
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        navigator.clipboard.writeText(url);
        setCopied(true);
        toast('You have successfully copied the URL', {
          description: 'Your URL has been copied to your clipboard. You can now share it with others.',
        });
        setTimeout(() => {
          setCopied(false);
        }, 3500);
      }}
      className='relative w-full cursor-pointer'>
      <div className={cn('relative w-full cursor-pointer', className)}>
        <Input
          type='text'
          value={url}
          readOnly
          style={{ caretColor: 'transparent' }}
          className='cursor-pointer hover:opacity-80 group w-full text-base border-0 bg-primary-foreground focus:outline-none select-none focus:ring-0 focus:ring-transparent focus:ring-offset-0'
        />
        <Button className='absolute right-2 p-1 h-auto top-1/2 -translate-y-1/2 bg-primary'>
          {copied ? (
            <Check size={16} className='text-primary-background' />
          ) : (
            <Copy size={16} className='text-primary-background' />
          )}
        </Button>
      </div>
    </button>
  );
};

export default CopyInput;

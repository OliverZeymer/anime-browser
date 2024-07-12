'use client';
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Check, Copy } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useState } from 'react';
export default function CopyInput({ className }) {
  const pathname = usePathname();
  const url = `${process.env.NEXT_PUBLIC_HOST}${pathname}`;
  const [copied, setCopied] = useState(false);
  return (
    // <TooltipProvider className={cn('', className)} delayDuration={0}>
    //   <Tooltip>
    <button
      onClick={(e) => {
        e.preventDefault();
        navigator.clipboard.writeText(url);
        setCopied(true);
        toast('You have successfully copied the URL', { description: 'Your URL has been copied to your clipboard. You can now share it with others.', type: 'success' });
        setTimeout(() => setCopied(false), 3500);
      }}
      className='relative w-full cursor-pointer'>
      <div className={cn('relative w-full cursor-pointer', className)}>
        <Input
          type='text'
          value={url}
          READONLY
          style={{ 'caret-color': 'transparent' }}
          className='cursor-pointer hover:opacity-80 group w-full text-base border-0 bg-primary-foreground focus:outline-none select-none focus:ring-0 focus:ring-transparent focus:ring-offset-0'
        />
        <Button className='absolute right-2 p-1 h-auto top-1/2 -translate-y-1/2 bg-primary'>
          {copied ? <Check size={16} className='text-primary-background' /> : <Copy size={16} className='text-primary-background' />}
        </Button>
      </div>
    </button>
    //     <TooltipContent
    //       onPointerDownOutside={(event) => {
    //         event.preventDefault();
    //       }}>
    //       {copied ? 'Copied!' : 'Copy to clipboard'}
    //     </TooltipContent>
    //   </Tooltip>
    // </TooltipProvider>
  );
}

'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';

export default function SelectFilter({ param, options, title, className }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSelect = (event) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    if (!event) {
      current.delete(param.name);
    } else {
      current.set(param.name, event);
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  };

  return (
    <Select defaultValue={param.value} onValueChange={onSelect}>
      <div className='flex flex-col space-y-2'>
        <Label className="font-semibold">{title}</Label>

        <SelectTrigger className={cn('focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0', className)}>
          <SelectValue placeholder={title} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem className='capitalize' key={opt.value} value={opt.value}>
              {opt.name}
            </SelectItem>
          ))}
        </SelectContent>
      </div>
    </Select>
  );
}

'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';

export default function SelectFilter({ param, options, title }) {
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
  console.log(options);

  return (
    <Select defaultValue={param.value} onValueChange={onSelect}>
      <Label>{title}</Label>

      <SelectTrigger className='w-[280px] focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0'>
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem className='capitalize' key={opt.value} value={opt.value}>
            {opt.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

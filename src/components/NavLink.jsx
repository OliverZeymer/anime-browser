'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function NavLink({ href, children, activeClassName, className }) {
  const pathname = usePathname();
  return (
    <Link className={cn(className, pathname === href && activeClassName)} href={href}>
      {children}
    </Link>
  );
}

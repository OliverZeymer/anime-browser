'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function NavLink({ navItem, children, activeClassName, className }) {
  const pathname = usePathname();
  return (
    <Link className={cn(className, pathname === navItem.href && activeClassName)} href={navItem.href}>
      <navItem.icon />
      {children}
    </Link>
  );
}

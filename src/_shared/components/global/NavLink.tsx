'use client';
import { cn } from '@/libs/cn';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type Props = {
  navItem: {
    href: string;
    params?: Record<string, string | undefined>;
    icon: React.ComponentType;
  };
  children: React.ReactNode;
  onClick?: () => void;
  activeClassName?: string;
  className?: string;
};

export default function NavLink({ navItem, children, onClick, activeClassName, className }: Props) {
  const pathname = usePathname();
  const params = useSearchParams();
  // Function to check if the params match, excluding "page"
  const paramsMatch = () => {
    const navParams = Object.fromEntries(params);

    // Exclude "page" from comparison
    delete navParams.page;
    delete navParams.order;
    delete navParams.search;
    delete navParams.genres;
    if (navParams.type === 'movie') delete navParams.status;
    if (navParams.type !== 'movie') delete navParams.type;

    // Check if the remaining params match
    return JSON.stringify(navParams) === JSON.stringify(navItem.params);
  };
  function doesPathnamesMatch() {
    if (pathname === navItem.href && paramsMatch()) {
      return true;
    } else if ('/' + pathname.split('/')[1] === navItem.href && pathname.split('/')[2] !== 'new' && paramsMatch()) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <Link
      className={cn(className, doesPathnamesMatch() && activeClassName)}
      onClick={onClick}
      href={
        navItem.params
          ? {
              pathname: navItem.href,
              query: navItem.params,
            }
          : navItem.href
      }>
      <navItem.icon />
      {children}
    </Link>
  );
}

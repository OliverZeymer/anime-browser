import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavLink({ navItem, children, activeClassName, className }) {
  const pathname = usePathname();
  const params = useSearchParams();

  // Function to check if the params match, excluding "page"
  const paramsMatch = () => {
    const navParams = Object.fromEntries(params);

    // Exclude "page" from comparison
    delete navParams.page;
    delete navParams.order;
    delete navParams.search;
    if (navParams.status === 'all' || navParams.status === 'complete') delete navParams.status;
    if (navParams.type === 'movie') delete navParams.status; 

    // Check if the remaining params match
    return JSON.stringify(navParams) === JSON.stringify(navItem.params);
  };

  return (
    <Link
      className={cn(className, pathname === navItem.href && paramsMatch() && activeClassName)}
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

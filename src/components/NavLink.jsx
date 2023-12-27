import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavLink({ navItem, children, onClick, activeClassName, className }) {
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
    if (navParams.status === 'all' || navParams.status === 'complete') delete navParams.status;
    if (navParams.type === 'movie') delete navParams.status;

    // Check if the remaining params match
    return JSON.stringify(navParams) === JSON.stringify(navItem.params);
  };
  function doesPathnamesMatch() {
    if (pathname === navItem.href && paramsMatch()) {
      return true;
    } else if ('/' + pathname.split('/')[1] === navItem.href && paramsMatch()) {
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

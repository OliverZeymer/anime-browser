'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from './ui/pagination';
import type { JikanPagination } from '@/types/jikan';

type Props = {
  pagination?: JikanPagination;
};

export default function PaginationControls({ pagination }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  if (!pagination || pagination.last_visible_page <= 1) {
    // Don't render pagination controls if there's only one page or no pagination information.
    return null;
  }

  const currentPage = pagination.current_page ?? 1;

  const hrefForPage = (page: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('page', String(page));
    const search = current.toString();
    return search ? `${pathname}?${search}` : pathname;
  };

  const generatePaginationLink = (page: number) => {
    const href = hrefForPage(page);
    return (
      <PaginationItem key={page}>
        <PaginationLink isActive={page === currentPage} href={href}>
          {page}
        </PaginationLink>
      </PaginationItem>
    );
  };

const renderPaginationLinks = () => {
  const links = [];

  // Always show the first page
  links.push(generatePaginationLink(1));

  // Show ellipsis if there are more than 3 pages and the current page is not close to the first page
  if (pagination.last_visible_page > 4 && currentPage > 4) {
    links.push(<PaginationEllipsis key='ellipsis-start' />);
  }

  // Show the current page and the pages around it
  for (let page = Math.max(2, currentPage - 2); page <= Math.min(pagination.last_visible_page - 1, currentPage + 2); page++) {
    links.push(generatePaginationLink(page));
  }

  // Show ellipsis if there are more than 3 pages and the current page is not close to the last page
  if (pagination.last_visible_page > 4 && currentPage < pagination.last_visible_page - 2) {
    links.push(<PaginationEllipsis key='ellipsis-end' />);
  }

  // Always show the last page
  links.push(generatePaginationLink(pagination.last_visible_page));

  return links;
};

  return (
    <Pagination className='mt-6'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? hrefForPage(currentPage - 1) : '#'}
            aria-disabled={currentPage <= 1}
            className={currentPage <= 1 ? 'pointer-events-none opacity-40' : undefined}
          />
        </PaginationItem>
        {renderPaginationLinks()}
        <PaginationItem>
          <PaginationNext
            href={
              currentPage < pagination.last_visible_page ? hrefForPage(currentPage + 1) : '#'
            }
            aria-disabled={currentPage >= pagination.last_visible_page}
            className={
              currentPage >= pagination.last_visible_page ? 'pointer-events-none opacity-40' : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

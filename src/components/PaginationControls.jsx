'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from './ui/pagination';

export default function PaginationControls({ pagination }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  if (!pagination || pagination.last_visible_page <= 1) {
    // Don't render pagination controls if there's only one page or no pagination information.
    return null;
  }

  const generatePaginationLink = (page) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", page);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    const href = `${pathname}${query}`;
    return (
      <PaginationItem key={page}>
        <PaginationLink isActive={page === pagination.current_page} href={href}>
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
  if (pagination.last_visible_page > 4 && pagination.current_page > 4) {
    links.push(<PaginationEllipsis key='ellipsis-start' />);
  }

  // Show the current page and the pages around it
  for (let page = Math.max(2, pagination.current_page - 2); page <= Math.min(pagination.last_visible_page - 1, pagination.current_page + 2); page++) {
    links.push(generatePaginationLink(page));
  }

  // Show ellipsis if there are more than 3 pages and the current page is not close to the last page
  if (pagination.last_visible_page > 4 && pagination.current_page < pagination.last_visible_page - 2) {
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
          <PaginationPrevious href={pagination.current_page > 1 ? `?page=${pagination.current_page - 1}` : ''} />
        </PaginationItem>
        {renderPaginationLinks()}
        <PaginationItem>
          <PaginationNext href={`?page=${pagination.current_page + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

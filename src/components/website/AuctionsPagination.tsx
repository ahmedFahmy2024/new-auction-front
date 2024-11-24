"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationResult {
  currentPage: number;
  limit: number;
  numberOfPages: number;
  next?: number;
  previous?: number;
}

interface AuctionsPaginationProps {
  pagination: PaginationResult;
}

const AuctionsPagination = ({ pagination }: AuctionsPaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const { currentPage, numberOfPages } = pagination;
    const pages: (number | string)[] = [];

    // Always show first page
    pages.push(1);

    // Calculate the range of pages to show
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(numberOfPages - 1, currentPage + 1);

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push("...");
    }

    // Add pages in the middle
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (end < numberOfPages - 1) {
      pages.push("...");
    }

    // Add last page if there's more than one page
    if (numberOfPages > 1 && !pages.includes(numberOfPages)) {
      pages.push(numberOfPages);
    }

    return pages;
  };

  if (pagination.numberOfPages <= 1) {
    return null;
  }

  return (
    <Pagination className="my-8">
      <PaginationContent>
        {pagination.previous && (
          <PaginationItem>
            <PaginationPrevious href={createPageUrl(pagination.previous)} />
          </PaginationItem>
        )}

        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createPageUrl(page as number)}
                isActive={pagination.currentPage === page}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {pagination.next && (
          <PaginationItem>
            <PaginationNext href={createPageUrl(pagination.next)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default AuctionsPagination;

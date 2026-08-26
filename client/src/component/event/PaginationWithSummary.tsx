"use client";

import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export function PaginationWithSummary({
  currentPage,
  totalPages,
  totalItems,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    router.push(`/events?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = (currentPage - 1) * 9 + 1;
  const endItem = Math.min(currentPage * 9, totalItems);

  return (
    <Pagination className="mt-12 w-full">
      <Pagination.Summary>
        Showing {startItem}-{endItem} of {totalItems} results
      </Pagination.Summary>

      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous
            isDisabled={currentPage === 1}
            onPress={() => goToPage(currentPage - 1)}
          >
            <Pagination.PreviousIcon />
            <span>Previous</span>
          </Pagination.Previous>
        </Pagination.Item>

        {getPageNumbers().map((p, i) =>
          p === "ellipsis" ? (
            <Pagination.Item key={`ellipsis-${i}`}>
              <Pagination.Ellipsis />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={p}>
              <Pagination.Link
                isActive={p === currentPage}
                onPress={() => goToPage(p)}
              >
                {p}
              </Pagination.Link>
            </Pagination.Item>
          )
        )}

        <Pagination.Item>
          <Pagination.Next
            isDisabled={currentPage === totalPages}
            onPress={() => goToPage(currentPage + 1)}
          >
            <span>Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
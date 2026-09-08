import Button from "@/components/ui/custom/Button";
import type { PaginationType } from "@/types/pagination.types";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type ManagementPaginationProps = {
  pagination: PaginationType;
  onPageChange: (pageNumber: number) => void;
};

export const ManagementPagination = ({
  pagination,
  onPageChange,
}: ManagementPaginationProps) => {
  if (!pagination || pagination.total_pages <= 1) {
    return null;
  }

  const currentPage = pagination.page_number;
  const totalPages = pagination.total_pages;
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <nav
      className="mt-6 flex items-center justify-center gap-2"
    >
      <Button
        type="button"
        size="icon-lg"
        disabled={isFirstPage}
        leftIcon={<ChevronsLeft />}
        onClick={() => onPageChange(1)}
      />

      <Button
        type="button"
        size="icon-lg"
        disabled={isFirstPage}
        leftIcon={<ChevronLeft />}
        onClick={() => onPageChange(currentPage - 1)}
      />

      <p className="min-w-28 text-center text-lg font-bold text-black">
        Page {currentPage} of {totalPages}
      </p>

      <Button
        type="button"
        size="icon-lg"
        disabled={isLastPage}
        leftIcon={<ChevronRight />}
        onClick={() => onPageChange(currentPage + 1)}
      />

      <Button
        type="button"
        size="icon-lg"
        disabled={isLastPage}
        leftIcon={<ChevronsRight />}
        onClick={() => onPageChange(totalPages)}
      />
    </nav>
  );
};

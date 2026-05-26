import { useState } from "react";

export const usePagination = (refetch: () => void) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    refetch();
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
  };

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    handlePageChange,
    handlePageSizeChange,
  };
};

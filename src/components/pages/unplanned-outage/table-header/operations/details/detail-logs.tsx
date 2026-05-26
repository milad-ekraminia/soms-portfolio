import { Loader } from "@/components/ui/loader/loader";
import Table from "@/components/ui/Table/table";
import { useOutageDetailLogs } from "@/hooks/outage/use-get-detail-drawer";
import { useState } from "react";

export const DetailLogs = ({ chosenRows }: { chosenRows: any }) => {
  const [page, setPage] = useState<number>(0);

  const pageSize = 10;
  const { data, isLoading, isPending } = useOutageDetailLogs({
    page,
    pageSize,
    outageId: chosenRows,
  });
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  return (
    <Table
      data={data?.data?.items ?? []}
      columns={[]}
      isLoading={isLoading || isPending}
      renderLoading={() => <Loader />}
      maxHeight="400px"
      totalPagesProp={data?.totalPages}
      setCurrentPage={setPage}
      currentPage={page}
      pageChangeHanlder={handlePageChange}
      columnOrder={[]}
      setColumnOrder={() => {}}
    />
  );
};

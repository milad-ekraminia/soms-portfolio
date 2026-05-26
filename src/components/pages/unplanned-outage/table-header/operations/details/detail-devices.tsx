import { Loader } from "@/components/ui/loader/loader";
import Table from "@/components/ui/Table/table";
import { useOutageDetailDevices } from "@/hooks/outage/use-get-detail-drawer";
import { RootState } from "@/store/app/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export const DetailDevices = ({ chosenRows }: { chosenRows: any }) => {
  const { rowData } = useSelector((state: RootState) => state.drawer);
  const [page, setPage] = useState<number>(0);
  const pageSize = 10;
  const { data, isLoading, isPending } = useOutageDetailDevices({
    page,
    pageSize,
    outageId: chosenRows,
    OmpId: rowData?.ompId,
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

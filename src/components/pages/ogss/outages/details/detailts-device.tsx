import { Loader } from "@/components/ui/loader/loader";
import Table from "@/components/ui/Table/table";
import { useOutageDetailDevices } from "@/hooks/outage/use-get-detail-drawer";
import { useState } from "react";
import { useSelector } from "react-redux";

export const DetailTreeDevices = ({
  chosenRows,
  NodeElementHandler,
}: {
  chosenRows: any;
  NodeElementHandler: any;
}) => {
  console.log("🚀 ~ DetailTreeDevices ~ NodeElementHandler:", NodeElementHandler)
  const { rowData } = useSelector((state: any) => state.drawer);
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
  const tabFourColumn: any = [];
  return (
    <Table
      data={data?.data?.items ?? []}
      columns={tabFourColumn}
      isLoading={isLoading || isPending}
      renderLoading={() => <Loader />}
      maxHeight="600px"
      totalPagesProp={data?.totalPages}
      setCurrentPage={setPage}
      currentPage={page}
      pageChangeHanlder={handlePageChange}
      columnOrder={[]}
      setColumnOrder={() => {}}
    />
  );
};

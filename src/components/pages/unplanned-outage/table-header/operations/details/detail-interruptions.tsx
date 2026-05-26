import { Loader } from "@/components/ui/loader/loader";
import Table from "@/components/ui/Table/table";
import { useOutageDetailCombinedDeductions } from "@/hooks/outage/use-get-detail-drawer";
import { useState } from "react";

export const DetailInterruptions = ({
  handleRowClick,
  chosenRows,
}: {
  handleRowClick: any;
  chosenRows: any;
}) => {
  console.log("🚀 ~ DetailInterruptions ~ handleRowClick:", handleRowClick)
  const [page, setPage] = useState<number>(0);

  const pageSize = 10;
  const tabTwoColumn : any = [];
  const { data, isLoading, isPending } = useOutageDetailCombinedDeductions({
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
      columns={tabTwoColumn}
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

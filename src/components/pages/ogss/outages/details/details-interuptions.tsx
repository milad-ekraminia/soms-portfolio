import { Loader } from "@/components/ui/loader/loader";
import Table from "@/components/ui/Table/table";
import { useOutageDetailCombinedDeductions } from "@/hooks/outage/use-get-detail-drawer";
import { useState } from "react";

export const DetailInterruptions = ({
  handleRowClick,
  chosenRows,
  NodeElementHandler,
}: {
  handleRowClick: any;
  chosenRows: any;
  NodeElementHandler: any;
}) => {
  console.log(
    "🚀 ~ DetailInterruptions ~ handleRowClick:",
    handleRowClick,
    NodeElementHandler,
  );
  const [page, setPage] = useState<number>(0);

  const pageSize = 10;
  const tabTwoColumn: any = [];
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

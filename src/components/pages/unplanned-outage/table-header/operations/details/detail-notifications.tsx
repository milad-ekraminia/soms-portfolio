import { Loader } from "@/components/ui/loader/loader";
import Table from "@/components/ui/Table/table";
import { useOutageDetailNotifications } from "@/hooks/outage/use-get-detail-drawer";
import { useState } from "react";

export const DetailNotifications = ({
  handleRowClick,
  chosenRows,
}: {
  handleRowClick: any;
  chosenRows: any;
}) => {
  console.log("🚀 ~ DetailNotifications ~ handleRowClick:", handleRowClick)
  const [page, setPage] = useState<number>(0);
  const pageSize = 10;
  const tabThreeColumn : any = [];
  const { data, isLoading, isPending } = useOutageDetailNotifications({
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
      columns={tabThreeColumn}
      isLoading={isLoading || isPending}
      renderLoading={() => <Loader />}
      maxHeight="400px"
      totalPagesProp={data?.totalPages}
      setCurrentPage={setPage}
      currentPage={page}
      pageChangeHanlder={handlePageChange}
      columnOrder={tabThreeColumn}
      setColumnOrder={() => {}}
    />
  );
};

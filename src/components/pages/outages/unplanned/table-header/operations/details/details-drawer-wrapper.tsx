import Drawer from "@/components/ui/drawer/drawer";
import { useOutageDetailWithOutage } from "@/hooks/outage/use-get-detail-drawer";
import SharedDetailsDrawer from "@/components/pages/outages/shared/operations/shared-detail-drawer";
import { outageDetailsTabs } from "@/helpers/data/outage";
interface OperationsSectionProps {
  selectedRows: number[];
  isDrawerOpen: boolean;
  closeDrawer: () => void;
}
export const DetailDrawerWrapper = ({
  selectedRows,
  isDrawerOpen,
  closeDrawer,
}: OperationsSectionProps) => {
  const { data, isLoading, isPending,refetch: refetchOutageDetail } = useOutageDetailWithOutage({
    outageId: selectedRows[0],
    forceEnabled: isDrawerOpen,
  });
  return (
    <Drawer
      isOpen={isDrawerOpen}
      onClose={() => {
        closeDrawer();
      }}
      title={isLoading ? "yükleniyor..." : data?.stationName ?? "-"}
      hasFooter={false}
      size={"lg"}
      closeBtnText={undefined}
      submitBtnText={undefined}
    >
      <SharedDetailsDrawer
        onClose={closeDrawer}
        detailData={data}
        isDetailLoading={isLoading || isPending}
        selectedRows={selectedRows}
        drawerType="outage"
        tabs={outageDetailsTabs}
        refetchOutageDetail={refetchOutageDetail}
      />
    </Drawer>
  );
};

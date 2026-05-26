import Drawer from "@/components/ui/drawer/drawer";
import DetailsDrawer from "../details-drawer";
import { useOutageDetailWithOutage } from "@/hooks/outage/use-get-detail-drawer";
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
  const { data, isLoading, isPending } = useOutageDetailWithOutage({
    outageId: selectedRows[0],
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
      <DetailsDrawer
        onClose={closeDrawer}
        detailData={data}
        isDetailLoading={isLoading || isPending}
        selectedRows={selectedRows}
      />
    </Drawer>
  );
};

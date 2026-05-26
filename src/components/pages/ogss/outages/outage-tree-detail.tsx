import Drawer from "@/components/ui/drawer/drawer";
import { useOutageDetailWithOutage } from "@/hooks/outage/use-get-detail-drawer";
import OutageTreeDetailsDrawer from "./outage-tree-drawer-detail";
import { useSelector } from "react-redux";
interface OperationsSectionProps {
  selectedRows: number[];
  isDrawerOpen: boolean;
  clickedNode: boolean;
  closeDrawer: () => void;
  treeData: any;
  isLoading: any;
  parentItemData: any;
  nodeType?: "simulation" | "historical" | "outage";
}
export const OutageTreeDetails = ({
  selectedRows,
  isDrawerOpen,
  closeDrawer,
  clickedNode,
  treeData,
  isLoading,
  parentItemData,
  nodeType = "outage",
}: OperationsSectionProps) => {
  const tabs = useSelector((state: any) => state.outageTabs);

  const tabList: any = Object.entries(tabs).map(([tabId, data]) => ({
    tabId,
    ...(typeof data === "object" && data !== null ? data : {}),
  }));

  // Only find outageId if this is a real outage
  const activeOutageId =
    nodeType === "outage"
      ? tabList?.find((tab: any) => tab.isActive === true)?.outageId
      : undefined;

  const {
    data,
    isLoading: detailLoading,
    isPending,
  } = useOutageDetailWithOutage({
    outageId:
      nodeType == "outage"
        ? clickedNode
          ? activeOutageId
          : selectedRows[0]
        : undefined, // ✅ no outageId for sim/historical

    clickedNode,
    ompId: clickedNode ? selectedRows[0] : undefined,
    nodeType,
    version:
      nodeType === "simulation" || nodeType === "historical"
        ? parentItemData?.version // ✅ get version from parent or props
        : undefined,
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
      <OutageTreeDetailsDrawer
        onClose={closeDrawer}
        detailData={data}
        isDetailLoading={isLoading || detailLoading || isPending}
        selectedRows={selectedRows}
        clickedNode={clickedNode}
        treeData={treeData}
        parentItemData={parentItemData}
        activeOutageId={activeOutageId}
        nodeType={nodeType}
      />
    </Drawer>
  );
};

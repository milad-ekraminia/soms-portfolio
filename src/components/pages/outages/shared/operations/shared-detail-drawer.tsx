import { ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
import { openDrawer } from "@/store/app/drawer-slice";
import Tabs from "@/components/ui/tabs/tabs";

import DataDetails from "./details/detail-tab/data-details/data-details";
import { DetailInterruptions } from "./details/detail-interruptions";
import { DetailNotifications } from "./details/detail-notifications";
import { DetailDevices } from "./details/detail-devices";
import { DetailListDocuments } from "./details/documents-tab/detail-list-documents";
import { DetailLogs } from "./details/detail-logs";
import { TierLists } from "./details/tier-lists";

interface TabsType {
  title: string | number;
  value: string | number;
  id: number;
  icon?: ReactNode;
}

interface DetailsDrawerProps {
  onClose: () => void;
  selectedRows: any[];
  detailData?: any;
  isDetailLoading?: boolean;

  // 🔑 Shared customization
  drawerType: "outage" | "plannedOutage";
  tabs: TabsType[];
  disableTabSwitch?: boolean;
  refetchOutageDetail: () => Promise<any>;
}

const SharedDetailsDrawer = ({
  onClose,
  selectedRows: chosenRows,
  detailData,
  isDetailLoading,
  drawerType,
  tabs,
  disableTabSwitch = false,
  refetchOutageDetail,
}: DetailsDrawerProps) => {
  const [activeTab, setActiveTab] = useState("data");
  const dispatch = useDispatch();

  // Shared row click handler
  const handleIdClick = (id: any, rowData: any, type: any) => {
    setActiveTab("data");
    onClose();
    dispatch(openDrawer({ title: "TBC524", type, id, rowData }));
  };

  return (
    <div className="details-drawer">
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={disableTabSwitch ? () => {} : setActiveTab}
      />

      {activeTab === "data" && (
        <DataDetails
          data={detailData}
          isDetailLoading={isDetailLoading}
          drawerType={drawerType}
          refetchOutageDetail={refetchOutageDetail}
        />
      )}
      {activeTab === "interruptions" && (
        <DetailInterruptions
          chosenRows={chosenRows[0]}
          handleRowClick={handleIdClick}
          drawerType={drawerType}
        />
      )}
      {activeTab === "notifications" && (
        <DetailNotifications
          chosenRows={chosenRows[0]}
          drawerType={drawerType}
          detailData={detailData}
        />
      )}
      {activeTab === "devices" && (
        <DetailDevices chosenRows={chosenRows[0]} ompId={detailData?.ompId} />
      )}
      {activeTab === "documents" && (
        <DetailListDocuments chosenRows={chosenRows[0]} />
      )}
      {activeTab === "logs" && (
        <DetailLogs chosenRows={chosenRows[0]} drawerType={drawerType} />
      )}
      {activeTab === "levels" && (
        <TierLists
          chosenRows={chosenRows[0]}
          handleRowClick={handleIdClick}
          drawerType={drawerType}
        />
      )}
    </div>
  );
};

export default SharedDetailsDrawer;

import Table from "@/components/ui/Table/table";
import Tabs from "@/components/ui/tabs/tabs";
import { outageDetailsTabs } from "@/helpers/data/outage";
import { openDrawer } from "@/store/app/drawer-slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DataDetails from "./details/data-details";
import { DetailInterruptions } from "./details/detail-interruptions";
import { DetailNotifications } from "./details/detail-notifications";
import { DetailDevices } from "./details/detail-devices";
import { DetailListDocuments } from "./details/detail-list-documents";
import { DetailLogs } from "./details/detail-logs";
interface DetailsDrawerProps {
  onClose: () => void;
  selectedRows: any;
  detailData?: any;
  isDetailLoading?: boolean;
}
const DetailsDrawer = ({
  onClose,
  selectedRows: chosenRows,
  detailData,
  isDetailLoading,
}: DetailsDrawerProps) => {
  const [activeTab, setActiveTab] = useState("data");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [activeTableData, setActiveTableData] = useState<any>([]);
  const dispatch = useDispatch();

  const handleRowClick = (id: any, rowData: any, type: string) => {
    setActiveTab("data");
    onClose();
    dispatch(openDrawer({ title: "TBC524", type, id, rowData }));
  };
  const tabFiveColumn: any = [];
  useEffect(() => {
    setActiveTableData(tabContent[activeTab]?.data);
    deselectAllRows();
  }, [activeTab]);

  const selectRowsHandler = (id: number, isAll = false) => {
    if (isAll) {
      if (selectedRows?.length === activeTableData.length) {
        deselectAllRows();
      } else {
        selectAllRows();
      }
    } else {
      if (selectedRows?.includes(id)) {
        setSelectedRows(selectedRows?.filter((rowId) => rowId !== id));
      } else {
        setSelectedRows([...selectedRows, id]);
      }
    }
  };
  const selectAllRows = () => {
    setSelectedRows(activeTableData.map((row: any) => row.id));
  };
  const deselectAllRows = () => {
    setSelectedRows([]);
  };

  const tabContent: Record<string, { data: any[]; column: any[] }> = {
    levels: {
      data: [],
      column: [...tabFiveColumn],
    },

    logs: {
      data: [],
      column: [],
    },
  };

  return (
    <div className="outage-details-drawer">
      <Tabs
        tabs={outageDetailsTabs}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />

      {activeTab == "data" ? (
        <DataDetails data={detailData} isDetailLoading={isDetailLoading} />
      ) : null}
      {activeTab == "interruptions" ? (
        <DetailInterruptions
          chosenRows={chosenRows[0]}
          handleRowClick={handleRowClick}
        />
      ) : null}
      {activeTab == "notifications" ? (
        <DetailNotifications
          chosenRows={chosenRows[0]}
          handleRowClick={handleRowClick}
        />
      ) : null}
      {activeTab == "devices" ? (
        <DetailDevices chosenRows={chosenRows[0]} />
      ) : null}
      {activeTab == "documents" ? (
        <DetailListDocuments
          chosenRows={chosenRows[0]}
          selectedRows={selectedRows}
        />
      ) : null}
      {activeTab == "logs" ? <DetailLogs chosenRows={chosenRows[0]} /> : null}
      {activeTab == "levels" ? (
        <Table
          data={tabContent[activeTab]?.data ?? []}
          columns={tabContent[activeTab]?.column}
          isLoading={false}
          maxHeight="400px"
          selectRowsHandler={selectRowsHandler}
          hasCheckbox
          selectedRows={selectedRows}
          columnOrder={[]}
          setColumnOrder={() => {}}
        />
      ) : null}
    </div>
  );
};

export default DetailsDrawer;

import Table from "@/components/ui/Table/table";
import Tabs from "@/components/ui/tabs/tabs";
import { stepData as stepDataConfig } from "@/helpers/data/life-cycle";
import { useState } from "react";
import { StepperDataWrapper } from "../details-wrapper";
import { openDrawer } from "@/store/app/drawer-slice";
import { useDispatch } from "react-redux";
import { useTableColumns } from "@/hooks/use-table-columns";
const NotificationDetails = () => {
  const dispatch = useDispatch();
  // TODO add rowdata after api setting
  const handleIdClick = (rowData: number, type: string) => {
    dispatch(
      openDrawer({ title: "TBC524", type, id: rowData, rowData: rowData })
    );
  };
  const stepData = stepDataConfig(handleIdClick);
  const data = stepData[0];
  const [activeTab, setActiveTab] = useState<string>(data.tabs[0].value);
  const { columnOrder, setColumnOrder, effectiveColumns } = useTableColumns({
    tableName: "NotificationDetailsTable",
    allColumns: data?.columns?.[activeTab === "VerifiedNotifications" ? 0 : 1],
  });
  return (
    <StepperDataWrapper title="Bildirim Detayları">
      <div className="tabs-wrapper">
        <Tabs
          activeTab={activeTab}
          tabs={data.tabs}
          onTabClick={setActiveTab}
        />
      </div>
            <div className="stepper-data__body-table-parent">

      <Table
        data={data.data?.[activeTab === "VerifiedNotifications" ? 0 : 1] ?? []}
        columns={effectiveColumns}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        isLoading={false}
        renderLoading={() => <div>Loading...</div>}
        maxHeight="400px"
        headerChildren={<></>}
      />
      </div>
    </StepperDataWrapper>
  );
};

export default NotificationDetails;

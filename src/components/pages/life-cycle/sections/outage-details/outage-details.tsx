import { useState } from "react";
import DetailsCardWrapper from "../details-card-wrapper";
import { StepperDataWrapper } from "../details-wrapper";
import {
  outageDetailsCardData,
  stepData as stepDataConfig,
} from "@/helpers/data/life-cycle";
import Tabs from "@/components/ui/tabs/tabs";
import Table from "@/components/ui/Table/table";
import { openDrawer } from "@/store/app/drawer-slice";
import { useDispatch } from "react-redux";
import { useTableColumns } from "@/hooks/use-table-columns";

const OutageDetails = () => {
  const dispatch = useDispatch();
  // TODO add rowdata after api setting

  const handleIdClick = (rowData: number, type: string) => {
    dispatch(
      openDrawer({ title: "TBC524", type, id: rowData, rowData: rowData })
    );
  };
  const stepData = stepDataConfig(handleIdClick);
  const data = stepData[1];
  const [activeTab, setActiveTab] = useState<string>(data.tabs[0].value);
  const { columnOrder, setColumnOrder, effectiveColumns } = useTableColumns({
    tableName: "lifeCycleOutageDetails",
    allColumns: data?.columns?.[0],
  });
  return (
    <StepperDataWrapper title="Kesinti Detayları">
      <div className="tabs-wrapper">
        <Tabs
          activeTab={activeTab}
          tabs={data.tabs}
          onTabClick={setActiveTab}
        />
      </div>
      {activeTab === "OutageInformation" ? (
        <div className="life-cycle-card-wrapper">
          <DetailsCardWrapper data={outageDetailsCardData.data.details} />
          <DetailsCardWrapper data={outageDetailsCardData.data.location} />
        </div>
      ) : (
              <div className="stepper-data__body-table-parent">

        <Table
          data={data.data?.[0] ?? []}
          columns={effectiveColumns ?? []}
          isLoading={false}
          renderLoading={() => <div>Loading...</div>}
          maxHeight="400px"
          headerChildren={<></>}
          columnOrder={columnOrder}
          setColumnOrder={setColumnOrder}
        />
        </div>
      )}
    </StepperDataWrapper>
  );
};

export default OutageDetails;

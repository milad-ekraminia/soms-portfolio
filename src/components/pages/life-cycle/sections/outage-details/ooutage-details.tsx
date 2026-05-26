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

const OutageDetails = () => {
  const dispatch = useDispatch();
  // TODO add rowdata after api setting

  const handleRowClick = (rowData: number, type: string) => {
    dispatch(
      openDrawer({ title: "TBC524", type, id: rowData, rowData: rowData })
    );
  };
  const stepData = stepDataConfig(handleRowClick);
  const data = stepData[1];
  const [activeTab, setActiveTab] = useState<string>(data.tabs[0].value);
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
        <Table
          data={data.data?.[0] ?? []}
          columns={data?.columns?.[0] ?? []}
          isLoading={false}
          renderLoading={() => <div>Loading...</div>}
          maxHeight="400px"
          columnOrder={data?.columns?.[0] ?? []}
          setColumnOrder={() => {}}
        />
      )}
    </StepperDataWrapper>
  );
};

export default OutageDetails;

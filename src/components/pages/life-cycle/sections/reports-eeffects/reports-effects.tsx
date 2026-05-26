import Table from "@/components/ui/Table/table";
import Tabs from "@/components/ui/tabs/tabs";
import { stepData as stepDataConfig } from "@/helpers/data/life-cycle";
import { useState } from "react";
import { StepperDataWrapper } from "../details-wrapper";
const ReportsEffects = () => {
  const handleRowClick = () => {};
  const stepData = stepDataConfig(handleRowClick);
  const data = stepData[3];
  const [activeTab, setActiveTab] = useState<string>(data.tabs[0].value);

  return (
    <StepperDataWrapper title="Raporlara etkisi">
      <div className="tabs-wrapper">
        <Tabs
          activeTab={activeTab}
          tabs={data.tabs}
          onTabClick={setActiveTab}
        />
      </div>
      <Table
        data={data.data?.[0] ?? []}
        columns={data?.columns?.[0] ?? []}
        isLoading={false}
        renderLoading={() => <div>Loading...</div>}
        maxHeight="400px"
        columnOrder={data?.columns?.[0] ?? []}
        setColumnOrder={() => {}}
      />
    </StepperDataWrapper>
  );
};

export default ReportsEffects;

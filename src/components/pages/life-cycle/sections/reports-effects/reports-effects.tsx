import Table from "@/components/ui/Table/table";
import Tabs from "@/components/ui/tabs/tabs";
import { stepData as stepDataConfig } from "@/helpers/data/life-cycle";
import { useState } from "react";
import { StepperDataWrapper } from "../details-wrapper";
import { useTableColumns } from "@/hooks/use-table-columns";
const ReportsEffects = () => {
  const stepData = stepDataConfig(() => {});
  const data = stepData[3];
  const [activeTab, setActiveTab] = useState<string>(data.tabs[0].value);
  const { columnOrder, setColumnOrder, effectiveColumns } = useTableColumns({
    tableName: "lifeCycleReportsEffects",
    allColumns: data?.columns?.[0],
  });
  return (
    <StepperDataWrapper title="Raporlara etkisi">
      <div className="tabs-wrapper">
        <Tabs
          activeTab={activeTab}
          tabs={data.tabs}
          onTabClick={setActiveTab}
        />
      </div>
      <div className="stepper-data__body-table-parent">
        <Table
          data={data.data?.[0] ?? []}
          columns={effectiveColumns ?? []}
          isLoading={false}
          renderLoading={() => <div>Loading...</div>}
          maxHeight="400px"
          columnOrder={columnOrder}
          setColumnOrder={setColumnOrder}
        />
      </div>
    </StepperDataWrapper>
  );
};

export default ReportsEffects;

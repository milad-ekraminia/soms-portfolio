import Table from "@/components/ui/Table/table";
import { stepData as stepDataConfig } from "@/helpers/data/life-cycle";
import { StepperDataWrapper } from "../details-wrapper";
import { useTableColumns } from "@/hooks/use-table-columns";
const AffectedInstallationSummary = () => {

  const stepData = stepDataConfig(()=>{});
  const data = stepData[2];
  const { columnOrder, setColumnOrder, effectiveColumns } = useTableColumns({
    tableName: "AffectedInstallationSummaryTable",
    allColumns: data?.columns?.[0],
  });
  return (
    <StepperDataWrapper title="Etkilenen Tesisatlar Özetleri">
      <div className="stepper-data__body-table-parent">
        <Table
          data={data.data?.[0] ?? []}
          columns={effectiveColumns}
          columnOrder={columnOrder}
          setColumnOrder={setColumnOrder}
          isLoading={false}
          renderLoading={() => <div>Loading...</div>}
          maxHeight="400px"
        />
      </div>
    </StepperDataWrapper>
  );
};

export default AffectedInstallationSummary;

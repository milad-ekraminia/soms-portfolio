import "./reports.scss";
import Table from "@/components/ui/Table/table";
import { reportsColumns, reportsData } from "@/helpers/data/reports";

import { useTableColumns } from "@/hooks/use-table-columns";
import { ReportsTableHeader } from "./reports-table-header";

export const ReportsTable = ({ tableData, handlebackClick }: { tableData: any; handlebackClick: (value: any) => void }) => {
  // const [tableValue, setTableValue] = useState(reportsTableOptions[0]?.value);
  // const [reportsValue, setReportsValue] = useState(
  //   reportsDateOptions[0]?.value
  // );
  // const tableSelectHandler = (value: string) => {
  //   setTableValue(Number(value));
  // };
  // const dateSelectHandler = (value: string) => {
  //   setReportsValue(Number(value));
  // };
  const { columnOrder, setColumnOrder, effectiveColumns } = useTableColumns({
    tableName: "ReportsTable",
    allColumns: reportsColumns,
  });
  return (
    <div className="reports-table">
      <Table
        data={reportsData}
        columns={effectiveColumns}
        isLoading={false}
        renderLoading={() => <div>Loading...</div>}
        maxHeight="400px"
        headerChildren={
          <ReportsTableHeader
            tableData={tableData}
            handlebackClick={handlebackClick}
          />
        }
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        totalCount={10}
      />
    </div>
  );
};

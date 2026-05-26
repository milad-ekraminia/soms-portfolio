import { Loader } from "@/components/ui/loader/loader";
import Table from "@/components/ui/Table/table";
import { detailControllsColumn } from "@/helpers/data/outage-tree-detail";
import { useTableColumns } from "@/hooks/use-table-columns";

export const DetailControlls = ({
  handleRowClick,
  NodeElementHandler,
}: {
  handleRowClick: any;
  NodeElementHandler: any;
}) => {

  const detailColumn = detailControllsColumn(
    handleRowClick,
    NodeElementHandler
  );
 
    const { columnOrder, setColumnOrder, effectiveColumns } = useTableColumns({
      tableName: "ogssDetailCOntrollsTable",
      allColumns: detailColumn,
    });
  return (
    <div className="ogss-detail-controlls">
      <Table
        data={[]}
        columns={effectiveColumns}
        isLoading={false}
        renderLoading={() => <Loader />}
        maxHeight="600px"
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
      />
    </div>
  );
};

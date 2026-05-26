import { ClearSvg } from "@/assets/icons/clear-svg";
import { Button } from "@/components/ui/button/button";
import { GlobalTableHeader } from "@/components/ui/global-header/global-header";
import { Loader } from "@/components/ui/loader/loader";
import Table from "@/components/ui/Table/table";
import { devicesTabColumn } from "@/helpers/data/outage";
import { useOutageDetailDevices } from "@/hooks/outage/use-get-detail-drawer";
import { useTableColumns } from "@/hooks/use-table-columns";
import { useTableFilters } from "@/hooks/use-table-filters";
import { useTableLogic } from "@/hooks/use-table-logic";
import { FilterItem, setTableFilters } from "@/store/app/filter-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const DetailDevices = ({
  chosenRows,
  ompId = "",
}: {
  chosenRows: any;
  ompId?: any;
}) => {
  const { rowData } = useSelector((state: any) => state?.drawer);
  const dispatch = useDispatch();

  const tableName = "unPlannedOutageDetailDevicesTable";

  // --- Filters ---
  const {
    filters: appliedFilters,
    setFilter: onFilterChange,
    removeFilterByKey,
    clearFilters: onFilterClear,
    setRefetchCallback,
  } = useTableFilters(tableName);

  // --- Table logic ---
  function useFetchOutageDetailCombinedDeductions(
    page: number,
    pageSize: number,
    filters: FilterItem[]
  ) {
    return useOutageDetailDevices({
      page,
      pageSize,
      outageId: chosenRows,
      appliedFilters: filters,
      OmpId: rowData ? rowData?.ompId : ompId,
    });
  }

  const {
    data,
    isLoading,
    isPending,
    refetch,
    page,
    setPage,
    pageSize,
    setPageSize,
    tempFilters,
    setFilter,
    removeTempFilterByKey,
    tableWholeFilterClear,
  } = useTableLogic({
    removeFilterByKey,
    onFilterClear,
    appliedFilters,
    fetchHook: useFetchOutageDetailCombinedDeductions,
    getRowId: (item: any) => item.id,
  });
  const devicesTableColumn = devicesTabColumn(tempFilters, setFilter);

  const { columnOrder, setColumnOrder, effectiveColumns } = useTableColumns({
    tableName,
    allColumns: devicesTableColumn,
  });

  useEffect(() => {
    setRefetchCallback(refetch);
  }, [refetch]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    refetch();
  };

  const handlePerPageChange = (newSize: any) => {
    setPageSize(newSize);
  };

  const onFilterSubmit = () => {
    dispatch(setTableFilters({ table: tableName, filters: tempFilters }));
    setPage(0);
  };
  return (
    <div className="detail-devices">
      <Table
        data={data?.items ?? []}
        columns={effectiveColumns}
        isLoading={isLoading || isPending}
        renderLoading={() => <Loader />}
        maxHeight="400px"
        totalPagesProp={data?.totalPages}
        setCurrentPage={setPage}
        currentPage={page}
        pageChangeHanlder={handlePageChange}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        totalCount={data?.totalCount ?? 0}
        setPageSize={handlePerPageChange}
        pageSize={pageSize}
        appliedFilters={appliedFilters}
        onFilterChange={onFilterChange}
        onFilterSubmit={onFilterSubmit}
        onFilterClear={onFilterClear}
        removeFilterByKey={removeTempFilterByKey}
        headerChildren={
          <GlobalTableHeader
            title="İZLEYEN CİHAZLAR"
            actions={
              <>
                {appliedFilters?.length > 0 ? (
                  <Button
                    variant="secondary-color"
                    onClick={tableWholeFilterClear}
                    leftIcon={
                      <ClearSvg
                        stroke={
                          appliedFilters?.length < 1 ? "#98A2B3" : undefined
                        }
                      />
                    }
                    disabled={appliedFilters?.length < 1}
                  >
                    {appliedFilters?.length < 1 ? "" : "Tüm Filtreleri Temizle"}
                  </Button>
                ) : null}
              </>
            }
          />
        }
      />
    </div>
  );
};

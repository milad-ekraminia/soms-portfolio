import { ClearSvg } from "@/assets/icons/clear-svg";
import { Button } from "@/components/ui/button/button";
import { GlobalTableHeader } from "@/components/ui/global-header/global-header";
import Table from "@/components/ui/Table/table";
import { tierListsTabColumn } from "@/helpers/data/outage";
import { useOutageDetailTierLists } from "@/hooks/outage/use-get-detail-drawer";
import { useTableColumns } from "@/hooks/use-table-columns";
import { useTableFilters } from "@/hooks/use-table-filters";
import { useTableLogic } from "@/hooks/use-table-logic";
import { FilterItem, setTableFilters } from "@/store/app/filter-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const TierLists = ({
  handleRowClick,
  chosenRows,
  drawerType,
}: {
  handleRowClick: any;
  chosenRows: any;
  drawerType: "outage" | "plannedOutage";
}) => {
  const dispatch = useDispatch();

  const tableName = "outageDetailTierListsTable";

  // --- Filters ---
  const {
    filters: appliedFilters,
    setFilter: onFilterChange,
    removeFilterByKey,
    clearFilters: onFilterClear,
    setRefetchCallback,
  } = useTableFilters(tableName);

  // --- Table logic ---
  function useFetchOutageDetailTierLists(
    page: number,
    pageSize: number,
    filters: FilterItem[]
  ) {
    return useOutageDetailTierLists({
      page,
      pageSize,
      outageId: chosenRows,
      appliedFilters: filters,
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
    fetchHook: useFetchOutageDetailTierLists,
    getRowId: (item: any) => item.id,
  });
  const tierListsTabColumnConfig = tierListsTabColumn(
    handleRowClick,
    tempFilters,
    setFilter,
    drawerType
  );

  const { columnOrder, setColumnOrder, effectiveColumns } = useTableColumns({
    tableName,
    allColumns: tierListsTabColumnConfig,
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
    <div className="detail-levels">
      <Table
        data={data?.items ?? []}
        columns={effectiveColumns}
        isLoading={isLoading || isPending}
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
            title="KADEME LİSTESİ"
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

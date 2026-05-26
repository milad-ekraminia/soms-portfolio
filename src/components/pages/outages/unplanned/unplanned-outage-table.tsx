import { Loader } from "@/components/ui/loader/loader";
import Table from "@/components/ui/Table/table";
import { outageColumns as outageColumnsConfig } from "@/helpers/data/outage-table-column";
import { useOutages } from "@/hooks/outage";
import { useOutageActions } from "@/hooks/use-outage-actions";
import { openDrawer } from "@/store/app/drawer-slice";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import "./unplanned-outage.scss";
import OutageOperationContent from "./table-header/operations/outage-operation-content";
import OutageOperationSections from "./table-header/operations/outage-operations-sections";
import OutageTableHeader from "./table-header/outage-table-header";
import { useTranslation } from "react-i18next";
import { useTableFilters } from "@/hooks/use-table-filters";
import { setTableFilters } from "@/store/app/filter-slice";
import { setOrder, setSelected } from "@/store/app/columns-slice";
import { useContextMenu } from "@/hooks/use-context-menu";
import { useTableLogic } from "@/hooks/use-table-logic";
import { useTableColumns } from "@/hooks/use-table-columns";
import { OutageItemType } from "@/types/components/pages/outage";
import { GlobalTableHeader } from "@/components/ui/global-header/global-header";
import { OUTAGE_OPERATIONS_PERMISSIONS_ARRAY } from "@/helpers/permissions/outages/unplanned";
import { usePermissions } from "@/hooks/permissions/use-permissions";

const UnplannedOutageTable = ({
  fetchHook = useOutages,
}: {
  fetchHook?: any;
}) => {
  const { hasAnyPermission } = usePermissions();

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const tableName = "unplannedOutage";

  const {
    filters: appliedFilters,
    setFilter: onFilterChange,
    clearFilters: onFilterClear,
    removeFilterByKey,
    setRefetchCallback,
  } = useTableFilters(tableName);

  const {
    data,
    isLoading,
    isPending,
    refetch,
    selectedRows,
    toggleSelectRow,
    setSelectedRows,
    page,
    setPage,
    pageSize,
    setPageSize,
    tempFilters,
    setFilter,
    removeTempFilterByKey,
    sort,
    setSort,
    tableWholeFilterClear,
  } = useTableLogic<OutageItemType>({
    removeFilterByKey,
    onFilterClear,
    appliedFilters,
    fetchHook: fetchHook,
    getRowId: (item) => item.outageId,
  });

  useEffect(() => {
    setRefetchCallback(refetch);
  }, [refetch]);

  const handleIdClick = (rowData: OutageItemType) => {
    dispatch(
      openDrawer({
        title: "TBC524",
        type: "outage",
        id: rowData.outageId,
        rowData,
      }),
    );
  };

  const { contextMenu, contextMenuRef, openContextMenu, closeContextMenu } =
    useContextMenu({ selectedRows, setSelectedRows });

  const {
    selectedColumnKeys,
    setSelectedColumnKeys,
    columnOrder,
    setColumnOrder,
    effectiveColumns,
  } = useTableColumns({
    tableName: "unplannedOutage",
    allColumns: outageColumnsConfig(handleIdClick, t, tempFilters, setFilter),
  });

  useEffect(() => {
    dispatch(setOrder({ table: tableName, order: columnOrder }));
  }, [columnOrder]);

  useEffect(() => {
    dispatch(setSelected({ table: tableName, selected: selectedColumnKeys }));
  }, [selectedColumnKeys]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSelectedRows([]);
    refetch();
  };

  const handleSortChange = (field: string, direction: "Asc" | "Desc") => {
    setSort({ field, direction });
    setPage(0);
  };

  const handlePerPageChange = (newSize: any) => {
    setPageSize(newSize);
  };

  const onFilterSubmit = () => {
    dispatch(setTableFilters({ table: tableName, filters: tempFilters }));
    setPage(0);
  };

  const {
    isModalOpen,
    treeChartModal,
    modalSize,
    cancelationStep,
    modalValues,
    isDrawerOpen,
    drawerValues,
    closeDrawer,
    modalSizeHanlder,
    handleCancel,
    handleCloseModal,
    handleConfirm,
    optionsHandler,
    setDrawerValues,
    setIsDrawerOpen,
  } = useOutageActions();
  const hasOperationsPermission = useMemo(() => {
    // Return false if none of the permissions are granted
    return hasAnyPermission(OUTAGE_OPERATIONS_PERMISSIONS_ARRAY);
  }, [hasAnyPermission]);
  return (
    <>
      <div
        style={{ gridColumn: "span 12" }}
        className="outage-main-table"
        onContextMenu={openContextMenu}
        onClick={closeContextMenu}
        onKeyDown={(event) => {
          if (event.key === "Escape") closeContextMenu(event);
        }}
        onBlur={closeContextMenu}
      >
        <Table
          data={data?.items ?? []}
          columns={effectiveColumns}
          isLoading={isLoading || isPending}
          renderLoading={() => <Loader />}
          maxHeight="600px"
          headerChildren={
            <GlobalTableHeader
              title="Kesintiler Listesi"
              actions={
                <OutageTableHeader
                  selectedRows={selectedRows}
                  setSelectedColumnKeys={setSelectedColumnKeys}
                  selectedColumnKeys={selectedColumnKeys}
                  columnOrder={columnOrder}
                  setColumnOrder={setColumnOrder}
                  outageData={data?.items ?? []}
                  onFilterClear={tableWholeFilterClear}
                  appliedFilters={appliedFilters}
                  showOperations={hasOperationsPermission}
                />
              }
            />
          }
          selectRowsHandler={toggleSelectRow}
          hasCheckbox
          selectedRows={selectedRows}
          handleContextMenu={openContextMenu}
          idKey="outageId"
          totalPagesProp={data?.totalPages}
          pageChangeHanlder={handlePageChange}
          setCurrentPage={setPage}
          currentPage={page}
          appliedFilters={appliedFilters}
          onFilterChange={onFilterChange}
          onFilterSubmit={onFilterSubmit}
          onFilterClear={onFilterClear}
          removeFilterByKey={removeTempFilterByKey}
          currentSort={sort}
          onSortChange={handleSortChange}
          totalCount={data?.totalCount}
          setPageSize={handlePerPageChange}
          pageSize={pageSize}
          columnOrder={columnOrder}
          setColumnOrder={setColumnOrder}
        />
        {contextMenu && (
          <div
            style={{
              position: "absolute",
              top: contextMenu.y,
              left: contextMenu.x,
              background: "var(--bg-primary)",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              padding: "8px",
              zIndex: 1000,
              borderRadius: "12px",
              maxHeight: "480px",
              overflowY: "visible",
              minWidth: "330px",
            }}
            ref={contextMenuRef}
          >
            <OutageOperationContent
              optionsHandler={optionsHandler}
              selectedRows={selectedRows}
              setDrawerValues={setDrawerValues}
              setIsDrawerOpen={setIsDrawerOpen}
              isDrawerOpen={isDrawerOpen}
              outageData={data?.items ?? []}
            />
          </div>
        )}
      </div>
      <OutageOperationSections
        selectedRows={selectedRows}
        isModalOpen={isModalOpen}
        isDrawerOpen={isDrawerOpen}
        treeChartModal={treeChartModal}
        drawerValues={drawerValues}
        modalValues={modalValues}
        modalSize={modalSize}
        setIsDrawerOpen={setIsDrawerOpen}
        handleCloseModal={handleCloseModal}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        modalSizeHanlder={modalSizeHanlder}
        closeDrawer={closeDrawer}
        cancelationStep={cancelationStep}
        outageData={data?.items ?? []}
      />
    </>
  );
};

export default UnplannedOutageTable;

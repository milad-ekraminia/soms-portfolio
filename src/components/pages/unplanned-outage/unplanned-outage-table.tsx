import { Loader } from "@/components/ui/loader/loader";
import Table from "@/components/ui/Table/table";
import { outageColumns as outageColumnsConfig } from "@/helpers/data/outage-table-column";
import { useOutages } from "@/hooks/outage";
import { useOutageActions } from "@/hooks/use-outage-actions";
import { openDrawer } from "@/store/app/drawer-slice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./unplanned-outage.scss";
import OutageOperationContent from "./table-header/operations/outage-operation-content";
import OutageOperationSections from "./table-header/operations/outage-operations-sections";
import OutageTableHeader from "./table-header/outage-table-header";
import { useTranslation } from "react-i18next";
import { useTableFilters } from "@/hooks/use-table-filters";
import { FilterItem, setTableFilters } from "@/store/app/filter-slice";
import { setOrder, setSelected } from "@/store/app/columns-slice";

const UnplannedOutageTable = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    isModalOpen,
    treeChartModal,
    modalSize,
    cancelationStep,
    modalValues,
    isDrawerOpen,
    drawerValues,
    tableDrawer,
    closeDrawer,
    modalSizeHanlder,
    handleCancel,
    handleCloseModal,
    handleConfirm,
    optionsHandler,
    setTableDrawer,
    setDrawerValues,
    setIsDrawerOpen,
  } = useOutageActions();
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [tempFilters, setTempFilters] = useState<FilterItem[]>([]);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const handlePerPageChange = (newPage: any) => {
    setPageSize(newPage);
  };

  const [currentSort, setCurrentSort] = useState<{
    field: string;
    direction: "Asc" | "Desc";
  } | null>(null);

  const handleRowClick = (rowData: any) => {
    dispatch(
      openDrawer({
        title: "TBC524",
        type: "outage",
        id: rowData?.outageId,
        rowData,
      })
    );
  };
  const tableName = "unplannedOutage";
  const {
    filters: appliedFilters,
    setFilter: onFilterChange,
    clearFilters: onFilterClear,
    removeFilterByKey,
    setRefetchCallback,
  } = useTableFilters(tableName);
  const { data, isLoading, refetch, isPending } = useOutages(
    page,
    pageSize,
    appliedFilters,
    currentSort
  );
  useEffect(() => {
    setRefetchCallback(refetch);
  }, [refetch]);
  useEffect(() => {
    const isEqual =
      JSON.stringify(tempFilters) === JSON.stringify(appliedFilters);
    if (!isEqual) {
      setTempFilters(appliedFilters);
    }
  }, []);

  const setFilter = (key: string, filterType: string, value: any) => {
    const isEmpty =
      value === "" ||
      value == null ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === "object" &&
        !Array.isArray(value) &&
        // 🔧 Change: remove filter only if BOTH start and end are empty
        !value.start?.trim() &&
        !value.end?.trim());

    setTempFilters((prev) => {
      if (isEmpty) {
        return prev.filter((f) => f.key !== key);
      } else {
        const others = prev.filter((f) => f.key !== key);
        return [...others, { key, filterType, value }];
      }
    });
  };

  const handleSortChange = (field: string, direction: "Asc" | "Desc") => {
    setCurrentSort({ field, direction });
    setPage(0);
  };

  const outageColumns = outageColumnsConfig(
    handleRowClick,
    t,
    tempFilters,
    setFilter
  );

  const defaultSelected = outageColumns.map((col) => col.accessorKey);

  const defultOrder = outageColumns.map((col) => col.accessorKey);

  const {
    order: reduxOrder = defultOrder,
    selected: reduxSelected = defaultSelected,
  } = useSelector((state: any) => state.columns[tableName] ?? {});

  const [columnOrder, setColumnOrder] = useState<any>(reduxOrder);

  const [selectedColumnKeys, setSelectedColumnKeys] =
    useState<any>(reduxSelected);
  useEffect(() => {
    dispatch(setOrder({ table: tableName, order: columnOrder }));
  }, [columnOrder]);

  useEffect(() => {
    dispatch(setSelected({ table: tableName, selected: selectedColumnKeys }));
  }, [selectedColumnKeys]);

  const effectiveColumns = columnOrder
    .filter((accessorKey: any) => selectedColumnKeys.includes(accessorKey))
    .map((accessorKey: any) =>
      outageColumns?.find((col) => col.accessorKey === accessorKey)
    )
    .filter(Boolean) as typeof outageColumns;

  const handleContextMenu = (
    event: React.MouseEvent<HTMLElement>,
    rowId?: number
  ) => {
    event.preventDefault();

    const menuWidth = 310;
    const menuHeight = 600;
    let x = event.clientX;
    let y = event.clientY;

    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth - 10;
    }
    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight - 10;
    }

    if (selectedRows?.length === 0 && rowId !== undefined) {
      setSelectedRows([rowId]);
    }

    setContextMenu({ x, y });
  };

  const selectRowsHandler = (id: number, isAll = false) => {
    if (isAll) {
      if (selectedRows?.length === data?.data?.items.length) {
        deselectAllRows();
      } else {
        selectAllRows();
      }
    } else {
      if (selectedRows?.includes(id)) {
        setSelectedRows(selectedRows?.filter((rowId) => rowId !== id));
      } else {
        setSelectedRows([...selectedRows, id]);
      }
    }
  };

  const selectAllRows = () => {
    setSelectedRows(data?.data?.items?.map((row: any) => row.outageId) as any);
  };

  const deselectAllRows = () => {
    setSelectedRows([]);
  };

  const handleClose = (
    event: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>
  ) => {
    if (
      event.type === "click" ||
      (event.type === "focusout" &&
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node))
    ) {
      setContextMenu(null);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSelectedRows([]);
    refetch(); // ✅ manual refetch on page change
  };
  const onFilterSubmit = () => {
    dispatch(setTableFilters({ table: tableName, filters: tempFilters }));
    setPage(0); // reset page
  };
  const removeTempFilterByKey = (key: any) => {
    const temperoryFilters = tempFilters?.filter((f) => f.key !== key);
    setTempFilters(temperoryFilters);
    removeFilterByKey(key);
  };
  const tableWholeFilterClear = () => {
    setTempFilters([]);
    onFilterClear();
  };

  return (
    <>
      <div
        style={{ gridColumn: "span 12" }}
        className="outage-main-table"
        onContextMenu={(event) => handleContextMenu(event)}
        onClick={handleClose}
        onKeyDown={(event) => {
          if (event.key === "Escape") setContextMenu(null);
        }}
        onBlur={handleClose}
      >
        <Table
          data={data?.data?.items ?? []}
          columns={effectiveColumns}
          renderLoading={() => <Loader />}
          maxHeight="500px"
          isLoading={isLoading || isPending}
          headerChildren={
            <OutageTableHeader
              selectedRows={selectedRows}
              setSelectedColumnKeys={setSelectedColumnKeys}
              selectedColumnKeys={selectedColumnKeys}
              columnOrder={columnOrder}
              setColumnOrder={setColumnOrder}
              outageData={data?.data?.items ?? []}
              onFilterClear={tableWholeFilterClear}
            />
          }
          selectRowsHandler={selectRowsHandler}
          hasCheckbox
          selectedRows={selectedRows}
          handleContextMenu={handleContextMenu}
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
          currentSort={currentSort}
          onSortChange={handleSortChange}
          totalCount={data?.data.totalCount}
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
              background: "white",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              padding: "8px",
              zIndex: 1000,
              borderRadius: "12px",
              maxHeight: "420px",
              overflowY: "scroll",
              minWidth: "330px",
            }}
            ref={contextMenuRef}
          >
            <OutageOperationContent
              optionsHandler={optionsHandler}
              selectedRows={selectedRows}
              setTableDrawer={setTableDrawer}
              tableDrawer={tableDrawer}
              setDrawerValues={setDrawerValues}
              setIsDrawerOpen={setIsDrawerOpen}
              isDrawerOpen={isDrawerOpen}
              outageData={data?.data?.items ?? []}
            />
          </div>
        )}
      </div>
      <OutageOperationSections
        selectedRows={selectedRows}
        isModalOpen={isModalOpen}
        isDrawerOpen={isDrawerOpen}
        tableDrawer={tableDrawer}
        treeChartModal={treeChartModal}
        drawerValues={drawerValues}
        modalValues={modalValues}
        modalSize={modalSize}
        setTableDrawer={setTableDrawer}
        setIsDrawerOpen={setIsDrawerOpen}
        handleCloseModal={handleCloseModal}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        modalSizeHanlder={modalSizeHanlder}
        closeDrawer={closeDrawer}
        cancelationStep={cancelationStep}
        outageData={data?.data?.items ?? []}
      />
    </>
  );
};

export default UnplannedOutageTable;

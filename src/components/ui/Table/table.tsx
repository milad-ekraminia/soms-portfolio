import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ExpandedState, TableProps } from "@/types/components/ui/table";
import TableHeader from "./table-head/table-head";
import TableRow from "./table-row/table-row";
import "./table.scss";
import Pagination from "@/components/ui/Table/pagination/Pagination";
import { getClassNames } from "@/helpers/get-class-names";
import { TableBodySkeleton } from "./row-skleton/row-skleton";
import { NoTableDataSvg } from "@/assets/icons/no-table-data-svg";

interface TablePropsWithSorting<T> extends TableProps<T> {
  currentSort?: { field: string; direction: "Asc" | "Desc" } | null;
  onSortChange?: (field: string, direction: "Asc" | "Desc") => void;
  columnOrder: any;
  setColumnOrder: any;
}

const Table = <T,>({
  isLoading,
  data,
  columns,
  headerChildren,
  selectRowsHandler,
  hasRadio = false,
  setRadioSelect = () => {},
  selectedItem,
  hasCheckbox = false,
  selectedRows = [],
  hasPagination = true,
  handleContextMenu,
  idKey,
  totalPagesProp,
  pageChangeHanlder,
  setCurrentPage,
  currentPage,
  pageSize,
  setPageSize,
  appliedFilters,
  onFilterChange,
  onFilterSubmit,
  onFilterClear,
  removeFilterByKey,
  noDataPlaceHolder = "",
  currentSort,
  onSortChange,
  totalCount,
  setColumnOrder,
  columnOrder,
}: TablePropsWithSorting<T>) => {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [columnSizing, setColumnSizing] = useState({});

  const totalPages = totalPagesProp ?? 1;
  const defaultColumn: Partial<ColumnDef<T>> = {
    cell: (info) => {
      const v = info.getValue();
      // treat null/undefined/empty-string/empty-object as "no data"
      if (
        v == null ||
        (typeof v === "string" && v === "") ||
        (typeof v === "object" && !Array.isArray(v))
      ) {
        return "-";
      }
      return v as React.ReactNode;
    },
  };

  const table = useReactTable<T>({
    data,
    columns: columns as ColumnDef<T>[],
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row: any) => row?.children,
    getRowCanExpand: (row: any) => !!row.original?.children,
    state: {
      expanded: expanded,
      columnSizing,
      columnOrder,
    },
    onExpandedChange: setExpanded,
    columnResizeMode: "onChange", // or 'onEnd'
    enableColumnResizing: true,
    onColumnSizingChange: setColumnSizing,
    onColumnOrderChange: setColumnOrder, // ✅ allow reordering
  });
  const { rows } = table.getRowModel();
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const renderNotExist = useCallback(
    () => (
      <div className="not-exists-table">
        {noDataPlaceHolder ? (
          noDataPlaceHolder
        ) : (
          <>
            {" "}
            <NoTableDataSvg />
            <p className="not-exists">Henüz gösterilecek bir veri yok. </p>{" "}
          </>
        )}
      </div>
    ),
    []
  );
  const actualCurrentPage = currentPage ?? 0;
  // 2) default `setCurrentPage` to a no-op function
  const actualSetCurrentPage = setCurrentPage ?? (() => {});

  // …
  const handlePageChange = (page: number) => {
    // use your defaulted values
    actualSetCurrentPage(page);
    if (pageChangeHanlder) {
      pageChangeHanlder(page);
      tableContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePerPageChange = (newPageSize: number) => {
    setPageSize?.(newPageSize);
  };

  const ROW_HEIGHT = 40;
  const LOADING_ROWS = 10;
  const no_data_Rows = 6;
  const memoizedColumns = useMemo(() => columns, [columns]);
  const visibleColumns = table.getVisibleLeafColumns();

  return (
    <div
      className={getClassNames("table-wrapper", [
        [!!headerChildren, "borderless"],
      ])}
    >
      {headerChildren}
      <div
        ref={tableContainerRef}
        className={`table-container`}
        style={
          {
            // maxHeight: maxHeight,
            // overflowY: "auto",
            // overflowX: isLoading ? "hidden" : "auto",
          }
        }
      >
        {!isLoading && data?.length === 0 ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%) ",
              zIndex: "10",
            }}
          >
            <div style={{ height: "100%", width: "100%" }}>
              {renderNotExist()}
            </div>
          </div>
        ) : null}
        <table className="table-x" style={{ width: "100%" }}>
          <TableHeader
            headerGroups={table.getHeaderGroups()}
            selectRowsHandler={selectRowsHandler}
            hasCheckbox={hasCheckbox}
            selectedRows={selectedRows}
            data={data}
            hasRadio={hasRadio}
            appliedFilters={appliedFilters}
            onFilterChange={onFilterChange}
            onFilterSubmit={onFilterSubmit}
            removeFilterByKey={removeFilterByKey}
            currentSort={currentSort}
            onSortChange={onSortChange}
            columnOrder={columnOrder}
            setColumnOrder={setColumnOrder}
            columnSizing={columnSizing}
            onFilterClear={onFilterClear}
          />
          <tbody
            className="table-body"
            style={{
              height: isLoading
                ? `${ROW_HEIGHT * LOADING_ROWS}px`
                : data?.length === 0
                ? `${ROW_HEIGHT * no_data_Rows}px`
                : "auto",
            }}
          >
            {isLoading ? (
              <TableBodySkeleton
                visibleColumns={visibleColumns}
                rowsCount={LOADING_ROWS}
              />
            ) : data?.length === 0 ? null : (
              rows.map((row, rowIndex) => {
                return (
                  <React.Fragment key={row.id ?? rowIndex}>
                    <TableRow
                      key={rowIndex}
                      rowIndex={rowIndex}
                      data-testid={`row-${rowIndex}`}
                      onClick={() => {}}
                      columns={memoizedColumns}
                      row={row}
                      selectRowsHandler={selectRowsHandler}
                      hasCheckbox={hasCheckbox}
                      selectedRows={selectedRows}
                      hasRadio={hasRadio}
                      setRadioSelect={setRadioSelect}
                      selectedItem={selectedItem}
                      handleContextMenu={handleContextMenu}
                      idKey={idKey}
                    />
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {hasPagination && !isLoading && data?.length !== 0 ? (
        <Pagination
          currentPage={actualCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          hasCount={true}
          setPageSize={handlePerPageChange}
          pageSize={pageSize}
          totalCount={totalCount}
        />
      ) : null}
    </div>
  );
};

export default Table;

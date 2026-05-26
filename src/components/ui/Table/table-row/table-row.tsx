import { ChevronDownSvg } from "@/assets/icons/chevron-down-svg";
import { ChevronRightSvg } from "@/assets/icons/chevron-right-svg";
import { Checkbox } from "@/components/ui/input/check-box/check-box";
import { TableProps } from "@/types/components/ui/table";
import { flexRender, Row } from "@tanstack/react-table";
import React, { useEffect, useRef } from "react";
import { RadioInput } from "../../input/radio/radio-input";

interface TableRowProps<T>
  extends Pick<TableProps<T>, "columns">,
    React.HTMLProps<HTMLTableRowElement> {
  rowIndex: number;
  row: Row<T>;
  selectRowsHandler?: (id: number, isAll?: boolean) => void;
  hasCheckbox: boolean;
  selectedRows: number[];
  hasRadio?: boolean;
  selectedItem?: number;
  setRadioSelect?: (id: number) => void;
  handleContextMenu?: (
    event: React.MouseEvent<HTMLDivElement>,
    rowId?: number
  ) => void;
  idKey?: string;
}

const TableRowMemo = <T,>({
  rowIndex,
  row,

  hasCheckbox,
  selectRowsHandler,
  selectedRows = [],
  hasRadio = false,
  setRadioSelect = () => {},
  selectedItem,
  handleContextMenu,
  idKey,
}: TableRowProps<T>) => {
  const isExpanded = row.getIsExpanded();
  const rowRef = useRef<HTMLTableRowElement>(null);

  const isOverflowing = (element: HTMLElement | null) =>
    element ? element.scrollWidth > element.clientWidth : false;
  const spanRefs = useRef<(HTMLDivElement | HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    spanRefs.current.forEach((span) => {
      if (isOverflowing(span)) {
        span?.setAttribute("title", span?.textContent ?? "");
      } else {
        span?.removeAttribute("title");
      }
    });
  }, [rowIndex]);
  const rowId = (row.original as any)?.[idKey ?? "id"]; // fallback to "id"
  const isChecked = selectedRows?.includes(Number(rowId));

  // const isChecked = selectedRows?.includes(Number(row?.original?.id));
  const original = row.original as any;
  const hasChildren =
    Array.isArray(original?.children) && original?.children.length > 0;
  const isParentRow =
    Array.isArray(original?.children) && original?.children.length > 0;

  const isChildRow = row.depth > 0;
  const isStandalone = !hasChildren && !isChildRow;
  return (
    <tr
      ref={rowRef}
      data-index={rowIndex}
      className={`table-row ${isExpanded ? "expanded" : ""}`}
      id={`row${rowIndex}`}
      onContextMenu={(event) => handleContextMenu?.(event, Number(rowId))}
      tabIndex={0}
      role="row"
    >
      {row.getVisibleCells().map((cell, cellIndex) => {
        const width = cell.column.getSize() + 40;

        return (
          <td
            key={cell.id}
            style={{
              width,
              maxWidth: width,
              minWidth: width,
              paddingLeft:
                (isParentRow && cellIndex === 0) || isStandalone
                  ? "0px"
                  : "20px",
            }}
            ref={(el) => {
              spanRefs.current[cellIndex] = el;
            }}
            className="table-row__container"
          >
            <div className="table-row__container-cell">
              {hasCheckbox && cellIndex === 0 ? (
                <Checkbox
                  checked={isChecked}
                  onChange={() => {
                    if (selectRowsHandler) {
                      selectRowsHandler(Number(rowId));
                    }
                  }}
                />
              ) : null}
              {hasChildren && cellIndex === 0 ? (
                <button
                  className="expand-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    row.getToggleExpandedHandler()?.();
                  }}
                >
                  {isExpanded ? <ChevronDownSvg /> : <ChevronRightSvg />}
                </button>
              ) : null}
              {hasRadio && cellIndex === 0 ? (
                <RadioInput
                  checked={selectedItem === rowId}
                  onChange={() => setRadioSelect(rowId)}
                />
              ) : null}
              <div
                ref={(el) => {
                  spanRefs.current[cellIndex] = el;
                }}
                className="cell-content"
                title={
                  cell.getValue() !== undefined &&
                  cell.getValue() !== null &&
                  typeof cell.getValue() !== "object"
                    ? String(cell.getValue())
                    : undefined
                }
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            </div>
          </td>
        );
      })}
    </tr>
  );
};

const TableRow = React.memo(TableRowMemo);
export default TableRow;

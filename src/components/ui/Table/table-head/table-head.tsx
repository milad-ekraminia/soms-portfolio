/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from "react";
import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { FilterSvg } from "@/assets/icons/filter-svg";
import { SortSvg } from "@/assets/icons/sort-svg";
import { Button } from "@/components/ui/button/button";
import { PortalDropdownWrapper } from "@/components/ui/dropdown/portal-dropdown-wrapper/portal-dropdown-wrapper";
import { Checkbox } from "@/components/ui/input/check-box/check-box";
import { TableFilter } from "@/types/table-filter";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableHeaderCell from "../sortable-header-cell/sortable-header-cell";
interface HeaderProps {
  headerGroups: HeaderGroup<any>[];
  data: any;
  selectRowsHandler?: (id: number, isAll?: boolean) => void;
  hasCheckbox: boolean;
  selectedRows?: number[];
  hasRadio: boolean;
  appliedFilters?: TableFilter[];
  onFilterChange?: (
    key: string,
    filterType: string,
    value: string | number
  ) => void;
  onFilterSubmit?: () => void;
  removeFilterByKey?: (id: any) => void;
  currentSort?: { field: string; direction: "Asc" | "Desc" } | null;
  onSortChange?: (field: string, direction: "Asc" | "Desc") => void;
  columnOrder: any;
  setColumnOrder: any;  columnSizing: any;  onFilterClear?: () => void;


}

const TableHeaderMemo = ({
  headerGroups,
  selectRowsHandler,
  hasCheckbox,
  selectedRows,
  data,
  hasRadio,
  appliedFilters = [],
  onFilterChange,
  onFilterSubmit,
  removeFilterByKey,
  currentSort,
  onSortChange,
  columnOrder,
  setColumnOrder,
  onFilterClear: _onFilterClear,
  columnSizing: _columnSizing,
}: HeaderProps) => {
  const thRef = useRef<HTMLTableCellElement>(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = columnOrder.indexOf(active.id);
      const newIndex = columnOrder.indexOf(over.id);
      setColumnOrder(arrayMove(columnOrder, oldIndex, newIndex));
    }
  };
  // Utility to get filter value for a column from appliedFilters
  const getFilterForColumn = (key: string) => {
    return appliedFilters.find((filter) => filter.key === key) || null;
  };

  const checkCategoryStatus = () => {
    const total = data?.length ?? 0;
    const activeCount = selectedRows?.length ?? 0;
    if (total === 0) return "deactive";

    if (activeCount === total) return "active";
    if (activeCount === 0) return "deactive";
    return "semi";
  };

  const handleSortClick = (columnId: string) => {
    if (!onSortChange) return;

    if (currentSort?.field === columnId) {
      const newDirection = currentSort.direction === "Desc" ? "Asc" : "Desc";
      onSortChange(columnId, newDirection);
    } else {
      onSortChange(columnId, "Desc");
    }
  };

  return (
    <thead className="table-head" data-testid="header">
      {headerGroups.map((headerGroup) => (
        <DndContext
          key={headerGroup.id}
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={columnOrder ?? []}
            strategy={verticalListSortingStrategy}
          >
            <tr key={headerGroup.id} className="table-head__row">
              {headerGroup.headers.map((header, index) => {
                const columnId = header.column.id as string;
                const filterComponent =
                  (header?.column?.columnDef as any)?.filterComponent || null;

                // Find current filter for this column if any
                const currentFilter = getFilterForColumn(columnId);

                const columnDef = header.column.columnDef as {
                  accessorKey?: string;
                };
                const accessorKey = columnDef.accessorKey;
                const checked = checkCategoryStatus();
                const hasRadioBtn = hasRadio && index === 0;

                // Sıralama durumu
                const canSort =
                  (header?.column?.columnDef as any)?.enableSorting !== false;
                return (
                  <th
                    ref={thRef}
                    id={columnId}
                    key={header.id}
                    {...{
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize() + 40,
                        position: "relative",
                        cursor: "pointer",
                      },
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="table-head__cell-content">
                        {hasCheckbox && index === 0 ? (
                          <div>
                            <Checkbox
                              onChange={() => {
                                if (hasCheckbox && selectRowsHandler) {
                                  selectRowsHandler(-1, true);
                                }
                              }}
                              checked={
                                checked === "active" || checked === "semi"
                              }
                              status={checked}
                            />
                          </div>
                        ) : null}
                        {hasRadioBtn ? <div></div> : null}
                        <SortableHeaderCell id={columnId}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </SortableHeaderCell>

                        {filterComponent && (
                          <PortalDropdownWrapper
                            toggleBtn={
                              <FilterSvg
                                stroke={
                                  currentFilter ? "var(--brand-600)" : undefined
                                }
                              />
                            }
                            closeButton={false}
                            leftOffset={-170}
                            bottomButtons={
                              <div style={{ display: "flex", gap: "10px" }}>
                                <Button
                                  variant="primary"
                                  onClick={onFilterSubmit}
                                >
                                  Filtre
                                </Button>
                                <Button
                                  variant="secondary"
                                  onClick={() => {
                                    removeFilterByKey?.(accessorKey);
                                  }}
                                >
                                  Sil
                                </Button>
                              </div>
                            }
                          >
                            {filterComponent(
                              (value: string | number) =>
                                onFilterChange?.(
                                  columnId,
                                  currentFilter?.filterType || "string",
                                  value
                                ),
                              currentFilter?.value
                            )}
                          </PortalDropdownWrapper>
                        )}
                        {canSort && !!onSortChange && (
                          <div
                            onClick={() => handleSortClick(columnId)}
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <SortSvg
                              fill={
                                currentSort?.field === columnId
                                  ? "var(--brand-600)"
                                  : undefined
                              }
                            />
                          </div>
                        )}
                      </div>
                    )}
                    <div
                      {...{
                        onDoubleClick: () => header.column.resetSize(),
                        onMouseDown: (e) => {
                          e.stopPropagation(); // <--- Prevent DnD from starting
                          header.getResizeHandler()?.(e);
                        },
                        onTouchStart: (e) => {
                          e.stopPropagation(); // <--- Prevent DnD from starting
                          header.getResizeHandler()?.(e);
                        },
                        className: `  ${
                          header.column.getIsResizing() ? "isResizing" : ""
                        }`,
                      }}
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        height: "100%",
                        width: "4px",
                        cursor: "col-resize",
                        userSelect: "none",
                        touchAction: "none",
                      }}
                    />
                  </th>
                );
              })}
            </tr>
          </SortableContext>
        </DndContext>
      ))}
    </thead>
  );
};
const TableHeader = React.memo(TableHeaderMemo);

export default TableHeader;

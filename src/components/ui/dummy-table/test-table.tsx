import React, { JSX } from "react";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  GroupingState,
} from "@tanstack/react-table";

interface DataRow {
  [key: string]: any;
}

interface TableProps {
  data: DataRow[];
  columns: ColumnDef<DataRow>[];
  title?: string;
}

export const TestTable: React.FC<TableProps> = ({ data, columns, title }) => {
  const [grouping, setGrouping] = React.useState<GroupingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { grouping },
    onGroupingChange: setGrouping,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  // Ensure we show all rows (disable pagination limit by setting pageSize)
  React.useEffect(() => {
    table.setPageSize(data?.length ?? 200);
  }, [data?.length, table]);

  // Max depth
  const getMaxDepth = (cols: ColumnDef<DataRow>[]): number => {
    let max = 1;
    cols.forEach((col: any) => {
      if (col.columns) max = Math.max(max, 1 + getMaxDepth(col.columns));
    });
    return max;
  };
  const maxDepth = getMaxDepth(columns);

  const countLeafCols = (col: any): number => {
    if (!col.columns || col.columns.length === 0) return 1;
    return col.columns.reduce((sum: any, c: any) => sum + countLeafCols(c), 0);
  };

  const totalLeafCols = columns.reduce(
    (acc, c: any) => acc + countLeafCols(c),
    0
  );

  const headerCommonStyle: React.CSSProperties = {
    border: "1px solid #000",
    padding: 4,
    textAlign: "center",
    backgroundColor: "#FFF176", // yellow tone
    color: "#000",
    fontWeight: 700,
    fontSize: 12,
  };

  // Build header rows (fixed so vertical parent rotates label but children render in next rows)
  const buildHeaders = (
    cols: ColumnDef<DataRow>[],
    level = 0
  ): JSX.Element[] => {
    const trChildren: JSX.Element[] = cols.map((col: any, idx: number) => {
      const hasChildren = !!(col.columns && col.columns.length > 0);
      const leafCount = hasChildren ? countLeafCols(col) : 1;
      const uniqueKey =
        col.id || `${level}-${idx}-${String(col.header ?? "col")}`;

      if (hasChildren) {
        return (
          <th
            key={uniqueKey}
            colSpan={leafCount}
            rowSpan={1}
            style={{
              ...headerCommonStyle,
              writingMode: col.meta?.vertical ? "vertical-rl" : "horizontal-tb",
              transform: col.meta?.vertical ? "rotate(180deg)" : "none",
              verticalAlign: "middle",
            }}
          >
            {flexRender(col.header, {})}
          </th>
        );
      }

      // Leaf column: span remaining rows so table headers align.
      const rowSpan = maxDepth - level;
      const isVertical = !!col.meta?.vertical;
      return (
        <th
          key={uniqueKey}
          rowSpan={rowSpan}
          style={{
            ...headerCommonStyle,
            writingMode: isVertical ? "vertical-rl" : "horizontal-tb",
            transform: isVertical ? "rotate(180deg)" : "none",
            verticalAlign: "middle",
          }}
        >
          {flexRender(col.header, {})}
        </th>
      );
    });

    const headers: JSX.Element[] = [<tr key={level}>{trChildren}</tr>];

    // collect children for next level
    const nextLevelCols: ColumnDef<DataRow>[] = [];
    cols.forEach((col: any) => {
      if (col.columns && col.columns.length > 0)
        nextLevelCols.push(...col.columns);
    });

    if (nextLevelCols.length > 0)
      headers.push(...buildHeaders(nextLevelCols, level + 1));

    return headers;
  };

  // Build table rows
  const buildRows = () => {
    return table.getRowModel().rows.map((row) => (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell: any) => {
          return (
            <td
              key={cell.id}
              style={{
                border: "1px solid #000",
                padding: 4,
                textAlign: "center",
                writingMode: "horizontal-tb",
                transform: "none",
                whiteSpace: "nowrap",
              }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        {title ? (
          <tr>
            <th
              colSpan={totalLeafCols}
              style={{
                border: "1px solid #000",
                backgroundColor: "#64B5F6", // blue title band
                color: "#000",
                fontWeight: 700,
                textAlign: "center",
                padding: 6,
              }}
            >
              {title}
            </th>
          </tr>
        ) : null}
        {buildHeaders(columns)}
      </thead>
      <tbody>{buildRows()}</tbody>
    </table>
  );
};

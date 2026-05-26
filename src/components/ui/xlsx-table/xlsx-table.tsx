import React, { JSX } from "react";

export interface XlsxColumnNode {
  label: string | number;
  key?: string;
  vertical?: boolean;
  children?: XlsxColumnNode[];
}

interface TableProps<T extends Record<string, any>> {
  data: T[];
  columns: XlsxColumnNode[];
  title?: string;
}

// ---- STATIC STYLES (no new object each render)
const headerStyle: React.CSSProperties = {
  border: "1px solid #000",
  background: "#FFF176",
  padding: 4,
  fontWeight: 700,
  textAlign: "center",
  fontSize: 12,
  color: "#000",
};

const titleStyle: React.CSSProperties = {
  border: "1px solid #000",
  background: "#64B5F6",
  color: "#000",
  fontWeight: 700,
  textAlign: "center",
  padding: 6,
};

const cellStyle: React.CSSProperties = {
  border: "1px solid #000",
  padding: 4,
  textAlign: "center",
  whiteSpace: "nowrap",
  fontSize: 12,
};

// ---- PURE HELPERS
const countLeafs = (col: XlsxColumnNode): number =>
  col.children?.length
    ? col.children.reduce((sum, c) => sum + countLeafs(c), 0)
    : 1;

const getMaxDepth = (cols: XlsxColumnNode[]): number => {
  let max = 1;
  for (const c of cols) {
    if (c.children?.length) max = Math.max(max, 1 + getMaxDepth(c.children));
  }
  return max;
};

const getLeafColumns = (cols: XlsxColumnNode[]): XlsxColumnNode[] => {
  const acc: XlsxColumnNode[] = [];
  const walk = (n: XlsxColumnNode) => {
    if (n.children?.length) n.children.forEach(walk);
    else acc.push(n);
  };
  cols.forEach(walk);
  return acc;
};

// ---- MEMOIZED COMPONENT
export const XlsxNestedTable = React.memo(function XlsxNestedTable<
  T extends Record<string, any>
>({ data, columns, title }: TableProps<T>) {
  const maxDepth = React.useMemo(() => getMaxDepth(columns), [columns]);
  const leafColumns = React.useMemo(() => getLeafColumns(columns), [columns]);

const buildHeaders = React.useCallback(
  (cols: XlsxColumnNode[], level = 0): JSX.Element[] => {
    const rowCells = cols.map((col, idx) => {
      const hasChildren = !!col.children?.length;
      const colSpan = hasChildren
        ? col.children!.reduce((sum, c) => sum + countLeafs(c), 0)
        : 1;
      const rowSpan = hasChildren ? 1 : maxDepth - level;

      return (
        <th
          key={`${level}-${idx}-${col.label}`}
          colSpan={colSpan}
          rowSpan={rowSpan}
          style={{
            ...headerStyle,
            writingMode: col.vertical ? "vertical-rl" : "horizontal-tb",
            transform: col.vertical ? "rotate(180deg)" : "none",
            verticalAlign: "middle",
          }}
        >
          {col.label}
        </th>
      );
    });

    const nextLevelCols = cols.flatMap((col) => col.children ?? []);

    // Explicitly JSX.Element[]
    const rows: JSX.Element[] = [<tr key={`row-${level}`}>{rowCells}</tr>];

    if (nextLevelCols.length > 0)
      rows.push(...buildHeaders(nextLevelCols, level + 1));

    return rows;
  },
  [maxDepth]
);


  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        {title && (
          <tr>
            <th colSpan={leafColumns.length} style={titleStyle}>
              {title}
            </th>
          </tr>
        )}
        {buildHeaders(columns)}
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {leafColumns.map((col, j) => (
              <td key={j} style={cellStyle}>
                {col.key ? row[col.key] ?? "" : ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});

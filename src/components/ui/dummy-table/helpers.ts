// helpers.ts
import * as XLSX from "xlsx";

export const flattenHeaders = (columns: any[], level = 0, parentKey = "") => {
  let flat: any[] = [];
  columns.forEach((col) => {
    const key = parentKey ? `${parentKey}_${col.title}` : col.title;

    if (col.children) {
      const children = flattenHeaders(col.children, level + 1, key);
      flat.push({ ...col, key, colSpan: children.length, rowSpan: 1 });
      flat = flat.concat(children);
    } else {
      flat.push({ ...col, key, colSpan: 1, rowSpan: 1 });
    }
  });
  return flat;
};

export const flattenRows = (rows: any[]) => {
  return rows; // no changes needed for your row structure
};
export function getColSpan(node: any): number {
  if (!node.children) return 1;
  return node.children.reduce(
    (acc: number, child: any) => acc + getColSpan(child),
    0
  );
}

// export function flattenRows(rows: any[], level = 0, result: any[] = []) {
//   rows.forEach((row) => {
//     const span = getRowSpan(row);
//     result.push({ ...row, level, rowSpan: span });
//     if (row.children) flattenRows(row.children, level + 1, result);
//   });
//   return result;
// }

export function getRowSpan(node: any): number {
  if (!node.children) return 1;
  return node.children.reduce(
    (acc: number, child: any) => acc + getRowSpan(child),
    0
  );
}


export function exportToExcel(viewData: any) {
  const wsData: any[][] = [];
  const merges: any[] = [];

  // Flatten headers for Excel
  const flatCols = flattenHeaders(viewData.columns);
  const maxLevel = Math.max(...flatCols.map((c) => c.level));
  for (let level = 0; level <= maxLevel; level++) {
    const row: any[] = [];
    flatCols
      .filter((c) => c.level === level)
      .forEach((c) => {
        row.push(c.title);
        if (c.colSpan > 1)
          merges.push({
            s: { r: level, c: row.length - 1 },
            e: { r: level, c: row.length - 1 + c.colSpan - 1 },
          });
        for (let i = 1; i < c.colSpan; i++) row.push(null); // empty cells for merge
      });
    wsData.push(row);
  }

  // Flatten rows for Excel
  const flatRows = flattenRows(viewData.rows);
  flatRows.forEach((row) => {
    const rowData: any[] = [];
    rowData.push(row.title);
    for (const col of flatCols) rowData.push(`Data ${row.title}-${col.title}`);
    wsData.push(rowData);
  });

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  ws["!merges"] = merges;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "complex_table.xlsx");
}

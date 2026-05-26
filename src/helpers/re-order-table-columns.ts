import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

interface ReorderColumnsProps<T> {
  columns: ColumnDef<T, any>[];
  order: string[]; // array of column IDs in desired order
}

export function useReorderedColumns<T>({
  columns,
  order,
}: ReorderColumnsProps<T>) {
  return useMemo(() => {
    const colMap = new Map(
      columns.map((col:any) => [col.id ?? col.accessorKey, col])
    );
    return order.map((id) => colMap.get(id)).filter(Boolean) as ColumnDef<
      T,
      any
    >[];
  }, [columns, order]);
}

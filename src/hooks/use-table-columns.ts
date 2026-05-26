import { setOrder, setSelected } from "@/store/app/columns-slice";
import { useMemo, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

type Column = {
  accessorKey: string;
  [key: string]: any;
};

export const useTableColumns = ({
  tableName,
  allColumns,
}: {
  tableName: string;
  allColumns: Column[];
}) => {
  const dispatch = useDispatch();

  const defaultSelected = useMemo(
    () => allColumns?.map((col) => col?.accessorKey),
    [allColumns]
  );
  const defaultOrder = useMemo(
    () => allColumns?.map((col) => col?.accessorKey),
    [allColumns]
  );

  const reduxState = useSelector((state: any) => state.columns?.[tableName]);

  // ✅ initialize only if this table has no state yet
  useEffect(() => {
    if (!reduxState) {
      dispatch(setOrder({ table: tableName, order: defaultOrder }));
      dispatch(setSelected({ table: tableName, selected: defaultSelected }));
    }
  }, [reduxState, dispatch, tableName, defaultOrder, defaultSelected]);

  const columnOrder: string[] = Array.isArray(reduxState?.order)
    ? reduxState.order
    : defaultOrder;

  const selectedColumnKeys: string[] = Array.isArray(reduxState?.selected)
    ? reduxState.selected
    : defaultSelected;

  // --- Dispatchers ---
  const updateSelected = useCallback(
    (selected: string[] | ((prev: string[]) => string[])) => {
      const currentSelected = Array.isArray(reduxState?.selected)
        ? reduxState.selected
        : defaultSelected;

      const nextSelected =
        typeof selected === "function" ? selected(currentSelected) : selected;

      dispatch(setSelected({ table: tableName, selected: nextSelected }));
    },
    [dispatch, tableName, reduxState?.selected, defaultSelected]
  );
  const updateOrder = useCallback(
    (order: string[] | ((prev: string[]) => string[])) => {
      // handle functional updates (like React's setState)
      if (typeof order === "function") {
        dispatch(
          setOrder({
            table: tableName,
            order: order(columnOrder), // pass current order
          })
        );
      } else {
        dispatch(setOrder({ table: tableName, order }));
      }
    },
    [dispatch, tableName, columnOrder]
  );
  const effectiveColumns = useMemo(() => {
    return columnOrder
      ?.filter(
        (accessorKey) =>
          Array.isArray(selectedColumnKeys) &&
          selectedColumnKeys?.includes(accessorKey)
      )
      ?.map((accessorKey) =>
        allColumns?.find((col) => col?.accessorKey === accessorKey)
      )
      ?.filter(Boolean) as Column[];
  }, [columnOrder, selectedColumnKeys, allColumns]);
  return {
    selectedColumnKeys,
    setSelectedColumnKeys: updateSelected,
    columnOrder,
    setColumnOrder: updateOrder,
    effectiveColumns,
  };
};

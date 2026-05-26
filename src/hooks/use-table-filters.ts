import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  clearTableFilters,
  FilterItem,
  removeTableFilter,
  setTableFilter,
  setTableFilters,
} from "@/store/app/filter-slice";

export const useTableFilters = (
  tableName: string,
  defaultFilters?: FilterItem[]
) => {
  const dispatch = useDispatch();
  const refetchRef = useRef<() => void | undefined>(undefined);
  const setRefetchCallback = (cb: () => void) => {
    refetchRef.current = cb;
  };
  const hasInitializedDefaults = useRef(false); // ✅ ensure we only apply once

  const filters: FilterItem[] =
    useSelector((state: any) => state.tableFilters.filters[tableName]) || [];

  const setFilter = useCallback(
    (key: string, filterType: string, value: any) => {
      const isEmpty =
        value === "" ||
        value == null ||
        (Array.isArray(value) && value.length === 0) || // <-- handle empty arrays here
        (typeof value === "object" &&
          !Array.isArray(value) && // exclude arrays from this check
          !value.start?.trim() &&
          !value.end?.trim());

      if (isEmpty) {
        dispatch(removeTableFilter({ table: tableName, key }));
      } else {
        dispatch(
          setTableFilter({
            table: tableName,
            filter: { key, filterType, value },
          })
        );
      }
    },
    [dispatch, tableName]
  );

  const clearFilters = useCallback(() => {
    dispatch(clearTableFilters(tableName));
    refetchRef.current?.();
  }, [dispatch, tableName]);

  const getFilterValue = (key: string) => {
    return filters.find((f) => f.key === key)?.value;
  };

  const removeFilterByKey = useCallback(
    (key: string) => {
      dispatch(removeTableFilter({ table: tableName, key }));
      refetchRef.current?.();
    },
    [dispatch, tableName]
  );
  useEffect(() => {
    if (hasInitializedDefaults.current) return;

    if (defaultFilters && defaultFilters.length > 0 && filters.length === 0) {
      // ✅ use plural reducer for multiple filters
      dispatch(
        setTableFilters({
          table: tableName,
          filters: defaultFilters,
        })
      );
    }

    hasInitializedDefaults.current = true;
  }, [dispatch, tableName, defaultFilters, filters.length]);
  return {
    filters,
    setFilter,
    clearFilters,
    getFilterValue,
    removeFilterByKey,
    setRefetchCallback, // ✅ expose it
  };
};

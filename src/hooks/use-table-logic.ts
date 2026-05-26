import { useEffect, useState, useMemo } from "react";
import { FilterItem } from "@/store/app/filter-slice";
import { UseQueryResult } from "@tanstack/react-query";
import {
  NormalizedTableData,
  SortType,
  TableQueryResult,
} from "@/types/hooks/table-hook";

type UseTableLogicProps<T> = {
  removeFilterByKey: (key: string) => void;
  onFilterClear: () => void;
  appliedFilters: FilterItem[];
  fetchHook: (
    page: number,
    pageSize: number,
    filters: FilterItem[],
    sort?: SortType | null,
    enabledFetch?: boolean
  ) => UseQueryResult<TableQueryResult<T>, Error>;
  getRowId: (item: T) => number;
  enabledFetch?: boolean;
};

export const useTableLogic = <T>({
  removeFilterByKey,
  onFilterClear,
  appliedFilters,
  fetchHook,
  getRowId,
  enabledFetch = true,
}: UseTableLogicProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [tempFilters, setTempFilters] = useState<FilterItem[]>([]);
  const [sort, setSort] = useState<SortType | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const { data, isLoading, isPending, refetch } = fetchHook(
    page,
    pageSize,
    appliedFilters,
    sort,
    enabledFetch
  );

  // --- Normalize API data ---
  const normalizedData: NormalizedTableData<T> = useMemo(() => {
    if (!data)
      return { items: [], totalCount: 0, totalPages: 0, currentPage: 0 };
    if ("data" in data) {
      return {
        items: data.data.items,
        totalCount: data.data.totalCount,
        totalPages: data.totalPages,
        currentPage: data.currentPage ?? 0,
        extraProperties: { ...data?.data?.extraProperties },
      };
    }

    if ("responseList" in data && data.responseList.length > 0) {
      const first = data.responseList[0];
      return {
        items: first.data.items,
        totalCount: first.data.totalCount,
        totalPages: first.totalPages,
        currentPage: first.currentPage ?? 0,
      };
    }

    return { items: [], totalCount: 0, totalPages: 0, currentPage: 0 };
  }, [data]);

  // --- Row selection ---
  const toggleSelectRow = (id: number, isAll = false) => {
    const dataItems = normalizedData.items;

    if (isAll && dataItems) {
      const allIds = dataItems.map((item) => getRowId(item));
      const isAllSelected =
        selectedRows.length === allIds.length &&
        allIds.every((id) => selectedRows.includes(id));

      setSelectedRows(isAllSelected ? [] : allIds);
    } else {
      setSelectedRows((prev) =>
        prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
      );
    }
  };

  // --- Filtering logic ---
  const setFilter = (key: string, filterType: string, value: any) => {
    const isEmpty =
      value === "" ||
      value == null ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === "object" &&
        !Array.isArray(value) &&
        !value.start?.trim() &&
        !value.end?.trim());

    setTempFilters((prev) => {
      const filtered = prev.filter((f) => f.key !== key);
      return isEmpty ? filtered : [...filtered, { key, filterType, value }];
    });
  };

  const removeTempFilterByKey = (key: string) => {
    setTempFilters((prev) => prev.filter((f) => f.key !== key));
    removeFilterByKey(key);
  };

  const tableWholeFilterClear = () => {
    setTempFilters([]);
    onFilterClear();
  };

  // --- Effects ---
  useEffect(() => {
    const isEqual =
      JSON.stringify(tempFilters) === JSON.stringify(appliedFilters);
    if (!isEqual) {
      setTempFilters(appliedFilters);
    }
  }, []);

  useEffect(() => {
    setSelectedRows([]);
  }, [normalizedData.items.map(getRowId).join(",")]);

  return {
    data: normalizedData,
    isLoading,
    isPending,
    refetch,
    selectedRows,
    setSelectedRows,
    toggleSelectRow,
    page,
    setPage,
    pageSize,
    setPageSize,
    tempFilters,
    setTempFilters,
    setFilter,
    removeTempFilterByKey,
    tableWholeFilterClear,
    sort,
    setSort,
  };
};

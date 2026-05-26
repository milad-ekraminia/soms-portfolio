import { TableQueryResult } from "@/types/hooks/table-hook";

type NormalizedTableData<T> = {
  items: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

export const useNormalizedTableData = <T>(
  data?: TableQueryResult<T>
): NormalizedTableData<T> => {
  if (!data) return { items: [], totalCount: 0, totalPages: 0, currentPage: 0 };

  if ("data" in data) {
    // Main shape
    return {
      items: data.data.items,
      totalCount: data.data.totalCount,
      totalPages: data.totalPages,
      currentPage: data.currentPage ?? 0,
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
};


export type TableQueryResult<T> =
  | {
      data: { items: T[]; totalCount: number; extraProperties?: any };
      totalPages: number;
      currentPage?: number;
    }
  | {
      responseList: {
        data: { items: T[]; totalCount: number };
        totalPages: number;
        currentPage?: number;
      }[];
    };
export type SortType = { field: string; direction: "Asc" | "Desc" };

export type NormalizedTableData<T> = {
  extraProperties?: any;
  items: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

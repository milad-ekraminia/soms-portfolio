import { TableFilter } from "@/types/table-filter";
import { JSX } from "react";

export interface TableProps<T> {
  // todo will add type based on api
  columns: any[];
  data: T[];
  className?: string;
  isFetching?: boolean;
  headerChildren?: JSX.Element;
  selectRowsHandler?: (id: number, isAll?: boolean) => void;
  renderLoading?: () => React.ReactNode;
  onFilterKeyChange?: () => void;
  maxHeight?: number | string;
  perPage?: number;
  isLoading?: boolean;
  mode?: "infinite" | "paging";
  currentPage?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;
  fetchNextPage?: () => void;
  fetchPreviousPage?: () => void;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFetchingPreviousPage?: boolean;
  isFetchingNextPage?: boolean;
  hasCheckbox?: boolean;
  hasRadio?: boolean;
  selectedItem?: number;
  setRadioSelect?: (id: number) => void;
  selectedRows?: number[];
  hasPagination?: boolean;
  handleContextMenu?: (
    event: React.MouseEvent<HTMLDivElement>, // Accepts both row and div elements
    rowId?: number,
    secondaryValue?: any
  ) => void;
  idKey?: string;
  totalPagesProp?: number;
  pageChangeHanlder?: (page: number) => void;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  pageSize?: number;
  appliedFilters?: TableFilter[]; // Current applied filters sent from parent
  onFilterChange?: (
    key: string,
    filterType: string,
    value: string | number
  ) => void; // Called on filter input change (local working filters)
  onFilterSubmit?: () => void; // Called when user submits filter
  onFilterClear?: () => void; // Called when user clears filters
  removeFilterByKey?: (id: any) => void; // Called when user clears filters
  noDataPlaceHolder?: string;
}
export type ExpandedState = true | Record<string, boolean>;

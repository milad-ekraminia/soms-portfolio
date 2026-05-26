import { STALE_TIMES } from "@/helpers/data/query";

import { fetchOutageGrid } from "@/services/outages/outage-grid";
import {
  PostOutagesCancellation,
  PostPlannedAwaitingOutagesCancellation,
} from "@/services/outages/post-outage-cancellation";
import { PostPlannedOutageConfirm } from "@/services/outages/planned-outage-grid";
import { TableFilter } from "@/types/table-filter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { mockOutageItems } from "@/pages/unplanned-outages/mockData";

const IS_MOCK = import.meta.env.VITE_MOCK === "true";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useOutages = (
  page: number = 0,
  pageSize = 20,
  appliedFilters: TableFilter[] = [],
  sorting?: { field: string; direction: "Asc" | "Desc" } | null,
  enabledFetch: boolean = true,
) => {
  const refreshInterval = useSelector(
    (state: any) => state.refresh["outages"] ?? false,
  );

  return useQuery({
    queryKey: ["outages", page, pageSize, appliedFilters, sorting],
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        const start = page * pageSize;
        const end = start + pageSize;
        const items = mockOutageItems.slice(start, end);
        const totalCount = mockOutageItems.length;
        const totalPages = Math.ceil(totalCount / pageSize);

        return {
          data: { items, totalCount },
          currentPage: page,
          totalPages,
        };
      }

      const response = await fetchOutageGrid({
        page: page + 1,
        pageSize,
        appliedFilters,
        sorting,
      });

      const items = response?.data?.items;
      const totalCount = response?.data?.totalCount;
      return {
        data: { items, totalCount },
        currentPage: page,
        totalPages: response?.totalPages,
      };
    },
    staleTime: STALE_TIMES.MEDIUM,
    refetchInterval: refreshInterval,
    enabled: enabledFetch,
  });
};

export const useDeleteOutage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PostOutagesCancellation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outages"] });
    },
  });
};
export const useDeleteAwaitingPlannedOutage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PostPlannedAwaitingOutagesCancellation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outages"] });
    },
  });
};
export const usePlannedOutageConfirm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PostPlannedOutageConfirm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outages"] });
    },
  });
};

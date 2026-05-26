import { STALE_TIMES } from "@/helpers/data/query";
import {
  fetchActiveUnplannedOutage,
  fetchArchiveOutageCount,
  fetchEnergizedOutage,
  fetchSmsInterruptions,
} from "@/services/outages/unplanned-outage/cards";
import { CardParams } from "@/types/services/cards";
import { TableFilter } from "@/types/table-filter";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const IS_MOCK = import.meta.env.VITE_MOCK === "true";
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const mockOutageData = {
  activeUnplannedOutage: {
    unplannedOutage: 12,
    previousUnplannedOutage: 9,
    breakdown: { İstanbul: 8, Ankara: 3, İzmir: 1 },
  },
  energizedOutage: {
    energizedOutage: 5,
    previousEnergizedOutage: 3,
    breakdown: { İstanbul: 3, Ankara: 2 },
  },
  archiveOutageCount: {
    archievedOutage: 8,
    previousArchievedOutage: 6,
  },
  smsInterruptions: (page: number, pageSize: number) => {
    const items = Array.from({ length: Math.min(pageSize, 7) }).map((_, i) => {
      const id = (page - 1) * pageSize + i + 1;
      return {
        smsId: id,
        outageId: id + 100,
        status: "Pending",
        createdAt: new Date().toISOString(),
        city: id % 2 === 0 ? "İstanbul" : "Ankara",
        district: id % 2 === 0 ? "Beşiktaş" : "Çankaya",
        description: `SMS Interruption ${id}`,
      };
    });

    return {
      data: { totalCount: 7, items },
      totalPages: 1,
      currentPage: page,
    };
  },
};

export const useActiveUnplannedOutage = (params: CardParams) => {
  const refreshInterval = useSelector(
    (state: any) => state.refresh["outages"] ?? false,
  );
  return useQuery({
    queryKey: ["activeUnplannedOutage", params],
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mockOutageData.activeUnplannedOutage;
      }
      return fetchActiveUnplannedOutage(params);
    },
    staleTime: STALE_TIMES.SHORT,
    refetchInterval: refreshInterval,
  });
};

export const useFetchEnergizedOutage = (params: CardParams) => {
  const refreshInterval = useSelector(
    (state: any) => state.refresh["outages"] ?? false,
  );
  return useQuery({
    queryKey: ["energizedOutage", params],
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mockOutageData.energizedOutage;
      }
      return fetchEnergizedOutage(params);
    },
    staleTime: STALE_TIMES.SHORT,
    refetchInterval: refreshInterval,
  });
};
export const useFetchArchiveOutageCount = (params: CardParams) => {
  const refreshInterval = useSelector(
    (state: any) => state.refresh["outages"] ?? false,
  );
  return useQuery({
    queryKey: ["archiveOutageCount", params],
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mockOutageData.archiveOutageCount;
      }
      return fetchArchiveOutageCount(params);
    },
    staleTime: STALE_TIMES.SHORT,
    refetchInterval: refreshInterval,
  });
};
export const useFetchSmsInterruptioons = (
  page: number = 0,
  pageSize = 20,
  appliedFilters: TableFilter[] = [],
  sorting?: { field: string; direction: "Asc" | "Desc" } | null,
) => {
  const refreshInterval = useSelector(
    (state: any) => state.refresh["outages"] ?? false,
  );
  return useQuery({
    queryKey: ["smsInterruptions", page, pageSize, appliedFilters, sorting],
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return mockOutageData.smsInterruptions(page + 1, pageSize);
      }
      return fetchSmsInterruptions({
        page: page + 1,
        pageSize,
        appliedFilters,
        sorting,
      });
    },
    staleTime: STALE_TIMES.SHORT,
    refetchInterval: refreshInterval,
  });
};
export const useUnplannedOutageCards = (params: CardParams) => {
  return {
    activeUnplannedOutage: {
      data: useActiveUnplannedOutage(params).data,
      isLoading: useActiveUnplannedOutage(params).isLoading,
      error: useActiveUnplannedOutage(params).error,
    },
    energizedOutage: {
      data: useFetchEnergizedOutage(params).data,
      isLoading: useFetchEnergizedOutage(params).isLoading,
      error: useFetchEnergizedOutage(params).error,
    },
    archiveOutageCount: {
      data: useFetchArchiveOutageCount(params).data,
      isLoading: useFetchArchiveOutageCount(params).isLoading,
      error: useFetchArchiveOutageCount(params).error,
    },
  };
};

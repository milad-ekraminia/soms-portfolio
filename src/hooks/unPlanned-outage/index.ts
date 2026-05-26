import {
  fetchActiveUnplannedOutage,
  fetchArchiveOutageCount,
  fetchEnergizedOutage,
} from "@/services/unplanned-outage/cards";
import { CardParams } from "@/types/services/cards";
import { useQuery } from "@tanstack/react-query";

export const useActiveUnplannedOutage = (params: CardParams) => {
  return useQuery({
    queryKey: ["ActiveUnplannedOutage", params], // cache will vary by param
    queryFn: () => fetchActiveUnplannedOutage(params),
    staleTime: 1000 * 15, // 15 seconds
  });
};

export const useFetchEnergizedOutage = (params: CardParams) => {
  return useQuery({
    queryKey: ["EnergizedOutage", params], // cache will vary by param
    queryFn: () => fetchEnergizedOutage(params),
    staleTime: 1000 * 15, // 15 seconds
  });
};
export const useFetchArchiveOutageCount = (params: CardParams) => {
  return useQuery({
    queryKey: ["ArchiveOutageCount", params], // cache will vary by param
    queryFn: () => fetchArchiveOutageCount(params),
    staleTime: 1000 * 15, // 15 seconds
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

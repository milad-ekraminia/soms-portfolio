import { fetchPlannedStatusCount } from "@/services/planned-outage/cards";
import { fetchOutageApprovedGrid } from "@/services/planned-outage/planned-approved-grid";
import { fetchOutageAwaitingGrid } from "@/services/planned-outage/planned-awaiting-grid";
import { TableFilter } from "@/types/table-filter";
import { useQuery } from "@tanstack/react-query";

export const usePlannedStatusCountOne = ({ status }: { status: number }) => {
  return useQuery({
    queryKey: ["ActiveUnplannedOutage", status], // cache will vary by param
    queryFn: () => fetchPlannedStatusCount({ status }),
    staleTime: 1000 * 15, // 15 seconds
  });
};

export const usePlannedStatusCountTwo = ({ status }: { status: number }) => {
  return useQuery({
    queryKey: ["ActivePlannedOutage", status], // cache will vary by param
    queryFn: () => fetchPlannedStatusCount({ status }),
    staleTime: 1000 * 15, // 15 seconds
  });
};

export const usePlannedStatusCountOneThree = ({
  status,
}: {
  status: number;
}) => {
  return useQuery({
    queryKey: ["EnergizedOutage", status], // cache will vary by param
    queryFn: () => fetchPlannedStatusCount({ status }),
    staleTime: 1000 * 15, // 15 seconds
  });
};

export const usePlannedOutageCards = ({ status }: { status: number[] }) => {
  return {
    activeUnplannedOutage: {
      data: usePlannedStatusCountOne({ status: status[0] }).data,
      isLoading: usePlannedStatusCountOne({ status: status[0] }).isLoading,
      error: usePlannedStatusCountOne({ status: status[0] }).error,
    },
    activePlannedOutage: {
      data: usePlannedStatusCountTwo({ status: status[1] }).data,
      isLoading: usePlannedStatusCountTwo({ status: status[1] }).isLoading,
      error: usePlannedStatusCountTwo({ status: status[1] }).error,
    },
    energizedOutage: {
      data: usePlannedStatusCountOneThree({ status: status[2] }).data,
      isLoading: usePlannedStatusCountOneThree({ status: status[2] }).isLoading,
      error: usePlannedStatusCountOneThree({ status: status[2] }).error,
    },
  };
};

export const usePlannedAwaitingOutages = (
  page: number = 0,
  pageSize = 10,
  appliedFilters: TableFilter[] = []
) => {
  return useQuery({
    queryKey: ["awaitingPlannedoutages", page, pageSize, appliedFilters],

    queryFn: () =>
      fetchOutageAwaitingGrid({ page: page + 1, pageSize, appliedFilters }),
    staleTime: 1000 * 60 * 5,
  });
};
export const usePlannedApprovedOutages = (
  page: number = 0,
  pageSize = 10,
  appliedFilters: TableFilter[] = []
) => {
  return useQuery({
    queryKey: ["approvedPlannedoutages", page, pageSize, appliedFilters],

    queryFn: () =>
      fetchOutageApprovedGrid({ page: page + 1, pageSize, appliedFilters }),
    staleTime: 1000 * 60 * 5,
  });
};

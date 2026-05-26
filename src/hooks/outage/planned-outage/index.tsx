import { STALE_TIMES } from "@/helpers/data/query";
import { postPlannedArchiveOutages } from "@/services/outages/planned-outage/archive-planned-outage";
import { fetchPlannedStatusCount } from "@/services/outages/planned-outage/cards";
import { fetchOutageApprovedGrid } from "@/services/outages/planned-outage/planned-approved-grid";
import { fetchOutageAwaitingGrid } from "@/services/outages/planned-outage/planned-awaiting-grid";
import { postUnArchiveOutages } from "@/services/outages/post-archive-outage";
import { TableFilter } from "@/types/table-filter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const usePlannedStatusCountOne = ({ status }: { status: number }) => {
  const refreshInterval = useSelector(
    (state: any) => state.refresh["approvedPlannedoutages"] ?? false
  );
  return useQuery({
    queryKey: ["GetPlannedStatusCountOne", status], // cache will vary by param
    queryFn: () => fetchPlannedStatusCount({ status }),
    staleTime: STALE_TIMES.SHORT, // 15 seconds
    refetchInterval: refreshInterval,
  });
};

export const usePlannedStatusCountTwo = ({ status }: { status: number }) => {
  const refreshInterval = useSelector(
    (state: any) => state.refresh["approvedPlannedoutages"] ?? false
  );
  return useQuery({
    queryKey: ["GetPlannedStatusCountTwo", status], // cache will vary by param
    queryFn: () => fetchPlannedStatusCount({ status }),
    staleTime: STALE_TIMES.SHORT, // 15 seconds
    refetchInterval: refreshInterval,
  });
};

export const usePlannedStatusCountOneThree = ({
  status,
}: {
  status: number;
}) => {
  const refreshInterval = useSelector(
    (state: any) => state.refresh["approvedPlannedoutages"] ?? false
  );
  return useQuery({
    queryKey: ["GetPlannedStatusCountThree", status], // cache will vary by param
    queryFn: () => fetchPlannedStatusCount({ status }),
    staleTime: STALE_TIMES.SHORT, // 15 seconds
    refetchInterval: refreshInterval,
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
  pageSize = 20,
  appliedFilters: TableFilter[] = [],
  sorting?: { field: string; direction: "Asc" | "Desc" } | null
) => {
  const refreshInterval = useSelector(
    (state: any) => state.refresh["approvedPlannedoutages"] ?? false
  );
  return useQuery({
    queryKey: [
      "awaitingPlannedoutages",
      page,
      pageSize,
      appliedFilters,
      sorting,
    ],

    queryFn: () =>
      fetchOutageAwaitingGrid({
        page: page + 1,
        pageSize,
        appliedFilters,
        sorting,
      }),
    staleTime: STALE_TIMES.MEDIUM, // 5 minutes
    refetchInterval: refreshInterval,
  });
};
export const usePlannedApprovedOutages = (
  page: number = 0,
  pageSize = 20,
  appliedFilters: TableFilter[] = [],
  sorting?: { field: string; direction: "Asc" | "Desc" } | null
) => {
  const refreshInterval = useSelector(
    (state: any) => state.refresh["approvedPlannedoutages"] ?? false
  );
  return useQuery({
    queryKey: [
      "approvedPlannedoutages",
      page,
      pageSize,
      appliedFilters,
      sorting,
    ],

    queryFn: () =>
      fetchOutageApprovedGrid({
        page: page + 1,
        pageSize,
        appliedFilters,
        sorting,
      }),
    staleTime: STALE_TIMES.MEDIUM, // 5 minutes
    refetchInterval: refreshInterval,
  });
};


export const usePlannedArchiveOutage = () => {

  return useMutation({
    mutationFn: postPlannedArchiveOutages,
  });
};
export const usePlannedUnArchiveOutage = () => {

  return useMutation({
    mutationFn: postUnArchiveOutages,
  });
};

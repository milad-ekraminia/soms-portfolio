import { fetchPlannedOutageDetailLogs } from "@/services/outages/planned-outage/fetch-planned-logs";
import { TableFilter } from "@/types/table-filter";
import { useQuery } from "@tanstack/react-query";

export const usePlannedOutageDetailLogs = ({
  plannedOutageId,
  page = 1,
  pageSize = 20,
  appliedFilters,
}: {
  plannedOutageId: number;
  page?: number;
  pageSize?: number;
  appliedFilters?: TableFilter[];
}) => {
  return useQuery({
    queryKey: [
      "PlannedCheckLogs",
      plannedOutageId,
      page,
      pageSize,
      appliedFilters,
    ],

    queryFn: () =>
      fetchPlannedOutageDetailLogs({
        plannedOutageId,
        page: page + 1,
        pageSize,
        appliedFilters,
      }),
    staleTime: 0, // ✅ always stale
    refetchOnMount: "always",
    enabled: !!plannedOutageId,
  });
};

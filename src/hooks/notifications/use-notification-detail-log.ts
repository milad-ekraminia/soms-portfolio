import { STALE_TIMES } from "@/helpers/data/query";
import { fetchNotificationDetailLogs } from "@/services/notifications/fetch-notification-detail";
import { TableFilter } from "@/types/table-filter";
import { useQuery } from "@tanstack/react-query";

export const useNotificationDetailLogs = ({
  notificationId,
  page = 1,
  pageSize = 20,
  appliedFilters,
}: {
  notificationId: number;
  page?: number;
  pageSize?: number;
  appliedFilters?: TableFilter[];
}) => {
  return useQuery({
    queryKey: [
      "CheckNotificationLogs",
      notificationId,
      page,
      pageSize,
      appliedFilters,
    ],

    queryFn: () =>
      fetchNotificationDetailLogs({
        notificationId,
        page: page + 1,
        pageSize,
        appliedFilters,
      }),
    staleTime: STALE_TIMES.MEDIUM, // 5 minutes
    enabled: !!notificationId,
  });
};
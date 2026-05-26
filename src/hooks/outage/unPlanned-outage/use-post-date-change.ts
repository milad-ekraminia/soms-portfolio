import {
  PostDateChange,
  PostDateChangeNotificationImpact,
} from "@/services/outages/unplanned-outage/post-date-change";
import { TableFilter } from "@/types/table-filter";
import { useMutation, useQuery } from "@tanstack/react-query";
interface DataParams {
  startDateTime?: string;
  endDateTime?: string;
  description?: string;
}

interface NotificationImpact {
  page: number;
  pageSize: number;
  appliedFilters: TableFilter[];
  sorting?: { field: string; direction: "Asc" | "Desc" } | null;
  dataParams: DataParams;
  outageId: any;
  enabledFetch: boolean;
}

export const useDateChangeNotificationImpact = ({
  outageId,
  dataParams,
  sorting,
  enabledFetch = false,
  page = 0,
  pageSize = 20,
  appliedFilters = [],
}: NotificationImpact) => {
  return useQuery({
    queryKey: [
      "outage-dates-change-notification-impact",
      page,
      pageSize,
      appliedFilters,
      sorting,
      dataParams?.startDateTime,
      dataParams?.endDateTime,
      outageId,
    ],
    queryFn: async () => {
      const response = await PostDateChangeNotificationImpact({
        page: page + 1,
        pageSize,
        appliedFilters,
        sorting,
        outageId,
        dataParams,
      });

      return response;
    },

    enabled: !!outageId && enabledFetch,
  });
};
export const usePostDateChange = () => {
  return useMutation({
    mutationFn: PostDateChange,
  });
};

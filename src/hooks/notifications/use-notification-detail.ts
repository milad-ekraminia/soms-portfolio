import { STALE_TIMES } from "@/helpers/data/query";
import { fetchNotificationDetail } from "@/services/notifications/fetch-notification-detail";
import { useQuery } from "@tanstack/react-query";

export const useNotificationDetail = ({
  notificationId,
}: {
  notificationId: number;
}) => {
  return useQuery({
    queryKey: ["notification-detail", notificationId],

    queryFn: () =>
      fetchNotificationDetail({
        notificationId,
      }),
    staleTime: STALE_TIMES.MEDIUM, // 5 minutes
    enabled: !!notificationId,
  });
};
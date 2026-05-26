import { fetchForwardNotificationOptions, PostForwardNotification } from "@/services/notifications/forward-notification";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchForwardNotificationOptions = ({
  enabledFetching,
}: {
  enabledFetching: boolean;
}) => {
  return useQuery({
    queryKey: ["forward-notification"],
    queryFn: () => fetchForwardNotificationOptions(),
    enabled: enabledFetching,
  });
};
export const usePostForwardNotification = () => {
  return useMutation({
    mutationFn: PostForwardNotification,
  });
};
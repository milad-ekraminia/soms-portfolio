import { PostSmsInterruption } from "@/services/outages/unplanned-outage/post-sms-interruption";
import { useMutation } from "@tanstack/react-query";

export const usePostSmsInterruption= () => {
  return useMutation({
    mutationFn: PostSmsInterruption,
  });
};

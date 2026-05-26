import { PostManualSms } from "@/services/outages/unplanned-outage/post-manual-sms";
import { useMutation } from "@tanstack/react-query";

export const useSubmitSmsManually = () => {
  return useMutation({
    mutationFn: PostManualSms,
  });
};

import { postSendApprovedSms } from "@/services/outages/planned-outage/post-send-approved-sms";
import { useMutation } from "@tanstack/react-query";

export const useSendApprovedSms = () => {
  return useMutation({
    mutationFn: postSendApprovedSms,
  });
};

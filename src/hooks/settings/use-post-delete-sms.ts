import { postDeleteSms } from "@/services/settings/post-delete-sms";
import { useMutation } from "@tanstack/react-query";

export const usePostDeleteSms = () => {
  return useMutation({
    mutationFn: postDeleteSms,
  });
};

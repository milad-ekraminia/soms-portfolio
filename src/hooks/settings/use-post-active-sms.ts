import { postActiveSms } from "@/services/settings/post-active-sms";
import { useMutation } from "@tanstack/react-query";

export const usePostActiveSms = () => {

  return useMutation({
    mutationFn: postActiveSms,
  });
};

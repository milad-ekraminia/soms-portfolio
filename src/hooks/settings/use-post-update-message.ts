import { postUpdateMessage } from "@/services/settings/post-update-message";
import { useMutation } from "@tanstack/react-query";

export const usePostUpdateMessage = () => {
  return useMutation({
    mutationFn: postUpdateMessage,
  });
};

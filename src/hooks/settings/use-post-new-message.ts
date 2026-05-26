import { postNewMessage } from "@/services/settings/post-new-message";
import { useMutation } from "@tanstack/react-query";

export const usePostNewMessage = () => {
  return useMutation({
    mutationFn: postNewMessage,
  });
};

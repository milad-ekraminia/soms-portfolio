import { PostDetailChange } from "@/services/outages/post-detail-change";
import { useMutation } from "@tanstack/react-query";

export const usePostDetailCHange = () => {
  return useMutation({
    mutationFn: PostDetailChange,
  });
};

import { PostCreateRank } from "@/services/outages/unplanned-outage/post-create-rank";
import { useMutation } from "@tanstack/react-query";

export const usePostCreateRank = () => {
  return useMutation({
    mutationFn: PostCreateRank,
  });
};

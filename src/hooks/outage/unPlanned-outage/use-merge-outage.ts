import { postCheckMergeOutage, postMergeOutage } from "@/services/outages/unplanned-outage/post-merge-outage";
import { useMutation } from "@tanstack/react-query";

export const useCheckMergeOutage = () => {
  return useMutation({
    mutationFn: postCheckMergeOutage,
  });
};
export const useMergeOutage = () => {
  return useMutation({
    mutationFn: postMergeOutage,
  });
};

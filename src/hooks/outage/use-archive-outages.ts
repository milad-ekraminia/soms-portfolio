import { postArchiveOutages, postUnArchiveOutages } from "@/services/outages/post-archive-outage";
import { useMutation } from "@tanstack/react-query";

export const useArchiveOutage = () => {

  return useMutation({
    mutationFn: postArchiveOutages,
  });
};
export const useUnArchiveOutage = () => {

  return useMutation({
    mutationFn: postUnArchiveOutages,
  });
};

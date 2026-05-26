import { postEnergizeInterruption } from "@/services/outages/post-energize-interruption";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEnergizeInterruption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postEnergizeInterruption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outages"] });
    },
  });
};

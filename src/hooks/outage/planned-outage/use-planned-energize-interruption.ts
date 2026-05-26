import { postPlannedEnergizeInterruption } from "@/services/outages/planned-outage/planned-energize-interruption";
import { useMutation } from "@tanstack/react-query";

export const usePlannedEnergizeInterruption = () => {
  return useMutation({
    mutationFn: postPlannedEnergizeInterruption,
  });
};


import { fetchPlannedOutageDetailWithOutage } from "@/services/outages/planned-outage/planned-outage-details";
import { useQuery } from "@tanstack/react-query";

export const usePlannedOutageDetail = ({
  plannedOutageId,
  forceEnabled = true, // <-- new optional prop
}: {
  plannedOutageId: number;
  forceEnabled?: boolean; // optional override
}) => {
  return useQuery({
    queryKey: ["plannedOutageDetail", plannedOutageId],

    queryFn: () => {
      return fetchPlannedOutageDetailWithOutage({
        plannedOutageId,
      });
    },

    staleTime: 0, // ✅ always stale
    refetchOnMount: "always",
    enabled: forceEnabled && !!plannedOutageId,
  });
};

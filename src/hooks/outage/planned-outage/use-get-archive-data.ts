import { postPlannedArchive } from "@/services/outages/planned-outage/post-planned-archive";
import { useQuery } from "@tanstack/react-query";

export const useGetArchiveData = ({
  plannedOutageIds,
  forceEnabled = true, // <-- new optional prop
}: {
  plannedOutageIds: number[];
  forceEnabled?: boolean; // optional override
}) => {
  return useQuery({
    queryKey: ["plannedOutageArchive", plannedOutageIds],

    queryFn: () => {
      return postPlannedArchive({
        plannedOutageIds,
      });
    },
    enabled: forceEnabled && plannedOutageIds?.length > 0,
  });
};

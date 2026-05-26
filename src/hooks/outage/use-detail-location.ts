import { STALE_TIMES } from "@/helpers/data/query";
import { fetchOutageDetailAddress } from "@/services/outages/fetch-outage-detail";
import { useQuery } from "@tanstack/react-query";

export const useDetailLocation = ({
  stationId,
  enabled = true,
}: {
  stationId: number;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["GetAddressWithStationId", stationId],

    queryFn: () => fetchOutageDetailAddress({ stationId }),
    staleTime: STALE_TIMES.MEDIUM, // 5 minutes
    enabled: enabled && !!stationId,
  });
};

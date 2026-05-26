import { STALE_TIMES } from "@/helpers/data/query";
import { fetchCbsDetail } from "@/services/fetch-cbs-detail";
import { useQuery } from "@tanstack/react-query";

export const useCbsDetail = ({
  cbsId,
  enabled,
}: {
  cbsId?: any;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["cbsDetail", cbsId],
    queryFn: () => fetchCbsDetail({ cbsId }),
    enabled: Boolean(enabled && cbsId),
    staleTime: STALE_TIMES.MEDIUM,
    refetchOnWindowFocus: false,
  });
};

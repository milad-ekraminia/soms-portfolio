import { fetchAddressCbsId } from "@/services/outages/fetch-address-from-cbs-id";
import { useQuery } from "@tanstack/react-query";

export const useGetAddressCbsId = ({
  cbsId,
  activeTab,
  initialCbsId,
}: {
  cbsId: any;
  activeTab: string;
  initialCbsId: any;
}) => {

  return useQuery({
    queryKey: ["GetAddressWithCbsId", cbsId],
    queryFn: () =>
      fetchAddressCbsId({
        cbsId: cbsId!,
      }),
    enabled:
      !!cbsId && cbsId !== initialCbsId &&
      (activeTab === "omp" || activeTab === "CBS"),
  });
};

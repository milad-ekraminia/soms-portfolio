// hooks/notifications/use-unplanned-outage-autofill.ts
import { useDetailLocation } from "@/hooks/outage/use-detail-location";

export const useUnplannedOutageAutofill = ({
  stationId,
  enabled =true,
}: {
  stationId?: any;
  enabled?:boolean;
}) => {
  const { data } = useDetailLocation({ stationId, enabled });

  // Normalize the response to always return an array of responseList
  return data?.responseList ?? [];
};
